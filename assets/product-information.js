const productInfoReviewStarContainer = document.getElementById(
  "product-information-review-stars",
);

async function getProductReviews(productId) {
  try {
    let url = `https://api-cdn.yotpo.com/v1/widget/dnGeaU8oseqC9z4WBEDYoZAWrjMbpQRCp42vUZ4B/products/${productId}/reviews.json`;

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
      initProductInfoReviews(data?.bottomline ?? {});
      renderProductInfoStars(Math.round(data?.bottomline?.average_score) ?? 0);
    } else {
      console.error("error: ", status.message);
      return {};
    }
  } catch (error) {
    console.error("error:" + error);
    return {};
  }
}

function initProductInfoReviews(data) {
  const { average_score, total_review } = data;

  if (!total_review) {
    const infoText = document.getElementById("product-info-review-text");
    infoText.innerText = "0 Reviews";
    productInfoReviewStarContainer.style.margin = "0";

    return;
  }

  const ratingElement = document.querySelector(
    ".product-information-review-info #rating",
  );
  const numOfReviewsElement = document.querySelector(
    ".product-information-review-info #num-of-reviews",
  );

  ratingElement.innerHTML = Number(average_score).toFixed(1);
  numOfReviewsElement.innerHTML = total_review;
}

function renderProductInfoStars(starCount) {
  productInfoReviewStarContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const starImageElement = document.createElement("img");
    starImageElement.setAttribute("loading", "lazy");

    if (!starCount) {
      return;
    }

    const hasStarCountEnded = starCount - 1 < i;

    starImageElement.src = hasStarCountEnded
      ? "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/Star_5.svg?v=1666143946"
      : "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/review-star.svg?v=1664876201";

    productInfoReviewStarContainer.append(starImageElement);
  }
}

const productInformationReviewsElement = document.getElementById(
  "product-information-reviews",
);

getProductReviews(productInformationReviewsElement?.dataset?.productId ?? "");

const frameSizeMoreDetailElements = document.getElementsByClassName(
  "frame-size-more-details",
);

for (const frameSizeMoreDetailElement of frameSizeMoreDetailElements) {
  const moreDetailsTextList = frameSizeMoreDetailElement.innerHTML.split("-");

  frameSizeMoreDetailElement.innerHTML = "";

  moreDetailsTextList.shift();

  for (const detail of moreDetailsTextList) {
    const detailElement = document.createElement("p");
    detailElement.insertAdjacentHTML("beforeend", detail);

    frameSizeMoreDetailElement.append(detailElement);
  }
}
