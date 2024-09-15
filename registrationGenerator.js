import fs from 'fs'
import { parse, isValid, getMonth, getYear } from 'date-fns'
import csv from 'csv-parser'
import { isValidAreaCode, isDateValid } from './registrationValidator.js'
import { validateHeaders } from './registrationValidator.js'

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
      this.destroy() // Stop further processing if headers are invalid
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
    console.log(vehicles) //log vehicles array when parsing is complete
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

function generateVehicleRegistration(vehicles) {
  //takes in array of objects containing vehicle data

  //for loop that iterates in the array. uses the dateOfManufacture to generate the year of the reg
  // and the registrationArea to generate the area code of the reg
  // and then generates 3 random chars using generateRandomCharacter()
  // to generate the reg and adds this into the object
  //then moves to the next objects in the array does repeats this

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i]
    if (isDateValid(vehicle.dateOfManufacture)) {
      let registration = ''
      let areaCode = vehicles[i].registrationArea
      let year = generateYearFromDateOfManufacture(
        vehicles[i].dateOfManufacture
      )
      let randomChars = generateRandomCharacters()

      registration = areaCode + ' ' + year + ' ' + randomChars

      vehicles[i].registration = registration
    }
  }

  return vehicles
}
