new Swiper(".featured-products-swiper", {
  slidesPerView: 2,
  spaceBetween: 12,
  slidesPerGroup: 2,
  loopFillGroupWithBlank: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
    },
    1240: {
      slidesPerView: 4.5,
      spaceBetween: 24,
      slidesPerGroup: 4,
    },
  },
  pagination: {
    el: ".featured-products-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".featured-products-swiper-next",
    prevEl: ".featured-products-swiper-prev",
  },
  on: {
    init: function () {
       document.querySelectorAll(".featured-products-swiper").forEach(swiperEl => swiperEl.style.display = "block")
    }
  },
});
