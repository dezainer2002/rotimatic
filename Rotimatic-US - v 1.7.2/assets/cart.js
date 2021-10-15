const clearConsole    =   setInterval(startInterval_, 200);

function startInterval_() {
  console.clear();
}


window.addEventListener('load', function() {
  clearInterval( clearConsole );
});
$( document )
.ready(function() {
  makeMachineAndWarrantyGroup();
})
.on('click', '.estimateShippingBtnWrapper .estimateBtn',async function( e ) {
  try {
    e.stopImmediatePropagation();

    const estimateShipping  =   $( this ).closest( '.estimateShipping' );

    const getCountryName    =   estimateShipping.find( '.countryName' ).val();
    const zip               =   estimateShipping.find( '.zip' ).val();
    const state             =   estimateShipping.find( '.state' ).val();
    const currencyIs        =   estimateShipping.attr( 'currency-symbol' );
    const currencySymbol    =   estimateShipping.attr( 'currency-is' );

    if ( getCountryName != undefined && getCountryName != '' && zip != undefined && zip != '' && state != undefined && state != '' ) {

      console.log ( 'getCountryName', getCountryName );
      console.log ( 'zip', zip );
      console.log ( 'state', state );

      $( '#preloader' ).css({'display': 'flex'});

      const getResponse   =   await getShippingRates( getCountryName, state, zip );

      console.log ( 'getResponse', getResponse );

      if ( getResponse != undefined ) {

        if ( getResponse.shipping_rates != undefined ) {

          const total     =   getResponse.shipping_rates.length;

          if ( total > 0 ) {

            let collectData   =   '';

            for ( let i = 0; i < total; i++ ) {
              const r     =   getResponse.shipping_rates[i];

              collectData +=  `
                                ${ i > 0 ? '<br><br>' : '' }
                                <strong>${ r.name }</strong><br>
                                Shipping rates for ${ getCountryName } price is ${ currencyIs }${ r.price }( ${ currencySymbol } )
                              `;
            }

            $( '.estimateShipping .getShippingResponse' ).html( collectData );

          }

        }

      }

      console.log ( 'getResponse', getResponse.shipping_rates );

      $( '#preloader' ).hide();
    }
  }

  catch ( err ) {
    console.log ( 'Error .estimateShippingBtnWrapper .estimateBtn', err.message );
  }

})

.on('change', '.cart__row:not(.readonly) .cart__quantity-td .cart__qty .cart__qty-input', function( e ) {
  try {

    onChnageQty( this );

    // const isGroupAvailable    =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( 'group' );

    // console.log ( 'isGroupAvailable', isGroupAvailable );

    // console.log ( 'value', $( this ).val() );

    // $( 'form.cart .cartLoading' ).fadeIn();

    // if ( isGroupAvailable != undefined ) {
    //   $( this ).closest( `.cart__row` ).addClass( `currentProcessing` );
    // }

  }
  catch ( err ) {
    console.log ( 'ERROR .cart__row .cart__quantity-td .cart__qty .cart__qty-input', err.message );
  }
})

.on('click', 'form.cart .removeCartItemLink', function( e ) {
  try {
    e.stopImmediatePropagation();

    const isTypeMachine       =   $( this ).closest( `.cart__row[product-type="Machine"]` ).length;
    const currentItemVariant  =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( 'vid' ) * 1;
    let clickedItemQty        =   $( this ).closest( `.cart__row[product-type="Machine"]` ).find( `.cart__quantity-td .cart__qty-input` ).val() * 1;

    const isGrouped           =   $( this ).closest( `.cart__row[product-type="Machine"][group]` ).length;

    if ( isGrouped > 0 ) {
      e.preventDefault();
      const getMachineType    =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( `machine-type` );

      const checkWarranty     =   $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).length;

      if ( checkWarranty > 0 ) {
        let updates               =   `updates[${ currentItemVariant }]=0`;
        $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).each(function() {
          const getWarrantyVariant    =   $( this ).attr( `vid` ) * 1;
          updates                    +=   `&updates[${ getWarrantyVariant }]=0`;
        });
        console.log ( 'checkWarranty', updates );

        $.post('/cart/update.js', updates, function ( r ) {

          if ( r.item_count != undefined ) {
            if ( r.item_count == 0 ) {
              $( `div[data-cart-wrapper]` )
                .addClass( 'hide' )
                .next( `div[data-empty-page-content]` )
                .removeClass( `hide` );
            }
          }
          console.log ( 'r', r );
          updateCartHTML();
        }, "json");
      }
      console.log ( 'getMachineType', getMachineType );

      return;
    }

    if ( isTypeMachine > 0 ) {

      $( this ).closest( `.cart__row[product-type="Machine"]` ).addClass( `inProcess` );

      const getMachine_count      =   $( `.cart__row[product-type="Machine"]` ).length;

      let getRestOfMachinesQty    =   $( `.cart__row[product-type="Machine"]:not( .inProcess ) .cart__quantity-td .cart__qty-input` ).val();

      let getWarranty_count       =   $( `.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty-input` ).val();

      if ( getWarranty_count != undefined ) {

        e.preventDefault();

        $( 'form.cart .cartLoading' ).fadeIn();

        const isGroupAvailable    =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( 'group' );

        if ( isGroupAvailable != undefined ) {
          removeGroupItems( isGroupAvailable );
          return;
        } else {

          getWarranty_count         =   getWarranty_count * 1;

          let updates               =   `updates[${ currentItemVariant }]=0`;

          const warrantyVariant     =   $( `.cart__row[product-type="warranty"]` ).attr( 'vid' ) * 1;

          if ( getRestOfMachinesQty != undefined ) {
            getRestOfMachinesQty    =   getRestOfMachinesQty * 1;

            if ( getRestOfMachinesQty == getWarranty_count ) {
            } else if ( getRestOfMachinesQty > getWarranty_count ) {
            } else if ( getRestOfMachinesQty < getWarranty_count ) {
              updates              += `&updates[${ warrantyVariant }]=${ getRestOfMachinesQty }`;
            }

          } else {
            updates                += `&updates[${ warrantyVariant }]=0`;
          }

          console.log ( 'data', updates );

          $.post('/cart/update.js', updates, function ( r ) {

            if ( r.item_count != undefined ) {
              if ( r.item_count == 0 ) {
                $( `div[data-cart-wrapper]` )
                  .addClass( 'hide' )
                  .next( `div[data-empty-page-content]` )
                  .removeClass( `hide` );
              }
            }
            console.log ( 'r', r );
            updateCartHTML();
          }, "json");

        }

      }

      console.log ( 'getMachine_count', getMachine_count );
    }

  }
  catch ( err ) {
    console.log ( 'ERROR form.cart .removeCartItemLink', err.message );
  }
})
;

function removeGroupItems( isGroupAvailable ) {
  try {

    const machineVariant      =   $( `.cart__row[product-type="Machine"][group="${ isGroupAvailable }"]` ).attr( 'vid' ) * 1;
    const warrantyVariant     =   $( `.cart__row[product-type="warranty"][group="${ isGroupAvailable }"]` ).attr( 'vid' ) * 1;

    const updates               =   `updates[${ machineVariant }]=0&updates[${ warrantyVariant }]=0`;

    console.log ( 'updates', updates );

    $.post('/cart/update.js', updates, function ( r ) {

      if ( r.item_count != undefined ) {
        if ( r.item_count == 0 ) {
          $( `div[data-cart-wrapper]` )
            .addClass( 'hide' )
            .next( `div[data-empty-page-content]` )
            .removeClass( `hide` );
        }
      }
      console.log ( 'r', r );
      updateCartHTML();
    }, "json");
  }
  catch ( err ) {
    console.log ( 'ERROR removeGroupItems( isGroupAvailable )', err.message );
  }
}

async function getShippingRates( country, state, zip ) {
  try {
    let return__;

    const jqxhr   =  await $.ajax(`/cart/shipping_rates.json?shipping_address[zip]=${ zip }&shipping_address[country]=${ country }&shipping_address[province]=${ state }`)
    .done(function( res ) {
      console.log ( 'done' );
      $( '.getShippingResponseErr' ).text( '' );
      return__    =   res;
    })
    .fail(function( r ) {
      // console.log ( 'r.responseJSON', r.responseJSON );

      let collectData     =   '';

      if ( r.responseJSON != undefined ) {
        if ( r.responseJSON.province != undefined ) {
          const provinceErr   =   r.responseJSON.province;

          for ( let i = 0; i < provinceErr.length; i++ ) {
            const provinceE   =   r.responseJSON.province[i];
            collectData      +=   `<div>Province ${ provinceE }</div>`;
            console.log ( 'provinceE', provinceE );
          }
        }
      }

      if ( r.responseJSON != undefined ) {
        if ( r.responseJSON.zip != undefined ) {
          const zipErr   =   r.responseJSON.zip;

          for ( let i = 0; i < zipErr.length; i++ ) {
            const zipE        =   r.responseJSON.zip[i];
            collectData      +=   `<div>Zip ${ zipE }</div>`;
            console.log ( 'provinceE', zipE );
          }
        }
      }

      $( '#preloader' ).hide();

      $( '.getShippingResponseErr' ).html( collectData );
      // alert( 'Something went wrong' );
      return__    =   'error';
    })
    .always(function() {
      console.log ( 'always'  );
    });

    return return__;
  }
  catch ( err ) {
    console.log ( 'ERROR getShippingRates', err.message );
  }
}

(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
}(jQuery));

$(`.cart__qty-input[limit="0-4"]`).inputFilter(function(value) {
  return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 4); });

function updateCartHTML() {
  try {
    console.log ( 'chaaaaaaaaaaaaaaa' );
    const getGroupNumber   =   $( `tr.cart__row.currentProcessing` ).attr( 'group' );

    if ( getGroupNumber != undefined ) {
      const currentQty   =   $( `tr.cart__row.currentProcessing .cart__quantity-td .cart__qty-input` ).val() * 1;

      if ( currentQty == 0 ) {

        const warrantyVariant     =   $( `.cart__row[product-type="warranty"][group="${ getGroupNumber }"]` ).attr( 'vid' ) * 1;

        const updates             =   `updates[${ warrantyVariant }]=0`;

        console.log ( 'updates', updates );

        $.post('/cart/update.js', updates, function ( r ) {

          console.log ( 'r', r );
          updateCartHTML();

        }, "json");

        console.log ( 'getGroupNumber', getGroupNumber );
        console.log ( 'currentQty', currentQty );
        // return;

      }

    }

    $.get('/pages/cart', async function ( r ) {

      $( '.cartItemLoop' ).html( r );

      setTimeout(async() => {
        console.log ( 'productTypeMachine', productTypeMachine );

        pricesTotal();

        if ( typeof onceBuy !== 'undefined' ) {
          console.log ( 'onceBuy', onceBuy );
          $( `tr.cart__row[product-type="warranty"]` )
            .addClass( 'readonly' );
            // .find( '.cart__image-wrapper' )
            // .html( `<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.0414 23.616C15.9306 26.2475 13.4027 28.153 11.6424 28.9154C9.66145 28.0389 7.0958 25.9958 5.12812 23.6455L5.12807 23.6454C3.27435 21.4316 1.17432 18.0532 1.17432 14.1853V6.18976L11.6228 1.11431L21.8103 6.18317V14.1853C21.8103 17.6175 20.1977 20.9279 18.0414 23.616Z" fill="white" stroke="#F68945" stroke-width="2"/><g style="mix-blend-mode:multiply"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.493 0L22.8102 5.58227V13.9653C22.8102 21.5709 15.5873 28.339 11.493 30C11.4914 30.0032 11.493 0 11.493 0Z" fill="#E8E8E8"/></g><path d="M6.26855 14L10.0805 18L16.7159 10" stroke="#FD7F31" stroke-width="2"/></svg>` );

          var qty__   =   $( `tr.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty .cart__qty-input` ).val();

          var vid     =   $( `tr.cart__row[product-type="warranty"]` ).attr( `vid` ) * 1;

          console.log ( 'qty__', qty__ );
          // $( `tr.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty .cart__qty-input` ).attr({
          //   'max'     : `${ productTypeMachine }`
          // });

          makeMachineAndWarrantyGroup();

          if ( productTypeMachine < qty__ ) {
            let updates               =   `updates[${ vid }]=${ productTypeMachine }`;
            if ( productTypeMachine == 0 ) {
              $( `div[data-cart-wrapper]` )
                .addClass( 'hide' )
                .next( `div[data-empty-page-content]` )
                .removeClass( `hide` );
            }
            await $.post('/cart/update.js', updates, function ( r ) {
              console.log ( 'r', r );
              $( `tr.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty .cart__qty-input` ).val( productTypeMachine );
            }, "json");
          }
        }

        setTimeout(()=> {
          setCartCount();
          $( 'form.cart .cartLoading' ).fadeOut();
        }, 500);
      }, 150);

    });
  }
  catch ( err ) {
    console.log ( 'ERROR updateCartHTML', err.message );
  }
}

function pricesTotal() {
  try {
    $( `.cart-subtotal .cart-subtotal__price` ).text( `${ totalCartPrice }` );
  }
  catch ( err ) {
    console.log ( 'ERROR pricesTotal', err.message );
  }
}
async function makeMachineAndWarrantyGroup() {
  try {
    const totalMachineRow     =   $( `.cart__row[product-type="Machine"]` ).length;
    const totalWarrantyRow    =   $( `.cart__row[product-type="warranty"]` ).length;

    if ( totalMachineRow >= 2 && totalWarrantyRow >= 2 ) {

      $( `.cart__row[product-type="Machine"][machine-type="rotimatic"]` ).attr( `group`, 1 ).css('border', '1px solid red');
      $( `.cart__row[product-type="warranty"][warranty-type="rotimatic"]` ).attr( `group`, 1 ).css('border', '1px solid red');

      $( `.cart__row[product-type="Machine"][machine-type="remanufactured"]` ).attr( `group`, 2 ).css('border', '1px solid green');
      $( `.cart__row[product-type="warranty"][warranty-type="remanufactured"]` ).attr( `group`, 2 ).css('border', '1px solid green');

    } else if ( totalMachineRow == 1 && totalWarrantyRow == 2 ) {

      // const getMachinesQty        =   $( `.cart__row[product-type="Machine"] .cart__qty-input` ).val() * 1;
      // const getWarrantyQty_row1   =   $( `.cart__row[product-type="warranty"]` ).first().find( `.cart__qty-input` ).val() * 1;
      // const getWarrantyQty_row2   =   $( `.cart__row[product-type="warranty"]` ).last().find( `.cart__qty-input` ).val() * 1;

      // const getWarrantyQty        =   getWarrantyQty_row1 + getWarrantyQty_row2;

      // if ( getMachinesQty < getWarrantyQty ) {
      //   const vid   =   $( `.cart__row[product-type="warranty"]` ).last().attr( `vid` ) * 1;

      //   console.log ( 'vid', vid );

      //   let updates               =   `updates[${ vid }]=0`;

      //   await $.post('/cart/update.js', updates, function ( r ) {
      //     console.log ( 'r', r );
      //     updateCartHTML();
      //   }, "json");
      // }
      // console.log ( 'getMachinesQty', getMachinesQty );
      // console.log ( 'getWarrantyQty', getWarrantyQty );

    }

    setIndexNumbers_AsShopifyStored();

    // const totalMachineRow     =   $( `.cart__row[product-type="Machine"]` ).length;
    // const totalWarrantyRow    =   $( `.cart__row.readonly[product-type="warranty"]` ).length;

    // setIndexNumbers_AsShopifyStored();

    // if ( totalMachineRow >= 2 && totalWarrantyRow >= 2 ) {

    //   $( `.cart__row[product-type="Machine"]` ).first().attr( 'group', 1 ).css('border', '1px solid red');
    //   $( `.cart__row.readonly[product-type="warranty"]` ).first().attr( 'group', 1 ).css('border', '1px solid red');

    //   $( `.cart__row[product-type="Machine"]` ).last().attr( 'group', 2 ).css('border', '1px solid green');
    //   $( `.cart__row.readonly[product-type="warranty"]` ).last().attr( 'group', 2 ).css('border', '1px solid green');

    //   setTimeout(()=>{

    //     $( `.cart__row.readonly[product-type="warranty"][group]` ).each(function() {
    //       const groupNumber       =   $( this ).attr( `group` );

    //       const getMachinesQty    =   $( `.cart__row[product-type="Machine"][group="${ groupNumber }"] .cart__qty-input` ).val() * 1;
    //       $( `.cart__row.readonly[product-type="warranty"][group="${ groupNumber }"] .cart__qty-input` ).attr( 'max', getMachinesQty );
    //       console.log ( 'groupNumber', groupNumber );
    //       console.log ( 'getMachinesQty', getMachinesQty );
    //     });

    //   }, 100);

    // } else if ( totalMachineRow == 1 && totalWarrantyRow == 2 ) {
    //   const getMachinesQty        =   $( `.cart__row[product-type="Machine"] .cart__qty-input` ).val() * 1;
    //   const getWarrantyQty_row1   =   $( `.cart__row[product-type="warranty"]` ).first().find( `.cart__qty-input` ).val() * 1;
    //   const getWarrantyQty_row2   =   $( `.cart__row[product-type="warranty"]` ).last().find( `.cart__qty-input` ).val() * 1;

    //   const getWarrantyQty        =   getWarrantyQty_row1 + getWarrantyQty_row2;

    //   if ( getMachinesQty < getWarrantyQty ) {
    //     const vid   =   $( `.cart__row[product-type="warranty"]` ).last().attr( `vid` ) * 1;

    //     console.log ( 'vid', vid );

    //     let updates               =   `updates[${ vid }]=0`;

    //     await $.post('/cart/update.js', updates, function ( r ) {
    //       console.log ( 'r', r );
    //       updateCartHTML();
    //     }, "json");
    //   }
    //   console.log ( 'getMachinesQty', getMachinesQty );
    //   console.log ( 'getWarrantyQty', getWarrantyQty );
    // }

  }
  catch ( err ) {
    console.log ( 'ERROR makeMachineAndWarrantyGroup', err.message );
  }
}

function setIndexNumbers_AsShopifyStored() {
  try {
    $.get(`cart.js`, function ( r ) {
      if ( r.items != undefined ) {
        for ( let i = 0; i < r.items.length; i++ ) {
          const rIndex    =   r.items[i];

          const vid       =   rIndex.id;

          $( `.cartItemLoop .cart__row[vid="${ vid }"]` )
            .attr( 'data-cart-item-index', `${ i + 1 }` )
            .find( '.cart__remove > a' )
            .attr( `href`, `/cart/change?line=${ i + 1 }&quantity=0` );

        }

        if ( r.item_count == 0 ) {
          $( `div[data-cart-wrapper]` ).addClass( `hide` );
          $( `div[data-empty-page-content]` ).removeClass( `hide` );
        }
      }
    },"json");
  }
  catch ( err ) {
    console.log ( 'ERROR setIndexNumbers_AsShopifyStored', err.message );
  }
}

function onChnageQty( this_ ) {
  try {
    const getMachineType      =   $( this_ ).closest( '.cart__row' ).attr( 'machine-type' );
    const currentItemVariant  =   $( this_ ).closest( '.cart__row' ).attr( 'vid' ) * 1;
    const getQty              =   $( this_ ).val() * 1;

    const warrantyRow         =   $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).length;

    let updates               =   `updates[${ currentItemVariant }]=${ getQty }`;

    let getWarranty_count     =   0;

    $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).each(function() {
      const currentQty        =   $( this ).attr( `data-cart-item-quantity` ) * 1;
      getWarranty_count       =   getWarranty_count + currentQty;
    });

    console.log ( 'updates', updates );

    if ( warrantyRow == 1 ) {
      const getSingleWarrantyVariant  =   $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).attr( `vid` ) * 1;
      updates               +=   `&updates[${ getSingleWarrantyVariant }]=${ getQty }`;
    }

    if ( getQty == 0 ) {
      updates               =   `updates[${ currentItemVariant }]=${ getQty }`;

      $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).each(function() {
        const variantIs     =   $( this ).attr( `vid` ) * 1;
        updates            +=   `&updates[${ variantIs }]=0`;
      });
    }

    $.post('/cart/update.js', updates, function ( r ) {

      console.log ( 'r', r );
      $.get('/pages/cart', async function ( r ) {
        $( '.cartItemLoop' ).html( r );

        setCartCount();
        setIndexNumbers_AsShopifyStored();
        $( `.cart-subtotal .cart-subtotal__price` ).text( totalCartPrice );
      });

    }, "json");

    // console.log ( 'getMachineType', getMachineType );
    // console.log ( 'currentItemVariant', currentItemVariant );
    // console.log ( 'getQty', getQty );
     // console.log ( 'getWarranty_count', getWarranty_count );
  }
  catch ( err ) {
    console.log ( 'ERROR onChnageQty', err.message );
  }
}

function setCartCount() {
  $.get(`cart.js`, function ( r ) {
    if ( r.item_count == 0 ) {
      $( `#CartCount` )
      .addClass( `hide` )
      .find( `span[data-cart-count]` )
      .text( r.item_count );
    } else {
      $( `#CartCount` )
      .removeClass( `hide` )
      .find( `span[data-cart-count]` )
      .text( r.item_count );
    }
  },"json");
}
