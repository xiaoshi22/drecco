$(function () {
    var game_stage = 0;
    var turn = 0;
    // stage 0 -> qr code
    // 1 -> ask
    // 2 -> answer yes/no


    var players = new Array(2);
    var num_of_cards;
    var card_left;
    var asked_number;

    class Player {
        constructor(name, cards) {
            this.name = name;
            this.cards = cards;
        }
    }
    $('#start-game-btn').click(function () {
        console.log('start game btn clicked');
        turn = 0;
        game_stage = 0;
        
        var name1 = $("#player-1").val();
        var name2 = $("#player-2").val();
        num_of_cards = $("#number-of-cards").val();

        if(num_of_cards % 2 == 0) {
            $('#error-message').html("The number of cards must be odd.");
            $('#error-container').show();
            game_stage = 0;
            return;
        }
 
        var cards1 = new Array();
        var cards2 = new Array();

        card_left = Math.floor(Math.random() * num_of_cards) + 1;
        for(var i =1; i<=num_of_cards; i++){
            if (i == card_left) continue;
            
            if (cards1.length >= (num_of_cards - 1)/2) cards2.push(i);
            else if (cards2.length >= (num_of_cards - 1)/2) cards1.push(i);
            else if (Math.random()>=0.5) cards1.push(i);
            else cards2.push(i);
        }
        
        players[0] = new Player(name1, cards1);
        players[1] = new Player(name2, cards2);

        var path1 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[0].cards.join(", ");
        var path2 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[1].cards.join(", ");

        var code = 
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
        $('#game-board').html(code);
    });

    $('#next-btn').click(function () {
        console.log('next btn clicked ' + game_stage);

        if (game_stage == 0 || game_stage == 2) {
            // draw ask!

            console.log(turn);
            console.log(turn^1);
            var code = 
            "<div class='col-sm-12'> \
                <label>" + players[turn].name + ": Do you have card </label> \
                <input type='text' class='game-input' id='asked_number'> \
                <label> ?</label><br> \
                <label>------------------ OR ------------------<br> \
                " + players[turn].name + ": I guess the card left on the table is </label> \
                <input type='text' class='game-input' id='guessed_number'> \
                <label> .</label> \
            </div>";

            $('#game-board').html(code); 
            game_stage = 1;
        } else if (game_stage == 1) {
            // check if ask vaild
        
            var asked_num = $("#asked_number").val();
            var guessed_num = $("#guessed_number").val();

    
            if(asked_num != "" && guessed_num != "") {
                $('#error-message').html("You can not both ask and guesss a card in the same turn.");
                $('#error-container').show();
                return;
            }

            if (asked_num == "" && guessed_num == "") {
                $('#error-message').html("You should either ask or guesss a card in the this turn.");
                $('#error-container').show();
                return;
            }

            if (asked_num != "") {
                asked_number = parseInt(asked_number);
                if (!(asked_number >= 1 && asked_number <= num_of_cards)) {
                    $('#error-message').html("The card number you ask should be in the range [1, " + num_of_cards + "]");
                    $('#error-container').show();
                    return;
                } else {
                    // asked_number valid
                } 
            } else {
                var guessed_number = parseInt(guessed_num);
                if (!(guessed_number >= 1 && guessed_number <= num_of_cards)) {
                    $('#error-message').html("The card number you guess should be in the range [1, " + num_of_cards + "]");
                    $('#error-container').show();
                    return;
                } else {
                    // guessed_number valid
                    if (guessed_number == card_left) {
                        // the player won
                        console.log("win");
                    } else {
                        console.log("lose");
                    }
                }
            }



            





            // // draw answer or check win/lose
            // "<div class='col-sm-12'>
            //     <label>Player1: Do you have card </label>
            //     <input type='text' class='game-input' id='asked_number'>
            //     <label> ?</label><br>
            //     <label>------------------ OR ------------------<br>
            //     Player1: I guess the card left on the table is </label>
            //     <input type='text' class='game-input' id='guessed_number'>
            //     <label> .</label>
            // </div>
            // <br>
            // <div class='col-sm-12'>
            //     <label>Player2: </label>
            //     <input type='checkbox' id='yes' value='true'>
            //     <label for='yes'>Yes</label>
            //     <input type='checkbox' id='no' value='false'>
            //     <label for='no'>No</label>
            // </div>"
        }

    });
})