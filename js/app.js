let totalMoves = 0;
const moves = document.querySelector('.moves');
moves.textContent = totalMoves;
// moves.addEventListener('change', function() {
//     document.querySelector('.moves').textContent = totalMoves;
// });


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

const shuffledCards = shuffle(cards);
console.log('shuffledCards ', shuffledCards);

let cardsFinished = 0;
const cardLength = cards.length;
const fragment = document.createDocumentFragment();
while(cardsFinished < cardLength) {
    
    const listElement = document.createElement('li');
    listElement.className = 'card';

    const icon = document.createElement('i');
    icon.classList.add('fa', `fa-${cards[cardsFinished]}`);
    listElement.appendChild(icon);

    fragment.appendChild(listElement);
    cardsFinished++;
}

const deck = document.querySelector('.deck');
deck.appendChild(fragment);

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

function incrementMoves() {
    totalMoves++;
    moves.textContent = totalMoves;
}

function addToOpen(target) {

    openedCards.push(target);
    const openedCardsLen = openedCards.length;

    if (openedCardsLen > 1) {
        for(let i=0; i < openedCardsLen-1; i++) {
            console.log(i);
            if (target.firstChild === openedCards[i].firstChild) {
                // LOCK THE CARDS IN THE OPEN POSITION
                target.classList.add('match');
                openedCards[i].classList.add('match');
                console.log('match');
            } else {
                openedCards[i].classList.remove('open', 'show');
                openedCards.slice(i);
                console.log('openedCards ', openedCards);
                incrementMoves();
            }
        }
    }
}




function openCard(e) {
    const cardClicked = e.target;
    cardClicked.classList.add('open', 'show');
    console.log('event ', e);
    // addToOpen(e.target);
    setTimeout(addToOpen(e.target), 20000);
}

deck.addEventListener('click',  openCard);
