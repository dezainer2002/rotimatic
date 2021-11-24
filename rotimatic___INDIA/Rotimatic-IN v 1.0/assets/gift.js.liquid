$(document).ready(function () {

  console.clear();
  addParamToCurrency();
  priceSectionShowHide();

})

.on('click', '.gift__mainBanner .giftRotimatic',async function( e ) {
  try {

    const getCountryCode      =   $( `.gift__mainBanner ._countries_` ).val();

    if ( typeof getCountryCode !== 'undefined' && getCountryCode ) {

      // if ( typeof getCrtStatus === 'function' ) {

      //   await getCrtStatus( `.disclosure.disclosure-currency`, getCountryCode );

      // }

      if ( getCountryCode == 'INR' ) {

        location.href     =   `?gift=true`;

      } else {

        location.href     =   `https://rotimatic.com/products/rotimatic-gift?currency=${ getCountryCode }&gift=true`;

      }

      console.log ( 'getCountryCode', getCountryCode );

    }

  }
  catch ( err ) {
    console.log( `ERROR .gift__mainBanner .giftRotimatic`, err.message );
  }
})
;

async function priceSectionShowHide() {
  try {

    const isGiftActive        =   await getParam( `gift` );

    if ( typeof isGiftActive !== 'undefined' && isGiftActive && isGiftActive == 'true' ) {

      $( `.newTemp, #shopify-section-product-specifications` ).show();

      if ( typeof delay === 'function' ) {

        delay( 1000 );

      }

      if ( typeof isIndianCurrency === 'function' ) {

        isIndianCurrency();

      }

    }

  }
  catch ( err ) {
    console.log( `ERROR priceSectionShowHide()`, err.message );
  }
}

async function getParam ( paramIs ) {
  try {

    const url                 =   location.href;
    const objURL              =   new URL(url);
    const c                   =   objURL.searchParams.get( paramIs );
    return c;

  }
  catch ( err ) {
    console.log ( 'ERROR getParam', err.message );
  }
}

async function addParamToCurrency() {
  try {

    const returnTo_selector   =   $( `.currencySwitcher #localization_form input[name="return_to"]` );
    let getReturnTo           =   returnTo_selector.val();

    if ( getReturnTo.includes( `?` ) ) {

      getReturnTo             =   returnTo_selector.val( `${ getReturnTo }&gift=true` );

    } else {

      getReturnTo             =   returnTo_selector.val( `${ getReturnTo }?gift=true` );

    }

  }
  catch ( err ) {
    console.log( `ERROR addParamToCurrency`, err.message );
  }
}
