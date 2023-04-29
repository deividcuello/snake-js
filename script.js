const snakeContainer = document.querySelector('.grid-snake')
const score = document.querySelector('.snake-score .score')
const highScore = document.querySelector('.high-score')
const gameOver = document.querySelector('.game-over')
const gameOverBtn = document.querySelector('.game-over button')

let xPosition = Math.floor(Math.random() * 30) + 1
let yPosition = Math.floor(Math.random() * 30) + 1

let xFood = Math.floor(Math.random() * 30) + 1
let yFood = Math.floor(Math.random() * 30) + 1

let xVelocity = 0
let yVelocity = 0

let scoreCounter = 0
let highScoreCounter = 0

let gameStatus = true

let headArr = []

function startGame(){
    let html = `<div class="food" style="grid-area: ${yFood} / ${xFood};"></div>`
    
    if(xPosition < 1 || yPosition < 1 || xPosition > 30 || yPosition > 30){
        gameOver.style.left = 0;
        if(highScoreCounter < scoreCounter && gameStatus == true){
            highScoreCounter = scoreCounter
            gameStatus = false
            highScore.textContent =  `High Score: ${scoreCounter}`
        }
        return
    } else{
        xPosition += xVelocity
        yPosition += yVelocity
    }

    if(xPosition >= 1 && yPosition >= 1 && xPosition <= 30 && yPosition <= 30){

        if(xPosition == xFood && yPosition == yFood){
            scoreCounter += 1
            xFood = Math.floor(Math.random() * 30) + 1
            yFood = Math.floor(Math.random() * 30) + 1
            headArr.push([xFood, yFood])
            score.textContent = `Score: ${scoreCounter}`

        }
        
        for(let i = headArr.length - 1; i > 0; i--){
            headArr[i] = headArr[i - 1]
        }
        
        headArr[0] = [xPosition, yPosition]
        
        headArr.forEach(element => {
            html += `<div class="head" style="grid-area: ${element[1]} / ${element[0]};"></div>`
        });
        
        snakeContainer.innerHTML = html;
    }

}

const moveSnake = (e) => {
    if(e.key === "ArrowUp"){
        xVelocity = 0
        yVelocity = -1
    } else if(e.key === "ArrowDown"){
        xVelocity =0
        yVelocity =1
    } else if(e.key === "ArrowLeft"){
        xVelocity = -1
        yVelocity = 0
    } else if(e.key === "ArrowRight"){
        xVelocity = 1
        yVelocity = 0
    }
}

gameOverBtn.addEventListener('click', () => {
    headArr = []
    xPosition = Math.floor(Math.random() * 30) + 1
    yPosition = Math.floor(Math.random() * 30) + 1
    
    xFood = Math.floor(Math.random() * 30) + 1
    yFood = Math.floor(Math.random() * 30) + 1

    xVelocity = 0
    yVelocity = 0
    score.textContent = `Score: 0`
    scoreCounter = 0

    gameStatus = true

    gameOver.style.left = '100%'
    
})

document.addEventListener("keydown", moveSnake)
setInterval(startGame, 100)
