var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var footer = document.querySelector("footer");
var dropDown = document.querySelector(".dropdown-toggle");
var wrongAudio = new Audio("WRONG.mp3");
var correctAudio = new Audio("CORRECT1.mp3");
var clickAudio = new Audio("CLICK1.mp3");
var roundTracker = document.querySelector("#roundtracker");
var numInput = document.querySelector("input");
var roundCompleted = document.querySelector("#roundcompleted");
var scoreTracker = document.querySelector("#scoretracker");
var winnningScore = 3;
var roundOver = 0;
var totalScore = 0;
var gameOver = false;

init();

function init(){
    //mode buttons
    setupModeButtons();  
    setupSquares();
    reset();
}

dropDown.addEventListener("click", function(){
    clickAudio.play();
});

function setupModeButtons(){
    for(var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy 🤪" ? numSquares = 3: numSquares = 6; 
            clickAudio.play();
            reset();
            //figure how many squares to show
            //pick new colors
            //pick a new pickedColor
            //update change to reflect changes
        })
    };
}

function setupSquares(){
    if(!gameOver){
        for(var i = 0; i<squares.length; i++){
            //color click
            squares[i].addEventListener("click", function(){
               //grab the color
               var clickedColor = this.style.backgroundColor;
               //compare the color 
               if (clickedColor === pickedColor) {
                   messageDisplay.textContent = "Correct! 🥳";
                   changeColor(clickedColor);
                   h1.style.backgroundColor = clickedColor;
                   footer.style.backgroundColor = clickedColor;
                   correctAudio.play();
                    roundOver++;
                    roundCompleted.textContent = roundOver;
                    totalScore+=10;
                    scoreTracker.textContent = totalScore;
                    if(roundOver === winnningScore){
                        alert("Game Over!" + "\n\nTotal Rounds Played: " + roundOver + "\n\nTotal Score: " + totalScore);
                        roundOver = 0;
                        roundCompleted.textContent = roundOver;
                        totalScore = 0;
                        scoreTracker.textContent = totalScore;
                        gameOver = true;
                    }  
                    reset();
               } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "InCorrect! 🥺";
                totalScore-=2;
                scoreTracker.textContent = totalScore;
                wrongAudio.play();
               }
            });
        };
    } 
}

function reset(){
    colors = randomColorGenerator(numSquares);
    //pick a new randow color form array
    pickedColor = pickColor();
    //change colorDispaly to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares 
    for(var i = 0; i<squares.length; i++){
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];  
        } else {
           squares[i].style.display = "none";  
        }     
    }
    h1.style.backgroundColor = "steelblue";
    footer.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors 🧐"
    clickAudio.play();
}

// easyBtn.addEventListener("click", function(){
//      hardBtn.classList.remove("selected");   
//      easyBtn.classList.add("selected"); 
//      numSquares = 3;
//      colors = randomColorGenerator(numSquares);
//      pickedColor = pickColor();
//      colorDisplay.textContent = pickedColor;
//      for(var i=0; i<squares.length; i++){
//          if(colors[i]){
//              squares[i].style.backgroundColor = colors[i];
//          } else {
//              squares[i].style.display = "none";
//          }
//      } 
//  });
// hardBtn.addEventListener("click", function(){
//      hardBtn.classList.add("selected");   
//      easyBtn.classList.remove("selected");
//      numSquares = 6;
//      colors = randomColorGenerator(numSquares);
//      pickedColor = pickColor();
//      colorDisplay.textContent = pickedColor;
//      for(var i=0; i<squares.length; i++){
//          squares[i].style.backgroundColor = colors[i];
//          squares[i].style.display = "block";
//      }       
// });

resetButton.addEventListener("click", function(){
    reset();
});

function changeColor(color){
    //loop through square
    for(var i = 0; i<squares.length; i++){
        //change each sqaure color
        squares[i].style.backgroundColor = color;
    }
};

function pickColor(){
   var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

function randomColorGenerator(num){
    //make a array
    var arr = [];
    //repeat num time
    for(var i = 0; i<num; i++){
        //get random color and push into arr
        arr.push(randomColor());
    };
    //return that array
    return arr;
};

function randomColor(){
    //pick red, green and blue color from 0-255
     var r = Math.floor(Math.random() * 256);
     var g = Math.floor(Math.random() * 256);
     var b  = Math.floor(Math.random() * 256);
     //rgb(r, g, b);
     return "rgb(" + r + ", " + g + ", " + b + ")";
};

numInput.addEventListener("change", function(){
    if(this.value < 0){
        alert("Enter valid number");
    }
    else{
        roundTracker.textContent = this.value;
        winnningScore = Number(numInput.value);
        reset();
    }
})