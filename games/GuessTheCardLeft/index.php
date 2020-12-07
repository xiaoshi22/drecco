<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <title>Guess the Card Left</title>
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
        <h1 id="gameName">Guess the Card Left</h1>
        <h3 id="groupName">Team Winner</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <strong>Overview:</strong> <br/>
            <p>Initially, we have cards labeled from 1 to 2n + 1. (2n + 1 is in the range of [3, 13].)
                Player A and B both take 
                n cards, and one card is left on the table. (They do not know each other's 
                cards, and the goal is to guess the card left on the table.) 
                In every turn, one player asks the other player: "Do you have 
                card {1, 2, 3, ... or 2n + 1}?" The other player must answer the 
                question honestly. Players ask such questions alternatively. If 
                one player is confident to guess, in his/her turn the player 
                could say "I guess the card left on the table is {1, 2, 3, ... or 2n + 1}". The player 
                loses the game if his/her guess is wrong; otherwise, he/she wins. 
                
                Each player takes the lead in one of the two rounds. If someone wins both rounds, 
                he/she wins. If each wins once, the one guesses correctly in fewer turns 
                wins.
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
                4st turn:<br>
                B: "I guess the card left is 5."<br>
                <br>
                Because B had 3 and 4, so B knew 1, 2 and 3 might be 
                left on the table. And After A asked the card 1 after the first turn and got a negative response, 
                A did not claim 1 was left on the table in the third turn. 
                Thus, B knew A asked a card he had. 
                So, he knew A has 1 and 2. Therefore, B is confident to say 5 is left in the fourth turn :)
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
	    getScore("GuessTheCardLeft", 0);
	?>
    </div>
        <h3> Play game in pop up window:</h3>
        <form id="gameSettings" class="well"></form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    // newWindowBtn(800,600,"games/GuessTheCardLeft/game.html", []);
    newWindowBtn(1000,650,"games/GuessTheCardLeft/game.html", []);
</script>
</body>
</html>
