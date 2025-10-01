$("#anti-rad-banner-content").click(function () {
  seamless.scrollIntoView($("#ant-rad-page-switch-wrapper")[0], {
    behavior: "smooth",
  });
});

$("#stick-two-btn").click(function () {
  window.location.href =
    "https://ph.sunniesstudios.com/collections/anti-radiation-eyewear";
});

function antiRadRedirect() {
  window.location.href =
    "https://ph.sunniesstudios.com/collections/anti-radiation-eyewear";
}

let contentItems = document.querySelectorAll(".faq__accordion__content p");

checkContentList(contentItems);

function checkContentList(els) {
  els.forEach((el) => {
    const contentItemText = $(el).html();
    const firstTwoChar = contentItemText.slice(0, 2);
    if (firstTwoChar == "- ") {
      const newContentItemText = contentItemText.substring(2);
      $(el).html(newContentItemText);
      $(el).addClass("contentList");
    }
  });
}

function myAccordion(el) {
  $(el).parent().toggleClass("is-open");
  $(el).parent().find(".faq__accordion__content").slideToggle();
}

new Swiper(".anti-rad-products-swiper", {
  slidesPerView: 2,
  spaceBetween: 12,
  slidesPerGroup: 2,
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
    el: ".anti-rad-products-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".anti-rad-swiper-next",
    prevEl: ".anti-rad-swiper-prev",
  },
  on: {
    init: function () {
      document.getElementById("anti-rad-products-swiper").style.display =
        "block";
    },
  },
});
