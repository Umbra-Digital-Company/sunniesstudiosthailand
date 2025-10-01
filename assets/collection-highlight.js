new Swiper(".collection-highlight-swiper", {
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1240: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
  pagination: {
    el: ".collection-highlight-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      document.getElementById("collection-highlight-products").style.display =
        "block";
    },
  },
});
