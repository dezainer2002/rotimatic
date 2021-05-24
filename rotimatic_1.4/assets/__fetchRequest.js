async function fetchReq_POST( obj ) {
  if ( obj.url != '' ) {
    try {
      const response = await fetch(obj.url, {
        method          :   'POST',
        mode            :   'cors',
        cache           :   'no-cache',
        headers         :   (obj.headers != undefined ? obj.headers : "{'Content-Type'  :   'application/json'}"),
        body            :   JSON.stringify( obj.data != undefined ? obj.data : {} )
      });
      // console.log ( 'response.json()', response.json() );
      return await response.json();
    }
    catch(err) {
      console.log('API ERROR RESPONSE', err.message);
      $( '.warranty_api_integration .warranty_api_integration__loader' ).hide();
      alert( 'something went wrong, please try again.' );
    }
  }
}

async function fetchReq_GET( obj ) {
  if ( obj.url != '' ) {
    try {
      const res = await fetch( `${ obj.url }`, {
        method  : 'GET',
        headers : obj.headers != undefined ? obj.headers : ''
      });
      // console.log ( 'res', res );
      return await res.json();
    } catch (err) {
      console.log('API ERROR RESPONSE', err);
    }
  }
}