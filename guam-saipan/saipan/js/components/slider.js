$(window).on("load", function() {
   // $(".js-bannerSlider").slick({
   //    arrows: false,
   //    dots: true,
   //    dotsClass: 'gridCarousel__dots',
   //    mobileFirst: true,
   //    responsive: [
   //      {
   //         breakpoint: 767,
   //         settings: "unslick"
   //      }
   //   ]
   //  });
    
    $(".js-slider-sightseeing").slick({
      arrows: false,
      dots: true,
      dotsClass: 'gridCarousel__dots',
      mobileFirst: true,
      centerMode: true,
      centerPadding: '30px',
      responsive: [
        {
           breakpoint: 767,
           settings: "unslick"
        }
     ]
    });
    
    $(".js-slider-souvenir").slick({
      arrows: false,
      dots: true,
      dotsClass: 'gridCarousel__dots',
      mobileFirst: true,
      responsive: [
        {
           breakpoint: 767,
           settings: "unslick"
        }
     ]
    });
});