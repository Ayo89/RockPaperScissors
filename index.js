//Generate random number for random choice rock paper scissers
getComputerChoice = () => {
  //generate random number
  let randomN = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  //Random choice
  switch (randomN) {
    case 1:
      result = "Rock";
      break;
    case 2:
      result = "Paper";
      break;
    case 3:
      result = "Scissers";
  }
  return result;
};

//Generate human select
getHumanChoice = () => {
  let result = "";
  let correct = true;
  let humanChoice;
  do {
        humanChoice = parseInt(
          prompt(`
          Introduce un numero:
          1-Rock
          2-Paper
          3-Scissers
          `)
        );
  } while (!(humanChoice >= 1  && humanChoice <= 3))


  switch (humanChoice) {
    case 1:
      result = "Rock";
      break;
    case 2:
      result = "Paper";
      break;
    case 3:
      result = "Scissers";
  }
  return result;
};

playRound = (humanChoice, computerChoice) => {
  if (humanChoice == computerChoice) {
    console.log("We have been tied");
  } else if (
    (humanChoice == "Rock" && computerChoice == "Scissers") ||
    (humanChoice == "Paper" && computerChoice == "Rock") ||
    (humanChoice == "Scissers" && computerChoice == "Paper")
  ) {
    console.log(`Your choice is ${humanChoice} and 
    my choice is ${computerChoice}
    FOR THIS TIME YOU WIN
    `);
  } else {
    console.log(`Your choice is ${humanChoice} and 
    my choice is ${computerChoice}
    FOR THIS TIME YOU LOSE ^^
    `);
  }
};

playRound(getHumanChoice(), getComputerChoice());
