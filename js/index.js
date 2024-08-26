"use strict";
const box = document.getElementById("main-content");
function loadPage(webpage) {
  document.scrollingElement.scroll(0, 1);
  fetch(`./Pages/${webpage}.html`)
    .then((response) => response.text())
    .then((html) => {
      box.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

loadPage("game");

const clickSound = new Audio("./assets/sounds/click.mp3");

document.addEventListener("click", () => {
  clickSound.play();
});

const rulesCloseBtn = document.getElementById("closeBtn");
const rulesPopup = document.getElementById("rulesPopup");

rulesCloseBtn.addEventListener("click", () => {
  rulesPopup.classList.add("hidden");
});

const rulesBtn = document.getElementById("rulesBtn");

rulesBtn.addEventListener("click", () => {
  rulesPopup.classList.toggle("hidden");
});

// GAME

const stone = document.getElementById("stone");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");

const computerScore = document.querySelector(".computer-score");
const playerScore = document.querySelector(".player-score");
const nextBtn = document.getElementById("nextBtn");

let computerScoreCount = 0;
let playerScoreCount = 0;

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();

  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "You win!") {
    playerScoreCount++;
    nextBtn.classList.remove("hidden");
  } else if (winner === "Computer wins!") {
    computerScoreCount++;
  }

  updateScores();

  showWinnerScreen(playerChoice, computerChoice, winner);

  saveScores();
}

function getComputerChoice() {
  const choices = ["stone", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "stone" && computerChoice === "scissor") ||
    (playerChoice === "paper" && computerChoice === "stone") ||
    (playerChoice === "scissor" && computerChoice === "paper")
  ) {
    return "You win!";
  } else {
    return "Computer wins!";
  }
}

function updateScores() {
  computerScore.textContent = computerScoreCount;
  playerScore.textContent = playerScoreCount;
}

function saveScores() {
  localStorage.setItem("computerScore", computerScoreCount);
  localStorage.setItem("playerScore", playerScoreCount);
}

function loadScores() {
  computerScoreCount = parseInt(localStorage.getItem("computerScore")) || 0;
  playerScoreCount = parseInt(localStorage.getItem("playerScore")) || 0;
  updateScores();
}

function resetScores() {
  computerScoreCount = 0;
  playerScoreCount = 0;

  updateScores();
  saveScores();
}

function showResetPrompt() {
  const choice = confirm("Do you want to reset the scores?");

  if (choice) {
    resetScores();
  }
}

// function showWinnerScreen(playerChoice, computerChoice, winner) {
//   winnerScreen.classList.remove("hidden");
//   playerSectionImage.src = `./assets/icons/${playerChoice}.svg`;
//   computerSectionImage.src = `./assets/icons/${computerChoice}.svg`;

//   if (winner === "You win!") {
//     winnerMessage.textContent = "YOU WIN";
//   } else if (winner === "Computer wins!") {
//     winnerMessage.textContent = "COMPUTER WINS";
//   } else {
//     winnerMessage.textContent = "IT'S A TIE";
//   }

//   // Show only the selected images
//   playerScissor.style.display = playerChoice === "scissor" ? "block" : "none";
//   playerStone.style.display = playerChoice === "stone" ? "block" : "none";
//   playerPaper.style.display = playerChoice === "paper" ? "block" : "none";
//   computerScissor.style.display =
//     computerChoice === "scissor" ? "block" : "none";
//   computerStone.style.display = computerChoice === "stone" ? "block" : "none";
//   computerPaper.style.display = computerChoice === "paper" ? "block" : "none";
// }

loadScores();
stone.addEventListener("click", () => playGame("stone"));
paper.addEventListener("click", () => playGame("paper"));
scissor.addEventListener("click", () => playGame("scissor"));
const scoreboard = document.getElementById("scoreboard");
scoreboard.addEventListener("click", showResetPrompt);
