console.clear();
const clearConsole    =   setInterval(startInterval_, 100);

function startInterval_() {
  console.clear();
}


window.addEventListener('load', function() {
  clearInterval( clearConsole );
  setMaxQty();
  setIndexNumbers_AsShopifyStored();
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

      // console.log ( 'getCountryName', getCountryName );
      // console.log ( 'zip', zip );
      // console.log ( 'state', state );

      $( '#preloader' ).css({'display': 'flex'});

      const getResponse   =   await getShippingRates( getCountryName, state, zip );

      // console.log ( 'getResponse', getResponse );

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

.on('click', '.cart__submit-controls .cart__submit', function( e ) {
  try {

    e.stopImmediatePropagation();
    e.preventDefault();

    location.href   =   `/checkout`;

  }
  catch ( err ) {
    console.log( `ERROR .cart__submit-controls .cart__submit`, err.message );
  }
})

.on('click', 'form.cart .removeCartItemLink',async function( e ) {
  try {
    e.stopImmediatePropagation();

    const isTypeMachine               =   $( this ).closest( `.cart__row[product-type="Machine"]` ).length;
    const currentItemVariant          =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( 'vid' ) * 1;
    let clickedItemQty                =   $( this ).closest( `.cart__row[product-type="Machine"]` ).find( `.cart__quantity-td .cart__qty-input` ).val() * 1;

    const isGrouped                   =   $( this ).closest( `.cart__row[product-type="Machine"][group]` ).length;

    if ( isGrouped > 0 ) {
      e.preventDefault();
      const getMachineType            =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( `machine-type` );

      const checkWarranty             =   $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).length;

      if ( checkWarranty > 0 ) {
        let updates                   =   `updates[${ currentItemVariant }]=0`;
        $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).each(function() {
          const getWarrantyVariant    =   $( this ).attr( `vid` ) * 1;
          updates                    +=   `&updates[${ getWarrantyVariant }]=0`;
        });
        console.log ( 'checkWarranty', updates );

        await updateCart( updates );
        await getCartItems();

        // $.post('/cart/update.js', updates, function ( r ) {

        //   if ( r.item_count != undefined ) {
        //     if ( r.item_count == 0 ) {
        //       $( `div[data-cart-wrapper]` )
        //         .addClass( 'hide' )
        //         .next( `div[data-empty-page-content]` )
        //         .removeClass( `hide` );
        //     }
        //   }
        //   console.log ( 'r', r );
        //   updateCartHTML();
        // }, "json");
      }
      console.log ( 'getMachineType', getMachineType );

      return;
    }

    if ( isTypeMachine > 0 ) {

      const matchedExtendWarranty     =   $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ currentItemVariant }"]` ).length;

      if ( matchedExtendWarranty > 0 ) {
        e.preventDefault();

        let updates                   =   `updates[${ currentItemVariant }]=0`;

        $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ currentItemVariant }"]` ).each(function() {
          const extendWarrantiyVid    =   $( this ).attr( `vid` ) * 1;
          updates                    +=   `&updates[${ extendWarrantiyVid }]=0`;
        });

        await updateCart( updates );
        await getCartItems();

        return;
      }

      $( this ).closest( `.cart__row[product-type="Machine"]` ).addClass( `inProcess` );

      const getMachine_count        =   $( `.cart__row[product-type="Machine"]` ).length;

      let getRestOfMachinesQty      =   $( `.cart__row[product-type="Machine"]:not( .inProcess ) .cart__quantity-td .cart__qty-input` ).val();

      let getWarranty_count         =   $( `.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty-input` ).val();

      if ( getWarranty_count != undefined ) {

        e.preventDefault();

        $( 'form.cart .cartLoading' ).fadeIn();

        const isGroupAvailable      =   $( this ).closest( `.cart__row[product-type="Machine"]` ).attr( 'group' );

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

          await updateCart( updates );
          await getCartItems();

          // $.post('/cart/update.js', updates, function ( r ) {

          //   if ( r.item_count != undefined ) {
          //     if ( r.item_count == 0 ) {
          //       $( `div[data-cart-wrapper]` )
          //         .addClass( 'hide' )
          //         .next( `div[data-empty-page-content]` )
          //         .removeClass( `hide` );
          //     }
          //   }
          //   console.log ( 'r', r );
          //   updateCartHTML();
          // }, "json");

        }

      }

      console.log ( 'getMachine_count', getMachine_count );
    }

  }
  catch ( err ) {
    console.log ( 'ERROR form.cart .removeCartItemLink', err.message );
  }
})

.on('change', '.cart__row:not(.readonly) .cart__quantity-td .cart__qty .cart__qty-input', function( e ) {
  try {

    inputQtyChnage( this );

  }
  catch ( err ) {
    console.log ( 'ERROR .cart__row .cart__quantity-td .cart__qty .cart__qty-input', err.message );
  }
})

.on('click', '.qtyUpdateForMobile .minusBtn', function( e ) {
  try {
    e.stopImmediatePropagation();

    const getCurrentyQty    =   $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val() * 1;

    $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val( getCurrentyQty - 1 );
    inputQtyChnage( $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ) );
  }
  catch ( err ) {
    console.log( `ERROR .qtyUpdateForMobile .minusBtn`, err.message );
  }
})

.on('click', '.qtyUpdateForMobile .plusBtn', function( e ) {
  try {
    e.stopImmediatePropagation();

    const getCurrentyQty    =   $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val() * 1;

    if ( getCurrentyQty >= 4 ) {
    } else {
      const whatIsMax       =   $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).attr( `max` ) * 1;

      if ( getCurrentyQty + 1 <= whatIsMax ) {
        $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val( getCurrentyQty + 1 );
        inputQtyChnage( $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ) );
      } else {
        $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val( getCurrentyQty );
      }
    }
  }
  catch ( err ) {
    console.log( `ERROR .qtyUpdateForMobile .minusBtn`, err.message );
  }
})
;

function inputQtyChnage( this_ ) {
  try {

    const row                   =   $( this_ ).closest( `.cart__row` );
    const isTypeMachine         =   row.attr( `product-type` );
    const thisMachineVid        =   row.attr( `vid` );

    const checkExtendWarranty   =   $( `.cart__row[matching-vid="${ thisMachineVid }"]` ).length;

    if ( isTypeMachine == 'Machine' && checkExtendWarranty == 0 ) {

      onChnageQty( this_ );

    } else if ( isTypeMachine == 'Machine' && checkExtendWarranty > 0 ) {

      let matchingQty         =   0;
      $( `.cart__row[matching-vid="${ thisMachineVid }"]` ).each(function() {
        const getQty          =   $( this ).find( `.cart__qty-input` ).val() * 1;
        matchingQty           =   getQty + matchingQty;
      });

      const currentQty        =   $( this_ ).val() * 1;

      console.log ( 'matchingQty', matchingQty );
      console.log ( 'currentQty', currentQty );
      console.log ( `isTypeMachine == 'Machine' && checkExtendWarranty > 0` );

      if ( currentQty < matchingQty ) {

        onChangeExtendWarranty__removeLastWarranty( this_, thisMachineVid );

      } else {

        onChangeExtendWarranty( this_ );

      }


    } else if ( isTypeMachine == 'Extend Service Contract' ) {

      handleExtendWarranty( this_ );

    } else {

      reduceOrRemoveQty( this_ );

    }

  }
  catch ( err ) {
    console.log( `ERROR inputQtyChnage( this_ )`, err.message );
  }
}

function onChangeExtendWarranty__removeLastWarranty( this_, thisMachineVid ) {
  try {
    const lastMatchingID    =   $( `.cart__row[matching-vid="${ thisMachineVid }"]` ).last().attr( `vid` ) * 1;
    const lastMatchingQty   =   $( `.cart__row[matching-vid="${ thisMachineVid }"][vid="lastMatchingID"]` ).find( `.cart__qty-input` ).val() * 1;
    console.log ( 'lastMatchingID', lastMatchingID );
    console.log ( 'lastMatchingQty', lastMatchingQty );
    onChangeExtendWarranty( this_ );
  }
  catch ( err ) {
    console.log( `ERROR onChangeExtendWarranty__removeLastWarranty`, err.message );
  }
}

function handleExtendWarranty( this_ ) {
  try {
    const row                   =   $( this_ ).closest( `.cart__row` );
    const isTypeMachine         =   row.attr( `product-type` );
    const thisMachineVid        =   row.attr( `matching-vid` );
    const currentQty            =   row.find( `.cart__quantity-td .cart__qty-input` ).val() * 1;

    const getMachineQty         =   $( `.cart__row[product-type="Machine"][vid="${ thisMachineVid }"] .cart__quantity-td .cart__qty-input` ).val() * 1;

    const getWarranty_count     =   $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ thisMachineVid }"]` ).length;

    let getMatchedWarrantyQty   =   0;

    if ( getWarranty_count == 1 ) {
      reduceOrRemoveQty( this_ );
      return;
    } else if ( getWarranty_count > 1 ) {
      $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ thisMachineVid }"]` ).each(function() {
        const getQty            =   $( this ).find( `.cart__quantity-td .cart__qty-input` ).val() * 1;
        getMatchedWarrantyQty   =   getMatchedWarrantyQty + getQty;
      });
      // console.log ( 'more than 1 warranty', getMatchedWarrantyQty );
    }

    if ( getMachineQty >= getMatchedWarrantyQty ) {
      reduceOrRemoveQty( this_ );
      return;
    } else {
      modalAlert( `Warranty quantity can not increase than machine's quantity.` );
      const getPreviousQty      =   row.attr( `data-cart-item-quantity` ) * 1;
      row.find( `.cart__quantity-td .cart__qty-input` ).val( getPreviousQty );
      // console.log ( 'bbb' );
    }

    // $( `.cart__row[product-type="Machine"][vid="${ thisMachineVid }"]` ).css( 'border', '1px solid red' );

    // console.log ( 'extend warranty' );
    // console.log ( 'getMachineQty', getMachineQty );
    // console.log ( 'getWarranty_count', getWarranty_count );
    // console.log ( 'currentQty', currentQty );
    // console.log ( 'isTypeMachine', isTypeMachine );
    // console.log ( 'thisMachineVid', thisMachineVid );
  }
  catch ( err ) {
    console.log ( 'ERROR handleExtendWarranty', err.message );
  }
}

function modalAlert( msg ) {
  try {
    $( `body` )
    .append( `
      <div class="_extendQtyModal_">
        <div class="centerCenter">
          <span class="_close_" onClick="alertModalClose( this );">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.16005 14.8398L14.84 1.1598" stroke="black" stroke-linecap="round"></path><path d="M14.8 14.7998L1.20005 1.1998" stroke="black" stroke-linecap="round"></path></svg>
          </span>
          <div class="yourMessage">${ msg }</div>
        </div>
      </div>
    ` );
  }
  catch ( err ) {
    console.log( `ERROR modalAlert`, err.message );
  }
}

function alertModalClose( this_ ) {
  try {
    $( this_ ).closest( `._extendQtyModal_` ).remove();
  }
  catch ( err ) {
    console.log( `ERROR alertModalClose`, err.message );
  }
}

async function setMaxQty() {
  try {
    const isExtend_Available    =   $( `.cart__row[product-type="Extend Service Contract"]` ).length;

    if ( isExtend_Available > 0 ) {
      $( `.cart__row[product-type="Machine"]` ).each(function() {
        const getVid    =   $( this ).attr( `vid` );
        const getVal    =   $( this ).find( `.cart__qty-input` ).val();
        $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ getVid }"]` )
          .find( `.cart__qty-input` )
          .attr( `max`, getVal );
      });
    }
    // console.log ( 'isExtend_Available', isExtend_Available );
  }
  catch ( err ) {
    console.log ( 'ERROR setMaxQty', err.message );
  }
}

async function reduceOrRemoveQty( this_ ) {
  try {
    const getQty    =   $( this_ ).val() * 1;
    const getVid    =   $( this_ ).closest( `.cart__row` ).attr( `vid` ) * 1;

    let updates     =   `updates[${ getVid }]=${ getQty }`;

    await updateCart( updates );
    await getCartItems();
  }
  catch ( err ) {
    console.log ( 'ERROR reduceOrRemoveQty', err.message );
  }
}

async function onChangeExtendWarranty( this_ ) {
  try {
    // console.log ( 'yes extend warranty available' );
    const machineQty            =   $( this_ ).val() * 1;
    const machineVid            =   $( this_ ).closest( `.cart__row` ).attr( `vid` ) * 1;

    const extendWarrantiesRow   =   $( `.cart__row[matching-vid="${ machineVid }"]` ).length;

    let updates                 =   `updates[${ machineVid }]=${ machineQty }`;


    if ( extendWarrantiesRow == 1 ) {
      const warrantyVid         =   $( `.cart__row[matching-vid="${ machineVid }"]` ).attr( `vid` ) * 1;
      updates                  +=   `&updates[${ warrantyVid }]=${ machineQty }`;
    } else if ( extendWarrantiesRow > 1 && machineQty == 0 ) {
      $( `.cart__row[matching-vid="${ machineVid }"]` ).each(function() {
        const warrantyVid       =   $( this ).attr( `vid` ) * 1;
        updates                +=   `&updates[${ warrantyVid }]=${ machineQty }`;
      });
    }

    await updateCart( updates );
    await getCartItems();
    // console.log ( 'extendWarrantiesRow', extendWarrantiesRow );
    // console.log ( 'machineQty', machineQty );
    // console.log ( 'machineVid', machineVid );
    // console.log ( 'updates', updates );
  }
  catch ( err ) {
    console.log ( 'ERROR onChangeExtendWarranty', err.message );
  }
}

async function getCartItems() {
  try {
    await $.get('/pages/cart', async function ( r ) {
      $( '.cartItemLoop' ).html( r );

      $( `.cart-subtotal .cart-subtotal__price` ).text( totalCartPrice );
    });
    await setIndexNumbers_AsShopifyStored();
    setMaxQty();
  }
  catch ( err ) {
    console.log ( 'ERROR getCartItems', err.message );
  }
}


async function updateCart( data ) {
  try {
    if ( data != '' ) {
      await $.post(`/cart/update.js`, data, function ( r ) {
        // console.log ( 'r', r );
        cartObj   =   r;
        if ( r.item_count == 0 ) {
          $( `#CartCount` ).addClass( `hide` ).find( `span[data-cart-count]` ).text( r.item_count );
          $( `div[data-cart-wrapper]` ).addClass( 'hide' ).next( `div[data-empty-page-content]` ).removeClass( `hide` );
        } else {
          $( `#CartCount` ).removeClass( `hide` ).find( `span[data-cart-count]` ).text( r.item_count );
        }
      }, "json");
    }
  }
  catch ( err ) {
    console.log ( 'ERROR updateCart', err.message );
  }
}

async function onChnageQty( this_ ) {
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

    // console.log ( 'updates', updates );

    if ( warrantyRow == 1 ) {
      const getSingleWarrantyVariant  =   $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).attr( `vid` ) * 1;
      updates                +=   `&updates[${ getSingleWarrantyVariant }]=${ getQty }`;
    }

    if ( getQty == 0 ) {
      updates                 =   `updates[${ currentItemVariant }]=${ getQty }`;

      $( `.cart__row[product-type="warranty"][warranty-type="${ getMachineType }"]` ).each(function() {
        const variantIs       =   $( this ).attr( `vid` ) * 1;
        updates              +=   `&updates[${ variantIs }]=0`;
      });
    }

    await updateCart( updates );
    await getCartItems();

    // $.post('/cart/update.js', updates, function ( r ) {

    //   console.log ( 'r', r );
    //   $.get('/pages/cart', async function ( r ) {
    //     $( '.cartItemLoop' ).html( r );

    //     setCartCount();
    //     setIndexNumbers_AsShopifyStored();
    //     $( `.cart-subtotal .cart-subtotal__price` ).text( totalCartPrice );
    //   });

    // }, "json");

    // console.log ( 'getMachineType', getMachineType );
    // console.log ( 'currentItemVariant', currentItemVariant );
    // console.log ( 'getQty', getQty );
    // console.log ( 'getWarranty_count', getWarranty_count );

  }
  catch ( err ) {
    console.log ( 'ERROR onChnageQty', err.message );
  }
}

async function removeGroupItems( isGroupAvailable ) {
  try {

    const machineVariant      =   $( `.cart__row[product-type="Machine"][group="${ isGroupAvailable }"]` ).attr( 'vid' ) * 1;
    const warrantyVariant     =   $( `.cart__row[product-type="warranty"][group="${ isGroupAvailable }"]` ).attr( 'vid' ) * 1;

    const updates             =   `updates[${ machineVariant }]=0&updates[${ warrantyVariant }]=0`;

    // console.log ( 'updates', updates );

    await updateCart( updates );
    await getCartItems();

    // $.post('/cart/update.js', updates, function ( r ) {

    //   if ( r.item_count != undefined ) {
    //     if ( r.item_count == 0 ) {
    //       $( `div[data-cart-wrapper]` )
    //         .addClass( 'hide' )
    //         .next( `div[data-empty-page-content]` )
    //         .removeClass( `hide` );
    //     }
    //   }
    //   console.log ( 'r', r );
    //   updateCartHTML();
    // }, "json");
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
      // console.log ( 'done' );
      $( '.getShippingResponseErr' ).text( '' );
      return__    =   res;
    })
    .fail(function( r ) {
      // console.log ( 'r.responseJSON', r.responseJSON );

      let collectData         =   '';

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
          const zipErr        =   r.responseJSON.zip;

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

async function updateCartHTML() {
  try {

    const getGroupNumber    =   $( `tr.cart__row.currentProcessing` ).attr( 'group' );

    if ( getGroupNumber != undefined ) {
      const currentQty      =   $( `tr.cart__row.currentProcessing .cart__quantity-td .cart__qty-input` ).val() * 1;

      if ( currentQty == 0 ) {

        const warrantyVariant     =   $( `.cart__row[product-type="warranty"][group="${ getGroupNumber }"]` ).attr( 'vid' ) * 1;

        const updates             =   `updates[${ warrantyVariant }]=0`;

        // console.log ( 'updates', updates );

        await updateCart( updates );
        await getCartItems();

        // $.post('/cart/update.js', updates, function ( r ) {

        //   console.log ( 'r', r );
        //   updateCartHTML();

        // }, "json");

        // console.log ( 'getGroupNumber', getGroupNumber );
        // console.log ( 'currentQty', currentQty );
        // return;

      }

    }

    $.get('/pages/cart', async function ( r ) {

      $( '.cartItemLoop' ).html( r );

      setTimeout(async() => {
        // console.log ( 'productTypeMachine', productTypeMachine );

        pricesTotal();

        if ( typeof onceBuy !== 'undefined' ) {
          // console.log ( 'onceBuy', onceBuy );
          $( `tr.cart__row[product-type="warranty"]` )
            .addClass( 'readonly' );

          var qty__   =   $( `tr.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty .cart__qty-input` ).val();

          var vid     =   $( `tr.cart__row[product-type="warranty"]` ).attr( `vid` ) * 1;

          // console.log ( 'qty__', qty__ );

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
              // console.log ( 'r', r );
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

      $( `.cart__row[product-type="Machine"][machine-type="rotimatic"]` ).attr( `group`, 1 );
      $( `.cart__row[product-type="warranty"][warranty-type="rotimatic"]` ).attr( `group`, 1 );

      $( `.cart__row[product-type="Machine"][machine-type="remanufactured"]` ).attr( `group`, 2 );
      $( `.cart__row[product-type="warranty"][warranty-type="remanufactured"]` ).attr( `group`, 2 );

    } else if ( totalMachineRow == 1 && totalWarrantyRow == 2 ) {

    }

    setIndexNumbers_AsShopifyStored();

  }
  catch ( err ) {
    console.log ( 'ERROR makeMachineAndWarrantyGroup', err.message );
  }
}

async function setIndexNumbers_AsShopifyStored() {
  try {
    // if ( typeof cartObj !== 'undefined' ) {
    //   if ( cartObj.items != undefined ) {
    //     for ( let i = 0; i < cartObj.items.length; i++ ) {
    //       const rIndex    =   cartObj.items[i];

    //       const vid       =   rIndex.id;

    //       $( `.cartItemLoop .cart__row[vid="${ vid }"]` )
    //         .attr( 'data-cart-item-index', `${ i + 1 }` )
    //         .find( '.cart__remove > a' )
    //         .attr( `href`, `/cart/change?line=${ i + 1 }&quantity=0` );

    //     }

    //     if ( cartObj.item_count == 0 ) {
    //       $( `div[data-cart-wrapper]` ).addClass( `hide` );
    //       $( `div[data-empty-page-content]` ).removeClass( `hide` );
    //     }
    //   }
    //   cartObj         =   '';
    // } else {
    //   $.get(`cart.js`, function ( r ) {
    //     if ( r.items != undefined ) {
    //       for ( let i = 0; i < r.items.length; i++ ) {
    //         const rIndex    =   r.items[i];

    //         const vid       =   rIndex.id;

    //         $( `.cartItemLoop .cart__row[vid="${ vid }"]` )
    //           .attr( 'data-cart-item-index', `${ i + 1 }` )
    //           .find( '.cart__remove > a' )
    //           .attr( `href`, `/cart/change?line=${ i + 1 }&quantity=0` );

    //       }

    //       if ( r.item_count == 0 ) {
    //         $( `div[data-cart-wrapper]` ).addClass( `hide` );
    //         $( `div[data-empty-page-content]` ).removeClass( `hide` );
    //       }
    //     }
    //   },"json");
    // }
  }
  catch ( err ) {
    console.log ( 'ERROR setIndexNumbers_AsShopifyStored', err.message );
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
