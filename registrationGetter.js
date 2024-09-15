import { isValidAreaCode } from './registrationValidator.js'

let successfulRegistrations = 0
let failedRegistrations = 0
let areaRegistrations = {
  birmingham: 0,
  cardiff: 0,
  swansea: 0,
}

function getSuccessfulRegistrations() {
  return successfulRegistrations
}

function getAreaRegistrations(area) {
  return areaRegistrations[area.toLowerCase()] || 0
}

function getAllAreaRegistrations() {
  return areaRegistrations
}

function getFailedRegistrations() {
  return failedRegistrations
}

function addRegistration(area) {
  const normalizedArea = area.toLowerCase()
  if (areaRegistrations.hasOwnProperty(normalizedArea)) {
    areaRegistrations[normalizedArea] += 1
    successfulRegistrations += 1
  } else {
    console.error(`Failed to add registration for unknown area: ${area}`)
    failedRegistrations++
  }
}

function addFailedRegistrations() {
  failedRegistrations++
}

function totalRegistrationCount() {
  return successfulRegistrations + failedRegistrations
}

function getYearFromReg(registration) {
  const year = parseInt(registration.substring(3, 5), 10)
  return year >= 50 ? 2000 + year - 50 : 2000 + year
}

function getRegistrationArea(registration) {
  const area = registration.substring(0, 2)
  if (isValidAreaCode(area)) {
    if (area.match(/^C[A-K]/)) return 'Swansea'
    if (area.match(/^C[L-Z]/)) return 'Cardiff'
    if (area.match(/^B[ABC]/)) return 'Birmingham'
    // More if statements if you are adding more cities in the future
  }
  return 'Invalid area code'
}

export {
  getSuccessfulRegistrations,
  getAreaRegistrations,
  getAllAreaRegistrations,
  getFailedRegistrations,
  addRegistration,
  addFailedRegistrations,
  totalRegistrationCount,
  getYearFromReg,
  getRegistrationArea,
}
