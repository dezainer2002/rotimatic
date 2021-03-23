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
  ;