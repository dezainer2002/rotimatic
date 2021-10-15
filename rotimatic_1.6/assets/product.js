getIPAddress();
async function getIPAddress() {
  try {
    await fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
      userDetail = data;
    });
    console.log ( 'locationDetail', userDetail );
  }
  catch ( err ) {
    console.log ( 'ERROR getIPAddress', err.message );
  }
}

getBrowsingContextSuggestions();

async function getBrowsingContextSuggestions() {
  try {
    await fetch('/browsing_context_suggestions.json')
    .then(response => response.json())
    .then(data => {
      browsingContext = data;
    });

    if ( browsingContext != undefined && browsingContext.detected_values != undefined && browsingContext.detected_values.country_name != undefined ) {
      const countryName               =   browsingContext.detected_values.country_name;

      const getValueShippingCountry   =   $( '.estimatedShipping_countryWise' ).val();

      let state__                   =   '';
      let zip__                     =   '';

      if ( countryName != getValueShippingCountry ) {

        const checkCountry    =   $( `.estimatedShipping_countryWise option[value="${ countryName }"]` ).length;

        console.log ( 'checkCountry', checkCountry );

        if ( checkCountry > 0 ) {

          if ( countryName == 'Singapore' ) {
            state__     =   'Our Tampines Hub';
            zip__       =   '528523';
          } else if ( countryName == 'Germany' ) {
            state__     =   'Hamburg';
            zip__       =   '22525';
          } else if ( countryName == 'United Kingdom' ) {
            state__     =   'Scotland';
            zip__       =   'KY12 9DT';
          }

          $('.estimatedShipping_countryWise').val(`${ countryName }`).change();

          const shippingDetail    =   await getShippingRates( countryName, state__, zip__ );

          console.log ( 'shippingDetail', shippingDetail );

        }

        console.log ( 'not matched' );
      }

      console.log ( 'My Country', countryName );
      console.log ( 'Country Name', getValueShippingCountry );
    }

  }
  catch ( err ) {
    console.log ( 'ERROR getBrowsingContextSuggestions', err.message );
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


$( document )
  .on('blur keyup', '#popupForm #Email, #popupForm #Name', function() {
    disableEnableBTN();
  })

  .on('change click', '#popupForm #terms', function() {
    disableEnableBTN();
  })
  .on('click', '.haveReadTerms .fakeCheckbox', function( e ) {
    e.stopImmediatePropagation();

    const checkBox          =   $( this ).find( '#terms' );

    const checkBoxStatus    =   checkBox.is( ':checked' );

    if ( checkBoxStatus ) {
      checkBox.prop( 'checked', false );
    } else {
      checkBox.prop( 'checked', true );
    }

    disableEnableBTN();
  })

  .on('click', '.outOfStock__',async function( e ) {
    e.stopImmediatePropagation();

    const browsingDetail    =   await getCountryName();

    let countryName   =   '';
    if ( browsingDetail != undefined ) {
      if ( browsingDetail.detected_values != undefined ) {
        if ( browsingDetail.detected_values.country_name != undefined ) {
          countryName   =   browsingDetail.detected_values.country_name;
        }
      }
    }
    console.log ( 'browsingDetail', browsingDetail.detected_values.country_name );

    const tags         =   `product_id: ${ $( this ).attr( 'pid' ) }, Customer_IP: ${ userDetail.ip != undefined ? userDetail.ip : '' }, Customer_Country: ${ countryName }, Out of stock`;

    $( `input[name="contact[tags]"]` ).attr( 'value', tags );

    $( '._modal_' ).slideDown();

  })

  .on('click', '._modal_ .centerCenter ._close_', function( e ) {
    e.stopImmediatePropagation();

    $( '._modal_' ).slideUp();
  })
;

async function getCountryName() {
  const url     =   '/browsing_context_suggestions.json';
  let returnIs;
  await $.getJSON(`${ url }`, function ( r ) {
    returnIs  =   r;
  });
  return returnIs;

}

function disableEnableBTN() {
  const f       =   $( '#popupForm' );

  const email           =   f.find( '#Email' ).val();
  const name            =   f.find( '#Name' ).val();
  const termsAccepted   =   f.find( '#terms' ).is(':checked');

  if ( email != '' && email.length > 8 && email.includes( '@' ) && name != '' && name.length > 2 && termsAccepted ) {

    f.find( '.createUserBtn' ).prop( 'disabled', false );

  } else {

    f.find( '.createUserBtn' ).prop( 'disabled', true );

  }
}