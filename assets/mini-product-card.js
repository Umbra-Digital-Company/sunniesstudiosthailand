function initializeProductCard() {
  const productCards = document.querySelectorAll(".mini-product-card");

  productCards.forEach((cards) => {
    const productCardDetails = cards.querySelector(
      ".mini-product-card-details",
    );
    const productCardActions = productCardDetails.querySelector(
      ".mini-product-card-actions",
    );
    const productCardActionButtons = productCardActions.querySelectorAll(
      ".mini-product-card-actions-buttons",
    );
    const productCardPrices = productCardDetails.querySelector(
      ".mini-product-card-prices",
    );
    const productCardVariants = productCardDetails.querySelector(
      ".mini-product-card-variants",
    );
    const productCardSwatches = productCardDetails.querySelector(
      ".mini-product-card-swatches",
    );
    const productCardVariantsList = productCardVariants.querySelectorAll("li");
    const productCardPriceList = productCardPrices.querySelectorAll("li");
    const productCardSwatchList = productCardSwatches.querySelectorAll(
      ".mini-product-card-swatch",
    );

    const productImages = cards.querySelector(".mini-product-card-images");
    const productImageList = productImages.querySelectorAll("img");

    productCardSwatchList.forEach((swatch) => {
      swatch.addEventListener("click", function (event) {
        const { target } = event;
        const { dataset } = target;
        const { variantId } = dataset;

        productCardActions.dataset.variantId = variantId;

        if (variantId) {
          productCardVariantsList.forEach((variant) => {
            const { variantId: variantDisplayId } = variant.dataset;
            variant.style.display =
              variantDisplayId === variantId ? "block" : "none";
          });

          productCardPriceList.forEach((price) => {
            const { variantId: variantPriceId } = price.dataset;
            price.style.display =
              variantPriceId === variantId ? "block" : "none";
          });

          productImageList.forEach((image) => {
            const { variantId: variantImageId } = image.dataset;
            image.style.display =
              variantImageId === variantId ? "block" : "none";
          });

          productCardSwatchList.forEach((swatchItem) => {
            const { variantId: variantSwatchItem } = swatchItem.dataset;

            if (variantSwatchItem === variantId) {
              swatchItem.classList.add("current-active-swatch");
            } else {
              swatchItem.classList.remove("current-active-swatch");
            }
          });
        }

        productCardActionButtons.forEach((buttons) => {
          const { variantId: variantDisplayId, isAvailable } = buttons.dataset;
          buttons.style.display =
            variantDisplayId === variantId ? "flex" : "none";
          const [normalButton, waitlistButton] = buttons.querySelectorAll("a");

          normalButton.style.display = isAvailable === "true" ? "flex" : "none";
          waitlistButton.style.display =
            isAvailable === "true" ? "none" : "flex";
        });
      });
    });
  });
}

initializeProductCard();

function handleRedirectProductCard(url) {
  window.location = url;
}
