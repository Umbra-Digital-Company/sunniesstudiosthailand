const faqAccordionItemElements = document.getElementsByClassName("faq-item");

for (const faqAccordionItemElement of faqAccordionItemElements) {
  faqAccordionItemElement.onclick = function () {
    const faqItemContent =
      faqAccordionItemElement.querySelector(".faq-item-content");
    const faqItemIcon = faqAccordionItemElement.querySelector(".faq-item-icon");

    const isOpen = faqItemContent.style.display === "block";
    faqItemContent.style.display = isOpen ? "none" : "block";
    faqItemIcon.src = !isOpen
      ? "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/Vector_1.svg?v=1665405625"
      : "https://cdn.shopify.com/s/files/1/0172/4383/2374/files/Vector_43ddc302-93b6-4847-bd71-abaff4585e9e.svg?v=1665404846";
  };
}
