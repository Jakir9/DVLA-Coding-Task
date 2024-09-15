import { isValidAreaCode } from './registrationValidator.js'

let successfulRegistrations = 0
let failedRegistrations = 0
let areaRegistrations = [{ Birmingham: 0 }, { Cardiff: 0 }, { Swansea: 0 }] //need to push objects to this with the area and increment the total.

function getSuccessfulRegistrations() {
  //returns total successful registrations
  return successfulRegistrations
}

function getAreaRegistrations(area) {
  //returns number of registrations for a specific area
  if (typeof area != 'string') {
    return console.log('must be a string')
  }
  return area + ': ' + areaRegistrations.area
}

function getAllAreaRegistrations() {
  //returns array with all the areas and the number of registrations
  return areaRegistrations
}

function getFailedRegistrations() {
  //returns number of failed registrations
  return failedRegistrations
}

function addRegistration(area) {
  // Find the area object in the array
  const areaObj = areaRegistrations.find((obj) => obj.hasOwnProperty(area))

  if (areaObj) {
    areaObj[area]++ // Increment the count for the found area
    successfulRegistrations++
  } else {
    // If the area is not found, increment failed registrations
    failedRegistrations++
  }
}

// function removeRegistrations(area) {
//   if (areaRegistrations.hasOwnProperty(area)) {
//     areaRegistrations[area]--
//     successfulRegistrations--
//   }
// }

function addFailedRegistrations() {
  failedRegistrations++
}
function totalRegistrationCount() {
  return successfulRegistrations + failedRegistrations
}

function getYearFromReg(registration) {
  const year = registration.substring(3, 5)

  if (year.substring(0, 1) >= '5') {
    return 2000 + parseInt(year) + 50
  } else {
    return 2000 + parseInt(year)
  }
}

// Tests for getYearReg function:
console.log(getYearFromReg('CA 74 ABC')) // Output: 2024 (Sep-Feb)
console.log(getYearFromReg('CA 12 ABC')) // Output: 2012 (March-August)

function getRegistrationArea(registration) {
  //Returns the area of the car reg
  //C[A-K] is Swansea
  //C[L-Z] is Cardiff
  //B[ABC] is Birmingham
  const area = registration.substring(0, 2)

  if (isValidAreaCode(registration)) {
    if (area.match(/C[A-K]/)) {
      return 'Swansea'
    } else if (area.match(/C[L-Z]/)) {
      return 'Cardiff'
    } else if (area.match(/B[ABC]/)) {
      return 'Birmingham'
    }
  }
  {
    return 'Invalid area code'
  }
}
//Tests for getRegistrationArea function:
console.log(getRegistrationArea('BC 19 DBD')) //returns 'Birmingham'
console.log(getRegistrationArea('CK 19 BBD')) //returns 'Swansea'
console.log(getRegistrationArea('CA 19 ABB')) //returns 'Swansea'
console.log(getRegistrationArea('CZ 19 ABC')) //returns 'Cardiff'

export {
  getAreaRegistrations,
  getAllAreaRegistrations,
  getFailedRegistrations,
  getSuccessfulRegistrations,
  addRegistration,
  //removeRegistrations,
  totalRegistrationCount,
  getYearFromReg,
  getRegistrationArea,
  addFailedRegistrations,
}
