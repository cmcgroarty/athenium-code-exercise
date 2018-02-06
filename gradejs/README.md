# gradejs

## Requirements
have [nodejs](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/getting-started/installing-node) installed

## Using the grading function

### 1. Clone the repository and install with npm
```bash
$ git clone https://github.com/iammarix/athenium-code-exercise.git
$ cd athenium-code-exercise/gradejs
$ npm install
```

### 2. Run prewritten tests
```bash
$ npm run test

  gradejs
    #gradeScores()
      ✓ should gracefully error when scores is null
      ✓ should gracefully error when scores is undefined
      ✓ should gracefully error when scores.length < 1
      ✓ should not error when scores.length < 5
      ✓ should return an object of arrays
      ✓ should assign scores from problem with grades from problem
      ✓ should handle scores.length that is not multiple of 5
      ✓ should assign identical scores with the same grade
      ✓ should assign 1 score array an A


  9 passing (32ms)
```

### 3. Run on custom arrays
```bash
$ npm run grade

A: 91,91,92,99
B: 82,83,85,89
C: 78,78,79,80
D: 74,75,76,77
F: 20,43,55,62

# edit scores array in index.js to run on custom scores
$ nano index.js
```




