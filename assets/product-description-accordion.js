$(document).ready(function () {
  function initializeFirstAccordionItem() {
    const $firstItem = $("#product-description-accordion > li").first();
    $firstItem.find(".product-description-accordion-content").show();
    $firstItem.find(".product-description-accordion-header svg .line-vertical").addClass("rotate-90");
  }

  initializeFirstAccordionItem();

  $(document).on("click", ".product-description-accordion-header", function () {
    const $itemHeader = $(this);
    const $item = $itemHeader.closest("li");
    const $itemContent = $item.find(".product-description-accordion-content");
    const $headerIcon = $itemHeader.find("svg");
    const isOpen = $itemContent.is(":visible");

    $itemContent.slideToggle(300);

    if (isOpen) {
      $headerIcon.find(".line-vertical").removeClass("rotate-90");
    } else {
      $headerIcon.find(".line-vertical").addClass("rotate-90");
    }
  });

  $(document).on("click", "#product-get-sku", function () {
    setTimeout(function () {
      initializeFirstAccordionItem();
    }, 100);
  });
});
