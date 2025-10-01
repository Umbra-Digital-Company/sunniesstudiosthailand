const confirmButton = document.querySelector('.popup-confirmation-button');
const customizeAnotherButton = document.querySelector('.popup-another');

const cartLinkButton = document.querySelector('.flask-checkout-link');
const popupUpsell = document.querySelector('#popup-upsell');

cartLinkButton.addEventListener('click', (e) =>{
  e.preventDefault();
});

confirmButton.addEventListener('click', async (e) => {
  await checkout();
  location.href = '/cart';
});

customizeAnotherButton.addEventListener('click', async (e) => {
  await checkout();
  reset();
});

popupUpsell.addEventListener('click', async (e) => {
  e.preventDefault();
  await checkout();
  location.href = '/collections/sunnies-flask';
});


let bottleIndividualVariantID = '';
let bottleBundleVariantID = '';

let loopBundleVariantID = '';
let loopIndividualVariantID = '';

let capBundleVariantID = '';
let capIndividualVariantID = '';

let bootVariantID = '';

let engravingValue = '';
let engravingPlacement = '';
let engravingColor = '';

let formData = {
 'items': []
};

function addParent(id, bundleID, item_type) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': bundleID
        }
    });
}

function addBottleComponent(id, bundleID, engravingID, item_type) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': bundleID,
          '_bottleEngravingID': engravingID
        }
    });
}
function addCapComponent(id, parentBundleID, item_type) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': parentBundleID
        }
    });
}
function addLoopComponent(id, parentBundleID, item_type) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': parentBundleID
        }
    });
}
function addBootComponent(id, parentBundleID, item_type) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': parentBundleID
        }
    });
}
function addEngravingComponent(id, parentBundleID, engravingID, engravingText, item_type, engravingPlacement, engravingColor) {
    formData.items.push({
        'id': id,
        'quantity': 1,
        'properties': {
          '_item_type': item_type,
          '_bundleID': parentBundleID,
          '_isBundleComponent': true,
          '_bottleEngravingID': engravingID,
          '_engravingPlacement': engravingPlacement,
          '_engravingColor': engravingColor,
          'Engraving': engravingText
        }
    });
}


async function checkout(){
  
  customizationMain.classList.add('loading-icon');
  
  document.querySelector('.preview-popup .popup-wrapper').classList.add('loading-icon');
  let bundleID = Date.now() + Math.floor(Math.random()*(100-1+1)+1);
  let bottleEngravingID = 'Bottle_' + bundleID;


  if(bottleBundleVariantID.length > 1 && capBundleVariantID.length > 1 && loopBundleVariantID.length){
    engravingValue.length > 1 ? addEngravingComponent('40526024867958', bundleID, bottleEngravingID, engravingValue, 'flask_bundle', engravingPlacement, engravingColor) : '';
    bootVariantID.length > 1 ? addBootComponent(bootVariantID, bundleID, 'flask_bundle') : '';
    addLoopComponent(loopBundleVariantID, bundleID, 'flask_bundle');
    addCapComponent(capBundleVariantID, bundleID, 'flask_bundle');
    addBottleComponent(bottleBundleVariantID, bundleID, bottleEngravingID, 'flask_bundle');
    
  }
  else{
    bottleBundleVariantID.length > 1 ? addBottleComponent(bottleIndividualVariantID, '', bottleEngravingID, 'flask') : '';
    capBundleVariantID.length > 1 ? addCapComponent(capIndividualVariantID, '', 'flask') : '';
    loopBundleVariantID.length > 1 ? addLoopComponent(loopIndividualVariantID, '', 'flask') : '';
    bootVariantID.length > 1 ? addBootComponent(bootVariantID, bundleID, 'flask') : '';
    engravingValue.length > 1 ? addEngravingComponent('40526024867958', '', bottleEngravingID, engravingValue, 'flask', engravingPlacement, engravingColor) : '';
  }
  

  await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    customizationMain.classList.remove('loading-icon');
    popupCheckout.classList.remove('show');
    
  document.querySelector('.preview-popup .popup-wrapper').classList.remove('loading-icon');
    formData = {
      'items': []
     };
    return response.json();
    
  })
  .catch((error) => {
    console.error('Error:', error);
    
  document.querySelector('.preview-popup .popup-wrapper').classList.remove('loading-icon');
  });



}
// bottleIsAvailable && !bootIsAvailable && loopIsAvailable && capIsAvailable && engravingIsValid
function checkoutOOS(){
  if (!bootIsAvailable){
    document.querySelector('input#boot-tab').click();
  }
  if (!loopIsAvailable){
    document.querySelector('input#loop-tab').click();
  }
  if (!capIsAvailable){
    document.querySelector('input#cap-tab').click();
  }
  if (!bottleIsAvailable){
    
    document.querySelector('input#bottle-tab').click();
  }
  customizationMain.scrollTop = +99999;
}