// Price
let totalPrice = 0;
const bundlePrice = 35;
const loopPrice = 10;
const bottlePrice = 25;
const capPrice = 15;
const bootPrice = 10;

const totalPriceText = document.querySelector('.flask-price');
const originalPriceText = document.querySelector('.original-price');

let bottleIsAvailable = true;
let capIsAvailable = true;
let loopIsAvailable = true;
let bootIsAvailable = true;
let engravingIsValid = true;

// Function to check if a URL parameter exists
function checkUrlParameter(parameterName, url) {
  // Get the query string from the URL
  var queryString = url.split('?')[1];

  if (!queryString) {
    return false;
  }

  var parameters = queryString.split('&');

  for (var i = 0; i < parameters.length; i++) {
    var parameter = parameters[i].split('=');
    if (parameter[0] === parameterName) {
      return true;
    }
  }

  return false;
}

let url = location.href;

let capExists = checkUrlParameter("cap", url);
let loopExists = checkUrlParameter("loop", url);
let bottleExists = checkUrlParameter("bottle", url);
let bootExists = checkUrlParameter("boot", url);
let sourceExists = checkUrlParameter("source", url);

// Function to get the value of a URL parameter
function getUrlParameterValue(parameterName, url) {
  var queryString = url.split('?')[1];

  if (!queryString) {
    return null;
  }

  var parameters = queryString.split('&');

  for (var i = 0; i < parameters.length; i++) {
    var parameter = parameters[i].split('=');
    if (parameter[0] === parameterName) {
      // Decode the parameter value and return it
      return decodeURIComponent(parameter[1]).toLowerCase();
    }
  }

  return null;
}

// Get the values of the parameters
var capValue = getUrlParameterValue("cap", url);
var loopValue = getUrlParameterValue("loop", url);
var bottleValue = getUrlParameterValue("bottle", url);
var bootValue = getUrlParameterValue("boot", url);
var sourceValue = getUrlParameterValue("source", url);

let withLoop = true;
let withBoot = false;
let animationSpeed = 300;

const closeFlaskBtn = document.querySelector('.preview-close svg');
closeFlaskBtn.addEventListener('click', function (params) {
  customizationMain.classList.remove('show');
});

const customizeMainBtn = document.querySelector('.customize-flask-button');
const customizeMainBtnMobile = document.querySelector('.customize-flask-button.mobile');
customizeMainBtn.addEventListener('click', function (e) {
  if (customizeMainBtn.getAttribute('disabled') == null) {
    customizationMain.classList.add('show');
    try {
      localStorage.getItem('flaskOnboarding') ? document.querySelector('.onboarding-section').classList.add('hidden') : document.querySelector('.onboarding--step-1.active .ocm--video').play();
    } catch (error) { }
    updatePricing();
  }
});
customizeMainBtnMobile.addEventListener('click', function (e) {
  if (customizeMainBtnMobile.getAttribute('disabled') == null) {
    customizationMain.classList.add('show');
    try {
      localStorage.getItem('flaskOnboarding') ? document.querySelector('.onboarding-section').classList.add('hidden') : document.querySelector('.onboarding--step-1.active .ocm--video').play();
    } catch (error) { }
    updatePricing();
  }
});

const addToBag = document.querySelector('.add-flask');
addToBag.addEventListener('click', function () {
  if(window.innerWidth > 899){
    popupCheckout.classList.add('show');
    customizationMain.scrollTop = -99999;
    bottleBundleVariantID.length > 1 ? popupBottleImage.classList.remove('hidden') : popupBottleImage.classList.add('hidden');
    capBundleVariantID.length > 1 ? popupCapImage.classList.remove('hidden') : popupCapImage.classList.add('hidden');
    loopBundleVariantID.length > 1 ? popupLoopImage.classList.remove('hidden') : popupLoopImage.classList.add('hidden');
    bootVariantID.length > 1 ? popupBootImage.classList.remove('hidden') : popupBootImage.classList.add('hidden');
    engravingValue.length > 1 ? '' : (engravingPlacement = '', engravingColor = '');
  }else{
    if(bottleIsAvailable && bootIsAvailable && loopIsAvailable && capIsAvailable && engravingIsValid){
      popupCheckout.classList.add('show');
      customizationMain.scrollTop = -99999;
      bottleBundleVariantID.length > 1 ? popupBottleImage.classList.remove('hidden') : popupBottleImage.classList.add('hidden');
      capBundleVariantID.length > 1 ? popupCapImage.classList.remove('hidden') : popupCapImage.classList.add('hidden');
      loopBundleVariantID.length > 1 ? popupLoopImage.classList.remove('hidden') : popupLoopImage.classList.add('hidden');
      bootVariantID.length > 1 ? popupBootImage.classList.remove('hidden') : popupBootImage.classList.add('hidden');
      engravingValue.length > 1 ? '' : (engravingPlacement = '', engravingColor = '');
    }
    else{
      checkoutOOS();
    }
  }
});

const customizationMain = document.querySelector('.flask-customization-main');


const changeEvent = new Event('change');

// elements for bottle section
const bottleRadios = document.querySelectorAll('.bottle-section input[type="radio"]');
const bottleRadiosMobile = document.querySelectorAll('.bottle-section-mobile input[type="radio"]');
const bottleColorTextClassic = document.querySelector('#bottle-color-text-classic');
const bottleColorTextLimited = document.querySelector('#bottle-color-text-limited');
const bottleColorTextClassicMobile = document.querySelector('.summary-mobile #bottle-color-text-classic');
const bottleColorTextLimitedMobile = document.querySelector('.summary-mobile #bottle-color-text-limited');
bottleRadios[0].checked = true;
bottleRadiosMobile[0].checked = true;

window.addEventListener('load', function () {
  if (!capExists || !loopExists || !bottleExists || !bootExists) {
    bottleRadios[0].dispatchEvent(changeEvent);
    bottleRadiosMobile[0].dispatchEvent(changeEvent);

  } else {
    document.querySelector('body').classList.remove('hide');
  }
  customizeMainBtn.removeAttribute('disabled');
  customizeMainBtnMobile.removeAttribute('disabled');
})


// elements for cap section
const capRadios = document.querySelectorAll('.cap-section input[type="radio"]');
const capRadiosMobile = document.querySelectorAll('.cap-section-mobile input[type="radio"]');
const capColorTextClassic = document.querySelector('#cap-color-text-classic');
const capColorTextLimited = document.querySelector('#cap-color-text-limited');
const capColorTextClassicMobile = document.querySelector('.summary-mobile #cap-color-text-classic');
const capColorTextLimitedMobile = document.querySelector('.summary-mobile #cap-color-text-limited');

// elements for loop section
const loopSection = document.querySelector('.loop-section');
const loopRadios = document.querySelectorAll('.loop-section input[type="radio"]');
const loopRadiosMobile = document.querySelectorAll('.loop-section-mobile input[type="radio"]');
const loopColorTextClassic = document.querySelector('#loop-color-text-classic');
const loopColorTextLimited = document.querySelector('#loop-color-text-limited');
const loopColorTextClassicMobile = document.querySelector('.summary-mobile #loop-color-text-classic');
const loopColorTextLimitedMobile = document.querySelector('.summary-mobile #loop-color-text-limited');
const loopChoices = document.querySelector('.loop-choices');
const loopChoicesMobile = document.querySelector('.summary-mobile .loop-choices');
const loopColorSection = document.querySelector('.loop-section .color-section');
const loopColorSectionMobile = document.querySelector('.summary-mobile .loop-section-mobile .color-section');


// elements for boot section
const bootSection = document.querySelector('.boot-section');
const bootRadios = document.querySelectorAll('.boot-section input[type="radio"]');
const bootRadiosMobile = document.querySelectorAll('.boot-section-mobile input[type="radio"]');
const bootColorTextClassic = document.querySelector('#boot-color-text-classic');
const bootColorTextLimited = document.querySelector('#boot-color-text-limited');
const bootColorTextClassicMobile = document.querySelector('.summary-mobile #boot-color-text-classic');
const bootColorTextLimitedMobile = document.querySelector('.summary-mobile #boot-color-text-limited');
const bootChoices = document.querySelector('.boot-choices');
const bootChoicesMobile = document.querySelector('.summary-mobile .boot-choices');
const bootColorSection = document.querySelector('.boot-section .color-section');
const bootColorSectionMobile = document.querySelector('.summary-mobile .boot-section-mobile .color-section');

// elements for mobile tabs
const mobileTabs = document.querySelectorAll('.summary-mobile-tab');
const summaryContentMobile = document.querySelectorAll('.summary-content-mobile');

// summary sections
const summaryContent = document.querySelectorAll('.summary-content');
const summaryBottleSection = document.querySelector('.summary-content.bottle-section');
const summaryBootSection = document.querySelector('.summary-content.boot-section');
const summaryCapSection = document.querySelector('.summary-content.cap-section');
const summaryLoopSection = document.querySelector('.summary-content.loop-section');
const summaryEngravingSection = document.querySelector('.summary-content.engraving-section');
const engravingInput = document.querySelector('#engraving');
const engravingInputMobile = document.querySelector('.summary-mobile #engraving');
const engravingPlacementDesktop = document.querySelectorAll('.summary-desktop .desktop-summary-placement');

const summaryBottleSectionMobile = document.querySelector('.bottle-section-mobile');
const summaryBootSectionMobile = document.querySelector('.boot-section-mobile');
const summaryCapSectionMobile = document.querySelector('.cap-section-mobile');
const summaryLoopSectionMobile = document.querySelector('.loop-section-mobile');
const summaryEngravingSectionMobile = document.querySelector('.engraving-section-mobile');
const engravingPlacementMobile = document.querySelectorAll('.summary-mobile .mobile-summary-placement');

const previewSections = document.querySelectorAll('.preview-components');
const bottlePreview = document.querySelector('.bottle-preview');
const capPreview = document.querySelector('.cap-preview');
const loopPreview = document.querySelector('.loop-preview');
const bootPreview = document.querySelector('.boot-preview');

// preview main images
const swipeElement = document.querySelector('.preview-main .content');
const previewMainImage = document.querySelectorAll('.preview-main-image');
const bottleImage = document.querySelector('.preview-image-containers .bottle-image');
const capImage = document.querySelector('.preview-image-containers .cap-image');
const loopImage = document.querySelector('.preview-image-containers .loop-image');
const bootImage = document.querySelector('.preview-image-containers .boot-image');

// popup images

const popupCheckout = document.querySelector('.preview-popup');
const popupCapImage = document.querySelector('.popup-image-cap');
const popupBottleImage = document.querySelector('.popup-image-bottle');
const popupLoopImage = document.querySelector('.popup-image-loop');
const popupBootImage = document.querySelector('.popup-image-boot');
const popupButtonEdit = document.querySelectorAll('.popup-button-edit');

const mainRadios = document.querySelectorAll('.flask-swatch');
const variantNameClassic = document.querySelector('.variant-name p.color-text-classic');
const variantNameLimited = document.querySelector('.variant-name p.color-text-limited');
const previewEngraving = document.querySelector('.bottle-hover');
const popupEngraving = document.querySelector('.popup-engraving');


// const randomColors = [
//   {
//     "cap": "ikura",
//     "loop": "guac",
//     "bottle": "pina"
//   },
//   {
//     "cap": "mochi",
//     "loop": "pomodoro",
//     "bottle": "buttermilk"
//   },
//   {
//     "cap": "pina",
//     "loop": "macchiato",
//     "bottle": "keylime"
//   },
//   {
//     "cap": "macchiato",
//     "loop": "mochi",
//     "bottle": "wasabi"
//   },
//   {
//     "cap": "miso",
//     "loop": "buttermilk",
//     "bottle": "guac"
//   },
//   {
//     "cap": "guac",
//     "loop": "creamsicle",
//     "bottle": "macchiato"
//   },
//   {
//     "cap": "pomodoro",
//     "loop": "dough",
//     "bottle": "mochi"
//   },
//   {
//     "cap": "dough",
//     "loop": "pina",
//     "bottle": "ikura"
//   },
//   {
//     "cap": "wasabi",
//     "loop": "slush",
//     "bottle": "taro"
//   },
//   {
//     "cap": "creamsicle",
//     "loop": "burrata",
//     "bottle": "snow cone"
//   },
//   {
//     "cap": "slush",
//     "loop": "burrata",
//     "bottle": "chrome"
//   },
//   {
//     "cap": "chia",
//     "loop": "burrata",
//     "bottle": "oyster"
//   },
//   {
//     "cap": "mochi",
//     "loop": "dough",
//     "bottle": "snow cone",
//     "boot": "mochi"
//   },
//   {
//     "cap": "dough",
//     "loop": "miso",
//     "bottle": "mochi"
//   },
//   {
//     "cap": "pomodoro",
//     "loop": "mochi",
//     "bottle": "ganache"
//   },
//   {
//     "cap": "pina",
//     "loop": "blueberry",
//     "bottle": "snow cone",
//     "boot": "burrata"
//   },
//   {
//     "cap": "taro",
//     "loop": "burrata",
//     "bottle": "key lime",
//     "boot": "taro"
//   },
//   {
//     "cap": "guac",
//     "loop": "mochi",
//     "bottle": "macchiato"
//   },
//   {
//     "cap": "creamsicle",
//     "loop": "nori",
//     "bottle": "wasabi",
//     "boot": "macchiato"
//   },
//   {
//     "cap": "pina",
//     "loop": "guac",
//     "bottle": "buttermilk"
//   },
//   {
//     "cap": "pina",
//     "loop": "mochi",
//     "bottle": "miso",
//     "boot": "pina"
//   },
//   {
//     "cap": "punch",
//     "loop": "creamsicle",
//     "bottle": "ikura"
//   }
// ]
const randomize = document.querySelector('#randomize-button');

const sliderNavButtons = document.querySelectorAll('.slider-nav');

const capNext = document.querySelector('.cap-next');
const capPrevious = document.querySelector('.cap-previous');

const bottleNext = document.querySelector('.bottle-next');
const bottlePrevious = document.querySelector('.bottle-previous');

const loopNext = document.querySelector('.loop-next');
const loopPrevious = document.querySelector('.loop-previous');

const bootNext = document.querySelector('.boot-next');
const bootPrevious = document.querySelector('.boot-previous');

// form inputs
const mainBundle = document.querySelector('#main-bundle');
const bottleComponent = document.querySelector('#bottle-component');
const capComponent = document.querySelector('#cap-component');
const loopComponent = document.querySelector('#loop-component');
const bootComponent = document.querySelector('#boot-component');
const engravingComponent = document.querySelector('#engraving-component');
const productForm = document.querySelector('product-form-kit form button');

window.addEventListener('load', function () {
  // customizationMain.classList.add('show');
  // customizationMain.classList.remove('show');
  mainRadios[0].checked = true;
  mainRadios[0].dataset.color_type == 'classic' 
  ? variantNameClassic.innerText = ' ' + mainRadios[0].id
  : variantNameLimited.innerText = ' ' + mainRadios[0].id
  // variantNameClassic.innerText = mainRadios[0].id;
})

mainRadios.forEach(function (r) {
  r.addEventListener('click', function (e) {
    animationSpeed = 0;
    checkRadioButtonWithValue(r.dataset.color);
    if (r.dataset.color_type === 'limited') {
      variantNameLimited.innerText = '' + r.id;
      variantNameClassic.innerText = '';
    } else {
      variantNameLimited.innerText = '';
      variantNameClassic.innerText = '' + r.id;
    }
    document.querySelectorAll('#vto-image-wrapper img.swiper-slide').forEach(el => { el.classList.remove('show') });
    document.querySelectorAll('#vto-image-wrapper img.swiper-slide').forEach(el => { el.dataset.variant == r.dataset.color ? el.classList.add('show') : '' });
    animationSpeed = 300;
    fetchFlaskDetails(r.dataset.url);
  });
});

function mainRadioFunctions() {

}

engravingInput.addEventListener('input', function () {
  previewEngraving.innerText = engravingInput.value;
  popupEngraving.innerText = engravingInput.value;
  engravingInputMobile.value = engravingInput.value;
  engravingValue = engravingInput.value;
});

engravingInputMobile.addEventListener('input', function () {
  previewEngraving.innerText = engravingInputMobile.value;
  popupEngraving.innerText = engravingInputMobile.value;
  engravingInput.value = engravingInputMobile.value;
  engravingValue = engravingInputMobile.value;
});

// previewEngraving
// popupEngraving

engravingPlacementDesktop.forEach(p => {
  p.addEventListener('change', function () {
    if (p.id == 'top-placement') {
      updatePlacement('top', 'Top');
    } else if (p.id == 'middle-placement') {
      updatePlacement('middle', 'Middle');
    } else {
      updatePlacement('bottom', 'Bottom');
    }
  });
})

engravingPlacementMobile.forEach(p => {
  p.addEventListener('change', function () {
    if (p.id == 'top-placement-mobile') {
      updatePlacement('top', 'Top');
    } else if (p.id == 'middle-placement-mobile') {
      updatePlacement('middle', 'Middle');
    } else {
      updatePlacement('bottom', 'Bottom');
    }
  });
})

function updatePlacement(placement, text) {
  popupEngraving.setAttribute('placement', placement);
  previewEngraving.setAttribute('placement', placement);
  document.querySelectorAll('#engraving-placement-text').forEach(ept => {
    ept.innerText = placement;
  });
  engravingPlacement = placement;
}

// Click event listener for opening summary sections
summaryContent.forEach(function (element) {
  element.addEventListener('click', function (event) {

    if (isOutsideOptions(event.target)) {
      sliderNavButtons.forEach(function (nav) {
        nav.classList.remove('active');
        nav.classList.remove('hidden');
      })

      summaryContent.forEach(function (e) {
        e.classList.remove('active');
      });

      if (element.getAttribute('data-filled') === 'empty') {
        if (element.querySelectorAll('input[type="radio"]')[0]) {
          if (!element.closest('.boot-section')) {
            element.setAttribute('data-filled', 'filled');
            element.querySelectorAll('input[type="radio"]')[0].checked = true;
            element.querySelectorAll('input[type="radio"]')[0].dispatchEvent(changeEvent);
          }
        } else {
          if (event.target.closest('.engraving-section')) {
            element.setAttribute('data-filled', 'filled');
          }
        }
      }


      previewSections.forEach(function (ps) {
        ps.classList.remove('active');
      })

      previewMainImage.forEach(function (pmi) {
        pmi.classList.remove('active')
      })

      if (element.closest('.bottle-section')) {
        bottleShowPreview();
      }
      else if (element.closest('.cap-section')) {
        capShowPreview();
      }
      else if (element.closest('.boot-section')) {
        bootShowPreview();
      }
      else if (element.closest('.loop-section')) {
        loopShowPreview();
      }

      // Toggle the 'active' class only if the above conditions are met
      element.classList.toggle('active');
    }
    updatePricing();
  });
});

// event listener for mobile tabs
mobileTabs.forEach(function (tab) {
  tab.addEventListener('change', function (t) {

    sliderNavButtons.forEach(function (nav) {
      nav.classList.remove('active');
    })

    summaryContentMobile.forEach(function (mobileContent) {
      mobileContent.classList.remove('active');
    });

    previewSections.forEach(function (ps) {
      ps.classList.remove('active');
    });

    previewMainImage.forEach(function (pmi) {
      pmi.classList.remove('active')
    });

    if (t.target.id == "bottle-tab") {
      summaryBottleSectionMobile.classList.add('active');
      bottleShowPreview();
      summaryBottleSection.setAttribute('data-filled', 'filled');
    }
    else if (t.target.id == "cap-tab") {
      summaryCapSectionMobile.classList.add('active');
      capShowPreview();
      summaryCapSection.setAttribute('data-filled', 'filled');
    }
    else if (t.target.id == "loop-tab") {
      summaryLoopSectionMobile.classList.add('active');
      loopShowPreview();
      summaryLoopSection.setAttribute('data-filled', 'filled');
    }
    else if (t.target.id == "boot-tab") {
      summaryBootSectionMobile.classList.add('active');
      bootShowPreview();
      summaryBootSection.setAttribute('data-filled', 'filled');
    }
    else if (t.target.id == "engraving-tab") {
      summaryEngravingSectionMobile.classList.add('active');
      summaryEngravingSection.classList.add('active');
      summaryEngravingSection.setAttribute('data-filled', 'filled');
      engravingPlacement == '' ? (engravingPlacementMobile[0].checked = true, engravingPlacementMobile[0].dispatchEvent(changeEvent) ) : '';
    }
  })
});

function bottleShowPreview() {
  bottlePreview.classList.add('active');
  bottleImage.parentElement.classList.add('active');
  bottlePreview.setAttribute('data-filled', 'filled');
  bottleNext.classList.add('active');
  bottlePrevious.classList.add('active');
  bottleNext.classList.remove('hidden');
  bottlePrevious.classList.remove('hidden');
}
function capShowPreview() {
  capPreview.classList.add('active');
  capImage.parentElement.classList.add('active');
  capPreview.setAttribute('data-filled', 'filled');
  capNext.classList.add('active');
  capPrevious.classList.add('active');
  if(window.innerWidth > 899){
    capBundleVariantID.length < 1 ? (capRadios[0].dispatchEvent(changeEvent)) : '()';
    }
}
function loopShowPreview() {
  loopPreview.classList.add('active');
  loopImage.parentElement.classList.add('active');
  loopPreview.setAttribute('data-filled', 'filled');
  loopNext.classList.add('active');
  loopPrevious.classList.add('active');
  loopNext.classList.remove('hidden');
  loopPrevious.classList.remove('hidden');
  if(window.innerWidth > 899){
    loopBundleVariantID.length < 1 ? (loopRadios[0].dispatchEvent(changeEvent)) : '()';
  }
}
function bootShowPreview() {
  if (withBoot) {
    bootPreview.classList.add('active');
    bootImage.parentElement.classList.add('active');
    bootPreview.setAttribute('data-filled', 'filled');
    bootNext.classList.add('active');
    bootPrevious.classList.add('active');
    bootNext.classList.remove('hidden');
    bootPrevious.classList.remove('hidden');
    bootPreview.classList.add('active');
  }
  else {
    bootNext.classList.add('active');
    bootPrevious.classList.add('active');
    bootNext.classList.add('hidden');
    bootPrevious.classList.add('hidden');
  }
}

function isOutsideOptions(element) {
  return !element.closest('.summary-content_options .form') && !element.closest('.loop-choices') && !element.closest('.boot-choices');
}

// event listener for bottle section radios
bottleRadios.forEach(function (element) {
  element.addEventListener('change', function (e) {
    bottleRadioUpdate(element);
    updatePricing();
  });
});
bottleRadiosMobile.forEach(function (element) {
  element.addEventListener('change', function (e) {
    bottleRadioUpdate(element);
    updatePricing();
    element.classList.contains('disabled') ? customizationMain.scrollTop = +99999 : customizationMain.scrollTop = -99999;
  });
});

function bottleRadioUpdate(element) {
  bottleSlideToPreview(element.dataset.slider_index);
  updateBottleSummary(element.dataset.name, element.dataset.background, element.getAttribute('dark-text-mode'), element.dataset.image, element.dataset.variant_id, element.dataset.main_variant, element);
  checkColor(element.dataset.variant_color);
  checkBottleAvailability(element);
}

function updateBottleSummary(name, background, mode, image, bundleVariantID, singleVariantID, element) {
  let textColor;
  let backgroundColor;
  element.dataset.colorType == "limited" ? (bottleColorTextLimited.innerText = name, bottleColorTextClassic.innerText = "", summaryBottleSection.setAttribute('color_type', 'limited')) : (bottleColorTextLimited.innerText = '', bottleColorTextClassic.innerText = name, summaryBottleSection.setAttribute('color_type', 'classic'));
  element.dataset.colorType == "limited" ? (bottleColorTextLimitedMobile.innerText = name, bottleColorTextClassicMobile.innerText = "", summaryBottleSection.setAttribute('color_type', 'limited')) : (bottleColorTextLimitedMobile.innerText = '', bottleColorTextClassicMobile.innerText = name, summaryBottleSection.setAttribute('color_type', 'classic'));

  if (mode == 'true') {
    engravingColor = 'dark';

  } else {
    engravingColor = 'light';
  }
  previewEngraving.setAttribute('data-text_color', engravingColor);
  popupEngraving.setAttribute('data-text_color', engravingColor);

  if (background != '') {
    backgroundColor = background;
  }
  else if (background == '') {
    backgroundColor = '#ffffff';
    textColor = '#352b27'
  }
  changeBackground(backgroundColor, textColor);
  bottlePreview.setAttribute('data-filled', 'filled');
  bottleImage.src = image;
  popupBottleImage.src = image;
  bottleBundleVariantID = bundleVariantID;
  bottleIndividualVariantID = singleVariantID;
}

// change background and text on bottle change
function changeBackground(backgroundColor, textColor) {
  customizationMain.style.setProperty('--background-color', backgroundColor);
}

// event listener for cap section radios
capRadios.forEach(function (element) {
  element.addEventListener('change', function (e) {
    capSlideToPreview(element.dataset.slider_index);
    updateCapSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element.dataset.main_variant, element);
    checkCapAvailability(element);
    updatePricing();
  })
});
capRadiosMobile.forEach(function (element) {
  element.addEventListener('change', function (e) {
    capSlideToPreview(element.dataset.slider_index);
    updateCapSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element.dataset.main_variant, element);
    element.classList.contains('disabled') ? customizationMain.scrollTop = +99999 : customizationMain.scrollTop = -99999;
    checkCapAvailability(element);
    updatePricing();
  })
});

function updateCapSummary(name, image, bundleVariantID, singleVariantID, element) {
  element.dataset.colorType == "limited" ? (capColorTextLimited.innerText = name, capColorTextClassic.innerText = "", summaryCapSection.setAttribute('color_type', 'limited')) : (capColorTextLimited.innerText = '', capColorTextClassic.innerText = name, summaryCapSection.setAttribute('color_type', 'classic'))
  element.dataset.colorType == "limited" ? (capColorTextLimitedMobile.innerText = name, capColorTextClassicMobile.innerText = "", summaryCapSection.setAttribute('color_type', 'limited')) : (capColorTextLimitedMobile.innerText = '', capColorTextClassicMobile.innerText = name, summaryCapSection.setAttribute('color_type', 'classic'));

  capPreview.setAttribute('data-filled', 'filled');
  capImage.src = image;
  popupCapImage.src = image;
  capBundleVariantID = bundleVariantID;
  capIndividualVariantID = singleVariantID;
  updatePricing();
}

// event listener for loop section radios
loopRadios.forEach(function (element) {
  element.addEventListener('change', function (e) {
    loopSlideToPreview(element.dataset.slider_index);
    updateLoopSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element.dataset.main_variant, element);
    checkLoopAvailability(element);
    updatePricing();
  })
});
loopRadiosMobile.forEach(function (element) {
  element.addEventListener('change', function (e) {
    loopSlideToPreview(element.dataset.slider_index);
    updateLoopSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element.dataset.main_variant, element);
    element.classList.contains('disabled') ? customizationMain.scrollTop = +99999 : customizationMain.scrollTop = -99999;
    checkLoopAvailability(element);
    updatePricing();
  })
});

function updateLoopSummary(name, image, bundleVariantID, singleVariantID, element) {
  element.dataset.colorType == "limited" ? (loopColorTextLimited.innerText = name, loopColorTextClassic.innerText = "", summaryLoopSection.setAttribute('color_type', 'limited')) : (loopColorTextLimited.innerText = '', loopColorTextClassic.innerText = name, summaryLoopSection.setAttribute('color_type', 'classic'));
  element.dataset.colorType == "limited" ? (loopColorTextLimitedMobile.innerText = name, loopColorTextClassicMobile.innerText = "", summaryLoopSection.setAttribute('color_type', 'limited')) : (loopColorTextLimitedMobile.innerText = '', loopColorTextClassicMobile.innerText = name, summaryLoopSection.setAttribute('color_type', 'classic'));

  loopPreview.setAttribute('data-filled', 'filled');
  loopImage.src = image;
  popupLoopImage.src = image;
  if (withLoop) {
    loopBundleVariantID = bundleVariantID;
    loopIndividualVariantID = singleVariantID;
  }
  updatePricing();

}

// event listener for boot section radios
bootRadios.forEach(function (element) {
  element.addEventListener('change', function (e) {
    bootSlideToPreview(element.dataset.slider_index);
    updateBootSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element);
    checkBootAvailability(element);
    updatePricing();
  })
});
bootRadiosMobile.forEach(function (element) {
  element.addEventListener('change', function (e) {
    bootSlideToPreview(element.dataset.slider_index);
    updateBootSummary(element.dataset.name, element.dataset.image, element.dataset.variant_id, element);
    element.classList.contains('disabled') ? customizationMain.scrollTop = +99999 : customizationMain.scrollTop = -99999;
    checkBootAvailability(element);
    updatePricing();
  })
});

function updateBootSummary(name, image, variantID, element) {
  element.dataset.colorType == "limited" ? (bootColorTextLimited.innerText = name, bootColorTextClassic.innerText = "", summaryBootSection.setAttribute('color_type', 'limited')) : (bootColorTextLimited.innerText = '', bootColorTextClassic.innerText = name, summaryBootSection.setAttribute('color_type', 'classic'));
  element.dataset.colorType == "limited" ? (bootColorTextLimitedMobile.innerText = name, bootColorTextClassicMobile.innerText = "", summaryBootSection.setAttribute('color_type', 'limited')) : (bootColorTextLimitedMobile.innerText = '', bootColorTextClassicMobile.innerText = name, summaryBootSection.setAttribute('color_type', 'classic'));

  bootPreview.setAttribute('data-filled', 'filled');
  bootImage.src = image;
  popupBootImage.src = image;
  bootVariantID = variantID;
  updatePricing();
}

// event listener for loop add-on
loopChoices.addEventListener('click', function (e) {
  [...loopChoices.children].forEach(function (element) {
    element.classList.remove('active');
  });
  if (e.target.closest('#add_loop')) {
    e.target.closest('#add_loop').classList.add('active')
    withLoop = true;

  }
  else {
    e.target.closest('#no_loop').classList.add('active')
    withLoop = true;
  }
  updateLoop();
});

loopChoicesMobile.addEventListener('click', function (e) {
  [...loopChoicesMobile.children].forEach(function (element) {
    element.classList.remove('active');
  });
  if (e.target.closest('#add_loop')) {
    e.target.closest('#add_loop').classList.add('active')
    withLoop = true;
  }
  else {
    e.target.closest('#no_loop').classList.add('active')
    withLoop = true;
  }
  updateLoop();
});

const loopMainImage = document.querySelector('.main-image-loop');
let temporaryLoopBundleVID = '';
let temporaryLoopIndividualVID = '';

function updateLoop() {
  if (withLoop) {
    loopColorSection.classList.remove('hidden');
    loopColorSectionMobile.classList.remove('hidden');
    loopSection.querySelector('.loop-section_header h3').innerText = "Loop";
    loopSection.dataset.loop = 'with';
    loopPreview.dataset.loop = 'with';
    loopMainImage.classList.remove('hidden');
    popupLoopImage.classList.remove('hidden');
    if (loopBundleVariantID.length < 1 && temporaryLoopBundleVID.length > 1) {
      loopBundleVariantID = temporaryLoopBundleVID;
      loopIndividualVariantID = temporaryLoopIndividualVID;
    }
    if (loopBundleVariantID.length < 1 && temporaryLoopBundleVID.length < 1) {
      loopRadios[0].checked = true
      loopRadios[0].dispatchEvent(changeEvent)
    }
    loopNext.classList.remove('hidden');
    loopPrevious.classList.remove('hidden');
    if (!loopIsAvailable) {
      summaryLoopSection.classList.add('unavailable');
      summaryLoopSectionMobile.classList.add('unavailable');
      if(window.innerWidth > 899)
      addToBag.setAttribute('disabled', '');
      document.querySelector('[for="loop-tab"').classList.add('unavailable');
    } else {
      summaryLoopSection.classList.remove('unavailable');
      summaryLoopSectionMobile.classList.remove('unavailable');
      if(window.innerWidth > 899)
      addToBag.removeAttribute('disabled');
      document.querySelector('[for="loop-tab"').classList.remove('unavailable');
    }
  }
  else {
    loopColorSection.classList.add('hidden');
    loopColorSectionMobile.classList.add('hidden');
    loopSection.querySelector('.loop-section_header h3').innerText = "No Loop";
    loopSection.dataset.loop = 'without';
    loopPreview.dataset.loop = 'without';
    loopMainImage.classList.add('hidden');
    popupLoopImage.classList.add('hidden');
    temporaryLoopBundleVID = loopBundleVariantID;
    temporaryLoopIndividualVID = loopIndividualVariantID;
    loopBundleVariantID = '';
    loopIndividualVariantID = '';
    loopNext.classList.add('hidden');
    loopPrevious.classList.add('hidden');
    summaryLoopSection.classList.remove('unavailable');
    summaryLoopSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="loop-tab"').classList.remove('unavailable');
    if (bottleIsAvailable && bootIsAvailable && capIsAvailable) {
      if(window.innerWidth > 899)
      addToBag.removeAttribute('disabled');
    }
  }
  updatePricing();
}

// event listener for boot add-on
bootChoices.addEventListener('click', function (e) {
  [...bootChoices.children].forEach(function (element) {
    element.classList.remove('active');
  });
  if (e.target.closest('#add_boot')) {
    e.target.closest('#add_boot').classList.add('active');
    withBoot = true;
  }
  else {
    e.target.closest('#no_boot').classList.add('active')
    withBoot = false;
  }
  updateBoot();
});

bootChoicesMobile.addEventListener('click', function (e) {
  [...bootChoicesMobile.children].forEach(function (element) {
    element.classList.remove('active');
  });
  if (e.target.closest('#add_boot')) {
    e.target.closest('#add_boot').classList.add('active')
    withBoot = true;
  }
  else {
    e.target.closest('#no_boot').classList.add('active')
    withBoot = false;
  }
  updateBoot();
});

const bootMainImage = document.querySelector('.main-image-boot');
let temporaryBootVID = '';

function updateBoot() {
  if (withBoot) {
    bootColorSection.classList.remove('hidden');
    bootColorSectionMobile.classList.remove('hidden');
    bootSection.querySelector('.boot-section_header h3').innerText = "Boot";
    bootSection.dataset.boot = 'with';
    bootPreview.dataset.boot = 'with';
    bootPreview.classList.add('active');
    bootMainImage.classList.remove('hidden');
    bootMainImage.classList.add('active');
    popupBootImage.classList.remove('hidden');

    bootNext.classList.add('active');
    bootPrevious.classList.add('active');
    bootSection.setAttribute('data-filled', 'filled');
    if (bootSection.getAttribute('data-filled') === 'empty') {
      bootSection.querySelectorAll('input[type="radio"]')[0].checked = true;
      bootSection.querySelectorAll('input[type="radio"]')[0].dispatchEvent(changeEvent);
    }
    if (bootVariantID.length < 1 && temporaryBootVID.length < 1 && bootIsAvailable) {
      bootSection.querySelectorAll('input[type="radio"]')[0].checked = true;
      bootSection.querySelectorAll('input[type="radio"]')[0].dispatchEvent(changeEvent);
    }
    if (bootVariantID.length < 1 && temporaryBootVID.length > 1) {

      bootVariantID = temporaryBootVID;
    }
    bootNext.classList.remove('hidden');
    bootPrevious.classList.remove('hidden');

    if (!bootIsAvailable) {
      summaryBootSection.classList.add('unavailable');
      summaryBootSectionMobile.classList.add('unavailable');
      if(window.innerWidth > 899)
      addToBag.setAttribute('disabled', '');
      document.querySelector('[for="boot-tab"').classList.add('unavailable');
    } else {
      summaryBootSection.classList.remove('unavailable');
      summaryBootSectionMobile.classList.remove('unavailable');
      if(window.innerWidth > 899)
      addToBag.removeAttribute('disabled');
      document.querySelector('[for="boot-tab"').classList.remove('unavailable');
    }
  }
  else {
    bootColorSection.classList.add('hidden');
    bootColorSectionMobile.classList.add('hidden');
    bootSection.querySelector('.boot-section_header h3').innerText = " No Boot";
    bootSection.dataset.boot = 'without';
    bootPreview.dataset.boot = 'without';
    bootMainImage.classList.add('hidden');
    popupBootImage.classList.add('hidden');
    bootSection.setAttribute('data-filled', 'filled');
    temporaryBootVID = bootVariantID;
    bootVariantID = '';
    bootNext.classList.add('hidden');
    bootPrevious.classList.add('hidden');
    bootChoices.querySelector('#add_boot').classList.remove('active');
    bootChoicesMobile.querySelector('#add_boot').classList.remove('active');
    bootChoices.querySelector('#no_boot').classList.add('active');
    bootChoicesMobile.querySelector('#no_boot').classList.add('active');
    summaryBootSection.classList.remove('unavailable');
    summaryBootSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="boot-tab"').classList.remove('unavailable');
    if (bottleIsAvailable && loopIsAvailable && capIsAvailable) {
      if(window.innerWidth > 899)
      addToBag.removeAttribute('disabled');
    }
  }
  updatePricing();

}



/*
*
** BOTTLE SWIPER **
*
*/

const bottleSwiper = new Swiper(".bottle-preview", {
  loop: true,
  allowTouchMove: false,
  allowSlideClick: true,
  loopPreventsSliding: false,
  spaceBetween: 0,
  speed: animationSpeed,
  slidesPerView: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.bottle-next',
    prevEl: '.bottle-previous',
  },
  breakpoints: {
    900: {
      allowTouchMove: false,
      allowSlideClick: true,
      slidesPerView: 3
    },
    1300: {
      slidesPerView: 5,
    }
  }
});


let bottleSInitialized = false;

bottleSwiper.on('init', function () {
  bottleSInitialized = true;
});

bottleSwiper.on('click', function (e) {
  bottlePreviewChanges(bottleSwiper.clickedSlide)
});

bottleSwiper.on('snapIndexChange', function (e) {
  // if (bottleSInitialized) {
  try {
    bottlePreviewChanges(bottleSwiper.slides[bottleSwiper.activeIndex])
  } catch (error) {

  }
  // }
});

function bottlePreviewChanges(activeSlide) {
  bottleRadioCheck(activeSlide.dataset.swiperSlideIndex)
  updateBottleSummary(activeSlide.dataset.name, activeSlide.dataset.background, activeSlide.getAttribute('dark-text-mode'), activeSlide.querySelector('img').src, activeSlide.dataset.variant_id, activeSlide.dataset.main_variant, activeSlide);
  checkColor(activeSlide.dataset.variant_color);
  checkBottleAvailability(activeSlide);
  updatePricing();
}

function bottleRadioCheck(param) {

  bottleRadios.forEach(element => {
    if (element.dataset.slider_index === param) {
      element.checked = true;
    }
  });
  bottleRadiosMobile.forEach(element => {
    if (element.dataset.slider_index === param) {
      element.checked = true;
      scrollDownIfOOS(element);
    }
  });
}


function bottleSlideToPreview(params) {
  bottleSwiper.slideToLoop(params, animationSpeed, false)
}


/*
*
** CAP SWIPER **
*
*/
let capSInitialized = false;
const capSwiper = new Swiper(".cap-preview", {
  loop: true,
  allowTouchMove: false,
  allowSlideClick: true,
  spaceBetween: 0,
  speed: animationSpeed,
  slidesPerView: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.cap-next',
    prevEl: '.cap-previous',
  },
  breakpoints: {
    900: {
      allowTouchMove: false,
      allowSlideClick: true,
      slidesPerView: 3
    },
    1300: {
      slidesPerView: 5,
    }
  }
});


capSwiper.on('click', function (e) {
  const activeSlide = capSwiper.clickedSlide
  capPreviewChanges(capSwiper.slides[capSwiper.activeIndex]);
});

capSwiper.on('snapIndexChange', function (e) {
  if (capSInitialized) {
    capPreviewChanges(capSwiper.slides[capSwiper.activeIndex]);
  } else {
    try {
      sourceExists ? '' : (capPreviewChanges(capSwiper.slides[capSwiper.activeIndex]));
      capBundleVariantID = '';
      capIndividualVariantID = '';
      popupCapImage.src = '';
    } catch (error) {

    }
  }
  capSInitialized = true;
});

function capPreviewChanges(activeSlide) {
  capRadioCheck(activeSlide.dataset.swiperSlideIndex)
  updateCapSummary(activeSlide.dataset.name, activeSlide.querySelector('img').src, activeSlide.dataset.variant_id, activeSlide.dataset.main_variant, activeSlide);
  checkCapAvailability(activeSlide);
  updatePricing();
}

function capRadioCheck(param) {
  capRadios.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
    }
  });
  capRadiosMobile.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
      scrollDownIfOOS(element);
    }
  });
}
function capSlideToPreview(params) {
  capSwiper.slideToLoop(params, animationSpeed, false)
}


/*
*
** LOOP SWIPER **
*
*/

let loopSInitialized = false;
const loopSwiper = new Swiper(".loop-preview", {
  loop: true,
  allowTouchMove: false,
  allowSlideClick: true,
  spaceBetween: 0,
  speed: animationSpeed,
  slidesPerView: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.loop-next',
    prevEl: '.loop-previous',
  },
  breakpoints: {
    900: {
      allowTouchMove: false,
      allowSlideClick: true,
      slidesPerView: 3
    },
    1300: {
      slidesPerView: 5,
    }
  }
});




loopSwiper.on('click', function (e) {
  const activeSlide = loopSwiper.clickedSlide
  loopPreviewChanges(loopSwiper.slides[loopSwiper.activeIndex])
});

loopSwiper.on('snapIndexChange', function (e) {
  if (loopSInitialized) {
    loopPreviewChanges(loopSwiper.slides[loopSwiper.activeIndex])
  } else {
    try {
      sourceExists ? '' : loopPreviewChanges(loopSwiper.slides[loopSwiper.activeIndex]);
      loopBundleVariantID = '';
      loopIndividualVariantID = '';
      popupLoopImage.src = '';
    } catch (error) {

    }
  }
  loopSInitialized = true;
  updatePricing()
});

function loopPreviewChanges(activeSlide) {
  loopRadioCheck(activeSlide.dataset.swiperSlideIndex);
  updateLoopSummary(activeSlide.dataset.name, activeSlide.querySelector('img').src, activeSlide.dataset.variant_id, activeSlide.dataset.main_variant, activeSlide);
  checkLoopAvailability(activeSlide);
  updatePricing();
}

function loopRadioCheck(param) {
  loopRadios.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
    }
  });
  loopRadiosMobile.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
      scrollDownIfOOS(element);
    }
  });
}


function loopSlideToPreview(params) {
  loopSwiper.slideToLoop(params, animationSpeed, false)
}

/*
*
** BOOT SWIPER **
*
*/

let bootSInitialized = false;
const bootSwiper = new Swiper(".boot-preview", {
  loop: true,
  allowSlideNext: true,
  allowSlidePrev: true,
  loopPreventsSliding: false,
  allowTouchMove: false,
  allowSlideClick: true,
  spaceBetween: 0,
  speed: animationSpeed,
  slidesPerView: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.boot-next',
    prevEl: '.boot-previous',
  },
  breakpoints: {
    900: {
      allowTouchMove: false,
      allowSlideClick: true,
      slidesPerView: 3
    },
    1300: {
      slidesPerView: 5,
    }
  }
});

bootSwiper.on('click', function (e) {
  const activeSlide = bootSwiper.clickedSlide

  bootPreviewChanges(bootSwiper.slides[bootSwiper.activeIndex])
});

bootSwiper.on('snapIndexChange', function (e) {
  if (bootPreview.dataset.filled != '' || bootPreview.dataset.filled != 'empty') {
    if (bootSInitialized) {
      withBoot ? bootPreviewChanges(bootSwiper.slides[bootSwiper.activeIndex]) : ''
    }
    else {
      try {
        sourceExists ? '' : (withBoot ? bootPreviewChanges(bootSwiper.slides[bootSwiper.activeIndex]) : '');

      } catch (error) { }
    }
  }
  bootSInitialized = true;
});

function bootPreviewChanges(activeSlide) {
  bootRadioCheck(activeSlide.dataset.swiperSlideIndex)
  updateBootSummary(activeSlide.dataset.name, activeSlide.querySelector('img').src, activeSlide.dataset.variant_id, activeSlide);
  checkBootAvailability(activeSlide);
  updatePricing();
}

function bootRadioCheck(param) {
  bootRadios.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
    }
  });
  bootRadiosMobile.forEach(element => {
    if (element.dataset.slider_index == param) {
      element.checked = true;
      scrollDownIfOOS(element);
    }
  });
}


function bootSlideToPreview(params) {
  bootSwiper.slideToLoop(params, animationSpeed, false)
}

function checkRadioButtonWithValue(value) {

  summaryBottleSection.setAttribute('data-filled', 'filled');
  summaryCapSection.setAttribute('data-filled', 'filled');
  summaryLoopSection.setAttribute('data-filled', 'filled');

  bottleRadios.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
      bottle.dispatchEvent(changeEvent);
    }
  });
  bottleRadiosMobile.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
    }
  });
  capRadios.forEach(function (cap) {
    if (cap.dataset.name == value) {
      cap.checked = true;
      cap.dispatchEvent(changeEvent);
    }
  });
  capRadiosMobile.forEach(function (cap) {
    if (cap.dataset.name == value) {
      cap.checked = true;
    }
  });
  loopRadios.forEach(function (loop) {
    if (loop.dataset.name == value) {
      loop.checked = true;
      loop.dispatchEvent(changeEvent);
    }
  });
  loopRadiosMobile.forEach(function (loop) {
    if (loop.dataset.name == value) {
      loop.checked = true;
      loop.dispatchEvent(changeEvent);
    }
  });
}

let temporaryRandomNumber = 0;

randomize.addEventListener('click', function () {
  const colorMax = randomColors.length;
  let randomColorIndex;

  do {
    randomColorIndex = Math.floor(Math.random() * colorMax);
  } while (temporaryRandomNumber === randomColorIndex);

  // Update temporaryRandomNumber with the newly generated randomColorIndex
  temporaryRandomNumber = randomColorIndex;

  animationSpeed = 0;
  const capColor = randomColors[randomColorIndex].cap;
  console.log(randomColorIndex + ' ' + randomColors[randomColorIndex].loop)
  const loopColor = randomColors[randomColorIndex].loop;
  const bottleColor = randomColors[randomColorIndex].bottle;
  const bootColor = randomColors[randomColorIndex].boot;

  checkLoop(loopColor);
  checkCap(capColor);
  checkBottle(bottleColor);
  bootColor ? checkBoot(bootColor) : (withBoot = false, updateBoot());

  previewMainImage.forEach(function (element) {
    if (element.classList.contains('active')) {
      element.classList.add('active');
      setTimeout(function () {
        element.classList.remove('active');
      }, animationSpeed);
    }
  });

  animationSpeed = 300;
});


function updatePricing() {

  let combinedPrice = 60;
  totalPrice = 0;
  if (bottleBundleVariantID.length > 1 && capBundleVariantID.length > 1 && loopBundleVariantID.length) {
    bootVariantID.length > 1 ? 
      (totalPrice = bundlePrice + bootPrice, 
       totalPriceText.innerText = ('$' + totalPrice.toLocaleString()), 
       originalPriceText.innerText = ('$' + (combinedPrice.toLocaleString()))) 
      : (totalPrice = bottlePrice + capPrice, originalPriceText.innerText = ('$' + (bundlePrice + capPrice).toLocaleString()), totalPriceText.innerText = ('$' + bundlePrice.toLocaleString()));
  }
  else {
    bottleBundleVariantID.length > 1 ? totalPrice = totalPrice + bottlePrice : '';
    capBundleVariantID.length > 1 ? totalPrice = totalPrice + capPrice : '';
    loopBundleVariantID.length > 1 ? totalPrice = totalPrice + loopPrice : '';
    bootVariantID.length > 1 ? totalPrice = totalPrice + bootPrice : '';
    totalPriceText.innerText = ('$' + totalPrice.toLocaleString());
    originalPriceText.innerText = '';
  }

}

if (capExists || loopExists || bottleExists || bootExists) {
  customizationMain.classList.add('show');
  animationSpeed = 0;
  window.addEventListener('load', function () {
    capValue.length > 1 ? checkCap(capValue) : '';
    loopValue.length > 1 ? checkLoop(loopValue) : '';
    bottleValue.length > 1 ? checkBottle(bottleValue) : '';
    bootValue.length > 1 ? checkBoot(bootValue) : '';
    animationSpeed = 300;
  })

}
if (sourceExists) {
  customizationMain.classList.add('show');
  document.querySelector('body').classList.remove('hide');
}


function checkCap(value) {
  summaryCapSection.setAttribute('data-filled', 'filled');
  capRadios.forEach(function (cap) {
    if (cap.dataset.name == value) {
      cap.checked = true;
      cap.dispatchEvent(changeEvent);
    }
  });
  capRadiosMobile.forEach(function (cap) {
    if (cap.dataset.name == value) {
      cap.checked = true;
    }
  });
}

function checkLoop(value) {
  summaryLoopSection.setAttribute('data-filled', 'filled');
  withLoop = true;
  summaryLoopSection.setAttribute('data-boot', 'with');
  console.log(value + " asdawd");
  updateLoop();
  loopRadios.forEach(function (loop) {
    if (loop.dataset.name == value) {
      loop.checked = true;
      loop.dispatchEvent(changeEvent);
    }
  });
  loopRadiosMobile.forEach(function (loopm) {
    if (loopm.dataset.name == value) {
      loopm.checked = true;
      loopm.dispatchEvent(changeEvent);
    }
  });
  
}
function checkBottle(value) {
  summaryBottleSection.setAttribute('data-filled', 'filled');

  bottleRadios.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
      bottle.dispatchEvent(changeEvent);
    }
  });
  bottleRadiosMobile.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
    }
  });

}
function checkBoot(value) {
  summaryBootSection.setAttribute('data-filled', 'filled');
  summaryBootSection.setAttribute('data-boot', 'with');
  withBoot = true;
  bootChoices.querySelector('#add_boot').classList.add('active');
  bootChoicesMobile.querySelector('#add_boot').classList.add('active');
  bootChoices.querySelector('#no_boot').classList.remove('active');
  bootChoicesMobile.querySelector('#add_boot').classList.remove('active');
  updateBoot();

  bootRadios.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
      bottle.dispatchEvent(changeEvent);
    }
  });
  bootRadiosMobile.forEach(function (bottle) {
    if (bottle.dataset.name == value) {
      bottle.checked = true;
    }
  });
  summaryBottleSection.click()
}


function reset() {

  const bottleBool = bottleBundleVariantID.length > 1;
  const capBool = capBundleVariantID.length > 1;
  const loopBool = loopBundleVariantID.length > 1;
  const bootBool = bootVariantID.length > 1;

  customizationMain.classList.remove('loading-icon');
  popupCheckout.classList.remove('show');

  bottleRadios[0].checked = true
  bottleRadios[0].dispatchEvent(changeEvent);

  loopRadios[0].checked = true
  loopRadios[0].dispatchEvent(changeEvent);

  capRadios[0].checked = true
  capRadios[0].dispatchEvent(changeEvent);

  withBoot = false;
  bootVariantID = '';
  engravingInput.value = '';
  engravingInputMobile.value = '';
  popupEngraving.innerText = '';
  engravingValue = '';
  document.querySelector('.bottle-hover').innerText = '';

  bottleBool ? '' : (bottleBundleVariantID = '', popupBottleImage.src = '');
  capBool ? '' : (capBundleVariantID = '', popupCapImage.src = '');
  loopBool ? '' : (loopBundleVariantID = '', popupLoopImage.src = '', withLoop = true);
  bootBool ? '' : (bootVariantID = '', popupBootImage.src = '', withBoot = false);
  if (!loopBool) {
    [...loopChoices.children].forEach(function (element) {
      element.classList.remove('active');
      element.id == 'no_loop' ? element.classList.add('active') : ''
    });
  }
  if (!loopBool) {
    [...loopChoicesMobile.children].forEach(function (element) {
      element.classList.remove('active');
      element.id == 'no_loop' ? element.classList.add('active') : ''
    });
  }

  if (!bootBool) {
    [...bootChoices.children].forEach(function (element) {
      element.classList.remove('active');
      element.id == 'no_loop' ? element.classList.add('active') : ''
    });
  }
  if (!bootBool) {
    [...bootChoicesMobile.children].forEach(function (element) {
      element.classList.remove('active');
      element.id == 'no_loop' ? element.classList.add('active') : ''
    });
  }



  updateBoot();
  updateLoop();

  // summaryBootSection.dataset.filled = "empty";
  // summaryLoopSection.dataset.filled = "empty";
  // summaryCapSection.dataset.filled = "empty";

  summaryBottleSection.click();
  document.querySelector('#bottle-tab').checked = true;
  document.querySelector('#bottle-tab').dispatchEvent(changeEvent);
  summaryEngravingSection.dataset.filled = 'empty';
  updateCTA();
}

const isWindowSizeGreaterThan899 = window.innerWidth > 899;
// component clicks
document.querySelector('.bottle-hover').addEventListener('click', function () {
  summaryBottleSection.click();
  summaryBottleSectionMobile.classList.add('active');
  document.querySelector('#bottle-tab').checked = true;
  document.querySelector('#bottle-tab').dispatchEvent(changeEvent);
})
document.querySelector('.cap-hover').addEventListener('click', function () {
  summaryCapSection.click();
  summaryCapSectionMobile.classList.add('active');
  document.querySelector('#cap-tab').checked = true;
  document.querySelector('#cap-tab').dispatchEvent(changeEvent);
})
document.querySelector('.loop-hover').addEventListener('click', function () {
  summaryLoopSection.click();
  summaryLoopSectionMobile.classList.add('active');
  document.querySelector('#loop-tab').checked = true;
  document.querySelector('#loop-tab').dispatchEvent(changeEvent);
})
document.querySelector('.boot-hover').addEventListener('click', function () {
  summaryBootSection.click();
  summaryBootSectionMobile.classList.add('active');
  document.querySelector('#boot-tab').checked = true;
  document.querySelector('#boot-tab').dispatchEvent(changeEvent);
})


// onboarding functions
const onboardingNext = document.querySelectorAll('.ocf--next');
const onboardingBack = document.querySelectorAll('.ocf--back');

document.querySelectorAll('.onboarding_close').forEach(function (obc) {
  obc.addEventListener('click', function () {
    document.querySelector('.onboarding-section').classList.add('hidden');
    document.querySelectorAll('.onboarding_content').forEach(function (oc) { oc.classList.remove('active') })
    localStorage.setItem('flaskOnboarding', 'hide');
    stopOnboardingVideo();
  });
})

onboardingNext.forEach(function (obn) {
  obn.addEventListener('click', function (e) {
    onBoardingNextSlide(e.target.dataset.step);
  });
});

onboardingBack.forEach(function (obn) {
  obn.addEventListener('click', function (e) {
    onBoardingPreviousSlide(e.target.dataset.step);
  });
});

function onBoardingNextSlide(param) {
  const step = parseInt(param) + 1;
  const slide = document.querySelector(`.onboarding_content.onboarding--step-${step}`);
  document.querySelectorAll('.onboarding_content').forEach(function (oc) { oc.classList.remove('active') })
  stopOnboardingVideo();

  param != '4' ? (slide.classList.add('active'), slide.querySelector('.ocm--video').play()) : (document.querySelector('.onboarding-section').classList.add('hidden'), localStorage.setItem('flaskOnboarding', 'hide'));
}

function onBoardingPreviousSlide(param) {
  const step = parseInt(param) - 1;
  const slide = document.querySelector(`.onboarding_content.onboarding--step-${step}`);
  document.querySelectorAll('.onboarding_content').forEach(function (oc) { oc.classList.remove('active') })
  stopOnboardingVideo();

  param != '1' ? (slide.classList.add('active'), slide.querySelector('.ocm--video').play()) : (document.querySelector('.onboarding-section').classList.add('hidden'), localStorage.setItem('flaskOnboarding', 'hide'));
}

function stopOnboardingVideo() {
  document.querySelectorAll('.ocm--video').forEach(function (vid) { vid.pause() })
}


function isLight(color) {
  // Convert the color to RGB
  let rgb = hexToRgb(color);

  // Calculate the perceived brightness using the formula
  let brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  // Return true if the brightness is greater than 128 (considered light)
  return brightness > 128;
}

// Function to convert hex color to RGB
function hexToRgb(hex) {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Parse the hex value into RGB
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Return an object with RGB values
  return { r, g, b };
}

// Function to set text color based on background color
function checkColor(hex) {

  const eColor = isLight(hex) ? 'dark' : 'light';
  // Set the text color
  // previewEngraving.setAttribute('data-text_color', eColor);
  // popupEngraving.setAttribute('data-text_color', eColor);
  // engravingColor = eColor;
}


// custom mobile swipe functionality
let touchStartX = 0;
let touchMoveX = 0;
swipeElement.addEventListener('touchstart', handleTouchStart);
swipeElement.addEventListener('touchmove', handleTouchMove);

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchMoveX = event.touches[0].clientX;
  let deltaX = touchMoveX - touchStartX;

  if (deltaX > 0) {
    // Move to the right
    document.querySelector('.bottle-preview.active') ? bottleSwiper.slidePrev() : ''
    document.querySelector('.cap-preview.active') ? capSwiper.slidePrev() : ''
    document.querySelector('.loop-preview.active') ? loopSwiper.slidePrev() : ''
    document.querySelector('.boot-preview.active') ? bootSwiper.slidePrev() : ''
  } else if (deltaX < 0) {
    // Move to the left
    document.querySelector('.bottle-preview.active') ? bottleSwiper.slideNext() : ''
    document.querySelector('.cap-preview.active') ? capSwiper.slideNext() : ''
    document.querySelector('.loop-preview.active') ? loopSwiper.slideNext() : ''
    document.querySelector('.boot-preview.active') ? bootSwiper.slideNext() : ''
  }

  touchStartX = touchMoveX;
}

// functions to check if component is available
function checkBottleAvailability(params) {
  if (params.classList.contains('disabled')) {
    bottleBundleVariantID = '';
    bottleIndividualVariantID = '';
    bottleIsAvailable = false;
    summaryBottleSection.classList.add('unavailable');
    summaryBottleSectionMobile.classList.add('unavailable');
    document.querySelector('[for="bottle-tab"').classList.add('unavailable');
  } else {
    bottleIsAvailable = true;
    summaryBottleSection.classList.remove('unavailable');
    summaryBottleSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="bottle-tab"').classList.remove('unavailable');
  }
  updateCTA();
}
function checkCapAvailability(params) {
  if (params.classList.contains('disabled')) {
    capBundleVariantID = '';
    capIndividualVariantID = '';
    capIsAvailable = false;
    summaryCapSection.classList.add('unavailable');
    summaryCapSectionMobile.classList.add('unavailable');
    document.querySelector('[for="cap-tab"').classList.add('unavailable');
  } else {
    capIsAvailable = true;
    summaryCapSection.classList.remove('unavailable');
    summaryCapSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="cap-tab"').classList.remove('unavailable');
  }
  updateCTA();
}
function checkLoopAvailability(params) {
  if (params.classList.contains('disabled')) {
    loopBundleVariantID = '';
    loopIndividualVariantID = '';
    loopIsAvailable = false;
    summaryLoopSection.classList.add('unavailable');
    summaryLoopSectionMobile.classList.add('unavailable');
    document.querySelector('[for="loop-tab"').classList.add('unavailable');
  } else {
    loopIsAvailable = true;
    summaryLoopSection.classList.remove('unavailable');
    summaryLoopSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="loop-tab"').classList.remove('unavailable');
  }
  updateCTA();
}
function checkBootAvailability(params) {
  if (params.classList.contains('disabled')) {
    bootVariantID = '';
    bootIsAvailable = false;
    summaryBootSection.classList.add('unavailable');
    summaryBootSectionMobile.classList.add('unavailable');
    document.querySelector('[for="boot-tab"').classList.add('unavailable');
  } else {
    bootIsAvailable = true;
    summaryBootSection.classList.remove('unavailable');
    summaryBootSectionMobile.classList.remove('unavailable');
    document.querySelector('[for="boot-tab"').classList.remove('unavailable');
  }
  updateCTA();
}

function updateCTA() {
  if(window.innerWidth > 900){
    if (bottleIsAvailable && bootIsAvailable && loopIsAvailable && capIsAvailable && engravingIsValid) {
      addToBag.removeAttribute('disabled');
    }
    else {
      addToBag.setAttribute('disabled', '');
    }
  }
  else{
    if (bottleIsAvailable && bootIsAvailable && loopIsAvailable && capIsAvailable && engravingIsValid) {
      addToBag.classList.remove('disabled');
    }
    else {
      addToBag.classList.add('disabled');
    }
  }
}

window.addEventListener('load', function () {
  sourceExists = false;
})

async function fetchFlaskDetails(url) {
  const fullUrl = url /*+ '&section_id=' + section*/;

  fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text(); // assuming the response is in text format
    })
    .then((data) => {
      // const sectionElement = document.querySelector(`#shopify-section-${section} form`);

      updateFlaskGallery(data);
      initializeVTOGallerySwiper();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function updateFlaskGallery(data) {
  const productGallery = document.querySelectorAll('.product-gallery-swipper');
  const doc = parser.parseFromString(data, 'text/html');
  const newProductGallery = doc.querySelectorAll('.product-gallery-swipper');
  productGallery.forEach((element, index) => {
    element.replaceWith(newProductGallery[index]);
  })

  const productVTOContainer = document.querySelector('.desktop-product-vto-container');
  const newproductVTOContainer = doc.querySelector('.desktop-product-vto-container');
  productVTOContainer.replaceWith(newproductVTOContainer);

  document.querySelector('#product-gallery-container').setAttribute('data-product-sku', doc.querySelector('#product-gallery-container').getAttribute('data-product-sku'));
  try {
    loadGallerySwiper();
  } catch (error) {

  }

}


popupButtonEdit.forEach(function (button) {
  button.addEventListener('click', function (event) {
    popupCheckout.classList.remove('show');
  })
})


// disable emoji input in engraving

const allowedEmoji = ['♡','☻','✿','☆','⟡','☾','🐾','☯','🜲','𖤓','0','1','2','3','4','5','6','7','8','9'];
let emojies = '';

engravingInput.addEventListener('input', function(e){
  checkEmoji(engravingValue);
});

engravingInputMobile.addEventListener('input', function(e){
  checkEmoji(engravingValue);
});

function disableEmojiInput(event) {
  const isEmoji = isEmojiCharacter(event.key);

  if (isEmoji) {
      event.preventDefault();
  }
}
function checkEmoji(param){
  emojies = '';
  let invalidEmojiCounter = 0;
  const characters = Array.from(param);

  characters.forEach(character => {
      if(isEmojiCharacter(character)){
        invalidEmojiCounter++;
        emojies = emojies + character;
      }
  });
  updateEmoji(invalidEmojiCounter);
}

function updateEmoji(param){
  if(param > 0){
    document.querySelectorAll('.emoji-error').forEach(er => { er.style.display = 'flex' });
    document.querySelector('.summary-mobile #emoji-characters').innerText = emojies
    document.querySelector('.summary-desktop #emoji-characters').innerText = emojies 
    engravingIsValid = false;
  }
  else{
    document.querySelectorAll('.emoji-error').forEach(er => { er.style.display = 'none' });
    engravingIsValid = true;
  }
  updateCTA();
}

function isEmojiCharacter(char) {
  const emojiPattern = /^[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;
  // emojiPattern.test(char) && !allowedEmoji.includes(char) ? emojies = emojies + char : '';
  return emojiPattern.test(char) && !allowedEmoji.includes(char);
}


document.querySelectorAll('.button-emoji').forEach(emoji => {
    emoji.addEventListener('click', function (e) {
      if(engravingValue.length < 8){
        var newValue = engravingValue + emoji.value;
        
        // Update the input value
        engravingInput.value = engravingInput.value + emoji.value;
        engravingInputMobile.value = engravingInputMobile.value + emoji.value;
        engravingValue = newValue;
        previewEngraving.innerText = newValue;
        popupEngraving.innerText = newValue;
      }
    });
});

// scroll down on mobile swipe if component is out of stock
function scrollDownIfOOS(element){
  if(element.classList.contains('disabled')){
    customizationMain.scrollTop = +99999;
  }
  else{
    
    customizationMain.scrollTop = -99999;
  }
}