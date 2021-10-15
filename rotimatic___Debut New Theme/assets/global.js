async function requireCSS( file ) {
  try {
    const checkFooterEle    =   $('head').length;
    if (checkFooterEle == 0) {
      await $('html').append('<head></head>');
    } else {
      await $('head').append(`
        <link href="${ file }" rel="stylesheet">
      `);
    }

    return true;
  }
  catch ( err ) {
    console.log ( 'ERROR requireCSS', err.message );
  }
}

async function require( file ) {
  try {
    const checkFooterEle    =   $('footer').length;
    if (checkFooterEle == 0) {
      await $('body').append('<footer><div id="extraJS"></div></footer>');
    } else {
      const checkEle        =   $('#extraJS').length;
      if (checkEle == 0) {
        await $('footer').append('<div id="extraJS"></div>');
      }
    }
    const rand_             =   Math.floor(Math.random() * (1000000 - 10000)) + 10000;
    const checkFile         =   await $(`#extraJS script[file-name="${ file }"]`).length;

    if ( checkFile == 0 ) {
      await $('#extraJS').append(`
        <script file-name="${ file }" src="${ file }?${ rand_ }"></script>
      `);
    }

    return true;
  }
  catch ( err ) {
    console.log ( 'ERROR require', err.message );
  }
}

async function requireOnce( file, functionName, args = '' ) {
  const checkFooterEle = $( 'footer' ).length;
  if (checkFooterEle == 0) {
    await $('body').append('<footer><div id="extraJS"></div></footer>');
  } else {
    const checkEle = $('#extraJS').length;
    if (checkEle == 0) {
      await $('footer').append('<div id="extraJS"></div>');
    }
  }
  const rand_ = Math.floor(Math.random() * (1000000 - 10000)) + 10000;
  const checkFile = await $(`#extraJS script[componentis="${functionName}"]`).length;
  if (checkFile == 0) {
    if ( file.includes( '.js' ) == false ) {
      file    =   `${ file }.js`;
    }
    await $.get(`${ file }?${ rand_ }`, ( data ) => {
      $('#extraJS').append(`
        <script componentis="${ functionName }">${ data }</script>
      `);
    });
  }
  const getRes = await window[functionName](args != '' ? args : '');
  return getRes;
}


function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
          return array[i];
      }
  }
  return null;
}

function thousands_separators ( num ) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

function productAddedInCart( title, type, body ) {
  // type is class name which can be pass _green_ or _red_ or _orange_
  const notificationCard    =   `
    <div class="notification_item_ ${ type }">
      <div class="_head_">
        <div class="_title_">
          ${ title }
        </div>
        <div class="_close_">
          <img src="{{ 'close.png' | asset_url }}">
        </div>
      </div>

      <div class="_body_">
        ${ body }
      </div>
    </div>
  `;

  $( '.notification' ).append( notificationCard );

}

$( document )
  .on('click', '.notification .notification_item_ ._close_', function( e ) {
    e.stopImmediatePropagation();

    $( this ).closest( '.notification_item_' ).animate({
      'opacity'     :   '0',
      'top'         :   '100%',
      'position'    :   'absolute'
    }, 200, function() {
      $( this ).remove();
    });
  });

function productAddedInCart( title, type, body ) {
  // type is class name which can be pass _green_ or _red_ or _orange_
  const getTotal    =   $( '.notification .notification_item_' ).length;
  const notificationCard    =   `
    <div class="notification_item_ ${ type }" notification-no="${ getTotal + 1 }">
      <div class="_head_">
        <div class="_title_">
          ${ title }
        </div>
        <div class="_close_">
          <img src="${ asset_url }close.png?${ Math.random() }">
        </div>
      </div>

      <div class="_body_">
        ${ body }
      </div>
    </div>
  `;

  $( '.notification' )
    .append(notificationCard);

  setTimeout(() => {
    $( `.notification_item_[notification-no="${ getTotal + 1 }"]` )
      .animate({
        'margin-top'  :   '10px',
        'opacity'     :   '1'
      });
  }, 200);

  setTimeout(() => {
    $( `.notification_item_[notification-no="${ getTotal + 1 }"] ._close_` ).click();
  }, 5000);

}


