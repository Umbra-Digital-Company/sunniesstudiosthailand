let productDetails;
 const parser = new DOMParser();

const main = document.querySelector("#MainContent");

main.addEventListener("click", (e) => {
  const anchor = e.target.closest(".product-variant-swatches a");
  if (anchor) {
    e.preventDefault();
    updateVariantRadio(anchor);
    e.target.classList.add('active');
    disableButton();
    updateURL(anchor.dataset.url);
    fetchProductDetails(anchor.dataset.url, anchor.dataset.section);
  }
});

function updateVariantRadio(target){
  document.querySelectorAll('.product-variant-swatches a').forEach((element) => {
    element.classList.remove('active');
    target.classList.add('active');
  })
}

function disableButton(){
  document.querySelectorAll('.product-details .Product__header form button').forEach(btn => {btn.setAttribute('disabled','');})
}

function updateURL(url){
  history.pushState({}, '', url);
}

async function fetchProductDetails(url, section) {
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

      updateProductDetails(data);
      updateGallery(data);
      updatePrescription(data);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function updateProductDetails(data){
  const doc = parser.parseFromString(data, 'text/html');
  const productDetailsHeader = document.querySelector('.product-details .Product__header form');
  const newProductDetailsHeader = doc.querySelector('.product-details .Product__header form');
  productDetailsHeader.replaceWith(newProductDetailsHeader);

  const productVTOContainer = document.querySelector('.desktop-product-vto-container');
  const newproductVTOContainer = doc.querySelector('.desktop-product-vto-container');
  productVTOContainer.replaceWith(newproductVTOContainer);
  sizeGuide();
  // re-Initialized VTO everytime swatch color is selected
  try {
    initializeVTO();
  } catch (error) {
    
  }
 
  const productDescription = document.querySelectorAll('#product-description-accordion li');
  const newproductDescription = doc.querySelectorAll('#product-description-accordion li');
  try {
    productDescription[0].replaceWith(newproductDescription[0]);
  } catch (error) {
  }

  const productInfo = document.querySelector('.product-infomation-header');
  const newproductInfo = doc.querySelector('.product-infomation-header');
  productInfo.replaceWith(newproductInfo);
}

function updateGallery(data){
  const productGallery = document.querySelectorAll('.product-gallery-swipper');
  const doc = parser.parseFromString(data, 'text/html');
  const newProductGallery = doc.querySelectorAll('.product-gallery-swipper');
  productGallery.forEach((element, index) => {
    element.replaceWith(newProductGallery[index]);
  })

  document.querySelectorAll('.product-variant-swatches a.active').forEach((element) => {
    element.setAttribute('data-product-sku', element.getAttribute('data-product-sku'));
  });
  
  try {
    loadGallerySwiper();
    initializeVTOGallerySwiper();
    initializeVTO();
  } catch (error) {
    console.error('Error reinitializing components:', error);
  }
  

}

function updatePrescription(data){
  
  const doc = parser.parseFromString(data, 'text/html');
  try {
    const productPrescriptionInput = document.querySelector('.new-toggle-prescription input');
    const newProductPrescriptionInput = doc.querySelector('.new-toggle-prescription input');
    productPrescriptionInput.replaceWith(newProductPrescriptionInput);
  
    const productPrescriptionSection = document.querySelector('.new-toggle-prescription section');
    const newProductPrescriptionSection = doc.querySelector('.new-toggle-prescription section');
    productPrescriptionSection.replaceWith(newProductPrescriptionSection);
    
    loadPrescription();
  } catch (error) {
    
  }
}

function sizeGuide(){
    
    const modal = document.getElementById("sizeGuideModal") || "";
    const triggerBtn = document.querySelector(".size-guide-modal-trigger") || "";
    const closeBtn = document.querySelector(".size-guide-modal__close") || "";
    
    triggerBtn.onclick = function() {
      modal.style.display = "block";
    }
    
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


  const modal1 = $("#sizeGuideModalDynamic") || "";
  const triggerBtn1 = $(".size-guide-modal-trigger--dynamic") || "";
  const closeBtn1 = $(".size-guide-modal__close--dynamic") || "";
  
  triggerBtn1.on('click', function () {
    modal1.show();
  })
  
  closeBtn1.on('click', function() {
    modal1.hide();
  })

  $(document).on('click', function(event) {
    if (event.target.id == modal1.attr('id')) {
      modal1.hide();
    }
  })
    
  }