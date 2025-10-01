const reviewsNavlinkEl = $('#reviews-navlink');
const qandaNavlinkEl = $('#qanda-navlink');
const qandaSortButton = $('#qanda-sort-button');
const qandaSortDropdown = $('#qanda-sort-dropdown');
const qandaFiltersContainerEl = $(".qanda-filters-container");
const reviewsQandaContainerEl = $(".product-reviews-container");
const reviewsStarsEl = $("#review-stars-container");
const qandaStarsEl = $("#qanda-stars-container");
const qandaTotalCountEl = $("#qanda-count");
const qandaTotalCountLabelEl = $("#qanda-count + span");
const qandaContentEl = $(".qanda-content .product-reviews-body");
const qandaEmptyContentEl = $(".qanda-content #empty-product-reviews");
const qandaPagination = $("#qanda-current-page").closest(".product-review-pagination");
const qandaCurrentPageEl = $("#qanda-current-page");
const qandaTotalPageEl = $("#qanda-total-page");
const qandaNextButton = $("#qanda-next-button");
const qandaPrevButton = $("#qanda-prev-button");
const qandaListEl = $(".qanda-content .product-reviews-body .qanda-list");
const askAQuestionModal = $("#ask-a-question-modal");
const askAQuestionModalHeading = $("#ask-a-question-modal h4");
const askAQuestionButton = $("#ask-a-question-button");
const askAQuestionLink = $("#ask-a-question-link");
const askAQuestionCloseButton = $("#ask-a-question-close-button");
const askAQuestionSubmitButton = $("#ask-a-question-submit-button");
const askAQuestionQuestionInput = $("#ask-a-question-question-input");
const askAQuestionNameInput = $("#ask-a-question-name-input");
const askAQuestionEmailInput = $("#ask-a-question-email-input");
const askAQuestionInputs = $(".ask-a-question-input");
const showOnSuccessEl = $('.show-on-success');
const hideOnSuccessEl = $('.hide-on-success');
const showOnErrorEl = $('.show-on-error');
const hideOnErrorEl = $('.hide-on-error');

const _productId = reviewsQandaContainerEl.data("productId").toString();
const _productTitle = reviewsQandaContainerEl.data("productTitle");
const _productUrl = reviewsQandaContainerEl.data("productUrl");
let questionsTotalCount = 0;

reviewsNavlinkEl.click(function(){
  reviewsQandaContainerEl.addClass('reviews-active'); 
  reviewsQandaContainerEl.removeClass('qanda-active'); 
})
qandaNavlinkEl.click(function(){
  reviewsQandaContainerEl.addClass('qanda-active'); 
  reviewsQandaContainerEl.removeClass('reviews-active'); 
})
qandaSortButton.click(function(){
  qandaSortDropdown.toggle()
  qandaSortButton.children('img').toggleClass("arrow-up")
})
qandaSortDropdown.children('li').click(function(){
  const {sort, direction} = getSortingValues($(this).data('value'))
  $(this).parent('ul').prev().children("span").text($(this).text() === 'Most recent' ? 'Sort' : $(this).text())
  $(this).parent('ul').prev().children("img").toggleClass("arrow-up")
  $(this).siblings().removeClass('active')
  $(this).addClass('active')
  $(this).parent().hide();
  init({sort, direction})
})
qandaNextButton.click(function(){
  const {sort, direction} = getSortingValues($('#qanda-sort-dropdown li.active').data('value'))
  init({page: qandaNextButton.data('nextPage'), sort, direction})
})
qandaPrevButton.click(function(){
  const {sort, direction} = getSortingValues($('#qanda-sort-dropdown li.active').data('value'))
  init({page: qandaPrevButton.data('prevPage'), sort, direction})
})
askAQuestionButton.click(function(){
  askAQuestionModal.css("display", "flex")
})
askAQuestionLink.click(function(){
  askAQuestionModal.css("display", "flex")
})
askAQuestionCloseButton.click(function(){
  askAQuestionModal.hide();
  resetAskAQuestionForm();
})
askAQuestionSubmitButton.click(function(){
  handleAskAQuestionSubmitButtonClick()
})

async function getProductQandas({
  productId,
  page = 1,
  direction = "desc",
  sort = "date"
}) {
  try {
    const url = `https://api-cdn.yotpo.com/v1/widget/NS9SsoHiT9FYw9z2b8iLDcJs9kSovIGon8wBkJUk/products/${productId}/questions.json?per_page=5&page=${page}&direction=${direction}&sort=${sort}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(url, options);
    const { response: data, status } = await res.json();

    if (status.code === 200) {
      return data;
    } else {
      console.error("error: ", status.message);
      return {};
    }
  } catch (error) {
    console.error("error:" + error);
    return {};
  }
}

async function submitAskAQuestionForm(){
  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({
      review_content: askAQuestionQuestionInput.val(),
      display_name: askAQuestionNameInput.val(),
      email: askAQuestionEmailInput.val(),
      appkey: 'NS9SsoHiT9FYw9z2b8iLDcJs9kSovIGon8wBkJUk',
      review_source: 'widget_v2',
      sku: _productId,
      product_title: _productTitle,
      product_url: `https://ph.sunniesstudios.com${_productUrl}`,
      prevent_duplicate_review: 'true'
    })
  };
  try {
    askAQuestionSubmitButton.attr("disabled", true);
    const res = await fetch('https://api.yotpo.com/questions/send_confirmation_mail', options);
    await res.json();
    askAQuestionSubmitButton.attr("disabled", false);
    renderSubmitSuccess(); 
  } catch (error) {
    askAQuestionSubmitButton.attr("disabled", false);
    renderSubmitError();  
  }
}

function renderQandaHeader(questionsTotalCount) {
  qandaTotalCountEl.text(questionsTotalCount)
  if(questionsTotalCount != 1){
    qandaTotalCountLabelEl.addClass('plural')
  }
  if(questionsTotalCount){
    qandaFiltersContainerEl.show()
  }else{
    qandaFiltersContainerEl.hide()
  }
}

function createAnswersHTML(answers){
  return answers.reduce(function(total, current){
    return total + `<div>
                      <p>${current.content}</p>
                      <div><img src="${current.answerer.social_image || 'https://ddcfq0gxiontw.cloudfront.net/images/anonymous_user.png'}" /><p>${current.store_owner_comment ? '- Team Sunnies' : current.answerer.display_name}</p></div>
                    </div>`
  },'')
}

function createQuestionsHTML(questions){
    return questions.reduce(function(total, current){
      return total + `
        <li>
          <div class="qanda-list__user">
            <p>${current.asker.display_name}</p>
            <time>${new Date(current.created_at).toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' })}</time>
          </div>
          <div class="qanda-list__qanda">
            <p>Q: ${current.content}</p>
            ${createAnswersHTML(current.answers)}
          </div>
        </li>
      `
    },'')
}

function getSortingValues(sortBy){
  if(sortBy === 'most-recent'){
    return {sort: 'date', direction: 'desc'}
  }
  if(sortBy === 'most-helpful'){
    return {sort: 'votes_up', direction: 'desc'}
  }
  return {sort: 'date', direction: 'desc'}
}

function renderPagination(currentPage, totalPage){
  if(totalPage <= 1){
    qandaPagination.hide()
  }else{
    qandaPagination.show()
  }
  qandaCurrentPageEl.text(currentPage)
  qandaTotalPageEl.text(totalPage)
  qandaPrevButton.data("prevPage", currentPage - 1)
  qandaNextButton.data("nextPage", currentPage + 1)
  if (currentPage <= 1){
    qandaPrevButton.children('img').addClass('paginate-end')
  }else{
    qandaPrevButton.children('img').removeClass('paginate-end')
  }
  if (currentPage >= totalPage){
    qandaNextButton.children('img').addClass('paginate-end')
  }else{
    qandaNextButton.children('img').removeClass('paginate-end')
  }
}

function renderQandaContent(questions) {
  if(questionsTotalCount){
    qandaListEl.html(createQuestionsHTML(questions))
    qandaContentEl.show();
    qandaEmptyContentEl.hide();
  }else{
    qandaContentEl.hide();
    qandaEmptyContentEl.show();
  }
}

function renderSubmitSuccess(){
  askAQuestionModalHeading.text("Thank you!")
  showOnSuccessEl.css('display', 'flex')
  hideOnSuccessEl.hide()
}

function renderSubmitError(){
  askAQuestionModalHeading.text("Oops!")
  showOnErrorEl.show()
  hideOnErrorEl.hide()  
}

function resetAskAQuestionForm(){
  askAQuestionModalHeading.text("Ask a question")
  askAQuestionQuestionInput.val("")
  askAQuestionNameInput.val("")
  askAQuestionEmailInput.val("")
  hideOnSuccessEl.show()
  showOnSuccessEl.hide()
  hideOnErrorEl.show()
  showOnErrorEl.hide()
}

function validateAskAQuestionForm(){
  const errors = {}
  if(!askAQuestionQuestionInput.val()){
    errors.question = "This field is required."
  }
  if(!askAQuestionNameInput.val()){
     errors.name = "This field is required."
  }
  if(!askAQuestionEmailInput.val()){
     errors.email = "This field is required."
  }else if (!isEmail(askAQuestionEmailInput.val())){
    errors.email = "Invalid email."
  }
  return errors;
}

function renderAskAQuestionFormErrors(errors){
  askAQuestionInputs.css("border","1.5px solid var(--light_gray_color)")
  for(const error in errors){
    $(`.ask-a-question-input[name='${error}']`).css("border", "1.5px solid rgb(211, 99, 39)");
  }
}



function handleAskAQuestionSubmitButtonClick(){
  const errors = validateAskAQuestionForm()
  renderAskAQuestionFormErrors({})
  if(!$.isEmptyObject(errors)){
    renderAskAQuestionFormErrors(errors)
  }else{
    submitAskAQuestionForm()
  }
}

async function init({page, sort, direction}){
  const {questions, pagination} = await getProductQandas({productId: _productId, page, sort, direction})
  const totalPage = Math.ceil(pagination.total.questions / pagination.per_page)
  questionsTotalCount = pagination.total.questions
  renderQandaHeader(questionsTotalCount)
  renderQandaContent(questions)
  renderPagination(pagination.page, totalPage)
}

init({});