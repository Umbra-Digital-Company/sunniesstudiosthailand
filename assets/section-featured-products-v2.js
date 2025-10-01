new Swiper(".featured-products-swiper-v2", {
  slidesPerView: 1.5,
  spaceBetween: 4,
  slidesPerGroup: 1,
  loopFillGroupWithBlank: true,
  breakpoints: {
    768: {
      slidesPerView: 4,
      spaceBetween: 4,
      slidesPerGroup: 4,
    },
    1240: {
      slidesPerView: 4,
      spaceBetween: 4,
      slidesPerGroup: 4,
    },
  },
  // pagination: {
  //   el: ".featured-products-pagination",
  //   clickable: true,
  // },
  navigation: {
    nextEl: ".featured-products-swiper-next",
    prevEl: ".featured-products-swiper-prev",
  },
  on: {
    init: function () {
      document.querySelectorAll(".featured-products-swiper-v2").forEach(swiperEl => swiperEl.style.display = "block")
    }
  },
});
