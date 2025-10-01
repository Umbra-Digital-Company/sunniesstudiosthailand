const footerMenus = document.getElementsByClassName("footer-menu");

for (let menu of footerMenus) {
  const innerMenus = menu.querySelector("ul");
  const menuHeading = menu.querySelector(".footer-menu-heading");
  const plusIcon = menuHeading.querySelector("#plus-icon");
  const minusIcon = menuHeading.querySelector("#minus-icon");

  menuHeading.onclick = function (event) {
    event.preventDefault();

    const isClose = innerMenus.style.display === "none";

    innerMenus.style.display = isClose ? "block" : "none";

    if (isClose) {
      plusIcon.style.display = "none";
      minusIcon.style.display = "block";
    } else {
      plusIcon.style.display = "block";
      minusIcon.style.display = "none";
    }
  };

  for (let subLinks of innerMenus.children) {
    const subLinkTitle = subLinks?.querySelector("#sublink-dropdown-title");
    const dropdownMenus = subLinks?.querySelector(".sublink-dropdown-wrapper");

    if (subLinkTitle) {
      subLinks.onmouseleave = function () {
        dropdownMenus.style.display = "none";
      };

      subLinkTitle.onclick = function (event) {
        event.preventDefault();
        const isClose = dropdownMenus.style.display === "none";
        dropdownMenus.style.display = isClose ? "block" : "none";
      };
    }
  }
}
