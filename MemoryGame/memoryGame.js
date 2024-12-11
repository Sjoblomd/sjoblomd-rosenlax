const container = document.querySelector(".memory-game");
const playAgainButton = document.getElementById('play-again');
const imgArray = [ //gjorde svg bilder för png blev o se helt a** uut
    "../MemoryGame/A.svg",
    "../MemoryGame/B.svg",
    "../MemoryGame/C.svg",
    "../MemoryGame/D.svg",
    "../MemoryGame/E.svg",
    "../MemoryGame/F.svg"];

let imgArrayRandom;
let turnedCards = [];
let pairs = 0;

//spel gånger
function updatePlayCount() {
    let playCount = parseInt(localStorage.getItem("playCount")) || 0;

    playCount++;

    localStorage.setItem("playCount", playCount);

    const playCountE = document.getElementById("play-count");
    playCountE.textContent = `Times played: ${playCount}`;
}

function memoryGame() {
    container.innerHTML = ''; // fixar buggen med att den gorde en ny under den förra (Den tömmer containern förre den bygs upp igen)
    imgArrayRandom = [...imgArray, ...imgArray].sort(() => Math.random() - 0.5); //Dubblar och randomar arrayn me bilderna

    imgArrayRandom.forEach((img) => { //dynamiskt bygger upp korten för spele
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = img; //används för att granska pairs

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${img})`;

        card.appendChild(front);
        card.appendChild(back);

        container.appendChild(card);
    });
    playAgainButton.style.display = 'none';
}

container.addEventListener('click', (event) => { //lyssnaren för knapparna
    const card = event.target.closest('.card');
    if (!card || card.classList.contains('turned') || turnedCards.length === 2) return;

    card.classList.add('turned');//css flip animationen aktiveras här
    turnedCards.push(card); //lägger in i turnedCard arrayn

    if (turnedCards.length === 2) {
        const [card1, card2] = turnedCards;
        updatePlayCount();
        if (card1.dataset.image === card2.dataset.image) { //checka om korten matcha
            pairs += 2;
            turnedCards = [];

            if (pairs === imgArrayRandom.length) { // Om all korten e matchade
                setTimeout(() => {
                    alert("All Pairs Found!");
                    playAgainButton.style.display = 'block';
                }, 500);
            }
        } else { // Om korten inte matcha
            setTimeout(() => {
                card1.classList.remove('turned');
                card2.classList.remove('turned');
                turnedCards = [];
            }, 400);
        }
    }
});

playAgainButton.addEventListener('click', () => { // restart knappens lyssnare
    memoryGame();
});

memoryGame();

window.onload = function () {
    const playCount = parseInt(localStorage.getItem("playCount")) || 0;
    const playCountE = document.getElementById("play-count");
    playCountE.textContent = `Times played: ${playCount}`;
};