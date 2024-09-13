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
