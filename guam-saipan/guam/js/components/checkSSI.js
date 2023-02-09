$(window).on("load", function() {
  let dynamicElement = $('.js-ssi-content');
  // let cardBottom = $('.tour .card__bottomItem');
  // let navLink = $('.mvNav__dropdown-link');

  // function checkCardHeight() {
  //   cardBottom.each(function() {
  //     let el = $(this);
  //     console.log("THIS", el.height())
  //     if(el.height() === 0) {
  //       el.parent().css('padding-bottom', 0);
  //     }
  //   })
  // }

  setTimeout(function() {
    dynamicElement.each(function() {
      let el = $(this);
      if(el.parent().hasClass("product__list--notes") && el.text().length <= 2) {
        el.parent().remove();
      }

      if(el.is('a') && el.attr('href') === '') {
        el.remove()
      }
  
      if(!el.is('a') && el.text().length <= 2) {
        el.remove();
      }
    })
  }, 1000);

  // setTimeout(function() {
  //   checkCardHeight();
  // }, 1200)

  // navLink.on('click', function() {
  //   checkCardHeight();
  // })
  
})