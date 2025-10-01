const productReviewsContainer = document.getElementById(
  "product-reviews-container",
);
const productReviewPrevButtonElement = document.getElementById(
  "product-review-prev-button",
);
const productReviewNextButtonElement = document.getElementById(
  "product-review-next-button",
);
const writeAReviewModalElement = document.getElementById(
  "write-a-review-container",
);
const prevButtonImage = productReviewPrevButtonElement.querySelector("img");
const nextButtonImage = productReviewNextButtonElement.querySelector("img");

const productId = productReviewsContainer?.dataset?.productId ?? "";
const productTitle = productReviewsContainer?.dataset?.productTitle ?? "";
const productUrl = productReviewsContainer?.dataset?.productUrl ?? "";

const mainShopifyData = JSON.parse(
  document.getElementById("ShopifyData")?.innerHTML ?? "{}",
);

async function getProductReviews({
  productId,
  page = 1,
  direction = "desc",
  sort = "rating",
  star
}) {

  try {
    let url = `https://api-cdn.yotpo.com/v1/widget/dnGeaU8oseqC9z4WBEDYoZAWrjMbpQRCp42vUZ4B/products/${productId}/reviews.json?per_page=5&page=${page}&direction=${direction}&sort=${sort}${
      !!star ? "&star=" + star : ""
    }`;

    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(url, options);
    const { response: data, status } = await res.json();

    if (status.code === 200) {
      return data;
    } else {
      console.error("error: ", status.message);
      return {};
    }
  } catch (error) {
    console.error("error:" + error);
    return {};
  }
}

// Alternative API
async function getProductReviewsSearchApi({
  productId,
  page = 1,
  direction = "desc",
  sort = "rating",
  star,
  pictured = false
}) {

  try {
    let url = `https://api-cdn.yotpo.com/v1/reviews/dnGeaU8oseqC9z4WBEDYoZAWrjMbpQRCp42vUZ4B/filter.json?per_page=5&page=${page}`;
    const ascending = direction === 'asc' ? true : false
    const sort_by = sort === 'rating' ? 'score' : sort
    const scores = star ? [star] : [] 
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain_key: productId,
        scores,
        pictured,
        sort_by,
        ascending
      })
    };

    const res = await fetch(url, options);
    const { response: data, status } = await res.json();

    if (status.code === 200) {
      return data;
    } else {
      console.error("error: ", status.message);
      return {};
    }
  } catch (error) {
    console.error("error:" + error);
    return {};
  }
}

function initializeReviewPaginationValues(currentPage, totalPage) {
  const productReviewPagination = $("#product-review-current-page").closest(".product-review-pagination");
  const currentPageElement = document.getElementById(
    "product-review-current-page",
  );
  const totalPageElement = document.getElementById("product-review-total-page");
  if (totalPage <= 1){
    // productReviewPagination.hide()
  }else{
    productReviewPagination.show()
  }
  currentPageElement.innerText = currentPage;
  totalPageElement.innerText = totalPage;
}

function preventPaginationOvershooting(currentPage, totalPage, direction) {
  if (currentPage <= 1 && direction === "PREV") return true;
  if (currentPage >= totalPage && direction === "NEXT") return true;

  return false;
}

function updatePaginationButtonColors(currentPage, totalPage) {
  if (currentPage <= 1) {
    prevButtonImage.style.filter =
      "invert(97%) sepia(5%) saturate(158%) hue-rotate(97deg) brightness(91%) contrast(85%)";
  }

  if (currentPage >= totalPage) {
    nextButtonImage.style.filter =
      "invert(97%) sepia(5%) saturate(158%) hue-rotate(97deg) brightness(91%) contrast(85%)";
  }
}

function getFormattedDate(date) {
  let year = date.getFullYear().toString().slice(-2);
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

function formatReviewDetails({ createdAt, userName }) {
  const formattedUserName = userName.split(" ").find(Boolean).toLowerCase();
  const dateCreated = new Date(createdAt);
  const formattedDateCreated = getFormattedDate(dateCreated);

  return {
    createdAt: formattedDateCreated,
    userName: formattedUserName,
  };
}

function initializeNoReviews() {
  const productFilterContainerElement = document.getElementsByClassName(
    "product-reviews-filters-container",
  );
  const productReviewsInfo = document.querySelectorAll(".reviews-header-content .product-reviews-info");
  const productReviewPaginationElement = document.getElementsByClassName(
    "product-review-pagination",
  );
  const emptyProductReviewsElement = document.getElementById(
    "empty-product-reviews",
  );
  const productReviewsBodyElement = document.getElementsByClassName(
    "product-reviews-body",
  );

  for (const item of productFilterContainerElement) {
    item.style.display = "none";
  }

  for (const item of productReviewsInfo) {
    item.innerHTML = "0 Reviews";
  }

  for (const item of productReviewPaginationElement) {
    item.style.display = "none";
  }

  for (const item of productReviewsBodyElement) {
    item.style.display = "none";
  }

  emptyProductReviewsElement.style.display = "flex";
  productReviewsContainer.classList.add("no-reviews");
}

function initializeReviewHeader({ averageScore, numOfTotalReviews }) {
  const reviewAverageScoreElement = document.getElementById(
    "product-reviews-info-average",
  );
  const numOfReviewsElement = document.getElementById("product-num-of-reviews");
  const productReviewStarsContainerElement = document.getElementById(
    "review-stars-container",
  );
  productReviewStarsContainerElement.innerHTML = "";
  
  if (!numOfTotalReviews) {
    initializeNoReviews();
    return;
  }

  const numOfStars = Math.round(+averageScore);

  reviewAverageScoreElement.innerText = Number(averageScore).toFixed(1);
  numOfReviewsElement.innerText = numOfTotalReviews;

  for (let i = 0; i < 5; i++) {
    const starImageElement = document.createElement("img");
    starImageElement.setAttribute("loading", "lazy");

    const hasStarCountEnded = numOfStars - 1 < i;

    starImageElement.src = hasStarCountEnded
      ? "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/Star_5.svg?v=1666143946"
      : "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/review-star.svg?v=1664876201";

    productReviewStarsContainerElement.append(starImageElement);
  }
  //Copy reviews star-rating to q&a
  const reviewsStars = $("#review-stars-container");
  const qandaStars = $("#qanda-stars-container");
  qandaStars.html(reviewsStars.children().clone());
}

async function initializeReviewItems({ page, direction, sort, star, pictured }) {
  // Use different api endpoint for filter by images and videos
  let bottomline, reviews, pagination
  if (pictured){
     const response = await getProductReviewsSearchApi({
      productId,
      page,
      direction,
      sort,
      star,
      pictured
    });
    bottomline = response.bottomline
    reviews = response.reviews
    pagination = response.pagination
  }else{
     const response = await getProductReviews({
      productId,
      page,
      direction,
      sort,
      star,
    });
    bottomline = response.bottomline
    reviews = response.reviews
    pagination = response.pagination
  }
  const { page: currentPage, total } = pagination;
  const totalPage = Math.ceil(total / 5);
  
  if(bottomline){  
    initializeReviewHeader({
      averageScore: bottomline.average_score,
      numOfTotalReviews: bottomline.total_review
    });
  }

  initializeReviewPaginationValues(currentPage, totalPage);
  updatePaginationButtonColors(currentPage, totalPage);

  const productReviewItems = document.getElementById("product-review-items");

  productReviewItems.innerHTML = "";

  if(isFiltered() && !reviews.length){
    $(".product-reviews-filter-no-result").css('display', 'flex');
    $(".product-review-pagination").hide();
    return;
  }
  $(".product-reviews-filter-no-result").hide();
  
  for (const review of reviews) {
    const { content, created_at, images_data, score, title, user } = review;
    const { display_name } = user;
    const { createdAt, userName } = formatReviewDetails({
      createdAt: created_at,
      userName: display_name,
    });

    const reviewItem = document.createElement("li");
    reviewItem.setAttribute("id", "review-item");

    const reviewItemHeader = document.createElement("div");
    reviewItemHeader.setAttribute("class", "review-item-header");

    const reviewItemBody = document.createElement("div");
    reviewItemBody.setAttribute("class", "review-item-body");

    const reviewCustomerName = document.createElement("p");
    reviewCustomerName.setAttribute("id", "review-customer-name");
    reviewCustomerName.appendChild(document.createTextNode(userName));

    const reviewDateCreated = document.createElement("p");
    reviewDateCreated.setAttribute("id", "review-date-created");
    reviewDateCreated.appendChild(document.createTextNode(createdAt));

    const reviewStars = document.createElement("div");
    reviewStars.setAttribute("id", "review-stars");
    for (let scoreCount = 0; scoreCount < 5; scoreCount++) {
      const reviewStarImage = document.createElement("img");
      reviewStarImage.setAttribute("loading", "lazy");

      const hasStarCountEnded = score - 1 < scoreCount;

      reviewStarImage.src = hasStarCountEnded
        ? "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/Star_5.svg?v=1666143946"
        : "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/review-star.svg?v=1664876201";

      reviewStars.append(reviewStarImage);
    }

    const reviewTitle = document.createElement("h4");
    reviewTitle.setAttribute("id", "review-title");
    reviewTitle.innerHTML = DOMPurify.sanitize(title);

    const reviewContent = document.createElement("p");
    reviewContent.setAttribute("id", "review-content");
    reviewContent.innerHTML = DOMPurify.sanitize(content);

    const reviewImages = document.createElement("div");
    reviewImages.setAttribute("id", "review-images");
    images_data?.forEach((image) => {
      const { thumb_url } = image;

      const reviewImage = document.createElement("img");
      reviewImage.setAttribute("loading", "lazy");
      reviewImage.src = thumb_url;

      reviewImages.append(reviewImage);
    });

    reviewItemHeader.append(reviewCustomerName);
    reviewItemHeader.append(reviewDateCreated);

    reviewItemBody.append(reviewStars);
    reviewItemBody.append(reviewTitle);
    reviewItemBody.append(reviewContent);
    reviewItemBody.append(reviewImages);

    reviewItem.append(reviewItemHeader);
    reviewItem.append(reviewItemBody);

    productReviewItems.append(reviewItem);
  }
}

function getReviewPageData() {
  const totalPage = document.getElementById(
    "product-review-total-page",
  ).innerText;
  const currentPage = document.getElementById(
    "product-review-current-page",
  ).innerText;

  return { currentPage: Number(currentPage), totalPage: Number(totalPage) };
}

function resetPaginationButtonColors() {
  prevButtonImage.style.filter = "";
  nextButtonImage.style.filter = "";
}

productReviewPrevButtonElement.onclick = function () {
  const { currentPage, totalPage } = getReviewPageData();
  const {star, pictured, sort, direction} = getFilterAndSortValues();
  
  resetPaginationButtonColors();

  const isPageOutOfBounds = preventPaginationOvershooting(
    currentPage,
    totalPage,
    "PREV",
  );

  if (isPageOutOfBounds) return;

  initializeReviewItems({ page: currentPage - 1, star, pictured, sort, direction });
};

productReviewNextButtonElement.onclick = function () {
  const { currentPage, totalPage } = getReviewPageData();
  const {star, pictured, sort, direction} = getFilterAndSortValues();
  
  resetPaginationButtonColors();

  const isPageOutOfBounds = preventPaginationOvershooting(
    currentPage,
    totalPage,
    "NEXT",
  );

  if (isPageOutOfBounds) return;

  initializeReviewItems({ page: currentPage + 1, star, pictured, sort, direction });
};

initializeReviewItems({ page: 1 });

const writeAReviewCloseButton = document.getElementById(
  "write-a-review-close-button",
);

writeAReviewCloseButton.onclick = function () {
  writeAReviewModalElement.style.display = "none";
  resetWriteAReviewModalReOpen();
};

function handleOpenWriteAReviewModal() {
  console.log("-----------")
  writeAReviewModalElement.style.display = "flex";
  const customerEmail = getUserEmail();

  document.getElementById("write-a-review-email-input").value = customerEmail;
}

const writeAReviewOpenButton = document.getElementById(
  "write-product-reviews-button",
);

const OpenWriteEmptyReviewButton = document.getElementById(
  "empty-write-a-review-link",
);

writeAReviewOpenButton.onclick = function () {
  handleOpenWriteAReviewModal();
};

OpenWriteEmptyReviewButton.onclick = function () {
  handleOpenWriteAReviewModal();
};

const writeAReviewStars = document.querySelectorAll(
  ".star-selector-container img",
);

function handleWriteAReviewRating(score) {
  let index = 1;

  for (const unselectedStars of writeAReviewStars) {
    unselectedStars.style.filter =
      index <= +score
        ? "brightness(0) saturate(100%) invert(12%) sepia(5%) saturate(2317%) hue-rotate(331deg) brightness(99%) contrast(86%)"
        : "";

    index++;
  }

  const starSelectorElement = document.getElementById(
    "star-selector-container",
  );
  starSelectorElement.dataset.currentScore = score;
}

for (const unselectedStars of writeAReviewStars) {
  unselectedStars.onclick = function () {
    const { dataset } = unselectedStars;
    const { score } = dataset;
    handleWriteAReviewRating(score);
  };
}

function resetWriteAReviewModalReOpen() {
  document.getElementById("review-submit-mesasge-container").style.display =
    "none";
  document.getElementById("write-a-review-form").style.display = "block";
  document.querySelector(".write-a-review-wrapper h4").innerText =
    "Write a review";
}

function switchWriteAReviewModalContent() {
  document.getElementById("review-submit-mesasge-container").style.display =
    "flex";
  document.getElementById("write-a-review-form").style.display = "none";
}

function successWritingAReview() {
  switchWriteAReviewModalContent();

  document.querySelector(".write-a-review-wrapper h4").innerText =
    "Thanks for leaving a review!";

  document.getElementById("review-after-submit-message").innerText =
    "We really appreciate you taking the time to share your rating with us.";
}

function errorWritingAReview() {
  switchWriteAReviewModalContent();

  document.querySelector(".write-a-review-wrapper h4").innerText = "Oops!";

  document.getElementById("review-after-submit-message").innerText =
    "There's an error submitting your review.";

  document.getElementById("review-after-submit-button").style.display = "none";
}

function resetWriteAReviewForm() {
  document.getElementById("write-a-review-email-input").value = "";
  document.getElementById("star-selector-container").dataset.currentScore = 0;
  document.getElementById("write-a-review-name-input").value = "";
  document.getElementById("write-a-review-description-textarea").value = "";
  document.getElementById("write-a-review-title-input").value = "";
}

async function handleWriteAReview(reviewData) {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appkey: "dnGeaU8oseqC9z4WBEDYoZAWrjMbpQRCp42vUZ4B",
        domain: "sunniesstudios.myshopify.com",
        sku: reviewData?.productId ?? "",
        product_title: reviewData?.productTitle ?? "",
        product_url: reviewData?.productUrl ?? "",
        display_name: reviewData?.customerName ?? "",
        email: reviewData?.customerEmail ?? "",
        review_content: reviewData?.reviewContent ?? "",
        review_title: reviewData?.reviewTitle ?? "",
        review_score: reviewData?.reviewScore ?? 0,
      }),
    };

    const res = await fetch("https://api.yotpo.com/v1/widget/reviews", options);
    const response = await res.json();

    if (response.code === 200) {
      successWritingAReview();
    } else {
      errorWritingAReview();
    }

    resetWriteAReviewForm();
  } catch (error) {
    console.error(error);
  }
}

function getUserEmail() {
  const customerData = mainShopifyData?.customer ?? {};

  if (!Object.keys(customerData).length) {
    return "";
  }

  return customerData?.email ?? "";
}

const writeAReviewButton = document.getElementById(
  "write-a-review-submit-button",
);

writeAReviewButton.onclick = function () {
  const customerEmail = document.getElementById(
    "write-a-review-email-input",
  ).value;

  const starSelectorElement = document.getElementById(
    "star-selector-container",
  );

  const customerName = document.getElementById(
    "write-a-review-name-input",
  ).value;

  const reviewContent = document.getElementById(
    "write-a-review-description-textarea",
  ).value;

  const reviewTitle = document.getElementById(
    "write-a-review-title-input",
  ).value;

  const currentScore = +starSelectorElement?.dataset?.currentScore ?? 0;

  const data = {
    productId: productId,
    productTitle: productTitle,
    productUrl: productUrl,
    customerName: customerName,
    customerEmail: customerEmail,
    reviewContent: reviewContent,
    reviewTitle: reviewTitle,
    reviewScore: currentScore,
  };

  const errors = handleWriteAReviewErrors({
    rating: currentScore,
    title: reviewTitle,
    description: reviewContent,
    name: customerName,
    email: customerEmail,
  });

  console.log("errors: ", errors);

  if (!!errors?.length) return;

  handleWriteAReview(data);
};

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function handleWriteAReviewErrors({ rating, title, description, name, email }) {
  const errors = [];

  const isValidEmail = validateEmail(email);

  document.getElementById("write-a-review-rating-label").style.color = !rating
    ? "#d36327"
    : "#b0aeaf";
  document.getElementById("write-a-review-title-input").style.border = !title
    ? "1.5px solid #d36327"
    : "1.5px solid #b0aeaf";
  document.getElementById("write-a-review-description-textarea").style.border =
    !description ? "1.5px solid #d36327" : "1.5px solid #b0aeaf";
  document.getElementById("write-a-review-name-input").style.border = !name
    ? "1.5px solid #d36327"
    : "1.5px solid #b0aeaf";
  document.getElementById("write-a-review-email-input").style.border =
    !!email && isValidEmail ? "1.5px solid #b0aeaf" : "1.5px solid #d36327";

  if (!rating) errors.push("rating");
  if (!title) errors.push("title");
  if (!description) errors.push("description");
  if (!name) errors.push("name");
  if (!email) errors.push("email");
  if (!isValidEmail) errors.push("invalid email");

  return errors;
}

const reviewAfterSubmitButton = document.getElementById(
  "review-after-submit-button",
);

reviewAfterSubmitButton.onclick = function () {
  window.location.href = "/";
};

const productReviewsSortButton = document.getElementById(
  "product-reviews-sort-button",
);

productReviewsSortButton.onclick = function () {
  const productReviewsSortDropdownElement = document.getElementById(
    "product-reviews-sort-dropdown",
  );
  const buttonImage = productReviewsSortButton.querySelector("img");

  const isDropdownOpen =
    productReviewsSortDropdownElement.style.display === "block";

  buttonImage.style.transform = isDropdownOpen
    ? "rotate(0)"
    : "rotate(3.142rad)";

  productReviewsSortDropdownElement.style.display = isDropdownOpen
    ? "none"
    : "block";
};

const productReviewsSortDropdownElement = document.getElementById(
  "product-reviews-sort-dropdown",
);

function resetSortDropdownBackgroundColors() {
  const dropdownItems =
    productReviewsSortDropdownElement.querySelectorAll("li");

  for (const item of dropdownItems) {
    item.style.backgroundColor = "#ffffff";
  }
}

function getSortValues(dataString) {
  if (dataString === "rating:low-to-high") {
    return {
      direction: "desc",
      sort: "rating",
    };
  }

  if (dataString === "rating:hight-to-low") {
    return {
      direction: "asc",
      sort: "rating",
    };
  }

  if (dataString === "all-content") {
    return {
      direction: "desc",
      sort: "rating",
    };
  }

  if (dataString === "most-recent") {
    return {
      direction: "desc",
      sort: "date",
    };
  }

  if (dataString === "most-helpful") {
    return {
      direction: "desc",
      sort: "votes_up",
    };
  }

  return {
    direction: "desc",
    sort: "rating",
  };
}

productReviewsSortDropdownElement.onclick = function (el) {
  const { target } = el;
  const { attributes } = target;
  const { value } = attributes;
  const { value: selectedValue } = value;

  resetSortDropdownBackgroundColors();

  // Set default to 'most recent' if no other value is provided
  const sortOption = selectedValue || 'most-recent';

  $("#product-reviews-sort-dropdown").data("value", sortOption);

  const selectedText = $(el.target).text();
  let displayText = '';

  if (selectedText === 'Rating, high to low') {
    displayText = 'Sort by: <span style="color: #352B27;">Rating, high to low</span>';
  } else if (selectedText === 'Rating, low to high') {
    displayText = 'Sort by: <span style="color: #352B27;">Rating, low to high</span>';
  } else {
    displayText = 'Sort by: <span style="color: #352B27;">Most Recent</span>';
  }

  const sortButtonSpan = $(el.target).parent("ul").siblings("#product-reviews-sort-button").children("span");
  sortButtonSpan.html(displayText);

  $(el.target).parent("ul").siblings("#product-reviews-sort-button").children("img").css("transform", "rotate(0)");

  target.style.backgroundColor = "#F3F2F2";

  const sortValues = getSortValues(sortOption);

  initializeReviewItems({
    direction: sortValues.direction,
    sort: sortValues.sort,
  });

  this.style.display = "none";
};

// Initialize with most recent by default on page load
$(document).ready(function() {
  const defaultSortOption = 'most-recent';

  $("#product-reviews-sort-dropdown").data("value", defaultSortOption);

  const defaultSortValues = getSortValues(defaultSortOption);

  initializeReviewItems({
    direction: defaultSortValues.direction,
    sort: defaultSortValues.sort,
  });

  const sortButtonSpan = $("#product-reviews-sort-button").children("span");
  sortButtonSpan.html('Sort by: <span style="color: #352B27;">Most Recent</span>');
});

const reviewFilterContainerElement = document.getElementById(
  "review-filter-container",
);

const closeReviewFilterButton = document.getElementById(
  "close-review-filter-button",
);

closeReviewFilterButton.onclick = function () {
  reviewFilterContainerElement.style.display = "none";
};

const productReviewFilterButton = document.getElementById(
  "product-reviews-filter-button",
);

productReviewFilterButton.onclick = function () {
  reviewFilterContainerElement.style.display = "block";
};

const reviewFilterRatingSelectElement = document.getElementById(
  "review-filter-rating-select",
);

const reviewFilterRatingSelectItems =
  reviewFilterRatingSelectElement.querySelectorAll(
    ".review-filter-select-item",
  );

function resetFilterSelect(selectItems) {
  for (const item of selectItems) {
    const checkbox = item.querySelector("#review-filter-select-checkbox");
    checkbox.classList.remove("selected");
  }
}

function handleFilterSelectValues(el, selectItem) {
  const { target } = el;
  const item = target.parentNode;
  const { attributes } = item;
  const { value } = attributes;

  if (value) {
    const { value: selectedValue } = value;

    resetFilterSelect(selectItem);

    const checkbox = item.querySelector("#review-filter-select-checkbox");
    checkbox.classList.add("selected");

    return selectedValue;
  }

  return null;
}

const reviewFilterReviewWrapper = document.getElementById(
  "review-filter-review-wrapper",
);

const filterReviewsSelectItems = reviewFilterReviewWrapper.querySelectorAll(
  ".review-filter-select-item",
);

reviewFilterRatingSelectElement.onclick = function (el) {
  handleFilterSelectValues(el, reviewFilterRatingSelectItems);
};

reviewFilterReviewWrapper.onclick = function (el) {
  handleFilterSelectValues(el, filterReviewsSelectItems);
};

const filterClearButton = document.getElementById("review-filter-clear-button");

filterClearButton.onclick = function () {
  resetFilterSelect(reviewFilterRatingSelectItems);
  resetFilterSelect(filterReviewsSelectItems);

  const ratingAllSelectElement = reviewFilterRatingSelectItems.item(0);
  const ratingAllSelectCheckboxElement = ratingAllSelectElement.querySelector(
    "#review-filter-select-checkbox",
  );
  ratingAllSelectCheckboxElement.classList.add("selected");

  const reviewsAllSelectElement = filterReviewsSelectItems.item(0);
  const reviewsAllSelectCheckboxElement = reviewsAllSelectElement.querySelector(
    "#review-filter-select-checkbox",
  );
  reviewsAllSelectCheckboxElement.classList.add("selected");
};

const filterApplyButton = document.getElementById("review-filter-apply-button");

function findFilterSelectedValue(selectItems) {
  const filterRatingSelect = Array.from(selectItems);

  const [selectedRatingFilterItem] = filterRatingSelect.filter((el) => {
    const checkbox = el.querySelector("#review-filter-select-checkbox");

    if (Array.from(checkbox.classList).includes("selected")) {
      return true;
    }
  });

  return selectedRatingFilterItem?.attributes?.value?.value ?? "";
}

filterApplyButton.onclick = function () {
  
  const sortValues = getSortValues($("#product-reviews-sort-dropdown").data("value"));

  const filterRatingsSelectedValue = findFilterSelectedValue(
    reviewFilterRatingSelectItems,
  );

  reviewFilterContainerElement.style.display = "none";

  const star =
    filterRatingsSelectedValue === "all"
      ? undefined
      : +filterRatingsSelectedValue;
  
  const pictured = $(".review-filter-review-wrapper .review-filter-select-item:has(div.selected)").attr("value") === "with-images-and-videos" ? true : false
  
  initializeReviewItems({ 
    page: 1, 
    direction: sortValues.direction,
    sort: sortValues.sort,
    star, 
    pictured 
  });
};

// Event Listeners
$("#product-reviews-filter-dropdowns-rating").click(function(){
  $(".product-reviews-filter-dropdowns > div > button").not(this).removeClass("active")
  $(this).toggleClass("active")
})
$("#product-reviews-filter-dropdowns-all-reviews").click(function(){
  $(".product-reviews-filter-dropdowns > div > button").not(this).removeClass("active")
  $(this).toggleClass("active")
})
$("#product-reviews-filter-dropdowns-clear").click(function(){
  // $(this).hide()
  // $(".product-reviews-filter-wrapper").hide();
  $(".product-reviews-filter-dropdowns > div > ul > li").removeClass("active")
  $(".product-reviews-filter-dropdowns > div > ul > li[data-value=all-reviews]").addClass("active")
  $("#product-reviews-filter-dropdowns-rating").removeData("value")
  $("#product-reviews-filter-dropdowns-all-reviews").removeData("value")
  $("#product-reviews-filter-dropdowns-all-reviews > span").text($("#product-reviews-filter-dropdowns-all-reviews + ul > li:first-child").text())
  $("#product-reviews-filter-dropdowns-rating > span").text("All ratings")
  resetPaginationButtonColors();
  initializeReviewItems({})
})
$(".product-reviews-filter-dropdowns > div > ul > li").click(function(){
  $(this).parent("ul").prev().data("value", $(this).data("value"))
  $(this).parent("ul").prev().removeClass("active")
  $(this).parent("ul").children("li").removeClass("active")
  $(this).parent("ul").siblings("#product-reviews-filter-dropdowns-all-reviews").children("span").text($(this).text())
  $(this).parent("ul").siblings("#product-reviews-filter-dropdowns-rating").children("span").html($(this).html())
  $(this).addClass("active")
  const {star, pictured, sort, direction} = getFilterAndSortValuesDesktop()
  if(isFiltered){
    $("#product-reviews-filter-dropdowns-clear").show()
  }else{
    $("#product-reviews-filter-dropdowns-clear").hide()
  }
  initializeReviewItems({ star, pictured, sort, direction })
})

function isFiltered(){
   const valuesMobile = getFilterAndSortValues()
   const valuesDesktop = getFilterAndSortValuesDesktop()
   if(valuesMobile.pictured || valuesMobile.star || valuesDesktop.pictured || valuesDesktop.pictured) return true
   return false
}

function getFilterAndSortValues() {
  const sortValues = getSortValues($("#product-reviews-sort-dropdown").data("value"));

  const filterRatingsSelectedValue = findFilterSelectedValue(reviewFilterRatingSelectItems);

  const star = filterRatingsSelectedValue === "all-reviews" ? null : +filterRatingsSelectedValue;

  const pictured = $(".review-filter-review-wrapper .review-filter-select-item:has(div.selected)").attr("value") === "with-images-and-videos" ? true 
                 : $(".review-filter-review-wrapper .review-filter-select-item:has(div.selected)").attr("value") === "text-reviews" ? false 
                 : null;
 
  return {
    star,
    pictured,
    sort: sortValues.sort,
    direction: sortValues.direction
  };
}

function getFilterAndSortValuesDesktop() {
  const sortValues = getSortValues($("#product-reviews-sort-dropdown").data("value"));

  const star = $("#product-reviews-filter-dropdowns-rating").data("value") === "all-reviews" ? null : $("#product-reviews-filter-dropdowns-rating").data("value");

  const pictured = $("#product-reviews-filter-dropdowns-all-reviews").data("value") === "with-images-and-videos" ? true 
                 : $("#product-reviews-filter-dropdowns-all-reviews").data("value") === "text-reviews" ? false 
                 : null;
 
  return {
    star,
    pictured,
    sort: sortValues.sort,
    direction: sortValues.direction
  };
}

// Scroll to reviews on click
$("#product-information-reviews").click(function(){
  $('html, body').animate({
    scrollTop: $("#product-reviews-container").offset().top - 100
  }, 100)
})