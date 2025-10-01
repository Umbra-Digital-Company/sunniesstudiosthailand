const blackFridayModal = document.getElementById("black_friday_modal");

function openBlackFridayModal() {
  blackFridayModal.style.display = "flex";
  initBlackFridayModal();
}

function initBlackFridayModal() {
  const blackFridayNotifyBtn = document.getElementById("black_friday_notify_button");

  if (blackFridayNotifyBtn) {
    const blackFridayErrorMsg = document.getElementById("black_friday_error_msg");
    const blackFridayEmailInput = document.getElementById("black_friday_user_email");
    const subscribeEmailContainer = document.getElementById("subscribe_email_container");

    blackFridayNotifyBtn.onclick = function () {
      const userEmail = document.getElementById("black_friday_user_email").value;

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userEmail)) {
        blackFridayErrorMsg.innerText = "Please input a correct email address";
        blackFridayEmailInput.style.border = "1px solid #b76046";
        subscribeEmailContainer.style.margin = "22px 0 0 0";
        return;
      } else {
        blackFridayErrorMsg.innerText = "";
        blackFridayEmailInput.style.border = "1px solid #342a25";
        subscribeEmailContainer.style.margin = "48px 0 0 0";
      }
      zaius.subscribe({ list_id: "newsletter", email: userEmail });

      const [modalContent] = $(".black_friday_modal_content");
      modalContent.innerHTML = "";
      modalContent.innerHTML = `
        <span class="close" id="black_friday_modal_close" onClick="closeBlackFridayModal()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" viewBox="0 0 20 20">
          <path d="M15.89 14.696l-4.734-4.734 4.717-4.717c.4-.4.37-1.085-.03-1.485s-1.085-.43-1.485-.03L9.641 8.447 4.97 3.776c-.4-.4-1.085-.37-1.485.03s-.43 1.085-.03 1.485l4.671 4.671-4.688 4.688c-.4.4-.37 1.085.03 1.485s1.085.43 1.485.03l4.688-4.687 4.734 4.734c.4.4 1.085.37 1.485-.03s.43-1.085.03-1.485z" fill="#a7a194" />
          </svg>
        </span>

        <h3 style="text-align: center">DONE! YOU'RE ON THE LIST.</h3>

        <p id="black_friday-done-sub-copy" style="text-align: center; margin-top: -3px;">
          Keep an eye out for our Black Friday Sale promo code in your inbox!
        </p>
        <div
          id="black_friday_continue_btn"
          style="margin: 40px 0 0 0"
          onClick="closeBlackFridayModal()">
          DONE
        </div>
      `;
    };
  }
}

function closeBlackFridayModal() {
  blackFridayModal.style.display = "none";
}

$("#black_friday_modal").on("click", function (evt) {
  if (evt.target !== evt.currentTarget) return;
  closeBlackFridayModal();
});
