let wheeldelta = {
  x: 0,
  y: 0
};
let wheeling;

let isFreeToLoad    =   true;

$(window).on('scroll', async function() {
  try {
    clearTimeout( wheeling );
    wheeling = setTimeout(async function() {
      wheeling = undefined;

      wheeldelta.x = 0;
      wheeldelta.y = 0;

      
    }, 250);

  }
  catch ( err ) {
    console.log ( 'Error Scroll', err.message );
  }
});