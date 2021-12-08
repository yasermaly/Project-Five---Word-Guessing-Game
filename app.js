/*
    Treehouse Techdegree:
    Project 5 - Develop a Word Guessing Game
*/

/* 
    Project Notes: 
    I am going for an 'Exceeds Expectations grade! :)
    Added CSS transitions for each letter in the phrase display as they are revealed.
    Added buttons to the success and failure screens that reset the game.
*/


const qwerty = document.getElementById('qwerty');
const phraseUl = document.querySelector('#phrase ul');
const start_button = document.querySelector('.btn__reset');
let missed = 0;
let overlay = document.getElementById('overlay');

start_button.addEventListener('click', () => {
    overlay.style.display = 'none';
    startGame();
});

let phrases = [
    'Lasting first impression',
    'Down in the sand trap',
    'After the brutal fight',
    'On the wooden table',
    'Into the dark woods',
    'Without a paddle',
    'In a few minutes',
    'The army is on the move'
];

//return a random phrase from an array
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor( Math.random() * arr.length);
    return arr[randomNumber].split("");
}

//adds the split letters of randomly selected phrase to the display
function addPhraseToDisplay(phrase_arr) {
    for (let i = 0; i < phrase_arr.length; i++){
        const li = document.createElement('li');
        li.textContent = phrase_arr[i];
        if (phrase_arr[i] !== " "){
            li.className = "letter";
        } else {
            li.className = "space";
        }
        phraseUl.append(li);
    }
}

//check if a letter is in the phrase
function checkLetter(letter_button) {
    const letters = document.querySelectorAll('#phrase ul .letter');
    let output = null;
    for (let i = 0; i < letters.length; i++){
        if (letters[i].textContent.toUpperCase() === letter_button.textContent.toUpperCase()){
            letters[i].classList.add("show");
            output = letter_button;
        }
    }
    return output;
}

//keyboard event listener
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON"){
        e.target.className = "chosen";
        e.target.disabled = true;
        let letterFound = checkLetter(e.target);
        if (letterFound === null){
            missed += 1;
            document.querySelector('.tries').remove();
        }
    }
    checkWin();
});

function checkWin() {
    let letters = document.querySelectorAll('.letter');
    let shownLetters = document.querySelectorAll('.show');
    let title = document.querySelector(".title");
    if (letters.length === shownLetters.length){
        //show win overlay
        overlay.style.display = 'flex';
        title.innerHTML = "BRAVO! you got it!";
        overlay.className = "win";
        start_button.textContent = "Play Again?";
    } else if (missed >= 5){
        //show lose overlay
        overlay.style.display = 'flex';
        title.innerHTML = "Hard luck! You're out of guesses.";
        overlay.className = "lose";
        start_button.textContent = "Play Again?";
    }
}

function startGame() {
    //reset hearts
    missed = 0;
    const scoreboard = document.querySelector('#scoreboard ol');
    scoreboard.innerHTML = '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li><li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';

    //clear the phrase
    phraseUl.innerHTML = "";

    //reset the keyboard
    let keys = document.querySelectorAll('#qwerty button');
    for (let i = 0; i < keys.length; i++) {
        keys[i].disabled = false;
        keys[i].classList.remove('chosen');
    }
    //generate a new phrase
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}