let body = document.querySelector("body");
let button;
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
let humanChoice;
let choices = ["Rock", "Paper", "Scicssers"];
for (let i = 0; i < choices.length; i++) {
  button = document.createElement("button");
  button.textContent = choices[i];
  button.setAttribute('id', `${choices[i]}`)
  body.appendChild(button);
  console.log(button)
    button.addEventListener('click', (e) => {
      humanChoice = e.target.id
    console.log(humanChoice)
    })
}
console.log(humanChoice)
//Generate human select
getHumanChoice = () => {
  let result = "";
  let correct = true;
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
  console.log(result)
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
