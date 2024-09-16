import fs from 'fs'
import csv from 'csv-parser'
import { validateHeaders, isAreaValid, isCSV } from './registrationValidator.js'
import {
  getAllAreaRegistrations,
  getFailedRegistrations,
  getSuccessfulRegistrations,
  addFailedRegistrations,
  addRegistration,
  getRegistrationArea,
  getYearFromReg,
} from './RegistrationGetter.js'

const path = './vehicles.csv' // Path to CSV file
const vehicles = [] // List of vehicles

// Validate if the file is a CSV
if (!isCSV(path)) {
  console.error('Invalid file type! Only .csv files are allowed.')
  process.exit(1) // Exit the program if the file isn't a CSV
} else {
  // Process the CSV file if it's valid
  fs.createReadStream(path) // Reads the csv file - not async but it is non-blocking and reads the file in chunks
    .pipe(csv())
    .on('headers', (headers) => {
      if (!validateHeaders(headers)) {
        console
          .error(
            'Invalid CSV headers! Expected:',
            expectedHeaders,
            'Please reupload correct file'
          )
          .destroy() // Stop further processing if headers are invalid
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
}

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
    //if between march and august
    return yearNumber % 100 // returns the remainder
  } else {
    //between september and december so return year + 50
    return (yearNumber % 100) + 50
  }
}

function generateRandomCharacters() {
  //Generates the 3 random letters at end of car reg
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
  //input is the vehicles array
  for (let i = 0; i < vehicles.length; i++) {
    //loop through the vehicles array
    let vehicle = vehicles[i]

    const area = vehicle.registrationArea //get registration area
    const year = generateYearFromDateOfManufacture(vehicle.dateOfManufacture) //get the year component for car reg
    const randomChars = generateRandomCharacters() //generate random characters for car reg

    if (isAreaValid(area)) {
      //generate area code
      const areaCode = generateAreaCode(area)
      const registration = `${areaCode} ${year} ${randomChars}` //generate registration
      vehicle.registration = registration //add registration to vehicle object
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

  //console.log random regs
  printRandomRegistrations()
}

function printRandomRegistrations() {
  //prints 100 random valid registrations
  let i = 0
  while (i < 100) {
    let randomReg =
      vehicles[Math.floor(Math.random() * vehicles.length)].registration

    if (randomReg !== undefined) {
      // some registrations are undefined as their city is not valid
      console.log(
        randomReg +
          ' : ' +
          getRegistrationArea(randomReg) +
          ' : ' +
          getYearFromReg(randomReg)
      )
      i++
    }
  }
}
