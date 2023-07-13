let score = JSON.parse(localStorage.getItem('score'))|| {
    wins: 0,
    losses: 0,
    ties: 0
};
/*用‘||代替if，如果localStorage有数值则使用，否则用右边的赋值’*/

updateScoreElement()

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove()
      playGame(playerMove);
    }, 3000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

}

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score')
      updateScoreElement()
      document.querySelector('.js-res')
          .innerHTML = `No res`
    })

document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
      autoPlay()
    })

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
    });
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
    });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key ==='p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors')
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let res = ''
  if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
          res = 'You lose'
      } else if (computerMove === 'scissors') {
          res = 'Tie'
      } else if (computerMove === 'paper') {
          res = 'You win'
      }
  }
  if (playerMove === 'rock') {
      if (computerMove === 'rock') {
          res = 'Tie'
      } else if (computerMove === 'scissors') {
          res = 'You win'
      } else if (computerMove === 'paper') {
          res = 'You lose'
      }
  }
  if (playerMove === 'paper') {
      if (computerMove === 'rock') {
          res = 'You win'
      } else if (computerMove === 'scissors') {
          res = 'You lose'
      } else if (computerMove === 'paper') {
          res = 'Tie'
      }
  }

  if (res === 'You win') {
      score.wins += 1;
  } else if (res === 'Tie') {
      score.ties += 1;
  } else if (res === 'You lose') {
      score.losses += 1;
  }
  localStorage.setItem('score', JSON.stringify(score))
  updateScoreElement();
  document.querySelector('.js-res')
      .innerHTML = res

  document.querySelector('.js-moves')
      .innerHTML = `    You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`
  return res;

}
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Win: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber <2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}