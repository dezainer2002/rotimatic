$(()=>{
  onLoadFunction();
});

function onLoadFunction() {
  $.getScript( `${ asset_url }slick.min.js` , function () {
    addSlickSlider();
  });
}

function addSlickSlider() {
  $('.blogSlider').not('.slick-initialized').slick({
    centerMode    :   true,
    slidesToShow  :   1,
    centerPadding :   '25%',
    infinite      :   true,
    speed         :   300,
    slidesToScroll:   1,
    arrows        :   false,
    dots          :   true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '20%'
        }
      },
      {
        breakpoint: 1400,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '18%'
        }
      },
      {
        breakpoint: 1200,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '15%'
        }
      },
      {
        breakpoint: 1100,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '10%'
        }
      },
      {
        breakpoint: 1000,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '5%'
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerMode    :   true,
          slidesToShow  :   1,
          centerPadding :   '0%'
        }
      }
    ]
  });

  $( '.blogSlider.loading' ).removeClass( 'loading' );
}

