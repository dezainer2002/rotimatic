jQuery(document).ready(function () {
  $(".recipes-slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '10%',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: '10%',
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20%',
        }
      }
    ]
  });

  $(".three-blocks-grid").slick({
    dots: false,
    arrows: false,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '25%',
        }
      }
    ]
  });

  $(".product-review-slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '10%',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10%',
        }
      }
    ]
  });

  $(".home-product-review-slider").slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '10%',
        }
      }
    ]
  });

  $(".cart-slider-collection").slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: '10%',
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '20%',
        }
      }
    ]
  });

  $(".waitlist-popup").on('click', function (e) {
    e.preventDefault();
    $('body').addClass('waitlist-popup-open');
  });

  $(".waitlist-cancel").click(function () {
    $("body").removeClass("waitlist-popup-open");
  });

  $(".all-flours-popup").on('click', function (e) {
    e.preventDefault();
    $('body').addClass('all-flours-open');
  });

  $(".all-flours-close-popup").click(function () {
    $("body").removeClass("all-flours-open");
  });

  $(".out-of-stock-popup").on('click', function (e) {
    e.preventDefault();
    $('body').addClass('out-of-stock-popup-open');
  });

  $(".out-of-stock-close-popup").click(function () {
    $("body").removeClass("out-of-stock-popup-open");
  });

  $("#oss-privacy").click(function(){
    if($(this).is(":checked")){
      $(".oss-btn").removeAttr("disabled");
    }else{
      $(".oss-btn").attr("disabled","disabled");
    }
  });

  $(".country-dropdown .disclosure__toggle").click(function () {
    $(this).next('.disclosure-list').toggleClass('disclosure-list--visible');
  });

  $(".disclosure-currency .disclosure__toggle").click(function () {
    $(".country-dropdown .disclosure-list").removeClass("disclosure-list--visible");
  });

  $(function () {
    $("#slider-range-min").slider({
      range: "min",
      value: 0,
      min: 0,
      max: 500,
      step: 1,
      slide: function (event, ui) {
        var sliderval = ui.value;
        var interval = sliderval / 1;
        var frozenprice = interval * 0.432;
        var rotimaticprice = interval * 0.29;
        frozenprice = frozenprice.toFixed(2);
        rotimaticprice = rotimaticprice.toFixed(2);
        $("#amount-roti").val(ui.value);
        $("#frozen-roti").val("$" + frozenprice);
        $("#rotimatic-roti").val("$" + rotimaticprice);
        $(".amount123").html((frozenprice - rotimaticprice).toFixed(2));
      }
    });
    $(".ui-slider-handle").text("<>");
    $("#amount-roti").val($("#slider-range-min").slider("value"));
    $("#frozen-roti").val("$" + $("#slider-range-min").slider("value"));
    $("#rotimatic-roti").val("$" + $("#slider-range-min").slider("value"));
    $(".amount123").html($("#slider-range-min").slider("value"));
  });

  $('.site-footer__item-inner--link_list .h4').click(function () {
    $(this).next('.site-footer__linklist').slideToggle(700);
    var jQuerythis = $(this);
    jQuerythis.toggleClass('links_open');
    return false;
  });

  $('.read-more-link').on('click', function (evt) {
    evt.preventDefault();
    $('html, body').animate(
      { scrollTop: $($(this).attr('href')).offset().top - 80 }, 1000
    );
  });

  $(".see-all-flours-popup-inner .popup-flours-item:first-child .popup-item-content-main").css("display", "block");

  $('.popup-flours-item .popup-item-title').click(function (j) {
    var dropDown = $(this).closest('.popup-flours-item').find('.popup-item-content-main');

    $(this).closest('.see-all-flours-popup-inner').find('.popup-item-content-main').not(dropDown).slideUp();

    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    } else {
      $(this).closest('.see-all-flours-popup-inner').find('.popup-flours-item.active').removeClass('active');
      $(this).parent().addClass('active');
    }

    dropDown.stop(false, true).slideToggle();

    j.preventDefault();
  });
  /*
    google.charts.load('current', { 'packages': ['geochart', 'corechart'] });
    google.charts.setOnLoadCallback(drawRegionsMap);
  
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', '', 'rotis and counting'],
        ['Argentina', 999000, 100],
        ['Australia', 969000, 450],
        ['Belgium', 12000, 200],
        ['Brazil', 850000, 250],
        ['Canada', 1110000, 590],
        ['China', 3975000, 690],
        ['Colombia', 4500, 100],
        ['Denmark', 78600, 150],
        ['France', 67000, 400],
        ['Germany', 140000, 550],
        ['India', 1060000, 560],
        ['Japan', 60000, 420],
        ['Nigeria', 1054000, 305],
        ['Philippines', 120000, 230],
        ['Russia', 2904000, 180],
        ['Singapore', 79000, 450],
        ['South Korea', 15000, 290],
        ['Switzerland', 35000, 230],
        ['United Kingdom', 4015000, 750],
        ['United States', 5000500, 1500],
      ]);
  
      var options = {
        colorAxis: { colors: ['#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#ccd3dc', '#f8ac7c'] },
        legend: 'none',
        datalessRegionColor: '#ccd3dc',
      };
  
      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      chart.draw(data, options);
    }
  */
  $('.faq-tabs .tab-title').click(function (j) {
    var dropDown = $(this).closest('.faq-item').find('.tab-content');

    $(this).closest('.faq-tabs').find('.tab-content').not(dropDown).slideUp();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.faq-tabs').find('.tab-title.active').removeClass('active');
      $(this).addClass('active');
    }

    dropDown.stop(false, true).slideToggle();

    j.preventDefault();
  });

  $('.first-listing ul li').hover(function () {
    var target = $(this).data('id');
    $(this).toggleClass('active');
    $("#"+target).css('opacity', '1');
    }, function (){
      $('.listing-bg-img ul li').removeAttr('style');
      $(this).removeClass('active');
    }
  );

  $('.flour-brand-details table').DataTable({
    "paging": false,
    "ordering": false,
    "info": false,
    "scrollY": 200,
    "scrollCollapse": true,
    "scroller": true,
    "mark": true,
    language: {
      searchPlaceholder: "Search for your favourite flour brand"
    }
  });
});