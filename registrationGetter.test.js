import { getVehicleInfo, getVehicleInfoFromReg } from './RegistrationGetter.js'

// Dummy array with vehicle objects
const dummyArray = [
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

// Tests for getVehicleInfo function
test('getVehicleInfo with a valid VIN', () => {
  expect(getVehicleInfo('123456789', dummyArray)).toEqual({
    vin: '123456789',
    make: 'Nissan',
    colour: 'White',
    dateOfManufacture: '05/08/2018',
    registrationArea: 'Birmingham',
  })
})

test('getVehicleInfo with an invalid VIN', () => {
  expect(getVehicleInfo('111111111', dummyArray)).toBe('Vehicle not found')
})

test('getVehicleInfo with an empty array', () => {
  expect(getVehicleInfo('123456789', [])).toBe(
    'error: registrations have not been generated yet'
  )
})

// Tests for getVehicleInfoFromReg function
test('getVehicleInfoFromReg with a valid registration', () => {
  expect(getVehicleInfoFromReg('CA 10 ABC', dummyArray)).toEqual({
    vin: '432198765',
    make: 'Toyota',
    colour: 'Red',
    dateOfManufacture: '24/02/2010',
    registrationArea: 'Swansea',
    registration: 'CA 10 ABC',
  })
})

test('getVehicleInfoFromReg with another valid registration', () => {
  expect(getVehicleInfoFromReg('CZ 69 ABC', dummyArray)).toEqual({
    vin: '987654321',
    make: 'Honda',
    colour: 'Blue',
    dateOfManufacture: '15/11/2019',
    registrationArea: 'Cardiff',
    registration: 'CZ 69 ABC',
  })
})
