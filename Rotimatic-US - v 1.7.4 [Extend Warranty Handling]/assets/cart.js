console.clear();
const clearConsole    =   setInterval(startInterval_, 100);

function startInterval_() {

  console.clear();

}


window.addEventListener('load', function() {

  clearInterval( clearConsole );
  setMaxQty();

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

      $( '#preloader' ).css({'display': 'flex'});

      const getResponse   =   await getShippingRates( getCountryName, state, zip );

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

      $( '#preloader' ).hide();
    }

  }
  catch ( err ) {
    console.log ( 'Error .estimateShippingBtnWrapper .estimateBtn', err.message );
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

        await updateCart( updates );
        await getCartItems();

      }

      return;
    }

    if ( isTypeMachine > 0 ) {

      const getMatching__Count        =   $( `.cart__row[matching-vid="${ currentItemVariant }"]` ).length;

      if ( getMatching__Count > 0 ) {
        e.preventDefault();

        let updates                   =   `updates[${ currentItemVariant }]=0`;
        $( `.cart__row[matching-vid="${ currentItemVariant }"]` ).each(function() {
          const getWarrantyVariant    =   $( this ).attr( `vid` ) * 1;
          updates                    +=   `&updates[${ getWarrantyVariant }]=0`;
        });

        await updateCart( updates );
        await getCartItems();

        return;

      }

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

          await updateCart( updates );
          await getCartItems();

        }

      }

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
    console.log ( 'ERROR .cart__row:not(.readonly) .cart__quantity-td .cart__qty .cart__qty-input', err.message );
  }
})

.on('change', '.cart__row.readonly .cart__quantity-td .cart__qty .cart__qty-input', function( e ) {
  try {

    handleExtendWarranty( this, 'simpleWarranty', '' );

  }
  catch ( err ) {
    console.log ( 'ERROR .cart__row.readonly .cart__quantity-td .cart__qty .cart__qty-input', err.message );
  }
})

.on('click', '.qtyUpdateForMobile .minusBtn', function( e ) {
  try {

    e.stopImmediatePropagation();

    const getCurrentyQty    =   $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val() * 1;

    $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ).val( getCurrentyQty - 1 );
    inputQtyChnage( $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ), 'mobile' );

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
        inputQtyChnage( $( this ).closest( `.qtyUpdateForMobile` ).find( `.cart__qty-input` ), 'mobile' );
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

function inputQtyChnage( this_, isMobile = '' ) {
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

      if ( currentQty < matchingQty ) {

        onChangeExtendWarranty__removeLastWarranty( this_, thisMachineVid );

      } else {

        onChangeExtendWarranty( this_ );

      }


    } else if ( isTypeMachine == 'Extend Service Contract' ) {

      handleExtendWarranty( this_ );

    } else if ( isTypeMachine == 'warranty' ) {

      handleExtendWarranty( this_, 'simpleWarranty', ( isMobile == 'mobile' ? 'mobile' : '' ) );

    } else {

      reduceOrRemoveQty( this_ );

    }

  }
  catch ( err ) {
    console.log( `ERROR inputQtyChnage( this_ )`, err.message );
  }
}

async function onChangeExtendWarranty__removeLastWarranty( this_, thisMachineVid ) {
  try {

    const currentVid        =   $( this_ ).closest( `.cart__row` ).attr( `vid` ) * 1;
    const currentQty        =   $( this_ ).val() * 1;

    const lastMatchingID    =   $( `.cart__row[matching-vid="${ thisMachineVid }"]` ).last().attr( `vid` ) * 1;
    const lastMatchingQty   =   $( `.cart__row[matching-vid="${ thisMachineVid }"][vid="${ lastMatchingID }"]` ).find( `.cart__qty-input` ).val() * 1;

    let updates               =   `updates[${ currentVid }]=${ currentQty }&updates[${ lastMatchingID }]=${ lastMatchingQty - 1 }`;

    await updateCart( updates );
    await getCartItems();

  }
  catch ( err ) {
    console.log( `ERROR onChangeExtendWarranty__removeLastWarranty`, err.message );
  }
}

function handleExtendWarranty( this_, warrantyType='', isMobile='' ) {
  try {

    const row                   =   $( this_ ).closest( `.cart__row` );
    const isTypeMachine         =   row.attr( `product-type` );
    const thisMachineVid        =   row.attr( `matching-vid` );
    const currentQty            =   row.find( `.cart__quantity-td .cart__qty-input` ).val() * 1;

    const getMachineQty         =   $( `.cart__row[product-type="Machine"][vid="${ thisMachineVid }"] .cart__quantity-td .cart__qty-input` ).val() * 1;

    let getWarranty_count       =   0;

    if ( warrantyType == 'simpleWarranty' ) {
      getWarranty_count     =   $( `.cart__row[product-type="warranty"][matching-vid="${ thisMachineVid }"]` ).length;
    } else {
      getWarranty_count     =   $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ thisMachineVid }"]` ).length;
    }

    let getMatchedWarrantyQty   =   0;

    if ( getWarranty_count == 1 ) {
      reduceOrRemoveQty( this_ );
      return;
    } else if ( getWarranty_count > 1 ) {
      if ( warrantyType == 'simpleWarranty' ) {
        $( `.cart__row[product-type="warranty"][matching-vid="${ thisMachineVid }"]` ).each(function() {
          const getQty            =   $( this ).find( `.cart__quantity-td .cart__qty-input` ).val() * 1;
          getMatchedWarrantyQty   =   getMatchedWarrantyQty + getQty;
        });
      } else {
        $( `.cart__row[product-type="Extend Service Contract"][matching-vid="${ thisMachineVid }"]` ).each(function() {
          const getQty            =   $( this ).find( `.cart__quantity-td .cart__qty-input` ).val() * 1;
          getMatchedWarrantyQty   =   getMatchedWarrantyQty + getQty;
        });
      }
    }

    if ( getMachineQty > getMatchedWarrantyQty ) {
      reduceOrRemoveQty( this_ );
      return;
    } else {
      modalAlert( `Warranty quantity can not increase than machine's quantity.` );
      const getPreviousQty      =   row.attr( `data-cart-item-quantity` ) * 1;

      if ( isMobile == 'mobile' ) {
        row.find( `.cart__qty-input` ).val( getPreviousQty );
      } else {
        row.find( `.cart__quantity-td .cart__qty-input` ).val( getPreviousQty );
      }
    }

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

    await updateCart( updates );
    await getCartItems();

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
      $( '.getShippingResponseErr' ).text( '' );
      return__    =   res;
    })
    .fail(function( r ) {
      let collectData         =   '';

      if ( r.responseJSON != undefined ) {
        if ( r.responseJSON.province != undefined ) {
          const provinceErr   =   r.responseJSON.province;

          for ( let i = 0; i < provinceErr.length; i++ ) {
            const provinceE   =   r.responseJSON.province[i];
            collectData      +=   `<div>Province ${ provinceE }</div>`;
            // console.log ( 'provinceE', provinceE );
          }
        }
      }

      if ( r.responseJSON != undefined ) {
        if ( r.responseJSON.zip != undefined ) {
          const zipErr        =   r.responseJSON.zip;

          for ( let i = 0; i < zipErr.length; i++ ) {
            const zipE        =   r.responseJSON.zip[i];
            collectData      +=   `<div>Zip ${ zipE }</div>`;
            // console.log ( 'provinceE', zipE );
          }
        }
      }

      $( '#preloader' ).hide();

      $( '.getShippingResponseErr' ).html( collectData );

      return__    =   'error';
    })
    .always(function() {
      // console.log ( 'always'  );
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

    const getGroupNumber        =   $( `tr.cart__row.currentProcessing` ).attr( 'group' );

    if ( getGroupNumber != undefined ) {
      const currentQty          =   $( `tr.cart__row.currentProcessing .cart__quantity-td .cart__qty-input` ).val() * 1;

      if ( currentQty == 0 ) {

        const warrantyVariant     =   $( `.cart__row[product-type="warranty"][group="${ getGroupNumber }"]` ).attr( 'vid' ) * 1;

        const updates             =   `updates[${ warrantyVariant }]=0`;

        await updateCart( updates );
        await getCartItems();

      }

    }

    $.get('/pages/cart', async function ( r ) {

      $( '.cartItemLoop' ).html( r );

      setTimeout(async() => {
        pricesTotal();

        if ( typeof onceBuy !== 'undefined' ) {
          $( `tr.cart__row[product-type="warranty"]` )
            .addClass( 'readonly' );

          var qty__       =   $( `tr.cart__row[product-type="warranty"] .cart__quantity-td .cart__qty .cart__qty-input` ).val();

          var vid         =   $( `tr.cart__row[product-type="warranty"]` ).attr( `vid` ) * 1;

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

  }
  catch ( err ) {
    console.log ( 'ERROR makeMachineAndWarrantyGroup', err.message );
  }
}

function setCartCount() {
  try {

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
  catch ( err ) {
    console.log( `ERROR setCartCount`, err.message );
  }
}
