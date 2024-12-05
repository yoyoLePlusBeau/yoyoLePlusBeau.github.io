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
  EcrireRecord();
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
const dialogRecord = document.getElementById("dialogRecord")

if (localStorage.getItem("recordEssaie")===null) {
  localStorage.setItem("recordEssaie", 100);
  console.log("100");
  nbRecord.innerText = ("Record : ? cartes tournées en ?s");
}
else if(localStorage.getItem("recordEssaie") < 100){
  console.log(nbRecord.innerText = ("Record : " + localStorage.getItem("recordEssaie") + " cartes tournées en " + localStorage.getItem("recordTemps") + "s"));
  nbRecord.innerText = ("Record : " + localStorage.getItem("recordEssaie") + " cartes tournées en " + localStorage.getItem("recordTemps") + "s");
}

// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", () => {
  dialog.close();
});


// Garde en mémoire le choix de ne plus afficher
function NePlusAfficher() {
  localStorage.setItem("nePlusAfficher", true);
  dialog.close();
}

// Ouvre le dialog au début si tu n'as pas cliqué sur "Ne plus afficher cette fenêtre"
window.onload = function() {
  if (localStorage.getItem("nePlusAfficher") != 'true') {
    dialog.showModal();
  }
  
}

// Si on retourne une carte fait commencer le temps et l'affiche.
// Le nombre d'essaie s'affiche
cards.forEach(card => card.addEventListener("click", Commencer));

let temps = 0;

let valide = true

function Commencer() {
  nbEssaie.innerText = ("Cartes tournées : " + essaie);
  EcrireRecord();

  if (valide) {
    setInterval(Temps, 1000);
    valide = false;
  }
}


// met le record en mémoire et remplace le texte du record par le nouveau record
function EcrireRecord() {
  if (trouve == 6) {
    if (essaie < localStorage.getItem("recordEssaie") || (essaie <= localStorage.getItem("recordEssaie") && temps < localStorage.getItem("recordTemps"))) {
    
    localStorage.setItem("recordEssaie", essaie);
    localStorage.setItem("recordTemps", temps);
    }
    nbRecord.innerText = ("Record : " + localStorage.getItem("recordEssaie") + " cartes tournées en " + localStorage.getItem("recordTemps") + "s");
    dialogRecord.innerText = ("Record : " + localStorage.getItem("recordEssaie") + " cartes tournées en " + localStorage.getItem("recordTemps") + "s");
    DialogDeFin();
  }
}

// augmente le temps tant qu'il reste des cartes à trouver
function Temps () {
  if (trouve != 6) {
    temps++;
  }
  
  nbTemps.innerText = ("Temps : " + temps + "s");
}

// bouton qui efface la mémoire (les records et le "ne plus afficher cette fenêtre")
const boutonEffacer = document.getElementById("effacer");

boutonEffacer.addEventListener("click", effacer);
function effacer() {
  localStorage.clear();
  window.location.reload();
}

// dialog de fin
const dialogFin = document.getElementById("finDePartie");
const boutonFermeFin = document.getElementById("boutonDeFin");

// affiche le dialogue de fin
function DialogDeFin () {
  dialogFin.showModal();
}

// ferme le dialogue de fin
boutonFermeFin.addEventListener("click", () => {
  dialogFin.close();
  window.location.reload();
});