document.addEventListener('DOMContentLoaded', function () {
  let searchField;

  if (window.innerWidth <= 768) {
    searchField = document.querySelector('.mobileSearchField .search-form #searchField');
  } else {
    searchField = document.querySelector('.desktopSearchField .search-form #searchField');
  }
  const searchTitle = document.querySelector('.search-main-title');
  const searchIdentify = document.querySelector('.search-identify');
  const searchTermHide = document.querySelector('.search-term-hide');
  const searchCollectionPrompt = document.querySelector('.search-collection-prompt');
  const sectionSearchResults = document.querySelector('.section-search-results');
  const sectionFeaturedProducts = document.querySelector('.section-featured-products .shell');
  const productCard = document.querySelector('.product-card');
  const productDescription = productCard.getAttribute('data-product-description');
  const descriptionElement = document.querySelector('.search-information-description span');
  const mainSearchItem = document.querySelector('.main-search-items');

  // Search word to be hidden
  const hiddenTerms = ['sun', 'sunnies flask', 'new in', 'optical'];

  function getProductCollections() {
    const productCard = document.querySelector('.product-card');
    const collectionsData = productCard.getAttribute('data-product-collection');

    if (collectionsData) {
      try {
        const cleanedData = collectionsData.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        return cleanedData;
      } catch (error) {
        console.error('Failed to parse collections data:', error);
        return [];
      }
    }

    return [];
  }

  function storeProductCollections(collections) {
    const storedCollections = retrieveProductCollections();
    if (JSON.stringify(storedCollections) !== JSON.stringify(collections)) {
      localStorage.setItem('lastProductCollections', JSON.stringify(collections));
    }
  }

  function retrieveProductCollections() {
    const collections = localStorage.getItem('lastProductCollections');
    if (collections) {
      try {
        return JSON.parse(collections);
      } catch (error) {
        console.error('Failed to parse collections from local storage:', error);
        return [];
      }
    }

    return [];
  }

  function populateSearchCollections() {
    const collections = getProductCollections();
    console.log('Collections:', collections);

    searchCollectionPrompt.innerHTML = '';

    if (collections.length === 0) {
      searchCollectionPrompt.innerHTML = '<span>No collections available</span>';
      return;
    }

    // Filter to show only Sun and Optical collections
    const filteredCollections = collections.filter(collection =>
      collection === 'Sun'
      || collection === 'Optical'
      || collection === 'Torts'
      || collection === 'Eyewear'
      || collection === 'Regular Frames'
    );

    if (filteredCollections.length === 0) {
      searchCollectionPrompt.innerHTML = '<span>No matching collections available</span>';
      return;
    }

    filteredCollections.forEach(function (collection) {
      const collectionSpan = document.createElement('span');
      collectionSpan.textContent = collection;
      searchCollectionPrompt.appendChild(collectionSpan);
    });

    storeProductCollections(filteredCollections);
  }

  function populateProductInformation() {
    if (productDescription) {
      descriptionElement.textContent = productDescription;
    } else {
      descriptionElement.textContent = 'No product information available';
    }
  }

  function storeSearchTitle(title) {
    localStorage.setItem('searchTitle', title);
  }
  
  function storeSearchTerm(searchTerm) {
      localStorage.setItem('lastSearchTerm', searchTerm);
  }

  function retrieveSearchTerm() {
      return localStorage.getItem('lastSearchTerm') || '';
  }

  function getProductCardCount() {
    return document.querySelectorAll('.main-search-items .product-card').length;
  }

  function getProductCardCountResult() {
    return document.querySelectorAll('.main-search-items .search-result').length;
  }

  function populateSearchResult() {
    const searchTerm = retrieveSearchTerm().trim();
    const productCardCount = getProductCardCount();

    const newTitle = searchTerm
    ? `“${searchTerm}” <span class="search-title-gray">(${productCardCount})</span>`
    : 'Please search again.';
    searchTitle.innerHTML = newTitle;
    storeSearchTitle(newTitle);

    if (getProductCardCount() > 0) {
      document.querySelector('.section-featured-settings').style.display = 'none';
    } else if (getProductCardCount() === 0) {
      document.querySelector('.search-info-collect-wrapper').style.display = 'none';
      searchTitle.innerHTML = `No search found for “${searchTerm}”`;
      sectionSearchResults.style.padding = '153px 0 0';
      sectionFeaturedProducts.style.padding = '0px 40px';
      mainSearchItem.style.padding = '20px 16px';
    }

    populateProductInformation();
    // Additional operations
    const dataFromTitle = document.querySelector('.title-wrapper > div > h3')?.textContent.trim();
    const identifyText = dataFromTitle.trim();

    const abbreviations = [
      { abbr: 'fl', value: 'Sunnies Flask', description: 'A 25oz, double-walled insulated water bottle made if stainless steel designed to make hydration a more enjoyable experience. <a href="/products/sunnies-flask?variant=40526024048758" style="text-decoration: underline; color: #352b27;">Read more</a>' },
      { abbr: 'sunn', value: 'Sunnies Flask', description: 'A 25oz, double-walled insulated water bottle made if stainless steel designed to make hydration a more enjoyable experience. <a href="/products/sunnies-flask?variant=40526024048758" style="text-decoration: underline; color: #352b27;">Read more</a>' },
      { abbr: 'su', value: 'Sun', description: 'Equipped with lenses that block 100% of UVA and UVB rays' },
      { abbr: 'op', value: 'Optical', description: 'Equipped with multi-coated lenses that give you clear, comfortable vision.' },
      { abbr: 'me', value: 'Merch', description: 'Eyewear essentials and must-haves.' },
      { abbr: 'bo', value: 'Bottle', description: 'A 25oz, double-walled insulated water bottle made if stainless steel designed to make hydration a more enjoyable experience. <a href="/products/sunnies-flask?variant=40526024048758" style="text-decoration: underline; color: #352b27;">Read more</a>' }
    ];
    
    let found = false;
    for (let item of abbreviations) {
      if (searchTerm.toLowerCase().includes(item.abbr)) { // Partial match on abbr
        searchIdentify.innerHTML = item.value;
        descriptionElement.innerHTML = item.description;
        found = true;
        break;
      }
      if (searchTerm.toLowerCase().includes(item.value.toLowerCase())) { // Partial match on value
        searchIdentify.innerHTML = item.value;
        descriptionElement.innerHTML = item.description;
        found = true;
        break;
      }
    }
    
    if (!found) {
      searchIdentify.innerHTML = dataFromTitle;
    }    

    if (searchTerm && searchIdentify) {
        console.log('searchTitle:', searchTerm);
        console.log('searchIdentify:', identifyText);

        // Preserve your existing rule
        if (searchTerm === identifyText) {
            searchTermHide.style.display = 'none';
        } else {
            searchTermHide.style.display = 'block';
        }

        // Additional rule: Check if searchTerm matches any hidden term (case-insensitive)
        const searchTermLower = searchTerm.toLowerCase(); // Fix: Using searchTerm here
        if (hiddenTerms.includes(searchTermLower)) {
            searchTermHide.style.display = 'none';
        }
    }
    
    populateSearchCollections();
  }

  // Set up the input listener to update and store the title dynamically
  searchField.addEventListener('input', function () {
    const searchTerm = searchField.value.trim();
    storeSearchTerm(searchTerm);

    // Update the search title immediately as user types
    const newTitle = searchTerm ? `“${searchTerm}”` : 'Please search again.';
    searchTitle.innerHTML = newTitle;
    storeSearchTitle(newTitle);
  });

  // Handle Enter key press to populate results
  searchField.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
          const searchTerm = searchField.value.trim();
          storeSearchTerm(searchTerm);
          populateSearchResult();
      }
  });

  setTimeout(() => {
    populateSearchResult();
  }, 200);
});
