// Change button text everytime easygift updates the button
const easygiftButtonObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
      if(mutation.target.textContent === 'Select'){   
		// Change button text
        modifyBtnText();
      }
	});
});

// Customize easygift modal when modal is in the dom or open
const easygiftObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(added_node) {
			if(added_node.id == 'aca-modal') {
                easygiftButtonObserver.observe(document.querySelector(".aca-product-button"),  { subtree: false, childList: true });
				customizeModal()
				// easygiftObserver.disconnect();
			}
		});
	});
});

const modifyBtnText = () => {
  const buttonEl = document.querySelector(".aca-product-button");
  if(!buttonEl.classList.contains('aca-product-out-of-stock-button')){
    buttonEl.innerHTML = "Add free gift";   
  }
}

const customizeModal = () => {

  //Change product title
  const productTitleEl = document.querySelector(".aca-product-name");
  const newProductTitle = `Congrats! ✨ You got a free<br> ${productTitleEl.textContent}.`
  productTitleEl.innerHTML = newProductTitle;

  //Add selector label
  const label = document.createElement('label')
  label.innerHTML = 'Pick a color:'
  const parentEl = document.querySelector('.aca-product')
  parentEl.insertBefore(label, document.querySelector('.aca-product-dropdown'))

  //Change button text
  modifyBtnText();

  const variantSelector = document.querySelector('.aca-product-variants').addEventListener('change',() => {
    //Change button text
    modifyBtnText();
  })

}
easygiftObserver.observe(document.querySelector("body"), { subtree: false, childList: true });

