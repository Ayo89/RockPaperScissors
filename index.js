// Start
let userName;
let body = document.querySelector("body");
body.setAttribute("id", "centerDiv");

//START PLAY ------>
let startContainer = document.createElement("div");
startContainer.setAttribute("id", "startContainer");
body.appendChild(startContainer);
let inputStart = document.createElement("input");
let labelStart = document.createElement("label");
let buttonStart = document.createElement("button");
// <-------
labelStart.textContent = "Write your name: ";
buttonStart.textContent = "PLAY";
startContainer.appendChild(labelStart);
startContainer.appendChild(inputStart);
startContainer.appendChild(buttonStart);
inputStart.addEventListener("input", (e) => {
  userName = e.target.value;
  userName = userName.toUpperCase();
});

//START
buttonStart.addEventListener("click", (e) => {
  if (userName && userName.trim() !== "") {
    startGame();
  }
});
inputStart.focus();
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buttonStart.click();
  }
});
let startGame = () => {
  body.removeAttribute("id", "centerDiv");
  startContainer.remove();

  // Seleccionar el elemento body del DOM
  let container = document.createElement("div");
  container.setAttribute("id", "container");
  body.appendChild(container);

  //wrapper
  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  container.appendChild(wrapper);

  //Header
  let header = document.createElement("header");
  header.setAttribute("id", "header");
  wrapper.appendChild(header);
  //Container buttons
  contentButtons = document.createElement("div");
  contentButtons.setAttribute("id", "contentButtons");
  container.appendChild(contentButtons);

  //Header Wrapper
  let countContainer = document.createElement("div");
  let countContainerClone1 = countContainer.cloneNode(true);
  countContainerClone1.setAttribute("id", "countHuman");

  let countContainerClone2 = countContainer.cloneNode(true);
  countContainerClone2.setAttribute("id", "countComputer");

  header.appendChild(countContainerClone1);
  header.appendChild(countContainerClone2);

  //Create element count Human
  let countHumanDom = document.createElement("span");
  let countHuman = 0;
  countHumanDom.textContent = `${userName} ${countHuman}`;
  countContainerClone1.appendChild(countHumanDom);

  //Create element count Computer
  let countComputerDom = document.createElement("span");
  let countComputer = 0;
  countComputerDom.textContent = `MACHINE ${countComputer}`;
  countContainerClone2.appendChild(countComputerDom);

  //Create fire count
  let fireDiv = document.createElement("div");
  let fireClone;
  fireDiv.setAttribute("id", "fire");
  let childsHeader = header.children;
  Array.from(childsHeader).forEach((child, index) => {
    fireClone = fireDiv.cloneNode(true);
    child.appendChild(fireClone);
  });
  let fire1 = document.querySelectorAll("#fire")[0];
  //Animation burn
  const burn = (fire) => {
    fire.classList.add("burn");
    setTimeout(() => {
      fire.classList.remove("burn");
    }, 2000);
  };
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
  // Function reset all params and  dom
  const reset = (result) => {
    let reset = document.createElement("button");
    reset.textContent = "PLAY AGAIN";
    reset.addEventListener("click", () => {
      countHuman = 0;
      countComputer = 0;
      countHumanDom.textContent = `${userName} ${0}`;
      countComputerDom.textContent = `MACHINE ${0}`;
      countHuman === 5 ? result.remove() : result.remove();
      startGame();
    });
    body.removeAttribute("centerDiv");
    countHuman === 5 ? result.appendChild(reset) : result.appendChild(reset);
  };

  const msgResult = (humanChoice, computerChoice, result) => {
    setTimeout(() => {
      let containerResult = document.createElement("div");
      let textResult = document.createElement("p");
      textResult.textContent = `${userName} CHOICE  ${humanChoice} AND 
      MACHINE ${computerChoice}
      FOR THIS TIME YOU ${result}
      `;
      containerResult.appendChild(textResult);
      body.setAttribute("id", "centerDiv");
      containerResult.setAttribute("id", "startContainer");
      body.appendChild(containerResult);
      container.remove();

      reset(containerResult);
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
      container.offsetWidth -
      imgMachineRight -
      parseInt(imgMachineStyles.width);

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

  //Funcion count win human
  const countFunc = (humanChoice, computerChoice, result) => {
    if (result === "human") {
      countHuman++;
      burn(fire1);
    } else {
      countComputer++;
      burn(fireClone);
    }
    countHumanDom.textContent = `${userName} ${countHuman}`;
    countComputerDom.textContent = `MACHINE ${countComputer}`;
    if (countHuman === 5) {
      msgResult(humanChoice, computerChoice, "WIN");
    } else if (countComputer === 5) {
      msgResult(humanChoice, computerChoice, "LOSE");
    }
  };

  // Function count win Computer

  // function for play a round
  const playRound = (humanChoice, computerChoice) => {
    if (humanChoice === computerChoice) {
      msgRound("EMPATE");
    } else if (winHuman(humanChoice, computerChoice)) {
      countFunc(humanChoice, computerChoice, "human");
      //msg win round
      msgRound("Win");
    } else {
      countFunc(humanChoice, computerChoice, "machine");
      msgRound("Lose");
    }
  };
  // Crear los botones al cargar la página
  createButtons();
};
