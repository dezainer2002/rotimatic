async function warrantyManipulate( obj ) {
  console.log ( 'obj', obj );

  const this_   =   obj.clickedBtn;

  const el      =   $( '.apiResponseLayer' );
  el.find( '._machineCode_' ).text( obj.machine_number != undefined ? obj.machine_number : '' );

  console.log ( 'obj.warranty_extension_period', obj.warranty_extension_period.legnth );

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

    el.find( '._conclusionMsg_ .noteligible__' ).fadeOut();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeIn();

  } else if ( obj.warranty_extension_period[0] == 'REGULAR_1_YEAR' ) {

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'active' )
      .find( '._item__status' )
      .text( 'Active' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'extendable' )
      .find( '._item__status' )
      .text( 'Extendable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeOut();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeIn();

  } else if ( obj.warranty_extension_period[0] == 'PREMIUM_1_YEAR' ) {

    el.find( '._statusGrid_ ._item_._first_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'active' )
      .find( '._item__status' )
      .text( 'Active' );

    el.find( '._statusGrid_ ._item_._second_' )
      .removeClass( 'active inactive extendable unavailable' )
      .addClass( 'extendable' )
      .find( '._item__status' )
      .text( 'Extendable' );

    el.find( '._conclusionMsg_ .noteligible__' ).fadeOut();
    el.find( '._conclusionMsg_ .buyWarranty' ).fadeIn();

  } else if ( obj.warranty_extension_period[0] == 'CAN_NOT_EXTEND_WARRANTY' ) {

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

  }

  $( this_ ).closest( '.warranty_api_integration__modal__ordersList' ).removeClass( 'active' );

  $( '.warranty_api_integration .simpleForm' ).fadeOut();

  el.fadeIn();
}

// {
//   "machine_number": "ZM12345xxx",
//   "warranty_start_date": "2021-03-16",
//   "warranty_end_date": "2022-03-16",
//   "warranty_extension_period": [
//       "REGULAR_1_YEAR",
//       "REGULAR_2_YEAR"
// ['NO_ACTIVE_WARRANTY']  OR
// ['REGULAR_1_YEAR', 'REGULAR_2_YEAR'] OR
// ['PREMIUM_1_YEAR', 'PREMIUM_2_YEAR'] OR
// ['CAN_NOT_EXTEND_WARRANTY']
//   ],
//   "clickedBtn": {
//       "_lo_node_map_id_d27acbf3": 918
//   }
// }