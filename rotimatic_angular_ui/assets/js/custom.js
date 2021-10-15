$(document)
.ready(function () {

  try {

    resizer_();

  }
  catch ( err ) {

    console.log ( 'ERROR .ready', err.message );

  }

})

.on('click', '.rightPanel .burgerMenu', function( e ) {

  try {

    e.stopImmediatePropagation();

    const status        =   $( this ).attr( 'status' );

    const screenWidth   =   $( window ).width();

    if ( screenWidth > 768 ) {

      if ( status == 'burger' ) {

        $( this ).attr( 'status', 'close' );
        $( '.leftBar' ).animate({'width': '70px'}, function() {
          $( '.leftBar .sidebar__menuText' ).hide();
        });
        $( '.rightPanel' ).animate({'margin-left': '70px'});

      } else if ( status == 'close' ) {

        $( this ).attr( 'status', 'burger' );
        $( '.leftBar' ).animate({'width': '240px'}, function() {
          $( '.leftBar .sidebar__menuText' ).show();
        });
        $( '.rightPanel' ).animate({'margin-left': '240px'});

      }

    } else if ( screenWidth < 769 ) {

      if ( status == 'burger' ) {

        $( this ).attr( 'status', 'close' );
        $( '.leftBar' ).animate({'width': '240px'});

      } else if ( status == 'close' ) {

        $( this ).attr( 'status', 'burger' );
        $( '.leftBar' ).animate({'width': '0px'});

      }

    }

  }

  catch ( err ) {

    console.log ( 'ERROR', err.message );

  }

});

$( window ).resize(function () {

  try {

    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){

      resizer_();

    }, 250);

  }

  catch ( err ) {

    console.log ( 'ERROR resize', err.message );

  }

});

function resizer_() {

  try {

    const screenWidth   =   $( window ).width();

    if ( screenWidth > 768 ) {

      // console.log ( 'larger' );
      $( '.rightPanel .burgerMenu' ).attr( 'status', 'burger' );
      $( '.leftBar' ).animate({'width': '240px'}, function() {
        $( '.leftBar .sidebar__menuText' ).show();
      });
      $( '.rightPanel' ).animate({'margin-left': '240px'});

    } else if ( screenWidth < 769 ) {

      // console.log ( 'smaller' );
      $( '.rightPanel .burgerMenu' ).attr( 'status', 'burger' );
      $( '.leftBar' ).animate({'width': '0px'}, function() {
        $( '.leftBar .sidebar__menuText' ).show();
      });
      $( '.rightPanel' ).animate({'margin-left': '0'});

    }

  }

  catch ( err ) {

    console.log ( 'ERROR resizer_', err.message );

  }

}
