# Car Registration Generator (post September 2001 Cars)

## Problem

You need to author code which performs the following functions:

1. For each vehicle in the dataset, generate a valid Vehicle Registration Number using the rules defined above.

2. Output the following information: \
   a. Total number of registration numbers generated. \
   b. Total number of registration numbers generated per registration area.

3. Were there any vehicles where the Vehicle Registration Number could not be determined? If so, how many?

# How to solve

- First 2 characters generated based on the city

- The second 2 characters generated based on the year

- Last 3 characters are randomly generated (avoiding invalid characters)

I will use the above to generate a numberplate for each vehicle AND
keep a track of the quantity of numberplates generated (in total and per area)

# Functionality:

- Be able to generate number plate from the information given from the csv file
- Be able to return how many numberplates are generated from a specific city
- Be able to return the number of registrations generated successfully
- Return the number of failed registrations

# Assumptions

The Vin number is tied to a unique vehicle reg, therefore no 2 vehicles are allowed to have the same registration

# City registration area:

Registration Area | First letter Second letter Example
Swansea | C | A ...K| CB
Cardiff | C | L ...Z| CM
Birmingham | B | A B C | BB

- Assumption:
  Only the cities above will have a valid registration created, as this fits the rule in this specification.

# Age Identifier:

The age identifier is determined from a vehicle’s date of manufacture.

## Date range Rule Example

March - Aug Year without century 01-05-2024 = 24
Sep - Feb Year without century + 50 01-09-2024 = 74

# Letters:

The following letters cannot appear: [ I, K, M, Y ]

Examples:

Valid: [ ABC, FGH, … ]
Invalid: [ ABI, YDF, … ]

# How to run

- Clone the repository
- type 'Npm install' into terminal
- type 'Npm start' or 'node registration.js' into terminal
- registration numbers will be generated from vehicles.csv file, 100 random registrations will be shown and the total number of vehicles generated and the number of vehicles from each city.

- npm test will run the test suite
