// style board
const boardBorder = '#000000'
const boardBg = '#fff'
const snakeColor = 'green'
const snakeBorder = 'yellow'

//Make the snake => array of coordinates
let snake = [
    {x: 200, y: 200}, {x: 190, y: 200},
    {x:180, y:200}, {x:170, y: 200},
    {x:160, y:200}
]


let score = 0

let speed = 100

let change_direction = false

let dx = 10
let dy = 0

//food 

let foodX 
let foodY
//Make the canvas
const snakeBoard = document.getElementById('snakeBoard')
const snakeBoardCtx = snakeBoard.getContext('2d')

//Draw boarder around the canvas

const clearCanvas =()=> {
    snakeBoardCtx.fillStyle = boardBg
    snakeBoardCtx.strokeStyle = boardBorder
    snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height)
    snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height)
}

//Draw snake
const drawSnake = ()=> {
    snake.forEach(drawSnakePart)
}

const drawSnakePart =(snakePart) => {
    snakeBoardCtx.fillStyle = snakeColor
    snakeBoardCtx.strokeStyle = snakeBoard
    snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
    snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}

//Move snake

const moveSnake =() => {
    const head = {x: snake[0].x +dx, y: snake[0]. y + dy}
    snake.unshift(head)

    const hasEatenFood  = snake[0].x == foodX && snake[0].y === foodY

    if(hasEatenFood) {
        score += 10
        const scoreDisplay = document.getElementById('score')
        scoreDisplay.innerText = score
        generateFood()
    } else {
        snake.pop()
    }

    // if(score >= 50) {
    //     speed -=10
    // }
}


const init =()=> {
    if(hasGameEnded()) return

    change_direction = false
    //add timer
    //setTimeout(callback function, time in ms)
    setTimeout(function onTick(){
        clearCanvas()
        drawSnake()
        drawFood()
        moveSnake()

        init()
    }, speed)
}

const changeDirection =(e)=> {
    const LEFT = 37
    const RIGHT = 39
    const UP = 38
    const DOWN = 40

    if(change_direction) return
    change_direction = true

    const keyPressed = e.keyCode

    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingRight = dx === 10
    const goingLeft = dx === -10

    if(keyPressed === LEFT && !goingRight) {
        dx = -10
        dy = 0
    }

    if (keyPressed === UP && !goingDown) {
        dx = 0
        dy = -10
    }

    if (keyPressed === RIGHT && !goingLeft) {
        dx = 10
        dy = 0
    }

    if (keyPressed === DOWN && !goingUp) {
        dx = 0
        dy = 10
    }
}

const hasGameEnded= ()=> {
    //snake bites itself
    for ( let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    //snake hits wall
    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > snakeBoard.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > snakeBoard.height - 10

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

// Randomize Food
const randomFood =(min, max)=> {
    return Math.round(Math.random() * (max - min) / 10) * 10
}
const generateFood = ()=> {
    foodX = randomFood(0, snakeBoard.width - 10)
    foodY = randomFood(0, snakeBoard.height - 10)

    snake.forEach(part => {
        const hasEaten = part.x == foodX && part.y == foodY

        if (hasEaten) {
            generateFood()
        }
    })
}

// Draw food
const drawFood =()=> {
    snakeBoardCtx.fillStyle = 'green'
    snakeBoardCtx.strokeStyle = 'darkgoldenrod'
    snakeBoardCtx.fillRect(foodX, foodY, 10, 10)
    snakeBoardCtx.strokeRect(foodX, foodY, 10, 10)
}


init()

document.addEventListener('keydown', changeDirection)

generateFood()