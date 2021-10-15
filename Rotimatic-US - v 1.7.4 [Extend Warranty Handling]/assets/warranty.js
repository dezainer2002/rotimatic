$( document )
  .ready(function() {
    $('html, body').animate({
      scrollTop: $( '#PageContainer' ).offset().top
    }, 500);
  })
  .on('click', '.warranty_api_integration__findRotimaticNumber > a', function( e ) {
    try {
      e.stopImmediatePropagation();

      $( '.warranty_api_integration__modal' ).addClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration__findRotimaticNumber > a`, err.message );
    }
  })
  .on('click', '.warranty_api_integration__modal .closeModal', function( e ) {
    try {
      e.stopImmediatePropagation();

      $( '.warranty_api_integration__modal' ).removeClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration__modal .closeModal`, err.message );
    }
  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showMore', function( e ) {
    try {

      e.stopImmediatePropagation();

      $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).addClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_moreAbout_rotimatic__blocks__item__actions .showMore`, err.message );
    }
  })
  .on('click', '.warranty_moreAbout_rotimatic__blocks__item__actions .showLess', function( e ) {
    try {

      e.stopImmediatePropagation();

      $( this ).closest( '.warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_moreAbout_rotimatic__blocks__item__actions .showLess`, err.message );
    }
  })
  .on('click', '.warranty_moreAbout_rotimatic__showMoreBtn > a', function( e ) {
    try {

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

    }
    catch ( err ) {
      console.log( `ERROR .warranty_moreAbout_rotimatic__showMoreBtn > a`, err.message );
    }
  })
  .on('keyup', '.emailorRef', function( e ) {
    try {

      e.stopImmediatePropagation();

      $( this ).attr( 'value', $( this ).val() );

    }
    catch ( err ) {
      console.log( `ERROR .emailorRef`, err.message );
    }
  })
  .on('click', '.warranty_faqs .warranty_faqs__question', function( e ) {
    try {

      e.stopImmediatePropagation();

      const isActive          =   $( this ).closest( '.warranty_faqs__item' );
      const classNametoCheck  =   'active';

      if ( isActive.hasClass( classNametoCheck ) ) {

        isActive.removeClass( classNametoCheck );

      } else {

        isActive.addClass( classNametoCheck );

      }

    }
    catch ( err ) {
      console.log( `ERROR .warranty_faqs .warranty_faqs__question`, err.message );
    }
  })

  .on('click', '.warranty_api_integration .warranty_api_integration__inputGrid .warranty_api_integration__btn', async function( e ) {
    try {

      e.stopImmediatePropagation();

      const getValue    =   $( '.warranty_api_integration__inputGrid .emailorRef' ).val();

      if ( getValue != undefined && getValue.length > 5 ) {

        $( '#preloader' ).show();

        $( '.warranty_api_integration__modal__ordersList .showSelectedDetail' ).removeClass( 'active' );

        await fetchAndManipulate( this );

        $( '#preloader' ).hide();

      }

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration .warranty_api_integration__inputGrid .warranty_api_integration__btn`, err.message );
    }
  })

  .on('click', '.warranty_api_integration__modal__ordersList ._ordersList_ ._item_:not(.selected)', function( e ) {
    try {

      e.stopImmediatePropagation();

      $( this ).closest( '._ordersList_' ).find( '._item_' ).removeClass( 'selected' );

      $( this ).addClass( 'selected' );

      $( this ).closest( '.warranty_api_integration__modal__ordersList' ).find( '.showSelectedDetail' ).addClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration__modal__ordersList ._ordersList_ ._item_:not(.selected)`, err.message );
    }
  })

  .on('click', '.warranty_api_integration__modal__ordersList ._closeIt_', function( e ) {
    try {

      e.stopImmediatePropagation();

      $( this ).closest( '.warranty_api_integration__modal__ordersList' ).removeClass( 'active' );

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration__modal__ordersList ._closeIt_`, err.message );
    }
  })

  .on('click', '.warranty_api_integration__modal__ordersList .showSelectedDetail.active', async function( e ) {
    try {

      e.stopImmediatePropagation();

      let warrantyDetail    =   $( this ).closest( '.centerCenter_' ).find( '._ordersList_ ._item_.selected' ).attr( 'warranty-detail' );

      if ( warrantyDetail != undefined && warrantyDetail != '' ) {

        warrantyDetail      =   JSON.parse( warrantyDetail );
        warrantyDetail.clickedBtn   =   this;

        await requireOnce( `${ asset_url }__warrantyDetail`, `warrantyManipulate`, warrantyDetail );

      }

    }
    catch ( err ) {
      console.log( `ERROR .warranty_api_integration__modal__ordersList .showSelectedDetail.active`, err.message );
    }
  })

  .on('click', '.apiResponseLayer ._checkAnotherMachine_', function( e ) {
    try {

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

    }
    catch ( err ) {
      console.log( `ERROR .apiResponseLayer ._checkAnotherMachine_`, err.message );
    }
  })

  .on('click', '.buyWarranty .buyWarranty__addToCart:not([cart-status="added"]) .add2Cart', function( e ) {
    try {

      e.stopImmediatePropagation();

      const buyWarranty__packagesDiv  =   $( this ).closest( '.buyWarranty__packages' );

      const checkAlreadyAddedInCart   =   buyWarranty__packagesDiv.attr( 'product-added' );

      if ( checkAlreadyAddedInCart == 'false' ) {

        const btnWrapper                =   $( this ).closest( '.buyWarranty__addToCart' );
        const getVariantID              =   $( this ).attr( 'vid' );
        let getMachineNumber            =   $( '.apiResponseLayer ._machineCode_' ).text().trim();
        let getWarrantyPlan             =   $( this ).attr( 'warranty-plan' );

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

            productAddedInCart( 'Added in cart', '_green_', r.items[0].title );

            buyWarranty__packagesDiv.attr( 'product-added', 'true' );

            $.get('/cart.js', function ( cart ) {

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

      } else {

        productAddedInCart( 'Warning', '_red_', 'You already added warranty into cart' );

      }

    }
    catch ( err ) {
      console.log( `ERROR .buyWarranty .buyWarranty__addToCart:not([cart-status="added"]) .add2Cart`, err.message );
    }
  })

  .on('click', '._statusGrid_ ._item_._second_.extendable', function( e ) {
    try {

      e.stopImmediatePropagation();

      const scrollTo    =   $( '.buyWarranty__packages' ).offset().top;

      $('html, body').animate({
        scrollTop: scrollTo - 100
      }, 500);

    }
    catch ( err ) {
      console.log( `ERROR ._statusGrid_ ._item_._second_.extendable`, err.message );
    }
  })
  ;

  var rtime;
  var timeout   =   false;
  var delta     =   200;
  $(window).resize(function() {
    try {

      rtime       =   new Date();
      if (timeout === false) {
        timeout   =   true;
        setTimeout(resizeend, delta);
      }

    }
    catch ( err ) {
      console.log( `ERROR $(window).resize`, err.message );
    }
  });

  function resizeend() {
    try {

      if (new Date() - rtime < delta) {

        setTimeout(resizeend, delta);

      } else {

        timeout = false;
        // console.log ( 'resize finish' );

        afterResizingAdjustCards();
      }

    }
    catch ( err ) {
      console.log( `ERROR resizeend()`, err.message );
    }
  }

  function afterResizingAdjustCards() {
    try {

      const getWidth    =   $( window ).width();

      if ( getWidth > 768 ) {

        $( '.warranty_moreAbout_rotimatic__innerWrap' ).removeClass( 'open' );
        $( '.warranty_moreAbout_rotimatic__innerWrap .warranty_moreAbout_rotimatic__blocks .warranty_moreAbout_rotimatic__blocks__item' ).removeClass( 'active' );
        console.log ( 'desktop screen' );

      }

    }
    catch ( err ) {
      console.log( `ERROR afterResizingAdjustCards()`, err.message );
    }
  }

async function fetchAndManipulate( this_ ) {
  try {

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
  catch ( err ) {
    console.log( `ERROR fetchAndManipulate`, err.message );
  }
}

function handleError( this_, err ) {
  try {

    const wrapper   =   $( this_ ).closest( '.warranty_api_integration__inputGrid' );
    wrapper.find( '.msg' ).text( `${ err.message }` );
    wrapper.addClass( 'not_valid' );

  }
  catch ( err ) {
    console.log( `ERROR handleError`, err.message );
  }
}

async function popupManipulate( reqObj ) {
  try {

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

          console.log ( 'chaaaaaaa' );
          $( 'body' ).addClass( 'bodyDisabled' );

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
  catch ( err ) {
    console.log( `ERROR popupManipulate`, err.message );
  }
}

async function manipulateSelectedItem( this_ ) {
  try {

    let warrantyDetail            =   $( this_ ).closest( '.centerCenter_' ).find( '._ordersList_ ._item_.selected' ).attr( 'warranty-detail' );

    if ( warrantyDetail != undefined && warrantyDetail != '' ) {

      warrantyDetail              =   JSON.parse( warrantyDetail );
      warrantyDetail.clickedBtn   =   this_;

      await requireOnce( `${ asset_url }__warrantyDetail`, `warrantyManipulate`, warrantyDetail );

    }

  }
  catch ( err ) {
    console.log( `ERROR manipulateSelectedItem`, err.message );
  }
}
