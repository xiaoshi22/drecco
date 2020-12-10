$(function () {
    const phase = {
        QR_CODE: "qr_code_phase",
        ASK: "ask_phase",
        ANSWER: "answer_phase",
        GAME_OVER:"game_over_phase"
    }
    var game_stage = phase.QR_CODE;

    
    var turn = 0; // 0 means player 1 asks, player 2 answers; 1 means p1 answers, p2 asks
    
    var players = new Array(2);
    var num_of_cards;
    var card_left;
    var asked_from_number;
    var asked_to_number;
    var guessed_number;
    var is_cheatsheet = false;

    class Player {
        constructor(name, cards) {
            this.name = name;
            this.cards = cards;
        }
    }
    $('#start-game-btn').click(function () {
        erase_error();
        if (is_cheatsheet) {
            draw_game_info();
            return;
        }

        turn = 0;
        game_stage = phase.QR_CODE;
        
        var name1 = $("#player-1").val();
        var name2 = $("#player-2").val();
        num_of_cards = $("#number-of-cards").val();

        if (!is_valid_game_info(name1, name2)) return;
 
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
        erase_error();
        if (game_stage == phase.QR_CODE) {
            draw_figures();
        }

        if (game_stage == phase.QR_CODE || game_stage == phase.ANSWER) {
            if (game_stage == phase.QR_CODE) {
                draw_cheatsheet();
            }
            if (game_stage == phase.ANSWER) {
                if (!is_a_valid_answer()) return;
                turn ^= 1;
            }
            draw_ask_phase();
            game_stage = phase.ASK;
        } else if (game_stage == phase.ASK) {
            if (!is_a_valid_question()) return;
            if (($("#asked_from_number").val()!= "") && ($("#asked_to_number").val()!= "")) {
                // asked_number valid
                update_cheatsheet(players[turn].name +": " + "Do you have all cards from " + asked_from_number +" to " + asked_to_number +"?");
                draw_answer_phase();
                game_stage = phase.ANSWER;
            } else {
                // guessed_number valid
                update_cheatsheet(players[turn].name +": " + "I guess the card on table is " + guessed_number + "?");
                if (guessed_number == card_left) {
                    // the player won
                    draw_game_over_phase(true);
                } else {
                    draw_game_over_phase(false);
                }
                draw_game_info();
                game_stage = phase.GAME_OVER;
            }
        }


    }

    function draw_QR_code_phase() {
        var path1 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[0].cards.join(", ");
        var path2 = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + players[1].cards.join(", ");

        var code = 
        "<div class='col-sm-6' style='text-align: center; margin-top: 50px;'> \
            <h4>" + players[0].name + "</h4> \
            <img id='player1_QR_code' \
            width='150' height='150' \
            alt='" + players[0].name +"'s QR code' \
            src='" + path1 + "'> \
        </div> \
        <div class='col-sm-6' style='text-align: center; margin-top: 50px;'> \
            <h4>" + players[1].name + "</h4> \
            <img id='player2_QR_code' \
            width='150' height='150' \
            alt='" + players[1].name +"'s QR code' \
            src='" + path2 + "'> \
        </div>";
        $('#game-board').html(code);
        $('#names-row').empty();

        draw_cheatsheet();
    }

    function draw_figures() {
        var code = 
        "<div class='col-sm-5'> \
            <div id='figure0'></div> \
            <div id = 'dialog0'></div> \
        </div> \
        <div class='col-sm-2' id='card'> \
        <img src='assets/images/red_back.png' class='card-image' alt='' /> \
        </div> \
        <div class='col-sm-5'> \
            <div id='figure1'></div> \
            <div id ='dialog1'></div> \
        </div>";
        $('#game-board').html(code);
        $('#names-row').html(
           "<div class='col-sm-6' ><h4>" + players[0].name + "</h4></div> \
           <div class='col-sm-6' style='text-align: right'><h4>" + players[1].name + "</h4></div>"
        );
    }

    function draw_ask_phase() {
        var ask_code = 
            "<div>Do you have all cards from \
            <input type='text' class='game-input' id='asked_from_number'> \
            to \
            \<input type='text' class='game-input' id='asked_to_number'> \
             ?<br> \
            OR, I guess the card on the table is  \
            <input type='text' class='game-input' id='guessed_number'> \
             .";
        draw_dialog(turn, ask_code);
        draw_figure(turn^1);
    }

    function draw_answer_phase(){
        var ask_code = "<label>Do you have all cards from " + asked_from_number +" to "+ asked_to_number + "?</label>";
        var answer_code = 
            "<form> \
            <input type='radio' name='ans' id='yes' value='yes'>Yes \
            <input type='radio' name='ans' id='no' value='no'>No \
            </form> ";
        draw_dialog(turn, ask_code); 
        draw_dialog(turn^1, answer_code); 
    }

    function draw_figure(index) {
        $('#dialog'+index).empty();
        var style = index == 1 ? "style='float: right;'" : "";
        style = "";
        $("#figure"+index).html("<img src='assets/images/stick_figure" + index +".png'" + style + "class='dialog-image' alt='' /> ");
    }

    function draw_dialog(index, content) {
        var style = index == 1 ? "style='float: right;'" : "";
        style = "";
        var code = "<img src='assets/images/figure_dialog" + index +".png'" + style +" class='dialog-image' alt='' />";
        $("#figure"+index).html(code);
        code = "<div class='dialog-text'>" + content + "</div>";
        $("#dialog"+index).html(code); 
    }

    function draw_game_over_phase(did_win) {
        var code = "<h3>The card on the table is " + card_left 
                 + ".<br> Congratulations, " 
                 + (did_win ? players[turn].name : players[turn^1].name) 
                 + " :)</h3> \
                 <img src='assets/images/" + card_left +"C.png' style='margin-top: 40px;max-width: 150px;height: auto;' alt='' />";
        
        $('#game-board').html(code);
        $('#names-row').empty();

    }

    function draw_game_info(){
        var code =
        "<div class='info-form'> \
            <label for='player-1'> Player 1 Name </label> \
            <input type='text' class='form-control info-input' id='player-1'> \
        </div> \
        <br> \
         <div class='info-form'> \
            <label for='player-2'> Player 2 Name </label> \
            <input type='text' class='form-control info-input' id='player-2'> \
        </div> \
        <br> \
         <div class='info-form'> \
            <label for='number-of-cards'> Number of Cards</label> \
            <input type='text' class='form-control info-input' id='number-of-cards' value='5'>";
        $('#side_bar').html(code);
        is_cheatsheet = false;
    }

    function draw_cheatsheet(){
        var code =
        "<div class='overflow-auto' id='cheatsheet'></div>";
        $('#side_bar').html(code);
        is_cheatsheet = true;
    }

    function update_cheatsheet(string) {
        $('#cheatsheet').append(string + "<br>");
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

        if(num_of_cards <= 1 || num_of_cards > 13) {
            update_error("The number of cards should be in the range [3, 13].");
            return false;
        }

        return true;
    }

    function is_a_valid_question() {
        var asked_from_num = $("#asked_from_number").val();
        var asked_to_num = $("#asked_to_number").val();
        var guessed_num = $("#guessed_number").val();


        if((asked_from_num != ""||asked_to_num!="") && guessed_num != "") {
            update_error("You can not both ask and guesss a card in the same turn.");
            return;
        }
        if ((asked_from_num == "" || asked_to_num=="") && guessed_num == "") {
            update_error("You should either ask or guesss a card in the this turn.");
            return;
        }

        if (asked_from_num != ""&&asked_to_num!="") {
            asked_from_number = parseInt(asked_from_num);
            asked_to_number = parseInt(asked_to_num);
            if (!(asked_from_number >= 1 && 
                asked_from_number <= num_of_cards && 
                asked_to_number >= 1 && 
                asked_to_number <= num_of_cards)) {
                update_error("The card number you ask should be in the range [1, " + num_of_cards + "]");
                return false;
            } else if(asked_from_number>asked_to_number){
                update_error("The to number should be no less than from number");
                return false;
            } else{
                return true;
            } 
        } else {
            guessed_number = parseInt(guessed_num);
            if (!(guessed_number >= 1 && guessed_number <= num_of_cards)) {
                update_error("The card number you guess should be in the range [1, " + num_of_cards + "]");
                return false;
            } else {
                return true;
            }
        }
    }

    function is_a_valid_answer() {
        var should_be_yes = true;
        for(var i =asked_from_number;i<=asked_to_number;i++)
            if(!players[turn^1].cards.includes(i))
                should_be_yes = false;
        if (($('#yes').is(":checked") && !should_be_yes) 
            || ($('#no').is(":checked") && should_be_yes)){
            update_error("You should answer the question honestly.");
            return false;
        } else {
            update_cheatsheet(players[turn^1].name +": "+ (should_be_yes ? "Yes" : "No"));
            return true;
        }

    }

    function update_error(err) {
        $('#error-message').html(err);
        $('#error-container').show();
    }

    function erase_error() {
        $('#error-message').parent().hide();
    }
})
