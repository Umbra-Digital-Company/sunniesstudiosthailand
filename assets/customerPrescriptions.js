async function initializeCustomerPrescription() {
  const BIFOCAL = "bifocal";
  const PROGRESSIVE = "progressive";
  const SPH = "SPH";
  const CYL = "CYL";
  const AXIS = "AXIS";
  const ADD = "ADD";
  const IPD = "IPD";
  const PH = "PH";

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const shopifyData = JSON.parse(document.getElementById("ShopifyData")?.innerHTML ?? "{}");
  const customerData = shopifyData?.customer ?? {};

  const isMobile = window.innerWidth < 769;

  async function grabCustomerPrescriptionData(email) {
    try {
      const URL = `https://www.sunniessystems.com/api/3.0/324566/prescriptions/?client_id=95jgnvudiht03075kdhfrw256789dhif&email_address=${email}`;

      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "oassis-api-key": "052398FSOWRI2UR7FHJKG789403JHFSA",
        },
      });

      if (response.ok) {
        return response.json();
      }

      return {};
    } catch (error) {
      console.error(error);
    }
  }

  function generatePrescriptionCardTitle(prescriptionPurpose) {
    if (prescriptionPurpose === BIFOCAL) {
      return "Bifocal lenses";
    } else if (prescriptionPurpose === PROGRESSIVE) {
      return "Progressive lenses";
    } else {
      return "Single Vision lenses";
    }
  }

  function generatePrescriptionCardDate(dateCreated) {
    const date = new Date(dateCreated.replace(/-/g, "/"));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return `Added on: ${monthNames[month]} ${day}, ${year}`;
  }

  function handlePrescriptionResponsiveLabel(prescriptionUnitMobile, prescriptionUnitDesktop) {
    return isMobile ? prescriptionUnitMobile : prescriptionUnitDesktop;
  }

  function generatePrescriptionRowLabel(prescriptionUnit) {
    if (prescriptionUnit === SPH) return handlePrescriptionResponsiveLabel(SPH, "Sphere (SPH)");
    if (prescriptionUnit === CYL) return handlePrescriptionResponsiveLabel(CYL, "Cylinder (CYL)");
    if (prescriptionUnit === AXIS) return handlePrescriptionResponsiveLabel(AXIS, "Axis");
    if (prescriptionUnit === ADD) return handlePrescriptionResponsiveLabel(ADD, "Addition (ADD)");
    if (prescriptionUnit === IPD) return handlePrescriptionResponsiveLabel(IPD, "Interpupillary Distance (IPD)");
    if (prescriptionUnit === PH) return PH;

    return "";
  }

  function generatePrescriptionTable(prescription) {
    const {
      add_od: addRightEye,
      add_os: addLeftEye,
      axis_od: axisRightEye,
      axis_os: axisLeftEye,
      cyl_od: cylRightEye,
      cyl_os: cylLeftEye,
      ipd_od: ipdRightEye,
      ipd_os: ipdLeftEye,
      ph_od: phRightEye,
      ph_os: phLeftEye,
      prescription_purpose: prescriptionPurpose,
      sph_od: sphRightEye,
      sph_os: sphLeftEye,
    } = prescription;

    const isSingleVision = prescriptionPurpose !== BIFOCAL && prescriptionPurpose !== PROGRESSIVE;

    const prescriptionTableElement = document.createElement("table");

    const prescriptionTableColumnGroup = document.createElement("colgroup");

    const prescriptionTableLabelColumn = document.createElement("col");
    const prescriptionTableLeftEyeColumn = document.createElement("col");
    const prescriptionTableRightEyeColumn = document.createElement("col");

    prescriptionTableLabelColumn.setAttribute("class", "prescription-label-column");
    prescriptionTableLeftEyeColumn.setAttribute("class", "prescription-left-eye-column");
    prescriptionTableRightEyeColumn.setAttribute("class", "prescription-right-eye-column");

    prescriptionTableColumnGroup.append(prescriptionTableLabelColumn, prescriptionTableLeftEyeColumn, prescriptionTableRightEyeColumn);

    const prescriptionTableHead = document.createElement("tr");
    const emptyTableColumnHead = document.createElement("th");
    const leftEyeTableColumnHead = document.createElement("th");
    const rightEyeTableColumnHead = document.createElement("th");

    leftEyeTableColumnHead.appendChild(document.createTextNode("OS Left eye"));
    rightEyeTableColumnHead.appendChild(document.createTextNode("OD Right eye"));

    prescriptionTableHead.append(emptyTableColumnHead, leftEyeTableColumnHead, rightEyeTableColumnHead);

    const singleVisionDataList = [
      { prescriptionUnit: SPH, leftEye: sphLeftEye, rightEye: sphRightEye },
      { prescriptionUnit: CYL, leftEye: cylLeftEye, rightEye: cylRightEye },
      { prescriptionUnit: AXIS, leftEye: axisLeftEye, rightEye: axisRightEye },
      { prescriptionUnit: IPD, leftEye: Number(ipdLeftEye).toFixed(2), rightEye: Number(ipdRightEye).toFixed(2) },
    ];
    const bifocalAndProgressiveDataList = [
      { prescriptionUnit: SPH, leftEye: sphLeftEye, rightEye: sphRightEye },
      { prescriptionUnit: CYL, leftEye: cylLeftEye, rightEye: cylRightEye },
      { prescriptionUnit: AXIS, leftEye: axisLeftEye, rightEye: axisRightEye },
      { prescriptionUnit: ADD, leftEye: addLeftEye, rightEye: addRightEye },
      { prescriptionUnit: IPD, leftEye: Number(ipdLeftEye).toFixed(2), rightEye: Number(ipdRightEye).toFixed(2) },
      { prescriptionUnit: PH, leftEye: phLeftEye, rightEye: phRightEye },
    ];

    const prescriptionValueList = isSingleVision ? singleVisionDataList : bifocalAndProgressiveDataList;

    prescriptionTableElement.appendChild(prescriptionTableColumnGroup);
    prescriptionTableElement.appendChild(prescriptionTableHead);

    prescriptionValueList.forEach((prescriptionValue) => {
      const { prescriptionUnit, leftEye, rightEye } = prescriptionValue;

      const prescriptionTableRow = document.createElement("tr");

      const prescriptionLabel = generatePrescriptionRowLabel(prescriptionUnit);

      const prescriptionRowLabel = document.createElement("td");
      const leftEyeTableColumn = document.createElement("td");
      const rightEyeTableColumn = document.createElement("td");

      prescriptionRowLabel.setAttribute("id", "prescription-row-label");

      prescriptionRowLabel.appendChild(document.createTextNode(prescriptionLabel));
      leftEyeTableColumn.appendChild(document.createTextNode(leftEye));
      rightEyeTableColumn.appendChild(document.createTextNode(rightEye));

      prescriptionTableRow.append(prescriptionRowLabel, leftEyeTableColumn, rightEyeTableColumn);

      prescriptionTableElement.appendChild(prescriptionTableRow);
    });

    return prescriptionTableElement;
  }

  function generatePrescriptionCards(prescriptions) {
    return prescriptions.map((prescription) => {
      const { order_date_created: dateCreated, prescription_purpose: prescriptionPurpose } = prescription;

      const prescriptionListElement = document.createElement("li");
      const prescriptionTitleElement = document.createElement("h3");
      const prescriptionDateElement = document.createElement("p");

      const prescriptionCardTitle = generatePrescriptionCardTitle(prescriptionPurpose);
      const prescriptionCardDate = generatePrescriptionCardDate(dateCreated);
      const prescriptionTable = generatePrescriptionTable(prescription);

      prescriptionTitleElement.innerText = prescriptionCardTitle ?? "";
      prescriptionDateElement.innerText = prescriptionCardDate ?? "";

      prescriptionListElement.append(prescriptionTitleElement, prescriptionDateElement, prescriptionTable);

      return prescriptionListElement;
    });
  }

  const customerPrescriptions = await grabCustomerPrescriptionData(customerData?.email ?? "");
  const historicalPrescriptions = customerPrescriptions?.prescriptions_historical ?? {};

  const hasNoPrescriptions = !historicalPrescriptions.length;

  const customerPrescriptionList = document.getElementById("customer-prescription-list");
  customerPrescriptionList.innerHTML = "";

  if (hasNoPrescriptions) {
    const noPrescriptionElement = document.createElement("li");
    noPrescriptionElement.innerHTML =
      "<span>You have no prescriptions in our record yet. If this doesn't seem right, send us an email at <a href='mailto:hello@sunniesstudios.com'>hello@sunniesstudios.com</a> so our team can help you out.</span>";
    noPrescriptionElement.setAttribute("id", "customer-prescription-no-prescription-label");

    customerPrescriptionList.appendChild(noPrescriptionElement);

    return;
  }

  const prescriptionCards = generatePrescriptionCards(historicalPrescriptions);
  customerPrescriptionList.append(...prescriptionCards);
}

const dataModule = document?.querySelector('[data-module="my-prescription"]');

const observer = new MutationObserver(function ([record]) {
  const isMyPrescriptionShown = !record?.target?.classList?.contains("hide");

  if (isMyPrescriptionShown) {
    initializeCustomerPrescription();
  }
});

observer.observe(dataModule, {
  attributes: true,
  attributeFilter: ["class"],
});
