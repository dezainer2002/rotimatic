

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