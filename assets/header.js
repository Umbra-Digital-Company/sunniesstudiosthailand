let currentExpirationTimestamp = localStorage.getItem("hideTopBarNotification");

const currentExpirationDate = new Date(+currentExpirationTimestamp);

function isToday(date) {
  const today = new Date();
  return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
}

if (isToday(currentExpirationDate)) {
  localStorage.removeItem("hideTopBarNotification");
}

if (currentExpirationTimestamp) {
  $("#top-bar-container").css({ display: "none" });

  document.body.classList.remove("has-top-bar");
}

$(window).on("scroll", function (evt) {
  const scrollY = evt.currentTarget.scrollY;

  if (!currentExpirationTimestamp) {
    if (scrollY >= 1) {
      $("#top-bar-container").slideUp();
    } else {
      $("#top-bar-container").slideDown();
    }
  }
});

function handleTopBarClose() {
  $("#top-bar-container").css({ display: "none" });
  const date = new Date();
  const expirationDate = date.setDate(date.getDate() + 3);
  localStorage.setItem("hideTopBarNotification", expirationDate);
  currentExpirationTimestamp = true;
}

const topBars = $("#top-bar-container").children();
let currentIndex = 0;

try {

  topBars[0].style.display = "flex";


  setInterval(function () {
    const newIndex = (topBars[3] == null) ? currentIndex % 3 : currentIndex % 4;

    topBars[0].style.display = "none";
    topBars[1].style.display = "none";
    topBars[2].style.display = "none";
    if (topBars[3] != null) {
      topBars[3].style.display = "none";
    }

    topBars[newIndex].style.display = "flex";

    currentIndex += 1;
  }, 7000);



  // script for popup trigger
  if (document.querySelector('.klaviyo_form_trigger')) {
    document.querySelector('.klaviyo_form_trigger').addEventListener('click', function () {
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', 'QTrVxC']);
    });
  }
} catch (error) {

}

document.querySelectorAll('.custom-accordion-tab > input.menu-group-').forEach(function (submenu_tab) {
  submenu_tab.addEventListener('change', function () {
    document.querySelector('body').classList.add('open-submenu');
  });
});

document.querySelectorAll('.submenu_back').forEach(function (submenu_back) {
  submenu_back.addEventListener('click', function () {
    removeSubmenuClass();
  });
});
document.querySelectorAll('.close-submenu-container').forEach(function (submenu_back) {
  submenu_back.addEventListener('click', function () {
    removeSubmenuClass();
  });
});
document.querySelector('.close-menu-container > svg').addEventListener('click', function () {
  removeSubmenuClass();
  document.querySelector('body').classList.remove('expand-search', 'search-mobile-is-active', 'bc-sf-search-suggestion-mobile-open');
});



function removeSubmenuClass() {
  setTimeout(function () {
    document.querySelector('body').classList.remove('open-submenu');
    document.querySelector('body').classList.remove('bc-sf-search-suggestion-mobile-open');
  }, 400);
}

document.addEventListener('mouseover', function (e) {
  if (e.target.closest('.account-dropdown__toggle') || e.target.closest('.nav--mega .gm-submenu-mega')) {
    document.querySelector('body').classList.remove('expand-search');
  }
});

let searchContainer = document.querySelector('.search-container.js-search-container');

document.addEventListener('click', function (e) {
  if (window.innerWidth > 767) {
    if (!e.target.closest('#shopify-section-header') && !e.target.closest('.bc-sf-search-suggestion-wrapper')) {
      document.querySelector('body').classList.remove('expand-search');
    }
  }
});
