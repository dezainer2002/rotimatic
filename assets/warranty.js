$( document )
  .ready(function() {
    $('html, body').animate({
      scrollTop: $( '#PageContainer' ).offset().top
    }, 500);
  })
  .on('click', '.warranty_api_integration__findRotimaticNumber > a', function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration__modal' ).addClass( 'active' );
  })
  .on('click', '.warranty_api_integration__modal .closeModal', function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration__modal' ).removeClass( 'active' );
  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showMore', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).addClass( 'active' );

  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showLess', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
  })
  .on('click', '.warranty_moreAbout_rotimatic__showMoreBtn > a', function( e ) {
    e.stopImmediatePropagation();

    const parentWrapper   =   $( this ).closest( '.warranty_moreAbout_rotimatic__innerWrap' );

    if ( parentWrapper.hasClass( 'open' ) ) {

      parentWrapper.removeClass( 'open' );
      $( '.warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
      $( this ).find( '.showLess_text' ).text( 'Show more' );

    } else {

      parentWrapper.addClass( 'open' );
      $( '.warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).addClass( 'active' );
      $( this ).find( '.showLess_text' ).text( 'Show less' );

    }
  })
  .on('keyup', '.emailorRef', function( e ) {
    e.stopImmediatePropagation();

    $( this ).attr( 'value', $( this ).val() );
  })
  .on('click', '.warranty_faqs .warranty_faqs__question', function( e ) {
    e.stopImmediatePropagation();

    const isActive          =   $( this ).closest( '.warranty_faqs__item' );
    const classNametoCheck  =   'active';

    if ( isActive.hasClass( classNametoCheck ) ) {

      isActive.removeClass( classNametoCheck );

    } else {

      isActive.addClass( classNametoCheck );

    }
  })

  .on('click', '.warranty_api_integration .warranty_api_integration__inputGrid .warranty_api_integration__btn', async function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration .warranty_api_integration__loader' ).show();

    $( '.warranty_api_integration__modal__ordersList .showSelectedDetail' ).removeClass( 'active' );

    await fetchAndManipulate( this );

    $( '.warranty_api_integration .warranty_api_integration__loader' ).hide();

  })

  .on('click', '.warranty_api_integration__modal__ordersList ._ordersList_ ._item_:not(.selected)', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '._ordersList_' ).find( '._item_' ).removeClass( 'selected' );

    $( this ).addClass( 'selected' );

    $( this ).closest( '.warranty_api_integration__modal__ordersList' ).find( '.showSelectedDetail' ).addClass( 'active' );

  })

  .on('click', '.warranty_api_integration__modal__ordersList ._closeIt_', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.warranty_api_integration__modal__ordersList' ).removeClass( 'active' );

  })

  .on('click', '.warranty_api_integration__modal__ordersList .showSelectedDetail.active', async function( e ) {
    e.stopImmediatePropagation();

    let warrantyDetail    =   $( this ).closest( '.centerCenter_' ).find( '._ordersList_ ._item_.selected' ).attr( 'warranty-detail' );

    if ( warrantyDetail != undefined && warrantyDetail != '' ) {

      warrantyDetail      =   JSON.parse( warrantyDetail );
      warrantyDetail.clickedBtn   =   this;

      // console.log ( 'warrantyDetail', warrantyDetail );

      await requireOnce( `${ asset_url }__warrantyDetail`, `warrantyManipulate`, warrantyDetail );

    }

  })

  .on('click', '.apiResponseLayer ._checkAnotherMachine_', function( e ) {
    e.stopImmediatePropagation();

    $( '.warranty_api_integration .simpleForm' ).fadeIn();
    $( this ).closest( '.apiResponseLayer' ).fadeOut();

    $('html, body').animate({
      scrollTop: $( '.warranty_api_integration' ).offset().top
    }, 500);

    $( '.warranty_api_integration__inputGrid' )
      .removeClass( 'not_valid' )
      .find( '.emailorRef' )
      .val( '' )
      .focus();
  })

  .on('click', '.buyWarranty .buyWarranty__addToCart:not([cart-status="added"]) .add2Cart', function( e ) {
    e.stopImmediatePropagation();

    const btnWrapper        =   $( this ).closest( '.buyWarranty__addToCart' );
    const getVariantID      =   $( this ).attr( 'vid' );
    let getMachineNumber    =   $( '.apiResponseLayer ._machineCode_' ).text().trim();
    let getWarrantyPlan     =   $( this ).attr( 'warranty-plan' );

    if ( getVariantID != undefined && getVariantID != '' ) {

      console.log ( 'getMachineNumber', getMachineNumber );
      console.log ( 'getVariantID', getVariantID );

      const cartObject    =     {
        items: [
          {
            quantity    :   1,
            id          :   getVariantID * 1,
            properties  :   {
              'Warranty Plan'   : `${ getWarrantyPlan }`,
              'Machine Number'  : `${ getMachineNumber }`
            }
          }
        ]
      };
      $.post('/cart/add.js', cartObject, function ( r ) {

        $.get('/cart.js', function ( cart ) {

          console.log ( 'cart', cart );
          if ( cart.item_count != undefined ) {

            $( '#CartCount' )
              .removeClass( 'hide' )
              .find( 'span[data-cart-count]' )
              .text( cart.item_count );

            btnWrapper.attr( 'cart-status', 'added' );

          }

        }, "json");

      }, "json");
    }
  })
  ;

  var rtime;
  var timeout = false;
  var delta = 200;
  $(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });

  function resizeend() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      // console.log ( 'resize finish' );

      afterResizingAdjustCards();
    }
  }

  function afterResizingAdjustCards() {
    const getWidth    =   $( window ).width();

    if ( getWidth > 768 ) {
      $( '.warranty_moreAbout_rotimatic__innerWrap' ).removeClass( 'open' );
      $( '.warranty_moreAbout_rotimatic__innerWrap .warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
      console.log ( 'desktop screen' );
    }
  }

async function fetchAndManipulate( this_ ) {

  const inputWrapper    =   $( this_ ).closest( '.warranty_api_integration__inputGrid' );

  const emailOrRef      =   inputWrapper.find( '.emailorRef' ).val();

  const reqObj          =   {
    url       :   'https://60aqpll7ak.execute-api.us-east-1.amazonaws.com/prod/warranty/check',
    headers   :   {
      'Content-Type'  :   'application/json',
      'x-api-key'     :   'JwoRNqsOLG5D2djeGip5E7bEpEgcQg0w9olkf5n8'
    },
    data      :   {}
  };

  if ( emailOrRef != '' && emailOrRef.length > 3 ) {

    if ( emailOrRef.includes( '@' ) ) {
      // console.log ( 'email is', emailOrRef );
      reqObj.data.email          =   emailOrRef.trim();

    } else {

      reqObj.data.machine_number =   emailOrRef.trim();

    }

  }

  console.clear();

  console.log ( 'reqObj', reqObj );

  let getResponse     =   await requireOnce(`${ asset_url }__fetchRequest`, 'fetchReq_POST', reqObj);

  if ( getResponse.error === true || getResponse.message != undefined ) {

    handleError( this_, getResponse );

  } else {

    apiResponse   =   getResponse;

    await popupManipulate( reqObj );

  }

}

function handleError( this_, err ) {
  const wrapper   =   $( this_ ).closest( '.warranty_api_integration__inputGrid' );
  wrapper.find( '.msg' ).text( `${ err.message }` );
  wrapper.addClass( 'not_valid' );
}

async function popupManipulate( reqObj ) {
  console.log ( 'apiResponse', apiResponse );

  if ( typeof apiResponse.data != 'undefined' ) {
    const totalObjects    =   apiResponse.data.length;

    if ( totalObjects > 0 ) {

      $( '.warranty_api_integration__modal__ordersList ._ordersList_' ).empty();

      for ( let i = 0; i < totalObjects; i++ ) {

        const r             =   apiResponse.data[i];
        const stringify__   =   JSON.stringify( r );

        $( '.warranty_api_integration__modal__ordersList ._ordersList_' )
          .append( `
            <div class="_item_" warranty-detail='${ stringify__ }'>${ r.machine_number }</div>
          ` );

      }

      if ( totalObjects > 0 && reqObj.data.email != undefined && reqObj.data.email != '') {

        $( '.warranty_api_integration__modal__ordersList' )
          .addClass( 'active' )
          .find( '._detail_ .totalOrders' )
          .text( totalObjects )
          .closest( '._detail_' )
          .show()
          .find( '.orderEmail' )
          .text( reqObj.data.email );

      } else if ( totalObjects > 0 && reqObj.data.machine_number != undefined && reqObj.data.machine_number != '' ) {

        $( '.warranty_api_integration__modal__ordersList' )
          .find( '._ordersList_ > ._item_' )
          .addClass( 'selected' )
          .closest( '.warranty_api_integration__modal__ordersList' )
          .find( '.showSelectedDetail' )
          .addClass( 'active' );

        await manipulateSelectedItem( $( '.warranty_api_integration__modal__ordersList .showSelectedDetail.active' ) );

      }

    }

  }
}

async function manipulateSelectedItem( this_ ) {
  let warrantyDetail    =   $( this_ ).closest( '.centerCenter_' ).find( '._ordersList_ ._item_.selected' ).attr( 'warranty-detail' );

  if ( warrantyDetail != undefined && warrantyDetail != '' ) {

    warrantyDetail      =   JSON.parse( warrantyDetail );
    warrantyDetail.clickedBtn   =   this_;

    await requireOnce( `${ asset_url }__warrantyDetail`, `warrantyManipulate`, warrantyDetail );

  }
}
