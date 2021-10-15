$( document )
.on('click', '.trackOrder__btn', function( e ) {
  e.stopImmediatePropagation();

  const inputWrapper    =   $( this ).closest( '.trackOrder__inputGrid' );

  const trackingNumber  =   inputWrapper.find( '.trackingNumber' ).val();

  if ( trackingNumber != '' && trackingNumber.length > 8 ) {
    const url   =   `https://rotimaticus.aftership.com/${ trackingNumber }?page-name=tracking-page`;
    $( '.showTrackingResult' )
      .html(`
        <iframe src="${ url }" frameborder="0" class="trackingFrame"></iframe>
      `);
  }

})


;

