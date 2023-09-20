let userClickedPattern = [];
let gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

let start = false;
let level = 0;

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnwser(userClickedPattern.length - 1);
});

const checkAnwser = (currentLvl) => {
  if (gamePattern[currentLvl] === userClickedPattern[currentLvl]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  console.log(gamePattern);
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).click(function () {
    $(this).addClass("pressed");

    setTimeout(() => {
      $(this).removeClass("pressed");
    }, 100);
  });
};

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  start = false;
  console.log(gamePattern);
};
