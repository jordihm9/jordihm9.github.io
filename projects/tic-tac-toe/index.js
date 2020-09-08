'use scrict'

// players
const player1 = {
    "id" : 1,
    "color" : '#395CD4', // blue
    "wins" : 0
}

const player2 = {
    "id" : 2,
    "color" : "#FFC300", // yellow
    "wins" : 0
}

let rounds = 0;
let turns = 0;

// cleaning
function cleanElement(id) {
    let element = document.getElementById(id);
    element.classList.remove(element.classList[1]);
    element.style.backgroundColor = null;
}
function cleanBoard() {
    rounds++;
    turns = rounds % 2 === 0 ? 0 : 1;
    for (let i = 1; i < 10; i++) {
        cleanElement(i);
    }
    console.log('Board cleaned!');
    hideElement("winPopUp");
    unblurElement("board");
}

// hide element
function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

// bring hidden element back
function showElement(id) {
    document.getElementById(id).style.display = "inline";
}

// blur element
function blurElement(id) {
    document.getElementById(id).style.opacity = 0.4;
}

// unblur element
function unblurElement(id) {
    document.getElementById(id).style.opacity = 1;
}

// return the player whose turn is it
function playerTurn() {
    return turns % 2 === 0 ? player1 : player2;
}

// check whole board for winning line
function checkWin() {
    // check horitzonal
    console.log('Checking horitzontal');
    for (let i = 1; i < 9; i+=3) {
        if (document.getElementById(i).classList[1] === document.getElementById(i+1).classList[1] && document.getElementById(i).classList[1] === document.getElementById(i+2).classList[1]) {
            return document.getElementById(i).classList[1];
        }
    }

    // check vertical
    console.log('Checking vertical');
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById(i).classList[1] === document.getElementById(i+3).classList[1] && document.getElementById(i).classList[1] === document.getElementById(i+6).classList[1]) {
            return document.getElementById(i).classList[1];
        }
    }

    // check diagonals
    console.log('Checking diagonals');
    if (document.getElementById(1).classList[1] === document.getElementById(5).classList[1] && document.getElementById(1).classList[1] === document.getElementById(9).classList[1]){
        return document.getElementById(5).classList[1];
    }
    if (document.getElementById(3).classList[1] === document.getElementById(5).classList[1] && document.getElementById(3).classList[1] === document.getElementById(7).classList[1]){
        return document.getElementById(5).classList[1];
    }

    return false; // no winner
}

function play(cell) {
    let player = playerTurn();
    let piece = document.getElementById(cell);
    let winnerPiece = document.getElementById("winnerPiece");

    if (piece.style.backgroundColor == player1["color"] || piece.style.backgroundColor == player2["color"]) {
        return false;
    }

    piece.classList.add(player["id"]); // add identifier of the player as a class
    piece.style.backgroundColor = player["color"];
    piece.style.color = player["color"];
    turns++;
    
    if (turns > 4) { // just check winner if player who started the round played 3 turns
        let winner = checkWin();
        if (!winner) { // case there's no winner
            console.log('No one wins');
            winnerPiece.style.backgroundColor = "#2F2F2F";
            winnerPiece.style.color = "#CEC2B7";
            winnerPiece.innerHTML = "<h2>D R A W</h2>";
        } else { // case one player wins
            winner = player;
            winnerPiece.style.color = winner["color"];
            winnerPiece.innerHTML = "<h2>W I N N E R</h2>";
            console.log('Player ', winner["id"], ' wins!');
            winner["wins"]++;
            showElement("winPopUp");
            blurElement("board");
        }
    }

    if (rounds % 2 === 0) {
        if (turns >= 9) {
            showElement("winPopUp");
            blurElement("board");
            // cleanBoard();
        }
    } else {
        if (turns >= 10) {
            showElement("winPopUp");
            blurElement("board");
            // cleanBoard();
        }
    }
}