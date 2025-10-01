function initializeVTO() {

  const virtualTryOnScanContainerElement =
    document.getElementById("vto-scan-container");
  const productGalleryElement = document.getElementById("product-get-sku");
  const productSku = productGalleryElement.dataset.productSku;
  const mobileTryOnButton = document.getElementById("mobile-try-on-button");
  const desktopTryOnButton = document.getElementById("desktop-virtual-try-on-btn");
  const desktopRetakeButton = document.getElementById("desktop-virtual-retake-try-on-btn");
  const vtoCloseButton = document.getElementById("desktop-virtual-close");
  const desktopSwipeToRotateText = document.getElementById("desktop-swipe-to-rotate-text");

  function getAvailability(idTable) {
    const apiKey = "64535efc7ab66565";
    const url = `https://product-api.fittingbox.com/glasses-metadata/availability?apiKey=${apiKey}&uidList=${idTable}`;
  
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("An error occurred while fetching availability.");
        })
        .catch(error => {
            console.error("Fetch error:", error);
            throw error;
        });
  }
  
  function createCard({ available }) {
    const mobileTryOnButton = document.getElementById("mobile-try-on-button");
    const desktopTryOnButton = document.getElementById("desktop-virtual-try-on-btn");
  
    if (available) {
        mobileTryOnButton.style.display = "flex";
        desktopTryOnButton.style.display = "flex";
        console.log("This product is available for try-on.", productSku);
    } else {
        mobileTryOnButton.style.display = "none";
        desktopTryOnButton.style.display = "none";
        console.log("This product is not available for try-on.");
    }
  
    // Returning the DOM element here if needed for further processing
    return;
  }
  
  function main() {
    const idTable = [productSku];
  
    getAvailability(idTable)
        .then(availabilityResult => {
            // Assuming the API returns an array of results
            availabilityResult.forEach(createCard);
        })
        .catch(err => {
            console.error("Error in main function:", err);
        });
  }
  
  main();

  const mobileLoadingSpinnerElement = document.getElementById(
    "mobile-loading-spinner",
  );

  function saveScanData({ scanId, overlaySignature }) {
    const scanData = JSON.stringify({
      scanId: scanId,
      overlaySignature: overlaySignature,
      expirationDate: new Date().getTime() + (50 * 60 * 1000)
    });

    localStorage.setItem("vto-scan-data", scanData);
  }

  function getScanData() {
    let scanData = localStorage.getItem("vto-scan-data");

    if (!scanData) return {};

    scanData = JSON.parse(scanData);

    if (!scanData.scanId || !scanData.overlaySignature || !scanData.expirationDate) {
      localStorage.removeItem('vto-scan-data');
      return {};
    }
    if (scanData.expirationDate <= new Date().getTime()) {
      localStorage.removeItem('vto-scan-data');
      return {};
    }

    return scanData;
  }

  function initializeVtoScanUi({ isMobile }) {
    virtualTryOnScanContainerElement.style.display = "none";

    if (isMobile) {
      mobileLoadingSpinnerElement.style.display = "flex";
    } else {
      const productVtoWrapper = document.getElementById("product-vto-wrapper");
      productVtoWrapper.style.display = "none";
    }
  }

  function initializeVtoScan({
    isMobile,
    scanDomSelector,
    overlayDomSelector,
  }) {

    const tryOnServer = "https://vto.partners-au.api.ditto.com";
    const partnerId = "sunniesstudios";
    const accessKey = "64535efc7ab66565";
    const partnerSignature = partnerId;

    const config = {
      tryOnServer,
      accessKey,
      partnerId,
      partnerSignature,
      domSelector: scanDomSelector,
      enableFaceInsights: true,
    };

    const callbacks = {
      success: function (response) {
        initializeVtoScanUi({ isMobile });

        const { scanId, overlaySignature } = response;

        saveScanData({ scanId, overlaySignature });

        scan.destroy();

        runOverlay({
          isMobile,
          scanId,
          overlaySignature,
          tryOnServer,
          partnerId,
          accessKey,
          overlayDomSelector,
        });
        runOverlay({
          isMobile,
          scanId,
          overlaySignature,
          tryOnServer,
          partnerId,
          accessKey,
          overlayDomSelector: `.swiper-slide-duplicate ${overlayDomSelector}`
        });
      },
      progress: function (response) {
        // TODO: Add toast message to display progress
      },
      failure: function (response) {
        console.error("failure: ", response);
      },
      close: function (response) {
        virtualTryOnScanContainerElement.style.display = "none";
        productGalleryElement.classList.add("finished-scanning");
        // TODO: Add toast message when closed
      },
      faceiq_result: function (response) {
        // TODO: display face insight result
      },
    };

    const savedScanData = getScanData();

    const hasScanData = !!Object.keys(savedScanData)?.length;

    if (hasScanData) {
      initializeVtoScanUi({ isMobile });

      runOverlay({
        isMobile,
        scanId: savedScanData?.scanId ?? "",
        overlaySignature: savedScanData?.overlaySignature ?? "",
        tryOnServer,
        partnerId,
        accessKey,
        overlayDomSelector,
      });
      runOverlay({
        isMobile,
        scanId: savedScanData?.scanId ?? "",
        overlaySignature: savedScanData?.overlaySignature ?? "",
        tryOnServer,
        partnerId,
        accessKey,
        overlayDomSelector: `.swiper-slide-duplicate ${overlayDomSelector}`
      });

      return;
    }

    const scan = new Ditto.Scan(config, callbacks);
  }

  function runOverlay({
    isMobile,
    scanId,
    overlaySignature,
    tryOnServer,
    partnerId,
    accessKey,
    overlayDomSelector,
  }) {
    const options = {
      tryOnServer,
      partnerId,
      accessKey,
      scanId,
      overlaySignature,
      domSelector: overlayDomSelector,
      glassesId: productSku,
    };

    const callbacks = {
      initialized: function (response) {
        // TODO: Display toast message when initialized
      },
      success: function (response) {
        // TODO: Display toast message when success

        if (isMobile) {
          mobileLoadingSpinnerElement.style.display = "none";
          productGalleryElement.classList.add("finished-scanning");
          productGallerySwiper.slideTo(1);
          mobileTryOnButton.style.display = "none";
        } else {
          desktopRetakeButton.style.display = "inline-block";
          vtoCloseButton.style.display = "flex";
          desktopSwipeToRotateText.style.display = "block";
        }
      },
      failure: function (error) {
        console.error("failure: ", error);
      },
    };

    const dittoOverlay = new Ditto.Overlay(options, callbacks);
  }

  // async function getDittoCredentials() {
  //   const res = await fetch("/tools/auth_key/ditto-auth-credentials/");

  //   const data = await res.json();

  //   return data;
  // }

  mobileTryOnButton.onclick = function () {
    initializeNewVtoSlide();

    virtualTryOnScanContainerElement.style.display = "flex";
    initializeVtoScan({
      isMobile: true,
      overlayDomSelector: ".vto-overlay",
      scanDomSelector: "#vto-scan",
    });
  };

  desktopTryOnButton.onclick = function () {
    virtualTryOnScanContainerElement.style.display = "flex";
    initializeVtoScan({
      isMobile: false,
      overlayDomSelector: "#desktop-vto-overlay",
      scanDomSelector: "#vto-scan",
    });
  };



  function initializeNewVtoSlide() {
    productGallerySwiper.prependSlide(`
    <div class="swiper-slide" id="vto-overlay-slide">
      <div id="vto-overlay" class="vto-overlay">
        <button id="mobile-retake-try-on-button">Retake</button>
        <span id="mobile-swipe-to-rotate-text">Swipe to rotate</span>
      </div>
    </div>`);
    productGallerySwiper.update();

    const mobileRetakeButton = document.getElementById(
      "mobile-retake-try-on-button",
    );

    mobileRetakeButton.onclick = function () {
      localStorage.removeItem("vto-scan-data");

      virtualTryOnScanContainerElement.style.display = "flex";
      productGalleryElement.classList.remove("finished-scanning");

      initializeVtoScan({
        isMobile: true,
        overlayDomSelector: ".vto-overlay",
        scanDomSelector: "#vto-scan",
      });
    };
  }

  desktopRetakeButton.onclick = function () {
    virtualTryOnScanContainerElement.style.display = "flex";

    initializeVtoScan({
      isMobile: false,
      overlayDomSelector: "#desktop-vto-overlay",
      scanDomSelector: "#vto-scan",
    });
  };

  vtoCloseButton.onclick = function () {
    location.reload();
  };

}

initializeVTO();