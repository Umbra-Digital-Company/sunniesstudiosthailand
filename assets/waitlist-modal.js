const waitListModal = document.getElementById("waitlist_modal");

function openWaitlistModal(productId, variantData) {
  waitListModal.style.display = "flex";
  const isVariantDataObject = typeof variantData === "object";
  const variantId = isVariantDataObject
    ? variantData.getAttribute("data-variant-id")
    : variantData;
  initWaitlistModal(productId, +variantId);
}

function initWaitlistModal(productId, variantId) {
  const subscribeEmailCheckbox = document.getElementById(
    "subscribe_email_checkbox",
  );
  const iconEmailChecked = document.getElementById("icon_email_checked");
  const iconEmailUnchecked = document.getElementById("icon_email_unchecked");

  let isCheckBoxChecked = false;

  if (subscribeEmailCheckbox) {
    subscribeEmailCheckbox.onclick = function () {
      const isChecked =
        subscribeEmailCheckbox.classList.value.includes("icon-checked");
      if (isChecked) {
        subscribeEmailCheckbox.classList.remove("icon-checked");
        iconEmailChecked.style.display = "none";
        iconEmailUnchecked.style.display = "block";
        isCheckBoxChecked = false;
      } else {
        subscribeEmailCheckbox.classList.add("icon-checked");
        iconEmailChecked.style.display = "block";
        iconEmailUnchecked.style.display = "none";
        isCheckBoxChecked = true;
      }
    };
  }

  const waitListNotifyBtn = document.getElementById("notify_button");

  if (waitListNotifyBtn) {
    const waitListErrorMsg = document.getElementById("waitlist_error_msg");
    const waitListEmailInput = document.getElementById("waitlist_user_email");
    const subscribeEmailContainer = document.getElementById(
      "subscribe_email_container",
    );

    waitListNotifyBtn.onclick = function () {
      const userEmail = document.getElementById("waitlist_user_email").value;

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userEmail)) {
        waitListErrorMsg.innerText = "Please input a correct email address";
        waitListEmailInput.style.border = "1px solid #b76046";
        subscribeEmailContainer.style.margin = "22px 0 0 0";
        return;
      } else {
        waitListErrorMsg.innerText = "";
        waitListEmailInput.style.border = "1px solid #342a25";
        subscribeEmailContainer.style.margin = "48px 0 0 0";
      }
      BIS.create(userEmail, variantId, productId, {
        accepts_marketing: isCheckBoxChecked,
      }).then((res) => {
        const modalContent = document.getElementsByClassName(
          "waitlist_modal_content",
        )[0];
        modalContent.innerHTML = "";
        const closeBtn = `
          <span class="close" id="waitlist_modal_close" onClick="closeWaitListModal()">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.333374" y="19.9891" width="27.7974" height="2" rx="1" transform="rotate(-45 0.333374 19.9891)" fill="#352B27"/>
              <rect x="2.01111" y="0.333374" width="27.7974" height="2" rx="1" transform="rotate(45 2.01111 0.333374)" fill="#352B27"/>
              </svg>
          </span>
        `;

        if (res.status === "OK") {
          modalContent.innerHTML = `
            ${closeBtn}
            <h3 style="text-align: center">Done! You’re on the list.</h3>
            <p id="waitlist-done-sub-copy" style="text-align: center; margin-top: -3px;">We'll let you know when it's back in stock.</p>
            <div
              id="waitlist_continue_btn"
              style="margin: 40px 0 0 0"
              onClick="closeWaitListModal()">
              Continue shopping
            </div>
          `;
        } else {
          modalContent.innerHTML = `
            ${closeBtn}
            <h3 style="text-align: center;>Oops! There seems to be an error.</h3>
            <p style="text-align: center;>Please refresh the page and try again.</p>
          `;
        }
      });
    };
  }
}

function closeWaitListModal() {
  waitListModal.style.display = "none";
}
