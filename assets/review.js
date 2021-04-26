window.addEventListener('load', function() {
  setTimeout(() => {
    $( '#shopify-product-reviews' ).css({
      'opacity': '1',
      'visibility': 'visible'
    });
  }, 3000);
});

$(document).ready(function () {
  onLoadPage();
});

function onLoadPage() {
  const getSectionId    =   $( '.loadSection[sid]' ).attr( 'sid' );

  if ( getSectionId != undefined && getSectionId != '' ) {
    $.get(`/?section_id=${ getSectionId }`, function ( data ) {
      $( '.loadSection[sid]' )
        .html( data );
    });
  }

  const getProductHandle    =   $( '.loadSection[product-handle]' ).attr( 'product-handle' );

  if ( getProductHandle != undefined && getProductHandle != '' ) {
    $.get(`/products/${ getProductHandle }?view=reviewsOnly`, function ( data ) {
      $( '.loadSection[product-handle]' ).html( data );
    });
  }
}

