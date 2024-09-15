import fs from 'fs'
import csv from 'csv-parser'
import {
  validateHeaders,
  isDateValid,
  isAreaValid,
} from './registrationValidator.js'
import {
  getAllAreaRegistrations,
  getFailedRegistrations,
  getSuccessfulRegistrations,
  addFailedRegistrations,
  addRegistration,
  getRegistrationArea,
} from './RegistrationGetter.js'

const path = './vehicles.csv' // Path to CSV file
const vehicles = [] // List of vehicles

fs.createReadStream(path)
  .pipe(csv())
  .on('headers', (headers) => {
    if (!validateHeaders(headers)) {
      console.error(
        'Invalid CSV headers! Expected:',
        expectedHeaders,
        'Please reupload correct file'
      )
      this.destroy() // Stop further processing if headers are invalid
    }
  })
  .on('data', (row) => {
    vehicles.push(row) // Push each row to vehicles array
  })
  .on('error', function (error) {
    console.error('Error occurred whilst parsing:', error) // Catch errors
  })
  .on('end', function () {
    console.log('CSV successfully parsed')
    generateVehicleRegistration(vehicles) // Generate vehicle registration
  })

function generateAreaCode(city) {
  const cityNormalized = city.toLowerCase()
  switch (cityNormalized) {
    case 'swansea':
      return generateRandomLetter('C', 'A', 'K')
    case 'cardiff':
      return generateRandomLetter('C', 'L', 'Z')
    case 'birmingham':
      return generateRandomLetter('B', 'A', 'C')
    default:
      return 'city not added yet'
  }
}

function generateRandomLetter(firstLetter, startLetter, endLetter) {
  const startCharCode = startLetter.charCodeAt(0)
  const endCharCode = endLetter.charCodeAt(0)
  const secondLetterCharCode =
    Math.floor(Math.random() * (endCharCode - startCharCode + 1)) +
    startCharCode
  return firstLetter + String.fromCharCode(secondLetterCharCode)
}

function generateYearFromDateOfManufacture(dateOfManufacture) {
  // dd/mm/yyyy
  // Extract the year from the date
  const year = dateOfManufacture.substring(6, 10)

  // Convert the year to a number
  const yearNumber = parseInt(year)

  // Determine the age identifier based on the month
  const month = dateOfManufacture.substring(3, 5)
  if (month >= '03' && month <= '08') {
    return yearNumber % 100
  } else {
    return (yearNumber % 100) + 50
  }
}

function generateRandomCharacters() {
  let randomChars = ''
  const validLetters = 'ABCDEFGHJLNOPQRSTUVWXZ'
  for (let i = 0; i < 3; i++) {
    randomChars += validLetters.charAt(
      Math.floor(Math.random() * validLetters.length)
    )
  }
  return randomChars
}

function generateVehicleRegistration(vehicles) {
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i]

    const area = vehicle.registrationArea //getting the area
    const year = generateYearFromDateOfManufacture(vehicle.dateOfManufacture)
    const randomChars = generateRandomCharacters()

    if (isAreaValid(area)) {
      //generate area code
      const areaCode = generateAreaCode(area)
      const registration = `${areaCode} ${year} ${randomChars}`
      vehicle.registration = registration
      addRegistration(vehicle.registrationArea)
    } else {
      //console.error(
      //  `Failed registration due to area code: ${JSON.stringify(vehicle)}`
      // )
      addFailedRegistrations()
    }
  }

  // Log the results
  console.log(
    'TOTAL NUMBER OF VEHICLES REGISTERED:',
    getSuccessfulRegistrations()
  )
  console.log('REGISTRATIONS FROM EACH AREA:', getAllAreaRegistrations())
  console.log('FAILED REGISTRATIONS:', getFailedRegistrations())

  //console.log a random reg

  for (let i = 0; i < 100; i++) {
    console.log(
      vehicles[Math.floor(Math.random() * vehicles.length)].registration
    )
  }
}
