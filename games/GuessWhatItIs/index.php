<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
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
        <h1 id="gameName">Guess What It Is</h1>
        <h3 id="groupName">Winner Team</h3>
        <h3>Instruction:</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <strong>Overview:</strong> <br/>
            <p>Initially, we have cards labeled from 1 to 2n + 1. Player A and B both take 
                n cards, and one card left on the table. (They do not know each other's 
                cards, and the goal is guessing the card left on the table.) 
                In every turn, one player asks the other palyer: "Do you have 
                card {1, 2, 3, ... or 2n + 1}?" The other palyer must answer the 
                question honestly. Players ask such questions alternatively. If 
                one player is confident to guess, in his/her turn, the player 
                could say "I guess the card left on the table is ...". The player 
                loses if guess wrong, win if guess correct. 
                
                Both players play the first in one round. If someone wins both rounds, 
                he/she wins. If each wins once, the one guesses correctly in less turns 
                wins.
            </p>
            <strong>Example:</strong> <br/>
                The interesting part is that palyer A could ask player B if B has a card that A has. 
                For example, we have cards 1, 2, 3, 4, 5
                A: 1, 2
                B: 3, 4
                5 is left on the table

                1st turn:
                A: "do you have 1?"
                B: "no"

                2nd turn:
                B: "do you have 2?"
                A: "yes"

                3rd turn:
                A: "do you have 4?"
                B: "yes"

                4st turn:
                B: "5 is on the table!"

                Because B has 3 and 4, so B know 1, 2 and 3 could be left. And After A asks 1 after the first turn, A did not claim 1 is on the table on the third turn. B knows 1 is on A asked a card he has. So, he knows A has 1 and 2. Thus, B is confident to say 5 is left :)
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
	    // TODO: uncomment this in real use
	    // getScore($gameName, $orderFlag);
	?>
	</div>
        <h3>Settings</h3>
        <form id="gameSettings" class="well">
            <h3> If you want to play in a separate window, press popup </h3>
        </form>
        <iframe src="games/GuessWhatItIs/iframe.html" class="game" width="800" height="800"></iframe>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(800,800,"games/GuessWhatItIs/iframe.html", ['textBoxDemo', 'btnDemo', 'selectDemo']);
</script>
</body>
</html>
