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
        <h3 id="groupName">Team Winner</h3>
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
                The interesting part is that palyer A could ask player B if B has a card that A has. <br>
                For example, we have cards 1, 2, 3, 4, 5 <br>
                A: 1, 2 <br>
                B: 3, 4 <br>
                5 is left on the table <br>
                <br> 
                1st turn: <br>
                A: "do you have 1?" <br>
                B: "no"<br>
                <br>
                2nd turn:<br>
                B: "do you have 2?"<br>
                A: "yes"<br>
                <br>
                3rd turn:<br>
                A: "do you have 4?"<br>
                B: "yes"<br>
                <br>
                4st turn:<br>
                B: "5 is on the table!"<br>
                <br>
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
	    getScore("GuessTheCardLeft", 0);
	?>
    </div>
        <h3> Play game in pop up window:</h3>
        <form id="gameSettings" class="well"></form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(800,800,"games/GuessTheCardLeft/iframe.html", []);
</script>
</body>
</html>
