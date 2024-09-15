import { parse, isValid, getMonth, getYear } from 'date-fns'

const expectedHeaders = [
  'make',
  'colour',
  'dateOfManufacture',
  'vin',
  'registrationArea',
] // Expected headers from csv file

function validateHeaders(headers) {
  //compares csv headers with expected headers
  return JSON.stringify(headers) === JSON.stringify(expectedHeaders)
}

function isValidFormat(registrationNumber) {
  //only checks format not area code
  //method to check if reg format is valid

  if (typeof registrationNumber !== 'string') {
    //check if registrationNumber is a string
    return false
  }

  if (registrationNumber.length !== 9) {
    return false
  }

  const registrationPattern = /^[A-Z]{2}\s\d{2}\s[A-HJLNOPQRSTUVWXZ]{3}$/ //regex pattern for valid vehicle reg format
  //how to prevent 00 year appearing, when generating year

  return registrationPattern.test(registrationNumber) //test if reg has correct format
}

//Tests for isValidFormat function:
console.log('CA 12 ABC: ' + isValidFormat('CA 12 ABC')) //returns true
console.log('CA 12 ABI: ' + isValidFormat('CA 12 ABI')) //returns false
console.log('BA 20 ABC: ' + isValidFormat('BA 20 ABC')) //returns true

//00 a valid registration year ?
//Reg plates state from 2000 September (51 plate) to 2049 september (99 plate)

function isValidAreaCode(registration) {
  //check if area code is valid for Swansea, Cardiff, Birmingham
  let areaCode = registration.substring(0, 2)
  const areaCodePattern = /^(C[A-K]|C[L-Z]|B[ABC])/

  return areaCodePattern.test(areaCode) //returns true or false if valid area
}

//Tests for isValidAreaCode Function:
console.log('XY 92 ABC: ' + isValidAreaCode('XY 92 ABC')) //returns false
console.log('CA 22 ABC: ' + isValidAreaCode('CA 22 ABC')) //returns true
console.log('BA 18 ABC: ' + isValidAreaCode('BA 18 ABC')) //returns true

function isRegistrationValid(registration) {
  return isValidFormat(registration) && isValidAreaCode(registration)
}
//Tests for isRegistrationValid function:
console.log('CA 12 ABC: ' + isRegistrationValid('CA 12 ABC')) //returns true
console.log('CA 12 ABY: ' + isRegistrationValid('CA 12 ABY')) //returns false

function isDateValid(date) {
  const parsedDated = parse(date, 'dd/MM/yyyy', new Date())

  return isValid(parsedDated)
}
//Tests for isDateValid:
console.log('15/09/2024: ' + isDateValid('15/09/2024')) // true
console.log('31/02/2024: ' + isDateValid('31/02/2024')) // false
console.log('15/13/2024: ' + isDateValid('15/13/2024')) // false

export {
  validateHeaders,
  isValidFormat,
  isValidAreaCode,
  isRegistrationValid,
  isDateValid,
}
