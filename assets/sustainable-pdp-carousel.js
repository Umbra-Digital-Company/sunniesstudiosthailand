$(document).ready(function () {
  const config = {
    dots: true,
    prevArrow: "",
    nextArrow: "",
  };

  const [sustainableCarousel] = $("#sustainable-pdp-carousel-item-count");
  const count = sustainableCarousel?.children?.length ?? 0;

  if (count > 1) {
    $(".sustainable-pdp-carousel").slick(config);
    $(".sustainable-pdp-carousel-mobile").slick(config);
  }
});
