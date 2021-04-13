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
})
.on('click', '.recipes_api .apiData .tabList > a', function( e ) {
  e.stopImmediatePropagation();

  $( this ).closest( '.tabList' ).find( 'a' ).removeClass( 'selected' );

  $( this ).addClass( 'selected' );

  const getType   =   $( this ).attr( 'type' );

  if ( getType != undefined && getType != '' ) {

    if ( getType == 'all' ) {

      $( `.recipesBlocks .item` ).removeClass( 'active' ).fadeIn();

    } else {

      $( `.recipesBlocks .item` ).removeClass( 'active' ).fadeIn();
      $( `.recipesBlocks .item` )
        .each(function() {
          const cats    =   $( this ).attr( 'cats' );
          if ( cats.includes( getType ) ) {
            $( this ).addClass( 'active' );
          }
        });

      $( `.recipesBlocks .item:not(.active)` ).fadeOut();

    }

  }
})

.on('click', '.recipesBlocks .item.active a.recipeLink', async function( e ) {
  e.stopImmediatePropagation();

  $( '._loader_' ).fadeIn();

  let getJson   =   $( this ).closest( '.item' ).attr( 'json' );
  getJson       =   JSON.parse( getJson );

  console.log ( 'parse getJson', getJson );

  $( '.recipeShowPage' ).html( '' );

  await makeShowPage( getJson );
  $( '.recipes_slider, .recipes_api' ).slideUp( 'slow' );

  $( '.recipeShowPage' ).slideDown();

  $('html, body').animate({
    scrollTop: $( '#shopify-section-recipes_slider' ).offset().top
  }, 500);
  setTimeout(() => {
    $( '._loader_' ).fadeOut();
  }, 2000);
})

.on('click', '.ingredientsSettings ._settings_ ._item_ ._note_', function( e ) {
  e.stopImmediatePropagation();

  const getState    =   $( this ).attr( 'state' );

  if ( getState == 'hide' ) {
    $( this ).attr( 'state', 'show' );
  } else if ( getState == 'show' ) {
    $( this ).attr( 'state', 'hide' );
  }
})

.on('click', '.recipeShowPage .heroImageWrap .backToRecipe', function( e ) {
  e.stopImmediatePropagation();

  $( '._loader_' ).fadeIn();

  $( '.recipes_slider, .recipes_api' ).slideDown( 'slow' );

  $( '.recipeShowPage' ).slideUp( 'slow' );

  setTimeout(() => {
    $( '._loader_' ).fadeOut();
  }, 1500);
})
;

async function makeShowPage( r ) {

  let machineSettings   =   '';
  if ( r.RotimaticSettings != undefined ) {
    for (let key of Object.keys( r.RotimaticSettings )){
      machineSettings += `<div class="_item_">
                            <div>${ key }</div>
                            <div>${ r.RotimaticSettings[key] }</div>
                          </div>`;
    }
  }

  let flourSettings   =   '';

  if ( r.FlourMix != undefined ) {
    if ( r.FlourMix.length > 0 ) {
      for ( let i = 0; i < r.FlourMix.length; i++ ) {
        const rr    =   r.FlourMix[i];
        flourSettings +=  `<div class="_item_">
                            <div>${ rr.Quantity } ${ rr.Unit }</div>
                            <div>${ rr.Ingredient }</div>
                          </div>`;
      }
    }
  }

  let ingredientsSettings   =   '';

  if ( r.Ingredients != undefined ) {
    if ( r.Ingredients.length > 0 ) {
      for ( let i = 0; i < r.Ingredients.length; i++ ) {
        const rr    =   r.Ingredients[i];
        ingredientsSettings +=  `<div class="_item_">
                                  <div>${ rr.Quantity } ${ rr.Unit }</div>
                                  ${ rr.Notes != '' ? `
                                    <div>
                                      <div class="_note_" state="hide">
                                        ${ rr.Name }
                                        <div>${ rr.Notes }</div>
                                      </div>
                                    </div>
                                  ` : `<div>${ rr.Name }</div>` }
                                </div>`;
      }
    }
  }

  let instructions    =   '';

  if ( r.Instructions != undefined ) {
    if ( r.Instructions.length > 0 ) {
      for ( let i = 0; i < r.Instructions.length; i++ ) {
        const rr    =   r.Instructions[i];
        instructions  +=  `
          <div class="_item_">
            <img src="${ rr.url }" class="instructionImg">
            <div class="_description_">
              <span class="stepNo">${ rr.StepNo }</span>
              ${ rr.description }
            </div>
          </div>
        `;
      }
    }
  }

  let tags    =   '';

  if ( r.Categories != undefined ) {
    if ( r.Categories.length > 0 ) {
      for ( let i = 0; i < r.Categories.length; i++ ) {
        const rr    =   r.Categories[i];
        tags  +=  `
          <li>${ rr }</li>
        `;
      }
    }
  }

  let collectData = `
    <div class="heroImageWrap">
      <span class="backToRecipe">Back</span>
      <div class="onImageContent">
        <div class="recipeCategory">
          ${ r.Categories[0] }
        </div>
        <div class="recipeName">
          ${ r.Title }
        </div>
      </div>
      <img src="${ r.HeroImage.url }" alt="${ r.Title }" class="heroImage">
    </div>

    <div class="socialIcons"></div>

    <div class="recipeDetail">
      <div class="page-width">
        <ul class="recipeTiming">
          <li class="item_">
            <strong>PREP:</strong>
            ${ r.PrepTime }
          </li>
          <li class="item_">
            <strong>COOK:</strong>
            ${ r.CookTime }
          </li>
          <li class="item_">
            <strong>SERVES:</strong>
            ${ r.Servings }
          </li>
        </ul>
      </div>

      <div class="page-width">
        <div class="recipeSettings">
          <div class="machineSettings">
            <div class="_head_">ROTIMATIC SETTING</div>
            <div class="_settings_">
              ${ machineSettings }
            </div>
          </div>

          <div class="flourSettings">
            <div class="_head_">FLOUR MIX</div>
            <div class="_settings_">
              ${ flourSettings }
            </div>
          </div>

          <div class="ingredientsSettings">
            <div class="_head_">INGREDIENTS</div>
            <div class="_settings_">
              ${ ingredientsSettings }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-width">
      <div class="instructions">
        ${ instructions }
      </div>

      <div class="tags">
        <span class="_title_">Tags:</span>
        <ul>
          ${ tags }
        </ul>
      </div>
    </div>
  `;

  $( '.recipeShowPage' ).html( collectData );
}

async function onloadEvent() {
  const reqObj          =   {
    url       :   'https://hwpth0eczl.execute-api.us-east-1.amazonaws.com/prod/recipelist',
    headers   :   {
      'Content-Type'  :   'application/json',
      'x-api-key'     :   'OyxPpCbLR84oN0cSn5o1p8BSnthrp9pF8OB37LuA'
    },
  };
  const getResponse     =   await requireOnce( `${ asset_url }__fetchRequest`, 'fetchReq_GET', reqObj );

  await manipulateTabList( getResponse );

  await manipulateCards( getResponse );

  $( '._loader_' ).fadeOut();

  // console.log ( 'getResponse', getResponse );
}

async function manipulateCards( getResponse ) {
  if ( getResponse.recipes != undefined ) {
    const totalCards    =   getResponse.recipes.length;

    if ( totalCards > 0 ) {

      $( '.recipes_api .apiData .recipesBlocks' ).html( '' );

      for ( let i = totalCards; i--;) {

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
  // console.log ( 'r.categories', r.Categories );
  let categories_    =   r.Categories != undefined ? r.Categories : '';
  categories_        =   categories_ != '' ? categories_.join() : '';
  return `
    <div class="item active" url="${ cardLink }" cats="${ categories_ }" json='${ JSON.stringify( r ) }'>
      <a href="#${ cardLink }" class="recipeLink">
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
      $( '.recipes_api .apiData .tabList' ).html( `<a href="javascript://void('all');" type="all" class="selected">All</a>` );
      for ( let i = 0; i < getCats_total; i++ ) {
        const r   =   getResponse.categories[i];

        if ( r != 'Uncategorized' ) {
          $( '.recipes_api .apiData .tabList' )
          .append( `
            <a href="javascript://void('${ r }');" type="${ r }">${ r }</a>
          ` );
        }

      }
    }
  }

}