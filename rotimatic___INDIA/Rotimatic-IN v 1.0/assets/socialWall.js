var $grid = $('._grid_').packery({
  itemSelector  : '._grid-item_',
  gutter        : desktopMargins__gutter,
  resize        : true
});

window.addEventListener('load', function() {

  const screenWidth   =   $( window ).width();

  if ( screenWidth > 768 ) {

    $grid.packery();

  } else {

    $grid.packery({gutter: mobileMargins__gutter});

  }

});

let rtime;
let timeout     =   false;
let delta       =   200;
$(window).resize(function() {
  try {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  }
  catch ( err ) {
    console.log ( 'ERROR window resize', err.message );
  }
});

function resizeend() {
  try {
    if (new Date() - rtime < delta) {

      setTimeout(resizeend, delta);

    } else {

      timeout = false;

      const screenWidth   =   $( window ).width();

      if ( screenWidth > 768 ) {

        $grid.packery({gutter: desktopMargins__gutter});

      } else {

        $grid.packery({gutter: mobileMargins__gutter});

      }

    }
  }
  catch ( err ) {
    console.log ( 'ERROR resizeend', err.message );
  }
}
