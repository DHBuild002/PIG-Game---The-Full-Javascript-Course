/* GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

 */
var roundScore,
    activePlayer;

var gamePlaying = false;
var p1 = new player("Player 1", 1);
var p2 = new player("Player 2", 2);
var activePlayer = null;

// On Page Load - A Blank Slate
beforeInit();

// CLASS
function player(name, id) {
  var self = this;
  self.name = name;
  self.previousScore = [0];
  self.totalScore = 0;
  self.roundScore = 0;
	self.id = id;
	self.clearStreak = function() {
  		self.roundScore = 0;
  		self.previousScore = [0];
	};
  self.roll = function() {
    if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6) + 1;
      var diceDOM = document.querySelector('.dice')
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';
      console.log(dice);

      if (dice !== 1) {
        self.roundScore += dice;
				self.previousScore.push(dice);
				console.log(self.previousScore);
        document.querySelector('#current-' + self.id).textContent = self.roundScore;
				} else {
				self.clearStreak();
        nextPlayer();
      }
    }
  }
  self.resetToZero = function() {
    if (self.previousScore.slice(-1)[0] === 6 && self.previousScore.slice(-2)[0] === 6) {
      console.log('Duplicate Detected - Player Scrore resetting to 0');
			self.clearStreak();
      nextPlayer();
    }
  }
  self.hold = function() {
    if (gamePlaying) {
				self.totalScore += self.roundScore
        document.querySelector('#score-' + self.id).textContent = self.totalScore;
        document.querySelector('#current-' + self.id).textContent = 0;

      if (self.totalScore >= setScore.value) {
        document.querySelector('#name-' + activePlayer.id).textContent = 'winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer.id + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer.id + '-panel').classList.remove('active');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
        gamePlaying = false;
      } else {
				self.clearStreak();
        nextPlayer();
      }
    }
  }
};

// EVENTS
document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-limit').addEventListener('click', set);
document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		activePlayer.roll();
		activePlayer.resetToZero();
	}
});
document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		activePlayer.hold()
	}
});

// FUNCTIONS
function set() {
  var setScore = document.getElementById('setScore').value;
  Number(setScore);
  document.getElementById('limit').innerHTML = setScore;
  document.getElementById('setScore').style.display = 'none';
  init();
}
function beforeInit(){
  if(gamePlaying === false){

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-1').textContent = '-';
    document.getElementById('current-2').textContent = '-';
    document.querySelector('.player-1-panel').classList.remove('active');

    if(setScore.value === '0'){
        document.querySelector('.btn-new').style.display = 'none';
    }
  }
}
function init() {
  activePlayer = p1;
  gamePlaying = true;

  document.getElementById('score-1').textContent = '0';
  document.getElementById('score-2').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';
  document.getElementById('name-1').textContent = 'Player 1';
  document.getElementById('name-2').textContent = 'Player 2';
  document.querySelector('.btn-new').style.display = 'block';

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
	document.querySelector('.btn-roll').style.display = 'block';
	document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('.player-1-panel').classList.add('active');
}
function nextPlayer() {

  activePlayer === p1 ?
    activePlayer = p2 :
    activePlayer = p1;

  document.getElementById('current-1').textContent = '0';
  document.getElementById('current-2').textContent = '0';
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-2-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}
function getSum(total, int){
  if(int >= 0){
  return total + int;
  }
}
/* 1. A player loses his ENTIRE score when he rolls two 6 in a row.
// After that, it's the next player's turn. (Hint: Always
// save the previous dice roll in a separate variable)
DONE!!!!!
*/

// 2. Add an input field to the HTML where players can set the winning score, so that they can change the
// predefined score of 100.
// (Hint: you can read that value with the .value property in JavaScript.
// This is a good oportunity to use google to figure this out :)
// DONE!!!

// 3. Add another dice to the game, so that there are two dices now.
// The player looses his current score when one of them is a 1.
// (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
