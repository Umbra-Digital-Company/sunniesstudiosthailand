function reloadMiniCartAjax(){
  const cartDrawer = $('.cart-drawer');
  const miniCartBodyContainer = $('.js-cart-drawer-container');
  
  // Rerender mini cart
  cartDrawer.addClass('expanded loading-icon');
  
  jQuery.get(window.Shopify.routes.root + 'cart')
    .done(function(res){
      const output = $($.parseHTML(res)).find(".js-cart-drawer-ajax").html();
      miniCartBodyContainer.html(output);
      cartDrawer.removeClass('loading-icon');
    })

  // Update free shipping prodgress bar
  jQuery.get(window.Shopify.routes.root + 'cart.js')
    .done(function(res){
      const data = JSON.parse(res);
      const freeShippingThreshold = 100
      const subtotal = data.items_subtotal_price / 100;
      const percentageToBeFreeShipping = 100 * subtotal / freeShippingThreshold;
      const itemCount = data.item_count;
      let isQualifiedFreeShipping = subtotal >= freeShippingThreshold;
      
      let progressBarLabel = "Add $" + (freeShippingThreshold - subtotal) + " more to get free shipping";
      
      if (isQualifiedFreeShipping) {
          progressBarLabel = "Congrats! You get free shipping ✨";
      }
      $('.cart-progress').css('display', 'block');
      $('.cart-progress-status').text(progressBarLabel);
      $('.cart-progress-bar__filled').css('width', `${percentageToBeFreeShipping}%`);

      // Update cart btn counter
      $('.btn-cart__counter').text(itemCount);
    });
}

function initializeGenericSwiper() {
  new Swiper(".generic-swiper", {
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
      el: ".generic-swiper-pagination",
      clickable: true,
    },
    on: {
      init: function () {
        const genericSwiper = document.getElementsByClassName("generic-swiper");

        for (swiper of genericSwiper) {
          swiper.style.display = "block";
        }
      },
    },
  });
}

initializeGenericSwiper();

// function addMiniProduct(id) {
//   console.log("id: ", id);
//   const addData = {
//     items: [
//       {
//         id: id,
//         quantity: 1,
//       },
//     ],
//   };

//   fetch("/cart/add.js", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(addData),
//   })
//     .then(async (res) => {
//       if (res.status === 200) {
//         window.location.reload();
//       }
//     })
//     .catch((err) => console.error(err));
// }

function addMiniProduct(id, type = null, e) {
  const button = $(e.currentTarget )
  
  button.addClass("loading")
  
  let setData;
  if (type !== null) {
    setData = {
      items: [
        {
          id: id,
          quantity: 1,
          properties: {
            _item_type: type
          }
        },
      ],
    };
  } else {
    setData = {
      items: [
        {
          id: id,
          quantity: 1,
        },
      ],
    };
  }

  const addData = setData;

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addData),
  })
    .then((res) => {
      if (res.status === 200) {
        reloadMiniCartAjax();
      }
      button.removeClass("loading")
      button.addClass("success")
      setTimeout(()=>{
         button.removeClass("success")
      },2000)
    })
    .catch((err) => {
      console.error(err)
      button.removeClass("loading")
    });
}

// remove to cart -- pwp
function removePWP(id) {

  const removeData = {
    id: id,
    quantity: 0,
  };

  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(removeData),
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload(true);
      }
    })
    .catch((err) => console.error(err));
}
// End - remove to cart -- pwp

// Move callout popup
$(document).ready(function() {
  $("body").on('DOMSubtreeModified', ".cart-drawer", function() {
    if ($('.temp-modal').length) {
      $('.cloned-modal').remove();
      $('#dcd-modal').appendTo('body').attr('class', 'cloned-modal');
      $('.temp-modal').remove();
    }
  });
})