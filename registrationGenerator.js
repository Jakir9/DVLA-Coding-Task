import fs from 'fs'
import { parse } from 'date-fns'
import csv from 'csv-parser'
import {
  isValidAreaCode,
  isDateValid,
  validateHeaders,
} from './registrationValidator.js'
import {
  getAllAreaRegistrations,
  getFailedRegistrations,
  getSuccessfulRegistrations,
  addFailedRegistrations,
  addRegistration,
  getRegistrationArea,
} from './RegistrationGetter.js'

let path = './vehicles.csv' //path to csv file

const vehicles = [] //list of vehicles

fs.createReadStream(path)
  .pipe(csv()) //csv is a function from the csv parser module
  .on('headers', (headers) => {
    // Validate the headers when they are read
    if (!validateHeaders(headers)) {
      console.log(
        'Invalid CSV headers! Expected:',
        expectedHeaders + ' Please reupload correct file'
      )
      destroy() // Stop further processing if headers are invalid
    }
  })
  .on('data', (row) => {
    vehicles.push(row) //each row is pushed to vehicles array as it is read
  })
  .on('error', function (error) {
    console.log('error has occurred whilst parsing: ', error) //catch errors
  })
  .on('end', function () {
    console.log('CSV successfully parsed')
    generateVehicleRegistration(vehicles) //generate vehicle registration
  })
//where do i store the vehicle reg? -> sql server?

function generateYearFromDateOfManufacture(dateOfManufacture) {
  // DD/MM/YYYY
  // Get month and compare it, if >= 9(september) then + 50
  // Parse the date in DD/MM/YYYY format

  const parsedDate = parse(dateOfManufacture, 'dd/MM/yyyy', new Date())

  // Extract the month and year
  const month = getMonth(parsedDate) + 1 // Months start from 0, hence + 1
  const year = getYear(parsedDate)

  // Adjust the year if the month is September or later
  const adjustedYear = month >= 9 ? year + 50 : year

  return adjustedYear.toString()
}

function generateRandomCharacters() {
  //generate 3 random characters for reg

  let randomChars = ''
  const validLetters = 'ABCDEFGHJLNOPQRSTUVWXZ'
  for (let i = 0; i < 3; i++) {
    randomChars += validLetters.charAt(
      Math.floor(Math.random() * validLetters.length)
    )
  }
  return randomChars
}

//takes in array of objects containing vehicle data

//for loop that iterates in the array. uses the dateOfManufacture to generate the year of the reg
// and the registrationArea to generate the area code of the reg
// and then generates 3 random chars using generateRandomCharacter()
// to generate the reg and adds this into the object
//then moves to the next objects in the array does repeats this
function generateVehicleRegistration(vehicles) {
  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i]
    console.log('Processing vehicle:', vehicle)

    if (
      isDateValid(vehicle.dateOfManufacture) &&
      isValidAreaCode(vehicle.registrationArea)
    ) {
      let areaCode = vehicle.registrationArea
      let year = generateYearFromDateOfManufacture(vehicle.dateOfManufacture)
      let randomChars = generateRandomCharacters()

      let registration = `${areaCode} ${year} ${randomChars}`
      vehicle.registration = registration

      let registrationArea = getRegistrationArea(registration)
      console.log('Generated registration:', registration)
      console.log('Registration area:', registrationArea)

      if (registrationArea === 'Invalid area code') {
        addFailedRegistrations()
        console.log('Failed registration due to invalid area code. \n')
      } else {
        addRegistration(registrationArea)
      }
    } else {
      addFailedRegistrations()
      console.log('Failed registration due to invalid date or area code.')
    }
  }

  // Log the results
  console.log(
    'TOTAL NUMBER OF VEHICLES REGISTERED: ',
    getSuccessfulRegistrations()
  )
  console.log('REGISTRATION FROM EACH AREA: ', getAllAreaRegistrations())
  console.log('FAILED REGISTRATIONS: ', getFailedRegistrations())
  console.log('VEHICLE DATA: ', vehicles)

  return vehicles
}
