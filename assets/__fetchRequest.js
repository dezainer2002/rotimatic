async function fetchReq_POST( obj ) {
  if ( obj.url != '' ) {
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
}

async function fetchReq_GET( obj ) {
  if ( obj.url != '' ) {
    try {
      const res = await fetch( `${ obj.url }` );
      return await res.json();
    } catch (err) {
      console.log('API ERROR RESPONSE', err);
    }
  }
}