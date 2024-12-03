const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let essaie = 0;
let trouve = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    essaie++;

    return;
  }

  // second click
  secondCard = this;
  essaie++;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  trouve++;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// début de mes modifications

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const nePlusAfficher = document.getElementById("nePlusAfficher");
const jeu = document.querySelector("memory-card");
const nbEssaie = document.getElementById("essaie");
const nbTemps = document.getElementById("temps");
const nbRecord = document.getElementById("record");


// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", () => {
  dialog.close();
});

function NePlusAfficher() {
  dialog.close();
}

// Ouvre le dialog au début
window.onload = function() {
  var dialog = document.getElementById("dialog");
  dialog.showModal();
}

cards.forEach(card => card.addEventListener("click", Donnee));

let temps = 0;
setInterval(Temps, 1000);
let recordEssaie = 9999999999999;
let recordTemps = 9999999999999;

function Donnee() {
  nbEssaie.innerText = ("Cartes tournées : " + essaie);
 
  if (trouve == 6) {
    Fin();
  }
}

function Temps () {
  if (essaie > 0) {
    temps++;
  }
  
  nbTemps.innerText = ("Temps : " + temps + "s");
}

function Fin() {
  if (essaie < recordEssaie) {
    recordEssaie = essaie;
    recordTemps = temps;
  }
  nbRecord.innerText = ("Record : " + recordEssaie + " cartes tournées en " + recordTemps + "s");
  
}