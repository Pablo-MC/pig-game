'use strict';

// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting Conditions
const initGame = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   score0.textContent = 0;
   score1.textContent = 0;
   current0.textContent = 0;
   current1.textContent = 0;

   player0.classList.remove('player--winner');
   player1.classList.remove('player--winner');
   player0.classList.add('player--active');
   player1.classList.remove('player--active');
   dice.classList.add('hidden');
}

const switchPlayer = function () {
   currentScore = 0;
   document.querySelector(`#current--${activePlayer}`).textContent = 0;
   activePlayer = activePlayer === 0 ? 1 : 0; // switch active player
   player0.classList.toggle('player--active');
   player1.classList.toggle('player--active');
}

initGame();

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
   if (playing) {
      // Generating a random dice roll
      const randomDice = Math.trunc(Math.random() * 6) + 1;

      // Display dice
      dice.src = `images/dice-${randomDice}.png`;
      dice.classList.remove('hidden');

      // Check for roller 1 
      if (randomDice !== 1) {
         // Add dice to current score
         currentScore += randomDice;
         document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
      } else {
         // Switch to next player
         switchPlayer();
      }
   }
});

btnHold.addEventListener('click', function () {
   if (playing) {
      // Add current score to active player's score
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

      // Check if active player's score is >= 100
      if (scores[activePlayer] >= 100) {
         // Finish the game
         playing = false;
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         dice.classList.add('hidden');
      } else {
         // Switch to next player
         switchPlayer();
      }
   }
});

btnNewGame.addEventListener('click', initGame);


// IMPORTANTE: Si la funcion anonima NO la vamos a reutilizar, entonces la implementamos directamente en el Controlador de Eventos. De lo contrario la asignamos a una variable y luego la pasamos como argumento SIN los paréntesis, de esta manera evitamos que se invoque al ejecutar el script. Por lo tanto dicha función SIN los parentesis se invocará unicamente cuando se ejecute el tipo de evento. Ejemplo: btnNewGame.addEventListener('click', initGame); la funcion initGame se invocará unicamente cuando se haga click en el elemento selecionado y NO al inicio de la ejecución del script. 