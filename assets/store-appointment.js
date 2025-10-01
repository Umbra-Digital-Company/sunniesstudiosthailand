// store location elements
const locationSelect = document.querySelector("#location");
const locationNextButton = document.querySelector(".store-location-button");
const locationDescription = document.querySelector(
  ".store-location-description"
);
const locationDetailsWrapper = document.querySelector(
  ".location-details-wrapper"
);
const locationEdit = document.querySelector("#location-edit");

// date and time elements
const scheduleDetailsWrapper = document.querySelector(
  ".schedule-details-wrapper"
);
const scheduleEdit = document.querySelector("#schedule-edit");
const timeContainer = document.querySelector(".time-container");
const timeSlotContainer = document.querySelector(".time-slot-container");
const timeSlots = document.querySelectorAll(".time-slots");
const scheduleNext = document.querySelector(".store-schedule-button ");
const calendarDayWrapper = document.querySelector(".calendar-dates");
const dateDescription = document.querySelector(".store-schedule-description");

// customer information section elements
const confirmationButton = document.querySelector("#confirmation-button");
const customerDescription = document.querySelector(".customer-description");
const customerDetailsWrapper = document.querySelector(
  ".customer-details-wrapper"
);
const customerInputs = document.querySelectorAll(
  ".customer-details-wrapper input"
);

const appointmentPage = document.querySelector(".store-appointment");
const successPage = document.querySelector(".appointment-success");

let isChecked;
let isEmpty;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const storeParams = urlParams.get("shopifyStoreCode");

let reservationData = {
  action: "reserveAppointment",
  store: "",
  date_slot: "",
  time_slot: "",
  datetime_id: "",
};

let saveAppointmentData = {
  action: "saveAppointment",
  store: "",
  last_name: "",
  first_name: "",
  mobile_number: "",
  appointment_id: "",
  appointment_datetime: "",
  appointment_location: ""
};
  // appointment_datetime = follow this format February 15, 2023 10:00AM
  // appointment_location = capitalize store name
let appointmentData = {
  branch: "",
  branchName: "",
  month: "",
  date: "",
  year: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
};

let addToCalendarConfig = {
  name: "Sunnies Studios Appointment",
  description: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  location: "",
  options: [
    "Apple",
    "Google",
    "iCal",
    "Microsoft365",
    "MicrosoftTeams",
    "Outlook.com",
    "Yahoo",
  ],
  timeZone: "currentBrowser",
};

let storeBranch;
let appointmentDate;
let appointmentTime;
let firstName;
let lastName;
let email;
let mobile;

const slots = {
  1: "11:00 AM",
  2: "11:30 AM",
  3: "12:00 PM",
  4: "12:30 PM",
  5: "1:00 PM",
  6: "1:30 PM",
  7: "2:00 PM",
  8: "2:30 PM",
  9: "3:00 PM",
  10: "3:30 PM",
  11: "4:00 PM",
  12: "4:30 PM",
  13: "5:00 PM",
};

window.addEventListener("load", () => {
  if (storeParams != null) {
    locationSelect.value = storeParams;
    if (locationSelect.value != "")
      locationNextButton.removeAttribute("disabled");
  }
});

locationSelect.addEventListener("change", (event) => {
  if (this != null) {
    locationNextButton.removeAttribute("disabled");
  }
});

// calendar script
let date = new Date(); // creates a new date object with the current date and time
let year = date.getFullYear(); // gets the current year
let month = date.getMonth(); // gets the current month (index based, 0-11)
const currentDate = new Date();
let compareDate = new Date();
compareDate.setDate(currentDate.getDate() + 60);

let scheduledDates = {};
let scheduledTime = {};

const day = document.querySelector(".calendar-dates"); // selects the element with class "calendar-dates"
const currdate = document.querySelector(".calendar-current-date"); // selects the element with class "calendar-current-date"
const prenexIcons = document.querySelectorAll(".calendar-navigation span"); // selects all elements with class "calendar-navigation span"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]; // array of month names

// function to generate the calendar
const manipulate = () => {

removeDates();
  
  // get the first day of the month
  let dayone = new Date(year, month, 1).getDay();

  // get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  // get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  // get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  let lit = ""; // variable to store the generated calendar HTML

  // loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    // lit += `<li class="inactive"> /`${monthlastdate - i + 1}`</li>`;
    lit += `<li class="inactive"> </li>`;
  }

  // loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // check if the current date is today
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "inactive today"
        : "";
    let isTodayAttribute =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "disabled"
        : "";
    let isYesterdayClass =
      i < date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "inactive"
        : "";
    let isYesterdayAttribute =
      i < date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "disabled"
        : "";
    lit += `<li data-schedule_date=${year}-${String(
      parseInt(month) + 1
    ).padStart(2, "0")}-${String(i).padStart(2, "0")} data-month=${
      parseInt(month) + 1
    } data-year=${year} data-date=${String(i).padStart(
      2,
      "0"
    )} class="${isYesterdayClass}${isToday}" ${isYesterdayAttribute} ${isTodayAttribute}>${i}</li>`;
  }

  // loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    // lit += `<li class="inactive hidden">${i - dayend + 1}</li>`
    lit += `<li class="inactive hidden"> </li>`;
  }

  // update the text of the current date element with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;

  // update the HTML of the dates element with the generated calendar
  day.innerHTML = lit;

  if (month == new Date().getMonth() && year == new Date().getFullYear()) {
    prenexIcons[0].classList.add("hidden");
  } else {
    prenexIcons[0].classList.remove("hidden");
  }

  // new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate()) > new Date(year, month, compareDate.getDate())

  if (new Date(
      compareDate.getFullYear(),
      compareDate.getMonth(),
      compareDate.getDate()
    ) > new Date(year, month, compareDate.getDate())
  ) {
    prenexIcons[1].classList.remove("hidden");
  } else {
    prenexIcons[1].classList.add("hidden");
  }
};

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener("click", () => {
    // Check if the icon is "calendar-prev" or "calendar-next"
    month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the month with the new year
      date = new Date(year, month, new Date().getDate());
      // Set the year to the new year
      year = date.getFullYear();
      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }

    // Call the manipulate function to update the calendar display
    manipulate();

    timeContainer.classList.add("collapsed");

    checkDateAvailability();
  });
});

/*
*
location functions
*
*/
locationNextButton.addEventListener("click", () => {
  if (locationSelect.value != "") {
    storeBranch = locationSelect.value;

    manipulate();
    showCalendar();
    showCalendarSpinner();
    getStoreDates(storeBranch);
    reservationData.store = storeBranch;
  }
});

locationEdit.addEventListener("click", () => {
  customerDetailsWrapper.classList.remove("error-3");
  customerDescription.classList.add("collapsed");
  customerDetailsWrapper.classList.add("collapsed");
  locationDetailsWrapper.classList.remove("collapsed");
  timeContainer.classList.add("collapsed");
  scheduleDetailsWrapper.classList.add("collapsed");
  scheduleNext.setAttribute("disabled", "");
  appointmentData.time = "";
});

/*
*
location functions
*
*/

/*
*
schedule functions
*
*/

const generateTime = (timeslots) => {
  let slotBox = "";
    removeTimes();
  
  const time = generateTimeSlots(scheduledTime.schedule.opening, scheduledTime.schedule.closing)
  for (let i = 0; i < time.length; i++) {
    // check if the current date is today
    let convertedTime = convertTimeText(time[i].startTime);
    
    slotBox += `<div class="time-slots" data-datetime_id="${reservationData.store}_${reservationData.date_slot}_${convertTo24HourFormat(convertedTime)}" data-date_slot="${reservationData.date_slot}" data-time_slot="${convertTo24HourFormat(convertedTime)}" data-value="${convertedTime}"> ${convertedTime} </div>`;

  }
  timeSlotContainer.innerHTML = slotBox;
  checkTimeAvailability();
  const slot = timeSlotContainer.querySelectorAll(".time-slots");
  slot.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (!e.target.classList.contains("inactive")) {
        appointmentData.time = element.getAttribute("data-value");
        slot.forEach((x) => {
          x.classList.remove("active");
        });
        element.classList.add("active");
        reservationData.time_slot = e.target.getAttribute("data-time_slot");
        reservationData.datetime_id = e.target.getAttribute("data-datetime_id");
        
        scheduleNext.removeAttribute("disabled");
      }
    });
  });
};

// generate time slots based on opening and closing
function generateTimeSlots(opening, closing) {
  const openingTime = new Date(`1970-01-01T${opening}`);
  const closingTime = new Date(`1970-01-01T${closing}`);
  const intervalDuration = 60 * 60 * 1000; // 1 hour in milliseconds

  const hourlyIntervals = [];

  for (let time = openingTime; time < closingTime; time = new Date(time.getTime() + intervalDuration)) {
    const startTime = time.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    const endTime = new Date(time.getTime() + intervalDuration).toLocaleTimeString().replace(/:\d{2}\s/, ' ');

    hourlyIntervals.push({
      startTime,
      endTime
    });
  }

  return hourlyIntervals;
}

function convertTimeText(time) {
  // Input time in 24-hour format

  // Split the input time into hours, minutes, and seconds
  var timeParts = time.split(":");
  var hours = parseInt(timeParts[0], 10);
  var minutes = timeParts[1];

  // Convert to 12-hour format
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (00:00) as 12 AM

  // Format the result
  var resultTime = hours + ":" + minutes;

  return resultTime; // Output: "3:00 PM"
}

const li = document.createElement("li");
// function for calendar date click
calendarDayWrapper.addEventListener("click", (e) => {
  let temp = calendarDayWrapper.querySelectorAll(".calendar-dates li");
  if (
    !e.target.classList.contains("inactive") &&
    !e.target.classList.contains("calendar-dates")
  ) {
    for (let x = 0; x < temp.length; x++) {
      temp[x].classList.remove("active");
    }
    e.target.classList.add("active");
    $('.time-spinner').css({display:"flex"})
    getStoreDateTime(
      storeBranch,
      `${storeBranch}_${e.target.getAttribute("data-schedule_date")}`
    );
    appointmentData.time = "";
    scheduleNext.setAttribute("disabled", "");
    appointmentData.month = e.target.getAttribute("data-month");
    appointmentData.date = e.target.getAttribute("data-date");
    appointmentData.year = e.target.getAttribute("data-year");
    
    reservationData.date_slot = e.target.getAttribute("data-schedule_date");
    timeContainer.classList.remove("collapsed");
  }
});

scheduleNext.addEventListener("click", (e) => {
  reserveAppointment();
});

scheduleEdit.addEventListener("click", () => {
  customerDetailsWrapper.classList.remove("error-3");
  customerDescription.classList.add("collapsed");
  customerDetailsWrapper.classList.add("collapsed");
  scheduleDetailsWrapper.classList.remove("collapsed");
});

function removeTimes() {
  document
    .querySelectorAll(".time-slot-container .time-slots")
    .forEach((element) => {
      element.remove();
    });
}

function removeDates() {
  document
    .querySelectorAll(".calendar-dates li")
    .forEach((element) => {
      element.remove();
    });
}

function scheduleTextFunc() {
  let scheduleDate = new Date(
    appointmentData.year,
    appointmentData.month -1,
    appointmentData.date
  );
  let scheduleText = scheduleDate.toLocaleString("default", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  return scheduleText;
}

/*
*
customer details function
*
*/

confirmationButton.addEventListener("click", (e) => {
  
  customerDetailsWrapper.classList.remove("error-3");
  isEmpty = false;
  isChecked = false;
  customerInputs.forEach((element) => {
    if (element.type == "checkbox") {
      element.checked
        ? element.parentElement.parentElement.classList.remove("error")
        : element.parentElement.parentElement.classList.add("error");
    } else {
      if (element.id == "email") {
        isValidEmail(element.value)
          ? element.parentElement.classList.remove("error")
          : element.parentElement.classList.add("error");
      } else if (element.id == "phone") {
        isValidPhoneNumber(element.value)
          ? element.parentElement.classList.remove("error")
          : element.parentElement.classList.add("error");
      } else {
        element.value.length > 1
          ? element.parentElement.classList.remove("error")
          : element.parentElement.classList.add("error");
      }
    }
  });
  customerInputs.forEach((element) => {
    if (element.id == "email") {
      isValidEmail(element.value) ? "" : (isEmpty = true);
    } else if (element.id == "phone") {
      isValidPhoneNumber(element.value) ? "" : (isEmpty = true);
    } else {
      element.value.length > 1 ? "" : (isEmpty = true);
    }
    if (element.type == "checkbox") {
      element.checked ? (isChecked = true) : (isChecked = false);
    }
  });

  if (isEmpty && !isChecked) {
    customerDetailsWrapper.classList.remove("error-2");
    customerDetailsWrapper.classList.add("error-1");
  } else if (!isEmpty && !isChecked) {
    customerDetailsWrapper.classList.remove("error-1");
    customerDetailsWrapper.classList.add("error-2");
  } else if (isEmpty && isChecked) {
    customerDetailsWrapper.classList.remove("error-2");
    customerDetailsWrapper.classList.add("error-1");
  } else if (!isEmpty && isChecked) {
    // proceed booking
    customerDetailsWrapper.classList.remove("error-1");
    customerDetailsWrapper.classList.remove("error-2");

    appointmentData.firstName = document.querySelector("#firstname").value;
    appointmentData.lastName = document.querySelector("#lastname").value;
    appointmentData.email = document.querySelector("#email").value;
    appointmentData.mobile = document.querySelector("#phone").value;

    saveAppointmentData.first_name = document.querySelector("#firstname").value;
    saveAppointmentData.last_name = document.querySelector("#lastname").value;
    saveAppointmentData.email_address = document.querySelector("#email").value;
    saveAppointmentData.mobile_number = document.querySelector("#phone").value;
    saveAppointmentData.appointment_datetime = appointmentTimeConvert(appointmentData.year, appointmentData.month - 1 , appointmentData.date) + " " + appointmentData.time;
    saveAppointmentData.appointment_location = appointmentData.branchName;

    saveAppointmentData.store = storeBranch;

    addToCalendarConfig.startDate = `${appointmentData.year}-${parseInt(
      appointmentData.month
    ).toString()}-${appointmentData.date}`;

    addToCalendarConfig.endDate = `${appointmentData.year}-${parseInt(
      appointmentData.month
    ).toString()}-${appointmentData.date}`;
    let startTime = convertTo24HourFormat(appointmentData.time);
    addToCalendarConfig.startTime = startTime;

    let endTime = addThirtyMinutes(addToCalendarConfig.startTime);
    addToCalendarConfig.endTime = endTime;
    addToCalendarConfig.location = `${appointmentData.branchName}`;
    
    saveAppointment();
  }

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    var phoneRegex = /^(?:\+?63|0)(?:(9\d{9})|(?:[2-9]\d{8}))$/;
    return phoneRegex.test(phoneNumber);
  }

});

function appointmentTimeConvert(year, month, date){
  
  let scheduleDate = new Date(
    year,
    month,
    date
  );
  let scheduleText = `${scheduleDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, ${scheduleDate.toLocaleString("default", { weekday: "long" })}`;

  return scheduleText
  
}

function addThirtyMinutes(time) {
  var [hours, minutes] = time.split(":");
  
  // Convert hours and minutes to integers
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Calculate total minutes and add 30
  var totalMinutes = hours * 60 + minutes + 30;

  // Calculate new hours and minutes
  var newHours = Math.floor(totalMinutes / 60) % 24;
  var newMinutes = totalMinutes % 60;

  // Format the new time
  var newTimeStr =
    newHours.toString().padStart(2, "0") +
    ":" +
    newMinutes.toString().padStart(2, "0");

  return newTimeStr;
}


function convertTo24HourFormat(time12) {
  // Split the time string into hours, minutes, and period (AM/PM)
  var [time, period] = time12.split(" ");

  // Split hours and minutes
  var [hours, minutes] = time.split(":");

  // Convert hours to 24-hour format
  hours = parseInt(hours, 10);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Format the time in 24-hour format
  var time24 =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") + ":00";

  return time24;
}

function success() {
  appointmentPage.remove();
  successPage.classList.remove("collapsed");

  document.querySelector(".appointment-detail-location div").innerText =
    appointmentData.branchName;

  let scheduleDate = new Date(
    appointmentData.year,
    appointmentData.month - 1,
    appointmentData.date
  );
  let scheduleText = `${scheduleDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, ${scheduleDate.toLocaleString("default", { weekday: "long" })}`;

  document.querySelector(".appointment-detail-date div").innerText =
    scheduleText;
  document.querySelector(".appointment-detail-time div").innerText =
    appointmentData.time;

 document.querySelector("#cancelLink").setAttribute('href', `/pages/cancel?appointmentID=${saveAppointmentData.appointment_id}`)
}

const button = document.getElementById("add-to-calendar-appoint");
if (button) {
  button.addEventListener("click", () =>{
    atcb_action(addToCalendarConfig, button)
  }
  );
}

async function getStoreDates(store) {
  let url = `https://sunnieshub.com/admin/store-management/api/get_schedule.php?action=getStoresDate&store=${store}`;

  const bearerToken = "$$$uni3$HuBBB";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      scheduledDates = data;
      removeCalendarSpinner();
      checkDateAvailability();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function getStoreDateTime(store, schedule_id) {
  let url = `https://sunnieshub.com/admin/store-management/api/get_schedule.php?action=getStoresDateTime&store=${store}&store_date=${schedule_id}`;

  const bearerToken = "$$$uni3$HuBBB";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data);

      $('.time-spinner').css({display:"none"})
      scheduledTime = data
      generateTime(data);
      
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function showCalendar() {
  locationDetailsWrapper.classList.add("collapsed");
  locationEdit.removeAttribute("hidden");
  
  locationDescription.innerText = `The selected store location is ${locationSelect[locationSelect.selectedIndex].label}.`;
  locationDescription.style.color = "black";
  scheduleDetailsWrapper.classList.remove("collapsed");
  dateDescription.classList.remove("collapsed");
  appointmentData.branch = locationSelect.value;
  appointmentData.branchName =
    locationSelect[locationSelect.selectedIndex].label;
  showCalendarSpinner();
}

function removeCalendarSpinner() {
  $(".calendar-spinner").css({ display: "none" });
}
function showCalendarSpinner() {
  $(".calendar-spinner").css({ display: "flex" });
}

// check if dates are available

function checkDateAvailability() {
  // Get an array of scheduled dates with total_appointment >= 65
  const disabledDates = scheduledDates.data;


  // Disable dates that have total_appointment >= 5
  const calendarDates = document.querySelectorAll(".calendar-dates li");

  calendarDates.forEach((dateElement) => {

    // Check if the date is in the disabledDates array
    if (disabledDates.includes(dateElement.getAttribute("data-schedule_date"))) {
      dateElement.classList.add("inactive");
      dateElement.setAttribute("disabled", "");
    }

    let dateChecker = new Date(dateElement.getAttribute("data-schedule_date"))

    if(dateChecker >= compareDate){
      dateElement.classList.add("inactive");
      dateElement.setAttribute("disabled", "");
    }
  });
}

// disable time if returned 
function checkTimeAvailability() {
  // Get an array of scheduled times
  const disabledTimes = scheduledTime.data;
  
  const timeSlotBlocks = document.querySelectorAll(".time-slots");

  timeSlotBlocks.forEach((timeElement) => {

    // Check if the time is in the disabledTimes array
    if (disabledTimes.includes(timeElement.getAttribute("data-time_slot")) || disabledTimes.includes(timeElement.getAttribute("data-time_slot"))) {
      timeElement.classList.add("inactive");
      timeElement.setAttribute("disabled", "");
      timeElement.removeAttribute("data-datetime_id");
    }
  });
}

/*version 1
function checkDateAvailabilityV1() {
  // Get an array of scheduled dates with total_appointment >= 65
  const disabledDates = scheduledDates.data
    .filter((entry) => parseInt(entry.total_appointment) >= 65)
    .map((entry) => entry.schedule_date);

  const scheduledDateStrings = scheduledDates.data.map(
    (entry) => entry.schedule_date
  );

  // Disable dates that have total_appointment >= 5
  const calendarDates = document.querySelectorAll(".calendar-dates li");

  calendarDates.forEach((dateElement) => {
    const dateAttribute = dateElement.getAttribute("data-date");
    const monthAttribute = dateElement.getAttribute("data-month");
    const yearAttribute = dateElement.getAttribute("data-year");

    const formattedDate = `${yearAttribute}-${String(monthAttribute).padStart(
      2,
      "0"
    )}-${String(dateAttribute).padStart(2, "0")}`;

    // Check if the date is in the disabledDates array
    if (disabledDates.includes(formattedDate)) {
      dateElement.classList.add("inactive");
      dateElement.setAttribute("disabled", "");
    }
    if (!scheduledDateStrings.includes(formattedDate)) {
      dateElement.classList.add("inactive");
      dateElement.setAttribute("disabled", "");
    }
  });
}
*/

async function reserveAppointment() {
  fetch("https://sunnieshub.com/admin/store-management/api/post_schedule.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer $$$uni3$HuBBB",
    },
    body: new URLSearchParams(reservationData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Reservation response:", data);
      saveAppointmentData.appointment_id = data.data.appointment_id;
      console.log(saveAppointmentData.appointment_id);
      localStorage.setItem("appointment_reservation", data.data.appointment_id);
      dateDescription.style.color = "black";
      customerDescription.classList.remove("collapsed");
      customerDetailsWrapper.classList.remove("collapsed");
      scheduleEdit.removeAttribute("hidden");
      scheduleDetailsWrapper.classList.add("collapsed");
      dateDescription.innerText = `Your store appointment is on ${scheduleTextFunc()} at ${
        appointmentData.time
      }.`;
    })
    .catch((error) => {
      console.error("Error in reservation:", error);
    });
}

async function saveAppointment() {
  fetch("https://sunnieshub.com/admin/store-management/api/post_schedule.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer $$$uni3$HuBBB",
    },
    body: new URLSearchParams(saveAppointmentData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Reservation response:", data);
        if(Object.keys(data).includes('error')){
          customerDetailsWrapper.classList.add("error-1");
        }else{
          success();  
        }
    })
    .catch((error) => {
      
      customerDetailsWrapper.classList.add("error-3");
      console.error("Error in reservation:", error);
    });
}
