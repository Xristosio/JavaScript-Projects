"use strict";

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

const cssMessage = (css, message) =>
  (document.querySelector(css).textContent = message);

//Check Button
document.querySelector(".check").addEventListener("click", function () {
  const guessit = document.querySelector(".guess").value;
  if (guessit <= 0 || (guessit > 20 && score > 1)) {
    cssMessage(".message", "False input!");
  } else if (guessit == secretNumber && score > 1) {
    cssMessage(".message", "Correct Number!");
    cssMessage(".number", secretNumber);
    document.querySelector("body").style.backgroundColor = "green";
    if (score > highScore) {
      highScore = score;
      cssMessage(".highscore", highScore);
    }
  } else if (guessit > secretNumber && score > 1) {
    cssMessage(".message", "Too high!");
    score--;
    cssMessage(".score", score);
  } else if (guessit < secretNumber && score > 1) {
    cssMessage(".message", "Too Low!");
    score--;
    document.querySelector(".score").textContent = score;
  } else {
    cssMessage(".message", "You Lost!");
    cssMessage(".score", 0);
  }
});

//Again Button
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  cssMessage(".message", "Start guessing...");
  cssMessage(".score", score);
  cssMessage(".number", "?");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
});
