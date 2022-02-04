const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const boxElements = document.querySelectorAll('[data-box]');
let circleTurn
const winningMessageElement = document.getElementById('winningMessage')
const rematchButton = document.querySelector('#rematch')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

startGame()

rematchButton.addEventListener('click', startGame)
box.classList.remove(X_CLASS)
box.classList.remove(CIRCLE_CLASS)
box.removeEventListener('click', handleClick)
function startGame() {
    circleTurn = false;
    boxElements.forEach(box => {

        box.addEventListener('click', handleClick, { once: true})
    })
    winningMessageElement.classList.remove('show')
  
}


function handleClick(e) {
    const box = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS   
    placeMark(box, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else {
        swapTurns()
    }
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = 'It\'s a Draw'

    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw (){
    return [...boxElements].every( box => {
        return box.classList.contains(CIRCLE_CLASS) || box.classList.contains(X_CLASS)
    })
}

function placeMark(box, currentClass){
    box.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}

function checkWin(currentClass){
    return WINNING_COMBOS.some(combinations => {
        return combinations.every(index =>{
            return boxElements[index].classList.contains(currentClass)
        })
    })
}