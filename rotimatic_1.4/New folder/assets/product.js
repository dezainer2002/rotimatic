getIPAddress();
async function getIPAddress() {
  await fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
      userDetail = data;
    });
    console.log ( 'locationDetail', userDetail );
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