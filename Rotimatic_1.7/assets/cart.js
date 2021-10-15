$( document )
  .on('click', '.estimateShippingBtnWrapper .estimateBtn',async function( e ) {
    e.stopImmediatePropagation();

    try {
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

;

async function getShippingRates( country, state, zip ) {
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