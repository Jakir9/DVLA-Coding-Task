# DVLA-Coding-Task

My solution to the DVLA coding task:

You will need to author code which performs the following functions:

1. For each vehicle in the dataset, generate a valid Vehicle Registration Number using the rules defined above.

2. Output the following information:
   a. Total number of registration numbers generated.
   b. Total number of registration numbers generated per registration area.

3. Were there any vehicles where the Vehicle Registration Number could not be determined? If so, how many?

# How to solve

First 2 characters generated based on the city

2nd 2 characters generated based on the year

Last 3 characters are randomly generated?

Use the above to generate numberplate for each vehicle AND
keep a track of the quantity of numberplates generated.

Be able to count how many numberplates are generated from a specific city

The Vin number is tied to a unique vehicle reg.

No 2 vehicles are allowed to have the same registration

Keep track of the vin of vehicles were the number plate could not be created. And why couldn't they be created

London
Birmingham
Swansea
Cardiff

Registration Area | First letter Second letter Example
Swansea | C | A ...K| CB
Cardiff | C | L ...Z| CM
Birmingham | B | A B C | BB

Age Identifier:

The age identifier is determined from a vehicle’s date of manufacture.

Date range Rule Example
March - Aug Year without century 01-05-2024 = 24
Sep - Feb Year without century + 50 01-09-2024 = 74

Random Letters:

The following letters cannot appear: [ I, K, M, Y ]

Examples:

Valid: [ ABC, FGH, … ]
Invalid: [ ABI, YDF, … ]
