let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
function nextSequence() {
    level ++;
    $("#level-title").text("level " + level);
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100). fadeOut(100). fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
  let buttonPressed =  $("." + currentColour);
  buttonPressed.addClass("pressed");
  setTimeout(function(){
    buttonPressed.removeClass("pressed");
  },80);
}

$(document).keydown(function(){
    if(!started) {
    nextSequence();
    $("#level-title").text("level " + level);
    started = true;
    }
})

function checkAnswer(currentLevel) {
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length) {
        setTimeout(function(){
            nextSequence();
        },1000);
    }
   } else {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    });
    $("#level-title").text("Game Over, Press Any Key to Restart");
    starOver();
   }
}

function starOver () {
    level = 0;
    gamePattern = [];
    started = false;
}