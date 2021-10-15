const myVar = setInterval(checkCurrency, 5000);

function checkCurrency() {
  try {

    const loadedCurrency    =     Shopify.currency.active;
    const currentCurrency   =     localStorage.getItem( `currentCurrency__` );

    const getCartItemCount  =     localStorage.getItem( `cartItemCount__` );

    const previousCartCount =     $( `#CartCount > span[data-cart-count]` ).text();

    if ( previousCartCount != undefined ) {
      if ( getCartItemCount != previousCartCount ) {
        if ( getCartItemCount == 0 ) {
          $( `#CartCount` )
            .addClass( `hide` )
            .find( `span[data-cart-count]` )
            .text( getCartItemCount );
        } else {
          $( `#CartCount` )
            .removeClass( `hide` )
            .find( `span[data-cart-count]` )
            .text( getCartItemCount );
        }

        const isCartPage    =   $( `body.template-cart` ).length;
        if ( isCartPage > 0 ) {
          const getLocation   =   location.href;
          location.href       =   getLocation;
        }
      }
    }

    if ( loadedCurrency != currentCurrency ) {
      // console.log ( 'currency changed' );
      const getLocation   =   location.href;
      location.href       =   getLocation;
    }

  }
  catch ( err ) {
    console.log( `ERROR checkCurrency()`, err.message );
  }
}