$(function () {
    var game_stage = 0;
    // stage 0 -> qr code
    // 1 -> ask
    // 2 -> answer yes/no
    // 3 -> game end: won/lost

    var turn = 0; 
    // 0 means player1 asks, 2 answers
    // 1 means 1 answers, 2 asks

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

        if(name1 == "") {
            update_error("Please enter the name of player 1.");
            return; 
        }

        if(name2 == "") {
            update_error("Please enter the name of player 2.");
            return; 
        }

        if(num_of_cards % 2 == 0) {
            update_error("The number of cards must be odd.");
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

        draw_QR_code_phase();
    });

    // $('#yes').click(function(){
    //     if($(this).is(":checked")){
    //         console.log("yes Checkbox is checked.");
    //     }
    //     else if($(this).is(":not(:checked)")){
    //         console.log("yes Checkbox is unchecked.");
    //     }
    // });

    // $('#no').click(function(){
    //     if($(this).is(":checked")){
    //         console.log("no Checkbox is checked.");
    //     }
    //     else if($(this).is(":not(:checked)")){
    //         console.log("no Checkbox is unchecked.");
    //     }
    // });

    $('#next-btn').click(function () {
        next_phase();
    });

    function next_phase() {
        console.log('next btn clicked ' + game_stage);

        if (game_stage == 0 || game_stage == 2) {
            if (game_stage == 2) {
                var should_be_yes = players[turn^1].cards.includes(asked_number);
                if (($('#yes').is(":checked") && !should_be_yes) 
                 || ($('#no').is(":checked") && should_be_yes)){
                    update_error("You should answer the question honestly.");
                    return;
                }
                turn ^= 1;
            }

            draw_ask_phase();
            game_stage = 1;
        } else if (game_stage == 1) {
            var asked_num = $("#asked_number").val();
            var guessed_num = $("#guessed_number").val();
    
            if(asked_num != "" && guessed_num != "") {
                update_error("You can not both ask and guesss a card in the same turn.");
                return;
            }
            if (asked_num == "" && guessed_num == "") {
                update_error("You should either ask or guesss a card in the this turn.");
                return;
            }

            if (asked_num != "") {
                asked_number = parseInt(asked_num);
                if (!(asked_number >= 1 && asked_number <= num_of_cards)) {
                    update_error("The card number you ask should be in the range [1, " + num_of_cards + "]");
                    return;
                } else {
                    // asked_number valid
                    draw_answer_phase();
                    game_stage = 2;
                } 
            } else {
                var guessed_number = parseInt(guessed_num);
                if (!(guessed_number >= 1 && guessed_number <= num_of_cards)) {
                    update_error("The card number you guess should be in the range [1, " + num_of_cards + "]");
                    return;
                } else {
                    // guessed_number valid
                    if (guessed_number == card_left) {
                        // the player won
                        draw_game_over_phase(true);
                    } else {
                        draw_game_over_phase(false);
                    }
                    game_stage = 3;
                }
            }
        }
    }

    function draw_QR_code_phase() {
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
    }

    function draw_ask_phase() {
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
    }

    function draw_answer_phase(){
        var code = 
        "<div class='col-sm-12'> \
            <label>" + players[turn].name + ": Do you have card " + asked_number + "?</label> \
        </div> \
        <br> \
        <div class='col-sm-12'> \
            <label>" + players[turn^1].name + ": </label> \
            <input type='checkbox' class='answer' id='yes' value='true'> \
            <label for='yes'>Yes</label> \
            <input type='checkbox' class='answer' id='no' value='false'> \
            <label for='no'>No</label> \
        </div>";
        $('#game-board').html(code);
    }

    function draw_game_over_phase(did_win) {
        var code = "<h3>You " + (did_win ? "Won" : "Lost") 
                 + "! The card left is " + card_left 
                 + ".<br> Congratulations, " 
                 + (did_win ? players[turn].name : players[turn^1].name) 
                 + " :)</h3>";
        $('#game-board').html(code);
    }

    function update_error(err) {
        $('#error-message').html(err);
        $('#error-container').show();
    }
})
