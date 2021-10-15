const proClass  =   {
  newTemp           :     'newTemp',
  _galleryWrapper_  :     '_galleryWrapper_',
  _thumbnails_      :     '_thumbnails_',
  _item_            :     '_item_',
  _mainProductImg_  :     '_mainProductImg_',
  _mainImg_         :     '_mainImg_',
  _productDetail_   :     '_productDetail_',
  _variants_        :     '_variants_'
};

// const iframe___   =   $( `#extend-offers-modal-iframe`).contents().find( `.button-link[name="decline"]` );

$( document )
.ready(function() {
  console.clear();
  const getVariant    =   getParam( `variant` );

  if ( getVariant != null ) {
    $( `#shopify-section-product-variantTabs ._variants_ ._item_:not( .selected )[vid="${ getVariant }"]` ).click();
  }

  // console.log ( 'getVariant', getVariant );
})

.on('click', `.${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }`, function( e ) {
  try {
    e.stopImmediatePropagation();

    const isActive    =   $( this ).hasClass( 'active' );

    const isVideo     =   $( this ).attr( 'type' );
    const iframeRrc   =   $( this ).attr( 'iframe-src' );

    if ( isActive == false ) {

      if ( isVideo == 'external_video' && iframeRrc != undefined && iframeRrc != '' ) {

        $( `.${ proClass._mainProductImg_ } .${ proClass._mainImg_ }` ).hide();

        $( `.${ proClass._mainProductImg_ } iframe._mainVideo_` ).show();

        $( `.${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }` ).removeClass( 'active' );

        $( this ).addClass( 'active' );

      } else {

        $( `.${ proClass._mainProductImg_ } iframe._mainVideo_` ).hide();

        const mainImg   =   $( this ).attr( 'main-img' );

        $( `.${ proClass._mainProductImg_ } .${ proClass._mainImg_ }` ).fadeIn().attr( 'src', mainImg );

        $( `.${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }` ).removeClass( 'active' );

        $( this ).addClass( 'active' );

      }

    }
  }
  catch ( err ) {
    console.log ( 'ERROR .${ proClass.newTemp } .${ proClass._galleryWrapper_ } .${ proClass._thumbnails_ } .${ proClass._item_ }', err.message );
  }
})

.on('click', `.${ proClass.newTemp } .${ proClass._productDetail_ } .${ proClass._variants_ } .${ proClass._item_ }:not(.selected)`, async function( e ) {
  try {
    e.stopImmediatePropagation();

    // const pageURL   =   $( `link[rel="canonical"]` ).attr( `href` );
    const pageHandle  =   $( this ).attr( `handle` );
    const pageURL     =   `/products/${ pageHandle }`;
    const variant     =   $( this ).attr( `vid` );
    // console.log ( 'chaaaaaaaaaaaa', pageURL );
    // console.log ( 'variant', variant );

    if ( pageURL != undefined && variant != undefined ) {

      $( '._productDetail_ [loading]' ).attr( 'loading', 'true' );
      $( '._productDetail_ [loadingBeforeAfter]' ).attr( 'loadingBeforeAfter', 'true' );

      $( `._variants_ ._item_` ).removeClass( `selected` );

      $( this ).addClass( `selected` );

      const getObject   =   await getRequest( `${ pageURL }?view=getDetail&variant=${ variant }` );

      applyHTML( getObject );
      // console.log ( 'getObject', getObject );

      $( '._productDetail_ [loading]' ).attr( 'loading', '' );
      $( '._productDetail_ [loadingBeforeAfter]' ).attr( 'loadingBeforeAfter', '' );
    }
  }
  catch ( err ) {
    console.log ( 'ERROR .${ proClass.newTemp } .${ proClass._productDetail_ } .${ proClass._variants_ } .${ proClass._item_ }', err.message );
  }
})

.on('click', '.extendedWarranty ._warranty_Item_', function( e ) {
  try {
    e.stopImmediatePropagation();

    const isSelected    =   $( this ).hasClass( `selected` );
    const sku           =   $( this ).attr( `sku` );

    console.log ( 'isSelected', isSelected );

    if ( isSelected ) {
      $( this ).removeClass( `selected` );
    } else {
      $( `.extendedWarranty ._warranty_Item_` ).removeClass( `selected` );
      $( this ).addClass( `selected` );
    }

    if ( sku != undefined ) {
      const isLinkAvailable   =   $( '.extend_WarrantyModal_ .footerGrid a.rightLink__' ).length;
      if ( isLinkAvailable > 0 ) {
        $( '.extend_WarrantyModal_ .footerGrid a.rightLink__' ).attr( `href`, `https://customers.extend.com/plan_details/${ sku }` );
      }
    }
  }
  catch ( err ) {
    console.log ( 'ERROR .extendedWarranty ._warranty_Item_', err.message );
  }
})

.on('click', '.btn_add2Cart.formBtn__add2Cart', function( e ) {
  try {
    e.stopImmediatePropagation();

    let productVariant    =   $( `._variants_ ._item_.selected` ).attr( 'vid' );
    let warrantyVariant   =   $( `#shopify-section-product-paymentBtn .extendedWarranty ._warranty_Item_.selected` ).attr( 'vid' );

    if ( warrantyVariant != undefined ) {
      console.log ( 'already selected' );

      let items             =   [];

      if ( productVariant != undefined && productVariant != '' ) {
        productVariant      =   productVariant * 1;

        items.push({
          quantity    :   1,
          id          :   productVariant
        });

        if ( warrantyVariant != undefined && warrantyVariant != '' ) {
          warrantyVariant   =   warrantyVariant * 1;

          items.push({
            quantity    :   1,
            id          :   warrantyVariant
          });

          let itemProperties      =   $( `#shopify-section-product-paymentBtn .extendedWarranty ._warranty_Item_.selected` ).attr( 'cart-properties' );

          if ( itemProperties != undefined ) {
            itemProperties        =   JSON.parse( itemProperties );
            items[1].properties   =   itemProperties.properties;
          }

        }
      }

      if ( items.length > 0 ) {

        console.log ( 'items', items );

        $.post(`/cart/add.js`, {items}, function ( r ) {
          location.href   =   '/cart';
        },"json");

      }
    } else {
      warrantyPopupModal( 'extend' );
    }

  }
  catch ( err ) {
    console.log ( 'ERROR .btn_add2Cart.formBtn__add2Cart', err.message );
  }
})

.on('click', '.btn_add2Cart:not(.processing):not(.disabled)',async function( e ) {
  try {
    e.stopImmediatePropagation();

    let productVariant    =   $( `._variants_ ._item_.selected` ).attr( 'vid' );
    let warrantyVariant   =   $( `#shopify-section-product-warranty .extendedWarranty ._warranty_Item_.selected` ).attr( 'vid' );

    const isForm          =   $( this ).hasClass( 'formBtn__add2Cart' );

    if ( isForm ) {
      e.preventDefault();
      warrantyPopupModal( 'extend' );
    } else {
      if ( warrantyVariant == undefined ) {
        warrantyPopupModal();

        return;
      }
    }

    let items             =   [];

    if ( productVariant != undefined && productVariant != '' ) {
      productVariant      =   productVariant * 1;

      items.push({
        quantity    :   1,
        id          :   productVariant
      });

      if ( warrantyVariant != undefined && warrantyVariant != '' ) {
        warrantyVariant   =   warrantyVariant * 1;

        items.push({
          quantity    :   1,
          id          :   warrantyVariant
        });
      }
    }

    if ( items.length > 0 ) {

      console.log ( 'items', items );

      let newItems  =   false;

      if ( newItems === true ) {

        console.log ( 'activate newItems', newItems );

        // await $.post(`/cart/clear.js`, function ( r ) {
        // },"json");
        // $.post(`/cart/add.js`, {items}, function ( r ) {
        //   location.href   =   '/cart';
        // },"json");

      } else {

        $.post(`/cart/add.js`, {items}, function ( r ) {
          location.href   =   '/cart';
        },"json");

      }

    }
  }
  catch ( err ) {
    console.log ( 'ERROR .btn_add2Cart.processing', err.message );
  }
})

.on('click', '._btnAddProtection_ .protectionBtn', function( e ) {
  try {
    e.stopImmediatePropagation();

    let productVariant            =   $( `._variants_ ._item_.selected` ).attr( 'vid' );
    let warrantyVariant           =   $( `._warrantyPopupModal_ .extendedWarranty ._warranty_Item_.selected` ).attr( 'vid' );
    const isExtendWarrantyModal   =   $( this ).closest( `.extend_WarrantyModal_` ).length;

    const items                   =   [];

    if ( productVariant != undefined && productVariant != '' ) {
      productVariant              =   productVariant * 1;

      items.push({
        quantity    :   1,
        id          :   productVariant
      });

      if ( warrantyVariant != undefined && warrantyVariant != '' ) {

        warrantyVariant           =   warrantyVariant * 1;

        items.push({
          quantity    :   1,
          id          :   warrantyVariant
        });

      } else if ( isExtendWarrantyModal > 0 ) {

        console.log ( 'asdfasdfasdf' );
        warrantyVariant           =   $( `.extend_WarrantyModal_ .extendedWarranty ._warranty_Item_.selected` ).attr( 'vid' );
        let itemProperties        =   $( `.extend_WarrantyModal_ .extendedWarranty ._warranty_Item_.selected` ).attr( 'cart-properties' );

        if ( warrantyVariant != undefined && warrantyVariant != '' ) {
          warrantyVariant         =   warrantyVariant * 1;

          items.push({
            quantity    :   1,
            id          :   warrantyVariant
          });

          if ( itemProperties != undefined ) {
            itemProperties        =   JSON.parse( itemProperties );
            items[1].properties   =   itemProperties.properties;
          }
        }

      }
    }

    if ( items.length > 0 ) {
      console.log ( 'items', items );

      $.post(`/cart/add.js`, {items}, function ( r ) {
        location.href   =   '/cart';
      },"json");
    }

  }
  catch ( err ) {
    console.log ( 'ERROR ._btnAddProtection_ .protectionBtn', err.message );
  }
})

.on('click', '._popupModal_ ._centerCenter_ ._makeGrid_ ._item_:not(.selected)', function( e ) {
  try {
    e.stopImmediatePropagation();

    const getTabNo    =   $( this ).attr( 'tab' );
    const tabSelector =   `._popupModal_ ._centerCenter_ ._makeGrid_ ._item_`;
    const tabTarget   =   `._popupModal_ ._centerCenter_ ._modelFooter_ ._tabContainer_`;

    $( tabSelector ).removeClass( 'selected' );
    $( tabTarget ).hide();

    $( `${ tabSelector }[tab="${ getTabNo }"]` ).addClass( 'selected' );
    $( `${ tabTarget }[tab="${ getTabNo }"]` ).show();

  }
  catch ( err ) {
    console.log ( 'ERROR ._popupModal_ ._centerCenter_ ._makeGrid_ ._item_:not(.selected)', err.message );
  }
})

.on('click', '#shopify-section-product-warranty svg.rotimaticCare', function( e ) {
  try {
    e.stopImmediatePropagation();

    const isAvailable   =   $( '._popupModal_' ).length;

    if ( isAvailable > 0 ) {
      $( '._popupModal_' ).fadeIn();
    }

  }
  catch ( err ) {
    console.log ( 'ERROR svg.rotimaticCare', err.message );
  }
})

.on('click', '._popupModal_ ._centerCenter_ ._close_', function( e ) {
  try {
    e.stopImmediatePropagation();

    $( '._popupModal_' ).fadeOut();
  }
  catch ( err ) {
    console.log ( 'ERROR ._popupModal_ ._centerCenter_ ._close_', err.message );
  }
})

.on('click', '._warrantyPopupModal_ ._centerCenter_ ._close_', function( e ) {
  try {
    e.stopImmediatePropagation();

    $( `._warrantyPopupModal_` ).fadeOut();
  }
  catch ( err ) {
    console.log ( 'ERROR ._warrantyPopupModal_ ._centerCenter_ ._close_', err.message );
  }
})

.on('click', '._warrantyPopupModal_ ._centerCenter_ .noThanks', function( e ) {
  try {
    e.stopImmediatePropagation();

    let productVariant    =   $( `._variants_ ._item_.selected` ).attr( 'vid' );

    const items           =   [];

    if ( productVariant != undefined && productVariant != '' ) {
      productVariant      =   productVariant * 1;

      items.push({
        quantity    :   1,
        id          :   productVariant
      });
    }

    if ( items.length > 0 ) {
      console.log ( 'items', items );

      $.post(`/cart/add.js`, {items}, function ( r ) {
        location.href   =   '/cart';
      },"json");
    }
  }
  catch ( err ) {
    console.log ( 'ERROR ._warrantyPopupModal_ ._centerCenter_ .noThanks', err.message );
  }
})

.on('click', '.extend_WarrantyModal_ ._centerCenter_ .noThanks', function( e ) {
  try {
    e.stopImmediatePropagation();

    let productVariant    =   $( `._variants_ ._item_.selected` ).attr( 'vid' );

    const items           =   [];

    if ( productVariant != undefined && productVariant != '' ) {
      productVariant      =   productVariant * 1;

      items.push({
        quantity    :   1,
        id          :   productVariant
      });
    }

    if ( items.length > 0 ) {
      console.log ( 'items', items );

      $.post(`/cart/add.js`, {items}, function ( r ) {
        location.href   =   '/cart';
      },"json");
    }
  }
  catch ( err ) {
    console.log ( 'ERROR .extend_WarrantyModal_ ._centerCenter_ .noThanks', err.message );
  }
})

.on('click', '._warrantyPopupModal_ .showMoreLessData ._item_', function( e ) {
  try {
    e.stopImmediatePropagation();

    const getClickedTab    =   $( this ).attr( 'tab' );

    $( this ).closest( '.showMoreLessData' ).attr( 'active-tab', getClickedTab );
  }
  catch ( err ) {
    console.log ( 'ERROR ._warrantyPopupModal_ .showMoreLessData ._item_', err.message );
  }
})

.on('click', '._warrantyPopupModal_ .showMoreLessData .showMoreLessLink', function( e ) {
  try {
    e.stopImmediatePropagation();

    const showMoreOrLess    =   $( this ).closest( '.showMoreLessData' ).attr( 'active-tab' );

    if ( showMoreOrLess == '' ) {
      $( this ).closest( '.showMoreLessData' ).attr( 'active-tab', 't_1' );
    } else {
      $( this ).closest( '.showMoreLessData' ).attr( 'active-tab', '' );
    }

  }
  catch ( err ) {
    console.log ( 'ERROR ._warrantyPopupModal_ .showMoreLessData .showMoreLessLink', err.message );
  }
})

.on('click', '.extend_WarrantyModal_ ._close_', function( e ) {
  try {
    e.stopImmediatePropagation();

    $( '.extend_WarrantyModal_ ._centerCenter_ .noThanks' ).click();

    // $( this ).closest( `.extend_WarrantyModal_` ).hide();
  }
  catch ( err ) {
    console.log ( 'ERROR .extend_WarrantyModal_ ._close_', err.message );
  }
})
;

function warrantyPopupModal( isExtend = '' ) {
  try {
    if ( isExtend == 'extend' ) {
      const isAvailableExtendModal     =   $( `.extend_WarrantyModal_` ).length;

      if ( isAvailableExtendModal > 0 ) {
        $( `.extend_WarrantyModal_` ).fadeIn();

        const warrantyHTML    =   $( `#shopify-section-product-paymentBtn .extendedWarranty` ).html();

        $( `.extend_WarrantyModal_ .extendedWarranty` ).html( warrantyHTML );

        $( `.extend_WarrantyModal_ .extendedWarranty ._warranty_Item_:nth-child(2)` ).addClass( `selected` );
      }
    } else {
      const isAvailable       =   $( `._warrantyPopupModal_` ).length;

      if ( isAvailable > 0 ) {
        $( `._warrantyPopupModal_` ).fadeIn();

        const warrantyHTML    =   $( `#shopify-section-product-warranty .extendedWarranty` ).html();

        $( `._warrantyPopupModal_ .extendedWarranty` ).html( warrantyHTML );

        $( `._warrantyPopupModal_ .extendedWarranty ._warranty_Item_:first-child` ).addClass( `selected` );
      }
    }
  }
  catch ( err ) {
    console.log ( 'ERROR warrantyPopupModal', err.message );
  }
}

async function getRequest( url ) {
  try {
    let productObject;
    await fetch( url )
    .then(response => response.json())
    .then(data => {
      productObject     =   data;
    });

    return productObject;
  }
  catch ( err ) {
    console.log ( 'Error getRequest', err.message );
  }
}

function applyHTML( o ) {
  try {

    if ( o.variant_title != undefined ) {
      $( `#shopify-section-product-variantTabs .prodInfo h1` ).text( o.variant_title );
    }

    if ( o.currency != undefined ) {
      $( `#shopify-section-product-variantTabs .prodInfo ._price_ .isoCode` ).text( o.currency );
    }

    if ( o.variant_price != undefined ) {
      $( `#shopify-section-product-variantTabs .prodInfo ._price_ .money` ).text( o.variant_price );
    }

    if ( o.installmentContent != undefined ) {
      $( `#shopify-section-product-installment ._installment_ span` ).text( o.installmentContent );
    }

    if ( o.productDetail != undefined ) {
      $( `#shopify-section-product-detail .bulletContent ul` ).html( o.productDetail );
    }

    if ( o.productWarranty != undefined ) {
      $( `#shopify-section-product-warranty ._warrantyTitle_` ).html( o.productWarranty );
    }

    if ( o.warrantyVariants != undefined ) {
      const isSimpleWarranty    =   $( `#shopify-section-product-warranty .extendedWarranty` ).length;
      const isExtendWarranty    =   $( `#shopify-section-product-paymentBtn .extendedWarranty` ).length;

      if ( isSimpleWarranty > 0 ) {
        $( `#shopify-section-product-warranty .extendedWarranty` ).html( o.warrantyVariants );
      } else if ( isExtendWarranty > 0 ) {
        $( `#shopify-section-product-paymentBtn .extendedWarranty` ).html( o.warrantyVariants );

        checkingIframe('#extend-offer .extend-product-offer iframe');
      }
    }

    if ( o.variant_id != undefined ) {
      $( `.afterAdd2Cart__Installment ._InstallmentGrid_[data-splitit="true"]` ).hide();
      $( `.afterAdd2Cart__Installment ._InstallmentGrid_[data-splitit="true"][vid="${ o.variant_id }"]` ).css('display', 'grid');

      $( `.addToCartForm input[name="id"]` ).val( o.variant_id );
      Extend.setActiveProduct('#extend-offer', o.variant_id);
    }

    if ( o.cartItemsCount >= 4 ) {
      $( `#shopify-section-product-paymentBtn .btn_add2Cart` )
        .addClass( `disabled` )
        .find( `span` )
        .text( `Already in cart` );
      // $( `#shopify-section-product-paymentBtn .btn_add2Cart span` ).text( `${ o.isAddedInCart ? 'Already in cart' : 'ADD TO CART' }` );
      // if ( o.isAddedInCart ) {
      //   $( `#shopify-section-product-paymentBtn .btn_add2Cart` ).addClass( `disabled` );
      // } else {
      //   $( `#shopify-section-product-paymentBtn .btn_add2Cart` ).removeClass( `disabled` );
      // }
    } else if ( o.cartItemsCount < 4 ) {
      $( `#shopify-section-product-paymentBtn .btn_add2Cart` )
        .removeClass( `disabled` )
        .find( `span` )
        .text( `ADD TO CART` );
    }

    if ( o.currency != undefined ) {
      if ( o.currency == 'USD' ) {
        $( `klarna-placement[data-purchase-amount]` ).attr( `data-purchase-amount`, o.klarna_price );
        setTimeout(()=>{
          window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' })
        }, 100);
      }
    }

  }
  catch ( err ) {
    console.log ( 'ERROR applyHTML', err.message );
  }
}

function deleteByValue( object, delByValue ) {
  try {
    for ( var f in object ) {
      // console.log ( 'object[f]', object[f] );
      if ( object[f].id == delByValue ) {
        delete object[f];
      }
    }
  }
  catch ( err ) {
    console.log ( 'ERROR deleteByValue', err.message );
  }
}

checkingIframe('#extend-offer .extend-product-offer iframe');

function checkingIframe( selectorIs ) {
  var divCheckingInterval       =   setInterval( function() {
    if ( document.querySelector( selectorIs ) ) {
      // console.log( 'As Function Found!' );
      clearInterval( divCheckingInterval );
      const getIframe__ID       =   $( selectorIs ).attr( 'id' );

      // Do something
      $( `#${ getIframe__ID }`)
        .contents()
        .find( `.button-group` )
        .hide();
      setTimeout(()=>{
        $( `#${ getIframe__ID }`)
        .css('max-height', '20px');
      },200);
    }
  }, 100);
}

function getParam ( paramIs ) {
  try {
    const url     =   location.href;
    const objURL  =   new URL(url);
    const c       =   objURL.searchParams.get( paramIs );
    return c;
  }
  catch ( err ) {
    console.log ( 'ERROR getParam', err.message );
  }
}

