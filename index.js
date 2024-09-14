import fs from 'fs'

let path = './vehicles.csv' //path to csv file

const vehicles = [] //list of vehicles

fs.createReadStream(path).pipe(csv()) //csv is a function from the csv parser module
    .on('data', (row) => { vehicles.push(row) }) //each row is pushed to vehicles array as it is read 
    .on('error', function (error) { console.log("error has occurred whilst parsing: ", error) }) //catch errors
    .on('end', function () { console.log("csv successfully parsed", console.log(vehicles)) }, //log vehicles array when parsing is complete
    
    //generate vehicle registration
        generateVehicleRegistration(vehicles));
        //where do i store the vehicle reg? -> sql server?



const getAreaReg(registrationArea) { 

    return regArea
}


const getYearReg(dateOfManufacture){ 
    return regYear
}

const getRandomCharacters(){ 
    return randomChars
}


const generateVehicleRegistration(vehicles) { 
    return registration
}