// Game Score Variable
let playerScores = {
  player1: 0,
  player2: 0,
};
const defaultTimeout = 4000;
let activePlayer = 0;
let totalCurrentScore = 0;
let generated_current_score = 0;
function dice() {
  return Math.round(Math.random() * 5) + 1;
}

function changeActivePlayer() {
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

function scoreManagement(type, activeplayer, toAssign) {
  if (type === 'score') {
    document.getElementById('score-' + activePlayer).textContent = toAssign;
  } else {
    document.getElementById('current-' + activePlayer).textContent = toAssign;
  }
}

function resetOnRequest() {
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  totalCurrentScore = 0;
  activePlayer = 0;
  playerScores.player1 = 0;
  playerScores.player2 = 0;
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('winner');
}

//On CREATE RESET VALUES
resetOnRequest();

document.querySelector('.btn-roll').addEventListener('click', function () {
  //generate Randim Number
  let rand_dice = dice();
  generated_current_score = rand_dice;
  document.querySelector('.ion-ios-loop').style.animation =
    'rotateme 0.5s linear 1';
  //Display image result
  let diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + rand_dice + '.png';

  if (rand_dice > 1) {
    scoreManagement('current', activePlayer, rand_dice);
    totalCurrentScore += rand_dice;
  } else {
    generated_current_score = 0;
    totalCurrentScore = 0;
    scoreManagement('current', activePlayer, 0);
    changeActivePlayer();
    document.querySelector('.dice').style.display = 'none';
  }
});

document.querySelector('.btn-new').addEventListener('click', function () {
  resetOnRequest();
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (generated_current_score > 1) {
    generated_current_score = 0;
    //add Total Current Score to Current Player Main_Score
    if (activePlayer == 0) {
      playerScores.player1 += totalCurrentScore;
      scoreManagement('score', activePlayer, playerScores.player1);
      scoreManagement('current', activePlayer, 0);
      document.querySelector('.dice').style.display = 'none';
      if (playerScores.player1 >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-0-panel').classList.add('winner');
        setTimeout(function () {
          resetOnRequest();
        }, defaultTimeout);
      }
    } else {
      playerScores.player2 += totalCurrentScore;
      scoreManagement('score', activePlayer, playerScores.player2);
      scoreManagement('current', activePlayer, 0);
      document.querySelector('.dice').style.display = 'none';
      if (playerScores.player2 >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-1-panel').classList.add('winner');
        setTimeout(function () {
          resetOnRequest();
        }, defaultTimeout);
      }
    }

    //change Total Current Score to 0
    totalCurrentScore = 0;

    //change Active player and ACTIVE PANNEL
    changeActivePlayer();
  } else {
    console.warn('Please ROLL DICE first');
    alert('Please ROLL DICE first');
  }
});
