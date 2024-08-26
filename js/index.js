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

function showWinnerScreen(playerChoice, computerChoice, winner) {
  console.log(playerChoice, computerChoice, winner);
  const playerWin = document.getElementById("playerWin");
  const computerWin = document.getElementById("computerWin");
  const tied = document.getElementById("tied");

  switch (winner) {
    case "You win!":
      playerWin.classList.remove("hidden");
      computerWin.classList.add("hidden");
      tied.classList.add("hidden");
      break;
    case "Computer wins!":
      playerWin.classList.add("hidden");
      computerWin.classList.remove("hidden");
      tied.classList.add("hidden");
      break;
    case "It's a tie!":
      playerWin.classList.add("hidden");
      computerWin.classList.add("hidden");
      tied.classList.remove("hidden");
      break;
  }

  const playerChooseStone = document.getElementById("playerStone");
  const playerChoosePaper = document.getElementById("playerPaper");
  const playerChooseScissor = document.getElementById("playerScissor");

  const computerChooseStone = document.getElementById("computerStone");
  const computerChoosePaper = document.getElementById("computerPaper");
  const computerChooseScissor = document.getElementById("computerScissor");

  switch (playerChoice) {
    case "stone":
      playerChooseStone.classList.remove("hidden");
      playerChoosePaper.classList.add("hidden");
      playerChooseScissor.classList.add("hidden");
      break;
    case "paper":
      playerChooseStone.classList.add("hidden");
      playerChoosePaper.classList.remove("hidden");
      playerChooseScissor.classList.add("hidden");
      break;
    case "scissor":
      playerChooseStone.classList.add("hidden");
      playerChoosePaper.classList.add("hidden");
      playerChooseScissor.classList.remove("hidden");
      break;
  }

  switch (computerChoice) {
    case "stone":
      computerChooseStone.classList.remove("hidden");
      computerChoosePaper.classList.add("hidden");
      computerChooseScissor.classList.add("hidden");
      break;
    case "paper":
      computerChooseStone.classList.add("hidden");
      computerChoosePaper.classList.remove("hidden");
      computerChooseScissor.classList.add("hidden");
      break;
    case "scissor":
      computerChooseStone.classList.add("hidden");
      computerChoosePaper.classList.add("hidden");
      computerChooseScissor.classList.remove("hidden");
      break;
  }
  const lostSound = new Audio("./assets/sounds/lost.mp3");
  playerChooseStone.classList.remove("winnerAnimation");
  playerChooseScissor.classList.remove("winnerAnimation");
  playerChoosePaper.classList.remove("winnerAnimation");
  computerChooseStone.classList.remove("winnerAnimation");
  computerChooseScissor.classList.remove("winnerAnimation");
  computerChoosePaper.classList.remove("winnerAnimation");
  switch (winner) {
    case "You win!":
      playerChooseStone.classList.add("winnerAnimation");
      playerChooseScissor.classList.add("winnerAnimation");
      playerChoosePaper.classList.add("winnerAnimation");
      break;
    case "Computer wins!":
      lostSound.play();
      computerChooseStone.classList.add("winnerAnimation");
      computerChooseScissor.classList.add("winnerAnimation");
      computerChoosePaper.classList.add("winnerAnimation");
      break;
    case "It's a tie!":
      break;
  }

  toggleGame();
}

loadScores();
stone.addEventListener("click", () => playGame("stone"));
paper.addEventListener("click", () => playGame("paper"));
scissor.addEventListener("click", () => playGame("scissor"));
const scoreboard = document.getElementById("scoreboard");
scoreboard.addEventListener("click", showResetPrompt);

const winnerPlayAgainBtn = document.getElementById("winnerScreenPlayAgain");
const gameDiv = document.getElementById("game");
const winnerDiv = document.getElementById("winnerScreen");

winnerPlayAgainBtn.addEventListener("click", toggleWinnerScreen);

function toggleGame() {
  if (gameDiv.classList.contains("hidden")) {
    gameDiv.classList.remove("hidden");
    winnerDiv.classList.add("hidden");
  } else {
    gameDiv.classList.add("hidden");
    winnerDiv.classList.remove("hidden");
  }
}
function toggleWinnerScreen() {
  if (winnerDiv.classList.contains("hidden")) {
    winnerDiv.classList.remove("hidden");
    gameDiv.classList.add("hidden");
  } else {
    winnerDiv.classList.add("hidden");
    gameDiv.classList.remove("hidden");
  }
  nextBtn.classList.add("hidden");
}
