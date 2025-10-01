const vtoModal = document.querySelector('.vto-product-modal');
const vtoModalWrapper = document.querySelector('.modal-container');
const modalClose = document.querySelector('.modal-close');
const modalOpen = document.querySelector('.browse-cta');
const tryCounter = document.querySelector('#try-counter');
const modalProductCard = document.querySelectorAll('.modal-product-container > .item-frames__image');
const vtoProductCardContainer = document.querySelector('.item-frames');
let vtoProductCard = document.querySelectorAll('.item-frames .item-frames__image')
const collectionNames = document.querySelectorAll('.vto-modal-collection-title');
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
let productArray = [];
const tryBtn = document.querySelector('#try-btn');
let allowAdd = true;
const slideWrapper = document.createElement('div');
const dot1 = document.createElement('button');
const dot2 = document.createElement('button');
const dot3 = document.createElement('button');
const dotContainer = document.createElement('div');
let slide1 = "";
let slide2 = "";
let slide3 = "";

let slide1Rect = "";
let slide2Rect = "";
let slide3Rect = "";

let slideWrapperRect;

dotContainer.classList.add('dot-indicator-wrapper');


vtoModal.addEventListener('click', function(e){
    if(!vtoModalWrapper.contains(e.target)){
        vtoModal.classList.toggle('modal-hidden');
    }
});
modalOpen.addEventListener('click', function(){
    vtoModal.classList.toggle('modal-hidden');
});
modalClose.addEventListener('click', function(){
    vtoModal.classList.toggle('modal-hidden');
});

slideWrapper.addEventListener('scroll', () =>{

    slideWrapperRect = slideWrapper.getBoundingClientRect();

    slide1Rect = slide1.getBoundingClientRect()
    // console.log("Slide 1  ==  " + slide1Rect.x);
    
    slide2Rect = slide2.getBoundingClientRect();
    // console.log("Slide 2  ==  " + slide2Rect.x);

    slide3Rect = slide3.getBoundingClientRect();
    // console.log("Slide 3  ==  " + slide3Rect.x);


    if(slide2Rect.x > ((slideWrapperRect.x) + slideWrapperRect.width)/2 ){
        dot1.setAttribute('active',"")
        dot2.removeAttribute('active')
        dot3.removeAttribute('active')
    }
    else if(slide2Rect.x < ((slideWrapperRect.x) + slideWrapperRect.width)/2 && slide2Rect.x > (slideWrapperRect.width - (slideWrapperRect.width * 1.5))){
        dot2.setAttribute('active',"")
        dot1.removeAttribute('active')
        dot3.removeAttribute('active')
    }
    else if(slide2Rect.x < (slideWrapperRect.width - slideWrapperRect.width)/2){
        dot3.setAttribute('active',"")
        dot2.removeAttribute('active')
        dot1.removeAttribute('active')
    }

    hideCarouselButton();
 });



// load chosen products
if((JSON.parse(sessionStorage.getItem('products')) || []).length > 0){
    document.querySelector('.item-frames').innerHTML = null;
    renderProductsToPage();
}

// function to render product card from storage
function renderProductsToPage(){
    
    let size = (JSON.parse(sessionStorage.getItem('products')) || []).length;
    let products = JSON.parse(sessionStorage.getItem('products')) || [];

    for(let ctr = 0; ctr < size; ctr++){



        let container = document.querySelector('.item-frames');

        let div = document.createElement('div');
        div.setAttribute('class',"item-frames__image");
        div.setAttribute('data-collection',products[ctr].collection)
        let element = `<input type="radio" name="ditto_frame" id="dittoFrame${products[ctr].index}" data-variant-sku="${products[ctr].sku}" data-variant-id="${products[ctr].variantID}">
        <label for="dittoFrame${products[ctr].index}" class="js-product-item product-item">
          <div class="product-item__inner">
            <div class="product__image">
              <span data-bg-src="${products[ctr].image}" data-image-variant="${products[ctr].variantName}" style="background-image: url(${products[ctr].image});" class="current-image-variant"></span>
            </div>
          </div>
        </label>
        <h5>${products[ctr].name}</h5>
        <div class="variant-name">${products[ctr].variantName}</div>
        <form class="su-an" method="post" action="/cart/add">
        <input
        name="id"
        value="${products[ctr].variantID}"
        type="hidden" />
        <input
        name="add"
        value="Add to bag"
        type="submit"
        class="btn" />
        </form>
        <a href="${products[ctr].link}" class="btn op-re" data-bss-pl="active">Select lenses</a>`
        
        div.innerHTML = element;
        container.appendChild(nextButton);
      container.appendChild(prevButton);
        container.append(div);

    }
}


vtoProductCard = document.querySelectorAll('.item-frames > .item-frames__image')

// add product choice
for (var i=0; i < modalProductCard.length;i++){
        modalProductCard[i].addEventListener('click', function(e){
            
    if(updateSelectedProductCounter() < 12){
            
        if(this.getAttribute('chosen') == null){

            this.toggleAttribute('chosen');
            this.setAttribute('product-index', updateSelectedProductCounter().toString());
        }else{
            let temp = 1;
            
            this.toggleAttribute('chosen');
            this.removeAttribute('product-index');
            for(var resetIndex = 0; resetIndex < modalProductCard.length ; resetIndex++){
                if(modalProductCard[resetIndex].getAttribute('chosen') != null){
                    modalProductCard[resetIndex].setAttribute('product-index', (temp).toString());
                    console.log("Temp " + temp);
                    temp++;
                }
            }
            
        }

            tryCounter.innerHTML = updateSelectedProductCounter();
        }
        else{
            this.removeAttribute('chosen');
            this.removeAttribute('product-index');
            tryCounter.innerHTML = updateSelectedProductCounter();
        }
        });

}

// add collection filter
for(var i = 0; i < collectionNames.length; i++){
    collectionNames[i].addEventListener('click',function(e){
        vtoModalWrapper.setAttribute('filter', this.innerHTML.trim());
    })
}

function updateSelectedProductCounter(){
    let tcounter = 0;
    for(var ctr = 0; ctr < modalProductCard.length; ctr++){
        if(modalProductCard[ctr].getAttribute('chosen')==""){
            tcounter = tcounter + 1;
        }
    }
    return tcounter;
}

// add attributes to storage to render in VTO products
function addAttributesToStorage(productIndex, productName, productVariantName, productVariantID, productCollection, productImage, productSKU, productLink){
        let product = {
            index : productIndex,
            name : productName,
            variantName : productVariantName,
            variantID : productVariantID,
            collection : productCollection,
            image : productImage,
            sku : productSKU,
            link : productLink
        }

        let items = [];
        items = JSON.parse(sessionStorage.getItem('products')) || [];
        items.push(product);
        sessionStorage.setItem('products', JSON.stringify(items));
}

// Try them on button click listener
tryBtn.addEventListener('click', function(){
    allowAdd = false;
    for(var p = 0; p < modalProductCard.length ; p++){
        if(p == 0){
        sessionStorage.removeItem('products')
        }

        if(modalProductCard[p].getAttribute('chosen') != null){
            
            addAttributesToStorage(
                modalProductCard[p].getAttribute('product-index').toString(),
                modalProductCard[p].getAttribute('data-name').toString(),
                modalProductCard[p].getAttribute('data-variant-name').toString(),
                modalProductCard[p].getAttribute('data-variant-id').toString(),
                modalProductCard[p].getAttribute('data-collection').toString(),
                modalProductCard[p].getAttribute('data-bg-src').toString(),
                modalProductCard[p].getAttribute('data-variant-sku').toString(),
                modalProductCard[p].getAttribute('data-product-link').toString()
            )
        }
    }
    location.href="/pages/virtual-try-on?select=true#dittoDisplay";
  location.reload();
    location.href="/pages/virtual-try-on?select=true#dittoDisplay";
});


// add cards to carousel slide
// window.addEventListener("load", (event) => {
if((vtoProductCard.length) > 4){
    let index = 0

    vtoProductCardContainer.classList.add('carousel');
    slideWrapper.classList.add('slide-wrapper');

    const slide_1 = document.createElement('div');
    const slide_2 = document.createElement('div');
    const slide_3 = document.createElement('div');

    slide_1.setAttribute('class','slide-item slide-1');
    slide_1.setAttribute('data-slide-index','1');
    slide_2.setAttribute('class','slide-item slide-2');
    slide_2.setAttribute('data-slide-index','2');
    slide_2.setAttribute('class','slide-item slide-2');
    slide_3.setAttribute('data-slide-index','3');
    slide_3.setAttribute('class','slide-item slide-3');

    dot1.setAttribute('class','slide-dot');
    dot1.setAttribute('id', 'slide-dot-1');
    dot2.setAttribute('class','slide-dot');
    dot2.setAttribute('id', 'slide-dot-2');
    dot3.setAttribute('class','slide-dot');
    dot3.setAttribute('id', 'slide-dot-3');

    const left = document.createElement('button');
    const right = document.createElement('button');
    left.setAttribute('class', 'slide-arrow');
    left.setAttribute('id','slide-arrow-prev');
    left.innerHTML = ` <svg viewBox="395.246 271.151 19.2 16.8" width="19.2" height="16.8">
        <path d="M 406.046 287.951 L 414.446 279.551 L 406.046 271.151 M 414.446 279.551 L 395.246 279.551" stroke="#352B27" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="fill: rgba(0, 0, 0, 0); transform-origin: 404.846px 279.551px;" transform="matrix(-1, 0, 0, -1, 0, 0)"></path>
    </svg>`
    right.setAttribute('class', 'slide-arrow')
    right.setAttribute('id','slide-arrow-next');
    right.innerHTML= `<svg viewBox="395.246 271.151 19.2 16.8" width="19.2" height="16.8">
    <path d="M 395.246 279.551 L 414.446 279.551 M 406.046 271.151 L 414.446 279.551 L 406.046 287.951" stroke="#352B27" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="fill: rgba(0, 0, 0, 0);"></path>
  </svg>`;

    for(var x = 0; x < vtoProductCard.length; x++){
        
        if(index == 0){
            dotContainer.append(dot1)
            if((x+1) % 4 == 0){
                slide_1.append(vtoProductCard[x]);
                index++;
            }
            else{
                slide_1.append(vtoProductCard[x]);
            }
        }
        else if(index == 1 ){
            dotContainer.append(dot2)
            if((x+1) % 4 == 0){
                slide_2.append(vtoProductCard[x]);
                index++;
            }
            else{
                slide_2.append(vtoProductCard[x]);
            }

        }else if(index == 2 ){
            dotContainer.append(dot3);
            slide_3.append(vtoProductCard[x]);

        }
    }

    slideWrapper.append(slide_1);
    slideWrapper.append(slide_2);
    slideWrapper.append(slide_3);

    vtoProductCardContainer.append(slideWrapper);
    vtoProductCardContainer.append(dotContainer);
    // vtoProductCardContainer.prepend(right);
    // vtoProductCardContainer.prepend(left);

    const slidesContainer = document.getElementById("slides-container");
    const slide = document.querySelector(".slide-item");

    nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slideWrapper.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slideWrapper.scrollLeft -= slideWidth;
    });
    dot1.addEventListener('click', () =>{
        slideWrapper.querySelectorAll('[data-slide-index="1"]')[0].scrollIntoView({behavior: 'smooth',  block: 'nearest', inline: 'center' }, true);

    })
    dot2.addEventListener('click', () =>{
        slideWrapper.querySelectorAll('[data-slide-index="2"]')[0].scrollIntoView({behavior: 'smooth',  block: 'nearest', inline: 'center' }, true);
        
    })
    dot3.addEventListener('click', () =>{
        slideWrapper.querySelectorAll('[data-slide-index="3"]')[0].scrollIntoView({behavior: 'smooth',  block: 'nearest', inline: 'center' }, true);
        
    })

    
    slide1 = document.querySelectorAll('[data-slide-index="1"]')[0];
    slide2 = document.querySelectorAll('[data-slide-index="2"]')[0];
    slide3 = document.querySelectorAll('[data-slide-index="3"]')[0];

    slideWrapperRect = slideWrapper.getBoundingClientRect();

    slide1Rect = slide1.getBoundingClientRect()
    // console.log("Slide 1  ==  " + slide1Rect.x);
    
    slide2Rect = slide2.getBoundingClientRect();
    // console.log("Slide 2  ==  " + slide2Rect.x);

    slide3Rect = slide3.getBoundingClientRect();
    // console.log("Slide 3  ==  " + slide3Rect.x);

    
    dot1.setAttribute('active',"");
    hideCarouselButton();
}
// });

function hideCarouselButton(){
    if(document.querySelectorAll('.slide-dot').length == 2){
        if(slideWrapperRect.x == slide2Rect.x){
            nextButton.style.display = 'none';
            prevButton.style.display = 'flex';
        }else if(slideWrapperRect.x == slide1Rect.x){
            prevButton.style.display = 'none';
            nextButton.style.display = 'flex';
        }
        else{
            nextButton.style.display = 'flex';
            
            prevButton.style.display = 'flex';
        }
    }else if(document.querySelectorAll('.slide-dot').length == 3){
        if(slideWrapperRect.x == slide3Rect.x){
            nextButton.style.display = 'none';
        }else if(slideWrapperRect.x == slide1Rect.x){
            prevButton.style.display = 'none';
        }
        else{
            nextButton.style.display = 'flex';
            
            prevButton.style.display = 'flex';
        }
    }
}

// add script for frames select
const radios = document.querySelectorAll('[name=ditto_frame]');
for(var r = 0; r < radios.length; r++){
    radios[r].addEventListener('click', function(e){
        for(var x = 0; x < radios.length; x++){
            radios[x].parentElement.removeAttribute('checked');
        }

        this.parentElement.setAttribute('checked','');

    });
}
window.addEventListener('load', () => {
  document.querySelectorAll('.item-frames__image')[0].querySelector('label').click();
});


  let sizeBool = (JSON.parse(sessionStorage.getItem('products')) || []).length
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const select = urlParams.get('select')

  window.addEventListener('load', () => {
    document.querySelectorAll('.item-frames__image')[0].querySelector('label').click();
    
    let sizeBool = (JSON.parse(sessionStorage.getItem('products')) || []).length
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const select = urlParams.get('select')
  
    if(select == 'true' && sizeBool > 0){
    
      setTimeout(() => {
        document.querySelector('#dittoWrapper').style.display = 'block';
        document.querySelector('#startDitto').click();
      }, 50)

    
    }
  });
  
  
  if(select == 'true' && sizeBool > 0){
    document.querySelector('#dittoWrapper').style.display = 'none'
    
}
