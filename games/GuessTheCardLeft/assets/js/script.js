$(function () {
    const phase = {
        QR_CODE: "qr_code_phase",
        ASK: "ask_phase",
        ANSWER: "answer_phase",
        GAME_OVER:"game_over_phase"
    }

    var game_stage = phase.QR_CODE;
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
        earse_error();
        console.log('start game btn clicked');
        turn = 0;
        game_stage = phase.QR_CODE;
        
        var name1 = $("#player-1").val();
        var name2 = $("#player-2").val();
        num_of_cards = $("#number-of-cards").val();

        if (!is_valid_game_info(name1, name2, num_of_cards)) return;
 
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

    $('#next-btn').click(function () {
        next_phase();
    });

    function next_phase() {
        earse_error();
        if (game_stage == phase.QR_CODE) {
            draw_figures();
        }
        console.log('next btn clicked ' + game_stage);

        if (game_stage == phase.QR_CODE || game_stage == phase.ANSWER) {
            if (game_stage == phase.ANSWER) {
                if (!is_a_valid_answer()) return;
                turn ^= 1;
            }
            draw_ask_phase();
            game_stage = phase.ASK;
        } else if (game_stage == phase.ASK) {
            if (!is_a_valid_question()) return;
            if ($("#asked_number").val()!= "") {
                // asked_number valid
                draw_answer_phase();
                game_stage = phase.ANSWER;
            } else {
                // guessed_number valid
                console.log("guess num: " + guessed_number);
                console.log("card left: " + guessed_number);
                if (asked_number == card_left) {
                    // the player won
                    draw_game_over_phase(true);
                } else {
                    draw_game_over_phase(false);
                }
                game_stage = phase.GAME_OVER;
            }
        }

        if (game_stage == phase.GAME_OVER)
            draw_game_info()
        else
            draw_cheatsheet()
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

    function draw_figures() {
        var code = "<div class='col-sm-2'> \
        <img src='assets/images/stick_figure1.png' class='figure-image' alt='' /> \
        <h3>" + players[0].name + "</h3> \
        </div> \
        <div class='dialog-container col-sm-3'> \
            <img src='assets/images/dialog1.png' class='dialog-image' alt='' /> \
            <div class='dialog-text' id='dialog-text0'></div> \
        </div> \
        <div class='col-sm-2'></div> \
        <div class='dialog-container col-sm-3'> \
            <img src='assets/images/dialog2.png' class='dialog-image' alt='' /> \
            <div class='dialog-text' id='dialog-text1'></div> \
        </div> \
        <div class='col-sm-2'> \
            <img src='assets/images/stick_figure2.png' class='figure-image' alt='' /> \
            <h3>" + players[1].name + "</h3> \
        </div>";
        $('#game-board').html(code);
    }

    function draw_ask_phase() {
        var code = 
            "<label>Do you have card </label> \
            <input type='text' class='game-input' id='asked_number'> \
            <label> ?</label><br> \
            --------- OR ---------<br> \
            I guess the card left on the table is </label> \
            <input type='text' class='game-input' id='guessed_number'> \
            <label> .</label>";
        $('#dialog-text'+turn).html(code); 
        $('#dialog-text'+(turn^1)).empty();
    }

    function draw_answer_phase(){
        var ask_code = "<label>Do you have card " + asked_number + "?</label>";
        var answer_code = 
            "<form> \
            <input type='radio' name='ans' id='yes' value='yes'>Yes \
            <input type='radio' name='ans' id='no' value='no'>No \
            </form> ";
        $('#dialog-text'+turn).html(ask_code); 
        $('#dialog-text'+(turn^1)).html(answer_code); 
    }

    function draw_game_over_phase(did_win) {
        var code = "<h3>You " + (did_win ? "Won" : "Lost") 
                 + "! The card left is " + card_left 
                 + ".<br> Congratulations, " 
                 + (did_win ? players[turn].name : players[turn^1].name) 
                 + " :)</h3>";
        $('#game-board').html(code);
    }

    function draw_game_info(){
        var code =
        "<h2 class='information-header'> Game information </h2> \
        <div class='info-form'> \
            <label for='player-1'> Player 1 Name </label> \
            <input type='text' class='form-control info-input' id='player-1'> \
        </div> \
         <div class='info-form'> \
            <label for='player-2'> Player 2 Name </label> \
            <input type='text' class='form-control info-input' id='player-2'> \
        </div> \
         <div class='info-form'> \
            <label for='number-of-cards'> Number of Cards (must be odd) </label> \
            <input type='text' class='form-control info-input' id='number-of-cards' value='5'> \
        </div> \
         <div class='col-sm-12 alert alert-danger alert-dismissable' id='error-container'> \
            <a href='#' class='close' aria-label='close'>&times;</a> \
            <p id='error-message'> </p> \
        </div> \
        <div class='btn-container col-sm-12'> \
            <button type='button' class='start-game btn btn-primary' id='start-game-btn'>Start new game</button> \
        </div>";
        $('#side_bar').html(code);
    }

    function draw_cheatsheet(){
        
    }

    function is_valid_game_info(name1, name2) {
        if(name1 == "") {
            update_error("Please enter the name of player 1.");
            return false; 
        }
        if(name2 == "") {
            update_error("Please enter the name of player 2.");
            return false; 
        }
        if(num_of_cards % 2 == 0) {
            update_error("The number of cards must be odd.");
            return false;
        }

        return true;
    }

    function is_a_valid_question() {
        var asked_num = $("#asked_number").val();
        var guessed_num = $("#guessed_number").val();

        console.log(asked_num);
        console.log(guessed_num);

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
                return false;
            } else {
                return true;
            } 
        } else {
            var guessed_number = parseInt(guessed_num);
            if (!(guessed_number >= 1 && guessed_number <= num_of_cards)) {
                update_error("The card number you guess should be in the range [1, " + num_of_cards + "]");
                return false;
            } else {
                return true;
            }
        }
    }

    function is_a_valid_answer() {
        var should_be_yes = players[turn^1].cards.includes(asked_number);
        if (($('#yes').is(":checked") && !should_be_yes) 
            || ($('#no').is(":checked") && should_be_yes)){
            update_error("You should answer the question honestly.");
            return false;
        } else 
            return true;
    }

    function update_error(err) {
        $('#error-message').html(err);
        $('#error-container').show();
    }

    function earse_error() {
        $('#error-message').parent().hide();
    }
})
