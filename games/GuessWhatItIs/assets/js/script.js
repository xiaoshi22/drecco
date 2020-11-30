$(function () {
    var gameStage = 0;
    // stage 0 -> qr code
    // 1 -> ask
    // 2 -> answer yes/no


    var players = new Array(2);
    var cardLeft;

    class Player {
        constructor(name, cards) {
            this.name = name;
            this.cards = cards;
        }
    }
    $('#start-game-btn').click(function () {
        console.log('start game btn clicked');
        
        var name1 = document.getElementById("player-1").value;
        var name2 = document.getElementById("player-2").value;
        var numOfCards = document.getElementById("number-of-cards").value;

        if(numOfCards % 2 == 0) {
            document.getElementById('error-message').innerText = "The number of cards must be odd.";
            document.getElementById('error-container').style.display = 'block';
            gameStage = 0;
            return;
        }
 
        var cards1 = new Array();
        var cards2 = new Array();

        cardLeft = Math.floor(Math.random() * numOfCards) + 1;
        for(var i =1; i<=numOfCards; i++){
            if (i == cardLeft) continue;
            
            if (cards1.length >= (numOfCards - 1)/2) cards2.push(i);
            else if (cards2.length >= (numOfCards - 1)/2) cards1.push(i);
            else if (Math.random()>=0.5) cards1.push(i);
            else cards2.push(i);
        }
        
        players[0] = new Player(name1, cards1);
        players[1] = new Player(name2, cards2);

        var path1 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[0].cards.join(", ");
        var path2 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[1].cards.join(", ");


        document.getElementById('game-board').innerHTML = 
        "<div class='col-sm-6'> \
            <h3>" + players[0].name + "</h3> \
            <img id='player1_QR_code' \
            width='150' height='150' \
            alt='" + players[0].name +"'s QR code' \
            src='" + path1 + "'> \
        </div> \
        <div class='col-sm-6'> \
        <h3>" + players[1].name + "</h3> \
            <img id='player2_QR_code' \
            width='150' height='150' \
            alt='" + players[1].name +"'s QR code' \
            src='" + path2 + "'> \
        </div>";
    });

    $('#next-btn').click(function () {
        console.log('next btn clicked ' + gameStage);

        if (gameStage == 0 || gameStage == 2) {
            // draw ask!
        } else if (gameStage == 1) {
            // draw answer or check win/lose
        }

    });
})