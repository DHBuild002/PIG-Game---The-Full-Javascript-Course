/* GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game */

var roundScore,
  activePlayer,
  gamePlaying;

  //var playerScores;
  // playerScores = [0, 0]

  init();

var p1 = new player("Player 1");
var p2 = new player("Player 2");

function player(name) {
  var self = this;
  self.name = name;
  self.previousScore = [];
  self.totalScore = 0;
  self.roundScore = 0;
  self.roll = function() {
    if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6 + 1);
      console.log(dice);
      var diceDOM = document.querySelector('.dice')
      diceDOM.style.display = 'block';
      console.log(diceDOM)
      diceDOM.src = 'dice-' + dice + '.png';

      if (dice !== 1) {
        self.roundScore += dice;
        self.previousScore.push(dice);
        document.querySelector('#current-' + activePlayer).textContent = self.roundScore;
        console.log(self.roundScore);
        console.log(self.previousScore);
      } else {
        nextPlayer();
      }
    }
  }
  self.resetToZero = function() {
    if (previousScore.slice(-1)[0] === 6 && previousScore.slice(-2)[0] === 6) {
      roundScore = 0;
      console.log('Duplicate Detected - Player Scrore resetting to 0');
      nextPlayer();
    }
  }
  self.hold = function() {
    if (gamePlaying) {
      self.roundScore += self.totalScore ;
      document.querySelector('#score-' + activePlayer).textContent = self.roundScore;

      if (self.totalScore >= 50) {
        document.querySelector('#name-' + activePlayer).textContent = 'winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        nextPlayer();
      }
    }
  }
};
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', p1.roll);
document.querySelector('.btn-hold').addEventListener('click',  p1.hold);

function nextPlayer() {
  activePlayer === 1 ?
    activePlayer = 2 :
    activePlayer = 1;
  roundScore = 0;

  document.getElementById('current-' + activePlayer).textContent = '0';
  document.getElementById('current-' + activePlayer).textContent = '0';
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-2-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

function init() {
  activePlayer = 1;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-2').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';
  document.getElementById('name-1').textContent = 'Player 1';
  document.getElementById('name-2').textContent = 'Player 2';
  document.querySelector('.btn-roll').style.display = 'block';

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-2-panel').classList.remove('active');

  document.querySelector('.player-1-panel').classList.add('active');
}

// My Attempts

/*
function checkRepeat(){
				if(previous.slice(-1)[0] === 6 && previous.slice(-2)[0] === 6){
					roundScore = 0;
					console.log('Duplicate Detected - Player Scrore resetting to 0');
					nextPlayer();
				}
			}
*/

/* 1. A player loses his ENTIRE score when he rolls two 6 in a row.
// After that, it's the next player's turn. (Hint: Always
// save the previous dice roll in a separate variable)
*/

/*
2. Add an input field to the HTML where players can set the winning score, so that they can change the
// predefined score of 100. (Hint: you can read that value with the
// .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
// (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
