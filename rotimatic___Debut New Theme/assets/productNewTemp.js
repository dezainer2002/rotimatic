const proClass  =   {
  newTemp           :     'newTemp',
  _galleryWrapper_  :     '_galleryWrapper_',
  _thumbnails_      :     '_thumbnails_',
  _item_            :     '_item_',
  _mainProductImg_  :     '_mainProductImg_',
  _mainImg_         :     '_mainImg_'
}

$( document )
.ready(function() {
  // alert();
})

.on('click', `.${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }`, function( e ) {
  try {
    e.stopImmediatePropagation();

    const isActive    =   $( this ).hasClass( 'active' );

    if ( isActive == false ) {
      const mainImg   =   $( this ).attr( 'main-img' );

      $( `.${ proClass._mainProductImg_ } .${ proClass._mainImg_ }` ).attr( 'src', mainImg );

      $( `.${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }` ).removeClass( 'active' );

      $( this ).addClass( 'active' );

    }
  }
  catch ( err ) {
    console.log ( 'ERROR .${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }', err.message );
  }
})
;
