function isInViewport( this_ ) {
  try {
    const elementTop      =   $( this_ ).offset().top;
    const elementBottom   =   elementTop + $( this_ ).outerHeight();

    const viewportTop     =   $(window).scrollTop();
    const viewportBottom  =   viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
  catch ( err ) {
    console.log ( 'Error isInViewport', err.message );
  }
}
