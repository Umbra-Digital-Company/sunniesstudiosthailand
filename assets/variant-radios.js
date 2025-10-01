class VariantRadios extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {

    this.updateOptions();
    this.updateMasterId();
    

    try{
    this.fetchProductDetails(this.getSelectedVariantURL());
    }
    catch(error){
      
    }
    document.querySelector('#sunnies-flask') ? '' : (this.redirectURL(), this.disableButton());
  }

  disableButton(){
    try{
      document.querySelector('.product-details .Product__header form button').setAttribute('disabled','');
    }catch(error){

    }
  }

  async fetchProductDetails(url) {
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
  
        this.updateProductDetails(data);
        this.updateGallery(data);
        // updatePrescription(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  updateGallery(data){
    const productGallery = document.querySelectorAll('.product-gallery-swipper');
    const doc = parser.parseFromString(data, 'text/html');
    const newProductGallery = doc.querySelectorAll('.product-gallery-swipper');
    productGallery.forEach((element, index) => {
      element.replaceWith(newProductGallery[index]);
    })
  
    document.querySelector('#product-gallery-container').setAttribute('data-product-sku', doc.querySelector('#product-gallery-container').getAttribute('data-product-sku'));
    loadGallerySwiper();
    initializeVTOGallerySwiper()
  }

  updateProductDetails(data){
      const doc = parser.parseFromString(data, 'text/html');
      if(!document.querySelector('#sunnies-flask')){
        const productDetailsHeader = document.querySelector('.product-details .Product__header form');
        const newProductDetailsHeader = doc.querySelector('.product-details .Product__header form');
        productDetailsHeader.replaceWith(newProductDetailsHeader);
      }
      else{
        const variantRadios = document.querySelector('variant-radios fieldset.swatch');
        const newvariantRadios = doc.querySelector('variant-radios fieldset.swatch');
        variantRadios.replaceWith(newvariantRadios);
      }

    const productPrice = document.querySelector('#product-price');
    const newproductPrice = doc.querySelector('#product-price');
    productPrice.replaceWith(newproductPrice);

    try {
      const optionName = document.querySelector('#option_name');
      const optionColor = document.querySelector('#option_color');
      optionName.innerText = document.querySelector('body').id.includes('flask') || document.querySelector('body').id.includes('boot') || document.querySelector('body').id.includes('bottle') || document.querySelector('body').id.includes('pebble-cap') || document.querySelector('body').id.includes('loop') ? this.getCurrentVariantSize() : this.getCurrentVariantSize() + ' | ';
      optionColor.innerText = document.querySelector('body').id.includes('flask') || document.querySelector('body').id.includes('boot') || document.querySelector('body').id.includes('bottle') || document.querySelector('body').id.includes('pebble-cap') || document.querySelector('body').id.includes('loop') ? ': ' + this.getCurrentVariantColor() : this.getCurrentVariantColor();
      
    } catch (error) {
      console.error(error);
    }
    
    const productImage = document.querySelector('.desktop-product-vto-container');
    const newProductImage= doc.querySelector('.desktop-product-vto-container');
    productImage.replaceWith(newProductImage);
    
    document.querySelector('body').id.includes('flask') || document.querySelector('body').id.includes('bottle') || document.querySelector('body').id.includes('pebble-cap') || document.querySelector('body').id.includes('loop') ? '' : this.sizeGuide();
  }

  sizeGuide() {
    try {
      const modal = document.getElementById("sizeGuideModal") || "";
      const triggerBtn = document.querySelector(".size-guide-modal-trigger") || "";
      const closeBtn = document.querySelector(".size-guide-modal__close") || "";

      triggerBtn.onclick = function () {
        modal.style.display = "block";
      }

      closeBtn.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    } catch (error) {

    }


    const modal1 = $("#sizeGuideModalDynamic") || "";
    const triggerBtn1 = $(".size-guide-modal-trigger--dynamic") || "";
    const closeBtn1 = $(".size-guide-modal__close--dynamic") || "";

    triggerBtn1.on('click', function () {
      modal1.show();
    })

    closeBtn1.on('click', function () {
      modal1.hide();
    })

    $(document).on('click', function (event) {
      if (event.target.id == modal1.attr('id')) {
        modal1.hide();
      }
    })

  }

  

  getSelectedVariantURL(){
    // console.log(`${this.dataset.url}?variant=${ this.currentVariant ? this.currentVariant.id : this.fallbackOption.id}`)
    return `${this.dataset.url}?variant=${ this.currentVariant ? this.currentVariant.id : this.fallbackOption.id}`;
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
    // console.log(this.options);
  }

  updateMasterId() {
    
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });


    this.fallbackOption = this.getVariantData().find((variant) => {
      return variant.options.map((option, index) => {
        // console.log(this.options[1], this.options, option, index, option === this.options[1]);
        return option === this.options[1];
      }).includes(true); 
    });
    
    // console.log('fallback',this.fallbackOption)
  }

  redirectURL() {
    if (!this.currentVariant && !this.fallbackOption) return;
    // window.location.href = `${this.dataset.url}?variant=${ this.currentVariant ? this.currentVariant.id : this.fallbackOption.id}`;
    history.pushState({}, '', `${this.dataset.url}?variant=${ this.currentVariant ? this.currentVariant.id : this.fallbackOption.id}`);
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    // console.log(this.variantData)
    return this.variantData;
  }

  getCurrentVariantID(){
     return this.currentVariant.id
  }
  getCurrentVariantSize(){
    return this.currentVariant.option2
 }
 getCurrentVariantColor(){
    return this.currentVariant.option1
  }
}

customElements.define('variant-radios', VariantRadios);
