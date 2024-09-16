const expectedHeaders = [
  //expected headers for csv file
  'make',
  'colour',
  'dateOfManufacture',
  'vin',
  'registrationArea',
]

// Validate CSV headers
function validateHeaders(headers) {
  return JSON.stringify(headers) === JSON.stringify(expectedHeaders)
}

// Validate registration format
function isValidFormat(registrationNumber) {
  if (
    typeof registrationNumber !== 'string' || //reg must be of type string
    registrationNumber.length !== 9 //reg must have 9 characters (including spaces)
  ) {
    return false
  }
  const registrationPattern = /^[A-Z]{2}\s\d{2}\s[A-HJLNOPQRSTUVWXZ]{3}$/ // ^ means it must start with 2 capital letters, followed by space, then 2 digits, space then 3 valid letters
  return registrationPattern.test(registrationNumber)
}

// Validate area code format
function isValidAreaCode(areaCode) {
  const areaCodePattern = /^(C[A-K]|C[L-Z]|B[ABC])/ //Additional areas can be added here in the future
  return areaCodePattern.test(areaCode)
}

// Validate area
function isAreaValid(area) {
  const validAreas = ['cardiff', 'swansea', 'birmingham'] //add more cities here in the future
  return validAreas.includes(area.toLowerCase())
}

// Validate date format
function isDateValid(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/ // ^ - start of string, $ - end of string,  () - 'capturing group' - \/ matches the forward slash (/) for the date
  const match = dateString.match(regex) //match the date string with the regex

  if (!match) {
    return false
  }

  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year = parseInt(match[3], 10)

  // Check for valid day and month ranges
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  // Additional checks for specific months and leap years could be added here
  return true
}

function isCSV(file) {
  //validates if file is a csv file
  return file.toLowerCase().endsWith('.csv')
}

//tests for isCSV method
console.log('vehicles.csv: ' + isCSV('vehicles.csv')) // true
console.log('vehicles.txt: ' + isCSV('vehicles.txt')) // false
console.log('data.CSV: ' + isCSV('data.CSV')) // true (case insensitive)

export {
  validateHeaders,
  isValidFormat,
  isValidAreaCode,
  isAreaValid,
  isDateValid,
  expectedHeaders,
  isCSV,
}
