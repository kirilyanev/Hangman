// Define list of words
const words = ['hangman', 'javascript', 'html', 'css', 'programming'];

// Select a random word from the list
let word = words[Math.floor(Math.random() * words.length)];
console.log(word);
// Initialize array to hold the letters of the word
let wordLetters = [];

// Loop through the word and add each letter to the array
for (let i = 0; i < word.length; i++) {
    wordLetters.push(word.charAt(i));
}

// Initialize array to hold the correctly guessed letters
let correctLetters = [];

// Initialize array to hold the incorrectly guessed letters
let incorrectLetters = [];

// Initialize variable to keep track of the number of incorrect guesses
let incorrectGuesses = 0;

// Create buttons for each letter of the alphabet
for (let i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i);
    let button = document.createElement('button');
    button.innerHTML = letter;
    button.addEventListener('click', function() {
        // Disable the button after it is clicked
        this.disabled = true;
        // Check if the letter is in the word
        if (wordLetters.includes(letter.toLowerCase())) {
            // Add the letter to the correct letters array
            correctLetters.push(letter);
            // Update the word display
            updateWord();
            // Check if the player has won
            checkWin();
        } else {
            // Add the letter to the incorrect letters array
            incorrectLetters.push(letter);
            // Increment the number of incorrect guesses
            incorrectGuesses++;
            // Update the hangman image
            updateHangman();
            // Check if the player has lost
            checkLose();
        }
    });
    document.getElementById('letters').appendChild(button);
}

// Function to update the word display
function updateWord() {
    let displayWord = '';
    for (let i = 0; i < word.length; i++) {
        if (correctLetters.includes((word.charAt(i)).toUpperCase())) {
            displayWord += word.charAt(i) + ' ';
        } else {
            displayWord += '_ ';
        }
    }
    document.getElementById('word').innerHTML = displayWord;
}

// Function to update the hangman image
function updateHangman() {
    let image = document.getElementById('hangman');
    if (incorrectGuesses >= 12) {
        checkLose();
    } else {
        image.src = 'images/hangman' + incorrectGuesses + '.jpg';
    }
}

// Function to check if the player has won
function checkWin() {
    if (correctLetters.length === wordLetters.length) {
        document.getElementById('message').innerHTML = 'Congratulations, you won!';
    }
}

function checkLose() {
    if (correctLetters.length > wordLetters.length) {
        document.getElementById('message').innerHTML = 'You hang yourself!';
    }
}