// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory Function to Produce Paequor samples en masse
const pAequorFactory = (specimenNum, dnaBasesArray) => {
  return {
    specimenNum,
    dnaBasesArray,

    get dnsBasesArray () {return dnaBasesArray},
    get specimenNum () {return specimenNum},

    mutate() {
      // Select random Index of Arr and random new Base
      // Search for new Base until finds different base from previous one in location of index
      // Replace and return 
      const randBaseIndex = Math.floor(Math.random()*dnaBasesArray.length);
      let newBase = returnRandBase();

      while (this.dnaBasesArray[randBaseIndex] == newBase) {newBase = returnRandBase()}

      this.dnaBasesArray[randBaseIndex] = newBase;

      return this.dnaBasesArray
      },

    compareDNA(otherPaequorObj) {
      // Iterates bases aray and looks for bases the objects compared have in common
      // In Common means same Base and same position in Bases Arr
      let inCommonBases = 0;

      for (let i = 0; i < this.dnaBasesArray.length; i++) {
        if (this.dnsBasesArray[i] == otherPaequorObj.dnaBasesArray[i]) {
          inCommonBases += 1
        }
      }
      console.log(`Specimen ${this.specimenNum} and Specimen ${otherPaequorObj.specimenNum} have ${inCommonBases / this.dnaBasesArray.length * 100}% DNA in common.`)
      return inCommonBases;
    },

    willLikelySurvive() {
      let amountOfC = 0;
      let amountOfG = 0;

      for (let i = 0; i < this.dnaBasesArray.length; i++) {
        if (this.dnaBasesArray[i] == 'C') {amountOfC += 1}
        else if (this.dnaBasesArray[i] == 'G') {amountOfG += 1}
      }

      let percentageC = amountOfC / this.dnaBasesArray.length * 100;
      let percentageG = amountOfG / this.dnaBasesArray.length * 100;

      if (percentageC >= 60 || percentageG > 60) {return true}
      return false
    }
  }
}


// ##### RUN PROGRAM #####

const survivingSpecimen = []
let pAequorCounter = 1;

while (survivingSpecimen.length < 30) {
  let newSpecimen = pAequorFactory(pAequorCounter, mockUpStrand());

  if (newSpecimen.willLikelySurvive) {survivingSpecimen.push(newSpecimen)};

  pAequorCounter++;
}

console.log(survivingSpecimen)

// Produce a Specimen for Testing
/*
const firstSpecimen = mockUpStrand();
console.log(firstSpecimen)
*/

/* ##### STUFF FOR TESTING #####
const firstSample = pAequorFactory(3, [ 'G', 'A', 'T', 'T', 'C', 'C', 'T', 'G', 'A', 'G', 'T', 'G', 'C', 'A', 'A' ]);
const secondSample = pAequorFactory(4, [ 'T', 'C', 'T', 'T', 'G', 'C', 'T', 'G', 'G', 'A', 'G', 'A', 'C', 'T', 'C' ])
const thirdSample = pAequorFactory(5, [ 'G', 'G', 'G', 'G', 'G', 'G', 'C', 'G', 'G', 'A', 'G', 'A', 'C', 'T', 'C' ])

console.log(firstSample.dnsBasesArray)
console.log(secondSample.dnsBasesArray)
console.log('----------------------')
firstSample.compareDNA(secondSample);
console.log('----------------------')
console.log(thirdSample.willLikelySurvive())
*/