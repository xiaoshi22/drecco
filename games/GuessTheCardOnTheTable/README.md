# Guess the Card on the Table
This is an implementation for the game `Guess the Card on the Table`.

## Front-end

#### function breakdown

##### next_phase()

the game contains 4 stages 1-4 accoringly to four phase

  - `QR_CODE`: QR code phase
  - `ASK`: ask phase
  - `ANSWER`: answer phase
  - `GAME_OVER`: game over phase
  
  1. When initialized, the game will shuffle the cards, 
  and generate two QRcode representing the cards for two players.
  2. After the next button has been pressed, 
  the game will be in ask or answer state in turns of player 1 and player 2
  3. Finally when any of two players made a guess, the game is over and show the result.

#### initialize player

Each player has two properities, name and cards.
```
class Player {
        constructor(name, cards) {
            this.name = name;
            this.cards = cards;
        }
    }
```

Name properities are get from the input fields from html

Cards are arrays generated as follow
```
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
```
#### draw_QR_code_phase()

At the QRcode phase, we generate the QRcode with api.qrserver, 
iterate through the cardArray for that player and separate with a comma `,`. Then, display the player name and its according card QRcode img in html.

#### draw_figures()

display figures and dialog container on html

#### draw_figure(index)
display an individual figure
                   
#### draw_ask_phase()

display the options for making an ask or making a guess and provide input fields.
increase turn counts 
                   
#### draw_answer_phase()

display the dialog container and radio box for 'yes' and 'no'

The game will check if player answer honestly, if not, show error message and block the 

                   
#### draw_game_over_phase(did_win)

End the game and show result
- who won the game
- the card left on the table is card_left
                   
#### draw_game_info()

display the Game information
 
including 
- player name 
- number of cards
- start game button

#### draw_cheatsheet()

display the ask and answer history on side bar

### Validation

#### is_valid_game_info(name1, name2)

do validation on the game information

- check if player name is empty
- check if number of card is odd            

#### is_a_valid_question()

in ask phase, do validation on the input
- check the player only do either ask or guess
- check the input is in the range of [1, number_of_cards]

#### is_a_valid_answer()

in answer phase, do validation on the radio box checked
- check if either one of the answer is checked
- check if the player answered honestly

### Error_message

#### update_error()

show error message on side bar

Possible error messages:
```
1. empty name for player
    Please enter the name of player 1. 
    Please enter the name of player 2.

2. invalid number of card input
    The number of cards must be odd.
    The number of cards should be in the range [3, 13].

3. invalid ask and guess input
    You can not both ask and guesss a card in the same turn.
    You should either ask or guesss a card in the this turn.
    The card number you ask should be in the range [1, num_of_cards]
    The card number you guess should be in the range [1, num_of_cards]

4. dishonest answer 
    You should answer the question honestly.
```
#### erase_error()

erase error message on side bar

## Backend
Php

## Libraries
jquery, bootstrap