$('#technology-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nav: true,
    dots: true,
    customPaging: function (slider, i) {
        return '<span class="' + $(slider.$slides[i]).attr("data-icon") + '"></span>'; 
    }
});