const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const logo = document.querySelector(".logoMario");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const scoreElement = document.querySelector(".points");
const tutorial = document.querySelector(".tutorial");
const game = document.querySelector(".game");

let score = 0;
let isGameRunning = false;
let scoreInterval; 
let gameLoop; 

const audioStart = new Audio("song/track.mp3");
const audioGameOver = new Audio("song/audio_gameover.mp3");

const showTutorial = () => {
  tutorial.style.display = "flex"; 
  game.style.display = "none";
};

const updateScore = () => {
  score++;
  scoreElement.innerText = score;

  if (score >= 100 && score <= 250) {
    game.style.backgroundImage = "url('https://www.pixelstalk.net/wp-content/uploads/2016/07/8-Bit-Images-HD.png')"; 
    game.style.transition = "1s ease-in-out"
  }
  else{
    game.style.background = "linear-gradient(#2e7c9b, #e0f6ff)"; 
  }
};

const startGame = () => {
  game.style.display = "flex";
  tutorial.style.display = "none"; 
  pipe.classList.add("pipe-animation");
  start.style.display = "none";
  logo.style.display = "none";

  isGameRunning = true;
  score = 0; 
  scoreElement.innerText = score; 

  audioStart.play();

  scoreInterval = setInterval(updateScore, 100); 

  loop(); 
};

const restartGame = () => { 
  gameOver.style.display = "none";
  pipe.style.left = "";
  pipe.style.right = "0";
  mario.src = "img/girl.gif";
  mario.style.width = "200px";
  mario.style.bottom = "-58px";
  start.style.display = "none";
  
  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  startGame(); 
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 800);
};

const loop = () => {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace("px", " ");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      clearInterval(gameLoop); 

      pipe.classList.remove(".pipe-animation");
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove(".jump");
      mario.style.bottom = `${marioPosition}px`;

      mario.style.width = "80px";
      mario.style.marginLeft = "50px";

      audioStart.pause();
      audioGameOver.play();

      setTimeout(() => {
        audioGameOver.pause();
      }, 7000);

      gameOver.style.display = "flex";
      isGameRunning = false; 

      clearInterval(scoreInterval); 
    }

  }, 10);
};

loop(); 
window.onload = showTutorial;

document.addEventListener("keypress", (e) => {
  const tecla = e.key;
  if (tecla === " ") {
    jump();
  }
});

document.addEventListener("touchstart", (e) => {
  if (e.touches.length) {
    jump();
  }
});

document.addEventListener("keypress", (e) => {
  const tecla = e.key;
  if (tecla === "Enter") {
    startGame();
  }
});

document.querySelector(".restart").addEventListener("click", restartGame);
