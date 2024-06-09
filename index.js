// Seleccionar el elemento body del DOM
let body = document.querySelector("body");
let container = document.createElement("div");
container.setAttribute("id", "container");
body.appendChild(container);

//Create element count Human
let countHumanDom = document.createElement("div");
let countHuman = 0;
countHumanDom.setAttribute("id", "countHuman");
countHumanDom.textContent = `Tu ${countHuman}`;
container.appendChild(countHumanDom);

//Create element count Computer
let countComputerDom = document.createElement("div");
let countComputer = 0;
countComputerDom.textContent = `Machine ${countComputer}`;
countComputerDom.setAttribute("id", "countComputer");
container.appendChild(countComputerDom);

// function for computer choice random
const getComputerChoice = () => {
  let randomN = Math.floor(Math.random() * 3) + 1;

  // random choice about a random number between 1 and 3
  let result;
  switch (randomN) {
    case 1:
      result = "Rock";
      break;
    case 2:
      result = "Paper";
      break;
    case 3:
      result = "Scissers";
      break;
    default:
      result = "Unknown";
  }
  return result;
};

// Function for create buttons and take choice human choice
const createButtons = () => {
  let choices = ["Rock", "Paper", "Scissers"];
  for (let i = 0; i < choices.length; i++) {
    let button = document.createElement("button");
    button.textContent = choices[i];
    button.setAttribute("id", `${choices[i]}`);
    button.addEventListener("click", (e) => {
      let humanChoice = e.target.id;
      let computerChoice = getComputerChoice();
      playRound(humanChoice, computerChoice, countHuman);
      });
      
    container.appendChild(button);
  }
};

const winHuman = (humanChoice, computerChoice) => {
  if (
    (humanChoice === "Rock" && computerChoice === "Scissers") ||
    (humanChoice === "Paper" && computerChoice === "Rock") ||
    (humanChoice === "Scissers" && computerChoice === "Paper")
  ) {
    return true;
  }
};

// Function reset all params and  dom
const reset = (result, countHuman) => {
  let reset = document.createElement("button");
  reset.textContent = "Reset";
  reset.addEventListener("click", (e) => {
    countHumanDom.textContent = `Tu ${0}`;
    countComputerDom.textContent = `Tu ${0}`;
    countHuman === 5 ? result.remove() : result.remove();
  });

  countHuman === 5 ? result.appendChild(reset) : result.appendChild(reset);
};
//Funcion count win human
const countHumanFunc = (humanChoice, computerChoice) => {
  countHuman++;
  countHumanDom.textContent = `Tu ${countHuman}`;
  if (countHuman === 5) {
    let win = document.createElement("div");
    win.setAttribute("id", "result");
    win.textContent = `Your choice is ${humanChoice} and 
        my choice is ${computerChoice}
        FOR THIS TIME YOU WIN
      `;
    container.appendChild(win);
    reset(win, countHuman);
  }
};

// Function count win Computer
const countComputerFunc = (humanChoice, computerChoice) => {
  countComputer++;
  countComputerDom.textContent = `Machine ${countComputer}`;
  if (countComputer === 5) {
    let lose = document.createElement("div");
    lose.setAttribute("id", "result");
    lose.textContent = `Your choice is ${humanChoice} and 
      my choice is ${computerChoice}
      FOR THIS TIME YOU LOSE ^^
    `;
    container.appendChild(lose);
    reset(lose, countComputer);
  }
};

// function for play a round 
const playRound = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    console.log("We have been tied");
  } else if (winHuman(humanChoice, computerChoice)) {
    countHumanFunc(humanChoice, computerChoice);
  } else {
    countComputerFunc(humanChoice, computerChoice);
  }
};

// Crear los botones al cargar la página
createButtons();
