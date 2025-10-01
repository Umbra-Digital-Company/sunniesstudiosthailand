const productCards = document.querySelectorAll(".product-card");

productCards.forEach((cards) => {
  const productCardDetails = cards.querySelector(".product-card-details");
  const productCardDetailsWrapper = productCardDetails.querySelector(
    ".product-card-details-wrapper",
  );
  const productCardActions = productCardDetails.querySelector(
    ".product-card-actions",
  );
  const productCardActionButtons = productCardActions.querySelectorAll(
    ".product-card-actions-buttons",
  );
  const productCardPrices = productCardDetailsWrapper.querySelector(
    ".product-card-prices",
  );
  const productCardVariants = productCardDetailsWrapper.querySelector(
    ".product-card-variants",
  );
  const productCardSwatches = productCardDetailsWrapper.querySelector(
    ".product-card-swatches",
  );
  const productCardVariantsList = productCardVariants.querySelectorAll("li");
  const productCardPriceList = productCardPrices.querySelectorAll("li");
  const productCardSwatchList = productCardSwatches.querySelectorAll(
    "#product-card-swatch",
  );

  const productImages = cards.querySelector(".product-card-images");
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
          price.style.display = variantPriceId === variantId ? "block" : "none";
        });

        productImageList.forEach((image) => {
          const { variantId: variantImageId } = image.dataset;
          image.style.display = variantImageId === variantId ? "block" : "none";
        });
        const wishlistButton = cards.querySelector(".swym-button.swym-add-to-wishlist-view-product");
        productCardSwatchList.forEach((swatchItem) => {
          const { variantId: variantSwatchItem } = swatchItem.dataset;

          if (variantSwatchItem === variantId) {
            swatchItem.classList.add("current-active-swatch");
            if (wishlistButton) {
              wishlistButton.setAttribute("data-variant-id", variantId);
              document.dispatchEvent(new CustomEvent("swym:swatch-changed"));
            }
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
        waitlistButton.style.display = isAvailable === "true" ? "none" : "flex";
      });
    });
  });
});

function handleRedirectProductCard(url) {
  window.location = url;
}
