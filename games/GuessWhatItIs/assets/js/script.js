function setup() {
    width = document.getElementById('game-container').offsetWidth - 100;
    containerHeight = window.innerHeight;
    height = width * 3 / 4 - width / 6;
    canvas = createCanvas(width, Math.max(height, containerHeight * 3 / 4)); // ~4:3 aspect ratio
    canvas.parent('game-container');

    button = createButton('Submit move');
    button.position(width - 150, height - 50);
    button.parent('game-container');
    button.attribute('class', 'btn btn-success')
    button.mousePressed(nextTurn);
}

var canvas;
var inGame = false;
var done = false;
var turn = 0;
var game;
var numCards;
var message = '';
var player1 = '';
var player2 = '';
var numberTextSize = 24;

function draw() {
    background(220);
    fill(255);
    if(inGame) {
        drawPlayers();
        drawQRCodes();
        // strokeWeight(0);
        // drawMessage();
        // drawPlayers();
        // drawUnusedWeights();
        // drawTorque();
        // if(!tipping) {
        //     strokeWeight(0);
        //     drawTable();
        //     drawTiles();
        //     strokeWeight(1);
        // } else{
        //     tipBoard();
        // }
    }
}

    /*
     * Properties is an object containing all necessary information for game.
     *
     * - player1: Gives the name for player 1.
     * - player2: Gives the name for player 2.
     * - numOfCards: number of weights in the game.
     */
function startGame() {
    message = '';
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;
    numCards = document.getElementById("number-of-cards").value;


    if(numCards % 2 == 0) {
            document.getElementById('error-message').innerText = "The number of cards must be odd.";
            document.getElementById('error-container').style.display = 'block';
            inGame = false;
            return;
    }

    game = new Game({
        player1: player1,
        player2: player2,
        numOfCards: numCards
    });

    done = false;
    turn = 0;

    inGame = true;
}

function drawPlayers() {
    // Player 1 Text
    textSize(30);
    fill(255,0,0);
    stroke(255,0,0);
    text(player1, width/4, 60);
    // Player 2 Text
    fill(0,0,255);
    stroke(0,0,255);
    text(player2, width -(width/3), 60);
}

function drawQRCodes() {
    img1 = loadImage('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1');
    image(img1, width/4, 100);
    img2 = loadImage('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=2');
    image(img2, width - (width/3), 100);
}

function mouseClicked() {
}

function nextTurn() {
    if(game.gameOver) {
        gameOver();
	game.gameOver = false;
	done = true;
    }
}

function drawMessage() {
    fill(0,0,0);
    stroke(0,0,0);
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER, CENTER);

    text(message, width / 2, height / 2 - 50);
}


function gameOver() {
    $.get('https://cims.nyu.edu/drecco2016/games/NoTipping/saveScore.php', {
        score: game.players[turn].name,
        gamename: 'GuessWhatItIs',
        playername: game.players[0].name + ' vs ' + game.players[1].name
    }).done(function(data) { 
        console.log("Saved success");
        console.log(data);
    }).fail(function(data) {
        console.log("Saved failure");
        console.log(data);
    });
}


/*
 * Object for the respective player. Contains the following information:
 *
 * - name: Name of the player/
* - numOfCards: number of weights in the game.
 */
class Player {
    constructor(name, numOfCards) {
        this.name = name;
        this.numOfCards = numOfCards;
    }
}

class Game {

    /*
     * Properties is an object containing all necessary information for game.
     *
     * - player1: Gives the name for player 1.
     * - player2: Gives the name for player 2.
     * - numOfCards: number of weights in the game.
     */
    constructor(properties) {
        this.numOfCards = properties.numOfCards;
        // FAKE DATA STOP 
        this.gameOver = false;
        this.gameState = 'Placing Weights';
        this.currentTurn = 0;

        this.players = new Array(2);
        this.players[0] = new Player(properties.player1, this.numOfCards);
        this.players[1] = new Player(properties.player2, this.numOfCards);


        this.isGameOver();
    }

    /*
     *  Determines whether the game is over based on left and right torque.
     *
     */
    isGameOver() {
        return false;
    }

}
