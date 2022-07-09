// ##### TEST DATA #######

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// Batch-array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// An Object to maintain the credit Card companies and their invalid Credit Cards
let creditCardCompanies = {
  3: {
    fullName: 'Amex (American Express)',
    invalidCreditCardCount: 0,
    invalidCreditCardNums: []
  },
  4: {
    fullName: 'Visa',
    invalidCreditCardCount: 0,
    invalidCreditCardNums: []
  },
  5: {
    fullName: 'Mastercard',
    invalidCreditCardCount: 0,
    invalidCreditCardNums: []
  },
  6: {
    fullName: 'Discover',
    invalidCreditCardCount: 0,
    invalidCreditCardNums: []
  },
  0: {
    fullName: 'Unknown Credit Card Supplier',
    invalidCreditCardCount: 0,
    invalidCreditCardNums: []
  },
}

// ##### FUNCTIONALITY #####

// Takes a credit card num in form of an array and applies Luhn Algorithm to check if its valid
// => Returns a Boolean
// Starts with num to the right of arr
// > This is the control digit, which is automatically added to sum (on declaration)
// > Then every other num - beginning with the second from the right - is doubled
// > If the double number is greater than 9, 9 is subtracted
// > Finally, if summed up array modulo 10 is 0, true is returned > Credit Card Num is valid
function validateCred(cardNumArr) {
  let sum = cardNumArr[cardNumArr.length - 1];
  let secondNum = true;

  for(i = cardNumArr.length - 2; i >= 0; i--) {

    if (secondNum) {
      doubledNum = cardNumArr[i] * 2;

      if (doubledNum > 9) {doubledNum -= 9}; 
      sum += doubledNum;
      secondNum = false;
    } 
    
    else {
      sum += cardNumArr[i];
      secondNum = true;
    }
  }
  
  if (sum % 10 == 0) {
    return true
  } else {
    return false
  }
}

// Iterates batch-array of credit card nums and returns new array with the invalid ones
function findInvalidCards(nestedCardsArray){
  let invalidCards = []

  for (let i = 0; i < nestedCardsArray.length; i++) {
    if (validateCred(nestedCardsArray[i]) === false) {
      invalidCards.push(nestedCardsArray[i]);
    }
  }
  return invalidCards
} 

// Iterates batch array
// > adds invalid credit card nums to the respective supplier
// > increments the respective supplier's count of faulty credit card nums
function idInvalidCardCompanies(nestedCardsArray) {
 for (let i = 0; i < nestedCardsArray.length; i++) {
   if (validateCred(nestedCardsArray[i]) === false) {
     if (creditCardCompanies.hasOwnProperty(nestedCardsArray[i][0])) {
       incrementInvalidCreditCardCount (nestedCardsArray[i][0], creditCardCompanies);
       addInvalidCreditCardNum (nestedCardsArray[i][0], creditCardCompanies, nestedCardsArray[i])
     }
   }
 }
}

// Print out Information regarding Suppliers and their fault Credit Card Numbers
function printCardSupplierInfo (companies) {
  for (supplier in companies) {
    console.log(`--- ` + companies[supplier].fullName + ` ---`);
    console.log(`Invalid Credit Card Numbers: ` + companies[supplier].invalidCreditCardCount);
    
    if (companies[supplier].invalidCreditCardCount > 0) {
        console.log(`The Invalid Numbers are:`)
        console.log(companies[supplier].invalidCreditCardNums)
    }

    console.log(`##########################################################`)
  }
}

// ##### HELPER METHODS #####

// Helper to provide Array of Credit Card Company IDs
function cardCompIDs(obj) {
  return Object.keys(creditCardCompanies)
}

// Helper to increment the amount of invalid credit card nums a supplier has
function incrementInvalidCreditCardCount (id, companiesArr) {
  companiesArr[id].invalidCreditCardCount += 1
}

// Helper to add an invalid credit card num to a suppliers list of invalids
function addInvalidCreditCardNum (id, companiesArr, cardNum) {
  companiesArr[id].invalidCreditCardNums.unshift(cardNum)
}


// ##### RUN PROGRAM #####

idInvalidCardCompanies(batch)
printCardSupplierInfo(creditCardCompanies)