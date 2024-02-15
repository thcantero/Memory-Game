//Start Button
let startGame = document.getElementById('start')

//Add event listener to button


//Select Game Container
let gameContainer = document.getElementById('game')

//Declare variables
let cardOne = null
let cardTwo = null
let cardsFlipped = 0
let noClick = false

//Create Color Array
const CARDS = ['blue', 'green', 'pink', 'yellow', 'red', 'blue', 'green', 'pink', 'yellow', 'red']

//Shuffle Cards
function shuffle(array){
    let cardCounter = array.length

    while (cardCounter > 0) {
        let index = Math.floor(Math.random() * cardCounter)
        cardCounter--
        
        let temp = array[cardCounter]
        array[cardCounter] = array[index]
        array[index] = temp
    }
    return array
} 

let shuffledCards = shuffle(CARDS)

//Create a div for each cards in the array
function createDiv(cardsArray){
    for (let color of CARDS){

        //Create the element
        const newDiv = document.createElement('div')

        //Give the class attribute
        newDiv.setAttribute('class',color)

        //Add event listener to each Card
        newDiv.addEventListener('click', cardHandle)

        //Append div to game container
        gameContainer.append(newDiv)
}
}

function cardHandle(event){
    //Check that no more than 2 cards are flipped
    if (noClick) return

    //Check card is not same card
    if (event.target.classList.contains('flipped')) return

    //Flip card
    let currentCard = event.target
    currentCard.style.backgroundColor = currentCard.classList[0]

    //Check cards flipped
    if ( !cardOne || !cardTwo ) {
        currentCard.classList.add('flipped')
        cardOne = cardOne || currentCard
        cardTwo = currentCard === cardOne ? null : currentCard
    }
    
    if ( cardOne && cardTwo ) {
        noClick =  true

        //Get Card Value
        let cardValueOne = cardOne.className
        let cardValueTwo = cardTwo.className

        if ( cardValueOne === cardValueTwo ){
            //If cards are equal remove event Listener and reset values
            cardsFlipped+= 2

            cardOne.removeEventListener('click', cardHandle)
            cardTwo.removeEventListener('click', cardHandle)

            //Make pair of cards transparent 
            cardOne.style.opacity = '0.3'
            cardTwo.style.opacity = '0.3'

            cardOne = null
            cardTwo = null
            noClick = false
        }

        else {
            setTimeout( function(){
                cardOne.classList.remove('flipped')
                cardTwo.classList.remove('flipped')
                cardOne.style.backgroundColor = null
                cardTwo.style.backgroundColor = null
                cardOne = null
                cardTwo = null
                noClick = false
                }, 900)
        }
    }
    
    if ( cardsFlipped === CARDS.length ){
        setTimeout(function(){
            alert('game over!')},100)
    } 

}

createDiv(shuffledCards)




