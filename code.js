const boardspaces = document.getElementById("boardspace")

let score = 0;
let scores = document.getElementById("score")
let snakeBody = []

let foodpositionX = 13;
let foodpositionY = 4;

let snakeX = 13, snakeY = 13;
let velocityX = 0, velocityY = 0;

let intervalbw = 300; 
gameover = false;


const eat = new Audio('GMSE.mp3');
eat.volume = 0.75;

const song1and2 = new Audio('Song12.mp3')

song1and2.volume = 0.20;

const AudioGO = new Audio('GameOver.mp3')

AudioGO.volume = 0.25;

var apps = 1;
document.addEventListener("keydown",() => {
    if(apps == 1)
    song1and2.play()
    
    apps++;
})


song1and2.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);


const changeFoodPosition = () => {
    foodpositionX = Math.floor(Math.random() * 24) + 1;
    foodpositionY = Math.floor(Math.random() * 24) + 1;
} 

const changeDirection = (e) => {
    console.log(e);
    if((e.key === 'ArrowUp' || e.key ==='w') && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if((e.key === 'ArrowDown' || e.key ==='s') && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if((e.key === 'ArrowLeft' || e.key ==='a') && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if((e.key === 'ArrowRight' || e.key ==='d') && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }



    changeFoodPositionView()
}

document.addEventListener("keydown",changeDirection)

function gameoverHandler()
{
    song1and2.pause()
    AudioGO.play()
    clearInterval(setIntervalId)
    alert('GAME OVER, Click the OK button to restart the game!  ');
    location.reload();
}

const changeFoodPositionView = () => {
    if(gameover==true){
        return gameoverHandler()
    }
    let htmlPositions = `<div class="food" style="grid-area: ${foodpositionY} /${foodpositionX};"></div>`

    if(snakeX == foodpositionX && snakeY == foodpositionY)
    {
        changeFoodPosition();
        snakeBody.push([foodpositionX],[foodpositionY])
        eat.play();
        score++;
        scores.innerHTML = `<p>Score : ${score}</p>`
    }

    for(let i = snakeBody.length - 1 ; i>0 ; i--)
    {
        snakeBody[i] = snakeBody[i-1]
    }

    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    console.log(snakeX)


    if(snakeX <= 0 || snakeX > 24 || snakeY <= 0 || snakeY > 24){
        gameover = true;
    }

    for(let i = 0; i<snakeBody.length ; i++)
    {
      if(i==0)
      {
        htmlPositions += `<div class="headmain" style="grid-area: ${snakeBody[i][1]} /${snakeBody[i][0]};"></div>`
      }
      else{
        htmlPositions += `<div class="head" style="grid-area: ${snakeBody[i][1]} /${snakeBody[i][0]};"></div>`
      }

      if(i!==0 && snakeBody[i][1]==snakeBody[0][1] && snakeBody[i][0] == snakeBody[0][0])
      {
        gameover = true;
      }
    }
    boardspaces.innerHTML = htmlPositions;
}


setIntervalId = setInterval(() => {
    changeFoodPositionView();
}, intervalbw);
changeFoodPositionView()


const buttonright = document.getElementById("buttoning")
const sides = document.getElementById("sider")

var a =0;

buttonright.addEventListener("click",() => {
if(a%2==0)
{
  sides.style.left = "0px";
  sides.style.backgroundColor = "lightgreen";
  sides.style.transitionDuration = "1s ease-in-out"
  sides.style.backgroundColor = "#4ee44e";
  buttonright.style.rotate = "180deg"
  buttonright.style.color = "black";
  buttonright.style.backgroundColor = "white";
  buttonright.style.left = "373px"
  a++;
}
else
{
    sides.style.left = "-390px"
    buttonright.style.left = "3px"
    buttonright.style.rotate = "360deg"
    buttonright.style.color = "white";
    buttonright.style.backgroundColor = "black";
    sides.style.backgroundColor = "lightgreen"
    a++;
}
})