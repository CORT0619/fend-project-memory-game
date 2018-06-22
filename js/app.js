let totalMoves, clicks = 0;
let timer = 0;
let gameFinished = false;
let intervalID = 0;
let starRatingIntervalID = 0;
let starRating = 3;
const moves = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const stars = document.querySelector('.stars');
const timerElement = document.querySelector('.timer');
/*
 * Create a list that holds all of your cards
 */

 const cards = [
     'anchor',
     'bolt',
     'cube',
     'leaf',
     'bicycle',
     'diamond',
     'bomb',
     'paper-plane-o',
     'anchor',
     'bolt',
     'cube',
     'leaf',
     'bicycle',
     'diamond',
     'bomb',
     'paper-plane-o'
 ];

 let openedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function addCardstoBoard(dos) {
     /*
     * appends deck to the board
     */
    let cardNum = 0;
    const cardLength = dos.length;
    const fragment = document.createDocumentFragment();
    while(cardNum < cardLength) {
        
        const listElement = document.createElement('li');
        listElement.className = 'card';
    
        const icon = document.createElement('i');
        icon.classList.add('fa', `fa-${dos[cardNum]}`);
        listElement.appendChild(icon);
    
        fragment.appendChild(listElement);
        cardNum++;
    }
    
    deck.appendChild(fragment);

    // Event Listeners 
    deck.addEventListener('click',  openCard);
 }

function incrementMoves() {
    // calculate the number of moves made
    totalMoves++;
    moves.textContent = totalMoves;
}

function addToOpen(element) {
    // checks if there is a match
    // and if so marks it as a match
    // turns back over card if no match 
    openedCards.push(element);
    const openedCardsLen = openedCards.length;

    if (openedCardsLen > 1) {
        for(let i=0; i < openedCardsLen-1; i++) {

            if (element.firstElementChild.className === openedCards[i].firstElementChild.className) {
                element.classList.add('match');
                openedCards[i].classList.add('match');
                break;
            } else {
                setTimeout(function(){
                    openedCards[i].classList.remove('open', 'show');
                    openedCards.splice(i,1);
                }, 1000);
                
                incrementMoves();
            }
        }
        setTimeout(function(){
            openedCards.pop();
            element.classList.remove('open', 'show');
        }, 1000);
    }

    // game over
    checkForGameOver();
}

function runTimer() {
    // starts the timer
    intervalID = setInterval(function() {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

function openCard(e) {
    // if first click start timer
    if (clicks === 0) {
        //start timer
        runTimer();
        decrementStarRating();
    }
    clicks++;

    // turns over the cards
    const cardClicked = e.target;
    cardClicked.classList.add('open', 'show');
    addToOpen(e.target);
}

function resetCards() {
    // removes all matches and resets the deck
    for(let i = 0; i < cards.length; i++) {
        let playingCard = document.querySelectorAll('.card');
        if (playingCard[i].classList.contains('match')) {
            playingCard[i].classList.remove('match');
        } else if(playingCard[i].classList.contains('open') && playingCard[i].classList.contains('show')) {
            playingCard[i].classList.remove('open', 'show');
        }
    }
}

function decrementStarRating() {
    // removes start after a certain number of time
    starRatingIntervalID = setInterval(function(){
        if (stars.firstChild) {
            stars.removeChild(stars.firstChild);
            if (starRating > 0){
                starRating--;
            }
        }
    }, 6000);
}

function resetStars() {
    // remove stars if there are any
    if (stars.firstChild) {
        while(stars.firstChild) {
            stars.removeChild(stars.firstChild);
        }
    }

    const starsFragment =  document.createDocumentFragment();

    // add stars back
    for(let i = 0; i < 3; i++) {
        const starChild = document.createElement('li');
        starChild.innerHTML = `<i class="fa fa-star"></i>`;
        starsFragment.appendChild(starChild);
    }
    stars.appendChild(starsFragment);
    starRating = 3;
}

function restartGame() {

    // remove cards from deck
    while(deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    //shuffle the deck
    const shuffledCards = shuffle(cards);
    addCardstoBoard(shuffledCards);

    totalMoves = 0;
    moves.textContent = totalMoves;
    openedCards.length = 0;
   
    if (gameFinished) {
        // reset game board
        resetCards();
        // reset star rating
        resetStars();
    }
}


function showModal() {
    // show modal
    const modalDisplay = document.createElement('div');
    modalDisplay.innerHTML = `<h2>Congratulations!</h2>
        <h4>Would you like to play again?</h4>
        <p>Star Rating: ${starRating}</p>
        <p>Completion Time: ${timer}</p> seconds
        <button id="playAgain">Play again</button>
        <button id="stopPlay">No</button>
    `;
    modalDisplay.style.cssText = `
        margin: 0 auto; 
        background-color: #FFF; 
        text-align: center; 
        border: 1px solid #000; 
        border-radius: 4px;
        top: 25%;
        left: 25%;
        width: 500px; 
        height: 300px; 
        display: block; 
        z-index: 100; 
        position: fixed;
    `;
    document.querySelector('body').appendChild(modalDisplay);

    const playAgain = document.querySelector('#playAgain');
    playAgain.addEventListener('click', function(){
        restartGame();
        modalDisplay.style.display = 'none';
    });

    const stopPlay = document.querySelector('#stopPlay');
    stopPlay.addEventListener('click', function(){
        modalDisplay.style.display = 'none';
    });
}

function gameOver() {
    /*
    * resets the timers and shows the game over modal 
    */

    // stop timer
    clearInterval(intervalID);
    clearInterval(starRatingIntervalID);
    clicks = 0;
    intervalID = 0;
    starRatingIntervalID = 0;
    showModal();
    timer = 0;
    timerElement.textContent = timer;
}

function checkForGameOver() {

    let count = 0;

    // checks to see if each card has a match
    for(let i=0; i < cards.length; i++) {
        
        let currentCard = document.querySelectorAll('.card');
        if (currentCard[i].classList.contains('match')) {
            count++;
        }
    }
    // if all cards have a catch then the game is over
    if (count === cards.length) {
        gameOver();
    }
}


restartGame();

const restart = document.querySelector('.restart');
restart.addEventListener('click', function(){

    gameFinished = true;

    // stop timers and reset 
    clearInterval(intervalID);
    clearInterval(starRatingIntervalID);
    timer = 0;
    clicks = 0;
    intervalID = 0;
    starRatingIntervalID = 0;
    timerElement.textContent = timer;
    // game finished
    restartGame();
});




