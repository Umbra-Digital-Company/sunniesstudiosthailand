// Global Variables
var colorGroupArr = window.colorGroupsGlobal;
// Override Settings
var productItemCounter = 0;
var bcSfFilterSettings = {
  general: {
    limit: 20,
    /* Optional */
    loadProductFirst: false,
    collapseOnPCByDefault: true
  },
};

var sortingItems = [
  { value: 'best-selling', label: 'Best selling' },
  // { value: 'manual', label: 'Featured' },
  { value: 'title-ascending', label: 'Alphabetically: A to Z' },
  { value: 'title-descending', label: 'Alphabetically: Z to A' },
  { value: 'price-ascending', label: 'Price: Low to High' },
  { value: 'price-descending', label: 'Price: High to Low' },
  { value: 'created-ascending', label: 'Date, old to new' },
  { value: 'created-descending', label: 'Date, new to old' }
];

// Declare Templates
var bcSfFilterTemplate = {
  soldOutClass: "product-item--sold-out",
  saleClass: "product-item--sale",
  soldOutLabelHtml: "<div>" + bcSfFilterConfig.label.sold_out + "</div>",
  saleLabelHtml: "<div>" + bcSfFilterConfig.label.sale + "</div>",
  vendorHtml: "<div>{{itemVendorLabel}}</div>",

  // Grid Template
  productGridItemHtml:
    '<div class="product-listing__item">' +
    '<div class="js-product-item product-item__wrap product-item {{counterClass}} product-item--fullwidth {{soldOutClass}} {{saleClass}}">' +
    '<div class="product-item__inner">' +
    '<div class="product__image">' +
    '<ul class="list-badges js-list-badges">' +
    '<li class="list__badge list-badges__sold">' +
    "<small>{{itemSoldOutLabel}}</small>" +
    "</li>" +
    '<li class="list__badge list-badges__sale">' +
    "<small>{{itemSaleLabel}}</small>" +
    "</li>" +
    "{{itemStock}}" +
    "</ul>" +
    '<a href="{{itemUrl}}?variant={{firstVariant}}" class="">' +
    "{{allImages}}" +
    "</a>" +
    "</div>" +
    '<div class="product__content">' +
    '<div class="product__entry">' +
    '<a href="{{itemUrl}}?variant={{firstVariant}}" class="">' +
    "<h3>{{itemTitle}} {{colorNames}}</h3>" +
    "<div class='product__prices js-product-item-prices'>{{allPrices}}</div>" +
    "</a>" +
    "{{colorSwatches}}" +
    "{{wishList}}" +
    "</div>" +
    "{{productActions}}" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>",

  productActionsHtml: `
    <div class="product__actions">
      {{quickAddBtn}}
      <div class="product__prices js-product-item-prices">{{allPrices}}</div>
    </div>`,

  // Pagination Template
  previousActiveHtml: '<li><a href="{{itemUrl}}">&larr;</a></li>',
  previousDisabledHtml: '<li class="disabled"><span>&larr;</span></li>',
  nextActiveHtml: '<li><a href="{{itemUrl}}">&rarr;</a></li>',
  nextDisabledHtml: '<li class="disabled"><span>&rarr;</span></li>',
  pageItemHtml: '<li><a href="{{itemUrl}}">{{itemTitle}}</a></li>',
  pageItemSelectedHtml: '<li><span class="active">{{itemTitle}}</span></li>',
  pageItemRemainHtml: "<li><span>{{itemTitle}}</span></li>",
  paginateHtml:
    '<ul class="pagination-custom">{{previous}}{{pageItems}}{{next}}</ul>',

  // Sorting Template
  sortingHtml:
    '<label for="bc-sf-filter-top-sorting-select" class="label--hidden">' +
    bcSfFilterConfig.label.sorting +
    ' by <span id="selected-sorting">Best selling</span></label>' +
    '<select id="bc-sf-filter-top-sorting-select" class="collection-sort__input" onchange="updateSelectedSorting(this.value)">' +
    '{{sortingOptions}}' +
    '</select>',

};

function generateSortingOptions() {
  let optionsHtml = '';
  sortingItems.forEach(item => {
    optionsHtml += `<option value="${item.value}">${item.label}</option>`;
  });
  return optionsHtml;
}

function updateSelectedSorting(selectedValue) {
  const selectedLabel = sortingItems.find(item => item.value === selectedValue)?.label || 'Select Sorting Option';

  setTimeout(() => {
    document.getElementById('selected-sorting').textContent = selectedLabel;
  }, 1000); 
}

bcSfFilterTemplate.sortingHtml = bcSfFilterTemplate.sortingHtml.replace('{{sortingOptions}}', generateSortingOptions());

/************************** Product Item List Edit **************************/

// Product Item
$(".js-product-item .product-item__wrap .product-item .js-product-item--0 .product-item--fullwidth").hover(function() {
  console.log("Hovering over #product-image");
});

$(".filter-wrapper").on("click", function() {
  console.log("Clicked on #product-image");
});


/************************** BUILD PRODUCT LIST **************************/

// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function (data, index) {
  /*** Prepare data ***/
  var images = data.images_info;
  var tags = data.tags;

  var itemType = '';

  if (tags.includes('merch')) {
    itemType = 'merch';
  } else {
    if (tags.includes('sun')) {
      itemType = 'studios_frame';
    } else if (tags.includes('readers') || tags.includes('anti-rad')) {
      itemType = 'G100';
      // flask changes
      } else if (tags.includes('flask') && !tags.includes('flask-main')) {
        itemType = 'flask';
      } else if (tags.includes('flask') || tags.includes('flask-main')) {
        itemType = 'flask_bundle';
    }
  }
  // Displaying price base on the policy of Shopify, have to multiple by 100
  var soldOut = !data.available; // Check a product is out of stock
  var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
  var priceVaries = data.price_min != data.price_max; // Check a product has many prices
  // Get First Variant (selected_or_first_available_variant)
  var firstVariant = data["variants"][0];
  if (getParam("variant") !== null && getParam("variant") != "") {
    var paramVariant = data.variants.filter(function (e) {
      return e.id == getParam("variant");
    });
    if (typeof paramVariant[0] !== "undefined") firstVariant = paramVariant[0];
  } else {
    for (var i = 0; i < data["variants"].length; i++) {
      if (data["variants"][i].available) {
        firstVariant = data["variants"][i];
        break;
      }
    }
  }
  /*** End Prepare data ***/

  // Get Template
  var itemHtml = bcSfFilterTemplate.productGridItemHtml;

    /* Swym integration for boost v2 */
    var wishList = `<button aria-label="Add to Wishlist" 
    data-with-epi="true" 
    class="swym-button swym-add-to-wishlist-view-product product_{productId}" 
    data-swaction="addToWishlist" 
    data-product-id="{productIdJson}" 
    data-variant-id="{variantId}" 
    data-product-url="https://sunnies-studios-us.myshopify.com/{productUrl}">
  </button>`;

    // Replace placeholders in the wishlist template
    wishList = wishList
      .replace(/{productId}/g, data.id)
      .replace(/{productIdJson}/g, JSON.stringify(data.id))
      .replace(/{variantId}/g, data.variants[0].id)
      .replace(/{productUrl}/g, this.buildProductItemUrl(data).replace(/^\/|\/$/g, ""));

    // Replace the wishlist placeholder in itemHtml
    itemHtml = itemHtml.replace(/{{wishList}}/g, wishList); 

  const productActions = data.available
    ? bcSfFilterTemplate.productActionsHtml
    : (tags.includes("flask-main") ? bcSfFilterTemplate.productActionsHtml : `
      <div
        class="product__actions waitlist-product-actions-${data.id}"
        data-variant-id="${data.variants[0].id}"
        onClick="openWaitlistModal(${data.id}, this)">
        <a href="#" class="btn-quick-add"><span></span>Join the waitlist</a>
				<div class="product__prices js-product-item-prices">{{allPrices}}</div>
      </div>
    `);
  itemHtml = itemHtml.replace(/{{productActions}}/g, productActions);

  // Add Thumbnail
  var itemThumbUrl =
    images.length > 0
      ? this.optimizeImage(images[0]["src"])
      : bcSfFilterConfig.general.no_image_url;
  itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

  // Add onSale class
  var saleClass = onSale ? bcSfFilterTemplate.saleClass : "";
  itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);

  // Add onSale Label
  var itemSaleLabelHtml = onSale ? bcSfFilterTemplate.saleLabelHtml : "";
  itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabelHtml);

  // Add Vendor
  var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable
    ? bcSfFilterTemplate.vendorHtml.replace(/{{itemVendorLabel}}/g, data.vendor)
    : "";
  itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

  // Add main attribute (Always put at the end of this function)
  itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
  itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
  itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
  itemHtml = itemHtml.replace(
    /{{itemUrl}}/g,
    this.buildProductItemUrl(data).replace(/^\/|\/$/g, "")
  );

  let selectedFilters = jQ("#bc-sf-filter-tree").find(
    ".bc-sf-filter-option-item.selected"
  );
  let cloneColorGroupArr = "";
  let frameColorFilter = false;
  let dataVariants = data.variants;
  let productImages = "";
  let colorNames = "";
  let productPrices = "";
  let colorSwatchesHtml = "";
  let quickAddHtml = "";
  let stockInventoryHtml = "";
  let counterClassItem = `js-product-item--${productItemCounter}`;

  itemHtml = itemHtml.replace(
    /{{itemFirstColorName}}/g,
    dataVariants[0].option1
  );
  itemHtml = itemHtml.replace(
    /{{firstVariant}}/g,
    firstVariant.id
  );

  const editorialImage = (images) => {
    // grab collection title
    const filterTitle = (document.querySelector(".product-view__filter h1") != null) ? document.querySelector(".product-view__filter h1").innerHTML : '';

    if (filterTitle == "Men's Glasses" || filterTitle == "Men's Sunglasses") {
      fileName = "editorial-male";
    } else if (
      filterTitle == "Women's Glasses" ||
      filterTitle == "Women's Sunglasses"
    ) {
      fileName = "editorial-female";
    } else {
      fileName = "editorial.";
    }

    for (let i = 0; i < images.length; i++) {
      let imageSrc = images[i].src;
      if (imageSrc.includes(fileName)) {
        return `<span data-bg-src="${imageSrc}" data-editorial-image></span>`;
      } else if (imageSrc.includes("editorial.")) {
        return `<span data-bg-src="${imageSrc}" data-editorial-image></span>`;
      }
    }

    return "";
  };

  if (selectedFilters.length > 0) {
    for (let index = 0; index < selectedFilters.length; index++) {
      const filters = selectedFilters[index]
      if (filters?.title) {
        frameColorFilter = filters.title;
        break;
      }
    }
  }

  if (
    firstVariant.inventory_quantity < 4 &&
    data.title != "Digital Gift Card"
  ) {
    stockInventoryHtml = `<li class="js-item-stock"><small>Only ${firstVariant.inventory_quantity} left</small></li>`;
  }

  const modelImage = Object.values(data.images).filter(
    (image) => image.includes("Editorial") || image.includes("editorial")
  );

  const selectedModelImage = modelImage.length
    ? modelImage.find(Boolean)
    : Object.values(data.images).find(Boolean);

  // Script: Swatch will only show first variant with unique color option -- START
  let productColors = [];
  let hasAvailable = false;

  for (let i = 0; i < dataVariants.length; i++) {
    if (dataVariants[i].available) {
      hasAvailable = true;
    }
  }
  // Script: Swatch will only show first variant with unique color option -- END

  for (let i = 0; i < dataVariants.length; i++) {
    let productImage = dataVariants[i].image;

    if (!productImage) {
      productImage = bcSfFilterConfig.general.no_image_url;
    }

    let variantId = dataVariants[i]?.id;
    let variantStyle = data.title;
    let isCurrentImage =
      firstVariant.id === dataVariants[i].id
        ? ` style="background-image: url(${productImage});" class="current-image-variant"`
        : "";
    let isCurrentImageHidden =
      firstVariant.id === dataVariants[i].id
        ? ` style="background-image: url(${selectedModelImage});" class="current-image-variant"`
        : "";
    let isCurrentColorName =
      firstVariant.option1 === dataVariants[i].option1 && firstVariant.id === dataVariants[i].id
        ? ` class="current-color-name"`
        : "";
    let isCurrentPrice =
      firstVariant.id === dataVariants[i].id ? ` current-price-variant` : "";
    let isCurrentSwatch =
      firstVariant.id === dataVariants[i].id
        ? ` class="current-swatch-variant"`
        : "";
    let isSwatchDisabled = "";

    if (
      dataVariants[i].inventory_quantity <= 0 &&
      data.title != "Digital Gift Card"
    ) {
      isSwatchDisabled = " data-swatch-disabled";
    } else {
      isSwatchDisabled = "";
    }

    let colorName = handleize(dataVariants[i].option1);
    let colorNameSimple = dataVariants[i].option1;
    let colorURL = this.buildProductItemUrl(data).replace(/^\/|\/$/g, "");
    let curInventory = dataVariants[i].inventory_quantity;

    if (data.title == "Digital Gift Card") {
      curInventory = 100;
    }

    productImages += `
    <div id="product-image">
      <span data-bg-src="${productImage}" data-image-variant="${variantId}"${isCurrentImage} data-${variantId}="${productImage}"></span>
      <span data-bg-src="${selectedModelImage}" data-image-variant="${variantId}"${isCurrentImageHidden} data-${variantId}="${selectedModelImage}"></span>
    </div>
    `;

    colorNames += `<span style="font-size: 11px; color: #AEAAA9 !important;" data-vid-color="${variantId}" id="item_color_name_${variantStyle}"${isCurrentColorName}>${colorNameSimple}</span>`;

    productPrices += `<p data-vid-price="${variantId}" data-product-type="${data.product_type}" data-item-type="${itemType}" class="product__prices-item${isCurrentPrice}" data-${variantId}-stock="${curInventory}" data-stock-inventory="${curInventory}">${buildPrices(
      dataVariants[i]
    )}</p>`;

    if (!productColors.includes(dataVariants[i].option1)) {
      colorSwatchesHtml += `<li data-vid-top="${variantId}" ${isCurrentSwatch}${isSwatchDisabled}>
              <a
                title="${dataVariants[i].option1}"
                class="js-product-item-swatch"
                data-product-id="${data.id}"
                data-swatch-vid="${variantId}"
                data-swatch-style="${variantStyle}"
                ${itemType == 'flask_bundle'? 'data-item-type="flask_main"' : ''}
                data-swatch-link="${colorURL}?variant=${variantId}"
                href="#">
                  <span data-handle-name="${colorName}"></span>
              </a>
          </li>`;

      productColors.push(dataVariants[i].option1);
    }
  }
// flask changes
var expandSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<rect width="20" height="20" rx="10" fill="transparent" fill-opacity="0.1"/>
<path d="M13.7636 8.18728C13.6211 8.05944 13.4327 7.99233 13.2398 8.0007C13.0469 8.00907 12.8653 8.09224 12.7349 8.23193L9.9948 11.2144L7.25471 8.23193C7.12314 8.09691 6.94289 8.01781 6.75258 8.01157C6.56227 8.00534 6.37704 8.07246 6.23657 8.19857C6.09611 8.32467 6.01158 8.49973 6.0011 8.68623C5.99063 8.87272 6.05503 9.05583 6.18052 9.19631L9.4577 12.7681C9.52593 12.8412 9.60892 12.8995 9.70138 12.9395C9.79385 12.9794 9.89377 13 9.9948 13C10.0958 13 10.1957 12.9794 10.2882 12.9395C10.3807 12.8995 10.4637 12.8412 10.5319 12.7681L13.8091 9.19631C13.9394 9.05656 14.0078 8.87177 13.9993 8.68255C13.9908 8.49334 13.906 8.31519 13.7636 8.18728Z" fill="#352B27"/>
<circle cx="10" cy="10" r="9.25" stroke="#352B27" stroke-width="1.5"/>
</svg>`
var collapseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<rect width="20" height="20" rx="10" fill="transparent" fill-opacity="0.1"/>
<path d="M6.23645 11.8127C6.37891 11.9406 6.5673 12.0077 6.7602 11.9993C6.9531 11.9909 7.13472 11.9078 7.26511 11.7681L10.0052 8.78564L12.7453 11.7681C12.8769 11.9031 13.0571 11.9822 13.2474 11.9884C13.4377 11.9947 13.623 11.9275 13.7634 11.8014C13.9039 11.6753 13.9884 11.5003 13.9989 11.3138C14.0094 11.1273 13.945 10.9442 13.8195 10.8037L10.5423 7.23192C10.4741 7.15883 10.3911 7.10047 10.2986 7.06054C10.2062 7.02062 10.1062 7 10.0052 7C9.90418 7 9.80425 7.02062 9.71179 7.06054C9.61932 7.10047 9.53634 7.15883 9.46811 7.23192L6.19093 10.8037C6.0606 10.9434 5.99218 11.1282 6.00071 11.3174C6.00925 11.5067 6.09404 11.6848 6.23645 11.8127Z" fill="#352B27"/>
<circle cx="10" cy="10" r="9.25" stroke="#352B27" stroke-width="1.5"/>
</svg>`
// flask changes
const dropDownVariants = `<div class="variants_dropdown"><button onclick="variantExpand(event)" class="variant_expand">${expandSVG}</button><button onclick="variantCollapse(event)" class="variant_collapse">${collapseSVG}</button></div>`;

const itemTypeClass = itemType == 'flask' || itemType == 'flask_bundle'? 'flask flask-collapsed' : '';
  colorSwatchesHtml =
    `<ul class="list-swatches list-swatches--plp ${itemTypeClass}">` +
    colorSwatchesHtml +
    "</ul>" + dropDownVariants;

  if (frameColorFilter) {
    cloneColorGroupArr = colorGroupArr.map((a) => ({ ...a }));
    cloneColorGroupArr = cloneColorGroupArr.find((colors) => {
      const newColorId = colors.id.replace(/[^a-zA-Z ]/g, "");
      return newColorId.toUpperCase() === frameColorFilter.toUpperCase();
    });

    if (cloneColorGroupArr !== undefined) {
      cloneColorGroupArr = cloneColorGroupArr.colors;

      const newDataVariants = dataVariants.filter((variant) => {
        const frameColor = variant?.option_frame_color?.toUpperCase();
        return frameColor === frameColorFilter?.toUpperCase();
      });

      const currentVariant = newDataVariants.find((variant) => {
        const tmpColor = cloneColorGroupArr.filter((color) => {
          return color.includes(variant.options.find(Boolean));
        });
        return tmpColor;
      });

      if (currentVariant !== undefined) {
        const currentVariantId = currentVariant.id;
        const getStockQuantity = productPrices
          .split(`data-${currentVariantId}-stock="`)[1]
          .split('"')[0];

        // replace color names
        colorNames = colorNames.replace('class="current-color-name"', "");

        // replace color swatches
        colorSwatchesHtml = colorSwatchesHtml
          .replace('class="current-swatch-variant"', "")
          .replace(
            `data-vid-top="${currentVariantId}"`,
            `data-vid-top="${currentVariantId}" class="current-swatch-variant"`
          );

        // replace product Prices
        productPrices = productPrices
          .replace(
            'class="product__prices-item current-price-variant"',
            'class="product__prices-item"'
          )
          .replace(
            `data-vid-price="${currentVariantId}"`,
            `data-vid-price="${currentVariantId}" class="product__prices-item current-price-variant"`
          );

        // replace product Images
        const getShownImageSrc = productImages
          .split(`data-${currentVariantId}="`)[1]
          .split('"')[0];
        const getHiddenImageSrc = productImages
          .split(`data-${currentVariantId}="`)[2]
          .split('"')[0];

        productImages = productImages
          .replace(/style=".*?"/gi, "")
          .replace('class="current-image-variant"', "")
          .replace(
            `data-${currentVariantId}="${getShownImageSrc}"`,
            `data-${currentVariantId}="${getShownImageSrc}" style="background-image: url(${getShownImageSrc});" class="current-image-variant"`
          )
          .replace(
            `data-${currentVariantId}="${getHiddenImageSrc}"`,
            `data-${currentVariantId}="${getHiddenImageSrc}" style="background-image: url(${getHiddenImageSrc});" class="current-image-variant"`
          );

        // replace stock quantity message
        if (
          getStockQuantity < 3 &&
          getStockQuantity > 0 &&
          data.title != "Digital Gift Card"
        ) {
          stockInventoryHtml = `<li class="js-item-stock"><small>Only ${getStockQuantity} left</small></li>`;
        } else if (getStockQuantity <= 0) {
          soldOut = true;
        } else {
          stockInventoryHtml = "";
        }
      }
    }
  }

  if (dataVariants[0].option_title === "Default Title") {
    productImages = `<span style="background-image: url(${itemThumbUrl});" class="current-image-variant"></span>`;
    colorSwatchesHtml = "";
  }

  let variantId = dataVariants[i]?.id;
  let colorURL = this.buildProductItemUrl(data).replace(/^\/|\/$/g, "");

  if (!data.tags.includes("prescription")) {
    if (data.template_suffix === 'apparel') {
      // with multiple options
      quickAddHtml = `
        <a
          href="${colorURL}?variant=${variantId}"
          class="btn-quick-add">
          <span></span>Select size 
        </a>
        `
    } else {

      if(tags.includes("flask-main")){
        quickAddHtml = `
        <a
          href="/products/sunnies-flask" 
          ${isPreorder && "data-pre-order='true'"}
          class="btn-quick-add">
          <span></span>Customize
        </a>
        ` ;
      }else{
      // default quick add to cart
      quickAddHtml = `
        <a
          href="#"
          class="btn-quick-add js-quick-add">
          <span></span>${bcSfFilterConfig.label.quick_add}
        </a>
        ` ;
      }
    }
  } else {
    quickAddHtml = `
      <a
        href="${colorURL}?variant=${variantId}"
        id="PrescriptionToggle"
        class="btn-quick-add customize prescription">
        <span></span>Select lenses
      </a>
      `;
  }

  productImages += editorialImage(images);

  //Add all Images
  itemHtml = itemHtml.replace(/{{allImages}}/g, productImages);
  itemHtml = itemHtml.replace(/{{colorNames}}/g, colorNames);
  itemHtml = itemHtml.replace(/{{allPrices}}/g, productPrices);
  itemHtml = itemHtml.replace(/{{colorSwatches}}/g, colorSwatchesHtml);
  itemHtml = itemHtml.replace(/{{quickAddBtn}}/g, quickAddHtml);
  itemHtml = itemHtml.replace(/{{counterClass}}/g, counterClassItem);
  itemHtml = itemHtml.replace(/{{itemStock}}/g, stockInventoryHtml);

  // Add soldOut class
  var soldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : "";
  itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);

  // Add soldOut Label
  var itemSoldOutLabelHtml = soldOut ? bcSfFilterTemplate.soldOutLabelHtml : "";
  itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabelHtml);

  productItemCounter++;

  return itemHtml;
};

// Build Product List Item
BCSfFilter.prototype.buildProductListItem = function (data) {
  // // Add Description
  // var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
  // // Truncate by word
  // itemDescription = (itemDescription.split(" ")).length > 51 ? itemDescription.split(" ").splice(0, 51).join(" ") + '...' : itemDescription.split(" ").splice(0, 51).join(" ");
  // // Truncate by character
  // itemDescription = itemDescription.length > 350 ? itemDescription.substring(0, 350) + '...' : itemDescription.substring(0, 350);
  // itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
};

// Customize data to suit the data of Shopify API
BCSfFilter.prototype.prepareProductData = function (data) {
  for (var k in data) {
    // Add Options
    var optionsArr = [];
    for (var i in data[k]["options_with_values"]) {
      optionsArr.push(data[k]["options_with_values"][i]["name"]);
    }
    data[k]["options"] = optionsArr;

    // Customize variants
    for (var i in data[k]["variants"]) {
      var variantOptionArr = [];
      var count = 1;
      var variant = data[k]["variants"][i];
      // Add Options
      var variantOptions = variant["merged_options"];
      if (Array.isArray(variantOptions)) {
        for (var j = 0; j < variantOptions.length; j++) {
          var temp = variantOptions[j].split(":");
          data[k]["variants"][i]["option" + (parseInt(j) + 1)] = temp[1];
          data[k]["variants"][i]["option_" + temp[0]] = temp[1];
          variantOptionArr.push(handleize(temp[1]));
        }
        data[k]["variants"][i]["options"] = variantOptionArr;
      }
      data[k]["variants"][i]["compare_at_price"] =
        parseFloat(data[k]["variants"][i]["compare_at_price"]) * 100;
      data[k]["variants"][i]["price"] =
        parseFloat(data[k]["variants"][i]["price"]) * 100;
    }

    // Add Description
    data[k]["description"] = data[k]["body_html"];
  }
  return data;
};

/************************** END BUILD PRODUCT LIST **************************/

// Build Pagination
BCSfFilter.prototype.buildPagination = function (totalProduct) {
  if (this.getSettingValue("general.paginationType") == "default") {
    // Get page info
    var currentPage = parseInt(this.queryParams.page);
    var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

    // If it has only one page, clear Pagination
    if (totalPage == 1) {
      jQ(this.selector.bottomPagination).html("");
      return false;
    }

    if (this.getSettingValue("general.paginationType") == "default") {
      var paginationHtml = bcSfFilterTemplate.paginateHtml;

      // Build Previous
      var previousHtml =
        currentPage > 1
          ? bcSfFilterTemplate.previousActiveHtml
          : bcSfFilterTemplate.previousDisabledHtml;
      previousHtml = previousHtml.replace(
        /{{itemUrl}}/g,
        this.buildToolbarLink("page", currentPage, currentPage - 1)
      );
      paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

      // Build Next
      var nextHtml =
        currentPage < totalPage
          ? bcSfFilterTemplate.nextActiveHtml
          : bcSfFilterTemplate.nextDisabledHtml;
      nextHtml = nextHtml.replace(
        /{{itemUrl}}/g,
        this.buildToolbarLink("page", currentPage, currentPage + 1)
      );
      paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

      // Create page items array
      var beforeCurrentPageArr = [];
      for (
        var iBefore = currentPage - 1;
        iBefore > currentPage - 3 && iBefore > 0;
        iBefore--
      ) {
        beforeCurrentPageArr.unshift(iBefore);
      }
      if (currentPage - 4 > 0) {
        beforeCurrentPageArr.unshift("...");
      }
      if (currentPage - 4 >= 0) {
        beforeCurrentPageArr.unshift(1);
      }
      beforeCurrentPageArr.push(currentPage);

      var afterCurrentPageArr = [];
      for (
        var iAfter = currentPage + 1;
        iAfter < currentPage + 3 && iAfter <= totalPage;
        iAfter++
      ) {
        afterCurrentPageArr.push(iAfter);
      }
      if (currentPage + 3 < totalPage) {
        afterCurrentPageArr.push("...");
      }
      if (currentPage + 3 <= totalPage) {
        afterCurrentPageArr.push(totalPage);
      }

      // Build page items
      var pageItemsHtml = "";
      var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
      for (var iPage = 0; iPage < pageArr.length; iPage++) {
        if (pageArr[iPage] == "...") {
          pageItemsHtml += bcSfFilterTemplate.pageItemRemainHtml;
        } else {
          pageItemsHtml +=
            pageArr[iPage] == currentPage
              ? bcSfFilterTemplate.pageItemSelectedHtml
              : bcSfFilterTemplate.pageItemHtml;
        }
        pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
        pageItemsHtml = pageItemsHtml.replace(
          /{{itemUrl}}/g,
          this.buildToolbarLink("page", currentPage, pageArr[iPage])
        );
      }
      paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);

      jQ(this.selector.bottomPagination).html(paginationHtml);
    }
  }
};

/************************** BUILD TOOLBAR **************************/

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function () {
  if (bcSfFilterTemplate.hasOwnProperty("sortingHtml")) {
    jQ(this.selector.topSorting).html("");

    var sortingArr = this.getSortingList();
    if (sortingArr) {
      // Build content
      var sortingItemsHtml = "";
      for (var k in sortingArr) {
        let hideOption = "";
        if (k === "manual") {
          hideOption = " disabled";
        }

        sortingItemsHtml +=
          '<option value="' +
          k +
          '"' +
          hideOption +
          ">" +
          sortingArr[k] +
          "</option>";
      }
      var html = bcSfFilterTemplate.sortingHtml.replace(
        /{{sortingItems}}/g,
        sortingItemsHtml
      );
      jQ(this.selector.topSorting).html(html);

      // Set current value
      jQ(this.selector.topSorting + " select").val(this.queryParams.sort);
    }
  }
};

// Build Display type (List / Grid / Collage)
// BCSfFilter.prototype.buildFilterDisplayType = function() {
//     var itemHtml = '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="change-view bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><i class="fa fa-th" aria-hidden="true"></i><span class="fallback-text">Grid view</span></span></a>';
//     itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="change-view bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><i class="fa fa-list" aria-hidden="true"></i><span class="fallback-text">List view</span></span></a>';
//     jQ(this.selector.topDisplayType).html(itemHtml);

//     // Active current display type
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
//     jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
//     if (this.queryParams.display == 'list') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
//     } else if (this.queryParams.display == 'grid') {
//         jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
//     }
// };

/************************** END BUILD TOOLBAR **************************/

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function (data, eventType) {
  //find and display editorial image
  /*
  if (!jQ(".bc-sf-filter-option-item.selected").length) {
    displayEditorial(data.length);
  }*/

  // show products when images are fully loaded
  setTimeout(() => {
    jQ(".js-product-list-container").removeClass("hidden");
  }, 500);
};
// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function (data, eventType) {
  // product results
  const totalProducts = data.total_product;
  productItemCounter = 0;

  jQ(".js-results").text(totalProducts);

  // add colors to filtered items
  addColorToFilteredItems();
  // move filtered items
  moveFilteredItems();
  // [Feature][Rose] Image Break start
  // add image break
  imageBreak();
  // [Feature][Rose] Image Break end
};

function buildPrices(data) {
  var html = "";
  var removeTrailingZeroes = /\.00\b/g;

  html = "";
  if (data.compare_at_price > data.price) {
    html +=
      '<ins class="price__amount"><span class="money">' +
      bcsffilter.formatMoney(data.price) +
      "</span></ins>";
    html +=
      '<del class="price__amount"><span class="money">' +
      bcsffilter.formatMoney(data.compare_at_price) +
      "</span></del> ";
  } else {
    html +=
      '<span class="price__amount 2"><span class="money">' +
      bcsffilter.formatMoney(data.price) +
      "</span></span>";
  }
  html += "";

  if (html.match(removeTrailingZeroes)) {
    html = html.replace(removeTrailingZeroes, "");
  }

  return html;
}

function handleize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace("_", "-");
}

function moveFilteredItems() {
  jQ(".js-clone-clear-removable").remove();

  const clearAllBtn = jQ(".js-clone-clear-btn")
    .clone()
    .addClass("js-clone-clear-removable");
  const element = jQ(".bc-sf-filter-selection-wrapper").html();

  jQ(".js-filtered-items").html("");
  jQ(".js-filtered-items").append(element);
  jQ(".js-filtered-items .bc-sf-filter-selected-items").append(clearAllBtn);
}

function addColorToFilteredItems() {
  var selectedItemsCount = jQ("#bc-sf-filter-tree .bc-sf-filter-selected-items .selected-type").length;

  var countDisplaySpan = jQ("#count-display-span");
  countDisplaySpan.text(`(${selectedItemsCount})`);

  var countDisplaySpanBtn = jQ("#count-display-span-btn");

  // Count the total number of filters showing on the sidebar
  var totalFiltersCount = jQ(".product-listing__item").length;
  countDisplaySpanBtn.text(`${totalFiltersCount}`);

  var namesDisplaySpan = jQ("#names-display-span");
  namesDisplaySpan.empty();

  var filterMarginAdder = jQ(".filter-container-liner");

  var selectedNames = [];

  // Combined loop to process selected items and push to selectedNames array
  jQ("#bc-sf-filter-tree .bc-sf-filter-selected-items")
    .find(".selected-type")
    .each(function () {
      const selectedType = jQ(this);
      const typeName = selectedType.find("span").text().trim();
      const valueName = selectedType.find("strong").text().trim();
      
      const formattedName = `${typeName}: ${valueName}`;

      selectedNames.push(formattedName);
      
      const createColorElement = jQ("<figure></figure>");
      const isColor = typeName.toLowerCase().includes("color");

      if (isColor) {
        createColorElement.attr("data-handle-name", handleize(valueName));
        selectedType
          .append(createColorElement)
          .parent()
          .addClass("is-color-swatch");
      }
    });

  selectedNames.forEach(function (name) {
    var nameLink = jQ(`<a onclick="clearAllFilterOptions(event)" class="bc-sf-add-filter-list">${name}</a>`);
    namesDisplaySpan.append(nameLink);
  });

  if (selectedItemsCount === 0) {
    countDisplaySpan.addClass("selectedCountHidden");
    // countDisplaySpanBtn.addClass("selectedCountHidden");
    namesDisplaySpan.addClass("selectedCountHidden");
    filterMarginAdder.removeClass("filter-margin-adder")
  } else {
    countDisplaySpan.removeClass("selectedCountHidden");
    // countDisplaySpanBtn.removeClass("selectedCountHidden");
    namesDisplaySpan.removeClass("selectedCountHidden");
    filterMarginAdder.addClass("filter-margin-adder")
  }

  // Process data-id-names
  jQ(".bc-sf-filter-option-item.selected").each(function () {
    var itemName = jQ(this).find(".bc-sf-filter-data-name").text().trim();
  });
}

/*
// Check editorial image positions
function displayEditorial(totalProducts) {
  let productCol = 0;
  let productsRow = 1;
  let productRightPositioned = false;

  for (let productIndex = 0; productIndex < totalProducts; productIndex++) {
    productCol++;

    if (productCol >= 3) {
      productsRow++;

      productCol = 0;
    }

    if (productsRow % 2 === 1 && productCol === 1) {
      productRightPositioned = !productRightPositioned;

      addEditorialActiveClass(productIndex, productRightPositioned);
    }

    if (productsRow >= 3) {
      productsRow = 1;
    }

    // add class that indicates the image is already loaded and checked for editorial images
    jQ(`.js-product-item--${productIndex}`).addClass("images-initialized");
  }
}

// Display editorial image if position matches

function addEditorialActiveClass(productIndex, rightPositioned) {
  if (rightPositioned) {
    productIndex = productIndex + 2;
  }

  const $selectedProducts = jQ(`.js-product-item--${productIndex}`);

  $selectedProducts.each(function() {
    const $selectedProduct = jQ(this);
    const $findEditorialImage = $selectedProduct.find("[data-editorial-image]");

    if (
      $findEditorialImage.length > 0 &&
      !$selectedProduct.hasClass("images-initialized")
    ) {
      $findEditorialImage
        .css({
          "background-image": `url(${$findEditorialImage.data("bg-src")})`,
        })
        .addClass("current-image-variant")
        .siblings()
        .removeClass("current-image-variant");
    }

    // add class that indicates the image is already loaded and checked for editorial images
    $selectedProduct.addClass("images-initialized");
  });
}
*/

// [Feature][Rose] Image Break Start
function imageBreak() {
  const currentNumOfItemOnPage = $("#bc-sf-filter-products .product-listing__item").length;
  const totalAddedImgs = Math.trunc(productsCount / 10) + productsCount;

  let imageBreakRight;
  let imageBreakLeft;

  function generateImageBreakContent(content) {
    let interactiveClass = "";
    let interactiveAction = "";
    let interactiveHeading = "";
    let interactiveSubcopy = "";

    if (!content) {
      return
    }

    if (content.ctaAction.startsWith('#') && content.ctaText != 'SKIP') {
      let ctaColor = '';
      if (content.ctaColor) {
        if (content.ctaColor == 'Dark') {
          ctaColor = 'ib-dark';
        } else if (content.ctaColor == 'Light') {
          ctaColor = 'ib-light'
        } else {
          ctaColor = '';
        }
      } else {
        ctaColor = '';
      }

      interactiveAction = `<button class="btn ib-interactive ${ctaColor}" onclick="toggleInteractiveBanner('${content.ctaAction}')">${content.ctaText}</button>`;
    } else if (content.ctaAction.startsWith('http') && content.ctaText != 'SKIP') {
      interactiveAction = '<a class="btn ib-interactive" href="' + content.ctaAction + '">' + content.ctaText + '</a>';
    } else if (content.ctaText == 'SKIP') {
      interactiveAction = "";
    }

    if (content.header != 'SKIP') {
      interactiveHeading = '<h2>' + content.header + '</h2>';
    }

    if (content.subcopy != 'SKIP') {
      interactiveSubcopy = '<p>' + content.subcopy + '</p>';
    }

    if (content.color == 'Dark') {
      interactiveClass = 'ib-dark';
    } else if (content.color == 'Light') {
      interactiveClass = 'ib-light';
    }

    return '<div id="js-image-break" class="collection-image-break ' + interactiveClass + '"><img src="' + content.image + '" alt="' + content.header + '"/><div class="collection-image-break__content ' + content.position + '">' + interactiveHeading + interactiveSubcopy + interactiveAction + '</div></div>';
  }

  function insertImageBreak(inItem, imageBreak) {
    jQ(imageBreak).insertAfter(`#bc-sf-filter-products .product-listing__item:nth-child(${inItem})`);
  }

  if (currentNumOfItemOnPage <= totalAddedImgs) {

    if (countRenderRight < collectionImageBreak.length || countRenderLeft < collectionImageBreak.length) {

      // ============================ Next Page: On scroll render

      if (jQ("#js-image-break").length && collectionImageBreak.length > 2) {
        const numLength = Math.trunc(currentNumOfItemOnPage / 10);
        const imageBreakNumOnThePage = document.querySelectorAll('#js-image-break').length;
        const updatedNumLength = numLength - imageBreakNumOnThePage;

        imageBreakRight = generateImageBreakContent(collectionImageBreak[countRenderRight]);
        imageBreakLeft = generateImageBreakContent(collectionImageBreak[countRenderLeft]);

        for (let index = 1; index <= updatedNumLength; index++) {
          let multiplier = imageBreakNumOnThePage + index;

          if (index === 1) {
            insertImageBreak(((10 * multiplier) + (multiplier - index)), imageBreakRight);
          } else {
            insertImageBreak(((10 * multiplier) + multiplier - 3), imageBreakLeft);
          }
        }
      }

      // ============================ Page 1: First loaded list of products

      if (!jQ("#js-image-break").length && collectionImageBreak) {
        const numLength = Math.trunc(currentNumOfItemOnPage / 10);

        imageBreakRight = generateImageBreakContent(collectionImageBreak[countRenderRight]);
        imageBreakLeft = generateImageBreakContent(collectionImageBreak[countRenderLeft]);

        for (let index = 1; index <= numLength; index++) {
          if ($("#bc-sf-filter-products .product-listing__item").length <= 10) {
            insertImageBreak(6 * index, imageBreakRight);
          } else {
            insertImageBreak(10 * index, imageBreakRight);

            if (collectionImageBreak.length < 2) {
              return
            }

            // optional render if with enough numbers
            if ($("#bc-sf-filter-products .product-listing__item").length > 10 && $("#bc-sf-filter-products .product-listing__item").length <= 20) {
              insertImageBreak(19 * index, imageBreakLeft);
            }
          }
        }
      }

      countRenderRight += 2;
      countRenderLeft += 2;

    }

  }
}
// [Feature][Rose] Image Break End

jQ(".js-mobile-filter-btn").click(function () {
  jQ(".js-mobile-filter-btn span").toggleClass("up");
  jQ(".js-filter-container #bc-sf-filter-tree").toggleClass("hide");

  if (!jQ(".js-mobile-filter-btn span").hasClass("up")) {
    jQ(".js-mobile-filter-btn").css("color", "#b3a89b");
    const screenHeight = jQ(".wrapper").height();
    jQ("#bc-sf-filter-options-wrapper").css({ height: `${screenHeight}px` });
  } else {
    jQ(".js-mobile-filter-btn").css("color", "#393334");
  }
});

let open = false;
function isOpen() {
  const sortingElement = jQ("#bc-sf-filter-top-sorting");
  open ? sortingElement.addClass("open") : sortingElement.removeClass("open");
}

jQ("#bc-sf-filter-top-sorting").on(
  "click",
  "#bc-sf-filter-top-sorting-select",
  function () {
    open = !open;
    isOpen();
  }
);

jQ("#bc-sf-filter-top-sorting").on(
  "blur",
  "#bc-sf-filter-top-sorting-select",
  function () {
    if (open) {
      open = !open;
      isOpen();
    }
  }
);

//Resize window
function mobileFilter() {
  if (jQ(window).width() < 767) {
    jQ(".js-filter-container #bc-sf-filter-tree").addClass("hide");
  }
}

//watch window resize
// jQ(window).on("resize", function () {
//   mobileFilter();
// });

// jQ(window).on("load", function () {
//   if (jQ(window).width() < 767) {
//     jQ(".js-filter-container #bc-sf-filter-tree").addClass("hide");
//   }
// });

BCSfFilter.prototype.buildToggleEvent = function (data) {
  var self = this;
  var openListClass = this.class.filterOptionOpenList,
    closeListClass = this.class.filterOptionCloseList,
    filterOptionClass = this.class.filterOption;
  var openList = jQ('.' + openListClass).length > 0 ? jQ('.' + openListClass).val().split(',') : [];
  var closeList = jQ('.' + closeListClass).length > 0 ? jQ('.' + closeListClass).val().split(',') : [];

  // Fix collapse/expand function for ADA
  // jQ('.' + this.class.filterBlockTitle + ' h3').on('keypress', function (event) {
  //   if (event.keyCode == 13) {
  //     jQ(this).trigger('click');
  //   }
  // })

  jQ('.' + this.class.filterBlockTitle + ' h3').off('click').on('click', function (e) {
    e.preventDefault();
    var filterOptionId = jQ(this).closest('.' + filterOptionClass).attr('data-id');
    var parent = jQ(this).parents('.bc-sf-filter-option-block');
    var otherFilterOption = parent.siblings();
    otherFilterOption.each(function () {
      jQ(this).find('.bc-sf-filter-block-title span').addClass('up');
      jQ(this).find('.bc-sf-filter-block-title h3').attr('aria-expanded', 'false');
      jQ(this).find('.bc-sf-filter-block-content').slideUp();
    })

    // Open state
    if (jQ(this).children().hasClass('up')) {
      if (self.getSettingValue('general.keepToggleState')) {
        openList.push(filterOptionId);
        if (closeList.length > 0 && closeList.indexOf(filterOptionId) > -1) {
          closeList.splice(closeList.indexOf(filterOptionId), 1);
        }
      }
      jQ(this).children().removeClass('up');
      jQ(this).attr('aria-expanded', 'true');
      jQ(this).parent().siblings().slideDown(function () {
        if (jQ(this).parent().attr('data-display-type') != 'range') {
          self.buildFilterOptionBoxStyle(jQ(this));
          self.buildFilterScrollbar(this);
        }
      });
    }
    // Collapse state
    else {
      if (self.getSettingValue('general.keepToggleState')) {
        closeList.push(filterOptionId);
        if (openList.length > 0 && openList.indexOf(filterOptionId) > -1) {
          openList.splice(closeList.indexOf(filterOptionId), 1);
        }
      }
      jQ(this).children().addClass('up');
      jQ(this).attr('aria-expanded', 'false');
      jQ(this).parent().siblings().slideUp();
    }
    jQ('.' + openListClass).val(openList.join(','));
    jQ('.' + closeListClass).val(closeList.join(','));
  });

  if (this.getSettingValue('general.collapseSubCategory')) {
    jQ('.' + this.class.filterOption + '.bc-sf-filter-option-block-sub_category .bc-sf-filter-option-single-list li span.sub-icon').on('click', function (e) {
      if (jQ(this).hasClass('sub-up')) {
        jQ(this).removeClass('sub-up');
        jQ(this).attr('aria-expanded', 'true');
        jQ(this).parent().siblings().slideDown();
      } else {
        jQ(this).addClass('sub-up');
        jQ(this).attr('aria-expanded', 'false');
        jQ(this).parent().siblings().slideUp();
      }
    });
  }

  jQuery(document).ready(function($) {
    $('.bc-sf-filter-option-block').each(function() {
      var title = $(this).find('.bc-sf-filter-block-title h3');
      var content = $(this).find('.bc-sf-filter-block-content');

      title.children().addClass('up');
      title.attr('aria-expanded', 'true');

      // Slide down the content to show it
      content.slideDown(function() {
        // Optionally, you can add any custom styling or additional functionality here
      });
    });

    // If you have sub-categories that should also be expanded automatically
    $('.bc-sf-filter-option-sub_category').each(function() {
      // Find the sub-category icon and slide down its siblings
      $(this).find('.sub-icon').removeClass('sub-up');
      $(this).find('.sub-icon').attr('aria-expanded', 'true');
      $(this).siblings().slideDown();
    });

  });
};