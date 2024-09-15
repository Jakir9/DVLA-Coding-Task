import fs from 'fs'

let path = './vehicles.csv' //path to csv file

const vehicles = [] //list of vehicles

fs.createReadStream(path)
  .pipe(csv()) //csv is a function from the csv parser module
  .on('data', (row) => {
    vehicles.push(row)
  }) //each row is pushed to vehicles array as it is read
  .on('error', function (error) {
    console.log('error has occurred whilst parsing: ', error)
  }) //catch errors
  .on(
    'end',
    function () {
      console.log('csv successfully parsed', console.log(vehicles))
    }, //log vehicles array when parsing is complete

    //generate vehicle registration
    generateVehicleRegistration(vehicles)
  )
//where do i store the vehicle reg? -> sql server?

function isValidFormat(registrationNumber) {
  //only checks format not area code
  //method to check if reg format is valid

  if (typeof registrationNumber !== 'string') {
    //check if registrationNumber is a string
    return false
  }

  const registrationPattern = /^[A-Z]{2}\s\d{2}\s[A-HJLNOPQRSTUVWXZ]{3}$/ //regex pattern for valid vehicle reg format

  return registrationPattern.test(registrationNumber) //test if reg has correct format
}

//Testing isValidFormat function
console.log('CA 12 ABC: ' + isValidFormat('CA 12 ABC')) //returns true
console.log('CA 12 ABI: ' + isValidFormat('CA 12 ABI')) //returns false
console.log('BA 20 ABC: ' + isValidFormat('BA 20 ABC')) //returns true
console.log('BA 20 ABC: ' + isValidFormat('BA 20 ABC')) //returns true

//00 a valid registration year ?
//Reg plates state from 2000 September (51 plate) to 2049 september (99 plate)

function isValidAreaCode(registration) {
  //check if area code is valid for Swansea, Cardiff or Birmingham
  let areaCode = registration.substring(0, 2)
  const areaCodePattern = /^(C[A-K]|C[L-Z]|B[ABC])/

  return areaCodePattern.test(areaCode) //returns true or false if valid area
}
//testing isValidAreaCode function
console.log('XY 92 ABC: ' + isValidAreaCode('XY 92 ABC')) //returns false
console.log('CA 22 ABC: ' + isValidAreaCode('CA 22 ABC')) //returns true
console.log('BA 18 ABC: ' + isValidAreaCode('BA 18 ABC')) //returns true

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
    } else {
      return 'Invalid area code'
    }
  }
}

console.log(getRegistrationArea('BC 19 DBD')) //returns 'Birmingham'
console.log(getRegistrationArea('CK 19 BBD')) //returns 'Swansea'
console.log(getRegistrationArea('CA 19 ABB')) //returns 'Swansea'
console.log(getRegistrationArea('CZ 19 ABC')) //returns 'Cardiff'

function getYearReg(dateOfManufacture) {
  return regYear
}

function generateRandomCharacters() {
  return randomChars
}

function generateVehicleRegistration(vehicles) {
  return registration
}
