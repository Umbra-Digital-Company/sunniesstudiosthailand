// Override Settings
var bcSfSearchSettings = {
  search: {
      //suggestionMode: 'test'
      //suggestionPosition: 'left'
  }
};

// Customize style of Suggestion box
BCSfFilter.prototype.customizeSuggestion = function(suggestionElement, searchElement, searchBoxId) {
  const productsHrefs = jQ('body').find('a[href^="//products"]');
  const productImages = jQ('body').find('.bc-sf-search-suggestion-wrapper ').find('img');

  if (productsHrefs.length > 0) {
    productsHrefs.each(function(){
      const $this = jQ(this);
      const  href = $this.attr('href');
      const reworkedHref = href.replace('//', '/');

      $this.attr('href', reworkedHref);
    }) 
  }

  if(productImages.length > 0) {
    productImages.each(function(){
      const $this = jQ(this);
      const parentContainer = $this.parent();
      const imageSrc = $this.attr('src');

      parentContainer.css({
        'background-image': `url(${imageSrc})`
      })
    })
  }
};
