let countdownInterval;
const timerContainer = document.querySelector(".game-timer");

function startTimer() {
    const playTime = parseInt(document.getElementById("play-time").value);

    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + playTime);

    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });//formatering
    document.getElementById("timer-info").textContent = `Your game session will end at ${formattedEndTime}`;

    const totalSeconds = playTime * 60;
    startCountdown(totalSeconds, endTime);
    timerContainer.style.display = 'none';
}

function startCountdown(durationInSeconds, endTime) {
    clearInterval(countdownInterval);

    const timer = document.getElementById("timer");

    function updateTimer() {
        const now = new Date();
        const remainingTime = Math.floor((endTime - now) / 1000); //fåå närä nummer

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            timer.textContent = "00:00:00";
            alert("Your game session has ended. The game will now close.");
            window.location.href = "index.html"; // To start sidan efter tiden slut
            timerContainer.style.display = 'block';
            return;
        }

        //Räknar ut tiderna
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        timer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;// gör att alltid finns en nummer före så att de är 05 och inte 5
    }

    updateTimer(); // starta upp timern
    countdownInterval = setInterval(updateTimer, 1000); //uppdaterar varje sekund för att de ska se bra ut
}
