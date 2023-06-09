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
let paused = false

let headArr = []

function startGame(){
    if(paused){
        return
    }
    let html = `<div class="food" style="grid-area: ${yFood} / ${xFood};"></div>`
    
    if(xPosition < 1 || yPosition < 1 || xPosition > 30 || yPosition > 30 || gameStatus == false){
        gameOver.style.left = 0;
        gameStatus = true;
        if(gameStatus == true){
            if(highScoreCounter < scoreCounter){
                highScoreCounter = scoreCounter
                highScore.textContent =  `High Score: ${scoreCounter}`
            }
            gameStatus = false
        }
        return
    } else{
        xPosition += xVelocity
        yPosition += yVelocity
    }

    if(xPosition >= 1 && yPosition >= 1 && xPosition <= 30 && yPosition <= 30 && gameStatus == true){

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
        

        for (let i = 0; i < headArr.length; i++) {
            
            html += `<div class="head" style="grid-area: ${headArr[i][1]} / ${headArr[i][0]};"></div>`

            if(i != 0 && headArr[0][1] == headArr[i][1] && headArr[0][0] == headArr[i][0]){
                gameStatus = false
                xVelocity = 0
                yVelocity = 0
            }
            
        }
        
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
    } else if(e.key.toLowerCase() === "p"){
        paused = !paused
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
const starter = setInterval(startGame, 100)
