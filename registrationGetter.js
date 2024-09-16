import { isValidAreaCode } from './registrationValidator.js'

//counters
let successfulRegistrations = 0
let failedRegistrations = 0
let areaRegistrations = {
  birmingham: 0,
  cardiff: 0,
  swansea: 0,
}

function getSuccessfulRegistrations() {
  //returns number of successful registrations
  return successfulRegistrations
}

function getAreaRegistrations(area) {
  //returns a specific area's registration count
  return areaRegistrations[area.toLowerCase()] || 0 //returns area registration amount or 0 if area does not exist
}

function getAllAreaRegistrations() {
  //returns all area registration
  return areaRegistrations
}

function getFailedRegistrations() {
  //returns number of failed registrations/number of vehicles that couldn't have a registration assigned
  return failedRegistrations
}

function addRegistration(area) {
  //adds to registration area count if area is valid
  const normalizedArea = area.toLowerCase() //make lowercase
  if (areaRegistrations.hasOwnProperty(normalizedArea)) {
    areaRegistrations[normalizedArea] += 1 //increment area registration count and successful registration count
    successfulRegistrations += 1
  } else {
    console.error(`Failed to add registration for unknown area: ${area}`)
    failedRegistrations++
  }
}

function addFailedRegistrations() {
  //increments failed registration count
  failedRegistrations++
}

function totalRegistrationCount() {
  //returns total registration attempts
  return successfulRegistrations + failedRegistrations
}

function getYearFromReg(registration) {
  //returns the year of manufacture from the registration
  //registration is a string
  //returns year from registration
  const year = parseInt(registration.substring(3, 5))
  return year >= 50 ? 2000 + year - 50 : 2000 + year
}

function getRegistrationArea(registration) {
  //returns registration area from car registration
  const area = registration.substring(0, 2)
  if (isValidAreaCode(area)) {
    if (area.match(/^C[A-K]/)) return 'Swansea'
    if (area.match(/^C[L-Z]/)) return 'Cardiff'
    if (area.match(/^B[ABC]/)) return 'Birmingham'
    // More if statements if you are adding more cities in the future
  }
  return 'Invalid area code'
}

function getVehicleInfo(vin, vehicleArray) {
  //input vin  and array containing vehicle objects
  // vin is a string
  if (vehicleArray.length === 0) {
    return 'error: registrations have not been generated yet'
  } else {
    for (let i = 0; i < vehicleArray.length; i++) {
      if (vehicleArray[i].vin === vin) {
        return vehicleArray[i]
      }
    }
    return 'Vehicle not found'
  }
}

function getVehicleInfoFromReg(reg, vehicleArray) {
  //input registration and array containing vehicle objects
  // reg is a string
  if (vehicleArray.length === 0) {
    return 'error: registrations have not been generated yet'
  } else {
    for (let i = 0; i < vehicleArray.length; i++) {
      if (vehicleArray[i].registration === reg) {
        return vehicleArray[i]
      }
    }
    return 'Vehicle not found'
  }
}

// Dummy array with vehicle objects
let dummyArray = [
  {
    vin: '432198765',
    make: 'Toyota',
    colour: 'Red',
    dateOfManufacture: '24/02/2010',
    registrationArea: 'Swansea',
    registration: 'CA 10 ABC',
  },
  {
    vin: '987654321',
    make: 'Honda',
    colour: 'Blue',
    dateOfManufacture: '15/11/2019',
    registrationArea: 'Cardiff',
    registration: 'CZ 69 ABC',
  },
  {
    vin: '567891234',
    make: 'Ford',
    colour: 'Black',
    dateOfManufacture: '10/03/2021',
    registrationArea: 'Birmingham',
    registration: 'BA 21 ABC',
  },
  {
    vin: '123456789',
    make: 'Nissan',
    colour: 'White',
    dateOfManufacture: '05/08/2018',
    registrationArea: 'Birmingham',
  },
]

// Test the getVehicleInfo function with a valid VIN
console.log(getVehicleInfo('123456789', dummyArray))
// Output: { vin: '123456789', make: 'Nissan', colour: 'White', dateOfManufacture: '05/08/2018', registrationArea: 'Birmingham' }

// Test the getVehicleInfo function with an invalid VIN
console.log(getVehicleInfo('111111111', dummyArray))
// Output: Vehicle not found

// Test with an empty array
console.log(getVehicleInfo('123456789', []))
// Output: error: registrations have not been generated yet

//Testing VehicleInfoFromReg function

console.log(getVehicleInfoFromReg('CA 10 ABC', dummyArray))
// Output: { vin: '432198765', make: 'Toyota', colour: 'Red', dateOfManufacture: '24/02/2010', registrationArea: 'Swansea', registration: 'CA 10 ABC' }

console.log(getVehicleInfoFromReg('CZ 69 ABC', dummyArray))
// Output: { vin: '987654321', make: 'Honda', colour: 'Blue', dateOfManufacture: '15/11/2019', registrationArea: 'Cardiff', registration: 'CZ 69 ABC' }

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
