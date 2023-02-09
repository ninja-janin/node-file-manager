$(document).ready(function () {
  window.onscroll = function () {
    checkScroll()
  };


  const navbar = document.querySelector(".mvNav");
  const navFb = document.querySelector(".js-nav-fallback")
  const footer = document.querySelector("#couponInfo");

  const sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function checkScroll() {
    if (window.pageYOffset - 175 >= sticky) {
      navbar.classList.add("sticky");
      navFb.classList.add("sticky");
    }else {
      navbar.classList.remove("sticky");
      navFb.classList.remove("sticky");
    }

    if(footer.getBoundingClientRect().bottom <= 0) {
      navbar.classList.remove("sticky");
      navFb.classList.remove("sticky");
    }
  }
})