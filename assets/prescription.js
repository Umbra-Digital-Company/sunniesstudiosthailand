
let toggleTable;

let removeLensPaired;

let noteData = '';

function loadPrescription(){

  // Additional notes when adding to cart.
  function loadNote() {
      noteData = localStorage.getItem('userNote');
      setNoteValue(noteData);
  }
  function setNoteValue(noteValue) {
      const userNoteField = document.getElementById('user-note');
      if (userNoteField) {
          userNoteField.value = `${noteValue || ''}`;
      }
  }
  function storeNoteOnClick() {
      const userNoteField = document.getElementById('user-note');
      noteData = userNoteField.value;
      localStorage.setItem('userNote', noteData);
  }
  function removeNote() {
      localStorage.removeItem('userNote');
      noteData = '';
      const userNoteField = document.getElementById('user-note');
      userNoteField.value = '';
  }
  document.querySelector('.new-prescription-right-subtotal-btn-next').addEventListener('click', function() {
      storeNoteOnClick();
  });
  document.querySelector('.new-prescription-close-btn-span').addEventListener('click', function() {
      removeNote();
  });
  document.querySelector('.new-prescription-back-btn-span-arrow').addEventListener('click', function() {
      removeNote();
  });
  document.addEventListener('DOMContentLoaded', function () {
      loadNote();
  });

const config = {
  visionTypes: {
    BIFOCAL: "Bifocal",
    NON_PRESCRIPTION: "Non-prescription",
    PROGRESSIVE: "Progressive",
    SINGLE_VISION: "Single Vision",
  },
  lensUpgrades: {
    CLASSIC: "Classic",
    FLAT_TOP_SUN_ADAPTIVE: "Flat Top Sun Adaptive",
    FLAT_TOP: "Flat Top",
    AIR_LENS: "AirLens",
    KRYPTOK_SUN_ADAPTIVE: "Kryptok Sun Adaptive",
    KRYPTOK: "Kryptok",
    SCREEN_SAFE: "Screen Safe",
    ULTRATHIN: "Ultrathin",
    SUN_PLUS_SCREEN: "Sun + Screen",
    SUN_ADAPTIVE: "Sun Adaptive",
    TINTS_RX: "Tints Rx",
  },
  lensVisionType: {
    DISTANCE: "distance",
    READING: "reading",
  },
  prescriptionOriginValues: {
    GRAB_RX: "grab_rx",
    NEW_RX: "new_rx",
  },
};

const { lensUpgrades, lensVisionType, visionTypes, prescriptionOriginValues } =
  config;

const {
  CLASSIC,
  FLAT_TOP,
  FLAT_TOP_SUN_ADAPTIVE,
  AIR_LENS,
  KRYPTOK,
  KRYPTOK_SUN_ADAPTIVE,
  SCREEN_SAFE,
  ULTRATHIN,
  SUN_PLUS_SCREEN,
  SUN_ADAPTIVE,
  TINTS_RX,
} = lensUpgrades;

const { DISTANCE, READING } = lensVisionType;

const { BIFOCAL, NON_PRESCRIPTION, PROGRESSIVE, SINGLE_VISION } = visionTypes;

const { GRAB_RX, NEW_RX } = prescriptionOriginValues;

class PRESCRIPTIONUI {
  constructor() {
    this.addNewPrescriptionButton = addNewPrescriptionButton;
    this.addNewPrescriptionForm = addNewPrescriptionForm;
    this.addPrescriptionWrapperElement = addPrescriptionWrapperElement;
    this.documentBodyElement = documentBodyElement;
    this.fetchedPrescriptionData = fetchedPrescriptionData;
    this.fetchedPrescriptionDataId = fetchedPrescriptionDataId;
    this.findEmailInput = findEmailInput;
    this.findRecordsForm = findRecordsForm;
    this.framePriceElement = framePriceElement;
    this.grabPrescriptionLensName = grabPrescriptionLensName;
    this.grabPrescriptionOrderId = grabPrescriptionOrderId;
    this.grabPrescriptionVisionType = grabPrescriptionVisionType;
    this.hasCompletedMobileReviewSelection = false;
    this.isGrabPrescriptionValid = isGrabPrescriptionValid;
    this.isMobile = window.innerWidth < 769;
    this.lensUpgradeContainerElement = lensUpgradeContainerElement;
    this.mobileSelectionReviewContentElement = document.querySelector(
      ".new-prescription-mobile-selection-review-content",
    );
    this.oldEmail = oldEmail;
    this.oldEmailValue = oldEmailValue;
    this.prescriptionBackButtons = prescriptionBackButtons;
    this.prescriptionError = prescriptionError;
    this.prescriptionErrorButtonWrapper = prescriptionErrorButtonWrapper;
    this.prescriptionErrorContent = prescriptionErrorContent;
    this.prescriptionErrorTitle = prescriptionErrorTitle;
    this.prescriptionFlowStepOneElements = prescriptionFlowStepOneElements;
    this.prescriptionFlowStepTwoAndThreeElements =
      prescriptionFlowStepTwoAndThreeElements;
    this.prescriptionLensData = prescriptionLensData;
    this.prescriptionModalElement = prescriptionModalElement;
    this.prescriptionNextButton = prescriptionNextButton;
    this.prescriptionOrigin = prescriptionOrigin;
    this.prescriptionProduct = prescriptionProduct;
    this.prescriptionRecordResultsElement = prescriptionRecordResultsElement;
    this.prescriptionResultsElement = prescriptionResultsElement;
    this.prescriptionSubtotalContainerElement =
      prescriptionSubtotalContainerElement;
    this.prescriptionSubtotalElement = prescriptionSubtotalElement;
    this.prescriptionTintSelectionElements = prescriptionTintSelectionElements;
    this.prescriptionVisionTypeDetails = prescriptionVisionTypeDetails;
    this.priceWithCommaFormat = priceWithCommaFormat;
    this.progressTrackerElement = progressTrackerElement;
    this.searchPrescriptionButton = searchPrescriptionButton;
    this.shopifyData = shopifyData;
    this.visionTypeContainerElement = visionTypeContainerElement;
    this.visionTypeElement = visionTypeElement;
    this.width = window.innerWidth;
  }

  openModal() {
    // show the modal prescription
    prescriptionModalElement.classList.add("visible");
    documentBodyElement.style.overflow = "hidden";
    documentBodyElement.classList.add("customize-prescription-popup");
  }

  closeModal() {
    // close the modal prescription
    prescriptionProduct = [];
    prescriptionModalElement.classList.remove("visible");
    documentBodyElement.style.overflow = "auto";
    document.body.classList.remove("customize-prescription-popup");
    prescriptionSubtotalContainerElement.classList.remove("is-visible");
    this.resetPrescriptionFlowStepThree();
    let dataItem__div = prescriptionModalElement.querySelectorAll(
      ".new-prescription-right-data-item",
    );
    let dataContent__div = prescriptionModalElement.querySelectorAll(
      ".new-prescription-step",
    );
    let prescriptionData__div = prescriptionModalElement.querySelectorAll(
      ".new-prescription-group",
    );

    dataContent__div.forEach((item) => {
      item.dataset.step == 1
        ? item.classList.add("is-active")
        : item.classList.remove("is-active");
    });

    dataItem__div.forEach((item) => {
      item.classList.remove("is-active");
    });

    prescriptionData__div.forEach((item) => {
      item.classList.remove("is-visible");
    });

    this.handleNextBtnClassFunction("visible", "addClassName", "Next");
    this.progressTrackerElement.style.width = "0%";
    this.visionTypeContainerElement.classList.remove("is-visible");
  }

  resetPrescriptionFlowStepThree() {
    const newPrescriptionTabButton = prescriptionModalElement.querySelectorAll(
      ".new-prescription-btn-tab",
    );
    const newPrescriptionErrorLensElement = document.querySelector(
      ".new-prescription-error-lens",
    );

    prescriptionResultsElement.innerHTML = "";
    oldEmail = "";
    oldEmailValue = "";
    grabPrescriptionOrderId = "";
    grabPrescriptionVisionType = "";
    fetchedPrescriptionData = "";
    fetchedPrescriptionDataId = "";

    doNeedSphValidation = false;
    doNeedLensValidation = false;
    doNeedCylValidation = false;
    doNeedAddValidation = false;
    doNeedAxisValidation = false;

    if (!!newPrescriptionErrorLensElement) {
      newPrescriptionErrorLensElement.parentNode.removeChild(
        newPrescriptionErrorLensElement,
      );
      document
        .querySelector(".new-prescription-error-content-inner")
        .classList.remove("lens-suggest");
    }

    newPrescriptionTabButton.forEach((item) => {
      item.classList.contains("tab-btn")
        ? item.classList.add("is-active")
        : item.classList.remove("is-active");
    });

    addNewPrescriptionForm.reset();
    findRecordsForm.reset();
  }

  addClickEventVisionElFunction(el, step) {
    switch (step) {
      case "step1":
        el.addEventListener("click", function () {
          newPrescriptionUI.getVisionTypeFunction(el);
        });
        break;
      case "step2":
        // TODO
        break;

      default:
        // TODO
        break;
    }
  }

  getVisionTypeFunction(el) {
    // step 1 function get vision type data
    const { name } = el.dataset;
    const visionTypeName = name;

    this.handlePercentageTrackerFunction("step1", 1);

    // handle tracker pass the className
    this.handleNextBtnClassFunction("visible", "addClassName");

    // handle is-active class for data items pass the elsArray, name, this(this is the current element)
    this.handleIsActiveClass(
      prescriptionFlowStepOneElements,
      visionTypeName,
      el,
    );

    // getting the previous active div(step1 id element)
    let contentDiv__id = el.parentElement.parentElement.parentElement;
    contentDiv__id = contentDiv__id.getAttribute("id");

    prescriptionVisionTypeDetails.map((data) => {
      if (data.prescription_vision === visionTypeName) {
        data.selected = true;

        const frame = document.querySelector(
          '[name="properties[frame]"]',
        ).value;
        const frameTitle = shopifyData?.product?.title ?? "";
        const visualType = data.prescription_vision,
          price = data.price,
          target = data.target,
          step1Obj = {
            step: 1,
            frame_name: frame,
            frame_title: frameTitle,
            prescription_vision: visualType,
            price: price,
            target: target,
            prev_content: contentDiv__id,
          };

        if (prescriptionProduct.length === 1) {
          prescriptionProduct.map((cartDataItem) => {
            if (cartDataItem.step == 1) {
              cartDataItem.prescription_vision = visualType;
              cartDataItem.price = price;
              cartDataItem.target = target;
            }
          });
        } else {
          // cartDataItem has already step 2 obj so we need to update the values of it
          prescriptionProduct = [{ ...prescriptionProduct, ...step1Obj }];
        }

        // Update subtotal and vision left data UI
        this.updateDataGroup(
          visionTypeContainerElement,
          framePriceElement,
          data,
          prescriptionSubtotalElement,
        );
      } else {
        data.selected = false;
      }
    });
  }

  handlePercentageTrackerFunction(_, step) {
    switch (step) {
      case "0":
      case 0:
        progressTrackerElement.style.width = "0%";
        break;
      case "1":
      case 1:
        if (this.isMobile) {
          progressTrackerElement.style.width = "20%";
        } else {
          progressTrackerElement.style.width = "33.33%";
        }
        break;

      case "2":
      case 2:
        if (this.isMobile) {
          progressTrackerElement.style.width = "50%";
        } else {
          progressTrackerElement.style.width = "70%";
        }
        break;

      case "3":
      case 3:
        if (this.isMobile) {
          progressTrackerElement.style.width = "80%";
        } else {
          progressTrackerElement.style.width = "100.2%";
        }
        break;

      case "4":
      case 4:
        progressTrackerElement.style.width = "100.2%";
        break;
    }
  }

  handleIsActiveClass(prescriptionFlowStepOneElements, visionTypeName, el) {
    prescriptionFlowStepOneElements.forEach((item) => {
      // Remove is-active class for the items except the one that is clicked
      const { name, price } = item.dataset;
      name != visionTypeName
        ? item.classList.remove("is-active")
        : el.classList.add("is-active");
    });
  }

  handleNextBtnClassFunction(myClassName, caseClass, text) {
    text ? (prescriptionNextButton.innerText = text) : "";
    caseClass === "addClassName"
      ? prescriptionNextButton.classList.add(myClassName)
      : prescriptionNextButton.classList.remove(myClassName);
  }

  updateDataGroup(
    parentGroup__div,
    price__span,
    data,
    prescriptionSubtotalElement,
  ) {
    switch (prescriptionProduct.length) {
      case 1:
        let priceVision = priceWithCommaFormat.format(data.price);
        visionTypeElement.textContent = data.prescription_vision;
        price__span.textContent = `$${priceVision}`;
        parentGroup__div.classList.add("is-visible");
        prescriptionSubtotalElement.textContent = `$${priceVision}`;
        prescriptionSubtotalContainerElement.classList.add("is-visible");
        break;
      case 2:
        parentGroup__div.classList.add("is-visible");
        lensUpgradeElement.textContent = data.name;
        let priceLens = "";

        if (
          prescriptionProduct[1].lens_name === TINTS_RX ||
          prescriptionProduct[1].lens_name === SUN_PLUS_SCREEN ||
          prescriptionProduct[0].prescription_vision == NON_PRESCRIPTION
        ) {
          priceLens = "$" + priceWithCommaFormat.format(data.price);
        } else {
          priceLens = "from $" + priceWithCommaFormat.format(data.price);
        }
        price__span.textContent = data.price != 0 ? priceLens : "";
        let sum;
        sum = this.computeSubtotal(prescriptionProduct);

        switch (prescriptionProduct[0].prescription_vision) {
          case NON_PRESCRIPTION:
            switch (data.name) {
              case "No upgrade":
                // Update subtotal to the element
                prescriptionSubtotalElement.textContent = sum;

                prescriptionProduct.length === 2 &&
                  delete prescriptionProduct[1].target;
                this.isMobile
                  ? this.handleNextBtnClassFunction(
                      "visible",
                      "addClassName",
                      "Next",
                    )
                  : this.handleNextBtnClassFunction(
                      "visible",
                      "addClassName",
                      "Add to bag",
                    );
                break;
              case SCREEN_SAFE:
              case SUN_ADAPTIVE:
              case SUN_PLUS_SCREEN:
              case CLASSIC:
                // Update subtotal to the element
                prescriptionSubtotalElement.textContent = sum;
                this.isMobile
                  ? this.handleNextBtnClassFunction(
                      "visible",
                      "addClassName",
                      "Next",
                    )
                  : this.handleNextBtnClassFunction(
                      "visible",
                      "addClassName",
                      "Add to bag",
                    );
                break;

              default:
                prescriptionSubtotalElement.textContent = sum;
                this.handleNextBtnClassFunction(
                  "visible",
                  "addClassName",
                  "Next",
                );
                break;
            }
            break;

          default:
            // Update subtotal to the element
            prescriptionSubtotalElement.textContent = sum;
            break;
        }
        break;
      case 3:
        let lensPrice = "";
        lensUpgradeElement.textContent = data.name;
        if (
          prescriptionProduct[1].lens_name === TINTS_RX ||
          prescriptionProduct[1].lens_name === SUN_PLUS_SCREEN ||
          prescriptionProduct[0].prescription_vision == NON_PRESCRIPTION
        ) {
          lensPrice = "$" + priceWithCommaFormat.format(data.price);
        } else {
          lensPrice = priceWithCommaFormat.format(data.price);
        }
        price__span.textContent = data.price != 0 ? lensPrice : "";
        let sum2 = this.computeSubtotal(prescriptionProduct);
        prescriptionSubtotalElement.textContent = sum2;
        break;
    }
  }

  computeSubtotal(cartDatObj) {
    let pricesArray = [];
    let sum = 0;
    if (cartDatObj.length > 1) {
      cartDatObj.map((cartDataItem) => {
        if (cartDataItem.price != undefined) {
          pricesArray.push(cartDataItem.price);
        }
      });

      for (let i = 0; i < pricesArray.length; i++) {
        let num = pricesArray[i];
        num = Number(num);
        sum = sum + num;
      }
      sum = "$" + priceWithCommaFormat.format(sum);
    } else {
      sum = "$" + priceWithCommaFormat.format(cartDatObj[0].price);
    }
    return sum;
  }

  prescriptionFlowLogic({ visionType, lensUpgrade, prescriptionData }) {
    const { CYL_OD, CYL_OS, SPH_OD, SPH_OS } = prescriptionData;

    if (visionType === SINGLE_VISION) {
      if (lensUpgrade === SCREEN_SAFE) {
        // SVS-SCREEN SAFE
        const isScreenSafe =
          SPH_OD <= 3.25 &&
          SPH_OD >= -6 &&
          SPH_OS <= 3.25 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;
        // SVRX-SLIM SCREEN SAFE
        const isSlimScreenSafeOptionOne =
          SPH_OD <= 0 &&
          SPH_OD >= -8 &&
          SPH_OS <= 0 &&
          SPH_OS >= -8 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;
        // SVRX-SLIM SCREEN SAFE
        const isSlimScreenSafeOptionTwo =
          SPH_OD <= 10 &&
          SPH_OD >= 0 &&
          SPH_OS <= 10 &&
          SPH_OS >= 0 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;
        // SVRX-SLIM SCREEN SAFE
        const isSlimScreenSafeOptionThree =
          SPH_OD <= 0 &&
          SPH_OD >= -12 &&
          SPH_OS <= 0 &&
          SPH_OS >= -12 &&
          CYL_OD < 0 &&
          CYL_OD >= -6 &&
          CYL_OS < 0 &&
          CYL_OS >= -6;

        const isScreenSafeReadingType =
          SPH_OD <= 3 && SPH_OD >= 0 && SPH_OS <= 3 && SPH_OS >= 0;
        const isScreenSafeDistanceType =
          SPH_OD <= 0 && SPH_OD >= -6 && SPH_OS <= 0 && SPH_OS >= -6;

        return [
          isScreenSafe,
          isSlimScreenSafeOptionOne,
          isSlimScreenSafeOptionTwo,
          isSlimScreenSafeOptionThree,
          isScreenSafeReadingType,
          isScreenSafeDistanceType,
        ];
      }

      if (lensUpgrade === SUN_ADAPTIVE) {
        // SVS-SUN ADAPTIVE
        const isSunAdaptiveOptionOne =
          SPH_OD <= 1 &&
          SPH_OD >= -4 &&
          SPH_OS <= 1 &&
          SPH_OS >= -4 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;
        // SVS-SUN ADAPTIVE
        const isSunAdaptiveOptionTwo =
          SPH_OD <= 0 &&
          SPH_OD >= -6 &&
          SPH_OS <= 0 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -1 &&
          CYL_OS <= 0 &&
          CYL_OS >= -1;
        // SVRX-SUN ADAPTIVE
        const isSunAdaptiveCustomized =
          SPH_OD <= 8 &&
          SPH_OD >= -10 &&
          SPH_OS <= 8 &&
          SPH_OS >= -10 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;

        const isSunAdaptiveOptionOneReadingType =
          SPH_OD <= 1 && SPH_OD >= 0 && SPH_OS <= 1 && SPH_OS >= 0;
        const isSunAdaptiveCustomizedReadingType =
          SPH_OD <= 8 && SPH_OD >= 0 && SPH_OS <= 8 && SPH_OS >= 0;

        const isSunAdaptiveOptionOneDistanceType =
          SPH_OD <= 0 && SPH_OD >= -4 && SPH_OS <= 0 && SPH_OS >= -4;
        const isSunAdaptiveCustomizedDistanceType =
          SPH_OD <= 0 && SPH_OD >= -10 && SPH_OS <= 0 && SPH_OS >= -10;

        return [
          isSunAdaptiveOptionOne,
          isSunAdaptiveOptionTwo,
          isSunAdaptiveCustomized,
          isSunAdaptiveOptionOneReadingType,
          isSunAdaptiveCustomizedReadingType,
          isSunAdaptiveOptionOneDistanceType,
          isSunAdaptiveCustomizedDistanceType,
        ];
      }

      if (lensUpgrade === SUN_PLUS_SCREEN) {
        // SVS-SPECTRUM DUO
        const isSpectrumDuo =
          SPH_OD <= 1 &&
          SPH_OD >= -6 &&
          SPH_OS <= 1 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;

        const isSpectrumDuoReadingType =
          SPH_OD <= 1 && SPH_OD >= 0 && SPH_OS <= 1 && SPH_OS >= 0;
        const isSpectrumDuoDistanceType =
          SPH_OD <= 0 && SPH_OD >= -4 && SPH_OS <= 0 && SPH_OS >= -4;

        return [
          isSpectrumDuo,
          isSpectrumDuoReadingType,
          isSpectrumDuoDistanceType,
        ];
      }

      if (lensUpgrade === TINTS_RX) {
        const isTints =
          SPH_OD <= 3 &&
          SPH_OD >= -3 &&
          SPH_OS <= 3 &&
          SPH_OS >= -3 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;

        const isTintsReadingType =
          SPH_OD <= 3 && SPH_OD >= 0 && SPH_OS <= 3 && SPH_OS >= 0;
        const isTintsDistanceType =
          SPH_OD <= 0 && SPH_OD >= -3 && SPH_OS <= 0 && SPH_OS >= -3;

        return [isTints, isTintsReadingType, isTintsDistanceType];
      }

      if (lensUpgrade === ULTRATHIN) {
        // SVRX-ULTRATHIN 1.61
        const isSlimCustomized =
          SPH_OD <= 10 &&
          SPH_OD >= -12 &&
          SPH_OS <= 10 &&
          SPH_OS >= -12 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;
        // SVS-ULTRATHIN 1.67
        const isUltrathin =
          SPH_OD <= -3 &&
          SPH_OD >= -10 &&
          SPH_OS <= -3 &&
          SPH_OS >= -10 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;
        // SVS-ULTRATHIN 1.61
        const isSlim =
          SPH_OD <= -3 &&
          SPH_OD >= -4.25 &&
          SPH_OD <= -3 &&
          SPH_OD >= -4.25 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;

        const isSlimCustomizedReadingType =
          SPH_OD <= 10 && SPH_OD >= 0 && SPH_OS <= 10 && SPH_OS >= 0;
        const isSlimCustomizedDistanceType =
          SPH_OD <= 0 && SPH_OD >= -12 && SPH_OS <= 0 && SPH_OS >= -12;

        return [
          isSlimCustomized,
          isUltrathin,
          isSlim,
          isSlimCustomizedReadingType,
          isSlimCustomizedDistanceType,
        ];
      }

      if (lensUpgrade === AIR_LENS) {
        // SVS-HIGH IMPACT
        const isHighImpact =
          SPH_OD <= 3 &&
          SPH_OD >= -6 &&
          SPH_OS <= 3 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;
        // SVRX-HIGH IMPACT
        const isHighImpactCustomized =
          SPH_OD <= 7.5 &&
          SPH_OD >= -8 &&
          SPH_OS <= 7.5 &&
          SPH_OS >= -8 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;

        const isHighImpactReadingType =
          SPH_OD <= 3 && SPH_OD >= 0 && SPH_OS <= 3 && SPH_OS >= 0;
        const isHighImpactCustomizedReadingType =
          SPH_OD <= 7.5 && SPH_OD >= 0 && SPH_OS <= 7.5 && SPH_OS >= 0;

        const isHighImpactDistanceType =
          SPH_OD <= 0 && SPH_OD > -6 && SPH_OS <= 0 && SPH_OS > -6;
        const isHighImpactCustomizedDistanceType =
          SPH_OD <= 0 && SPH_OD >= -8 && SPH_OS <= 0 && SPH_OS >= -8;

        return [
          isHighImpact,
          isHighImpactCustomized,
          isHighImpactReadingType,
          isHighImpactCustomizedReadingType,
          isHighImpactDistanceType,
          isHighImpactCustomizedDistanceType,
        ];
      }

      if (lensUpgrade === CLASSIC) {
        // SVS-SPHERIC 1.56
        const isSpheric =
          SPH_OD <= 6 &&
          SPH_OD >= -6 &&
          SPH_OS <= 6 &&
          SPH_OS >= -7 &&
          CYL_OD <= 0 &&
          CYL_OD >= -2 &&
          CYL_OS <= 0 &&
          CYL_OS >= -2;
        // SVRX-PROCESSED 1.50
        const isProcessed =
          SPH_OD <= 10 &&
          SPH_OD >= -12 &&
          SPH_OS <= 10 &&
          SPH_OS >= -12 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;

        const isSphericReadingType =
          SPH_OD <= 6 && SPH_OD >= 0 && SPH_OS <= 6 && SPH_OS >= 0;
        const isProcessedReadingType =
          SPH_OD <= 10 && SPH_OD >= 0 && SPH_OS <= 10 && SPH_OS >= 0;

        const isSphericDistanceType =
          sph_od <= 0 && sph_od >= -6 && sph_os <= 0 && sph_os >= -6;
        const isProcessedDistanceType =
          sph_od <= 0 && sph_od >= -12 && sph_os <= 0 && sph_os >= -12;

        return [
          isSpheric,
          isProcessed,
          isSphericReadingType,
          isProcessedReadingType,
          isSphericDistanceType,
          isProcessedDistanceType,
        ];
      }
    }

    if (visionType === BIFOCAL) {
      if (lensUpgrade === KRYPTOK) {
        // DV-KRYPTOK
        const isKryptokClassic =
          SPH_OD <= 3 &&
          SPH_OD >= -1 &&
          SPH_OS <= 3 &&
          SPH_OS >= -1 &&
          CYL_OD == 0 &&
          CYL_OS == 0;
        // DVRX-KRYPTOK
        const isKryptokCustomizedClassic =
          SPH_OD <= 8 &&
          SPH_OD >= -8 &&
          SPH_OS <= 8 &&
          SPH_OS >= -8 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isKryptokClassic, isKryptokCustomizedClassic];
      }

      if (lensUpgrade === FLAT_TOP) {
        // DV-FLAT
        const isFlatTopClassic =
          SPH_OD <= 3 &&
          SPH_OD >= 0 &&
          SPH_OS <= 3 &&
          SPH_OS >= 0 &&
          CYL_OD == 0 &&
          CYL_OS == 0;
        // DVRX-FLAT
        const isFlatTopCustomizedClassic =
          SPH_OD <= 8 &&
          SPH_OD >= -8 &&
          SPH_OS <= 8 &&
          SPH_OS >= -8 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isFlatTopClassic, isFlatTopCustomizedClassic];
      }

      if (lensUpgrade === KRYPTOK_SUN_ADAPTIVE) {
        // DV-KRYPTOK SUN ADAPTIVE
        const isKryptokSunAdaptive =
          SPH_OD <= 2 &&
          SPH_OD >= 0 &&
          SPH_OS <= 2 &&
          SPH_OS >= 0 &&
          CYL_OD == 0 &&
          CYL_OS == 0;
        // DVRX-KRYPTOK SUN ADAPTIVE
        const isKryptokCustomizedSunAdaptive =
          SPH_OD <= 6 &&
          SPH_OD >= -6 &&
          SPH_OS <= 6 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isKryptokSunAdaptive, isKryptokCustomizedSunAdaptive];
      }

      if (lensUpgrade === FLAT_TOP_SUN_ADAPTIVE) {
        // DVRX-FLAT SUN ADAPTIVE
        const isFlatTopSunAdaptive =
          SPH_OD <= 6 &&
          SPH_OD >= -6 &&
          SPH_OS <= 6 &&
          SPH_OS >= -6 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;
        const isFlatTopCustomizedSunAdaptive =
          SPH_OD <= 8 &&
          SPH_OD >= -8 &&
          SPH_OS <= 8 &&
          SPH_OS >= -8 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isFlatTopSunAdaptive, isFlatTopCustomizedSunAdaptive];
      }
    }

    if (visionType === PROGRESSIVE) {
      if (lensUpgrade === SUN_ADAPTIVE) {
        // PRX-HD DIG SUN ADAPTIVE
        const isProgressiveSunAdaptive =
          SPH_OD <= 7 &&
          SPH_OD >= -7 &&
          SPH_OS <= 7 &&
          SPH_OS >= -7 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isProgressiveSunAdaptive];
      }

      if (lensUpgrade === ULTRATHIN) {
        // PRX-HD DIG SLIM 1.60
        const isProgressiveUltrathin =
          SPH_OD <= 8 &&
          SPH_OD >= -10 &&
          SPH_OS <= 8 &&
          SPH_OS >= -10 &&
          CYL_OD <= 0 &&
          CYL_OD >= -4 &&
          CYL_OS <= 0 &&
          CYL_OS >= -4;

        return [isProgressiveUltrathin];
      }

      if (lensUpgrade === AIR_LENS) {
        // PRX-HD DIG HIGH IMPACT
        const isProgressiveAirLens =
          SPH_OD <= 6 &&
          SPH_OD >= -10 &&
          SPH_OS <= 6 &&
          SPH_OS >= -10 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;

        return [isProgressiveAirLens];
      }

      if (lensUpgrade === CLASSIC) {
        // PRX-HD DIG STANDARD
        const isProgressiveClassic =
          SPH_OD <= 10 &&
          SPH_OD >= -9 &&
          SPH_OS <= 10 &&
          SPH_OS >= -9 &&
          CYL_OD <= 0 &&
          CYL_OD >= -6 &&
          CYL_OS <= 0 &&
          CYL_OS >= -6;

        return [isProgressiveClassic];
      }
    }

    return [];
  }

  setSingleVisionScreenSafeToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReadingScreenSafeData =
      prescriptionLensData[0][SINGLE_VISION][READING][SCREEN_SAFE];
    const singleVisionDistanceScreenSafeData =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][SCREEN_SAFE];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [
      isScreenSafe,
      isSlimScreenSafeOptionOne,
      isSlimScreenSafeOptionTwo,
      isSlimScreenSafeOptionThree,
      isScreenSafeReadingType,
    ] = this.prescriptionFlowLogic({
      visionType: SINGLE_VISION,
      lensUpgrade: SCREEN_SAFE,
      prescriptionData,
    });

    if (isScreenSafe) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceScreenSafeData[0].lens_name;
      prescriptionProduct[2].variant_id =
        singleVisionDistanceScreenSafeData[0].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price =
        singleVisionDistanceScreenSafeData[0].price;

      if (isScreenSafeReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingScreenSafeData[0].lens_name;
        prescriptionProduct[2].variant_id =
          singleVisionReadingScreenSafeData[0].id;
        prescriptionProduct[2].visionType = DISTANCE;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price =
          singleVisionReadingScreenSafeData[0].price;
      }

      isWithinMatrixRange = true;
    } else if (isSlimScreenSafeOptionOne) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceScreenSafeData[1].lens_name;
      prescriptionProduct[2].variant_id =
        singleVisionDistanceScreenSafeData[1].id;
      prescriptionProduct[1].price =
        singleVisionDistanceScreenSafeData[1].price;

      isWithinMatrixRange = true;
    } else if (isSlimScreenSafeOptionTwo) {
      prescriptionProduct[2].lensVariantName =
        singleVisionReadingScreenSafeData[1].lens_name;
      prescriptionProduct[2].variant_id =
        singleVisionReadingScreenSafeData[1].id;
      prescriptionProduct[1].price = singleVisionReadingScreenSafeData[1].price;

      isWithinMatrixRange = true;
    } else if (isSlimScreenSafeOptionThree) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceScreenSafeData[1].lens_name;
      prescriptionProduct[2].variant_id =
        singleVisionDistanceScreenSafeData[1].id;
      prescriptionProduct[1].price =
        singleVisionDistanceScreenSafeData[1].price;

      isWithinMatrixRange = true;
    }

    return isWithinMatrixRange;
  }

  setSingleVisionSunAdaptiveToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReadingSunAdaptive =
      prescriptionLensData[0][SINGLE_VISION][READING][SUN_ADAPTIVE];
    const singleVisionDistanceSunAdaptive =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][SUN_ADAPTIVE];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [
      isSunAdaptiveOptionOne,
      isSunAdaptiveOptionTwo,
      isSunAdaptiveCustomized,
      isSunAdaptiveOptionOneReadingType,
      isSunAdaptiveCustomizedReadingType,
    ] = this.prescriptionFlowLogic({
      visionType: SINGLE_VISION,
      lensUpgrade: SUN_ADAPTIVE,
      prescriptionData,
    });

    if (isSunAdaptiveOptionOne) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceSunAdaptive[0].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceSunAdaptive[0].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceSunAdaptive[0].price;

      if (isSunAdaptiveOptionOneReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingSunAdaptive[0].lens_name;
        prescriptionProduct[2].variant_id =
          singleVisionReadingSunAdaptive[0].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingSunAdaptive[0].price;
      }

      isWithinMatrixRange = true;
    } else if (isSunAdaptiveOptionTwo) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceSunAdaptive[0].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceSunAdaptive[0].id;
      prescriptionProduct[1].price = singleVisionDistanceSunAdaptive[0].price;

      isWithinMatrixRange = true;
    } else if (isSunAdaptiveCustomized) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceSunAdaptive[1].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceSunAdaptive[1].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceSunAdaptive[1].price;

      if (isSunAdaptiveCustomizedReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingSunAdaptive[1].lens_name;
        prescriptionProduct[2].variant_id =
          singleVisionReadingSunAdaptive[1].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingSunAdaptive[1].price;
      }

      isWithinMatrixRange = true;
    }

    return isWithinMatrixRange;
  }

  setSingleVisionSunPlusScreenToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReadingSunPlusScreen =
      prescriptionLensData[0][SINGLE_VISION][READING][SUN_PLUS_SCREEN];
    const singleVisionDistanceSunPlusScreen =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][SUN_PLUS_SCREEN];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [isSpectrumDuo, isSpectrumDuoReadingType] =
      this.prescriptionFlowLogic({
        visionType: SINGLE_VISION,
        lensUpgrade: SUN_PLUS_SCREEN,
        prescriptionData,
      });

    if (isSpectrumDuo) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceSunPlusScreen[0].lens_name;
      prescriptionProduct[2].variant_id =
        singleVisionDistanceSunPlusScreen[0].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceSunPlusScreen[0].price;

      if (isSpectrumDuoReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingSunPlusScreen[0].lens_name;
        prescriptionProduct[2].variant_id =
          singleVisionReadingSunPlusScreen[0].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price =
          singleVisionReadingSunPlusScreen[0].price;
      }

      isWithinMatrixRange = true;
    }

    return isWithinMatrixRange;
  }

  setSingleVisionTintsRxToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReading = prescriptionLensData[0][SINGLE_VISION][READING];
    const singleVisionDistance =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [isTints, isTintsReadingType, isTintsDistanceType] =
      this.prescriptionFlowLogic({
        visionType: SINGLE_VISION,
        lensUpgrade: TINTS_RX,
        prescriptionData,
      });

    const hasTintsColor = !!prescriptionProduct[1]?.tints_color;

    if (isTints) {
      if (isTintsReadingType && hasTintsColor) {
        singleVisionReading[TINTS_RX].forEach((tint) => {
          if (prescriptionProduct[1].tints_color == tint.lens_name) {
            prescriptionProduct[2].lensVariantName = tint.lens_name;
            prescriptionProduct[2].variant_id = tint.id;
            prescriptionProduct[2].visionType = READING;
            prescriptionProduct[1].price = tint.price;
          }
        });

        isWithinMatrixRange = true;
      }

      if (isTintsDistanceType && hasTintsColor) {
        singleVisionDistance[TINTS_RX].forEach((tint) => {
          if (prescriptionProduct[1].tints_color == tint.lens_name) {
            prescriptionProduct[2].lensVariantName = tint.lens_name;
            prescriptionProduct[2].variant_id = tint.id;
            prescriptionProduct[2].visionType = DISTANCE;
            prescriptionProduct[1].price = tint.price;
          }
        });

        isWithinMatrixRange = true;
      }
    }

    return isWithinMatrixRange;
  }

  setSingleVisionUltrathinToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const slimReadingLensData =
      prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN];
    const slimDistanceLensData =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [isSlimCustomized, isUltrathin, isSlim, isSlimCustomizedReadingType] =
      this.prescriptionFlowLogic({
        visionType: SINGLE_VISION,
        lensUpgrade: ULTRATHIN,
        prescriptionData,
      });

    if (isUltrathin) {
      prescriptionProduct[2].lensVariantName =
        slimDistanceLensData[0].lens_name;
      prescriptionProduct[2].variant_id = slimDistanceLensData[0].id;
      prescriptionProduct[1].price = slimDistanceLensData[0].price;

      return true;
    }

    if (isSlim) {
      prescriptionProduct[2].lensVariantName =
        slimDistanceLensData[1].lens_name;
      prescriptionProduct[2].variant_id = slimDistanceLensData[1].id;
      prescriptionProduct[1].price = slimDistanceLensData[1].price;

      return true;
    }

    if (isSlimCustomized) {
      if (isSlimCustomizedReadingType) {
        prescriptionProduct[2].lensVariantName =
          slimReadingLensData[1].lens_name;
        prescriptionProduct[2].variant_id = slimReadingLensData[1].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = slimReadingLensData[1].price;

        return true;
      }

      prescriptionProduct[2].lensVariantName =
        slimDistanceLensData[1].lens_name;
      prescriptionProduct[2].variant_id = slimDistanceLensData[1].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = slimDistanceLensData[1].price;

      return true;
    }

    return false;
  }

  setSingleVisionAirLensToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReadingAirLens =
      prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS];
    const singleVisionDistanceAirLens =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [
      isHighImpact,
      isHighImpactCustomized,
      isHighImpactReadingType,
      isHighImpactCustomizedReadingType,
    ] = this.prescriptionFlowLogic({
      visionType: SINGLE_VISION,
      lensUpgrade: AIR_LENS,
      prescriptionData,
    });

    if (isHighImpact) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceAirLens[0].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceAirLens[0].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceAirLens[0].price;

      if (isHighImpactReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingAirLens[0].lens_name;
        prescriptionProduct[2].variant_id = singleVisionReadingAirLens[0].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingAirLens[0].price;
      }

      isWithinMatrixRange = true;
    } else if (isHighImpactCustomized) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceAirLens[1].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceAirLens[1].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceAirLens[1].price;

      if (isHighImpactCustomizedReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingAirLens[1].lens_name;
        prescriptionProduct[2].variant_id = singleVisionReadingAirLens[1].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingAirLens[1].price;
      }

      isWithinMatrixRange = true;
    }

    return isWithinMatrixRange;
  }

  setSingleVisionClassicToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    const singleVisionReadingClassic =
      prescriptionLensData[0][SINGLE_VISION][READING][CLASSIC];
    const singleVisionDistanceClassic =
      prescriptionLensData[0][SINGLE_VISION][DISTANCE][CLASSIC];

    CYL_OD = +CYL_OD;
    CYL_OS = +CYL_OS;
    SPH_OD = +SPH_OD;
    SPH_OS = +SPH_OS;

    let isWithinMatrixRange = false;

    const prescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    const [
      isSpheric,
      isProcessed,
      isSphericReadingType,
      isProcessedReadingType,
    ] = this.prescriptionFlowLogic({
      visionType: SINGLE_VISION,
      lensUpgrade: CLASSIC,
      prescriptionData,
    });

    if (isSpheric) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceClassic[0].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceClassic[0].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceClassic[0].price;

      if (isSphericReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingClassic[0].lens_name;
        prescriptionProduct[2].variant_id = singleVisionReadingClassic[0].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingClassic[0].price;
      }

      isWithinMatrixRange = true;
    } else if (isProcessed) {
      prescriptionProduct[2].lensVariantName =
        singleVisionDistanceClassic[1].lens_name;
      prescriptionProduct[2].variant_id = singleVisionDistanceClassic[1].id;
      prescriptionProduct[2].visionType = DISTANCE;
      prescriptionProduct[1].price = singleVisionDistanceClassic[1].price;

      if (isProcessedReadingType) {
        prescriptionProduct[2].lensVariantName =
          singleVisionReadingClassic[1].lens_name;
        prescriptionProduct[2].variant_id = singleVisionReadingClassic[1].id;
        prescriptionProduct[2].visionType = READING;
        prescriptionProduct[1].price = singleVisionReadingClassic[1].price;
      }

      isWithinMatrixRange = true;
    }

    return isWithinMatrixRange;
  }

  setBifocalKryptokToPrescriptionProduct({ CYL_OD, CYL_OS, SPH_OD, SPH_OS }) {
    // TODO: Add logic for bifocal kryptok
  }

  setBifocalFlatTopToPrescriptionProduct({ CYL_OD, CYL_OS, SPH_OD, SPH_OS }) {
    // TODO: Add logic for bifocal flat top
  }

  setBifocalKryptokSunAdaptiveToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for bifocal kryptok sun adaptive
  }

  setBifocalFlatTopSunAdaptiveToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for bifocal flat top sun adaptive
  }

  setProgressiveSunAdaptiveToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for progressive sun adaptive
  }

  setProgressiveUltrathinToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for progressive ultrathin
  }

  setProgressiveAirLensToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for progressive air lens
  }

  setProgressiveClassicToPrescriptionProduct({
    CYL_OD,
    CYL_OS,
    SPH_OD,
    SPH_OS,
  }) {
    // TODO: Add logic for progressive classic
  }

  handleNextClick(nextButton) {
    const prescriptionVision =
      prescriptionProduct[0].prescription_vision.toLowerCase();
    const currentStep = prescriptionProduct.length;
    const isPrescriptionNextButtonVisible =
      nextButton.classList.contains("visible");

    if (!isPrescriptionNextButtonVisible) {
      return;
    }

    if (currentStep === 1) {
      this.goToStepTwo();
      return;
    }

    if (currentStep === 2) {
      this.handleStepTwoNextClick(prescriptionVision);
      return;
    }

    if (currentStep === 3) {
      this.handleStepThreeNextClick(prescriptionVision);
    }
  }

  handleStepTwoNextClick(prescriptionVision) {
    if (prescriptionProduct[1].tints_color != undefined) {
      if (prescriptionVision === SINGLE_VISION.toLowerCase()) {
        prescriptionProduct[1].target = "add-your-prescription-step3";
        prescriptionProduct[1].prev_content = "select-tints-step3";
        this.goToStepThree();
        this.handlePercentageTrackerFunction("step3", 3);
      }

      if (prescriptionProduct[0].prescription_vision === NON_PRESCRIPTION) {
        if (this.isMobile) {
          // Go to review selection for SP
          if (this.hasCompletedMobileReviewSelection) {
            this.handleAddToBag(prescriptionProduct);
          } else {
            prescriptionProduct[1].target = "mobile-selection-review";
            prescriptionProduct[1].prev_content = "select-tints-step3";
            this.goToMobileSelectionReview("Non-prescription-tints");
            return;
          }
        } else {
          delete prescriptionProduct[1].target;
          this.handleAddToBag(prescriptionProduct);
        }
        return;
      }
    } else {
      const lensUpgrade = prescriptionProduct[1].lens_name;

      switch (prescriptionVision) {
        case NON_PRESCRIPTION.toLowerCase():
          switch (lensUpgrade) {
            case CLASSIC:
            case SCREEN_SAFE:
            case SUN_ADAPTIVE:
            case SUN_PLUS_SCREEN:
              if (this.isMobile) {
                // goto review selection for SP
                if (this.hasCompletedMobileReviewSelection) {
                  this.handleAddToBag(prescriptionProduct);
                } else {
                  prescriptionProduct[1].target = "mobile-selection-review";
                  this.goToMobileSelectionReview(NON_PRESCRIPTION);
                }
              } else {
                delete prescriptionProduct[1].target;
                this.handleAddToBag(prescriptionProduct);
              }
              break;

            case TINTS_RX:
              prescriptionProduct[1].target = "select-tints-step3";
              this.goToStepThree();
              break;
          }

          break;

        case SINGLE_VISION.toLowerCase():
          if (lensUpgrade != TINTS_RX.toLowerCase()) {
            this.goToStepThree();
            this.handlePercentageTrackerFunction("step3", 3);
          } else {
            this.goToStepThree();
          }
          break;

        default:
          this.handlePercentageTrackerFunction("step3", 3);
          this.goToStepThree();
          break;
      }
    }
  }

  handleStepThreeNextClick(prescriptionVision) {
    const singleVision =
      prescriptionLensData[0][SINGLE_VISION].vision.toLowerCase();
    const bifocal = prescriptionLensData[0][BIFOCAL].vision.toLowerCase();
    const progressive =
      prescriptionLensData[0][PROGRESSIVE].vision.toLowerCase();

    if (prescriptionProduct[2] != undefined) {
      const lensUpgrade = prescriptionProduct[1].lens_name.toLowerCase();

      if (prescriptionProduct[2].order_id != undefined) {
        if (prescriptionProduct[2].order_id == "") {
          this.handleErrorContent("Error 5");
        } else {
          if (
            grabPrescriptionLensName == "" ||
            grabPrescriptionLensName == undefined ||
            grabPrescriptionLensName == "null" ||
            grabPrescriptionLensName == null
          ) {
            this.handleErrorContent("Error 5");
          } else {
            fetchedPrescriptionData.forEach((grabPrescriptionData) => {
              if (
                grabPrescriptionData.order_id === grabPrescriptionOrderId &&
                grabPrescriptionData.prescription_id ===
                  fetchedPrescriptionDataId
              ) {
                prescriptionProduct[2].prescription_id =
                  grabPrescriptionData.prescription_id;
                if (
                  prescriptionVision == grabPrescriptionVisionType.toLowerCase()
                ) {
                  isGrabPrescriptionValid = true;
                  prescriptionProduct[2].order_id = grabPrescriptionOrderId;

                  const lensName = lensUpgrade;

                  const {
                    add_od,
                    add_os,
                    axis_od,
                    axis_os,
                    cyl_od,
                    cyl_os,
                    ipd_od,
                    ipd_os,
                    ph_od,
                    ph_os,
                    sph_od,
                    sph_os,
                    va_od,
                    va_os,
                  } = grabPrescriptionData;

                  switch (prescriptionVision) {
                    case singleVision:
                      const { lens: singleVisionLensVariantName } =
                        this.transformPrescriptionDataToLensInfo(
                          grabPrescriptionData,
                          SINGLE_VISION,
                          lensName,
                        );

                      prescriptionProduct[2].sph_od = sph_od;
                      prescriptionProduct[2].sph_os = sph_os;
                      prescriptionProduct[2].cyl_od = cyl_od;
                      prescriptionProduct[2].cyl_os = cyl_os;
                      prescriptionProduct[2].axis_od = axis_od;
                      prescriptionProduct[2].axis_os = axis_os;
                      prescriptionProduct[2].ipd_od = ipd_od;
                      prescriptionProduct[2].ipd_os = ipd_os;
                      prescriptionProduct[2].lensVariantName =
                        singleVisionLensVariantName;

                      break;

                    case bifocal:
                      const { lens: bifocalLensVariantName } =
                        this.transformPrescriptionDataToLensInfo(
                          grabPrescriptionData,
                          BIFOCAL,
                          lensName,
                        );

                      prescriptionProduct[2].sph_od = sph_od;
                      prescriptionProduct[2].sph_os = sph_os;
                      prescriptionProduct[2].cyl_od = cyl_od;
                      prescriptionProduct[2].cyl_os = cyl_os;
                      prescriptionProduct[2].axis_od = axis_od;
                      prescriptionProduct[2].axis_os = axis_os;
                      prescriptionProduct[2].ipd_od = ipd_od;
                      prescriptionProduct[2].ipd_os = ipd_os;
                      prescriptionProduct[2].add_od = add_od;
                      prescriptionProduct[2].add_os = add_os;
                      prescriptionProduct[2].lensVariantName =
                        bifocalLensVariantName;

                      break;

                    case progressive:
                      const { lens: progressiveLensVariantName } =
                        this.transformPrescriptionDataToLensInfo(
                          grabPrescriptionData,
                          PROGRESSIVE,
                          lensName,
                        );

                      prescriptionProduct[2].sph_od = sph_od;
                      prescriptionProduct[2].sph_os = sph_os;
                      prescriptionProduct[2].cyl_od = cyl_od;
                      prescriptionProduct[2].cyl_os = cyl_os;
                      prescriptionProduct[2].axis_od = axis_od;
                      prescriptionProduct[2].axis_os = axis_os;
                      prescriptionProduct[2].ipd_od = ipd_od;
                      prescriptionProduct[2].ipd_os = ipd_os;
                      prescriptionProduct[2].add_od = add_od;
                      prescriptionProduct[2].add_os = add_os;
                      prescriptionProduct[2].ph_od = ph_od;
                      prescriptionProduct[2].ph_os = ph_os;
                      prescriptionProduct[2].lensVariantName =
                        progressiveLensVariantName;

                      break;
                  }

                  let selectedIndexData =
                    newPrescriptionUI.transformPrescriptionDataToLensInfo(
                      grabPrescriptionData,
                      grabPrescriptionVisionType,
                      lensName,
                    );

                  if (!selectedIndexData.isInMatrixRange) {
                    this.handleErrorContent("Error 7");
                    return;
                  }

                  this.handleCheckFetchLens(grabPrescriptionLensName);

                  if (isGrabPrescriptionValid) {
                    if (this.isMobile) {
                      if (this.hasCompletedMobileReviewSelection) {
                        this.handleAddToBag(prescriptionProduct);
                      } else {
                        prescriptionProduct[2].prev_content =
                          "add-your-prescription-step3";
                        prescriptionProduct[2].target =
                          "mobile-selection-review";
                        this.goToMobileSelectionReview("search");
                        return;
                      }
                    } else {
                      this.handleAddToBag(prescriptionProduct);
                    }
                  } else {
                    this.handleErrorContent("Error 5");
                    // return;
                  }
                } else {
                  this.handleErrorContent("Error 5");
                }
              }
            });
          }
        }
      } else {
        // Get every select el in the table and get the value
        sph_od = document.querySelector("#sphRightEye");
        cyl_od = document.querySelector("#cylRightEye");
        axis_od = document.querySelector("#axisRightEye");
        ipd_od = document.querySelector("#ipdRightEye");
        sph_os = document.querySelector("#sphLeftEye");
        cyl_os = document.querySelector("#cylLeftEye");
        axis_os = document.querySelector("#axisLeftEye");
        ipd_os = document.querySelector("#ipdLeftEye");
        let add_od, add_os, ph_od, ph_os;

        prescriptionProduct[2].sph_od = sph_od.value;
        prescriptionProduct[2].cyl_od = cyl_od.value;
        prescriptionProduct[2].axis_od = axis_od.value;
        prescriptionProduct[2].ipd_od = ipd_od.value;
        prescriptionProduct[2].sph_os = sph_os.value;
        prescriptionProduct[2].cyl_os = cyl_os.value;
        prescriptionProduct[2].axis_os = axis_os.value;
        prescriptionProduct[2].ipd_os = ipd_os.value;

        if (
          prescriptionVision == bifocal ||
          prescriptionVision == progressive
        ) {
          add_od = document.querySelector("#addRightEye");
          add_os = document.querySelector("#addLeftEye");

          prescriptionProduct[2].add_od = add_od.value;
          prescriptionProduct[2].add_os = add_os.value;
        }

        if (prescriptionVision == progressive) {
          ph_od = document.querySelector("#phRightEye");
          ph_os = document.querySelector("#phLeftEye");

          prescriptionProduct[2].ph_od = ph_od.value;
          prescriptionProduct[2].ph_os = ph_os.value;
        }

        const isSphActive =
          sph_od.classList.contains("is-active") &&
          sph_os.classList.contains("is-active");
        const isCylActive =
          cyl_od.classList.contains("is-active") &&
          cyl_os.classList.contains("is-active");
        const isAxisActive =
          axis_od.classList.contains("is-active") &&
          axis_os.classList.contains("is-active");
        const isAddZero =
          prescriptionVision == BIFOCAL.toLowerCase() ||
          prescriptionVision == PROGRESSIVE.toLowerCase()
            ? add_od.value == 0 || add_os.value == 0
            : "";
        const isPhZero =
          prescriptionVision == PROGRESSIVE.toLowerCase()
            ? ph_od.value == 0 || ph_os.value == 0
            : "";

        const newPrescriptionValues = {
          SPH: !isSphActive,
          CYL: !isCylActive,
          AXIS: !isAxisActive,
          ADD: !!isAddZero,
          PH: !!isPhZero,
        };
        const newPrescriptionFilteredValues = Object.entries(
          newPrescriptionValues,
        ).filter(([_, isNotActive]) => isNotActive);
        const hasNewPrescriptionErrors = !!newPrescriptionFilteredValues.length;
        const newPrescriptionValueErrors = hasNewPrescriptionErrors
          ? Object.keys(Object.fromEntries(newPrescriptionFilteredValues))
          : [];

        if (hasNewPrescriptionErrors) {
          this.handleErrorContent("Error 1F", newPrescriptionValueErrors);
          return;
        }

        if (
          prescriptionVision == bifocal ||
          prescriptionVision == progressive
        ) {
          if (
            add_od.value == 0 ||
            add_os.value == 0 ||
            add_od.value != add_os.value
          ) {
            if (doNeedAddValidation == false) {
              this.handleErrorContent("Error 7");
              return;
            } else {
              prescriptionProduct[2].add_od = add_od.value;
              prescriptionProduct[2].add_os = add_os.value;
            }
          }
        }

        // Validate input data
        if (
          (sph_od.value > 0 && sph_os.value < 0) ||
          (sph_od.value < 0 && sph_os.value > 0)
        ) {
          if (doNeedSphValidation === false) {
            this.handleErrorContent("Error 1", "SPH");
            return;
          }
        }

        if (
          (cyl_od.value > 0 && cyl_os.value < 0) ||
          (cyl_od.value < 0 && cyl_os.value > 0)
        ) {
          if (doNeedCylValidation === false) {
            this.handleErrorContent("Error 1", "CYL");
            return;
          }
        }

        if (
          axis_od.value == 0 &&
          axis_os.value == 0 &&
          (cyl_od.value != 0 || cyl_os.value != 0)
        ) {
          if (doNeedAxisValidation === false) {
            this.handleErrorContent("Error 1C", "AXIS");
            return;
          }
        }

        if (prescriptionVision == singleVision) {
          const isSphAndCylZero =
            !Number(sph_od?.value) &&
            !Number(sph_os?.value) &&
            !Number(cyl_od?.value) &&
            !Number(cyl_os?.value);

          const isSlimLens = lensUpgrade === ULTRATHIN.toLowerCase();
          const isHighImpactLens = lensUpgrade === AIR_LENS.toLowerCase();

          const islensWithNoNonPrescription = isSlimLens || isHighImpactLens;

          if (islensWithNoNonPrescription && isSphAndCylZero) {
            this.handleErrorContent("Error 6");
            return;
          }

          if (isSphAndCylZero) {
            this.handleErrorContent("Error 1B", "NON_PRESCRIPTION_CONTINUE");
            return;
          }
        }

        const prescriptionData = {
          CYL_OD: cyl_od.value,
          CYL_OS: cyl_os.value,
          SPH_OD: sph_od.value,
          SPH_OS: sph_os.value,
        };

        if (prescriptionVision === singleVision) {
          const singleVisionReading =
            prescriptionLensData[0][SINGLE_VISION][READING];

          const screenSafe =
            singleVisionReading[SCREEN_SAFE][0].lens_upgrade.toLowerCase();
          const sunAdaptive =
            singleVisionReading[SUN_ADAPTIVE][0].lens_upgrade.toLowerCase();
          const sunPlusScreen =
            singleVisionReading[SUN_PLUS_SCREEN][0].lens_upgrade.toLowerCase();
          const tintsRx =
            singleVisionReading[TINTS_RX][0].lens_upgrade.toLowerCase();
          const ultrathin =
            singleVisionReading[ULTRATHIN][0].lens_upgrade.toLowerCase();
          const airLens =
            singleVisionReading[AIR_LENS][0].lens_upgrade.toLowerCase();
          const classic =
            singleVisionReading[CLASSIC][0].lens_upgrade.toLowerCase();

          switch (lensUpgrade) {
            case screenSafe:
              const isSingleVisionScreenSafeWithinMatrixRange =
                this.setSingleVisionScreenSafeToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionScreenSafeWithinMatrixRange) {
                this.handleErrorContent("Error 2A", "LENSPOPUP");

                return;
              }

              break;
            case sunAdaptive:
              const isSingleVisionSunAdaptiveWithinMatrixRange =
                this.setSingleVisionSunAdaptiveToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionSunAdaptiveWithinMatrixRange) {
                this.handleErrorContent("Error 2A", "LENSPOPUP");

                return;
              }

              break;
            case sunPlusScreen:
              const isSingleVisionSunPlusScreenWithinMatrixRange =
                this.setSingleVisionSunPlusScreenToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionSunPlusScreenWithinMatrixRange) {
                this.handleErrorContent("Error 2", "LENSPOPUP");

                return;
              }

              break;
            case tintsRx:
              const isSingleVisionTintsRxWithinMatrixRange =
                this.setSingleVisionTintsRxToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionTintsRxWithinMatrixRange) {
                this.handleErrorContent("Error 2B", "LENSPOPUP");

                return;
              }

              break;
            case ultrathin:
              const isSingleVisionUltrathinWithinMatrixRange =
                this.setSingleVisionUltrathinToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionUltrathinWithinMatrixRange) {
                this.handleErrorContent("Error 2B", "LENSPOPUP");

                return;
              }

              break;
            case airLens:
              const isSingleVisionAirLensWithinMatrixRange =
                this.setSingleVisionAirLensToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionAirLensWithinMatrixRange) {
                this.handleErrorContent("Error 2A", "LENSPOPUP");

                return;
              }

              break;
            case classic:
              const isSingleVisionClassicWithinMatrixRange =
                this.setSingleVisionClassicToPrescriptionProduct(
                  prescriptionData,
                );

              if (!isSingleVisionClassicWithinMatrixRange) {
                return;
              }

              break;
          }
        }

        if (prescriptionVision === bifocal) {
          const kryptok =
            prescriptionLensData[0][BIFOCAL][
              KRYPTOK
            ][0].lens_upgrade.toLowerCase();
          const flatTop =
            prescriptionLensData[0][BIFOCAL][
              FLAT_TOP
            ][0].lens_upgrade.toLowerCase();
          const kryptokSunAdaptive =
            prescriptionLensData[0][BIFOCAL][
              KRYPTOK_SUN_ADAPTIVE
            ][0].lens_upgrade.toLowerCase();
          const flatTopSunAdaptive =
            prescriptionLensData[0][BIFOCAL][
              FLAT_TOP_SUN_ADAPTIVE
            ][0].lens_upgrade.toLowerCase();

          switch (lensUpgrade) {
            case kryptok:
              // TODO: use this.setBifocalKryptokToPrescriptionProduct() method

              const [isKryptokClassic, isKryptokCustomizedClassic] =
                this.prescriptionFlowLogic({
                  visionType: BIFOCAL,
                  lensUpgrade: KRYPTOK,
                  prescriptionData,
                });

              if (isKryptokClassic) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][0].price;
              } else if (isKryptokCustomizedClassic) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][1].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][1].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK][1].price;
              } else {
                this.handleErrorContent("Error 5");

                return;
              }
              break;
            case flatTop:
              // TODO: use this.setBifocalFlatTopToPrescriptionProduct() method

              const [isFlatTopClassic, isFlatTopCustomizedClassic] =
                this.prescriptionFlowLogic({
                  visionType: BIFOCAL,
                  lensUpgrade: FLAT_TOP,
                  prescriptionData,
                });

              if (isFlatTopClassic) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].price;
              } else if (isFlatTopCustomizedClassic) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price;
              } else {
                this.handleErrorContent("Error 5");

                return;
              }
              break;
            case kryptokSunAdaptive:
              // TODO: use this.setBifocalKryptokSunAdaptiveToPrescriptionProduct() method

              const [isKryptokSunAdaptive, isKryptokCustomizedSunAdaptive] =
                this.prescriptionFlowLogic({
                  visionType: BIFOCAL,
                  lensUpgrade: KRYPTOK_SUN_ADAPTIVE,
                  prescriptionData,
                });

              if (isKryptokSunAdaptive) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][
                    KRYPTOK_SUN_ADAPTIVE
                  ][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][
                    KRYPTOK_SUN_ADAPTIVE
                  ][0].price;
              } else if (isKryptokCustomizedSunAdaptive) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][
                    KRYPTOK_SUN_ADAPTIVE
                  ][1].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][
                    KRYPTOK_SUN_ADAPTIVE
                  ][1].price;
              } else {
                this.handleErrorContent("Error 5");

                return;
              }
              break;
            case flatTopSunAdaptive:
              // TODO: use this.setBifocalFlatTopSunAdaptiveToPrescriptionProduct() method

              const [isFlatTopSunAdaptive, isFlatTopCustomizedSunAdaptive] =
                this.prescriptionFlowLogic({
                  visionType: BIFOCAL,
                  lensUpgrade: FLAT_TOP_SUN_ADAPTIVE,
                  prescriptionData,
                });

              if (isFlatTopSunAdaptive) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][BIFOCAL][
                    FLAT_TOP_SUN_ADAPTIVE
                  ][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][BIFOCAL][
                    FLAT_TOP_SUN_ADAPTIVE
                  ][0].price;
              } else {
                if (isFlatTopCustomizedSunAdaptive) {
                  this.handleErrorContent("Error 3B", "LENSPOPUP");
                  return;
                }
              }
              break;
          }
        }

        if (prescriptionVision === progressive) {
          const progressiveUltrathin =
            prescriptionLensData[0][PROGRESSIVE][
              ULTRATHIN
            ][0].lens_upgrade.toLowerCase();
          const progressiveAirLens =
            prescriptionLensData[0][PROGRESSIVE][
              AIR_LENS
            ][0].lens_upgrade.toLowerCase();
          const progressiveClassic =
            prescriptionLensData[0][PROGRESSIVE][
              CLASSIC
            ][0].lens_upgrade.toLowerCase();
          const progressiveSunAdaptive =
            prescriptionLensData[0][PROGRESSIVE][
              SUN_ADAPTIVE
            ][0].lens_upgrade.toLowerCase();

          switch (lensUpgrade) {
            case progressiveUltrathin:
              // TODO: use this.setProgressiveUltrathinToPrescriptionProduct() method

              const [isProgressiveUltrathin] = this.prescriptionFlowLogic({
                visionType: PROGRESSIVE,
                lensUpgrade: ULTRATHIN,
                prescriptionData,
              });

              if (isProgressiveUltrathin) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price;
              } else {
                // TODO
              }
              break;
            case progressiveAirLens:
              // TODO: use this.setProgressiveAirLensToPrescriptionProduct() method

              const [isProgressiveAirLens] = this.prescriptionFlowLogic({
                visionType: PROGRESSIVE,
                lensUpgrade: AIR_LENS,
                prescriptionData,
              });

              if (isProgressiveAirLens) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].price;
              } else {
                this.handleErrorContent("Error 3", "LENSPOPUP");
                return;
              }
              break;
            case progressiveClassic:
              // TODO: use this.setProgressiveClassicToPrescriptionProduct() method

              const [isProgressiveClassic] = this.prescriptionFlowLogic({
                visionType: PROGRESSIVE,
                lensUpgrade: CLASSIC,
                prescriptionData,
              });

              if (isProgressiveClassic) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price;
              } else {
                // TODO
              }
              break;
            case progressiveSunAdaptive:
              // TODO: use.setProgressiveSunAdaptiveToPrescriptionProduct() method

              const [isProgressiveSunAdaptive] = this.prescriptionFlowLogic({
                visionType: PROGRESSIVE,
                lensUpgrade: CLASSIC,
                prescriptionData,
              });

              if (isProgressiveSunAdaptive) {
                prescriptionProduct[2].lensVariantName =
                  prescriptionLensData[0][PROGRESSIVE][
                    SUN_ADAPTIVE
                  ][0].lens_name;
                prescriptionProduct[2].variant_id =
                  prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].id;
                prescriptionProduct[1].price =
                  prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].price;
              } else {
                this.handleErrorContent("Error 3", "LENSPOPUP");
                return;
              }
              break;
          }
        }

        if (this.isMobile) {
          if (this.hasCompletedMobileReviewSelection) {
            this.handleAddToBag(prescriptionProduct);
          } else {
            prescriptionProduct[2].prev_content = "add-your-prescription-step3";
            prescriptionProduct[2].target = "mobile-selection-review";
            this.goToMobileSelectionReview("addPrescription");
            return;
          }
        } else {
          this.handleAddToBag(prescriptionProduct);
          return;
        }
      }
    }
  }

  goToStepTwo() {
    let prevContentStep__div = document.querySelector(
      ".new-prescription-vision-type",
    );
    prevContentStep__div.classList.remove("is-active");

    // displays step 2 content and set it to active
    let nextContentStep2__div = document.querySelector(
      `#${prescriptionProduct[0].target}`,
    );
    nextContentStep2__div.classList.add("is-active");

    // remove class of visible on next button
    this.handleNextBtnClassFunction("visible", "removeClassName");
    if (prescriptionProduct[0].prescription_vision == NON_PRESCRIPTION) {
      this.handlePercentageTrackerFunction("step3", 3);
    } else {
      this.handlePercentageTrackerFunction("step2", 2);
    }
  }

  goToStepThree(target) {
    target ? target : "";

    let prevContentStep__div = document.querySelector(
      `#${prescriptionProduct[1].prev_content}`,
    );
    prevContentStep__div.classList.remove("is-active");
    let nextContentStep3__div;

    if (target) {
      // displays step 2 content and set it to active
      nextContentStep3__div = document.querySelector(`#${target}`);
    } else {
      nextContentStep3__div = document.querySelector(
        `#${prescriptionProduct[1].target}`,
      );
    }

    nextContentStep3__div.classList.add("is-active");

    // remove class of visible on next button
    if (this.isMobile) {
      this.handleNextBtnClassFunction("visible", "removeClassName", "Next");
    } else {
      const stepThreePrescriptionVision =
        prescriptionProduct[0].prescription_vision.toLowerCase();

      if (
        stepThreePrescriptionVision == SINGLE_VISION.toLowerCase() &&
        prescriptionProduct[1].target == "select-tints-step3" &&
        prescriptionProduct[1].tints_color == undefined
      ) {
        this.handleNextBtnClassFunction("visible", "removeClassName", "Next");
      } else {
        this.handleNextBtnClassFunction(
          "visible",
          "removeClassName",
          "Add to bag",
        );
      }
    }
  }

  goToMobileSelectionReview(previewItem) {
    // TODO: Refactor this method to reduce complexity
    const frameData = prescriptionProduct[0];
    const lensData = prescriptionProduct[1];
    const prescriptionData = prescriptionProduct[2];

    let prevContentStep__div;
    let nextContentStep3__div;
    let divEl = document.createElement("div");
    let previewInner = "";

    switch (previewItem) {
      case NON_PRESCRIPTION:
      case "Non-prescription-tints":
        prevContentStep__div = document.querySelector(
          `#${prescriptionProduct[1].prev_content}`,
        );
        prevContentStep__div.classList.remove("is-active");

        nextContentStep3__div = document.querySelector(
          `#${prescriptionProduct[1].target}`,
        );
        nextContentStep3__div.classList.add("is-active");
        break;

      case "search":
      case "addPrescription":
        prevContentStep__div = document.querySelector(
          `#${prescriptionProduct[2].prev_content}`,
        );
        prevContentStep__div.classList.remove("is-active");

        nextContentStep3__div = document.querySelector(
          `#${prescriptionProduct[2].target}`,
        );
        nextContentStep3__div.classList.add("is-active");
        break;
    }

    if (previewItem == "search") {
      const [selecedOrderPrescription] =
        fetchedPrescriptionData?.filter(
          ({ order_id, prescription_id }) =>
            order_id === grabPrescriptionOrderId &&
            prescription_id === fetchedPrescriptionDataId,
        ) ?? [];

      const {
        ph_od,
        ipd_od,
        ipd_os,
        ph_os,
        add_od,
        add_os,
        axis_od,
        axis_os,
        cyl_od,
        cyl_os,
        sph_od,
        sph_os,
        prescription_purpose,
      } = selecedOrderPrescription;

      const visionType =
        newPrescriptionUI.convertPurposeToVision(prescription_purpose);

      const SPH_OS = parseFloat(sph_os).toFixed(2);
      const SPH_OD = parseFloat(sph_od).toFixed(2);

      const userLeftEyeSphValue =
        parseFloat(sph_os) > 0 ? `+${SPH_OS}` : SPH_OS;
      const userRightEyeSphValue =
        parseFloat(sph_od) > 0 ? `+${SPH_OD}` : SPH_OD;

      previewInner += `
        <div class="new-prescription-right-inner">
          <div class="new-prescription-right-label">
            <p class="new-prescription-right-title">Review your selections</p>
          </div>
          <div class="new-prescription-right-data">
            <div class="new-prescription-right-data-summary">
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Frame</p>
                <p class="new-prescription-right-data-summary-desc">${
                  frameData?.frame_title ?? ""
                }</p>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Vision type</p>
                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text">${
                    frameData?.prescription_vision ?? ""
                  }</span>
                  <span class="new-prescription-right-data-summary-desc-price">$${priceWithCommaFormat.format(
                    frameData?.price ?? 0,
                  )}</span>
                </div>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Lens upgrade</p>
                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text" style="text-transform: capitalize;">
                    ${this.checkVisionTypeName(prescriptionProduct)}
                  </span>
                  <span class="new-prescription-right-data-summary-desc-price">${
                    lensData?.price != 0
                      ? `$${priceWithCommaFormat.format(lensData?.price ?? 0)}`
                      : ""
                  }</span>
                </div>
              </div>
              <div class="new-prescription-right-data-summary-group" style="margin-bottom: 24px;">
                <p class="new-prescription-right-data-summary-label">Your prescription</p>
                  <table class="new-prescription-right-data-summary-table">
                    <tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td"></td>
                      <td class="new-prescription-right-data-summary-table-td td-title align-right">(OS)<br>Left eye</td>
                      <td class="new-prescription-right-data-summary-table-td td-title align-right">(OD)<br>Right eye</td>
                    </tr>
                    <tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">SPH</td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyeSPHVal">${userLeftEyeSphValue}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyeSPHVal">${userRightEyeSphValue}</td>
                    </tr>
                    <tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">CYL
                      </td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyeCYLVal">${parseFloat(
                        cyl_os,
                      ).toFixed(2)}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyeCYLVal">${parseFloat(
                        cyl_od,
                      ).toFixed(2)}</td>
                    </tr>
                    <tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">AXIS</td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyeAXISVal">${axis_os}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyeAXISVal">${axis_od}</td>
                    </tr>
                  ${
                    visionType == BIFOCAL || visionType == PROGRESSIVE
                      ? `<tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">ADD</td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyeADDVal">${add_os}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyeADDVal">${add_od}</td>
                    </tr>`
                      : ""
                  }
                    <tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">IPD</td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyeIPDVal">${parseFloat(
                        ipd_os,
                      ).toFixed(2)}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyeIPDVal">${parseFloat(
                        ipd_od,
                      ).toFixed(2)}</td>
                    </tr>
                    ${
                      visionType == PROGRESSIVE
                        ? `<tr class="new-prescription-right-data-summary-table-trow">
                      <td class="new-prescription-right-data-summary-table-td td-title td-left">PH</td>
                      <td class="new-prescription-right-data-summary-table-td" id="leftEyePHVal">${ph_os}</td>
                      <td class="new-prescription-right-data-summary-table-td" id="rightEyePHVal">${ph_od}</td>
                    </tr>`
                        : ""
                    }
                  </table>
                  </div>
                  <div class="new-prescription-notes-form is-visible">
                    <label style="justify-content: start !important;" for="user-note">Additional information (optional)</label>
                    <span name="note" id="user-note" style="display: flex;">${noteData}</span>
                </div>
              </div>
            </div>
          </div>`;
    } else if (
      previewItem == NON_PRESCRIPTION ||
      previewItem == "Non-prescription-tints"
    ) {
      previewInner += `
        <div class="new-prescription-right-inner">
          <div class="new-prescription-right-label">
            <p class="new-prescription-right-title">Review your selections</p>
          </div>
          <div class="new-prescription-right-data">
            <div class="new-prescription-right-data-summary">
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Frame</p>
                <p class="new-prescription-right-data-summary-desc">${
                  frameData?.frame_title ?? ""
                }</p>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Vision type</p>
                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text">${
                    frameData?.prescription_vision ?? ""
                  }</span>
                  <span class="new-prescription-right-data-summary-desc-price">$${priceWithCommaFormat.format(
                    frameData?.price ?? 0,
                  )}</span>
                </div>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Lens upgrade</p>
                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text">
                    ${this.checkVisionTypeName(prescriptionProduct)}
                  </span>
                  <span class="new-prescription-right-data-summary-desc-price">${
                    prescriptionProduct[1].price != 0
                      ? "$" +
                        priceWithCommaFormat.format(
                          prescriptionProduct[1].price,
                        )
                      : ""
                  }</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      const { sph_os, sph_od } = prescriptionData;

      const SPH_OS = parseFloat(sph_os);
      const SPH_OD = parseFloat(sph_od);

      const leftEyeSphValue =
        SPH_OS > 0 ? `+${SPH_OS.toFixed(2)}` : SPH_OS.toFixed(2);
      const rightEyeSphValue =
        SPH_OD > 0 ? `${SPH_OD.toFixed(2)}` : SPH_OD.toFixed(2);

      previewInner += `
        <div class="new-prescription-right-inner">
          <div class="new-prescription-right-label">
            <p class="new-prescription-right-title">Review your selections</p>
          </div>
          <div class="new-prescription-right-data">
            <div class="new-prescription-right-data-summary">
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Frame</p>
                <p class="new-prescription-right-data-summary-desc">${
                  frameData?.frame_title ?? ""
                }</p>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Vision type</p>
                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text">${
                    frameData?.prescription_vision ?? ""
                  }</span>
                  <span class="new-prescription-right-data-summary-desc-price">$${priceWithCommaFormat.format(
                    frameData?.price ?? 0,
                  )}</span>
                </div>
              </div>
              <div class="new-prescription-right-data-summary-group">
                <p class="new-prescription-right-data-summary-label">Lens upgrade</p>

                <div class="new-prescription-right-data-summary-desc">
                  <span class="new-prescription-right-data-summary-desc-text">
                    ${this.checkVisionTypeName(prescriptionProduct)}
                  </span>
                  <span class="new-prescription-right-data-summary-desc-price">${
                    prescriptionProduct[1].price != 0
                      ? "$" +
                        priceWithCommaFormat.format(
                          prescriptionProduct[1].price,
                        )
                      : ""
                  }</span>
                </div>
              </div>`;

      previewInner += `
        <div class="new-prescription-right-data-summary-group">
                  <p class="new-prescription-right-data-summary-label">Your prescription</p>
                    <table class="new-prescription-right-data-summary-table">
                      <tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td"></td>
                        <td class="new-prescription-right-data-summary-table-td td-title align-right">Left eye</td>
                        <td class="new-prescription-right-data-summary-table-td td-title align-right">Right eye</td>
                      </tr>
                      <tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">SPH</td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyeSPHVal">${leftEyeSphValue}</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyeSPHVal">${rightEyeSphValue}</td>
                      </tr>
                      <tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">CYL
                        </td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyeCYLVal">${parseFloat(
                          prescriptionProduct[2].cyl_os,
                        ).toFixed(2)}</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyeCYLVal">${parseFloat(
                          prescriptionProduct[2].cyl_od,
                        ).toFixed(2)}</td>
                      </tr>
                      <tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">AXIS</td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyeAXISVal">${
                          prescriptionProduct[2].axis_os
                        }</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyeAXISVal">${
                          prescriptionProduct[2].axis_od
                        }</td>
                      </tr>
                    ${
                      prescriptionProduct[0].prescription_vision == BIFOCAL ||
                      prescriptionProduct[0].prescription_vision == PROGRESSIVE
                        ? `<tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">ADD</td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyeADDVal">${prescriptionProduct[2].add_os}</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyeADDVal">${prescriptionProduct[2].add_os}</td>
                      </tr>`
                        : ""
                    }
                      <tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">IPD</td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyeIPDVal">${parseFloat(
                          prescriptionProduct[2].ipd_os,
                        ).toFixed(2)}</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyeIPDVal">${parseFloat(
                          prescriptionProduct[2].ipd_od,
                        ).toFixed(2)}</td>
                      </tr>
                      ${
                        prescriptionProduct[0].prescription_vision ==
                        PROGRESSIVE
                          ? `<tr class="new-prescription-right-data-summary-table-trow">
                        <td class="new-prescription-right-data-summary-table-td td-title td-left">PH</td>
                        <td class="new-prescription-right-data-summary-table-td" id="leftEyePHVal">${prescriptionProduct[2].ph_os}</td>
                        <td class="new-prescription-right-data-summary-table-td" id="rightEyePHVal">${prescriptionProduct[2].ph_os}</td>
                      </tr>`
                          : ""
                      }
                    </table>
                    </div>
                    <div class="new-prescription-notes-form is-visible">
                    <label style="justify-content: start !important;" for="user-note">Additional information (optional)</label>
                    <span name="note" id="user-note" style="display: flex;">${noteData}</span>
                  </div>
                </div>
              </div>
            </div>`;
    }

    divEl.innerHTML = previewInner;
    this.mobileSelectionReviewContentElement.append(divEl);
    this.hasCompletedMobileReviewSelection = true;
    this.handleNextBtnClassFunction("visible", "addClassName", "Add to bag");
    this.handlePercentageTrackerFunction("step4", 4);
    const sum = this.computeSubtotal(prescriptionProduct);
    prescriptionSubtotalElement.innerHTML = sum;
  }

  goToAddedToBagView() {
    if (
      !prescriptionModalRightSection &&
      !prescriptionModalRightAddToBagSection
    ) {
      return;
    }

    if (!addedToBagLabel) {
      return;
    }

    // addedToBagIconDesktop.style.display = "none";
    // addedToBagIconMobile.style.display = "none";
    addedToBagLoadingSpinner.style.display = "block";

    addedToBagLabel.innerText = "Adding your prescription \n glasses to bag";

    closePrescriptionFlowButton.style.display = "none";
    prescriptionModalRightSection.style.display = "none";
    prescriptionModalRightAddToBagSection.style.display = "flex";
  }

  updateAddedToBagView() {
    addedToBagLabel.innerText =
      "Your prescription glasses \n have been added to your bag!";

    addedToBagLoadingSpinner.style.display = "none";

    // if (this.isMobile) {
    //   addedToBagIconDesktop.style.display = "none";
    //   addedToBagIconMobile.style.display = "block";
    // } else {
    //   addedToBagIconDesktop.style.display = "block";
    //   addedToBagIconMobile.style.display = "none";
    // }
  }

  handleAddToBagError() {
    addedToBagLabel.innerText =
      "Oops! There's a problem adding \n your prescription glasses to bag.";
    addedToBagLoadingSpinner.style.display = "none";
    closePrescriptionFlowButton.style.display = "block";
  }

  checkVisionTypeName(prodItem) {
    let message = "";

    if (
      prodItem[0].prescription_vision.toLowerCase() ==
      prescriptionLensData[0][NON_PRESCRIPTION].vision.toLowerCase()
    ) {
      if (
        prodItem[1].lens_name.toLowerCase() ==
        prodItem[1].lensVariantName.toLowerCase()
      ) {
        message = `${prodItem[1].lens_name}`;
      }

      message = `${prodItem[1].lens_name} - ${prodItem[1].lensVariantName}`;
    } else {
      if (
        prodItem[1].lens_name.toLowerCase() ==
        prodItem[2].lensVariantName.toLowerCase()
      ) {
        message = `${prodItem[1].lens_name}`;
      }

      message = `${prodItem[1].lens_name} - ${prodItem[2].lensVariantName}`;
    }

    return message;
  }

  handleCheckFetchLens(grabPrescriptionLensName) {
    let data = "";

    fetchedPrescriptionData.forEach((d) => {
      d.order_id === grabPrescriptionOrderId &&
      d.prescription_id === fetchedPrescriptionDataId
        ? (data = d)
        : data;
    });

    grabPrescriptionLensName = grabPrescriptionLensName.substring(4);
    grabPrescriptionLensName = grabPrescriptionLensName.toLowerCase();

    let lowercase__lensName = grabPrescriptionLensName;

    this.loadFetchedDataToPrescriptionProduct(
      data,
      grabPrescriptionVisionType,
      prescriptionProduct[1].lens_name,
    );
  }

  loadFetchedDataToPrescriptionProduct(
    prescriptionData,
    visionType,
    lensUpgrade,
  ) {
    const { cyl_od, cyl_os, sph_od, sph_os } = prescriptionData;

    let isWithinMatrixRange = false;

    visionType = visionType.toLowerCase();

    if (!visionType || !lensUpgrade) {
      console.error("Client Error: No lens name found");
    }

    const newPrescriptionData = {
      CYL_OD: cyl_od,
      CYL_OS: cyl_os,
      SPH_OD: sph_od,
      SPH_OS: sph_os,
    };

    lensUpgrade = lensUpgrade.toLowerCase();
    visionType = visionType.toLowerCase();
    const singleVision =
      prescriptionLensData[0][SINGLE_VISION].vision.toLowerCase();
    const bifocal = prescriptionLensData[0][BIFOCAL].vision.toLowerCase();
    const progressive =
      prescriptionLensData[0][PROGRESSIVE].vision.toLowerCase();

    if (visionType === singleVision) {
      const singleVisionReading =
        prescriptionLensData[0][SINGLE_VISION][READING];

      const screenSafe =
        singleVisionReading[SCREEN_SAFE][0].lens_upgrade.toLowerCase();
      const sunAdaptive =
        singleVisionReading[SUN_ADAPTIVE][0].lens_upgrade.toLowerCase();
      const sunPlusScreen =
        singleVisionReading[SUN_PLUS_SCREEN][0].lens_upgrade.toLowerCase();
      const tintsRx =
        singleVisionReading[TINTS_RX][0].lens_upgrade.toLowerCase();
      const ultrathin =
        singleVisionReading[ULTRATHIN][0].lens_upgrade.toLowerCase();
      const airLens =
        singleVisionReading[AIR_LENS][0].lens_upgrade.toLowerCase();
      const classic =
        singleVisionReading[CLASSIC][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case screenSafe:
          isWithinMatrixRange =
            this.setSingleVisionScreenSafeToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case sunAdaptive:
          isWithinMatrixRange =
            this.setSingleVisionSunAdaptiveToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case sunPlusScreen:
          isWithinMatrixRange =
            this.setSingleVisionSunPlusScreenToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case tintsRx:
          isWithinMatrixRange =
            this.setSingleVisionTintsRxToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case ultrathin:
          isWithinMatrixRange =
            this.setSingleVisionUltrathinToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case airLens:
          isWithinMatrixRange =
            this.setSingleVisionAirLensToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
        case classic:
          isWithinMatrixRange =
            this.setSingleVisionClassicToPrescriptionProduct(
              newPrescriptionData,
            );

          break;
      }
    } else if (visionType === bifocal) {
      const kryptok =
        prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_upgrade.toLowerCase();
      const flatTop =
        prescriptionLensData[0][BIFOCAL][
          FLAT_TOP
        ][0].lens_upgrade.toLowerCase();
      const kryptokSunAdaptive =
        prescriptionLensData[0][BIFOCAL][
          KRYPTOK_SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();
      const flatTopSunAdaptive =
        prescriptionLensData[0][BIFOCAL][
          FLAT_TOP_SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case kryptok:
          // TODO: use isWithinMatrixRange = this.setBifocalKryptokToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isKryptokClassic, isKryptokCustomizedClassic] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: KRYPTOK,
              prescriptionData: newPrescriptionData,
            });

          if (isKryptokClassic) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][0].price;

            isWithinMatrixRange = true;
          } else if (isKryptokCustomizedClassic) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][1].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][1].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][KRYPTOK][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case flatTop:
          // use isWithinMatrixRange = this.setBifocalFlatTopToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isFlatTopClassic, isFlatTopCustomizedClassic] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: FLAT_TOP,
              prescriptionData: newPrescriptionData,
            });

          if (isFlatTopClassic) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].price;

            isWithinMatrixRange = true;
          } else if (isFlatTopCustomizedClassic) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case kryptokSunAdaptive:
          // TODO: use isWithinMatrixRange = this.setBifocalKryptokSunAdaptiveToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isKryptokSunAdaptive, isKryptokCustomizedSunAdaptive] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: KRYPTOK_SUN_ADAPTIVE,
              prescriptionData: newPrescriptionData,
            });

          if (isKryptokSunAdaptive) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][
                KRYPTOK_SUN_ADAPTIVE
              ][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          } else if (isKryptokCustomizedSunAdaptive) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][
                KRYPTOK_SUN_ADAPTIVE
              ][1].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case flatTopSunAdaptive:
          // TODO: use isWithinMatrixRange = this.setBifocalFlatTopSunAdaptiveToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isFlatTopSunAdaptive] = this.prescriptionFlowLogic({
            visionType: BIFOCAL,
            lensUpgrade: FLAT_TOP_SUN_ADAPTIVE,
            prescriptionData: newPrescriptionData,
          });

          if (isFlatTopSunAdaptive) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][BIFOCAL][
                FLAT_TOP_SUN_ADAPTIVE
              ][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          }

          break;
      }
    } else if (visionType === progressive) {
      const progressiveUltrathin =
        prescriptionLensData[0][PROGRESSIVE][
          ULTRATHIN
        ][0].lens_upgrade.toLowerCase();
      const progressiveAirLens =
        prescriptionLensData[0][PROGRESSIVE][
          AIR_LENS
        ][0].lens_upgrade.toLowerCase();
      const progressiveClassic =
        prescriptionLensData[0][PROGRESSIVE][
          CLASSIC
        ][0].lens_upgrade.toLowerCase();
      const progressiveSunAdaptive =
        prescriptionLensData[0][PROGRESSIVE][
          SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case progressiveUltrathin:
          // TODO: use isWithinMatrixRange = this.setProgressiveUltrathinToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isProgressiveUltrathin] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: ULTRATHIN,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveUltrathin) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveAirLens:
          // TODO: use isWithinMatrixRange = this.setProgressiveAirLensToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isProgressiveAirLens] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: AIR_LENS,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveAirLens) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveClassic:
          // TODO: use isWithinMatrixRange = this.setProgressiveClassicToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isProgressiveClassic] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: CLASSIC,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveClassic) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveSunAdaptive:
          // TODO: use isWithinMatrixRange = this.setProgressiveSunAdaptiveToPrescriptionProduct({ CYL_OD: cyl_od, CYL_OS: cyl_os, SPH_OD: sph_od, SPH_OS: sph_os }) method;

          const [isProgressiveSunAdaptive] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: CLASSIC,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveSunAdaptive) {
            prescriptionProduct[2].lensVariantName =
              prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].lens_name;
            prescriptionProduct[2].variant_id =
              prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].id;
            prescriptionProduct[1].price =
              prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          }

          break;
      }
    }

    return {
      isWithinMatrixRange,
    };
  }

  transformPrescriptionDataToLensInfo(
    prescriptionData,
    visionType,
    lensUpgrade,
  ) {
    const { cyl_od, cyl_os, sph_od, sph_os } = prescriptionData;

    const CYL_OD = +cyl_od;
    const CYL_OS = +cyl_os;
    const SPH_OD = +sph_od;
    const SPH_OS = +sph_os;

    const newPrescriptionData = { CYL_OD, CYL_OS, SPH_OD, SPH_OS };

    let lensName = "";
    let lensPrice = "";
    let isWithinMatrixRange = false;

    if (!prescriptionData) return {};
    if (!visionType) return {};
    if (!lensUpgrade) return {};

    lensUpgrade = lensUpgrade.toLowerCase();
    visionType = visionType.toLowerCase();
    const singleVision =
      prescriptionLensData[0][SINGLE_VISION].vision.toLowerCase();
    const bifocal = prescriptionLensData[0][BIFOCAL].vision.toLowerCase();
    const progressive =
      prescriptionLensData[0][PROGRESSIVE].vision.toLowerCase();

    if (visionType === singleVision) {
      const singleVisionReading =
        prescriptionLensData[0][SINGLE_VISION][READING];
      const singleVisionDistance =
        prescriptionLensData[0][SINGLE_VISION][DISTANCE];

      const screenSafe =
        singleVisionReading[SCREEN_SAFE][0].lens_upgrade.toLowerCase();
      const sunAdaptive =
        singleVisionReading[SUN_ADAPTIVE][0].lens_upgrade.toLowerCase();
      const sunPlusScreen =
        singleVisionReading[SUN_PLUS_SCREEN][0].lens_upgrade.toLowerCase();
      const tintsRx =
        singleVisionReading[TINTS_RX][0].lens_upgrade.toLowerCase();
      const ultrathin =
        singleVisionReading[ULTRATHIN][0].lens_upgrade.toLowerCase();
      const airLens =
        singleVisionReading[AIR_LENS][0].lens_upgrade.toLowerCase();
      const classic =
        singleVisionReading[CLASSIC][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case screenSafe:
          const [
            isScreenSafe,
            isSlimScreenSafeOptionOne,
            isSlimScreenSafeOptionTwo,
            isSlimScreenSafeOptionThree,
            isScreenSafeReadingType,
            isScreenSafeDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: SCREEN_SAFE,
            prescriptionData: newPrescriptionData,
          });

          if (isScreenSafe) {
            if (isScreenSafeReadingType) {
              lensName = singleVisionReading[SCREEN_SAFE][0].lens_name;
              lensPrice = singleVisionReading[SCREEN_SAFE][0].price;
            }
            if (isScreenSafeDistanceType) {
              lensName = singleVisionDistance[SCREEN_SAFE][0].lens_name;
              lensPrice = singleVisionDistance[SCREEN_SAFE][0].price;
            }
            isWithinMatrixRange = true;
          } else if (isSlimScreenSafeOptionOne) {
            lensName = singleVisionDistance[SCREEN_SAFE][1].lens_name;
            lensPrice = singleVisionDistance[SCREEN_SAFE][1].price;

            isWithinMatrixRange = true;
          } else if (isSlimScreenSafeOptionTwo) {
            lensName = singleVisionReading[SCREEN_SAFE][1].lens_name;
            lensPrice = singleVisionReading[SCREEN_SAFE][1].price;

            isWithinMatrixRange = true;
          } else if (isSlimScreenSafeOptionThree) {
            lensName = singleVisionDistance[SCREEN_SAFE][1].lens_name;
            lensPrice = singleVisionDistance[SCREEN_SAFE][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case sunAdaptive:
          const [
            isSunAdaptiveOptionOne,
            isSunAdaptiveOptionTwo,
            isSunAdaptiveCustomized,
            isSunAdaptiveOptionOneReadingType,
            isSunAdaptiveCustomizedReadingType,
            isSunAdaptiveOptionOneDistanceType,
            isSunAdaptiveCustomizedDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: SUN_ADAPTIVE,
            prescriptionData: newPrescriptionData,
          });

          if (isSunAdaptiveOptionOne) {
            if (isSunAdaptiveOptionOneReadingType) {
              lensName = singleVisionReading[SUN_ADAPTIVE][0].lens_name;
              lensPrice = singleVisionReading[SUN_ADAPTIVE][0].price;
            }
            if (isSunAdaptiveOptionOneDistanceType) {
              lensName = singleVisionDistance[SUN_ADAPTIVE][0].lens_name;
              lensPrice = singleVisionDistance[SUN_ADAPTIVE][0].price;
            }
            isWithinMatrixRange = true;
          } else if (isSunAdaptiveOptionTwo) {
            lensName = singleVisionDistance[SUN_ADAPTIVE][0].lens_name;
            lensPrice = singleVisionDistance[SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          } else if (isSunAdaptiveCustomized) {
            if (isSunAdaptiveCustomizedReadingType) {
              lensName = singleVisionReading[SUN_ADAPTIVE][1].lens_name;
              lensPrice = singleVisionReading[SUN_ADAPTIVE][1].price;
            }
            if (isSunAdaptiveCustomizedDistanceType) {
              lensName = singleVisionDistance[SUN_ADAPTIVE][1].lens_name;
              lensPrice = singleVisionDistance[SUN_ADAPTIVE][1].price;
            }
            isWithinMatrixRange = true;
          }

          break;
        case sunPlusScreen:
          const [
            isSpectrumDuo,
            isSpectrumDuoReadingType,
            isSpectrumDuoDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: SUN_PLUS_SCREEN,
            prescriptionData: newPrescriptionData,
          });

          if (isSpectrumDuo) {
            if (isSpectrumDuoReadingType) {
              lensName = singleVisionReading[SUN_PLUS_SCREEN][0].lens_name;
              lensPrice = singleVisionReading[SUN_PLUS_SCREEN][0].price;
            }
            if (isSpectrumDuoDistanceType) {
              lensName = singleVisionDistance[SUN_PLUS_SCREEN][0].lens_name;
              lensPrice = singleVisionDistance[SUN_PLUS_SCREEN][0].price;
            }
            isWithinMatrixRange = true;
          }

          break;
        case tintsRx:
          const [isTints, isTintsReadingType, isTintsDistanceType] =
            this.prescriptionFlowLogic({
              visionType: SINGLE_VISION,
              lensUpgrade: TINTS_RX,
              prescriptionData: newPrescriptionData,
            });

          const hasTintsColor = !!prescriptionProduct[1]?.tints_color;

          if (isTints) {
            if (isTintsReadingType && hasTintsColor) {
              singleVisionReading[TINTS_RX].forEach((tint) => {
                if (prescriptionProduct[1].tints_color == tint.lens_name) {
                  lensName = tint.lens_name;
                  prescriptionProduct[1].variant_id = tint.id;
                  lensPrice = tint.price;
                }
              });
            }
            if (isTintsDistanceType && hasTintsColor) {
              singleVisionDistance[TINTS_RX].forEach((tint) => {
                if (prescriptionProduct[1].tints_color == tint.lens_name) {
                  lensName = tint.lens_name;
                  prescriptionProduct[1].variant_id = tint.id;
                  lensPrice = tint.price;
                }
              });
            }

            isWithinMatrixRange = true;
          }

          break;
        case ultrathin:
          const [
            isSlimCustomized,
            isUltrathin,
            isSlim,
            isSlimCustomizedReadingType,
            isSlimCustomizedDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: ULTRATHIN,
            prescriptionData: newPrescriptionData,
          });

          if (isSlimCustomized) {
            if (isSlimCustomizedReadingType) {
              lensName = singleVisionReading[ULTRATHIN][1].lens_name;
              lensPrice = singleVisionReading[ULTRATHIN][1].price;
            }

            if (isSlimCustomizedDistanceType) {
              lensName = singleVisionDistance[ULTRATHIN][1].lens_name;
              lensPrice = singleVisionDistance[ULTRATHIN][1].price;
            }

            isWithinMatrixRange = true;
          }

          if (isUltrathin) {
            lensName = singleVisionDistance[ULTRATHIN][0].lens_name;
            lensPrice = singleVisionDistance[ULTRATHIN][0].price;
            isWithinMatrixRange = true;
          }

          if (isSlim) {
            lensName = singleVisionDistance[ULTRATHIN][0].lens_name;
            lensPrice = singleVisionDistance[ULTRATHIN][0].price;
            isWithinMatrixRange = true;
          }

          break;
        case airLens:
          const [
            isHighImpact,
            isHighImpactCustomized,
            isHighImpactReadingType,
            isHighImpactCustomizedReadingType,
            isHighImpactDistanceType,
            isHighImpactCustomizedDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: AIR_LENS,
            prescriptionData: newPrescriptionData,
          });

          if (isHighImpact) {
            if (isHighImpactReadingType) {
              lensName = singleVisionReading[AIR_LENS][0].lens_name;
              lensPrice = singleVisionReading[AIR_LENS][0].price;
            }
            if (isHighImpactDistanceType) {
              lensName = singleVisionDistance[AIR_LENS][0].lens_name;
              lensPrice = singleVisionDistance[AIR_LENS][0].price;
            }

            isWithinMatrixRange = true;
          } else if (isHighImpactCustomized) {
            if (isHighImpactCustomizedReadingType) {
              lensName = singleVisionReading[AIR_LENS][1].lens_name;
              lensPrice = singleVisionReading[AIR_LENS][1].price;
            }
            if (isHighImpactCustomizedDistanceType) {
              lensName = singleVisionDistance[AIR_LENS][1].lens_name;
              lensPrice = singleVisionDistance[AIR_LENS][1].price;
            }

            isWithinMatrixRange = true;
          }

          break;
        case classic:
          const [
            isSpheric,
            isProcessed,
            isSphericReadingType,
            isProcessedReadingType,
            isSphericDistanceType,
            isProcessedDistanceType,
          ] = this.prescriptionFlowLogic({
            visionType: SINGLE_VISION,
            lensUpgrade: CLASSIC,
            prescriptionData: newPrescriptionData,
          });

          if (isSpheric) {
            if (isSphericReadingType) {
              lensName = singleVisionReading[CLASSIC][0].lens_name;
              lensPrice = singleVisionReading[CLASSIC][0].price;
            }
            if (isSphericDistanceType) {
              lensName = singleVisionDistance[CLASSIC][0].lens_name;
              lensPrice = singleVisionDistance[CLASSIC][0].price;
            }

            isWithinMatrixRange = true;
          } else if (isProcessed) {
            if (isProcessedReadingType) {
              lensName = singleVisionReading[CLASSIC][1].lens_name;
              lensPrice = singleVisionReading[CLASSIC][1].price;
            }
            if (isProcessedDistanceType) {
              lensName = singleVisionDistance[CLASSIC][1].lens_name;
              lensPrice = singleVisionDistance[CLASSIC][1].price;
            }

            isWithinMatrixRange = true;
          }

          break;
      }
    } else if (visionType === bifocal) {
      const kryptok =
        prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_upgrade.toLowerCase();
      const flatTop =
        prescriptionLensData[0][BIFOCAL][
          FLAT_TOP
        ][0].lens_upgrade.toLowerCase();
      const kryptokSunAdaptive =
        prescriptionLensData[0][BIFOCAL][
          KRYPTOK_SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();
      const flatTopSunAdaptive =
        prescriptionLensData[0][BIFOCAL][
          FLAT_TOP_SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case kryptok:
          const [isKryptokClassic, isKryptokCustomizedClassic] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: KRYPTOK,
              prescriptionData: newPrescriptionData,
            });

          if (isKryptokClassic) {
            lensName = prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_name;
            lensPrice = prescriptionLensData[0][BIFOCAL][KRYPTOK][0].price;

            isWithinMatrixRange = true;
          } else if (isKryptokCustomizedClassic) {
            lensName = prescriptionLensData[0][BIFOCAL][KRYPTOK][1].lens_name;
            lensPrice = prescriptionLensData[0][BIFOCAL][KRYPTOK][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case flatTop:
          const [isFlatTopClassic, isFlatTopCustomizedClassic] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: FLAT_TOP,
              prescriptionData: newPrescriptionData,
            });

          if (isFlatTopClassic) {
            lensName = prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].lens_name;
            lensPrice = prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].price;

            isWithinMatrixRange = true;
          } else if (isFlatTopCustomizedClassic) {
            lensName = prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_name;
            lensPrice = prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case kryptokSunAdaptive:
          const [isKryptokSunAdaptive, isKryptokCustomizedSunAdaptive] =
            this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: KRYPTOK_SUN_ADAPTIVE,
              prescriptionData: newPrescriptionData,
            });

          if (isKryptokSunAdaptive) {
            lensName =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0]
                .lens_name;
            lensPrice =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          } else if (isKryptokCustomizedSunAdaptive) {
            lensName =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1]
                .lens_name;
            lensPrice =
              prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].price;

            isWithinMatrixRange = true;
          }

          break;
        case flatTopSunAdaptive:
          const [isFlatTopSunAdaptive] = this.prescriptionFlowLogic({
            visionType: BIFOCAL,
            lensUpgrade: FLAT_TOP_SUN_ADAPTIVE,
            prescriptionData: newPrescriptionData,
          });

          if (isFlatTopSunAdaptive) {
            lensName =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0]
                .lens_name;
            lensPrice =
              prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0].price;

            isWithinMatrixRange = true;
          }

          break;
      }
    } else if (visionType === progressive) {
      const progressiveUltrathin =
        prescriptionLensData[0][PROGRESSIVE][
          ULTRATHIN
        ][0].lens_upgrade.toLowerCase();
      const progressiveAirLens =
        prescriptionLensData[0][PROGRESSIVE][
          AIR_LENS
        ][0].lens_upgrade.toLowerCase();
      const progressiveClassic =
        prescriptionLensData[0][PROGRESSIVE][
          CLASSIC
        ][0].lens_upgrade.toLowerCase();
      const progressiveSunAdaptive =
        prescriptionLensData[0][PROGRESSIVE][
          SUN_ADAPTIVE
        ][0].lens_upgrade.toLowerCase();

      switch (lensUpgrade) {
        case progressiveUltrathin:
          const [isProgressiveUltrathin] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: ULTRATHIN,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveUltrathin) {
            lensName =
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name;
            lensPrice =
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveAirLens:
          const [isProgressiveAirLens] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: AIR_LENS,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveAirLens) {
            lensName =
              prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].lens_name;
            lensPrice = prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveClassic:
          const [isProgressiveClassic] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: CLASSIC,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveClassic) {
            lensName =
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name;
            lensPrice = prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price;

            isWithinMatrixRange = true;
          }

          break;
        case progressiveSunAdaptive:
          const [isProgressiveSunAdaptive] = this.prescriptionFlowLogic({
            visionType: PROGRESSIVE,
            lensUpgrade: CLASSIC,
            prescriptionData: newPrescriptionData,
          });

          if (isProgressiveSunAdaptive) {
            lensName =
              prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].lens_name;
            lensPrice =
              prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].price;
            isWithinMatrixRange = true;
          }

          break;
      }
    }

    return {
      isInMatrixRange: isWithinMatrixRange,
      lens: lensName,
      price: lensPrice,
      lensUpgrade,
    };
  }

  handleNextStep(el) {
    // handle step 2 and step 3
    let elObj = this.getAttrElFunction(el);
    el.classList.add("is-active"); // add is-active class for the selected item in step 2
    elObj.listItemSiblings.forEach((step2Item) => {
      // loop into step 2 items elements and remove is-active class
      const dataName = step2Item.dataset.name;
      elObj.name != dataName ? step2Item.classList.remove("is-active") : "";
    });

    switch (elObj.stepNum) {
      case "2":
      case 2:
        this.processStep2Func(el, elObj);

        break;
      case "3":
      case 3:
        this.processStep3Func(el, elObj);
        break;

      default:
        break;
    }
  }

  processStep2Func(_, elObj) {
    const lensUpgradeName = elObj.name;
    let lensName = "";
    let variantID = "";

    if (
      prescriptionProduct[0].prescription_vision == NON_PRESCRIPTION &&
      lensUpgradeName !== TINTS_RX
    ) {
      lensName =
        prescriptionLensData[0][NON_PRESCRIPTION][`${lensUpgradeName}`][0]
          .lens_name;
      variantID =
        prescriptionLensData[0][NON_PRESCRIPTION][`${lensUpgradeName}`][0].id;
    }

    let step2Obj = {
      lensVariantName: lensName,
      lens_name: elObj.name,
      old_lens_name: elObj.name,
      old_price: elObj.price,
      prev_content: elObj.contentDiv__id,
      price: elObj.price,
      step: 2,
      target: elObj.target,
      variant_id: variantID,
    };

    if (prescriptionProduct.length === 1) {
      prescriptionProduct.push(step2Obj);
    } else {
      prescriptionProduct.map((cartDataItem) => {
        if (cartDataItem.step == 2) {
          cartDataItem.lens_name = elObj.name;
          cartDataItem.variant_id = variantID;
          cartDataItem.old_lens_name = elObj.name;
          cartDataItem.price = elObj.price;
          cartDataItem.old_price = elObj.price;
          cartDataItem.target = elObj.target;
          cartDataItem.lensVariantName = lensName;
        }
      });
    }

    this.updateDataGroup(
      lensUpgradeContainerElement,
      lensUpgradePriceElement,
      elObj,
      prescriptionSubtotalElement,
    );
    this.handleNextBtnClassFunction("visible", "addClassName");
  }

  processStep3Func(el, elObj) {
    // TODO
  }

  getAttrElFunction(el) {
    const { name, price, target } = el.dataset;
    let contentDiv = el.parentElement.parentElement.parentElement;
    let contentDiv__id = contentDiv.getAttribute("id");
    let stepNum = contentDiv.dataset.step;
    let listItemSiblings = contentDiv.querySelectorAll(
      ".new-prescription-right-data-item",
    );

    return {
      name,
      price,
      target,
      contentDiv,
      contentDiv__id,
      stepNum,
      listItemSiblings,
    };
  }

  handleSelectedTints(el) {
    const { tints } = el.dataset;

    prescriptionTintSelectionElements.forEach((item) => {
      tints === item.dataset.tints
        ? el.classList.add("is-active")
        : item.classList.remove("is-active");
    });

    prescriptionProduct[1]["tints_color"] = tints;
    let lensUpgrade__span = lensUpgradeContainerElement.querySelector(
      ".new-prescription-text-type",
    );

    switch (prescriptionProduct[0].prescription_vision.toLowerCase()) {
      case SINGLE_VISION.toLowerCase():
        prescriptionLensData[0][SINGLE_VISION][READING][TINTS_RX].forEach(
          (item) => {
            item.lens_name == tints
              ? (prescriptionProduct[1].price = item.price)
              : item;
          },
        );
        lensUpgrade__span.textContent = `${prescriptionProduct[1].lens_name} - ${prescriptionProduct[1].tints_color}`;
        this.handleNextBtnClassFunction("visible", "addClassName", "Next");
        break;

      case NON_PRESCRIPTION.toLowerCase():
        prescriptionLensData[0][NON_PRESCRIPTION][TINTS_RX].forEach((item) => {
          item.lens_name == tints
            ? (prescriptionProduct[1].variant_id = item.id)
            : item;
          item.lens_name == tints
            ? (prescriptionProduct[1].lensVariantName = item.lens_name)
            : item;
          item.lens_name == tints
            ? (prescriptionProduct[1].price = item.price)
            : item;
        });
        lensUpgrade__span.textContent = `${prescriptionProduct[1].lens_name} - ${prescriptionProduct[1].tints_color}`;
        this.isMobile
          ? this.handleNextBtnClassFunction("visible", "addClassName", "Next")
          : this.handleNextBtnClassFunction(
              "visible",
              "addClassName",
              "Add to bag",
            );
        return;
        break;

      default:
        break;
    }
  }

  searchPrescriptionRecord(el) {
    this.prescriptionOrigin = GRAB_RX;
    this.isMobile
      ? this.handleNextBtnClassFunction("visible", "addClassName", "Next")
      : this.handleNextBtnClassFunction(
          "visible",
          "addClassName",
          "Add to bag",
        );

    const { target } = el.dataset;

    let parentDivEl = el.parentElement.parentElement;
    let targetDivEl = document.querySelector(`#${target}`);

    parentDivEl.classList.remove("is-active");
    targetDivEl.classList.add("is-active");
  }

  addNewPrescription(el) {
    this.prescriptionOrigin = NEW_RX;
    this.isMobile
      ? this.handleNextBtnClassFunction("visible", "addClassName", "Next")
      : this.handleNextBtnClassFunction(
          "visible",
          "addClassName",
          "Add to bag",
        );

    this.addFormTable(prescriptionProduct[0].prescription_vision);

    if (prescriptionProduct.length === 2) {
      const prescriptionObject = {
        axis_od: "",
        axis_os: "",
        cyl_od: "",
        cyl_os: "",
        ipd_od: "",
        ipd_os: "",
        lensVariantName: "",
        sph_od: "",
        sph_os: "",
        step: 3,
      };

      switch (prescriptionProduct[0].prescription_vision) {
        case BIFOCAL:
          prescriptionProduct.push({
            ...prescriptionObject,
            add_od: "",
            add_os: "",
          });
          break;

        case PROGRESSIVE:
          prescriptionProduct.push({
            ...prescriptionObject,
            add_od: "",
            add_os: "",
            ph_od: "",
            ph_os: "",
          });
          break;

        default:
          prescriptionProduct.push(prescriptionObject);
          break;
      }

      this.isMobile
        ? this.handleNextBtnClassFunction("visible", "addClassName", "Next")
        : this.handleNextBtnClassFunction(
            "visible",
            "addClassName",
            "Add to bag",
          );
    }

    const { target } = el.dataset;
    let parentDivEl = el.parentElement.parentElement;
    let targetDivEl = document.querySelector(`#${target}`);

    parentDivEl.classList.remove("is-active");
    targetDivEl.classList.add("is-active");

    let newPrescriptionFormSelectElements =
      addNewPrescriptionForm.querySelectorAll("select");

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    newPrescriptionFormSelectElements.forEach((selectElements) => {
      selectElements.addEventListener("change", function () {
        newPrescriptionUI.handleNewPrescriptionChange(selectElements);
      });

      const userClickListener = isSafari ? "mousedown" : "click";

      selectElements.addEventListener(userClickListener, function () {
        this.classList.add("is-active");
      });
    });
  }

  handleNewPrescriptionChange(el) {
    const name = el.getAttribute("name");
    let isWithinMatrixRange = false;

    sph_od = document.querySelector("#sphRightEye");
    cyl_od = document.querySelector("#cylRightEye");
    sph_os = document.querySelector("#sphLeftEye");
    cyl_os = document.querySelector("#cylLeftEye");

    prescriptionProduct[2].sph_od = sph_od.value;
    prescriptionProduct[2].cyl_od = cyl_od.value;
    prescriptionProduct[2].sph_os = sph_os.value;
    prescriptionProduct[2].cyl_os = cyl_os.value;

    const visionType = prescriptionProduct[0].prescription_vision.toLowerCase();

    const singleVision =
      prescriptionLensData[0][SINGLE_VISION].vision.toLowerCase();
    const bifocal = prescriptionLensData[0][BIFOCAL].vision.toLowerCase();
    const progressive =
      prescriptionLensData[0][PROGRESSIVE].vision.toLowerCase();

    const lensUpgrade = prescriptionProduct[1].lens_name.toLowerCase();

    const prescriptionData = {
      CYL_OD: cyl_od.value,
      CYL_OS: cyl_os.value,
      SPH_OD: sph_od.value,
      SPH_OS: sph_os.value,
    };

    if (
      name == "sphRightEye" ||
      name == "sphLeftEye" ||
      name == "cylRightEye" ||
      name == "cylLeftEye"
    ) {
      if (visionType === singleVision) {
        const singleVisionReading =
          prescriptionLensData[0][SINGLE_VISION][READING];

        const screenSafe =
          singleVisionReading[SCREEN_SAFE][0].lens_upgrade.toLowerCase();
        const sunAdaptive =
          singleVisionReading[SUN_ADAPTIVE][0].lens_upgrade.toLowerCase();
        const sunPlusScreen =
          singleVisionReading[SUN_PLUS_SCREEN][0].lens_upgrade.toLowerCase();
        const tintsRx =
          singleVisionReading[TINTS_RX][0].lens_upgrade.toLowerCase();
        const ultrathin =
          singleVisionReading[ULTRATHIN][0].lens_upgrade.toLowerCase();
        const airLens =
          singleVisionReading[AIR_LENS][0].lens_upgrade.toLowerCase();
        const classic =
          singleVisionReading[CLASSIC][0].lens_upgrade.toLowerCase();

        switch (lensUpgrade) {
          case screenSafe:
            isWithinMatrixRange =
              this.setSingleVisionScreenSafeToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case sunAdaptive:
            isWithinMatrixRange =
              this.setSingleVisionSunAdaptiveToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case sunPlusScreen:
            isWithinMatrixRange =
              this.setSingleVisionSunPlusScreenToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case tintsRx:
            isWithinMatrixRange =
              this.setSingleVisionTintsRxToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case ultrathin:
            isWithinMatrixRange =
              this.setSingleVisionUltrathinToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case airLens:
            isWithinMatrixRange =
              this.setSingleVisionAirLensToPrescriptionProduct(
                prescriptionData,
              );

            break;
          case classic:
            isWithinMatrixRange =
              this.setSingleVisionClassicToPrescriptionProduct(
                prescriptionData,
              );

            break;
        }
      } else if (visionType === bifocal) {
        const kryptok =
          prescriptionLensData[0][BIFOCAL][
            KRYPTOK
          ][0].lens_upgrade.toLowerCase();
        const flatTop =
          prescriptionLensData[0][BIFOCAL][
            FLAT_TOP
          ][0].lens_upgrade.toLowerCase();
        const kryptokSunAdaptive =
          prescriptionLensData[0][BIFOCAL][
            KRYPTOK_SUN_ADAPTIVE
          ][0].lens_upgrade.toLowerCase();
        const flatTopSunAdaptive =
          prescriptionLensData[0][BIFOCAL][
            FLAT_TOP_SUN_ADAPTIVE
          ][0].lens_upgrade.toLowerCase();

        switch (lensUpgrade) {
          case kryptok:
            const [isKryptokClassic, isKryptokCustomizedClassic] =
              this.prescriptionFlowLogic({
                visionType: BIFOCAL,
                lensUpgrade: KRYPTOK,
                prescriptionData,
              });

            if (isKryptokClassic) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][0].price;

              isWithinMatrixRange = true;
            } else if (isKryptokCustomizedClassic) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][1].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][1].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][KRYPTOK][1].price;

              isWithinMatrixRange = true;
            }

            break;
          case flatTop:
            const [isFlatTopClassic, isFlatTopCustomizedClassic] =
              this.prescriptionFlowLogic({
                visionType: BIFOCAL,
                lensUpgrade: FLAT_TOP,
                prescriptionData,
              });

            if (isFlatTopClassic) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][0].price;

              isWithinMatrixRange = true;
            } else if (isFlatTopCustomizedClassic) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price;

              isWithinMatrixRange = true;
            }

            break;
          case kryptokSunAdaptive:
            const [isKryptokSunAdaptive, isKryptokCustomizedSunAdaptive] =
              this.prescriptionFlowLogic({
                visionType: BIFOCAL,
                lensUpgrade: KRYPTOK_SUN_ADAPTIVE,
                prescriptionData,
              });

            if (isKryptokSunAdaptive) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][
                  KRYPTOK_SUN_ADAPTIVE
                ][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][0].price;

              isWithinMatrixRange = true;
            } else if (isKryptokCustomizedSunAdaptive) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][
                  KRYPTOK_SUN_ADAPTIVE
                ][1].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][KRYPTOK_SUN_ADAPTIVE][1].price;

              isWithinMatrixRange = true;
            }

            break;
          case flatTopSunAdaptive:
            const [isFlatTopSunAdaptive] = this.prescriptionFlowLogic({
              visionType: BIFOCAL,
              lensUpgrade: FLAT_TOP_SUN_ADAPTIVE,
              prescriptionData,
            });

            if (isFlatTopSunAdaptive) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][BIFOCAL][
                  FLAT_TOP_SUN_ADAPTIVE
                ][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][BIFOCAL][FLAT_TOP_SUN_ADAPTIVE][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][BIFOCAL][
                  FLAT_TOP_SUN_ADAPTIVE
                ][0].price;

              isWithinMatrixRange = true;
            }

            break;
        }
      } else if (visionType === progressive) {
        const progressiveUltrathin =
          prescriptionLensData[0][PROGRESSIVE][
            ULTRATHIN
          ][0].lens_upgrade.toLowerCase();
        const progressiveAirLens =
          prescriptionLensData[0][PROGRESSIVE][
            AIR_LENS
          ][0].lens_upgrade.toLowerCase();
        const progressiveClassic =
          prescriptionLensData[0][PROGRESSIVE][
            CLASSIC
          ][0].lens_upgrade.toLowerCase();
        const progressiveSunAdaptive =
          prescriptionLensData[0][PROGRESSIVE][
            SUN_ADAPTIVE
          ][0].lens_upgrade.toLowerCase();

        switch (lensUpgrade) {
          case progressiveUltrathin:
            const [isProgressiveUltrathin] = this.prescriptionFlowLogic({
              visionType: PROGRESSIVE,
              lensUpgrade: ULTRATHIN,
              prescriptionData,
            });

            if (isProgressiveUltrathin) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price;
              isWithinMatrixRange = true;
            }

            break;
          case progressiveAirLens:
            const [isProgressiveAirLens] = this.prescriptionFlowLogic({
              visionType: PROGRESSIVE,
              lensUpgrade: AIR_LENS,
              prescriptionData,
            });

            if (isProgressiveAirLens) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][PROGRESSIVE][AIR_LENS][0].price;
              isWithinMatrixRange = true;
            }

            break;
          case progressiveClassic:
            const [isProgressiveClassic] = this.prescriptionFlowLogic({
              visionType: PROGRESSIVE,
              lensUpgrade: CLASSIC,
              prescriptionData,
            });

            if (isProgressiveClassic) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price;
              isWithinMatrixRange = true;
            }

            break;
          case progressiveSunAdaptive:
            const [isProgressiveSunAdaptive] = this.prescriptionFlowLogic({
              visionType: PROGRESSIVE,
              lensUpgrade: CLASSIC,
              prescriptionData,
            });

            if (isProgressiveSunAdaptive) {
              prescriptionProduct[2].lensVariantName =
                prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].lens_name;
              prescriptionProduct[2].variant_id =
                prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].id;
              prescriptionProduct[1].price =
                prescriptionLensData[0][PROGRESSIVE][SUN_ADAPTIVE][0].price;

              isWithinMatrixRange = true;
            }

            break;
        }
      }

      if (isWithinMatrixRange) {
        if (
          prescriptionProduct[1].lens_name ===
          prescriptionLensData[0][SINGLE_VISION][READING][TINTS_RX][0]
            .lens_upgrade
        ) {
        } else {
          if (
            prescriptionProduct[1].lens_name ===
              prescriptionLensData[0][NON_PRESCRIPTION][SUN_PLUS_SCREEN][0]
                .lens_upgrade ||
            prescriptionProduct[0].prescription_vision.toLowerCase() ==
              prescriptionLensData[0][NON_PRESCRIPTION].vision.toLowerCase()
          ) {
            lensUpgradePriceElement.innerHTML =
              "$" + priceWithCommaFormat.format(prescriptionProduct[1].price);
            lensUpgradeElement.innerHTML = `${
              prescriptionProduct[1].lens_name
            } ${
              prescriptionProduct[2].lensVariantName
                ? ` - ${prescriptionProduct[2].lensVariantName}`
                : "- n/a"
            }`;
          } else {
            lensUpgradePriceElement.innerHTML =
              "$" + priceWithCommaFormat.format(prescriptionProduct[1].price);
            lensUpgradeElement.innerHTML = `${
              prescriptionProduct[1].lens_name
            } ${
              prescriptionProduct[2].lensVariantName
                ? ` - ${prescriptionProduct[2].lensVariantName}`
                : "- n/a"
            }`;
          }
        }

        let total = this.computeSubtotal(prescriptionProduct);
        prescriptionSubtotalElement.innerHTML = total;
      } else {
        if (
          prescriptionProduct[1].lens_name ===
          prescriptionLensData[0][SINGLE_VISION][READING][TINTS_RX][0]
            .lens_upgrade
        ) {
        } else {
          lensUpgradePriceElement.innerHTML = priceWithCommaFormat.format(
            prescriptionProduct[1].old_price,
          );
          lensUpgradeElement.innerHTML = `${prescriptionProduct[1].lens_name}`;
          let total = this.computeSubtotal(prescriptionProduct);
          prescriptionSubtotalElement.innerHTML = total;
        }
      }
    }
  }

  addFormTable(vision) {
    let tableData;

    if (this.isMobile) {
      // SP
      tableData = `
      <div class='new-prescription-form-table-wrapper' style="margin-bottom:24px">
        <table class="new-prescription-form-table-main" id="new-prescription-form-table-main">
          <thead class="new-prescription-form-table-thead">
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th"></th>
              <th class="new-prescription-form-table-th">
                (OS)<br>Left eye
              </th>
              <th class="new-prescription-form-table-th">
                (OD)<br>Right eye
              </th>
            </tr>
            <th class="add-space-mobile"></th>
          </thead>
          <tbody class="new-prescription-form-table-tbody">
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span">
                    <small class="new-prescription-form-table-small">Indicates
                      eyeglass <br>prescription power</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">SPH</span>
                  </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="sphLeftEye" id="sphLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="sphRightEye" id="sphRightEye"></select>
              </td>
            </tr>
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span">
                    <small class="new-prescription-form-table-small">Correction
                      number <br>needed for astigmatism. <br>This value is
                      optional</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">CYL</span>
                   </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="cylLeftEye" id="cylLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="cylRightEye" id="cylRightEye"></select>
              </td>
            </tr>
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span">
                    <small class="new-prescription-form-table-small">Describe
                      the degree and <br>direction of your astigmatism.
                      <br>Required when CYL is entered</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">AXIS</span>
                  </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="axisLeftEye" id="axisLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="axisRightEye" id="axisRightEye"></select>
              </td>
            </tr>
          ${
            vision === BIFOCAL || vision === PROGRESSIVE
              ? ` <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span ">
                    <small class="new-prescription-form-table-small">Added magnifying power <br>on the lower part of <br>prescription lenses​</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px">ADD</span>
                  </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="addLeftEye" id="addLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="addRightEye" id="addRightEye"></select>
              </td>
            </tr>`
              : ""
          }
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span">
                    <small class="new-prescription-form-table-small">Distance
                      between the <br>centers of the pupil</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">IPD</span>
                  </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="ipdLeftEye" id="ipdLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="ipdRightEye" id="ipdRightEye"></select>
              </td>
            </tr>
          ${
            vision === PROGRESSIVE
              ? ` <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                  <span class="new-prescription-form-table-span">
                    <small class="new-prescription-form-table-small">Indicates distance from <br>the center of the pupil <br>to the frame’s bottom rim​</small>
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px">PH</span>
                  </span>
                </p>
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="phLeftEye" id="phLeftEye"></select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="phRightEye" id="phRightEye"></select
              </td>
            </tr>`
              : ""
          }
          </tbody>
        </table>
      </div>
      `;
    } else {
      // DESKTOP
      tableData = `
      <div class='new-prescription-form-table-wrapper' style="margin-bottom:24px">
        <table class="new-prescription-form-table-main" id="new-prescription-form-table-main">
          <thead class="new-prescription-form-table-thead">
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th"></th>
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px">SPH
                    <small class="new-prescription-form-table-small">Indicates
                      eyeglass <br>prescription power</small>
                  </span>
                  </span>
                </p>
              </th>
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">CYL
                    <small class="new-prescription-form-table-small">Correction
                      number <br>needed for astigmatism. <br>This value is
                      optional</small>
                  </span>
                  </span>
                </p>
              </th>
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">AXIS
                    <small class="new-prescription-form-table-small u-right">Describe
                      the degree and <br>direction of your astigmatism.
                      <br>Required when CYL is entered</small>
                  </span>
                  </span>
                </p>
              </th>
              ${
                vision === BIFOCAL || vision === PROGRESSIVE
                  ? `<th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">ADD
                    <small class="new-prescription-form-table-small u-right">Added magnifying power <br>on the lower part of <br>prescription lenses​</small>
                      </span>
                      </span>
                    </p>
                </th>`
                  : ""
              }
              <th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">IPD
                    <small class="new-prescription-form-table-small u-right">Distance
                      between the <br>centers of the pupil</small>
                  </span>
                  </span>
                </p>
              </th>
              ${
                vision === PROGRESSIVE
                  ? `<th class="new-prescription-form-table-th">
                <p class="th-flex">
                <span class="new-prescription-form-table-span">
                  <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">PH
                    <small class="new-prescription-form-table-small u-right">Indicates distance from <br>the center of the pupil <br>to the frame’s bottom rim​</small>
                  </span>
                  </span>
                </p>
              </th>`
                  : ""
              }
            </tr>
          </thead>
          <tbody class="new-prescription-form-table-tbody">
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th text-left">Right eye (OD)
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="sphRightEye" id="sphRightEye">
                </select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="cylRightEye" id="cylRightEye">
                </select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="axisRightEye" id="axisRightEye">
                </select>
              </td>
              ${
                vision === BIFOCAL || vision === PROGRESSIVE
                  ? `<td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="addRightEye" id="addRightEye">
                </select>
              </td>`
                  : ""
              }
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="ipdRightEye" id="ipdRightEye">
                </select>
              </td>
              ${
                vision === PROGRESSIVE
                  ? `<td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="phRightEye" id="phRightEye">
                </select>
              </td>`
                  : ""
              }
            </tr>
            <tr class="new-prescription-form-table-tr">
              <th class="new-prescription-form-table-th  text-left">Left eye (OS)
              </th>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="sphLeftEye" id="sphLeftEye">
                </select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="cylLeftEye" id="cylLeftEye">
                </select>
              </td>
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="axisLeftEye" id="axisLeftEye"></select>
              </td>
              ${
                vision === BIFOCAL || vision === PROGRESSIVE
                  ? `<td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="addLeftEye" id="addLeftEye"></select>
              </td>`
                  : ""
              }
              <td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="ipdLeftEye" id="ipdLeftEye"></select>
              </td>
              ${
                vision === PROGRESSIVE
                  ? `<td class="new-prescription-form-table-td">
                <select class="new-prescription-form-table-select" name="phLeftEye" id="phLeftEye"></select>
              </td>`
                  : ""
              }
            </tr>
          </tbody>
        </table>
      </div>
      `;
    }

    this.addPrescriptionWrapperElement.innerHTML = tableData;
    sphRightEye = document.querySelector("#sphRightEye");
    sphLeftEye = document.querySelector("#sphLeftEye");
    cylRightEye = document.querySelector("#cylRightEye");
    cylLeftEye = document.querySelector("#cylLeftEye");
    axisRightEye = document.querySelector("#axisRightEye");
    axisLeftEye = document.querySelector("#axisLeftEye");
    ipdRightEye = document.querySelector("#ipdRightEye");
    ipdLeftEye = document.querySelector("#ipdLeftEye");

    if (vision === BIFOCAL || vision === PROGRESSIVE) {
      let addRightEye = document.querySelector("#addRightEye");
      let addLeftEye = document.querySelector("#addLeftEye");
      this.addAddOptions(addRightEye);
      this.addAddOptions(addLeftEye);
    }

    if (vision === PROGRESSIVE) {
      let phRightEye = document.querySelector("#phRightEye");
      let phLeftEye = document.querySelector("#phLeftEye");
      this.phAddOptions(phRightEye);
      this.phAddOptions(phLeftEye);
    }

    this.addSphOptions(sphRightEye);
    this.addSphOptions(sphLeftEye);
    this.addCylOptions(cylRightEye);
    this.addCylOptions(cylLeftEye);
    this.addAxisOptions(axisRightEye);
    this.addAxisOptions(axisLeftEye);
    this.addIpdOptions(ipdRightEye);
    this.addIpdOptions(ipdLeftEye);
  }

  phAddOptions(el) {
    let option1 = document.createElement("option");
    option1.innerHTML = 0;
    option1.setAttribute("value", 0);
    option1.setAttribute("selected", "selected");

    let ph = 36;
    for (let i = 22; i > 0; i--) {
      let option = document.createElement("option");
      if (i == 1) {
        option.innerHTML = `${(ph = ph - 1)}`;
        option.setAttribute("value", `${ph}`);
      } else {
        option.innerHTML = `${(ph = ph - 1)}`;
        option.setAttribute("value", `${ph}`);
      }
      el.appendChild(option);
    }
    el.appendChild(option1);
    el.appendChild(option1);
  }

  addAddOptions(el) {
    let ipd = 3.25;
    for (let i = 13; i > 0; i--) {
      let option = document.createElement("option");
      if (i == 1) {
        option.innerHTML = `${parseFloat((ipd = ipd - 0.25)).toFixed(2)}`;
        option.setAttribute("value", `${ipd}`);
        option.setAttribute("selected", "selected");
      } else {
        option.innerHTML = `+${parseFloat((ipd = ipd - 0.25)).toFixed(2)}`;
        option.setAttribute("value", `${ipd}`);
      }
      el.appendChild(option);
    }
  }

  addIpdOptions(selectElement) {
    for (let index = 40; index >= 20; index--) {
      const fullValueoption = document.createElement("option");
      const halfValueOption = document.createElement("option");

      const isFirstOption = index === 20;
      const isLastOption = index === 40;
      const fullValue = Number(index).toFixed(1);
      const halfValue = Number(index + 0.5).toFixed(1);

      fullValueoption.innerHTML = fullValue;
      fullValueoption.setAttribute("value", fullValue);

      halfValueOption.innerHTML = halfValue;
      halfValueOption.setAttribute("value", halfValue);

      if (isFirstOption) {
        fullValueoption.setAttribute("selected", "selected");
      }

      if (!isLastOption) {
        selectElement.appendChild(halfValueOption);
      }

      selectElement.appendChild(fullValueoption);
    }
  }

  addAxisOptions(el) {
    for (let i = 0; i <= 180; i++) {
      let option = document.createElement("option");
      if (i == 0) {
        option.setAttribute("selected", "selected");
        option.innerHTML = i;
        option.setAttribute("value", i);
      } else {
        option.innerHTML = i;
        option.setAttribute("value", i);
      }
      el.appendChild(option);
    }
  }

  addCylOptions(el) {
    let cyl = -0.25;
    for (let i = 0; i < 25; i++) {
      let option = document.createElement("option");
      if (i == 0) {
        option.setAttribute("selected", "selected");
        option.innerHTML = `${parseFloat((cyl = cyl + 0.25)).toFixed(2)}`;
        option.setAttribute("value", `${cyl}`);
      } else {
        option.innerHTML = `-${parseFloat((cyl = cyl + 0.25)).toFixed(2)}`;
        option.setAttribute("value", `-${cyl}`);
      }
      el.appendChild(option);
    }
  }

  addSphOptions(el) {
    // add SPH options
    let sph = 10.25;
    for (let i = 40; i > 0; i--) {
      let option = document.createElement("option");
      option.innerHTML = `+${parseFloat((sph = sph - 0.25)).toFixed(2)}`;
      option.setAttribute("value", sph);
      el.appendChild(option);
    }

    let planoOpt = document.createElement("option");
    planoOpt.textContent = "Plano";
    planoOpt.setAttribute("value", 0);
    planoOpt.setAttribute("selected", "selected");
    el.appendChild(planoOpt);

    sph = 0;
    for (let i = 0; i < 48; i++) {
      let option = document.createElement("option");
      option.textContent = `-${parseFloat((sph = sph + 0.25)).toFixed(2)}`;
      option.setAttribute("value", `-${sph}`);
      el.append(option);
    }
  }

  findPrescriptionRecord(evt) {
    evt.preventDefault();

    let validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValidEmail = findEmailInput.value.match(validEmailRegex);
    const isOldEmailEmpty = oldEmail === "";
    const isOldEmail = isOldEmailEmpty || oldEmail != findEmailInput.value;

    if (!isValidEmail) {
      let parentElDiv = findEmailInput.parentElement;
      parentElDiv.classList.add("form-error");
      prescriptionRecordResultsElement.classList.remove("is-visible");

      return;
    }

    if (!isOldEmail) {
      return;
    }

    prescriptionResultsElement.innerHTML = "";
    oldEmail = findEmailInput.value;
    this.findUserEmailInRecords(findEmailInput);
  }

  findUserEmailInRecords(email) {
    if (prescriptionProduct.length === 2) {
      let obj = { step: 3, order_id: "" };
      prescriptionProduct.push(obj);
    }

    let loader = document.querySelector(
      ".new-prescription-form-results-loader",
    );
    prescriptionResultsElement = document.querySelector(
      ".new-prescription-form-results-data",
    );

    if (!email) {
      // TODO: Handle when no email provided
      return;
    }

    prescriptionRecordResultsElement.classList.add("is-visible");
    loader.classList.add("is-active");

    // Fetch records data
    const CLIENT_ID = "95jgnvudiht03075kdhfrw256789dhif";
    const EMAIL = email.value;
    const API_KEY = "052398FSOWRI2UR7FHJKG789403JHFSA";

    fetch(
      `https://www.sunniessystems.com/api/3.0/324566/prescriptions/?client_id=${CLIENT_ID}&email_address=${EMAIL}`,
      {
        method: "GET",
        headers: {
          "oassis-api-key": API_KEY,
        },
      },
    )
      .then(async (res) => {
        const response = await res.json();

        let data = response.prescriptions_historical;
        data = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.order_id === value.order_id &&
                t.branch_name === value.branch_name &&
                t.prescription_purpose === value.prescription_purpose,
            ),
        );
        const hasResponseData = data.length > 0;

        if (hasResponseData) {
          this.displayUserPrescriptionRecords({ email, data, loader });
        } else {
          loader.classList.remove("is-active");

          this.handleErrorContent("Error 4");

          let noRecords__div = document.createElement("div");
          noRecords__div.classList.add("new-prescription-form-group");
          let noRecords__label = document.createElement("label");
          noRecords__label.classList.add(
            "new-prescription-form-label-disabled",
          );
          noRecords__div.style.textAlign = "center";
          prescriptionResultsElement.append(noRecords__div);
          this.handleNextBtnClassFunction("visible", "removeClassName");
        }
      })
      .catch((err) => console.error(err));
  }

  displayUserPrescriptionRecords({ email, data, loader }) {
    oldEmailValue = email.value;
    fetchedPrescriptionData = data;
    grabPrescriptionOrderId = "";
    grabPrescriptionVisionType = "";
    let parentElDiv = email.parentElement;
    parentElDiv.classList.remove("form-error");
    this.handleNextBtnClassFunction("visible", "addClassName");
    loader.classList.remove("is-active");

    // Create element vars
    let yourRecords__div = document.createElement("div");
    yourRecords__div.classList.add("new-prescription-form-group");
    let yourRecords__label = document.createElement("label");
    yourRecords__label.classList.add("new-prescription-form-label-disabled");
    yourRecords__label.textContent = "Your records";
    yourRecords__div.append(yourRecords__label);
    let yourRecords__custom = document.createElement("div");
    yourRecords__custom.classList.add("custom-select");
    let htmlSelect = '<select name="select-records" id="select-records">';

    data.forEach(function (d, index) {
      let visionType = newPrescriptionUI.convertPurposeToVision(
        d.prescription_purpose,
      );
      let branchName = newPrescriptionUI.getTitleCase(d.branch_name);

      branchName =
        branchName == "Virtual Store" ? "sunniesstudios.com" : branchName;

      let orderDate = d.order_date_created.split(" ")[0];

      orderDate = orderDate.replaceAll("-", "/");

      htmlSelect += `
                  ${index === 0 && `<option></option>`}
                  <option
                    ${index === 0 && "selected"}
                    data-id='${d.order_id}'
                    data-name='${visionType}'
                    data-lens='${d.lens_name}'
                    data-prescription_id='${d.prescription_id}'
                    value='${visionType} | ${orderDate} | ${branchName}'>${visionType} | ${orderDate} | ${branchName}
                  </option>
                `;
    });

    htmlSelect += "</select>";

    yourRecords__custom.innerHTML = htmlSelect;
    yourRecords__div.append(yourRecords__custom);
    prescriptionResultsElement.append(yourRecords__div);

    // table data list for prescriptions
    let tableRecords__div = document.createElement("div");
    tableRecords__div.classList.add("new-prescription-form-group");

    let tableRecords__label = document.createElement("label");
    tableRecords__label.classList.add("new-prescription-form-label-disabled");
    tableRecords__label.textContent = "Your prescriptions";
    tableRecords__div.append(tableRecords__label);

    let tableRecordsMain__div = document.createElement("div");
    tableRecordsMain__div.classList.add("new-prescription-form-table-list");

    let tableRecordsMain__table = "";

    data.forEach(function (d, index) {
      let vision = newPrescriptionUI.convertPurposeToVision(
        d.prescription_purpose,
      );

      if (index === 0) {
        let dataIndex = d;
        grabPrescriptionOrderId = d.order_id;
        fetchedPrescriptionDataId = d.prescription_id;
        prescriptionProduct[2].order_id = d.order_id;
        grabPrescriptionLensName = d.lens_name != null ? d.lens_name : "";
        grabPrescriptionVisionType = vision;
        const myNewLensName = newPrescriptionUI.substrFetchLensName(
          grabPrescriptionLensName,
        );

        let selectedIndexData =
          newPrescriptionUI.transformPrescriptionDataToLensInfo(
            dataIndex,
            grabPrescriptionVisionType,
            prescriptionProduct[1].lens_name,
          );
        const { isWithinMatrixRange: isInMatrixRangeForGrabPrescription } =
          newPrescriptionUI.loadFetchedDataToPrescriptionProduct(
            dataIndex,
            grabPrescriptionVisionType,
            prescriptionProduct[1].lens_name,
          );

        lensUpgradePriceElement.innerHTML =
          selectedIndexData.price != 0
            ? "$" + priceWithCommaFormat.format(selectedIndexData.price)
            : "";

        if (
          selectedIndexData.isInMatrixRange ||
          isInMatrixRangeForGrabPrescription
        ) {
          lensUpgradeElement.innerHTML = `${
            prescriptionProduct[1].lens_name.toLowerCase() ==
            selectedIndexData.lens.toLowerCase()
              ? prescriptionProduct[1].lens_name
              : prescriptionProduct[1].lens_name +
                  " - " +
                  prescriptionProduct[2]?.lensVariantName ?? "n/a"
          }`;

          prescriptionProduct[2].lensVariantName == ""
            ? (lensUpgradeElement.innerHTML =
                prescriptionProduct[1].lens_name + " n/a")
            : "";
          let sum = newPrescriptionUI.computeSubtotal(prescriptionProduct);
          prescriptionSubtotalElement.innerHTML = sum;
        } else {
          lensUpgradeElement.innerHTML =
            prescriptionProduct[1].lens_name + " n/a";
        }
      }

      let newlens = d.lens_name != null ? d.lens_name : "";
      let fetchedLens__name = newPrescriptionUI.substrFetchLensName(newlens);
      let mydata = newPrescriptionUI.transformPrescriptionDataToLensInfo(
        d,
        vision,
        prescriptionProduct[1].lens_name,
      );

      if (newPrescriptionUI.width < 769) {
        // SP FOR FIX
        tableRecordsMain__table += `
                <div class='new-prescription-form-table ${
                  index === 0 ? "is-active" : ""
                }' data-prescription_id='${d.prescription_id}'>
                  <div class='new-prescription-form-table-wrapper' style="margin-bottom:24px">
                    <table class='new-prescription-form-table-main' >
                      <thead class="new-prescription-form-table-thead">
                      <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th"></th>
                          <th class="new-prescription-form-table-th">(OS)<br>Left eye</th>
                          <th class="new-prescription-form-table-th">(OD)<br>Right eye</th>
                        </tr>
                      </thead>`;
        tableRecordsMain__table += `
                      <tbody class="new-prescription-form-table-tbody">
                        <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Indicates
                      eyeglass <br>prescription power.
                              <br>Required when CYL is entered</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">SPH</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.sph_os ? parseFloat(d.sph_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.sph_od ? parseFloat(d.sph_od).toFixed(2) : ""}
                          </td>
                        </tr>
                        <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Correction
                      number <br>needed for astigmatism. <br>This value is
                      optional</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">CYL</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.cyl_os ? parseFloat(d.cyl_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.cyl_od ? parseFloat(d.cyl_od).toFixed(2) : ""}
                          </td>
                        </tr>
                        <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Describe
                      the degree and <br>direction of your astigmatism.
                      <br>Required when CYL is entered</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">AXIS</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.axis_os ? d.axis_os : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.axis_od ? d.axis_od : ""}
                          </td>
                        </tr>
                      ${
                        vision == BIFOCAL || vision == PROGRESSIVE
                          ? `<tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Added magnifying power <br>on the lower part of <br>prescription lenses</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">ADD</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.add_os ? parseFloat(d.add_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.add_od ? parseFloat(d.add_od).toFixed(2) : ""}
                          </td>
                        </tr>`
                          : ""
                      }
                        <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Distance
                      between the <br>centers of the pupil</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">IPD</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.ipd_os ? parseFloat(d.ipd_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.ipd_od ? parseFloat(d.ipd_od).toFixed(2) : ""}
                          </td>
                        </tr>
                      ${
                        vision == PROGRESSIVE
                          ? `<tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th text-left">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <small class="new-prescription-form-table-small">Indicates distance from <br>the center of the pupil <br>to the frame’s bottom rim​</small>
                          <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">PH</span>
                          </span>
                        </p>
                          </th>
                          <td class="new-prescription-form-table-td">
                            ${d.ph_os ? d.ph_os : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.ph_od ? d.ph_od : ""}
                          </td>
                        </tr>`
                          : ""
                      }
                      </tbody>
                    </table >
                  </div>`;

        tableRecordsMain__table += `
                  <div class='new-fetch-prescription-data'>
                    <div class='new-fetch-prescription-data-flex'>
                      <div class='new-fetch-prescription-data-content' style='display: none;'>
                        <p class='new-prescription-form-label-disabled'>Lens upgrade</p>
                        <p class='new-fetch-prescription-data-content-text' style='text-transform: capitalize;'>
                          ${
                            mydata.lens.toLowerCase() ==
                            mydata.lensUpgrade.toLowerCase()
                              ? mydata.lensUpgrade.toLowerCase()
                              : prescriptionProduct[1].lens_name.toLowerCase() +
                                " - " +
                                mydata.lens.toLowerCase()
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div >`;
      } else {
        tableRecordsMain__table += `
                <div class='new-prescription-form-table ${
                  index === 0 ? "is-active" : ""
                }' data-prescription_id='${d.prescription_id}'>
                  <div class='new-prescription-form-table-wrapper' style="margin-bottom:24px">
                    <table class='new-prescription-form-table-main' >
                      <thead class="new-prescription-form-table-thead">
                        <tr class="new-prescription-form-table-tr">
                          <th class="new-prescription-form-table-th"></th>
                          <th class="new-prescription-form-table-th">
                            <p class="th-flex">
                              <span class="new-prescription-form-table-span" style="width: 100px;">
                                <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">SPH
                                  <small class="new-prescription-form-table-small u-right">Indicates
                      eyeglass <br>prescription power​</small>
                                    </span>
                                    </span>
                                  </p>
                              </th>
                          </th>
                          <th class="new-prescription-form-table-th">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span" style="width: 100px;">
                            <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">CYL
                              <small class="new-prescription-form-table-small u-right">Correction
                      number <br>needed for astigmatism. <br>This value is
                      optional​</small>
                                </span>
                                </span>
                              </p>
                          </th>
                          <th class="new-prescription-form-table-th">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span" style="width: 100px;">
                            <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">AXIS
                              <small class="new-prescription-form-table-small u-right">Describe
                      the degree and <br>direction of your astigmatism.
                      <br>Required when CYL is entered​</small>
                                </span>
                                </span>
                              </p>
                          </th>
                          </th>
                          ${
                            vision == BIFOCAL || vision == PROGRESSIVE
                              ? `<th class="new-prescription-form-table-th" style="width: 100px;">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span">
                            <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">ADD
                              <small class="new-prescription-form-table-small u-right">Added magnifying power <br>on the lower part of <br>prescription lenses​</small>
                                </span>
                                </span>
                              </p>
                          </th></th>`
                              : ""
                          }
                          <th class="new-prescription-form-table-th">
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span" style="width: 100px; margin-right:30px;">
                            <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">IPD
                              <small class="new-prescription-form-table-small u-right">Distance
                      between the <br>centers of the pupil​</small>
                                </span>
                                </span>
                              </p>
                          </th>
                          </th>
                          ${
                            vision == PROGRESSIVE
                              ? `<th class="new-prescription-form-table-th" >
                          <p class="th-flex">
                          <span class="new-prescription-form-table-span" style="width: 100px;">
                            <span style="border-bottom: 1.5px dashed #AEAAA9; padding-bottom: 2px;">PH
                              <small class="new-prescription-form-table-small u-right">Indicates distance from <br>the center of the pupil <br>to the frame’s bottom rim​</small>
                                </span>
                                </span>
                              </p>
                          </th>
                              </th>`
                              : ""
                          }
                        </tr>
                      </thead>`;
        tableRecordsMain__table += `
                      <tbody class="new-prescription-form-table-tbody">
                        <tr class="new-prescription-form-table-tr hover-on">
                          <th class="new-prescription-form-table-th text-left">Right eye (OD)</th>
                          <td class="new-prescription-form-table-td">
                            ${d.sph_od ? parseFloat(d.sph_od).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.cyl_od ? parseFloat(d.cyl_od).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.axis_od ? d.axis_od : ""}
                          </td>
                          ${
                            vision == BIFOCAL || vision == PROGRESSIVE
                              ? `<td class="new-prescription-form-table-td">${
                                  d.add_od
                                    ? parseFloat(d.add_od).toFixed(2)
                                    : ""
                                }</td>`
                              : ""
                          }
                          <td class="new-prescription-form-table-td">
                            ${d.ipd_od ? parseFloat(d.ipd_od).toFixed(2) : ""}
                          </td>
                          ${
                            vision == PROGRESSIVE
                              ? `<td class="new-prescription-form-table-td">${
                                  d.ph_od ? d.ph_od : ""
                                }</td>`
                              : ""
                          }
                        </tr>
                        <tr class="new-prescription-form-table-tr hover-on">
                          <th class="new-prescription-form-table-th text-left">Left eye(OS)</th>
                          <td class="new-prescription-form-table-td">
                            ${d.sph_os ? parseFloat(d.sph_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.cyl_os ? parseFloat(d.cyl_os).toFixed(2) : ""}
                          </td>
                          <td class="new-prescription-form-table-td">
                            ${d.axis_os ? d.axis_os : ""}
                          </td>
                          ${
                            vision == BIFOCAL || vision == PROGRESSIVE
                              ? `<td class="new-prescription-form-table-td">${
                                  d.add_os
                                    ? parseFloat(d.add_os).toFixed(2)
                                    : ""
                                }</td>`
                              : ""
                          }
                          <td class="new-prescription-form-table-td">
                            ${d.ipd_os ? parseFloat(d.ipd_os).toFixed(2) : ""}
                          </td>
                          ${
                            vision == PROGRESSIVE
                              ? `<td class="new-prescription-form-table-td">${
                                  d.ph_os ? d.ph_os : ""
                                }</td>`
                              : ""
                          }
                        </tr>
                      </tbody>
                    </table >
                  </div>`;

        tableRecordsMain__table += `
                  <div class='new-fetch-prescription-data'>
                    <div class='new-fetch-prescription-data-flex'>
                      <div class='new-fetch-prescription-data-content' style='display: none;'>
                        <p class='new-prescription-form-label-disabled'>Lens upgrade</p>
                        <p class='new-fetch-prescription-data-content-text' style='text-transform: capitalize;'>
                          ${
                            mydata.lens.toLowerCase() ==
                            mydata.lensUpgrade.toLowerCase()
                              ? mydata.lensUpgrade.toLowerCase()
                              : prescriptionProduct[1].lens_name.toLowerCase() +
                                " - " +
                                mydata.lens.toLowerCase()
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div >`;
      }
    });

    prescriptionResultsElement.appendChild(tableRecords__div);
    tableRecordsMain__div.innerHTML = tableRecordsMain__table;
    prescriptionResultsElement.appendChild(tableRecordsMain__div);

    fetchPrescriptionContent = tableRecordsMain__div.querySelector(
      ".new-prescription-form-table.is-active",
    );

    // for custom-select
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = yourRecords__custom;
    l = 1;
    for (i = 0; i < l; i++) {
      selElmnt = x.children[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x.appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
                                create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute("data-value", selElmnt.options[j].dataset.id);
        c.setAttribute("data-name", selElmnt.options[j].dataset.name);
        c.setAttribute("data-lens", selElmnt.options[j].dataset.lens);
        c.setAttribute(
          "data-prescription_id",
          selElmnt.options[j].dataset.prescription_id,
        );
        c.addEventListener("click", function (e) {
          const prescId = this.dataset.value;
          const prescVision = this.dataset.name;
          const lens_name = this.dataset.lens;
          const prescriptionId = this.dataset.prescription_id;
          grabPrescriptionOrderId = prescId;
          fetchedPrescriptionDataId = prescriptionId;
          grabPrescriptionVisionType = prescVision;
          grabPrescriptionLensName = lens_name == "" ? "" : lens_name;

          let selectedIndexData;
          let isInMatrixRangeForGrabPrescription;

          fetchedPrescriptionData.forEach((grabPrescriptionData) => {
            if (grabPrescriptionData.order_id == grabPrescriptionOrderId) {
              const { isWithinMatrixRange } =
                newPrescriptionUI.loadFetchedDataToPrescriptionProduct(
                  grabPrescriptionData,
                  grabPrescriptionVisionType,
                  prescriptionProduct[1].lens_name,
                );
              isInMatrixRangeForGrabPrescription = isWithinMatrixRange;

              selectedIndexData =
                newPrescriptionUI.transformPrescriptionDataToLensInfo(
                  grabPrescriptionData,
                  grabPrescriptionVisionType,
                  prescriptionProduct[1].lens_name,
                );
            }
          });

          if (
            selectedIndexData.isInMatrixRange ||
            isInMatrixRangeForGrabPrescription
          ) {
            lensUpgradeElement.innerHTML = `${
              prescriptionProduct[1].lens_name.toLowerCase() ==
              selectedIndexData.lens.toLowerCase()
                ? prescriptionProduct[1].lens_name
                : prescriptionProduct[1].lens_name +
                  " - " +
                  selectedIndexData.lens
            }`;

            lensUpgradePriceElement.innerHTML =
              selectedIndexData.price != 0
                ? "$" + priceWithCommaFormat.format(selectedIndexData.price)
                : "";

            let sum = newPrescriptionUI.computeSubtotal(prescriptionProduct);
            prescriptionSubtotalElement.innerHTML = sum;
            prescriptionProduct[2].lensVariantName == ""
              ? (lensUpgradeElement.innerHTML =
                  prescriptionProduct[1].lens_name + " n/a")
              : "";
          } else {
            lensUpgradeElement.innerHTML =
              prescriptionProduct[1].lens_name + " n/a";
          }

          var tableList = document.querySelector(
              ".new-prescription-form-table-list",
            ),
            tableListItems = tableList.querySelectorAll(
              ".new-prescription-form-table",
            );
          tableListItems.forEach(function (tableItem) {
            prescriptionId != tableItem.dataset.prescription_id
              ? tableItem.classList.remove("is-active")
              : tableItem.classList.add("is-active");
            fetchPrescriptionContent = tableItem;
          });

          /* When an item is clicked, update the original select box, and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x.appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
                                and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }

  substrFetchLensName(lensName) {
    let mylens = lensName;
    if (
      mylens == "" ||
      mylens == undefined ||
      mylens == "null" ||
      mylens == null
    ) {
      mylens = "";
    } else {
      mylens = mylens.substring(4);
      mylens = mylens.toLowerCase();
    }
    return mylens;
  }

  convertPurposeToVision(vision) {
    if (vision === DISTANCE || vision === READING) {
      return SINGLE_VISION;
    }

    if (vision === BIFOCAL.toLowerCase()) {
      return BIFOCAL;
    }

    if (vision === PROGRESSIVE.toLowerCase()) {
      return PROGRESSIVE;
    }

    return "";
  }

  removeUnderScoreCapitalizeWord(data) {
    let newData = data.replaceAll("_", " ");
    return newData;
  }

  getTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (word === "sm") {
          return (
            word.charAt(0).toUpperCase() +
            word.charAt(1).toUpperCase() +
            word.slice(2)
          );
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join(" ");

    return titleCase;
  }

  removeLastWord(str) {
    const words = str.split(" ");

    if (words.length === 1) {
      return str;
    }

    return words.slice(0, -1).join(" ");
  }

  handleErrorContent(errorCode, param) {
    let errTtl = "";
    let errContent = "";
    this.prescriptionErrorButtonWrapper.innerHTML = "";
    let btnItem = document.createElement("button");
    btnItem.classList.add("error-content-btn-item");
    // reset the error mod
    this.prescriptionErrorButtonWrapper.classList.remove(
      "error-content-btn-flex",
    );
    this.prescriptionErrorButtonWrapper.classList.remove(
      "error-content-btn-flex-col",
    );
    let btnItem2 = "";

    if (doNeedLensValidation) {
      let lensUpgradeDiv = document.querySelector(
        ".new-prescription-error-lens",
      );
      let lensUpgradeInner = document.querySelector(
        ".new-prescription-error-content-inner",
      );
      if (lensUpgradeDiv != null) {
        lensUpgradeDiv.parentNode.removeChild(lensUpgradeDiv);
        lensUpgradeInner != undefined
          ? lensUpgradeInner.classList.remove("lens-suggest")
          : lensUpgradeInner;
      }
    } else {
    }

    switch (errorCode) {
      case "Error 1": // Error in search
        errTtl = "That’s unsual!";
        errContent =
          "For most people, both eyes have either negative (-) or positive (+) " +
          param +
          " values. Are you sure your prescription shows both?";
        btnItem.setAttribute("data-text", "Yes");
        btnItem.innerText = "Yes";

        btnItem2 = document.createElement("button");
        btnItem2.classList.add("error-content-btn-item");
        btnItem2.setAttribute("data-text", "No");
        btnItem2.innerText = "No";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Yes", param);
        });

        btnItem2.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("No");
        });
        break;

      case "Error 1B":
        errTtl = "Continue with <br>non-prescription? ";
        errContent =
          'You have selected "Plano" for SPH and "0.00" <br class="u-spDb">for <br class="u-pcDb">CYL which means your glasses have no <br>prescription. Would you like to continue?';
        btnItem.setAttribute("data-text", "YES");
        btnItem.innerText = "YES";
        btnItem2 = document.createElement("button");
        btnItem2.classList.add("error-content-btn-item");
        btnItem2.setAttribute("data-text", "No");
        btnItem2.innerText = "No";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Yes", param);
        });

        btnItem2.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("No", param);
        });
        break;

      case "Error 1C":
        errTtl = "Oops, something wasn’t right";
        errContent =
          "If you have selected a value for CYL, your <br>prescription must also include an AXIS value. <br>Please enter a valid AXIS value. ";
        btnItem.setAttribute("data-text", "OK");
        btnItem.innerText = "OK";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK", param);
        });
        break;

      case "Error 1D":
        errTtl = "That’s unusual!";
        errContent =
          "For most people, Addition (ADD) values are the <br>same for both eyes. Please check your <br>prescription and indicate separate values under <br>ADD. For help, please contact customer support.";
        btnItem.setAttribute("data-text", "OK");
        btnItem.innerText = "OK";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK", param);
        });
        break;

      case "Error 1E":
        errTtl = "That’s unusual!";
        errContent =
          "For most people, Addition (ADD) values are the <br>same for both eyes. Please check your <br>prescription and indicate separate values under <br>ADD. For help, please contact customer support.";
        btnItem.setAttribute("data-text", "OK");
        btnItem.innerText = "OK";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK", param);
        });
        break;

      case "Error 1F":
        errTtl = "Oops, something is missing";
        errContent = `
          Please complete the following required field:
          <ul>`;
        param.forEach((item) => {
          if (item === "SPH") {
            errContent += `<li>${item} (Sphere)</li>`;
          }
          if (item === "CYL") {
            errContent += `<li>${item} (Cylinder of astigmatism)</li>`;
          }
          if (item === "AXIS") {
            errContent += `<li>${item} (Orientation of astigmatism)</li>`;
          }
          if (item === "ADD") {
            errContent += `<li>${item} (Additional Power)</li>`;
          }
          if (item === "PH") {
            errContent += `<li>${item} (Pupil Height)</li>`;
          }
        });
        errContent += `
          </ul>`;

        btnItem.setAttribute("data-text", "OK");
        btnItem.innerText = "OK";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK", param);
        });
        break;

      case "Error 2":
        let errorInner__ckeck = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.classList.add("disabled");
        btnItem.innerText = "Next";
        let errorInner__div = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div.classList.add("lens-suggest");
        let lensWrapper__div;

        if (errorInner__ckeck === null) {
          lensWrapper__div = document.createElement("div");
          lensWrapper__div.classList.add("new-prescription-error-lens");

          if (
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0 &&
            prescriptionProduct[2].sph_od <= 3 &&
            prescriptionProduct[2].sph_os <= 3
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0].price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0 &&
            prescriptionProduct[2].sph_od <= 7.5 &&
            prescriptionProduct[2].sph_os <= 7.5
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1].price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od <= 10 &&
            prescriptionProduct[2].sph_os <= 10 &&
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -6 &&
            prescriptionProduct[2].sph_os >= -6
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -8 &&
            prescriptionProduct[2].sph_os >= -8
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -12 &&
            prescriptionProduct[2].sph_os >= -12
          ) {
            lensWrapper__div.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }
          suggestedLens = lensWrapper__div.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div.insertBefore(
            lensWrapper__div,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              btnItem.classList.remove("disabled");
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          if (!btnItem.classList.contains("disabled")) {
            newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
            return;
          }
        });
        break;

      case "Error 2A":
        let errorInner__ckeck2A = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.classList.add("disabled");
        btnItem.innerText = "Next";
        let errorInner__div2A = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div2A.classList.add("lens-suggest");
        let lensWrapper__div2A;

        if (errorInner__ckeck2A === null) {
          lensWrapper__div2A = document.createElement("div");
          lensWrapper__div2A.classList.add("new-prescription-error-lens");

          if (
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0
          ) {
            lensWrapper__div2A.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0
          ) {
            lensWrapper__div2A.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }

          suggestedLens = lensWrapper__div2A.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div2A.insertBefore(
            lensWrapper__div2A,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              btnItem.classList.remove("disabled");
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          if (!btnItem.classList.contains("disabled")) {
            newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
            return;
          }
        });
        break;

      case "Error 2B":
        let errorInner__ckeck2B = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.classList.add("disabled");
        btnItem.innerText = "Next";
        let errorInner__div2B = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div2B.classList.add("lens-suggest");
        let lensWrapper__div2B;

        if (errorInner__ckeck2B === null) {
          lensWrapper__div2B = document.createElement("div");
          lensWrapper__div2B.classList.add("new-prescription-error-lens");

          if (
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0 &&
            prescriptionProduct[2].sph_od <= 7.5 &&
            prescriptionProduct[2].sph_os <= 7.5
          ) {
            lensWrapper__div2B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1].price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][1]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od <= 10 &&
            prescriptionProduct[2].sph_os <= 10 &&
            prescriptionProduct[2].sph_od > 0 &&
            prescriptionProduct[2].sph_os > 0
          ) {
            lensWrapper__div2B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -6 &&
            prescriptionProduct[2].sph_os >= -6
          ) {
            lensWrapper__div2B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -8 &&
            prescriptionProduct[2].sph_os >= -8
          ) {
            lensWrapper__div2B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][AIR_LENS][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][AIR_LENS][1]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Upgrade your lenses into shatter and
                scratch-proof eyewear. Additional fees apply for grades over +/-6.00</p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od < 0 &&
            prescriptionProduct[2].sph_os < 0 &&
            prescriptionProduct[2].sph_od >= -12 &&
            prescriptionProduct[2].sph_os >= -12
          ) {
            lensWrapper__div2B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                  .lens_upgrade
              }" data-price="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .price
            }" data-variant="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                .lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][SINGLE_VISION][READING][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][SINGLE_VISION][DISTANCE][ULTRATHIN][0]
                    .price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Cut off the weight and thickness of mid high
                prescription lenses. Addition fees apply for grades over +/-8.00</p>
              </div>
            `;
          }

          suggestedLens = lensWrapper__div2B.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div2B.insertBefore(
            lensWrapper__div2B,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              btnItem.classList.remove("disabled");
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          if (!btnItem.classList.contains("disabled")) {
            newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
            return;
          }
        });
        break;

      case "Error 3":
        let errorInner__ckeck2 = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.innerText = "Next";
        let errorInner__div2 = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div2.classList.add("lens-suggest");
        let lensWrapper__div2;

        if (errorInner__ckeck2 === null) {
          lensWrapper__div2 = document.createElement("div");
          lensWrapper__div2.classList.add("new-prescription-error-lens");

          if (
            prescriptionProduct[2].sph_od > 6 &&
            prescriptionProduct[2].sph_os > 6 &&
            prescriptionProduct[2].sph_od <= 8 &&
            prescriptionProduct[2].sph_os <= 8
          ) {
            lensWrapper__div2.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price
            }" data-variant="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Superior visual clarity perfect for high prescriptions</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price
            }" data-variant="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text"></p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od > 8 &&
            prescriptionProduct[2].sph_os > 8 &&
            prescriptionProduct[2].sph_od <= 10 &&
            prescriptionProduct[2].sph_os <= 10
          ) {
            lensWrapper__div2.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price
            }" data-variant="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].id
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text"></p>
              </div>
            `;
          }
          suggestedLens = lensWrapper__div2.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div2.insertBefore(
            lensWrapper__div2,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
          return;
        });
        break;

      case "Error 3A":
        let errorInner__ckeck3 = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.innerText = "Next";
        let errorInner__div3 = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div3.classList.add("lens-suggest");
        let lensWrapper__div3;

        if (errorInner__ckeck3 === null) {
          lensWrapper__div3 = document.createElement("div");
          lensWrapper__div3.classList.add("new-prescription-error-lens");

          if (
            prescriptionProduct[2].sph_od > 7 &&
            prescriptionProduct[2].sph_os > 7 &&
            prescriptionProduct[2].sph_od <= 8 &&
            prescriptionProduct[2].sph_os <= 8
          ) {
            lensWrapper__div3.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price
            }" data-variant="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0]
                    .lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Superior visual clarity perfect for high prescriptions</p>
              </div>

              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price
            }" data-variant="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].id
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][ULTRATHIN][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text"></p>
              </div>
            `;
          }

          if (
            prescriptionProduct[2].sph_od > 8 &&
            prescriptionProduct[2].sph_os > 8 &&
            prescriptionProduct[2].sph_od <= 10 &&
            prescriptionProduct[2].sph_os <= 10
          ) {
            lensWrapper__div3.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
              }" data-price="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price
            }" data-lenscname="${
              prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_name
            }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][PROGRESSIVE][CLASSIC][0].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text"></p>
              </div>
            `;
          }
          suggestedLens = lensWrapper__div3.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div3.insertBefore(
            lensWrapper__div3,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
          return;
        });
        break;

      case "Error 3B": // hanlde suggested Bifocal Lenses
        let errorInner__ckeck3B = document.querySelector(
          ".new-prescription-error-lens",
        );
        this.prescriptionError.classList.add("lens-suggest");
        errTtl =
          "Sorry, this lens upgrade is not <br>available for your prescription";
        errContent = "Here are our recommended lens upgrades for you";
        btnItem.setAttribute("data-text", "Next");
        btnItem.innerText = "Next";
        let errorInner__div3B = document.querySelector(
          ".new-prescription-error-content-inner",
        );
        errorInner__div3B.classList.add("lens-suggest");
        let lensWrapper__div3B;

        if (errorInner__ckeck3B === null) {
          lensWrapper__div3B = document.createElement("div");
          lensWrapper__div3B.classList.add("new-prescription-error-lens");

          lensWrapper__div3B.innerHTML = `
              <div class="new-prescription-right-data-suggest" data-name="${
                prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_upgrade
              }" data-price="${
            prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price
          }" data-variant="${
            prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].id
          }" data-lenscname="${
            prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_name
          }">
                <div class="new-prescription-right-data-flex">
                <p class="new-prescription-right-data-label">${
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].lens_upgrade
                }</p>
                <p class="new-prescription-right-data-price">+ $${priceWithCommaFormat.format(
                  prescriptionLensData[0][BIFOCAL][FLAT_TOP][1].price,
                )}</p>
                </div>
                <p class="new-prescription-right-data-text">Straight-top bifocal lenses for better overall clarity. Available for grades +/-8.00 and below</p>
              </div>
            `;

          suggestedLens = lensWrapper__div3B.querySelectorAll(
            ".new-prescription-right-data-suggest",
          );
          errorInner__div3B.insertBefore(
            lensWrapper__div3B,
            this.prescriptionErrorButtonWrapper,
          );

          suggestedLens.forEach((suggestedlensItem) => {
            suggestedlensItem.addEventListener("click", function () {
              newPrescriptionUI.handleSuggestedLensFunction(suggestedlensItem);
            });
          });
        } else {
          // TODO
        }

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Next", suggestedLens);
          return;
        });
        break;

      case "Error 4": // Error in search
        errTtl = "Sorry, we couldn't find any records";
        errContent =
          "Please check the email address or enter another email address used in our stores.";
        btnItem.setAttribute("data-text", "ok");
        btnItem.innerText = "OK";
        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK");
        });
        break;

      case "Error 5": // Error in search
        errTtl = "Oops, something wasn’t right";
        errContent =
          "The prescription you selected doesn't match the <br> Vision Type you selected in Step 1.";

        btnItem.setAttribute("data-text", "Change prescription");
        btnItem.innerText = "Change prescription";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("OK");
        });

        btnItem2 = document.createElement("button");
        btnItem2.setAttribute("data-text", "Go back to Step 1");
        btnItem2.classList.add("error-content-btn-item");
        btnItem2.innerText = "Go back to Step 1";
        btnItem2.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Go back to Step 1");
        });
        this.prescriptionErrorButtonWrapper.classList.add(
          "error-content-btn-flex-col",
        );
        break;

      case "Error 6":
        errTtl = "Oops, something wasn’t right";
        errContent =
          "The prescription you selected doesn't match the <br> Vision Type you selected in Step 1.";

        btnItem.setAttribute("data-text", "Change prescription");
        btnItem.innerText = "Change prescription";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Change prescription");
        });

        btnItem2 = document.createElement("button");
        btnItem2.setAttribute("data-text", "Go back to Step 1");
        btnItem2.classList.add("error-content-btn-item");
        btnItem2.innerText = "Go back to Step 1";
        btnItem2.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Go back to Step 1");
        });
        this.prescriptionErrorButtonWrapper.classList.add(
          "error-content-btn-flex-col",
        );
        break;

      case "Error 7":
        errTtl = "Oops, something wasn’t right";
        errContent =
          "The prescription you selected doesn't match the <br> lens upgrade you selected";

        btnItem.setAttribute("data-text", "Change prescription");
        btnItem.innerText = "Change prescription";

        btnItem.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Change prescription");
        });

        btnItem2 = document.createElement("button");
        btnItem2.setAttribute("data-text", "Go back to Step 1");
        btnItem2.classList.add("error-content-btn-item");
        btnItem2.innerText = "Go back to Step 1";
        btnItem2.addEventListener("click", function () {
          newPrescriptionUI.handleErrorBtnClick("Go back to Step 1");
        });
        this.prescriptionErrorButtonWrapper.classList.add(
          "error-content-btn-flex-col",
        );
        break;

      default:
        break;
    }

    errContent += `
      <br>
      Need help? Consult our doctors virtually <a href="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F107519864279819%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792​" target="_blank">here</a> or <br><a href="/pages/how-to-read-my-prescription" target="_blank">read our prescription guide</a>.
    `;

    this.documentBodyElement.style.overflow = "hidden";
    this.prescriptionErrorTitle.innerHTML = errTtl;
    this.prescriptionErrorContent.innerHTML = errContent;
    this.prescriptionErrorButtonWrapper.append(btnItem);
    btnItem2 != "" ? this.prescriptionErrorButtonWrapper.append(btnItem2) : "";
    btnItem2 != ""
      ? this.prescriptionErrorButtonWrapper.classList.add(
          "error-content-btn-flex",
        )
      : "";
    this.prescriptionError.classList.add("is-active");
  }

  handleSuggestedLensFunction(el) {
    const { name, price } = el.dataset;
    let suggestedEls = document.querySelectorAll(
      ".new-prescription-right-data-suggest",
    );
    suggestedEls.forEach((el) => {
      el.dataset.name == name
        ? el.classList.add("is-active")
        : el.classList.remove("is-active");
    });
  }

  handleErrorBtnClick(string, param) {
    switch (string) {
      case "OK":
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");

        if (param === "AXIS") {
          doNeedAxisValidation = true;
          let axisRight = document.querySelector("#axisRightEye");
          let axisLeft = document.querySelector("#axisLeftEye");

          axisRight.value = 1;
          axisLeft.value = 1;
          axisRight.classList.add("is-active");
          axisLeft.classList.add("is-active");
        }

        if (param === "ADD") {
          doNeedAddValidation = false;
        }
        break;

      case "Yes":
        if (param === "BACKTOSTEP2") {
          this.handleNextBtnClassFunction("visible", "addClassName", "Next");
          this.resetPrescriptionFlowStepThree();

          document
            .querySelector("#add-your-prescription-step3")
            .classList.remove("is-active");

          if (prescriptionProduct[2]) {
            prescriptionProduct = this.filterData(3);
          }

          // set to active non prescription item
          prescriptionFlowStepOneElements.forEach((elItem) => {
            elItem.dataset.name == NON_PRESCRIPTION
              ? elItem.classList.add("is-active")
              : elItem.classList.remove("is-active");
          });

          prescriptionTintSelectionElements.forEach((tint) => {
            tint.classList.remove("is-active");
          });

          this.bacToStepTwo("BACKTOSTEP2");
          return;
        }

        if (param === "NON_PRESCRIPTION_CONTINUE") {
          const lensUpgradeName = prescriptionProduct[1].lens_name;
          const tintsColor = prescriptionProduct[1].tints_color;

          const isTints = !!prescriptionProduct[1].tints_color;

          prescriptionProduct[0].prescription_vision = NON_PRESCRIPTION;

          if (isTints) {
            const tintsData =
              prescriptionLensData[0][NON_PRESCRIPTION][TINTS_RX];

            tintsData.forEach((tint) => {
              if (tint.lens_name === tintsColor) {
                prescriptionProduct[1].lensVariantName = tint.lens_name;
                prescriptionProduct[1].variant_id = tint.id;
              }
            });
          } else {
            prescriptionProduct[1].lensVariantName =
              prescriptionLensData[0][NON_PRESCRIPTION][
                `${lensUpgradeName}`
              ][0].lens_name;
            prescriptionProduct[1].variant_id =
              prescriptionLensData[0][NON_PRESCRIPTION][
                `${lensUpgradeName}`
              ][0].id;
          }

          if (this.isMobile) {
            if (this.hasCompletedMobileReviewSelection) {
              this.handleAddToBag(prescriptionProduct);
            } else {
              prescriptionProduct[1].target = "mobile-selection-review";
              prescriptionProduct[1].prev_content =
                "add-your-prescription-step3";

              const previewType = isTints
                ? "Non-prescription-tints"
                : NON_PRESCRIPTION;

              this.goToMobileSelectionReview(previewType);

              this.closeErrorModal();

              return;
            }
          } else {
            delete prescriptionProduct[1].target;
            this.handleAddToBag(prescriptionProduct);
          }

          return;
        }

        this.closeErrorModal();

        param === "SPH" ? (doNeedSphValidation = true) : doNeedSphValidation;
        param === "CYL" ? (doNeedCylValidation = true) : doNeedCylValidation;
        break;

      case "No":
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");
        param === "SPH" ? (doNeedSphValidation = false) : doNeedSphValidation;
        param === "CYL" ? (doNeedCylValidation = false) : doNeedCylValidation;
        break;

      case "Next":
        // TEMPORARY: Return error when Bifocal and Progressive is okay
        // this.handleErrorLensUpgradeNotAvailable(param);
        this.handleErrorBackToStepOne();
        break;

      case "Change prescription":
        let sum;
        let view = document.querySelector(`#${prescriptionProduct[0].target}`);
        let viewItems = view.querySelectorAll(
          ".new-prescription-right-data-item",
        );
        viewItems.forEach((el) => {
          el.classList.remove("is-active");
        });
        this.resetPrescriptionFlowStepThree();
        prescriptionTintSelectionElements.forEach((el) => {
          el.classList.remove("is-active");
        });
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");
        this.filterData(1);
        sum = this.computeSubtotal(prescriptionProduct);
        prescriptionSubtotalElement.innerHTML = sum;
        lensUpgradeContainerElement.classList.remove("is-visible");
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");
        this.handlePercentageTrackerFunction("step1", 1);
        this.handleNextBtnClassFunction("visible", "addClassName", "Next");
        view.classList.add("is-active");
        break;

      case "Close Modal":
        this.closeErrorModal();
        break;

      case "Go back to Step 1":
        this.handleErrorBackToStepOne();
        break;
    }
  }

  handleErrorLensUpgradeNotAvailable(param) {
    let name2;
    let price2;
    let variant2;
    let lensVariantName;

    param.forEach((elItem) => {
      name2 = elItem.dataset.name;
      (price2 = elItem.dataset.price),
        (lensVariantName = elItem.dataset.lenscname),
        (variant2 = elItem.dataset.variant);

      if (elItem.classList.contains("is-active")) {
        prescriptionProduct[1].tints_color != undefined &&
          delete prescriptionProduct[1].tints_color;
        prescriptionProduct[1].lens_name = name2;
        prescriptionProduct[1].price = price2;
        prescriptionProduct[2].variant_id = variant2;
        prescriptionProduct[2].lensVariantName = lensVariantName;

        let elObj = {
          name: name2,
          price: price2,
        };

        doNeedLensValidation = true;

        this.updateDataGroup(
          lensUpgradeContainerElement,
          lensUpgradePriceElement,
          elObj,
          prescriptionSubtotalElement,
        );
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");

        elItem.classList.remove("is-active");

        lensUpgradeElement.innerHTML = `${prescriptionProduct[1].lens_name} ${
          prescriptionProduct[2].lensVariantName
            ? ` - ${prescriptionProduct[2].lensVariantName}`
            : "- n/a"
        }`;

        return;
      } else {
        this.documentBodyElement.style.overflow = "auto";
        this.prescriptionError.classList.remove("is-active");

        return;
      }
    });
  }

  handleErrorBackToStepOne() {
    let view1 = document.querySelector(
      `#${prescriptionProduct[0].prev_content}`,
    );
    let view2 = document.querySelector(`#${prescriptionProduct[0].target}`);
    let viewItems1 = view1.querySelectorAll(
      ".new-prescription-right-data-item",
    );
    let viewItems2 = view2.querySelectorAll(
      ".new-prescription-right-data-item",
    );

    viewItems1.forEach((el) => {
      el.classList.remove("is-active");
    });

    viewItems2.forEach((el) => {
      el.classList.remove("is-active");
    });

    this.resetPrescriptionFlowStepThree();

    prescriptionTintSelectionElements.forEach((el) => {
      el.classList.remove("is-active");
    });

    this.documentBodyElement.style.overflow = "auto";
    this.prescriptionError.classList.remove("is-active");

    prescriptionProduct = [];

    lensUpgradeContainerElement.classList.remove("is-visible");

    visionTypeContainerElement.classList.remove("is-visible");

    this.documentBodyElement.style.overflow = "auto";
    this.prescriptionError.classList.remove("is-active");
    this.handlePercentageTrackerFunction("step0", 0);

    prescriptionSubtotalContainerElement.classList.remove("is-visible");

    this.handleNextBtnClassFunction("visible", "addClassName", "Next");

    view2.classList.remove("is-active");
    view1.classList.add("is-active");
  }

  closeErrorModal() {
    this.documentBodyElement.style.overflow = "auto";
    this.prescriptionError.classList.remove("is-active");
  }

  handleBackFunction(el) {
    let currentStepDiv = el.parentElement;
    const { step, stepname } = currentStepDiv.dataset;

    if (prescriptionProduct.length === 1) {
      if (step == 2) {
        this.backHome(el);
      }
    }

    switch (prescriptionProduct.length) {
      case 1:
        switch (step) {
          case 2:
          case "2":
            break;
        }

        break;

      case 2:
        switch (step) {
          case 2:
          case "2":
            this.backHome(el);
            prescriptionProduct = this.filterData(1);
            let sum;
            sum = this.computeSubtotal(prescriptionProduct);
            prescriptionSubtotalElement.innerHTML = sum;
            break;

          case 3:
          case "3":
            if (
              stepname === "tints-select" &&
              prescriptionProduct[0].prescription_vision.toLowerCase() ===
                SINGLE_VISION.toLowerCase()
            ) {
              prescriptionProduct[1].prev_content = "lens-upgrade-step02";
              lensUpgradeElement.textContent = prescriptionProduct[1].lens_name;
              this.bacToStepTwo(el);
            }

            if (
              stepname === "tints-select" &&
              prescriptionProduct[0].prescription_vision === NON_PRESCRIPTION
            ) {
              lensUpgradeElement.textContent = prescriptionProduct[1].lens_name;
              if (this.isMobile) {
                prescriptionProduct[1].prev_content = "non-prescription-step02";
              }
              this.bacToStepTwo(el);
            }

            if (stepname === "add-your-prescription") {
              let defaultTab__content = document.querySelector("#tab-btns");
              let records__content = document.querySelector("#search-records");
              let newPrescription__content = document.querySelector(
                "#add-new-prescription",
              );

              if (prescriptionProduct[1].tints_color != undefined) {
                prescriptionProduct[1].prev_content = "select-tints-step3";
              }

              if (!defaultTab__content.classList.contains("is-active")) {
                findRecordsForm.reset();
                prescriptionResultsElement.innerHTML = "";
                oldEmail = "";
                oldEmailValue = "";
                grabPrescriptionOrderId = "";
                records__content.classList.remove("is-active");
                newPrescription__content.classList.remove("is-active");
                defaultTab__content.classList.add("is-active");
                this.handleNextBtnClassFunction(
                  "visible",
                  "removeClassName",
                  "Next",
                );
                return;
              }
            }
            this.bacToStepTwo(el);
            break;
          case 4:
          case "4":
            this.fromPreviewToPreviousStep(el);
            break;
        }
        break;

      case 3:
        if (stepname === "mobile-selection-review") {
          this.fromPreviewToPreviousStep(el);
        } else {
          addNewPrescriptionForm.reset();
          findRecordsForm.reset();

          if (stepname === "add-your-prescription") {
            let defaultTab__content = document.querySelector("#tab-btns");
            let records__content = document.querySelector("#search-records");
            let newPrescription__content = document.querySelector(
              "#add-new-prescription",
            );
            let priceLens = "",
              selectEl;

            if (prescriptionProduct[1].tints_color != undefined) {
              prescriptionProduct[1].prev_content = "select-tints-step3";
            }

            if (!defaultTab__content.classList.contains("is-active")) {
              prescriptionProduct[1].lens_name ===
                prescriptionLensData[0][NON_PRESCRIPTION][TINTS_RX][0]
                  .lens_upgrade ||
              prescriptionProduct[1].lens_name ===
                prescriptionLensData[0][NON_PRESCRIPTION][SUN_PLUS_SCREEN][0]
                  .lens_upgrade ||
              prescriptionProduct[0].prescription_vision.toLowerCase() ==
                prescriptionLensData[0][NON_PRESCRIPTION].vision.toLowerCase()
                ? (priceLens =
                    "$" +
                    priceWithCommaFormat.format(
                      prescriptionProduct[1].old_price,
                    ))
                : (priceLens =
                    "from $" +
                    priceWithCommaFormat.format(
                      prescriptionProduct[1].old_price,
                    ));

              priceLens =
                prescriptionProduct[1].old_price == 0 ? "" : priceLens;
              lensUpgradeElement.innerHTML =
                prescriptionProduct[1].old_lens_name;
              lensUpgradePriceElement.innerHTML = priceLens;

              // set back to old
              prescriptionProduct[1].price = prescriptionProduct[1].old_price;
              prescriptionProduct[1].lens_name =
                prescriptionProduct[1].old_lens_name;

              selectEl = addNewPrescriptionForm.querySelectorAll("select");
              selectEl.forEach((el) => {
                el.classList.remove("is-active");
              });

              addNewPrescriptionForm.reset();
              prescriptionResultsElement.innerHTML = "";
              findRecordsForm.reset();
              oldEmail = "";
              fetchedPrescriptionData = "";
              fetchedPrescriptionDataId = "";
              records__content.classList.remove("is-active");
              newPrescription__content.classList.remove("is-active");
              defaultTab__content.classList.add("is-active");
              prescriptionProduct = this.filterData(3);
              this.isMobile
                ? this.handleNextBtnClassFunction(
                    "visible",
                    "removeClassName",
                    "Next",
                  )
                : this.handleNextBtnClassFunction(
                    "visible",
                    "removeClassName",
                    "Add to bag",
                  );
              return;
            } else {
              // TODO
            }
            return;
          } else {
            this.bacToStepTwo(el);
          }
        }
        break;
    }
  }

  fromPreviewToPreviousStep(el) {
    let currentStep__div = el.parentElement,
      prevStep__div;

    if (prescriptionProduct.length == 2) {
      prevStep__div = document.querySelector(
        `#${prescriptionProduct[1].prev_content}`,
      );
    }
    if (prescriptionProduct.length == 3) {
      // length == 3
      prevStep__div = document.querySelector(
        `#${prescriptionProduct[2].prev_content}`,
      );
    }

    this.mobileSelectionReviewContentElement.innerHTML = "";
    this.hasCompletedMobileReviewSelection = false;

    this.handlePercentageTrackerFunction("step3", 3);
    this.classActiveFunc(currentStep__div, prevStep__div);
    this.handleNextBtnClassFunction("visible", "addClassName", "Next");
    return;
  }

  bacToStepTwo(el) {
    if (el === "BACKTOSTEP2") {
      // handle steback 2
      let currentStep__div = document.querySelector(
          `#${prescriptionProduct[1].prev_content}`,
        ), // step 2 selected before jump
        myStep2 = document.querySelector(`#non-prescription-step02`);

      this.classActiveFunc(currentStep__div, myStep2);
      this.handleNextBtnClassFunction("visible", "removeClassName", "Next");
      this.handlePercentageTrackerFunction("step2", 2);

      prescriptionProduct[0].prescription_vision = NON_PRESCRIPTION;
      prescriptionProduct[0].price = 1999;
      prescriptionProduct = this.filterData(1);

      const framePrice = prescriptionProduct[0].price;

      visionTypeElement.innerHTML = prescriptionProduct[0].prescription_vision;
      framePriceElement.innerHTML = priceWithCommaFormat.format(framePrice);

      let sum;
      sum = this.computeSubtotal(prescriptionProduct);
      prescriptionSubtotalElement.textContent = sum;
      lensUpgradeContainerElement.classList.remove("is-visible");
      this.documentBodyElement.style.overflow = "auto";
      this.prescriptionError.classList.remove("is-active");
      return;
    } else {
      let activeEl = "",
        currentStep__div = el.parentElement,
        prevStep__div = document.querySelector(
          `#${prescriptionProduct[1].prev_content}`,
        );

      if (currentStep__div.dataset.stepname == "tints-select") {
        delete prescriptionProduct[1].tints_color;
        delete prescriptionProduct[1].tints_variantId;
      }

      if (prescriptionProduct[1].tints_color != undefined) {
        prescriptionProduct[1].target = "select-tints-step3";
      }

      this.handlePercentageTrackerFunction("step2", 2);
      this.classActiveFunc(currentStep__div, prevStep__div);
      this.handleNextBtnClassFunction("visible", "addClassName", "Next");
      return;
    }
  }

  backHome(el) {
    let activeEl = "",
      currentStep__div = el.parentElement,
      prevStep__div = document.querySelector("#select-vision-step01");
    activeEl = prevStep__div.querySelector(
      ".new-prescription-right-data-item.is-active",
    );
    lensUpgradeContainerElement.classList.remove("is-visible");

    this.classActiveFunc(currentStep__div, prevStep__div);
    this.handleNextBtnClassFunction("visible", "addClassName", "Next");
    this.handlePercentageTrackerFunction("step1", 1);
  }

  classActiveFunc(ElRemove, ElAdd) {
    ElRemove.classList.remove("is-active");
    ElAdd.classList.add("is-active");
    if (ElRemove.querySelectorAll(".new-prescription-right-data-item").length) {
      ElRemove.querySelectorAll(".new-prescription-right-data-item").forEach(
        (dataItem) => {
          dataItem.classList.remove("is-active");
        },
      );
    }
  }

  filterData(num) {
    prescriptionProduct = prescriptionProduct.filter(function (item) {
      if (num == 1) {
        return item.step == num;
      } else if (num == 2) {
        return item.step == num;
      } else {
        return item.step != num;
      }
    });

    return prescriptionProduct;
  }

  checkVisionType(prescriptionItem) {
    const frameData = prescriptionItem[0];
    const prescriptionData = prescriptionItem[2];

    const { prescription_vision: prescriptionVision } = frameData;

    if (!prescriptionData) {
      return NON_PRESCRIPTION;
    }

    if (prescriptionVision?.toLowerCase() === SINGLE_VISION?.toLowerCase()) {
      const { sph_od: SPH_OD, visionType } = prescriptionData;

      if (visionType) {
        return visionType;
      }

      const isVision = SPH_OD.includes("-");

      return isVision ? DISTANCE : READING;
    }

    return prescriptionVision;
  }

  async handleAddToBag(prescriptionItem) {
    this.goToAddedToBagView();

    const { addFrameResponse } = await this.addPrescriptionProductToBag(
      prescriptionItem,
    );

    if (!addFrameResponse) {
      this.handleAddToBagError();
    }

    if (addFrameResponse) {
      this.updateAddedToBagView();
      // this.handleAddToBagSuccess();
    }
  }

  async addPrescriptionProductToBag(prescriptionItem) {
    const visionType = this.checkVisionType(prescriptionItem);
    const vision = visionType;

    const userData = this.getUserData();

    const systemSissData = this.mapSissData({
      emailAddress: userData?.email ?? "",
      id: "",
      prescriptionId: "",
      prescriptionItem,
      userId: userData?.userId ?? "",
      vision,
    });

    const sunniesSystemPrescriptionData =
      await this.saveNewSunniesSystemPrescription(
        systemSissData,
        userData?.email ?? "",
      );

      if (!sunniesSystemPrescriptionData?.prescription_id) {
        console.error("Failed to get prescription ID from Sunnies System API");
        return { addFrameResponse: null, errorResponse: "NO_PRESCRIPTION_ID" };
      }

    const specsSissdata = this.mapSissData({
      emailAddress: userData?.email ?? "",
      id: sunniesSystemPrescriptionData?.id ?? "",
      prescriptionId: sunniesSystemPrescriptionData?.prescription_id ?? "",
      prescriptionItem,
      userId: userData?.userId ?? "",
      vision,
    });

    const sunniesSpecsPrescriptionData =
      await this.saveNewSunniesSpecsPrescription(
        specsSissdata,
        userData?.email ?? userData?.emailAddress ?? ""
      );

      if (!sunniesSpecsPrescriptionData?.prescription_id) {
        console.error("Failed to get prescription ID from Sunnies Specs API");
        return { addFrameResponse: null, errorResponse: "NO_SPECS_PRESCRIPTION_ID" };
      }

    const { frameCartData, lensCartData } = this.generateCartData({
      prescriptionItem,
      sunniesSpecsPrescriptionData,
      vision,
    });

    const addLensResponse = await this.addLensToCart(lensCartData);

    frameCartData.properties._lensLineId = addLensResponse.key;

    const addFrameResponse = await this.addFrameToCart(frameCartData);

    return { addFrameResponse };
  }

  generateCartData({ prescriptionItem, sunniesSpecsPrescriptionData, vision }) {
    const noteData = document.getElementById('user-note').value;
    const selectedTintsValue = localStorage.getItem('tints-Rx');;
    const frameData = prescriptionItem[0];
    const lensData = prescriptionItem[1];
    const prescriptionData = prescriptionItem[2];
    const productVariantID = document.querySelector(
      '[name="product-current-variant"]',
    ).value;
    const isNonPrescription =
      frameData?.prescription_vision == NON_PRESCRIPTION;
    let lensVariantID = isNonPrescription
      ? lensData?.variant_id
      : prescriptionData?.variant_id;

    return {
      frameCartData: {
        quantity: 1,
        id: `${productVariantID}`,
        properties: {
          _item_type: "specs_frame",
          vision: vision ?? "",
          "prescription vision": this.toTitleCase(
            frameData?.prescription_vision ?? "",
          ),
          "prescription origin": this.prescriptionOrigin,
          "lens type": lensData?.lens_name ?? "",
          "lens option":
            prescriptionData?.lensVariantName ?? lensData?.lensVariantName,
          _lens_variant_id: lensVariantID,
          _lens_price: lensData?.price ?? "",
          _prescription_id: sunniesSpecsPrescriptionData?.prescription_id ?? "",
          _lensLineId: "",
          _user_note: noteData ?? "",
          _tint_strength: selectedTintsValue,
          __sph_os: prescriptionData?.sph_os,
          __sph_od: prescriptionData?.sph_od,
          __cyl_os: prescriptionData?.cyl_os,
          __cyl_od: prescriptionData?.cyl_od,
          __axis_os: prescriptionData?.axis_os,
          __axis_od: prescriptionData?.axis_od,
          __add_os: prescriptionData?.add_os ?? "-",
          __add_od: prescriptionData?.add_od ?? "-",
          __ipd_os: prescriptionData?.ipd_os,
          __ipd_od: prescriptionData?.ipd_od,
          __ph_os: prescriptionData?.ph_os ?? "-",
          __ph_od: prescriptionData?.ph_od ?? "-",
        },
      },
      lensCartData: {
        quantity: 1,
        id: `${lensVariantID}`,
        properties: {
          _item_type: "specs_lens",
          _vision: vision,
          _frame: frameData?.frame_title ?? "",
          _lens_option:
            prescriptionData?.lensVariantName ?? lensData?.lensVariantName,
          _prescription_id: sunniesSpecsPrescriptionData?.prescription_id ?? "",
        },
      },
    };
  }

  async addLensToCart(lensCartData) {
    return this.addToCart(lensCartData);
  }

  async addFrameToCart(frameCartData) {
    return this.addToCart(frameCartData);
  }

  async addToCart(cartData) {
    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
  
      if (response.ok) {
        // console.log("Item added to cart:", cartData);
        return response.json();
      } else {
        console.error("Error adding to cart:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async handleAddToBagSuccess() {
  //   const ONE_SECOND_THREE_MILI_SECONDS = 1300;

  //   setTimeout(() => {
  //     window.location.href = "/cart";
  //   }, ONE_SECOND_THREE_MILI_SECONDS);
  // }

  getUserData() {
    const customerData = shopifyData?.customer ?? {};

    if (!Object.keys(customerData).length) {
      return this.getGuestData();
    }

    return {
      userId: customerData?.id ?? "",
      email: customerData?.email ?? "",
    };
  }

  uuidV4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  }

  getGuestData() {
    const storageData = localStorage.getItem("guestData");

    if (!storageData) {
      const uuidV4 = this.uuidV4();

      const newGuestData = {
        user_id: uuidV4,
        email_address: `guest${uuidV4.replaceAll("-", "")}@ssguest.com`,
      };

      localStorage.setItem("guestData", JSON.stringify(newGuestData));

      return {
        userId: newGuestData.user_id,
        email: newGuestData.email_address,
      };
    }

    const guestData = JSON.parse(storageData);

    return {
      userId: guestData?.user_id ?? "",
      emailAddress: guestData?.email_address ?? "",
    };
  }

  getCustomerEmail() {
    if (loggedInEmail) {
      return loggedInEmail;
    }

    return JSON.parse(localStorage.getItem("guestData"));
  }

  async saveNewSunniesSystemPrescription(sissData, email) {
    try {
      const response = await fetch(
        `https://www.sunniessystems.com/api/3.0/324566/new-prescription/?client_id=95jgnvudiht03075kdhfrw256789dhif&email_address=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "oassis-api-key": "052398FSOWRI2UR7FHJKG789403JHFSA",
          },
          body: JSON.stringify(sissData),
        },
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Error saving prescription to Sunnies System:", error);
      return null;
    }
  }

  async saveNewSunniesSpecsPrescription(sissData, email) {
    try {
      const response = await fetch(
        `https://www.sunnieshub.com/api/3.0/324566/new-prescription/?client_id=95jgnvudiht03075kdhfrw256789dhif&email_address=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "oassis-api-key": "052398FSOWRI2UR7FHJKG789403JHFSA",
          },
          body: JSON.stringify(sissData),
        },
      );

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Error saving prescription to Sunnies Specs:", error);
      return null;
    }
  }

  mapSissData({
    prescriptionItem,
    id,
    prescriptionId,
    userId,
    emailAddress,
    vision,
  }) {
    const frameData = prescriptionItem[0];
    const lensData = prescriptionItem[1];
    const prescriptionData = prescriptionItem[2];

    const prescriptionVision =
      frameData?.prescription_vision?.split(" ").join("_").toLowerCase() ?? "";

    return {
      data: {
        prescription: {
          id: id ?? "",
          prescription_id: prescriptionId ?? "",
          profile_id: userId ?? "",
          email_address: emailAddress ?? "",
          prescription_purpose: vision,
          prescription_vision: prescriptionVision,
          sph_od: prescriptionData?.sph_od ?? "0",
          cyl_od: prescriptionData?.cyl_od ?? "0.00",
          axis_od: prescriptionData?.axis_od ?? "0",
          add_od: prescriptionData?.add_od ?? "0",
          ipd_od: prescriptionData?.ipd_od ?? "30",
          ph_od: prescriptionData?.ph_od ?? "0",
          va_od: "20",
          sph_os: prescriptionData?.sph_os ?? "0",
          cyl_os: prescriptionData?.cyl_os ?? "0.00",
          axis_os: prescriptionData?.axis_os ?? "0",
          add_os: prescriptionData?.add_os ?? "0",
          ipd_os: prescriptionData?.ipd_os ?? "30",
          ph_os: prescriptionData?.ph_os ?? "0",
          va_os: "20",
          lens_name: lensData?.lens_name ?? "",
          frame_name: frameData?.frame_name ?? "",
          store: "Sunnies Studio Online",
        },
      },
    };
  }

  // Utils
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

// VARIABLES
const newClosePrescriptionFlowButton = document.querySelector(
  ".prescription-close-btn"
);
const closePrescriptionFlowButton = document.querySelector(
  ".new-prescription-close-btn"
);
const selectLensesButton = document.querySelector("#new-prescription-toggle");
const shopifyData = JSON.parse(
  document.getElementById("ShopifyData")?.innerHTML ?? "{}",
);

// v - opening and closing modal
let documentBodyElement = document.querySelector("body");
let prescriptionModalElement = document.querySelector(
  ".new-toggle-prescription",
);
let progressTrackerElement = document.querySelector(
  "#js-new-prescription-tracker",
);

// v - data item elements
let framePriceElement = document.querySelector("#frame-price");
let lensUpgradeContainerElement = document.getElementById(
  "new-prescription-lens-upgrade",
);
let lensUpgradeElement = lensUpgradeContainerElement?.querySelector(
  ".new-prescription-text-type",
);
let lensUpgradePriceElement = lensUpgradeContainerElement?.querySelector(
  ".new-prescription-text-price",
);
let prescriptionFlowStepOneElements = document.querySelectorAll(
  '[data-step="select-step01"]',
);
let prescriptionNextButton = document.getElementById(
  "new-prescription-btn-next",
);
let prescriptionSubtotalContainerElement = document.getElementById(
  "new-prescription-subtotal",
);
let prescriptionSubtotalElement =
  prescriptionSubtotalContainerElement?.querySelector(
    "#new-prescription-subtotal-amount",
  );
let visionTypeContainerElement = document.getElementById(
  "new-prescription-vision",
);
let visionTypeElement = visionTypeContainerElement?.querySelector(
  ".new-prescription-text-type",
);

const [prescriptionModalRightSection] = document.getElementsByClassName(
  "new-prescription-right",
);
const [prescriptionModalRightAddToBagSection] = document.getElementsByClassName(
  "new-prescription-added-to-bag",
);

const addedToBagLabel = document.getElementById("added-to-bag-label");

const addedToBagIconDesktop = document.getElementById("added-to-bag-desktop");
const addedToBagIconMobile = document.getElementById("added-to-bag-mobile");
const addedToBagLoadingSpinner = document.getElementById(
  "added-to-bag-loading-spinner",
);

// Select Tinsts
let prescriptionTintSelectionElements = document.querySelectorAll(
  ".new-prescription-right-tints",
);

// Add new prescription / search prescription records
let addNewPrescriptionButton = document.querySelector("#add-prescription");
let addNewPrescriptionForm = document.querySelector(
  "#add-new-prescription-form",
);
let addPrescriptionWrapperElement = document.querySelector(
  ".new-prescription-form-table.add-data",
);
let findEmailInput = document.querySelector("#find-email");
let findRecordsForm = document.querySelector("#find-records-form");
let prescriptionBackButtons = document.querySelectorAll(
  ".new-prescription-back-btn",
);
let prescriptionRecordResultsElement = document.querySelector(
  ".new-prescription-form-results",
);
let prescriptionResultsElement = document.querySelector(
  ".new-prescription-form-results-data",
);
let searchPrescriptionButton = document.querySelector(
  "#search-prescription-records",
);

// Error vars
let prescriptionError = document.querySelector("#new-prescription-error");
let prescriptionErrorButtonWrapper = document.querySelector(
  ".new-prescription-error #error-btn-wrapper",
);
let prescriptionErrorContent = document.querySelector(
  ".new-prescription-error #error-content",
);
let prescriptionErrorTitle = document.querySelector(
  ".new-prescription-error #error-title",
);

// Step 2 and 3 list items
const newPrescriptionObjects =
  document.querySelector("#new-prescription-objects")?.dataset?.object ?? "{}";
const prescriptionFlowStepTwoAndThreeElements = document.querySelectorAll(
  '[data-step="select-step02-03"]',
);
const prescriptionLensData = JSON.parse(newPrescriptionObjects);

priceWithCommaFormat = new Intl.NumberFormat("en-US");

// Global variables empty data
const prescriptionOrigin = "";

let axisLeftEye = "";
let axisRightEye = "";
let cylLeftEye = "";
let cylRightEye = "";
let doNeedAddValidation = false;
let doNeedAxisValidation = false;
let doNeedCylValidation = false;
let doNeedLensValidation = false;
let doNeedSphValidation = false;
let fetchedPrescriptionData = "";
let fetchedPrescriptionDataId = "";
let fetchPrescriptionContent = "";
let grabPrescriptionLensName = "";
let grabPrescriptionOrderId = "";
let grabPrescriptionVisionType = "";
let ipdLeftEye = "";
let ipdRightEye = "";
let isGrabPrescriptionValid = false;
let oldEmail = "";
let oldEmailValue = "";
let prescriptionProduct = [];
let prescriptionVisionTypeDetails = [];
let sphLeftEye = "";
let sphRightEye;
let suggestedLens = [];

let axis_od = "";
let axis_os = "";
let cyl_od = "";
let cyl_os = "";
let ipd_od = "";
let ipd_os = "";
let sph_od = "";
let sph_os = "";

const newPrescriptionUI = new PRESCRIPTIONUI();

// Instantiate the class
// Show it in the console

// EVENT LISTENERS
eventListeners();

function eventListeners() {
  selectLensesButton?.addEventListener("click", function () {
    // new Prescription btn for opening modal
    newPrescriptionUI.openModal();
    localStorage.removeItem('tints-Rx');

    prescriptionFlowStepOneElements.forEach((el) => {
      const { name, price, target } = el.dataset;
      let obj = {
        prescription_vision: name,
        price: price,
        selected: false,
        target: target,
      };
      prescriptionVisionTypeDetails.push(obj);
      newPrescriptionUI.addClickEventVisionElFunction(el, "step1");
    });
  });

  closePrescriptionFlowButton?.addEventListener("click", function () {
    newPrescriptionUI.closeModal();
  });

  newClosePrescriptionFlowButton?.addEventListener("click", function () {
    const errorElement = document.querySelector(".new-prescription-error");

    errorElement?.addEventListener("click", function () {
      errorElement.classList.remove("is-active");
    });
  });

  prescriptionNextButton?.addEventListener("click", function () {
    newPrescriptionUI.handleNextClick(prescriptionNextButton);
  });

  prescriptionFlowStepTwoAndThreeElements?.forEach((el) => {
    el.addEventListener("click", function () {
      newPrescriptionUI.handleNextStep(el);
    });
  });

  prescriptionTintSelectionElements?.forEach((el) => {
    el.addEventListener("click", function () {
      newPrescriptionUI.handleSelectedTints(el);
    });
  });

  searchPrescriptionButton?.addEventListener("click", function () {
    newPrescriptionUI.searchPrescriptionRecord(searchPrescriptionButton);
  });

  addNewPrescriptionButton?.addEventListener("click", function () {
    newPrescriptionUI.addNewPrescription(addNewPrescriptionButton);
  });

  findRecordsForm?.addEventListener("submit", function (evt) {
    newPrescriptionUI.findPrescriptionRecord(evt);
  });

  prescriptionBackButtons?.forEach((backBtn) => {
    backBtn.addEventListener("click", function () {
      newPrescriptionUI.handleBackFunction(this);
    });
  });

  document.addEventListener("click", closeAllSelect);
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document, except the current select box: */
  let x;
  let y;
  let i;
  let xl;
  let yl;
  let arrNo = [];

  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

toggleTable = (param) => {
  $(param).slideToggle();
  let span = $('[data-id="' + param + '"] .toggle-icon');
  span.toggleClass("open");
}

removeLensPaired  = (lensId) => {
  const newCartData = {
    id: `${lensId}`,
    quantity: 0,
  };

  setTimeout(() => {
    fetch("/cart/change.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCartData),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  }, 3000);
}

}
window.addEventListener('DOMContentLoaded', () => {
loadPrescription();
});


// Prescription help message pop-pup
jQuery(document).ready(function() {
  jQuery('#add-prescription').on('click', function() {
    jQuery('.prescription-message-guide-a').addClass('is-visible');
    jQuery('.new-prescription-notes-form').addClass('is-visible');
  });
  jQuery('#search-prescription-records').on('click', function() {
    jQuery('.prescription-message-guide-b').addClass('is-visible');
    jQuery('.new-prescription-notes-form').addClass('is-visible');
  });
  jQuery('.new-prescription-back-btn-item, .new-prescription-close-btn-span').on('click', function() {
    jQuery('.prescription-message-guide-a').removeClass('is-visible');
    jQuery('.prescription-message-guide-b').removeClass('is-visible');
  });
  jQuery('#add-prescription').on('click', function() {
    jQuery('.prescription-message-guide-a').addClass('is-visible');
    jQuery('.new-prescription-notes-form').addClass('is-visible');
  });
  jQuery('.new-prescription-close-btn-span').on('click', function() {
    jQuery('.new-prescription-notes-form').removeClass('is-visible');
  });
});
