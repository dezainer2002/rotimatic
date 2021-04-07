window.addEventListener('load', function() {
  $(() => {
    $.getScript(`${ asset_url }slick.min.js`, function ( r ) {
      $('.recipes_slider .sliderWrapper').not('.slick-initialized').slick({
        dots          :   true,
        infinite      :   true,
        autoplay      :   true,
        speed         :   300,
        slidesToShow  :   1,
        slidesToScroll:   1,
        arrows        :   false
      });

      $('.recipes_slider').attr( 'loading', 'false' );
    });
  });
});

$(document).ready(function () {
  onloadEvent();
});

async function onloadEvent() {
  const getResponse   =   await requireOnce( `${ asset_url }recipeJson`, `loadJson`, '' );

  await manipulateTabList( getResponse );

  await manipulateCards( getResponse );

  console.log ( 'getResponse', getResponse );
}

async function manipulateCards( getResponse ) {
  if ( getResponse.recipes != undefined ) {
    const totalCards    =   getResponse.recipes.length;

    if ( totalCards > 0 ) {

      $( '.recipes_api .apiData .recipesBlocks' ).html( '' );

      for ( let i = 0; i < totalCards; i++ ) {
        const r   =   getResponse.recipes[i];

        const getCardData = await cardHTML( r );

        $( '.recipes_api .apiData .recipesBlocks' )
          .append( getCardData );

      }
    }

    console.log ( 'totalCards', totalCards );
  }
}

async function cardHTML( r ) {
  const imgSrc      =   r.RecipeAlternateImage != undefined ? r.RecipeAlternateImage.url != undefined ? r.RecipeAlternateImage.url : '' : '';
  const cardLink    =   makeSlug( r.Title );
  let categories    =   r.categories != undefined ? r.categories : '';
  categories        =   categories != '' ? categories.join() : '';
  return `
    <div class="item" cats="${ categories }">
      <a href="?recipe=${ cardLink }" class="recipeLink">
        <div class="recipes-details">
          <div class="recipes-tag">Snack</div>
          <div class="recipes-name">${ r.Title != undefined ? r.Title : '' }</div>
        </div>
        <div class="imgWrapper">
          <img src="${ imgSrc }" alt="${ r.Title != undefined ? r.Title : '' }">
        </div>
      </a>
    </div>
  `;
}

function makeSlug( t ) {
  let link  =   t;
  if ( link != '' ) {
    link    =   link.toLowerCase();
    link    =   link.split('+').join('');
    link    =   link.split('&').join('');
    link    =   link.split('  ').join(' ');
    link    =   link.split(' ').join('-');
  }

  return link;
}

async function manipulateTabList( getResponse ) {

  if ( getResponse.categories != undefined ) {
    const getCats_total   =   getResponse.categories.length;

    if ( getCats_total > 0 ) {
      $( '.recipes_api .apiData .tabList' ).html( `<a href="javascript://void('all');" class="selected">All</a>` );
      for ( let i = 0; i < getCats_total; i++ ) {
        const r   =   getResponse.categories[i];

        if ( r != 'Uncategorized' ) {
          $( '.recipes_api .apiData .tabList' )
          .append( `
            <a href="javascript://void('${ r }');">${ r }</a>
          ` );
        }

      }
    }
  }

}