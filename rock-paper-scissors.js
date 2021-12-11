const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
  
    if (userInput == "rock" || userInput == "paper" || userInput == "scissors") {
      return userInput;
    } else {
        console.log("Error!")
      };
    };
  
  const getComputerChoice = () => {
    randomNum = Math.floor(Math.random() * 3)
  
    switch (randomNum) {
      case 0:
        return "rock";
      case 1:
       return "paper";
      case 2:
        return "scissors";
    }
  }
  
  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return "The game was a tie!"
    }
  
    if (userChoice === "rock") {
      if (computerChoice === "paper") {
        return "Computer won!";
      } else {
        return "Human won!";
      }
      }
    
    if (userChoice === "paper") {
      if (computerChoice === "scissors") {
        return "Computer won!";
      } else {
        return "Human won!";
      }
      }
  
    if (userChoice === "scissors") {
      if (computerChoice === "rock") {
        return "Computer won!";
      } else {
        return "Human won!";
      }
    }
    }
  
  function playGame() {
    let userChoice = getUserChoice("Rock");
      console.log(userChoice);
    let computerChoice = getComputerChoice();
      console.log(computerChoice);
  
      console.log(determineWinner(userChoice, computerChoice));
  }
  
  playGame();