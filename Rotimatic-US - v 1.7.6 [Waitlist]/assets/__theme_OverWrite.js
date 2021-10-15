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
  try {
    var container   =   $( '#AccessibleNav #SiteNav .site-nav--has-dropdown' );

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass( 'site-nav--active-dropdown' );
    }
  }
  catch ( err ) {
    console.log ( 'ERROR mouseup', err.message );
  }
})

.on('click', '.btn--link.site-header__icon.site-header__menu.js-mobile-nav-toggle.mobile-nav--open', function( e ) {
  try {
    e.stopImmediatePropagation();
    const selector            =   $( `nav.mobile-nav-wrapper.medium-up--hide.critical-hidden` );
    const isClassAvailable    =   selector.hasClass( `js-menu--is-open` );

    if ( isClassAvailable ) {
      $( this ).find( `.icon-hamburger` ).css('display', 'flex');
      $( this ).find( `.icon-close` ).css('display', 'none');
      selector.removeClass( `js-menu--is-open` );
      selector.css('transform', `translateY(0px)`);
    } else {
      $( this ).find( `.icon-hamburger` ).css('display', 'none');
      $( this ).find( `.icon-close` ).css('display', 'flex');
      selector.addClass( `js-menu--is-open` );
      let getHeight     =   $( `header.site-header` ).outerHeight( true );
      selector.css('transform', `translateY(${ getHeight }px)`);
    }

    console.log ( 'isClassAvailable', isClassAvailable );
  }
  catch ( err ) {
    console.log ( 'ERROR mouseup', err.message );
  }
})

.on('click', 'ul#MobileNav .btn--link.js-toggle-submenu.mobile-nav__link', function( e ) {
  try {
    e.stopImmediatePropagation();
    $( this ).closest( `nav` ).addClass( `sub-nav--is-open` );
    $( this ).next( `.mobile-nav__dropdown` ).addClass( `is-closing` );
    $( this ).addClass( `mobile-nav__link--active is-active` );
  }
  catch ( err ) {
    console.log ( 'ERROR ul#MobileNav', err.message );
  }
})

.on('click', '.btn--link.js-toggle-submenu.mobile-nav__return-btn', function( e ) {
  try {
    e.stopImmediatePropagation();
    $( this ).closest( `nav` ).removeClass( `sub-nav--is-open` );
    $( this ).next( `.mobile-nav__dropdown` ).removeClass( `is-closing` );
    $( this ).removeClass( `mobile-nav__link--active is-active` );
  }
  catch ( err ) {
    console.log ( 'ERROR ul#MobileNav', err.message );
  }
})

;

