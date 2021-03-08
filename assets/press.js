window.addEventListener('load', function() {
  $(() => {
    $.getScript(`${ asset_url }slick.min.js`, function ( r ) {
      $('.pressSlider').not('.slick-initialized').slick({
        dots          :   false,
        infinite      :   true,
        speed         :   300,
        slidesToShow  :   1,
        slidesToScroll:   1,
        arrows        :   true
      });
      // $( '.pressSlider' ).show();
    });
  });
});