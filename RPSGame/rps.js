const choices = document.querySelectorAll(".choice");// Väljare för användarens val
const userChoiceText = document.getElementById("user-choice");// Text för att visa användarens val
const computerChoiceText = document.getElementById("computer-choice");// Text för att visa datorns val
const winnerText = document.getElementById("winner");// Text för att visa resultatet
const resetButton = document.getElementById("reset-game");// Knapp för att återställa spelet

// Nya variabler för att hålla reda på poäng
const playerScoreSpan = document.getElementById("player-score");// Element för att visa spelarens poäng
const computerScoreSpan = document.getElementById("computer-score");// Element för att visa datorns poäng

let playerScore = 0;
let computerScore = 0;

const computerChoices = ["rock", "paper", "scissors"];

//gamble
function updateAccountBalance(amount) {
    const currentBalance = parseFloat(localStorage.getItem("depositAmount")) || 0;
    const newBalance = currentBalance + amount;
    localStorage.setItem("depositAmount", newBalance);
    document.getElementById("account-balance").textContent = `Account Balance: ${newBalance} €`;
}
//spel gånger
function updatePlayCount() {
    let playCount = parseInt(localStorage.getItem("playCount")) || 0;

    playCount++;

    localStorage.setItem("playCount", playCount);

    const playCountE = document.getElementById("play-count");
    playCountE.textContent = `Times played: ${playCount}`;
}

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        const userChoice = e.target.dataset.choice;// Hämta användarens val
        const computerChoice = computerChoices[Math.floor(Math.random() * 3)];// Slumpa datorns val

        userChoiceText.textContent = `You chose: ${userChoice}`;
        computerChoiceText.textContent = `Computer chose: ${computerChoice}`;

        const winner = determineWinner(userChoice, computerChoice);
        winnerText.textContent = `Result: ${winner}`;
        updatePlayCount();

        // Uppdatera poäng baserat på vinnaren
        if (winner === "You win!") {
            playerScore++;
            playerScoreSpan.textContent = playerScore;
            updateAccountBalance(10);
        } else if (winner === "Computer wins!") {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
            updateAccountBalance(-5);
        }
    });
});

resetButton.addEventListener("click", () => {
    userChoiceText.textContent = "You chose: ";
    computerChoiceText.textContent = "Computer chose: ";
    winnerText.textContent = "Result: ";

    // Återställ poängen
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
});

function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a draw!";
    }
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "scissors" && computer === "paper") ||
        (user === "paper" && computer === "rock")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

window.onload = function () {
    const playCount = parseInt(localStorage.getItem("playCount")) || 0;
    const playCountE = document.getElementById("play-count");
    playCountE.textContent = `Times played: ${playCount}`;
};