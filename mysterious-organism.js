
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory Function
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    //mutate DNA
    mutate() {
      for (let i = 0; i < this.dna.length; i++) {
        let newBase = returnRandBase();
        if (this.dna[i] != newBase) {
          this.dna[i] = newBase;
        } else {
          this.dna[i] = returnRandBase();
        }
      }
      return this.dna;
    },
    //compare DNA
    compareDNA(obj) {
      const dnaOne = this.dna;
      const dnaTwo = obj.dna;
      //counters
      let fullCounter = 0;
      let sameCounter = 0;

      //compare
      for (let i = 0; i < dnaOne.length; i++) {
        for (let j = 0; j < dnaTwo.length; j++) {
          //need to compare at same index
          if (i === 0) {
            if (dnaOne[i + j] === dnaTwo[j]) {
              sameCounter += 1;
            }
          }
        }
        fullCounter += 1;
      }
      let percent = Math.floor((sameCounter / fullCounter) * 100);
      return `Specimen #1 and Specimen #2 have ${percent}% DNA in common`;
    },
    //likely to survive method
    willLikelySurvive() {
      let fullCount = 0;
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          counter += 1;
        } else {
          counter += 0;
        }
        fullCount += 1;
      }
      if ((counter / fullCount) * 100 >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

let dnaWillSurvive = [];
let i = 0;
while (dnaWillSurvive.length < 30) {
  let specimen = pAequorFactory(i, mockUpStrand());
  if (specimen.willLikelySurvive() == true) {
    dnaWillSurvive.push(specimen);
    i += 1;
  }
}
