var colors = ['red', 'blue', 'green', 'yellow'];
var pattern = [];
var userPattern = [];

var isTheGameStarted = false;
var round = 0;



//   EVENT MANAGEMENT   ///////////////////////////////////////////////////////////////////////////

// Detect if a key has been pressed to start the game
$(document).keypress(function() {
    if (!isTheGameStarted) {
        clickAndKeypressCallback();
    }
});

$(document).on('click','#the-title',function(){
    if (!isTheGameStarted) {
        titleAnimation();
        clickAndKeypressCallback();
        
    }
});

function clickAndKeypressCallback() {
    $('#game-status').text('PLAYING').css("color", "var(--green)");
    $('#instruction').text('Memorize the pattern and reproduce it by <CLICKING> or <TAPPING> on the right colors');
    $('#round').text('Round ' + round);
    nextStep();
    isTheGameStarted = true;
}

function titleAnimation(){
    $('#the-title').addClass('shaker'); 
    setTimeout(function(){
        $('#the-title').removeClass('shaker'); 
    },300);
}

$('.button').click(function() {
    var userClickedColor = $(this).attr('id');
    userPattern.push(userClickedColor);
    playSound(userClickedColor);
    animateButton(userClickedColor, 300);
    // call the function to check the user choice getting the round by checking the lenght of the pattern array
    checkUserChoice(userPattern.length-1);
});



//   FUNCTIONS   //////////////////////////////////////////////////////////////////////////////////

function checkUserChoice(currentRound) {
    // check if the user choice is the correct answer (same as the game pattern)
    if (pattern[currentRound] === userPattern[currentRound]) {
        //console.log('success');
        // if the user guessed the most recent step, then check if it is the pattern's last one.
        if (userPattern.length === pattern.length) {
            // proceed by calling nextStep() after a short timeout.
            setTimeout(function () {
                nextStep();
            }, 1000);
        }
      } else {
        playSound('wrong');
        $('#game-status').text('GAME OVER!!!').css("color", "var(--red)");
        $('#instruction').text('Press <ANY KEY> or <TAP THE TITLE> to <RESTART>.');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 300);
        restart();
      }
}

function nextStep() {
    userPattern = [];
    round++;

    $('#round').text('Round ' + round);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber]
    pattern.push(randomColor);
    
    animateButton(randomColor, 600);
    playSound(randomColor);
}

function animateButton(color, time) {
    $('#' + color).addClass(color + '-clicked');
    setTimeout(function(){
        $('#' + color).removeClass(color + '-clicked');
    }, time);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.volume = 0.1;
    audio.play();
}

function restart() {
    round = 0;
    pattern = [];
    isTheGameStarted = false;
}