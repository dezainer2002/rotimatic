if ( typeof require === 'function' ) {
  require( `${ asset_url }__trackOrderCR__.js` );
}

window.addEventListener('load', function() {

  localStorage.removeItem( ___orderObj___ );

});

$( document )
.ready(function() {

  console.clear();

})

.on('click', '.fullWidthPage[step="2"] ._backBtn_', function( e ) {
  try {

    e.stopImmediatePropagation();

    $( `.fullWidthPage[step="1"]` ).removeClass( `_hide_` );
    $( `.fullWidthPage[step="2"]` ).addClass( `_hide_` );

    $( `._prepairingData_, .shippingEstimate_` ).removeAttr( `style` );

    $( `.orderNumberBlock .orderNumber, .orderNumberBlock .email, .trackingNumberBlock .trackingNumber` ).attr( `value`, `` ).val( `` ).prop( `value`, `` );

  }
  catch ( err ) {
    console.log( `ERROR .fullWidthPage[step="2"] ._backBtn_`, err.message );
  }
})

.on('keyup', '.orderNumberBlock .orderNumber, .orderNumberBlock .email, .trackingNumberBlock .trackingNumber', function( e ) {
  try {

    e.stopImmediatePropagation();

    let inputVal                =   $( this ).val();
    inputVal                    =   inputVal.replace( ` `, `` );

    $( this ).attr( 'value', inputVal ).val( inputVal );

  }
  catch ( err ) {
    console.log( `ERROR .orderNumberBlock .orderNumber, .orderNumberBlock .email, .trackingNumberBlock .trackingNumber`, err.message );
  }
})

.on('click', '.linkWrapper ._link_', function( e ) {
  try {

    $( this ).closest( `.actionBlock` ).hide();
    $( this ).closest( `.formArea` ).find( `.subTitle_type > div` ).hide();
    const getTarget             =   $( this ).attr( `target-class` );

    $( `${ getTarget }` ).show();

  }
  catch ( err ) {
    console.log( `ERROR .linkWrapper ._link_`, err.message );
  }
})

.on('click', '.trackOrder__by_orderNumber',async function( e ) {
  try {

    e.stopImmediatePropagation();

    loader( `.orderNumberBlock`, `show`, `processing` );

    let goNext                      =   false;

    const getFormStatus             =   await validateForm__orderNumber();

    if ( typeof getFormStatus !== 'undefined' && getFormStatus ) {

      const getStatus               =   await getOrderDetail( getFormStatus );

      // console.log ( 'getStatus', getStatus );

      if ( typeof getStatus !== 'undefined' && getStatus ) {

        loader( `.orderNumberBlock`, `hide`, `processing` );

        return;

      }

      const getTrackingNumber       =   await setStatus();

      if ( typeof getTrackingNumber !== 'undefined' && getTrackingNumber ) {

        const getShippingData       =   await getAfterShip( getTrackingNumber, `orderNameAndEmail` );

        if ( typeof getShippingData !== 'undefined' && getShippingData ) {

          if ( getShippingData == 'error' ) {

            let orderObj         =   await localStorage.getItem( ___orderObj___ );
            orderObj             =   await JSON.parse( orderObj );

            if ( typeof orderObj.fulfillments !== 'undefined' && orderObj.fulfillments && typeof orderObj.fulfillments[0] !== 'undefined' && orderObj.fulfillments[0] && typeof orderObj.fulfillments[0].shipment_status !== 'undefined' && orderObj.fulfillments[0].shipment_status ) {

              let getShipmentStatus   =   orderObj.fulfillments[0].shipment_status;
              getShipmentStatus       =   getShipmentStatus.toLowerCase();

              if ( getShipmentStatus == 'delivered' ) {

                $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 4 );
                $( `._prepairingData_, .shippingEstimate_` ).hide();

              }

            }

          } else {

            const getDeliveryStatus   =   await applyTrackingData( getShippingData );

            if ( typeof getDeliveryStatus !== 'undefined' && getDeliveryStatus ) {

              $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 4 );
              $( `.afterShipTrackingData .__head__ .expactedDelivery` ).hide();

            } else {

              $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 3 );
              $( `.afterShipTrackingData .__head__ .expactedDelivery` ).show();

            }

            $( `._prepairingData_, .shippingEstimate_` ).hide();

          }

        }

      }

      await prepairingData();

      await orderLineItems();

      await billingDetail();

      await shippingDetail();

      await noteDiv();

      goNext                        =   true;

    }

    loader( `.orderNumberBlock`, `hide`, `processing` );

    if ( goNext ) {

      $( `.fullWidthPage[step="1"]` ).addClass( `_hide_` );
      $( `.fullWidthPage[step="2"]` ).removeClass( `_hide_` );

    }

  }
  catch ( err ) {
    console.log( `ERROR .trackOrder__by_orderNumber`, err.message );
  }
})

.on('click', '.trackOrder__by_trackingNumber',async function( e ) {
  try {

    e.stopImmediatePropagation();

    loader( `.orderNumberBlock`, `show`, `processing` );

    let goNext                  =   false;

    // await getOrderDetail();

    const getShippingData       =   await getAfterShip( this );

    if ( typeof getShippingData !== 'undefined' && getShippingData ) {

      if ( getShippingData == 'error' || getShippingData == 'Tracking not found.' ) {

        $( this ).closest( `.trackingNumberBlock` ).find( `.errMsg` ).html( ___msgs___.trackingNumberErr ).show();

        return;
      }

      const getDeliveryStatus   =   await applyTrackingData( getShippingData );

      if ( typeof getDeliveryStatus !== 'undefined' && getDeliveryStatus ) {

        $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 4 );
        $( `.afterShipTrackingData .__head__ .expactedDelivery` ).hide();

      } else {

        $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 3 );
        $( `.afterShipTrackingData .__head__ .expactedDelivery` ).show();

      }

      $( `._prepairingData_, .shippingEstimate_` ).hide();

      goNext                    =   true;

    }

    // await orderLineItems();

    // await billingDetail();

    // await shippingDetail();

    await noteDiv();

    loader( `.orderNumberBlock`, `hide`, `processing` );

    if ( goNext ) {

      $( `.fullWidthPage[step="1"]` ).addClass( `_hide_` );
      $( `.fullWidthPage[step="2"]` ).removeClass( `_hide_` );

    }

  }
  catch ( err ) {
    console.log( `ERROR .trackOrder__by_trackingNumber`, err.message );
  }
})
;

async function setStatus() {
  try {

    let orderObj         =   await localStorage.getItem( ___orderObj___ );
    orderObj             =   await JSON.parse( orderObj );

    if ( typeof orderObj.cancelled_at !== 'undefined' && orderObj.cancelled_at ) {

      $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 5 );

      $( `._prepairingData_ .isCancelled` ).show();
      $( `._prepairingData_ .notCancelled` ).hide();

      $( `.shippingEstimate_, .afterShipTrackingData, .orderDetail_lineItems, .billShip, .note` ).addClass( `cancelled` );

    } else {

      $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 1 );

      if ( typeof orderObj.financial_status !== 'undefined' && orderObj.financial_status ) {

        if ( orderObj.financial_status == 'paid' || orderObj.financial_status == '"partially_refunded"' ) {

          $( `.orderStatusHead .orderStatus` ).attr( `step-active`, 2 );

        }

      }

      if ( typeof orderObj.fulfillment_status !== 'undefined' && orderObj.fulfillment_status ) {

        if ( typeof orderObj.fulfillments !== 'undefined' && orderObj.fulfillments && typeof orderObj.fulfillments[0] !== 'undefined' && orderObj.fulfillments[0] && typeof orderObj.fulfillments[0].tracking_number !== 'undefined' && orderObj.fulfillments[0].tracking_number ) {

          return orderObj.fulfillments[0].tracking_number;

        }

      }

      $( `._prepairingData_ .isCancelled` ).hide();
      $( `._prepairingData_ .notCancelled` ).show();

      $( `.shippingEstimate_, .afterShipTrackingData, .orderDetail_lineItems, .billShip, .note` ).removeClass( `cancelled` );

    }

    return false;

  }
  catch ( err ) {
    console.log( `ERROR setStatus()`, err.message );
  }
}

async function prepairingData() {
  try {

    let orderObj          =   await localStorage.getItem( ___orderObj___ );
    orderObj              =   await JSON.parse( orderObj );

    let customerName      =   ``;
    let orderNumber       =   ``;
    let orderDate         =   ``;
    let shippingProfile   =   ``;
    let shippingFromDate  =   ``;
    let shippingToDate    =   ``;
    let getOrderDate      =   ``;

    if ( typeof orderObj.name !== 'undefined' && orderObj.name ) {

      orderNumber         =   orderObj.name;

    }

    if ( typeof orderObj.customer !== 'undefined' && orderObj.customer ) {

      customerName        =   `${ orderObj.customer.first_name } ${ orderObj.customer.last_name }`;

    }

    if ( typeof orderObj.processed_at !== 'undefined' && orderObj.processed_at ) {

      orderDate           =   await dateTime( orderObj.processed_at, `dateOnly` );
      getOrderDate        =   orderObj.processed_at;

    }

    if ( typeof orderObj.shipping_lines[0].code !== 'undefined' && orderObj.shipping_lines[0].code ) {

      shippingProfile     =   orderObj.shipping_lines[0].code;

      if ( typeof shippingProfile !== 'undefined' && shippingProfile && shippingProfile.includes( `Shipping` ) ) {

        shippingProfile   =   ``;

      }

      // console.log ( 'shippingProfile', shippingProfile );

      const breakIt_      =   shippingProfile.split( ` ` )[0];
      const moreBreakIt_  =   breakIt_.split( `-` );
      const startNumber   =   moreBreakIt_[0] * 1;
      const endNumber     =   moreBreakIt_[1] * 1;

      if ( shippingProfile.includes( `Months` ) ) {

        shippingFromDate  =   await addDays( getOrderDate, (startNumber * 30) );
        shippingToDate    =   await addDays( getOrderDate, (endNumber * 30) );

        shippingFromDate  =   await dateTime( shippingFromDate, `dateOnly` );
        shippingToDate    =   await dateTime( shippingToDate, `dateOnly` );

      } else if ( shippingProfile.includes( `Weeks` ) ) {

        shippingFromDate  =   await addDays( getOrderDate, (startNumber * 7) );
        shippingToDate    =   await addDays( getOrderDate, (endNumber * 7) );

        shippingFromDate  =   await dateTime( shippingFromDate, `dateOnly` );
        shippingToDate    =   await dateTime( shippingToDate, `dateOnly` );

      } else if ( shippingProfile.includes( `Days` ) ) {

        shippingFromDate  =   await addDays( getOrderDate, startNumber );
        shippingToDate    =   await addDays( getOrderDate, endNumber );

        shippingFromDate  =   await dateTime( shippingFromDate, `dateOnly` );
        shippingToDate    =   await dateTime( shippingToDate, `dateOnly` );

      }

    }

    $( `._prepairingData_ .customerName` ).text( customerName );
    $( `._prepairingData_ ._orderNumber_` ).text( orderNumber );
    $( `._prepairingData_ .orderDate, .shippingEstimate_ .orderDate` ).text( orderDate );
    $( `._prepairingData_ .shippingProfileName` ).text( typeof shippingProfile !== 'undefined' && shippingProfile ? `${ ___msgs___.shippingProfileName } ${ shippingProfile }` : ``  );

    if ( typeof shippingFromDate !== 'undefined' && shippingFromDate && typeof shippingToDate !== 'undefined' && shippingToDate ) {

      $( `._prepairingData_ .startAndEndDate` ).html( `${ ___msgs___.by }<span class="shippingProfileEndDate_14_days">${ shippingFromDate }</span>${ ___msgs___.to }<span class="shippingProfileEndDate_7_days">${ shippingToDate }</span>` );

      $( `.shippingEstimate_ .estimatedShippingDates` ).html( `<span class="_from_">${ shippingFromDate }</span>${ ___msgs___.dash }<span class="_to_">${ shippingToDate }</span>` );

    } else {

      $( `._prepairingData_ .startAndEndDate` ).text( ___msgs___.ASAP );
      $( `.shippingEstimate_ .estimatedShippingDates` ).text( ___msgs___.estimatedShippingDates );

    }

  }
  catch ( err ) {
    console.log( `ERROR prepairingData()`, err.message );
  }
}

async function loader( selector, type, className ) {
  try {

    switch (type) {
      case 'show':

        $( `${ selector }` ).addClass( `${ className }` );
        break;

      case 'hide':

        $( `${ selector }` ).removeClass( `${ className }` );
        break;

    }

  }
  catch ( err ) {
    console.log( `ERROR loading()`, err.message );
  }
}

async function validateForm__orderNumber() {
  try {

    let oNumber         =   $( `.orderNumberBlock .orderNumber` ).val();
    let oEmail          =   $( `.orderNumberBlock .email` ).val();

    let errCount        =   0;

    if ( typeof oNumber !== 'undefined' && oNumber ) {

      let oNumberSmall  =   oNumber.toLowerCase();
      let getIN_prefix  =   ``;

      if ( oNumberSmall.includes( `in` ) ) {

        oNumber           =   oNumberSmall.replace( `in`, `` );
        getIN_prefix      =   `IN`;

      }

      oNumber           =   oNumber.replace( `#`, `` ) * 1;

      if ( typeof oNumber === 'number' && oNumber ) {

        $( `.orderNumberBlock .orderNumber` ).next( `.errMsg` ).text( `` ).hide();
        oNumber       =   `#${ getIN_prefix }${ oNumber }`;

      } else {

        $( `.orderNumberBlock .orderNumber` ).next( `.errMsg` ).text( ___msgs___.enterValidOrderNumber ).show();
        errCount++;

      }

    } else {

      $( `.orderNumberBlock .orderNumber` ).next( `.errMsg` ).text( ___msgs___.enterValidOrderNumber ).show();
      errCount++;

    }

    if ( typeof oEmail !== 'undefined' && oEmail ) {

      const getEmailStatus    =   await ValidateEmail( oEmail );

      if ( typeof getEmailStatus !== 'undefined' && getEmailStatus ) {

        $( `.orderNumberBlock .email` ).next( `.errMsg` ).text( `` ).hide();
        oEmail        =   oEmail;

      } else {

        $( `.orderNumberBlock .email` ).next( `.errMsg` ).text( ___msgs___.enterValidEmail ).show();
        errCount++;

      }

    } else {

      $( `.orderNumberBlock .email` ).next( `.errMsg` ).text( ___msgs___.enterValidEmail ).show();
      errCount++;

    }

    if ( errCount == 0 ) {

      return ({
        email_id    :   oEmail,
        order_title :   oNumber
      });

    } else {

      return false;

    }

  }
  catch ( err ) {
    console.log( `ERROR validateForm__orderNumber()`, err.message );
  }
}

async function ValidateEmail( email ) {
  try {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( email )) {

      return (true);

    }

    return (false);

  }
  catch ( err ) {
    console.log( `ERROR ValidateEmail`, err.message );
  }
}


async function orderLineItems() {
  try {

    let getLineOrderObj         =   await localStorage.getItem( ___orderObj___ );
    getLineOrderObj             =   await JSON.parse( getLineOrderObj );

    if ( typeof getLineOrderObj.line_items !== 'undefined' && getLineOrderObj.line_items ) {

      const lineItems           =   getLineOrderObj.line_items;
      let orderCurrency         =   ``;
      let orderSubtotalPrice    =   ``;
      let orderTotalPrice       =   ``;
      let orderTotalTax         =   ``;
      let orderShipPrice        =   ``;
      let orderDiscount         =   ``;

      if ( typeof getLineOrderObj.presentment_currency !== 'undefined' && getLineOrderObj.presentment_currency ) {

        orderCurrency           =   getLineOrderObj.presentment_currency;

      }

      if ( typeof getLineOrderObj.current_subtotal_price !== 'undefined' && getLineOrderObj.current_subtotal_price ) {

        orderSubtotalPrice      =   getLineOrderObj.current_subtotal_price;

      }

      if ( typeof getLineOrderObj.current_total_price !== 'undefined' && getLineOrderObj.current_total_price ) {

        orderTotalPrice         =   getLineOrderObj.current_total_price;

      }

      if ( typeof getLineOrderObj.current_total_tax !== 'undefined' && getLineOrderObj.current_total_tax ) {

        orderTotalTax           =   getLineOrderObj.current_total_tax;

      }

      if ( typeof getLineOrderObj.current_total_discounts !== 'undefined' && getLineOrderObj.current_total_discounts ) {

        orderDiscount           =   getLineOrderObj.current_total_discounts;

      }

      if ( typeof getLineOrderObj.shipping_lines !== 'undefined' && getLineOrderObj.shipping_lines ) {

        const getShipArrLen     =   getLineOrderObj.shipping_lines.length;

        let getShippingPrice    =   0;

        for ( let i = 0; i < getShipArrLen; i++ ) {

          const r__             =   getLineOrderObj.shipping_lines[i];
          getShippingPrice     +=   r__.price * 1;

        }

        orderShipPrice          =   getShippingPrice;

      }

      let collectionHTML        =   ``;

      for ( const item of lineItems ) {

        const getImgUrl         =   await getItemImage( `${ ___searchImg___ }&q=${ item.sku }&pid=${ item.product_id }` );
        let titleIs             =   item.title;
        titleIs                 =   titleIs.toLowerCase();

        let orderNumber         =   ``;

        if ( titleIs.includes( `rotimatic` ) || titleIs.includes( `remanufactured` ) ) {

          orderNumber           =   `order1`;

        } else if ( titleIs.includes( `warranty` ) ) {

          orderNumber           =   `order2`;

        } else {

          orderNumber           =   `order3`;
        }

        collectionHTML   +=   `
                              <div class="_row_ ${ orderNumber }">
                                <div class="_colItem_ _items_">
                                  <img src="${ getImgUrl }">
                                  <div class="_items_content_">
                                    <div class="_title_">${ item.title }</div>
                                    <div class="_sku_">SKU: ${ item.sku }</div>
                                    <div class="_qty_">Qty: ${ item.quantity }</div>
                                  </div>
                                </div>
                                <div class="_colItem_ _qty_">${ item.quantity }</div>
                                <div class="_colItem_ _price_">${ orderCurrency } ${ item.price }</div>
                              </div>`;
        // console.log ( 'item', item );
      }

      $( `.orderDetail_lineItems ._data_lineItems_` ).html( collectionHTML );

      $( `._shipTaxDiscount_ .shippingAndHandling ._price_` ).text( `${ orderCurrency } ${ orderShipPrice.toFixed( 2 ) }` );
      $( `._shipTaxDiscount_ .tax ._price_` ).text( `${ orderCurrency } ${ orderTotalTax }` );
      $( `._shipTaxDiscount_ .discount ._price_` ).text( `${ orderCurrency } ${ orderDiscount }` );

      $( `._total_ ._price_` ).text( `${ orderCurrency } ${ orderTotalPrice }` );

      $( `.orderDetail_lineItems` ).show();

      // console.log ( 'orderCurrency', orderCurrency );
      // console.log ( 'orderSubtotalPrice', orderSubtotalPrice );
      // console.log ( 'orderTotalPrice', orderTotalPrice );
      // console.log ( 'orderTotalTax', orderTotalTax );
      // console.log ( 'orderShipPrice', orderShipPrice );
      // console.log ( 'orderDiscount', orderDiscount );

    }

  }
  catch ( err ) {
    console.log( `ERROR orderLineItems()`, err.message );
  }
}

async function billingDetail() {
  try {

    let getBillingObj           =   await localStorage.getItem( ___orderObj___ );
    getBillingObj               =   await JSON.parse( getBillingObj );

    if ( typeof getBillingObj.billing_address !== 'undefined' && getBillingObj.billing_address ) {

      const bill                =   getBillingObj.billing_address;

      $( `.billShip` )
        .css( `display`, `grid` )
        .find( `.billing` )
        .show()
        .find( `p` )
        .html( `
          ${ typeof bill.name !== 'undefined' && bill.name ? `${ bill.name }` : `` }
          ${ typeof bill.address1 !== 'undefined' && bill.address1 ? `<br>${ bill.address1 }` : `` }
          ${ typeof bill.address2 !== 'undefined' && bill.address2 ? `<br>${ bill.address2 }` : `` }
          ${ typeof bill.phone !== 'undefined' && bill.phone ? `<br>${ bill.phone }` : `` }
          ${ typeof bill.city !== 'undefined' && bill.city ? `<br>${ bill.city }, ` : `` }
          ${ typeof bill.province !== 'undefined' && bill.province ? `${ bill.province } ` : `` }
          ${ typeof bill.zip !== 'undefined' && bill.zip ? `${ bill.zip }` : `` }
          ${ typeof bill.country !== 'undefined' && bill.country ? `<br>${ bill.country }` : `` }
        ` );

    }

  }
  catch ( err ) {
    console.log( `ERROR billingDetail()`, err.message );
  }
}

async function shippingDetail() {
  try {

    let getshippingObj          =   await localStorage.getItem( ___orderObj___ );
    getshippingObj              =   await JSON.parse( getshippingObj );

    if ( typeof getshippingObj.shipping_address !== 'undefined' && getshippingObj.shipping_address ) {

      const ship                =   getshippingObj.shipping_address;

      $( `.billShip` )
        .css( `display`, `grid` )
        .find( `.shipping` )
        .show()
        .find( `p` )
        .html( `
          ${ typeof ship.name !== 'undefined' && ship.name ? `${ ship.name }` : `` }
          ${ typeof ship.address1 !== 'undefined' && ship.address1 ? `<br>${ ship.address1 }` : `` }
          ${ typeof ship.address2 !== 'undefined' && ship.address2 ? `<br>${ ship.address2 }` : `` }
          ${ typeof ship.phone !== 'undefined' && ship.phone ? `<br>${ ship.phone }` : `` }
          ${ typeof ship.city !== 'undefined' && ship.city ? `<br>${ ship.city }, ` : `` }
          ${ typeof ship.province !== 'undefined' && ship.province ? `${ ship.province } ` : `` }
          ${ typeof ship.zip !== 'undefined' && ship.zip ? `${ ship.zip }` : `` }
          ${ typeof ship.country !== 'undefined' && ship.country ? `<br>${ ship.country }` : `` }
        ` );

    }

  }
  catch ( err ) {
    console.log( `ERROR shippingDetail()`, err.message );
  }
}

async function noteDiv() {
  try {

    $( `.note` ).show();

  }
  catch ( err ) {
    console.log( `ERROR noteDiv`, err.message );
  }
}

async function getOrderDetail( obj2Send ) {
  try {

    let return__      =   ``;

    await fetch(___oDetail___, {
      method    :   'POST',
      headers   :   ___headers___,
      body: JSON.stringify( obj2Send )
    })
    .then(response => response.json())
    .then(r => {

      if ( typeof r.error !== 'undefined' && r.error ) {

        $( `.trackOrder__by_orderNumber + .resErr` ).text( `${ r.data }` ).show();
        return__      =   `error`;

      } else if ( typeof r.data !== 'undefined' && r.data ) {

        $( `.trackOrder__by_orderNumber + .resErr` ).text( `` ).hide();
        localStorage.setItem( ___orderObj___, JSON.stringify( r.data ) );

      }

    })
    .catch((error) => {
      console.error('Error:', error);
      return__      =   `error`;
    });

    return return__;

  }
  catch ( err ) {
    console.log( `ERROR getOrderDetail`, err.message );
  }
}

async function getAfterShip( this_, type='' ) {
  try {

    let trackingNumber            =   ``;

    if ( type == `orderNameAndEmail` ) {

      trackingNumber              =   this_;

    } else {

      trackingNumber              =   $( this_ ).closest( `.trackingNumberBlock` ).find( `.trackingNumber` ).val();

    }

    if ( typeof trackingNumber !== 'undefined' && trackingNumber ) {

      let return__                =   ``;


      await fetch( `${ ___aShip___ }keyword=${ trackingNumber }`, {
        method: 'GET',
        headers: {
          'aftership-api-key'   :   `${ ___aShipApKey___ }`,
          'Content-Type'        :   `application/json`
        },
        mode: 'cors',
        cache: 'default',
      })
      .then(response => response.json())
      .then(r => {

        return__                  =   r;

        console.log ( 'r', r );

      })
      .catch((error) => {
        console.error('Error:', error);
        return__                  =   'error';
      });

      return return__;

    }

  }
  catch ( err ) {
    console.log( `ERROR getOrderDetail`, err.message );
  }
}

async function applyTrackingData( o ) {
  try {

    let collectHTML             =   ``;
    let isDelivered             =   false;
    let lastMsg                 =   ``;
    let estimatedDelivery       =   ``;

    if ( o.data != undefined && o.data.trackings[0] != undefined && o.data.trackings[0].checkpoints != undefined ) {

      const totalCheckpoints    =   o.data.trackings[0].checkpoints.length;

      estimatedDelivery         =   typeof o.data.trackings[0].scheduled_delivery_date !== 'undefined' && o.data.trackings[0].scheduled_delivery_date ? o.data.trackings[0].scheduled_delivery_date : ___msgs___.estimateWillAppearSoon;

      for( let i = totalCheckpoints; i--; ) {

        const r                 =   o.data.trackings[0].checkpoints[i];

        const rMsg              =   r.message.toLowerCase();

        if ( rMsg == `delivered` ) {

          isDelivered           =   true;

        }

        collectHTML            +=    `<li${ rMsg == 'delivered' ? ' class="delivered"' : '' }>
                                        <div class="item_title">${ r.message }</div>
                                        <div class="item_data">
                                          <span class="date">${ await dateTime( r.checkpoint_time ) }</span>
                                          <span class="separator">·</span>
                                          <span class="location">${ r.location }</span>
                                        </div>
                                      </li>`;

        if ( i == ( totalCheckpoints - 1 ) ) {

          lastMsg               =   r.message;

        }

      }

    }

    if ( collectHTML != '' ) {

      $( `.fullWidthPage[step="2"] .afterShipTrackingData` ).show();
      $( `.fullWidthPage[step="2"] .afterShipTrackingData .trackingData` ).html( collectHTML );

    }

    $( `.fullWidthPage[step="2"] .afterShipTrackingData .expactedDelivery` ).text( `Estimated Delivery: ${ estimatedDelivery }` );

    $( `.fullWidthPage[step="2"] .afterShipTrackingData .lastStatus` ).text( lastMsg );

    return isDelivered;

  }
  catch ( err ) {
    console.log( `ERROR applyTrackingData`, err.message );
  }
}

async function dateTime( dateTime, type='' ) {
  try {

    const d                     =   new Date( dateTime );

    const month_                =   ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month_Digit           =   ("0" + (d.getMonth() + 1)).slice(-2);
    let date_                   =   d.getDate().toString().padStart(2, "0");
    const hour_                 =   ['01','02','03','04','05','06','07','08','09','10','11','12','01','02','03','04','05','06','07','08','09','10','11','12'];
    const mint_                 =   ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'];
    const ampm                  =   d.getHours() >= 12 ? 'pm' : 'am';

    if ( type == 'dateOnly' ) {

      return `${ month_Digit }/${ date_ }/${ d.getFullYear() }`;

    } else {

      return `${ month_Digit } ${ date_ } ${ d.getFullYear() } ${ hour_[d.getHours()] }:${ mint_[d.getMinutes()] } ${ ampm }`;

    }

  }
  catch ( err ) {
    console.log( `ERROR dateTime`, err.message );
  }
}

async function addDays( date, days ) {
  try {

    const result                =   new Date(date);
    result.setDate(result.getDate() + days);
    return result;

  }
  catch ( err ) {
    console.log( `ERROR addDays`, err.message );
  }
}

async function getItemImage( url ) {
  try {

    let return__    =   ``;
    await fetch(url)
    .then(response => response.json())
    .then(r => {

      if ( typeof r !== 'undefined' && r && typeof r.results !== 'undefined' && r.results && typeof r.results[0] !== 'undefined' && r.results[0] && typeof r.results[0].thumbnail !== 'undefined' && r.results[0].thumbnail ) {

        return__    =   r.results[0].thumbnail;

      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });

    return return__;

  }
  catch ( err ) {
    console.log( `ERROR getItemImage( url )`, err.message );
  }
}

