import {
  validateHeaders,
  isValidFormat,
  isValidAreaCode,
  isAreaValid,
  isDateValid,
  expectedHeaders,
  isCSV,
} from './registrationValidator.js'

describe('validateHeaders', () => {
  // Tests for validateHeaders method
  test('should return true for expectedHeaders', () => {
    expect(validateHeaders(expectedHeaders)).toBe(true)
  })

  test('should return false for incorrect headers', () => {
    expect(validateHeaders(['make', 'colour', 'vin', 'registrationArea'])).toBe(
      false
    )
  })

  test('should return false for empty headers', () => {
    expect(validateHeaders([''])).toBe(false)
  })
})

describe('isValidFormat', () => {
  // Tests for isValidFormat method
  test('should return true for valid format AB 12 ABC', () => {
    expect(isValidFormat('AB 12 ABC')).toBe(true)
  })

  test('should return false for invalid format AB 12 ABCD', () => {
    expect(isValidFormat('AB 12 ABCD')).toBe(false)
  })

  test('should return false for invalid format AB 123 ABC', () => {
    expect(isValidFormat('AB 123 ABC')).toBe(false)
  })
})

describe('isValidAreaCode', () => {
  // Tests for isValidAreaCode
  test('should return true for valid area code CA', () => {
    expect(isValidAreaCode('CA')).toBe(true)
  })

  test('should return true for valid area code CB', () => {
    expect(isValidAreaCode('CB')).toBe(true)
  })

  test('should return true for valid area code CC', () => {
    expect(isValidAreaCode('CC')).toBe(true)
  })

  test('should return true for valid area code BA', () => {
    expect(isValidAreaCode('BA')).toBe(true)
  })

  test('should return false for invalid area code BX', () => {
    expect(isValidAreaCode('BX')).toBe(false)
  })

  test('should return false for invalid area code BY', () => {
    expect(isValidAreaCode('BY')).toBe(false)
  })
})

describe('isAreaValid', () => {
  // Tests for isAreaValid
  test('should return true for cardiff', () => {
    expect(isAreaValid('cardiff')).toBe(true)
  })

  test('should return true for Cardiff', () => {
    expect(isAreaValid('Cardiff')).toBe(true)
  })

  test('should return true for birmingham', () => {
    expect(isAreaValid('birmingham')).toBe(true)
  })

  test('should return true for Birmingham', () => {
    expect(isAreaValid('Birmingham')).toBe(true)
  })

  test('should return true for swansea', () => {
    expect(isAreaValid('swansea')).toBe(true)
  })

  test('should return true for Swansea', () => {
    expect(isAreaValid('Swansea')).toBe(true)
  })

  test('should return false for london', () => {
    expect(isAreaValid('london')).toBe(false)
  })

  test('should return false for London', () => {
    expect(isAreaValid('London')).toBe(false)
  })
})

describe('isDateValid', () => {
  // Tests for isDateValid
  test('should return true for 01/01/2021', () => {
    expect(isDateValid('01/01/2021')).toBe(true)
  })

  test('should return false for invalid month 01/13/2021', () => {
    expect(isDateValid('01/13/2021')).toBe(false)
  })

  test('should return false for invalid day 32/01/2021', () => {
    expect(isDateValid('32/01/2021')).toBe(false)
  })

  test('should return true for valid date 01/01/2021', () => {
    expect(isDateValid('01/01/2021')).toBe(true)
  })
})

describe('isCSV', () => {
  // Tests for isCSV method
  test('should return true for vehicles.csv', () => {
    expect(isCSV('vehicles.csv')).toBe(true)
  })

  test('should return false for vehicles.txt', () => {
    expect(isCSV('vehicles.txt')).toBe(false)
  })

  test('should return true for case insensitive data.CSV', () => {
    expect(isCSV('data.CSV')).toBe(true)
  })
})
