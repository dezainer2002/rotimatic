$( document )
.on('click', '#AccessibleNav #SiteNav .site-nav--has-dropdown', function( e ) {
  try {
    e.stopImmediatePropagation();

    const isActive    =   $( this ).hasClass( 'site-nav--active-dropdown' );

    $( '#AccessibleNav #SiteNav .site-nav--has-dropdown' ).removeClass( 'site-nav--active-dropdown' );

    if ( isActive ) {
      $( this ).removeClass( 'site-nav--active-dropdown' );
    } else {
      $( this ).addClass( 'site-nav--active-dropdown' );
    }
  }
  catch ( err ) {
    console.log ( 'ERROR .AccessibleNav', err.message );
  }
})

.mouseup(function( e ) {
    var container   =   $( '#AccessibleNav #SiteNav .site-nav--has-dropdown' );

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass( 'site-nav--active-dropdown' );
    }
})

;