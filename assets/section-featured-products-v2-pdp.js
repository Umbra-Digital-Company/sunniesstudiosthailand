function initializeSwiper(allowTouchMove) {
  return new Swiper(".featured-products-swiper-v2-pdp", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    allowTouchMove: allowTouchMove,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 4,
        slidesPerGroup: 4,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4,
      },
    },
    navigation: {
      nextEl: ".featured-products-swiper-next",
      prevEl: ".featured-products-swiper-prev",
    },
    on: {
      init: function () {
        document.querySelectorAll(".featured-products-swiper-v2-pdp").forEach(swiperEl => swiperEl.style.display = "block")
      }
    },
  });
}

let swiperInstance = initializeSwiper(window.innerWidth > 768);

function updateSwiperAllowTouchMove() {
  if (swiperInstance) {
    swiperInstance.allowTouchMove = window.innerWidth > 768;
  }
}

window.addEventListener('resize', updateSwiperAllowTouchMove);
