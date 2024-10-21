const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const logo = document.querySelector(".logoMario");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const scoreElement = document.querySelector(".points");

let score = 0;
let isGameRunning = false;

audioStart = new Audio("song/audio_theme.mp3");
audioGameOver = new Audio("song/audio_gameover.mp3");

const updateScore = () => {
  score++;
  scoreElement.innerText = score;
};

const startGame = () => {
  pipe.classList.add("pipe-animation");
  start.style.display = "none";
  logo.style.display = "none";

  isGameRunning = true;

  audioStart.play();
};

const restartGame = () => {
  gameOver.style.display = "none";
  pipe.style.left = "";
  pipe.style.right = "0";
  mario.src = "img/mario.gif";
  mario.style.width = "150px";
  mario.style.bottom = "0";
  start.style.display = "none";
  score = 0;

  audioGameOver.pause();
  audioGameOver.currentTime = 0;
  audioStart.play();
  audioStart.currentTime = 0;
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 800);
};

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace("px", " ");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove(".pipe-animation");
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove(".jump");
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "img/game-over.png";
      mario.style.width = "80px";
      mario.style.marginLeft = "50px";

      function stopAudioStart() {
        audioStart.pause();
      }
      stopAudioStart();

      audioGameOver.play();

      function stopAudio() {
        audioGameOver.pause();
      }
      setTimeout(stopAudio, 7000);

      gameOver.style.display = "flex";

      clearInterval(loop);
    }
    if (isGameRunning) updateScore();
    else score = 0;
  }, 10);
};

loop();

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