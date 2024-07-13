// Seleccionar el elemento body del DOM
let body = document.querySelector("body");
let container = document.createElement("div");
container.setAttribute("id", "container");
body.appendChild(container);
//wrapper
let wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");
container.appendChild(wrapper);
//Container buttons
contentButtons = document.createElement("div");
contentButtons.setAttribute("id", "contentButtons");
container.appendChild(contentButtons);

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

//Disabled buttons
const disabledButtons = (choices) => {
  for (let i = 0; i < choices.length; i++) {
    document.getElementById(`${choices[i]}`).classList.add("disabled");
    setTimeout(() => {
      document.getElementById(`${choices[i]}`).classList.remove("disabled");
    }, 3000);
  }
};

//function message round
const msgRound = (msg) => {
  let msgWin = document.createElement("div");
  msgWin.setAttribute("id", "msg-round");
  if (msg === "EMPATE") {
    msgWin.style.color = "blue";
    msgWin.textContent = "EMPATE";
  } else {
    let span = document.createElement("span");
    span.textContent = msg;

    msgWin.appendChild(document.createTextNode("You "));
    msg === "Win" ? (span.style.color = "green") : (span.style.color = "red");
    msgWin.appendChild(span);

    msgWin.appendChild(document.createTextNode(" this round"));
  }
  container.insertBefore(msgWin, contentButtons);

  setTimeout(() => {
    msgWin.remove();
  }, 3000);
};

const changeDirectionImg = (image) => {
  image.style.transform = "scaleX(-1)";
};

//Collisions
const collisions = (imgHuman, imgMachine) => {
  let imgHumanStyles = getComputedStyle(imgHuman);
  let imgMachineStyles = getComputedStyle(imgMachine);

  let imgHumanLeft = parseInt(imgHumanStyles.left);
  let imgHumanRight = imgHumanLeft + parseInt(imgHumanStyles.width);

  let imgMachineRight = parseInt(imgMachineStyles.right);
  let imgMachineLeft =
    container.offsetWidth - imgMachineRight - parseInt(imgMachineStyles.width);

  return imgHumanRight >= imgMachineLeft;
};

const moveImage = (humanImage, machineImage) => {
  let count = 0;
  let leftStart = parseInt(container.offsetWidth / 2 / 3) - 50;
  let rightStart = parseInt(container.offsetWidth / 2 / 3) - 50;
  humanImage.style.left = `${leftStart}px`;
  machineImage.style.right = `${rightStart}px`;
  let imgIntervalId = setInterval(() => {
    count += 20;
    humanImage.style.left = `${leftStart + count}px`;
    machineImage.style.right = `${rightStart + count}px`;
    if (collisions(humanImage, machineImage)) {
      clearInterval(imgIntervalId);
    }
  }, 100);
};

//animation images

const animationImages = (player) => {
  let imgs = {
    paper: "./papel.webp",
    rock: "./piedra.jpg",
    scissers: "./tijera.avif",
  };
  let img = document.createElement("div");
  if (player.player === "human") {
    img.classList.add(`${player.player}`);
  } else if (player.player === "machine") {
    img.classList.add(`${player.player}`);
  }
  img.setAttribute("id", `${player.choice}`);
  img.style.backgroundImage = `url(${imgs[player.choice]})`;
  if (
    (player.choice === "rock" && player.player == "human") ||
    (player.player === "machine" && player.choice === "paper") ||
    (player.player === "machine" && player.choice === "scissers")
  ) {
    changeDirectionImg(img);
  }
  container.appendChild(img);

  if (player.choice) {
    img.style.display = "block";

    //remove img div
    setTimeout(() => {
      img.remove();
    }, 3000);

    let humanImg = document.getElementsByClassName("human")[0];
    let machineImg = document.getElementsByClassName("machine")[0];

    // Check if images exist before proceeding
    if (!humanImg || !machineImg) return;
    console.log(player.player == "human");
    console.log(player);

    //move controls animation
    moveImage(humanImg, machineImg);
  }
};

// function for computer choice random
const getComputerChoice = () => {
  let randomN = Math.floor(Math.random() * 3) + 1;

  // random choice about a random number between 1 and 3
  let result;
  switch (randomN) {
    case 1:
      result = "rock";
      break;
    case 2:
      result = "paper";
      break;
    case 3:
      result = "scissers";
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
      let humanChoice = e.target.id.toLowerCase();
      let human = {
        player: "human",
        choice: humanChoice,
      };
      disabledButtons(choices);

      //Animation img Humanchoice
      animationImages(human);
      //Finish animation
      let computerChoice = getComputerChoice();
      let machine = {
        player: "machine",
        choice: computerChoice,
      };
      //Animation computer choice
      animationImages(machine);
      playRound(humanChoice, computerChoice);
    });

    contentButtons.appendChild(button);
  }
};

const winHuman = (humanChoice, computerChoice) => {
  if (
    (humanChoice === "rock" && computerChoice === "scissers") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissers" && computerChoice === "paper")
  ) {
    return true;
  }
};

// Function reset all params and  dom
const reset = (result) => {
  let reset = document.createElement("button");
  reset.textContent = "Reset";
  reset.addEventListener("click", (e) => {
    countHuman = 0;
    countComputer = 0;
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
    reset(win);
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

    reset(lose);
  }
};

// function for play a round
const playRound = (humanChoice, computerChoice) => {
  if (humanChoice === computerChoice) {
    msgRound("EMPATE");
  } else if (winHuman(humanChoice, computerChoice)) {
    countHumanFunc(humanChoice, computerChoice);

    //msg win round
    msgRound("Win");
  } else {
    countComputerFunc(humanChoice, computerChoice);
    msgRound("Lose");
  }
};
// Crear los botones al cargar la página
createButtons();
