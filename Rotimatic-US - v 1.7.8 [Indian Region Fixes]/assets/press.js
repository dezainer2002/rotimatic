window.addEventListener('load', function() {
  $(() => {
    $.getScript(`${ asset_url }slick.min.js`, function ( r ) {
      $('.pressSlider').not('.slick-initialized').slick({
        dots          :   false,
        infinite      :   true,
        autoplay      :   true,
        speed         :   300,
        slidesToShow  :   1,
        slidesToScroll:   1,
        arrows        :   true
      });
      // $( '.pressSlider' ).show();
    });
  });

  $(document)
    .on('click', '.showMoreOrLess .showMoreOrLess_link', function ( e ) {
      e.stopImmediatePropagation();

      const wrapperSelector   =   $( '.pressAboutRotimatic_wrapper' ).attr( 'state' );
      const selector          =   $( '.press_aboutRotimatic .pressAboutRotimatic_wrapper .pressAboutRotimatic_Item[state]' );

      if ( wrapperSelector == 'hide' ) {
        selector.fadeIn( '500' );
        $( '.pressAboutRotimatic_wrapper' ).attr( 'state', 'show' );
        $( this ).text( 'Show Less' );
      } else if ( wrapperSelector == 'show' ) {
        selector.fadeOut( '500' );
        $( '.pressAboutRotimatic_wrapper' ).attr( 'state', 'hide' );
        $( this ).text( 'Show More' );
      }

    });
});