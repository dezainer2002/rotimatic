$( document )
.on('click', '.annoucementBar ._close_', function( e ) {
  try {
    e.stopImmediatePropagation();

    $( this ).closest( `.annoucementBar` ).slideUp();

    setTimeout(()=> {
      $( this ).closest( `.annoucementBar` ).remove();
    }, 500);

  }
  catch ( err ) {
    console.log ( 'ERROR .annoucementBar ._close_', err.message );
  }
});
