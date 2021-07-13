const letters = document.querySelector(".main_body_letters_field");
const word = document.querySelector(".main_word");
const resetBtn = document.querySelector(".resetBtn");
const hintBtn = document.querySelector(".hintBtn");
const livesPara = document.querySelector(".lives");
const hintPara = document.querySelector(".hint");

////////// TYMCZASOWE
const GameWords = ["WARSAW", "BERLIN", "MADRID", "LONDON", "EDINBURGH"];
const GameHints = ["The capital of Poland", "The capital of Germany", "The capital of Spain", "The capital of England", "The capital of Scotland"];

let gameWord;
let gameHint;
let winStatus = 0;
let lives;

const lets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function createLetters() {
  for (let i = 0; i < 26; i++) {
    const singleLetter = document.createElement("button");
    singleLetter.classList.add(lets[i]);
    singleLetter.innerHTML = `<div>${lets[i]}</div>`;
    singleLetter.disabled = false;
    singleLetter.addEventListener("click", () => GuessLetter(lets[i]));
    singleLetter.addEventListener("click", function () {
      singleLetter.disabled = true;
    });
    letters.appendChild(singleLetter);
  }
}

function removeLetters() {
  for (let i = 0; i < 26; i++) {
    const last = letters.lastChild;
    letters.removeChild(last);
  }
}

function lettersOff() {
  for (let i = 0; i < 26; i++) {
    document.querySelector(`.${lets[i]}`).disabled = true;
  }
}

function createWord(e) {
  for (let i = 0; i < e.length; i++) {
    const span = document.createElement("span");
    span.textContent = "_";
    span.classList.add(`element${i}`);
    word.appendChild(span);
  }
}

function removeWord(e) {
  for (let i = 0; i < e.length; i++) {
    const last = word.lastChild;
    word.removeChild(last);
  }
}

function GuessLetter(e) {
  if (gameWord.indexOf(e) == -1) {
    lives--;
    showLives(false);
  } else {
    for (let i = 0; i < gameWord.length; i++) {
      if (gameWord[i] == e) {
        document.querySelector(`.element${i}`).textContent = e;
        winStatus++;
      }
    }
    showLives("prawda");
  }
}

function showLives(e) {
  if (winStatus == gameWord.length) {
    livesPara.textContent = "YOU WIN! CONGRATS";
    hintPara.textContent = "";
    lettersOff();
  } else if (lives > 0) {
    livesPara.removeChild(livesPara.lastChild);
  } else {
    livesPara.textContent = "You lose";
    hintPara.textContent = "";
    lettersOff();
  }
  if (e == "prawda" && winStatus > 0) {
    const heartIcon = document.createElement("span");
    heartIcon.classList.add(`fas`, `fa-heart`);
    livesPara.appendChild(heartIcon);
  }
}

function createLives() {
  for (let i = 0; i <= 10; i++) {
    const heartIcon = document.createElement("span");
    heartIcon.classList.add(`fas`, `fa-heart`);
    livesPara.appendChild(heartIcon);
  }
}

function removeLives() {
  while (livesPara.lastChild) {
    livesPara.removeChild(livesPara.lastChild);
  }
}

function startGame() {
  const p = document.createElement("p");
  const random = Math.floor(Math.random() * 5);
  gameWord = GameWords[random];
  gameHint = GameHints[random];
  lives = 10;
  winStatus = 0;
  removeLives();
  createLives();
  showLives();
  createLetters();
  createWord(gameWord);
}

function resetGame() {
  removeWord(gameWord);
  removeLetters();
  startGame();
}

function showHint() {
  hintPara.textContent = `Your hint: ${gameHint}`;
}

resetBtn.addEventListener("click", resetGame);
hintBtn.addEventListener("click", showHint);

startGame();
