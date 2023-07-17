const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [          // combinações de vitória 
    [0, 1, 2], [3, 4, 5], [6, 7, 8],    // verticais
    [0, 3, 6], [1, 4, 7], [2, 5, 8],    // horizontais
    [0, 4, 8], [2, 4, 6]                // diagonais
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage') //exibe a mensagem no fim do jogo 
const restartButton = document.getElementById('restartButton') //implementa o botão de restart
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame) //reinicia o jogo ao clicar no botão restart. 
//precisa reverter a posição para a inicial também. 
//precisa remover a tela final que exibe o resultado
//precisa limpar as peças do tabuleiro

function startGame(){
    circleTurn = false //começa sempre com x ao reiniciar o jogo
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) //remove os X após cliclar em restart
        cell.classList.remove(CIRCLE_CLASS) //remove os O (circulos) após clicar em restart
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true}) //só pormite clicar uma vez na celula {once: true}
    })
    setBoarderHoverClass()
    winningMessageElement.classList.remove('show') //remove a tela final ao clicar em restart
}

function handleClick(e) {
    // precisa marcar a celula 
    // verificar vencedor
    // verificar empate
    // alternar o turno
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //alterna a classe 
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {  // chama a função para verificar o vencedor
        endGame(false)  //determina falso para em caso de empate
    } else if (isDraw()) {
        endGame(true) //confirma fim do jogo em caso de empate
    } else {
        swapTurns()
        setBoarderHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerHTML = 'Draw!' // mensagem de empate. Precisa ter criado a função empate
    } else {
       winningMessageTextElement.innerHTML =  "Wins!"
       //winningMessageTextlement.innerText = '${circleTurn ? "O's" : "X's"} Wins!'
       //innerText não funcionou
    } 
    winningMessageElement.classList.add("show")  //exibe a mensagem no final do jogo

}

function isDraw() {
    return [...cellElements].every(cell => { //desestruturando o vetor para checar empate. 
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })  // verifica de está completo o tabuleiro sem vencedor
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn // alterna o turno de X para O
}

function setBoarderHoverClass(){ //faz com que o elemento hover alterne também 
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {  // verifica as combinações de vitória para determinar vencedor
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        }) // checa os elementos e se a classe contem alguma das combinações vencedoras
    })
}