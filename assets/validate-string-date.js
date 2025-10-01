function formatDate(date) {
  // Split the date into its parts
  const parts = date.split('-');
  
  // Extract the year, month, and day
  const year = parts[0];
  let month = parts[1];
  let day = parts[2];
  
  // Add leading zeros to the month and day if necessary
  month = month.length < 2 ? '0' + month : month;
  day = day.length < 2 ? '0' + day : day;
  
  // Return the formatted date
  return year + '-' + month + '-' + day;
}
function validateFormattedDate(date) {
  // Check if the date is in the correct format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }
  
  // Extract the year from the date
  const year = date.substring(0, 4);
  
  // Check if the year is not less than 1800
  if (year < 1800) {
    return false;
  }
  
  // Parse the date into a Date object
  const parsedDate = new Date(date);
  
  // Check if the date is a valid Date object
  if (!parsedDate.getTime()) {
    return false;
  }
  
  // Check if the date is not greater than the current date
  const currentDate = new Date();
  if (parsedDate > currentDate) {
    return false;
  }
  
  // If all checks pass, return true
  return true;
}

function validateStringDate(date){
  const formattedDate = formatDate(date);
  return validateFormattedDate(formattedDate)
}