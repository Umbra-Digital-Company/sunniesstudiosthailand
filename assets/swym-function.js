
if (!window.SwymCallbacks) window.SwymCallbacks = [];
window.SwymCallbacks.push(initSwymUI);

let swat;
let settings;
let sectionId;
let elements;

function initSwymUI(swatInstance) {
    swat = swatInstance;
    const wishlistElement = document.querySelector('.swymcs-custom-wishlist');
    settings = JSON.parse(wishlistElement.dataset.settings);
    sectionId = wishlistElement.dataset.sectionid;

    elements = {
        loader: wishlistElement.querySelector('#swymcs-wishlist-loader'),
        container: wishlistElement.querySelector('#swymcs-wishlist-container'),
        // listOptions: wishlistElement.querySelector('#swymcs-wishlist-list-options-container'),
        itemsContainer: wishlistElement.querySelector('#swymcs-wishlist-items-container'),
        emptyContainer: wishlistElement.querySelector('#swymcs-empty-wishlist-container'),
    };

    fetchWishlist();
}

function fetchWishlist() {
    showLoader();
    swat.fetchLists({
        callbackFn: (lists) => {
            lists = lists.reverse();
            const selectedList = lists[0];

            const currentListId = swat.swymCustomWishlistSelectedListId || lists[0]?.lid;
            swat.swymCustomWishlistSelectedListId = currentListId;

            renderList(selectedList.listcontents);
        },
        errorFn: (error) => console.error('Error while fetching all Lists', error),
    });
}

async function renderList(list) {
    elements.itemsContainer.innerHTML = '';
    if (list.length > 0) {
        const wishlistedProducts = await fetchProductData(list);
        wishlistedProducts.forEach(renderWishlistItem);
    }
    updateUIState(list);
    updateTotalProductCount(list.length);
}


async function fetchProductData(wishlist) {
    const productDataPromises = wishlist.map(async (listItem) => {
        const response = await fetch(`${listItem.du.split('?')[0]}.js`);
        listItem.productData = await response.json();
        return listItem;
    });
    return await Promise.all(productDataPromises);
}

async function fetchVariantImage(productUrl, variantId) {
    try {
        // Fetch the product data from Shopify's API
        const response = await fetch(`${productUrl}.json`);
        const productData = await response.json();

        const variant = productData.product.variants.find(v => v.id === variantId);

        if (variant) {
            const { image_id } = variant;

            const image = productData.product.images.find(img => img.id === image_id);

            if (image) {
                return image.src;
            }
        }

        return productData.product.featured_image;
    } catch (error) {
        console.error('Error fetching the variant image:', error);
        return
    }
}

async function renderWishlistItem(item) {
    const wishlistItem = document.createElement('div');
    wishlistItem.classList.add('swymcs-wishlistplus-item');
    wishlistItem.dataset.epi = item.epi;
    wishlistItem.dataset.empi = item.empi;
    wishlistItem.dataset.du = item.du;
    wishlistItem.dataset.sectionid = sectionId;

    const variantImage = await fetchVariantImage(item.du.split('?')[0], item.epi);
    const selectedVariant = item.productData.variants.find(variant => variant.id == item.epi);
    const isInCart = _swat.platform.isInDeviceCart(selectedVariant.id);
    const isPrescription = item.productData.tags && item.productData.tags.includes('prescription');
    const isSunniesFlask = item.productData.title && item.productData.title.includes('Sunnies Flask');
    const isVariantOutOfStock = !selectedVariant?.available; // Determine if the variant is out of stock

    const getButtonState = () => {
        if (isPrescription) {
            return 'Select lenses';
        }
        if (isSunniesFlask) {
            return 'Add to bag';
        }
        if (selectedVariant?.available) {
            return isInCart
                ? settings.swym_wishlist_item_cta_addedtocart
                : settings.swym_wishlist_item_cta_addtocart;
        } else {
            return 'Join the waitlist';

        }
    };

    const handleWaitlistActions = () => {
        const actionButton = wishlistItem.querySelector('.join-waitlist');
        const isJoinWaitlist = actionButton && actionButton.textContent.trim() === 'Join the waitlist';

        if (isJoinWaitlist) {
            const productId = item.productData.id; // Replace with actual product ID logic
            const currentVariantIdBcSf = selectedVariant.id; // Current variant ID
    
            // Add waitlist-specific attributes or actions
            actionButton.classList.add('join-the-waitlist-button');
            actionButton.setAttribute('onclick', `openWaitlistModal(${productId}, ${currentVariantIdBcSf})`);
        }
    }

    // Populate the wishlist item HTML
    wishlistItem.innerHTML = `
        <a href="${item.du}" class="swymcs-wishlist-image-container">
          <img src="${variantImage}" class="swymcs-wishlistplus-item-image" />
        </a>
        <div class="swymcs-wishlistplus-item-content">
          <a href="${item.du}" class="swymcs-wishlistplus-item-title">
            <div class="swymcs-wishlistplus-item-title-content">${item.dt}</div>
            ${settings.swym_wishlist_show_price ? `<div class="swymcs-product-final-price">${_swat.currency}${item.pr}</div>` : ''}
          </a>
          ${settings.swym_wishlist_show_variant ? `<div class="swymcs-wishlistplus-item-variant">${selectedVariant?.option1}</div>` : ''}
          <div class="swymcs-wishlist-action-container">
            ${settings.swym_wishlist_show_addtocart ? `<button class="swymcs-wishlist-add-to-cart-button ${isVariantOutOfStock ? 'join-waitlist' : ''} ${isSunniesFlask ? 'customize-flask-button desktop' : ''}" data-action="add-to-cart">${getButtonState()}</button>` : ''}
          </div>
        </div>
        ${settings.swym_wishlist_show_delete_item ? `<button id="swymcs-remove-productBtn" aria-label="Delete" class="swymcs-wishlistplus-item-remove"><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0C2.239 0 0 2.23669 0 4.99621C0 7.22381 0.875 12.5107 9.488 17.8551C9.64228 17.9499 9.8194 18 10 18C10.1806 18 10.3577 17.9499 10.512 17.8551C19.125 12.5107 20 7.22381 20 4.99621C20 2.23669 17.761 0 15 0C12.239 0 10 3 10 3C10 3 7.761 0 5 0Z" fill="#B44720"/>
        </svg>
        </button>` : ''}
              `;

    handleWaitlistActions(); // invoke waitlist function

    const addToCartButton = wishlistItem.querySelector('[data-action="add-to-cart"]');

    if (addToCartButton && addToCartButton.innerHTML === 'Join the waitlist') {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
        });
    } else if (addToCartButton) {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (isPrescription || isSunniesFlask) {
                window.location.href = item.du;
            } else {
                let button = event.target;
                let { empi, epi, du, qty } = item;
                let originalButtonState = button.innerHTML;
                button.innerHTML = settings.swym_wishlist_item_cta_addingtocart;

                swat.replayAddToCart(
                    { empi: empi, du: du, qty: qty }, epi,
                    (success) => {
                        button.innerHTML = settings.swym_wishlist_item_cta_addedtocart;
                        const variant = JSON.parse(success).items[0];
                        const productTitle = variant.title;
                        let successMessage = `${productTitle} has been added to cart!`;
                        showCustomNotification(successMessage, 'success');

                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                        fetchUpdate();
                    },
                    (error) => {
                        button.innerHTML = originalButtonState;
                        swat.ui.showErrorNotification({ message: error.description });
                    }
                );
            }
        });
    }

    function showCustomNotification(message, type) {
        let notificationContainer = document.getElementById('swym-notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'swym-notification-container';
            notificationContainer.style.position = 'fixed';
            notificationContainer.style.top = '20px';
            notificationContainer.style.left = '50%';
            notificationContainer.style.transform = 'translateX(-50%)';
            notificationContainer.style.zIndex = '1000';
            notificationContainer.style.width = 'auto';
            document.body.appendChild(notificationContainer);
    
            // Inject mobile-specific styles via a <style> tag
            const style = document.createElement('style');
            style.innerHTML = `
                @media (max-width: 430px) {
                    #swym-notification-container {
                        max-width: calc(100% - 32px);
                        left: 16px !important;
                        right: 16px !important;
                        transform: none !important;
                        width: 100%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    
        // Create a notification element
        const notification = document.createElement('div');
        notification.style.padding = '24px';
        notification.style.fontSize = '14px';
        notification.style.lineHeight = '20px';
        notification.style.fontFamily = 'AT Surt';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        notification.style.color = '#352b27';
        notification.style.backgroundColor = type === 'success' ? '#FFF' : '#000';
        notification.innerHTML = message;
    
        notificationContainer.appendChild(notification);
    
        // Automatically remove the notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    

    function fetchUpdate() {
        fetch('/cart/update.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'note': value
            })
          })
    }

    wishlistItem.querySelector('#swymcs-remove-productBtn')?.addEventListener('click', () => {
        let product = {
            epi: item.epi,
            empi: item.empi,
            du: item.du
        }
        _swat.deleteFromList(_swat.swymCustomWishlistSelectedListId, product, () => { fetchWishlist() }, (error) => console.error('Failed to remove from wishlist', error));
    });

    elements.itemsContainer.appendChild(wishlistItem);
}


function updateUIState(wishlist) {
    hideLoader();
    const emptyContainer = elements.emptyContainer;
    const wishlistContainer = elements.container;
    const wishlistEmpty = document.querySelector('#swym-wishlist-empty');
    // const wishlistMenu = document.querySelector('.swym-options-wrapper');

    if (wishlist.length > 0) {
        wishlistContainer.classList.remove('swymcs-hide-container');
        emptyContainer.classList.add('swymcs-hide-container');
        wishlistEmpty.classList.remove('swymcs-hide-container');
        // wishlistMenu.classList.remove('swymcs-hide-container');
    } else {
        emptyContainer.classList.remove('swymcs-hide-container');
        wishlistContainer.classList.add('swymcs-hide-container');
        wishlistEmpty.classList.add('swymcs-hide-container');
        // wishlistMenu.classList.add('swymcs-hide-container');
    }
}

async function renderList(list) {
    elements.itemsContainer.innerHTML = '';
    if (list.length > 0) {
        const wishlistedProducts = await fetchProductData(list);
        wishlistedProducts.forEach(renderWishlistItem);
    }
    updateUIState(list);
    updateTotalProductCount(list.length);
}

function showLoader() {
    elements.loader.classList.remove('swymcs-hide-container');
}

function hideLoader() {
    elements.loader.classList.add('swymcs-hide-container');
}

function updateTotalProductCount(count) {
    const totalProductsElement = document.getElementById('swymcs-total-products');
    if (totalProductsElement) {
        totalProductsElement.textContent = `(${count})`;
    }
}

// Sorting
document.addEventListener('DOMContentLoaded', function () {
    const sortingDropdown = document.getElementById('sorting-dropdown');

    sortingDropdown.addEventListener('change', function (event) {
        const selectedOption = event.target.value;
        sortWishlistItems(selectedOption);
    });

    function sortWishlistItems(option) {
        const itemsContainer = document.getElementById('swymcs-wishlist-items-container');
        const items = Array.from(itemsContainer.querySelectorAll('.swymcs-wishlistplus-item'));

        let sortedItems;

        // Sorting logic
        if (option === 'price-low-high') {
            sortedItems = items.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.swymcs-product-final-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.swymcs-product-final-price').textContent.replace('$', ''));
                return priceA - priceB;
            });
        } else if (option === 'price-high-low') {
            sortedItems = items.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.swymcs-product-final-price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.swymcs-product-final-price').textContent.replace('$', ''));
                return priceB - priceA;
            });
        } else if (option === 'name-asc') {
            sortedItems = items.sort((a, b) => {
                const nameA = a.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                const nameB = b.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                return nameA.localeCompare(nameB);
            });
        } else if (option === 'name-desc') {
            sortedItems = items.sort((a, b) => {
                const nameA = a.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                const nameB = b.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                return nameB.localeCompare(nameA);
            });
        } else if (option === 'featured') {
            sortedItems = items.sort((a, b) => {
                const nameA = a.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                const nameB = b.querySelector('.swymcs-wishlistplus-item-title').textContent.trim();
                return nameB.localeCompare(nameA);
            });
        } else {
            sortedItems = items;
        }

        sortedItems.forEach(item => itemsContainer.appendChild(item));
    }
});