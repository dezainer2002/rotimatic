async function warrantyManipulate( obj ) {
  console.log ( 'obj', obj );

  const this_   =   obj.clickedBtn;

  const el      =   $( '.apiResponseLayer' );
  el.find( '._machineCode_' ).text( obj.machine_number != undefined ? obj.machine_number : '' );

  console.log ( 'obj.warranty_extension_period', obj.warranty_extension_period.length );

  el.find( '._statusGrid_ ._item_._first_ ._item__dates .startsOn' ).text( obj.warranty_start_date );
  el.find( '._statusGrid_ ._item_._first_ ._item__dates .expiresOn' ).text( obj.warranty_end_date );

  if ( obj.warranty_extension_period[0] == 'NO_ACTIVE_WARRANTY' ) {

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'inactive' )
      .find( '._item__status' )
      .text( 'Inactive' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'unavailable' )
      .find( '._item__status' )
      .text( 'Unavailable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeIn();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeOut();

    $( '.noteligible__ .noteligible__title span[msg-type="default"]' ).fadeIn();
    $( '.noteligible__ .noteligible__title span[msg-type="maxCoverage"]' ).fadeOut();

  } else if ( obj.warranty_extension_period[0] == 'REGULAR_1_YEAR' ) {

    if ( obj.warranty_extension_period[1] != undefined && obj.warranty_extension_period[1] == 'REGULAR_2_YEAR' ) {
      el.find( '.buyWarranty__packages .buyWarranty__item[i="3"], .buyWarranty__packages .buyWarranty__item[i="4"]' ).fadeOut();
      el.find( '.buyWarranty__packages .buyWarranty__item[i="1"], .buyWarranty__packages .buyWarranty__item[i="2"]' ).fadeIn();
    } else {
      el.find( '.buyWarranty__packages .buyWarranty__item[i="2"], .buyWarranty__packages .buyWarranty__item[i="3"], .buyWarranty__packages .buyWarranty__item[i="4"]' ).fadeOut();
      el.find( '.buyWarranty__packages .buyWarranty__item[i="1"]' ).fadeIn();
    }

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( obj.warranty_active ? 'active' : 'inactive' )
      .find( '._item__status' )
      .text( obj.warranty_active ? 'Active' : 'Inactive' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'extendable' )
      .find( '._item__status' )
      .text( 'Extendable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeOut();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeIn();

    $( '.noteligible__ .noteligible__title span[msg-type="default"]' ).fadeIn();
    $( '.noteligible__ .noteligible__title span[msg-type="maxCoverage"]' ).fadeOut();

  } else if ( obj.warranty_extension_period[0] == 'PREMIUM_1_YEAR' ) {

    if ( obj.warranty_extension_period[1] != undefined && obj.warranty_extension_period[1] == 'PREMIUM_2_YEAR' ) {
      el.find( '.buyWarranty__packages .buyWarranty__item[i="1"], .buyWarranty__packages .buyWarranty__item[i="2"]' ).fadeOut();
      el.find( '.buyWarranty__packages .buyWarranty__item[i="3"], .buyWarranty__packages .buyWarranty__item[i="4"]' ).fadeIn();
    } else {
      el.find( '.buyWarranty__packages .buyWarranty__item[i="1"], .buyWarranty__packages .buyWarranty__item[i="2"], .buyWarranty__packages .buyWarranty__item[i="4"]' ).fadeOut();
      el.find( '.buyWarranty__packages .buyWarranty__item[i="3"]' ).fadeIn();
    }

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( obj.warranty_active ? 'active' : 'inactive' )
      .find( '._item__status' )
      .text( obj.warranty_active ? 'Active' : 'Inactive' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'extendable' )
      .find( '._item__status' )
      .text( 'Extendable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeOut();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeIn();

    $( '.noteligible__ .noteligible__title span[msg-type="default"]' ).fadeIn();
    $( '.noteligible__ .noteligible__title span[msg-type="maxCoverage"]' ).fadeOut();

  } else if ( obj.warranty_extension_period[0] == 'CAN_NOT_EXTEND_WARRANTY' ) {

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( obj.warranty_active ? 'active' : 'inactive' )
      .find( '._item__status' )
      .text( obj.warranty_active ? 'Active' : 'Inactive' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'unavailable' )
      .find( '._item__status' )
      .text( 'Unavailable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeIn();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeOut();

    if ( obj.warranty_active === true ) {
      $( '.noteligible__ .noteligible__title span[msg-type="default"]' ).fadeOut();
      $( '.noteligible__ .noteligible__title span[msg-type="maxCoverage"]' ).fadeIn();
    } else {
      $( '.noteligible__ .noteligible__title span[msg-type="default"]' ).fadeIn();
      $( '.noteligible__ .noteligible__title span[msg-type="maxCoverage"]' ).fadeOut();
    }

  } else if ( obj.warranty_extension_period[0] == 'MACHINE_REPLACED' ) {

  }

  $( this_ ).closest( '.warranty_api_integration__modal__ordersList' ).removeClass( 'active' );

  $( '.warranty_api_integration .simpleForm' ).fadeOut();

  el.fadeIn();
}
