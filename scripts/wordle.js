import { WORDS } from "./palabras.js";

if (sessionStorage.user == null) {
    location.href = "/index.html"
}

const alertContainer = document.querySelector("[data-alert-container]")
let user = sessionStorage.user
let ID = 0
const NUMBER_OF_GUESSES = 6
let guessesRemaining = NUMBER_OF_GUESSES
let currentGuess = []
let nextLetter = 0
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
let guessesMatrix = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]
let savedRightGuessString = "";
var numberOfAttempts
console.log(rightGuessString)

window.onload = () => {
    //if it's not a new game, load tha save state from local storage
    if (sessionStorage.getItem("isNew") === "false") {
        var loadFile = JSON.parse(localStorage.getItem(`saveGame${user}`))
        let savedGuessesRemaining = loadFile.guessesRemaining
        rightGuessString = loadFile.rightGuessString
        guessesMatrix = loadFile.guessesMatrix
    
        for (let row = 0; row < 6 - savedGuessesRemaining; row++) {
            for (let box = 0; box < 5; box++) {
                insertLetter(guessesMatrix[row][box])
            }
            checkGuess()
        }
    }
    console.log(rightGuessString)
}

/**
 * 
 * listener event for key press
 */
document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

/**
 * inserts letter on correct cell after key press
 * @param {string} pressedKey 
 */
function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    guessesMatrix[6 - guessesRemaining][nextLetter] = pressedKey
    nextLetter += 1
}

/**
 * deletes letter after back space is pressed
 */
function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    guessesMatrix[6 - guessesRemaining][nextLetter] = ""
    nextLetter -= 1
}

/**
 * checkGuess checks after Enter is pressed
 */
function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        showAlert("Cantidad de letras insuficiente")
        return
    }

    if (!WORDS.includes(guessString)) {
        showAlert("Esa palabra no esta en la lista")
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // letter is in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = 'green'
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        showAlert("Acertaste la palabra! Tu tiempo fue de ")
        
        numberOfAttempts = 6 - (guessesRemaining - 1)
        saveFinishedGame()

        guessesRemaining = 0

        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            showAlert(`Te quedaste sin intentos! La palabra era "${rightGuessString}"`)
        }
    }
}

/** 
 * this function makes the virtual keyboard usable
 */
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

/**
 * 
 * @param {*} letter 
 * @param {*} color 
 * colors the on screen keyboard
 */
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

window.onbeforeunload = () => {
    saveGameState()
}

/**
 * saves current game state
 */
function saveGameState() {
    let file = {
        user: user,
        guessesRemaining: guessesRemaining,
        rightGuessString: rightGuessString,
        guessesMatrix: guessesMatrix
    }
    let saveStateString = JSON.stringify(file)
    localStorage.setItem(`saveGame${user}`, saveStateString)
}

/**
 * 
 * @param {string} message 
 * @param {int} duration 
 * @returns an alert message on screen
 */
function showAlert(message, duration = 1000) {
    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    if (!duration) return;
    setTimeout(() => {
      alert.classList.add("hide");
      alert.addEventListener("transitionend", () => {
        alert.remove();
      });
    }, duration);
  }

  /**
   * saves the finished game and also clears the current game from local storage
   */
function saveFinishedGame() {
    let currentDate = new Date()
    let finished = {
        user: user,
        rightGuessString: rightGuessString,
        date: currentDate,
        guessesMatrix: guessesMatrix,
        numberOfAttempts: numberOfAttempts
    }
    if (localStorage.finishedGames == null) {
        var finishedGames = []
    } else {
        var finishedGames = JSON.parse(localStorage.finishedGames)
    }

    finishedGames.push(finished)
    localStorage.finishedGames = JSON.stringify(finishedGames)

    localStorage.removeItem(`saveGame${user}`)
}

// function startTimer(m,s){
//     var timer = setInterval(function(){
//         if (s >= 60) {
//             s = 0;
//             m++;
//         }        
//         oTimer.innerHTML = `Tu tiempo es ${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
//         var mins = m;
//         var segs = s;
//         s++;
//     },1000)
// }

// function stopTimer() {
//     clearInterval(timer)
// }