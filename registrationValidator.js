const expectedHeaders = [
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
    typeof registrationNumber !== 'string' ||
    registrationNumber.length !== 9
  ) {
    return false
  }
  const registrationPattern = /^[A-Z]{2}\s\d{2}\s[A-HJLNOPQRSTUVWXZ]{3}$/
  return registrationPattern.test(registrationNumber)
}

// Validate area code format
function isValidAreaCode(areaCode) {
  const areaCodePattern = /^(C[A-K]|C[L-Z]|B[ABC])/
  return areaCodePattern.test(areaCode)
}

// Validate area
function isAreaValid(area) {
  const validAreas = ['cardiff', 'swansea', 'birmingham']
  return validAreas.includes(area.toLowerCase())
}

// Validate date format
function isDateValid(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  const match = dateString.match(regex)
  if (!match) return false

  const day = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const year = parseInt(match[3], 10)

  // Check for valid day and month ranges
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  // Additional checks for specific months and leap years could be added here
  return true
}

export {
  validateHeaders,
  isValidFormat,
  isValidAreaCode,
  isAreaValid,
  isDateValid,
  expectedHeaders,
}
