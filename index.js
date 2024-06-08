// Seleccionar el elemento body del DOM
let body = document.querySelector("body");
let container = document.createElement("div");
container.setAttribute("id", "container");
body.appendChild(container);

let countHumanDom = document.createElement("div");
let countHuman = 0;
countHumanDom.textContent = `Tu ${countHuman}`;

countHumanDom.setAttribute("id", "countHuman");
container.appendChild(countHumanDom);
// Función para generar una elección aleatoria para la computadora
const getComputerChoice = () => {
  // Generar número aleatorio entre 1 y 3
  let randomN = Math.floor(Math.random() * 3) + 1;

  // Elección aleatoria basada en el número generado
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

// Función para crear botones para la elección humana
const createButtons = () => {
  let choices = ["Rock", "Paper", "Scissers"];
  for (let i = 0; i < choices.length; i++) {
    let button = document.createElement("button");
    button.textContent = choices[i];
    button.setAttribute("id", `${choices[i]}`);
    container.appendChild(button);
    console.log(button);

    button.addEventListener("click", (e) => {
      let humanChoice = e.target.id;
      let computerChoice = getComputerChoice();
      console.log(humanChoice);
      console.log(computerChoice);
      playRound(humanChoice, computerChoice);
    });
  }
};

// Función para jugar una ronda de piedra, papel o tijera
const playRound = (humanChoice, computerChoice) => {
  let countComputer = 0;

  if (humanChoice === computerChoice) {
    console.log("We have been tied");
  } else if (
    (humanChoice === "Rock" && computerChoice === "Scissers") ||
    (humanChoice === "Paper" && computerChoice === "Rock") ||
    (humanChoice === "Scissers" && computerChoice === "Paper")
  ) {
    countHuman++;
    countHumanDom.textContent = `Tu ${countHuman}`;

    console.log(countHuman);
    if (countHuman === 5) {
      let win = document.createElement("div");
      win.setAttribute("id", "win");
      win.textContent = `Your choice is ${humanChoice} and 
        my choice is ${computerChoice}
        FOR THIS TIME YOU WIN
      `;
      container.appendChild(win);
      let reset = document.createElement("button");
      reset.textContent = "Reset";
      reset.addEventListener("click", (e) => {
        countHuman = 0;
        countHumanDom.textContent = `Tu ${0}`
        win.remove();
      });
      win.appendChild(reset);
    }
  } else {
    console.log(`Your choice is ${humanChoice} and 
      my choice is ${computerChoice}
      FOR THIS TIME YOU LOSE ^^
    `);
  }
};

// Crear los botones al cargar la página
createButtons();
