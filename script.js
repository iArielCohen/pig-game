'use strict';

const player0 = document.querySelector('.player--0 ');
const player1 = document.querySelector('.player--1 ');

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, arePlaying;

const init = function () {

    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    arePlaying = true;

    diceElement.classList.remove("hidden");
    btnRoll.classList.remove("hidden");
    btnHold.classList.remove("hidden");

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0.textContent = 0
    current1.textContent = 0

    diceElement.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player0.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function () {
    if (arePlaying) {
        const dice = Math.trunc(Math.random() * 5) + 1;
        diceElement.classList.remove("hidden");
        diceElement.src = `../images/dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (arePlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 50) {
            arePlaying = false;
            diceElement.classList.add("hidden");
            btnRoll.classList.add("hidden");
            btnHold.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener("click", init)