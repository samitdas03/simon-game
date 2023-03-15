// Step 2
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;


$("body").on("keypress", function() {
    if(level === 0) {
        nextSequence();
    }
});

function nextSequence() {
    let randomNumber = Math.trunc(4*Math.random());
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

function playSound(sound) {
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    let targetId = "#" + currentColor;
    $(targetId).addClass("pressed");
    setTimeout(function() {
        $(targetId).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    let last = userClickedPattern.length-1;
    if(userClickedPattern[last] === gamePattern[last]) {
        if(last === level-1) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
        startOver();
    }
}

function gameOver() {
    let audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer();
});


