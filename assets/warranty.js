const svgLoader   =   '<svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/><line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5"><animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></line><line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74"><animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" /></line></svg>';

$( document )
  .on('click', '.warranty_api_integration__findRotimaticNumber > a', function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration__modal' ).addClass( 'active' );
  })
  .on('click', '.warranty_api_integration__modal .closeModal', function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration__modal' ).removeClass( 'active' );
  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showMore', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).addClass( 'active' );
  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showLess', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
  })
  .on('click', '.warranty_moreAbout_rotimatic__showMoreBtn > a', function( e ) {
    e.stopImmediatePropagation();

    const parentWrapper   =   $( this ).closest( '.warranty_moreAbout_rotimatic__innerWrap' );

    if ( parentWrapper.hasClass( 'open' ) ) {
      parentWrapper.removeClass( 'open' );
      $( '.warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
      $( this ).find( '.showLess_text' ).text( 'Show more' );
    } else {
      parentWrapper.addClass( 'open' );
      $( '.warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).addClass( 'active' );
      $( this ).find( '.showLess_text' ).text( 'Show less' );
    }
  })
  .on('keyup', '.emailorRef', function( e ) {
    e.stopImmediatePropagation();

    $( this ).attr( 'value', $( this ).val() );
  })
  .on('click', '.warranty_faqs .warranty_faqs__question', function( e ) {
    e.stopImmediatePropagation();

    const isActive          =   $( this ).closest( '.warranty_faqs__item' );
    const classNametoCheck  =   'active';

    if ( isActive.hasClass( classNametoCheck ) ) {
      isActive.removeClass( classNametoCheck );
    } else {
      isActive.addClass( classNametoCheck );
    }
  })

  .on('click', '.warranty_api_integration .warranty_api_integration__inputGrid .warranty_api_integration__btn', async function( e ) {
    e.stopImmediatePropagation();

    fetchAndManipulate( this );
  })
  ;

async function fetchAndManipulate( this_ ) {

  const inputWrapper    =   $( this_ ).closest( '.warranty_api_integration__inputGrid' );

  const emailOrRef      =   inputWrapper.find( '.emailorRef' ).val();

  const reqObj          =   {
    url       :   'https://60aqpll7ak.execute-api.us-east-1.amazonaws.com/prod/warranty/check',
    headers   :   {
      'Content-Type'  :   'application/json',
      'x-api-key'     :   'JwoRNqsOLG5D2djeGip5E7bEpEgcQg0w9olkf5n8'
    },
    data      :   {}
  };

  if ( emailOrRef != '' && emailOrRef.length > 3 ) {

    if ( emailOrRef.includes( '@' ) ) {
      console.log ( 'email is', emailOrRef );
      reqObj.data.email          =   emailOrRef;
    } else {
      reqObj.data.machine_number =   emailOrRef;
    }

  }

  console.log ( 'reqObj', reqObj );

  const getResponse     =   await requireOnce(`${ asset_url }__fetchRequest.js`, 'fetchReq_POST', reqObj);

  if ( getResponse.error === true ) {
    handleError( this_, getResponse );
  }

}

function handleError( this_, err ) {
  const wrapper   =   $( this_ ).closest( '.warranty_api_integration__inputGrid' );
  wrapper.find( '.msg' ).text( `${ err.message }` );
  wrapper.addClass( 'not_valid' );
}