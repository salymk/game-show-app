 //Variables
const qwert = document.querySelector('#qwert');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
// const playAgain = document.querySelector('.play__again');



let phraseList = [
                'A BLAZE OF GLORY',
                'BATMAN SAVES THE DAY',
                'CATCH A FALLING STAR',
                'DOUBLE OR NOTHING',
                'FREE AS A BIRD'
              ];


//to start the game
startGame.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// let randomItem = phraseList[Math.floor(Math.random()*phraseList.length)];
// console.log(randomItem);


//This function randomly picks a phrase from the array
//then splits each character in the phrase and
//assigns it into splitPhrase
function getRandomPhraseAsArray(arr){
    //do stuff to any arr that is passed in
    let phrase = arr[Math.floor(Math.random()*arr.length)];
    let splitPhrase = phrase.split("");
    return splitPhrase;
}

/*
  This function loops through an array of characters.
  For each create in the array it creates a list item
  and puts the character inside of it. And appends
  it to the #phrase ul in the HTML
*/
function addPhraseToDisplay(arr){
   const ul = document.getElementsByTagName('ul')[0];

    // do stuff any arr that is passed in, and add to `#phrase ul`
    for (let i = 0; i < arr.length; i++) {
      let li = document.createElement('li');
      li.textContent = arr[i];
      ul.appendChild(li);

      //  If the character in the array is a letter and not a space,
      //  the function adda the class “letter” to the list item.
      if (arr[i] !== ' ') {
        li.className = 'letter';
      } else {
        li.className = 'space';
      }
    }
}

/*
  Add the phraseList to the function and assign it
  to phraseArray variable
  and pass it to addPhraseToDisplay as an argument
*/
const phraseArray = getRandomPhraseAsArray(phraseList);
addPhraseToDisplay(phraseArray);

/*
   The function loops over the letters and checks
   if they match the letter in the button the player has chosen
*/
function checkLetter (button) {
  let letterMatch = null;
  let letters = document.getElementsByClassName('letter');
  for (let i = 0; i < letters.length; i++) {
    /*
    If there’s a match, the function adds the “show” class to the list item
    containing that letter, stores the matching letter inside of a variable,
    and returns that letter.
    If a match wasn’t found, the function returns null.
    */
    if (button === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add('show');
      letterMatch = true;
    }
  }
  return letterMatch;
}


/*
  Use event delegation to listen only to button events from the keyboard.
*/
qwerty.addEventListener('click', (e) => {
  const clickedButton = e.target;
  // When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice
  if ( clickedButton.tagName === 'BUTTON') {
    clickedButton.className = 'chosen';
    // button elements have an attribute you can set called “disabled”
    // that when set to true will not respond to user clicks
    clickedButton.setAttribute('disabled', true);

    // Pass the button to the checkLetter function,
    // and store the letter returned inside of letterFound
    let letterFound = checkLetter(clickedButton.textContent);

    /*
      If the checkLetter function returns a null value, the player has guessed the wrong letter.
    */
    if (letterFound === null) {
      //When you remove a 'heart' from the scoreboard, increase the missed count by 1
      missed +=1;
      let li = document.querySelectorAll('img');

      // remove one of the hearts from the scoreboard and replace it with
      // the lostHeart.png image
      if (li.length > 0) {
        li[li.length - missed].src = 'images/lostHeart.png'
      }
    }
  }
  checkWin();
});


/*
  Each time the player guesses a letter,
  this function will check whether the game has been won or lost
*/
function checkWin () {
  let letter = document.querySelectorAll('.letter');
  let show = document.querySelectorAll('.show');

  if (letter.length === show.length) {
    overlay.classList.add('win');
    title.textContent = "YOU WIN!";
    overlay.style.display = 'flex';
    resetGame()
  } else if (missed > 4) {
    overlay.classList.add('lose');
    title.textContent = "YOU LOST!";
    overlay.style.display = 'flex';
    resetGame();
  }
}

//Deletes the current phrase with innerHTML
//and then creates a newUl and appends to the phrase
function resetPhrase () {
  phrase.innerHTML = '';
  let newUl = document.createElement('ul');
  phrase.appendChild(newUl);
}

//This function resets all of the buttons that were chosen and
//removes their 'disabled' attribute & 'class' attribute
function resetButtons () {
  let chosenButtons = document.querySelectorAll('BUTTON');

  for (let i = 0; i < chosenButtons.length; i++) {
    chosenButtons[i].removeAttribute('disabled');
    chosenButtons[i].removeAttribute('class');
  }
}

function resetGame() {
  startGame.textContent = 'Play Again!';
  //set the missed variable back to 0
  missed = 0;
  //restore the liveHeart images
  //remove the disabled attribute from the buttons
  resetButtons();
  //remove all of the li elements from the #phrase ul
  resetPhrase();
  //then generate a new phrase
  getRandomPhraseAsArray(phraseList);
  addPhraseToDisplay(phraseArray);
}
