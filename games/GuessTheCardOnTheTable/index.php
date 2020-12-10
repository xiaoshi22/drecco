<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <title>Guess the Card on the Table</title>
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Guess the Card on the Table</h1>
        <h3 id="groupName">Team Winner</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <strong>Overview:</strong> <br/>
            
            <p>Initially, we have cards labeled from 1 to 2n + 1. (2n + 1 is in the range
            of [3, 13].) Player A and B both take n cards, and one card is left on the
            table. (They do not know each other's cards, and the goal is to guess the
            card on the table.) In each turn, one player asks the other player:
            "Do you have all cards from x to y?" where y >= x. The other player must
            answer the question honestly. The system will check.<br>

            Players alternate in asking questions. A player may guess after
            receiving the answer saying something to the effect
            "I guess the card left on the table is i (for some i up to 2n+1)" The 
            guessing player loses the game if his/her guess is wrong; 
            otherwise, he/she wins. Each
            player takes the lead in one of the two rounds. If someone wins both
            rounds, he/she wins. If each wins once, the one who guesses correctly in fewer
            turns wins.
            </p>
            <strong>Example:</strong> <br/>
                The interesting part: player A could mislead player B by asking player B if B has a card that A has. <br>
                For example, we have cards 1, 2, 3, 4, 5. <br>
                A has card 1 and 2.<br>
                B has card 3 and 4. <br>
                Thus, 5 is left on the table. <br>
                <br> 
                1st turn: <br>
                A: "Do you have card 1?" <br>
                B: "No."<br>
                <br>
                2nd turn:<br>
                B: "Do you have card 2?"<br>
                A: "Yes."<br>
                <br>
                3rd turn:<br>
                A: "Do you have card 4?"<br>
                B: "Yes."<br>
                <br>
                4th turn:<br>
                B: "I guess the card left is 5."<br>
                <br>
                Because B had 3 and 4, so B knew 1, 2 and 3 might be 
                left on the table. And After A asked the card 1 after the first turn and got a negative response, 
                A did not claim 1 was left on the table in the third turn. 
                Thus, B knew A asked a card he had. 
                So, he knew A has 1 and 2. Therefore, B is confident to say 5 is on the table in the fourth turn.
        </div>
        <h3>Leaderboard:</h3>
	<div id="scoreArea", class="jumbotron">
	<?php 
	    include $base."getScore.php";
	    /*
	    * arg1: gameName, should be the same as the dir name 
	    * arg2: if your score is sortable, pass 1 if higher score is better, 0
	    *       if smaller score is better. Otherwise no need to pass variable
	    *       
	    */
	    getScore("GuessTheCardOnTheTable", 0);
	?>
    </div>
        <h3> Play game in pop up window:</h3>
        <form id="gameSettings" class="well"></form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    // newWindowBtn(800,600,"games/GuessTheCardLeft/game.html", []);
    newWindowBtn(1000,650,"games/GuessTheCardOnTheTable/game.html", []);
</script>
</body>
</html>
