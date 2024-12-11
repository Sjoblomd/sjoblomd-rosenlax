let casinoOpen = true; // Allmän öppet/stängt-status
let globalCasinoStatus = null; // Global överstyrning (null = ingen överstyrning, true = tvinga öppet, false = tvinga stängt)

function updateCasinoStatus() {
    if (globalCasinoStatus !== null) {
        // Om global överstyrning är aktiv
        if (globalCasinoStatus) {
            document.getElementById('casino-status').textContent = "Casino is open! (Global Override)";
            enableLinksAndButtons(document.querySelectorAll('a'), document.querySelectorAll('button'));
        } else {
            document.getElementById('casino-status').textContent = "Casino is closed! (Global Override)";
            disableLinksAndButtons(document.querySelectorAll('a'), document.querySelectorAll('button'));
        }
        return;
    }

    const now = new Date();
    const day = now.getDay(); // Hämtar veckodag (0 = söndag, 6 = lördag)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const timeDisplay = document.getElementById('time-display');
    const casinoStatus = document.getElementById('casino-status');
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');

    // Uppdaterar tidsvisningen
    timeDisplay.textContent = `${now.toLocaleDateString()} kl ${now.toLocaleTimeString()}`;

    // Kontrollera om casinot är stängt
    if (day === 0 || day === 6) {
        casinoOpen = false;
        casinoStatus.innerHTML = `<p>Casino is closed. We open at 00:00.</p>`;
        disableLinksAndButtons(links, buttons);

        // Nedräkning till öppning
        const secondsTillOpen = ((7 - day) % 7) * 24 * 60 * 60 - (hours * 3600 + minutes * 60 + seconds);
        const hoursTillOpen = Math.floor(secondsTillOpen / 3600);
        const minutesTillOpen = Math.floor((secondsTillOpen % 3600) / 60);
        const secondsRemaining = secondsTillOpen % 60;
        casinoStatus.innerHTML += `<p id="countdown">Time until open: ${hoursTillOpen}h ${minutesTillOpen}m ${secondsRemaining}s</p>`;
    } else {
        casinoOpen = true;
        casinoStatus.textContent = "Casino is open!";
        enableLinksAndButtons(links, buttons);
    }
}

function disableLinksAndButtons(links, buttons) {
    // Inaktivera länkar och knappar
    links.forEach(link => {
        if (!link.closest('#admin-controls')) {
            link.classList.add('closed');
            link.setAttribute('disabled', true);
        }
    });
    buttons.forEach(button => {
        if (!button.closest('#admin-controls')) {
            button.classList.add('closed');
            button.setAttribute('disabled', true);
        }
    });
}

function enableLinksAndButtons(links, buttons) {
    // Aktivera länkar och knappar
    links.forEach(link => {
        if (!link.closest('#admin-controls')) {
            link.classList.remove('closed');
            link.removeAttribute('disabled');
        }
    });
    buttons.forEach(button => {
        if (!button.closest('#admin-controls')) {
            button.classList.remove('closed');
            button.removeAttribute('disabled');
        }
    });
}

// Globala överstyrningsfunktioner
function forceCasinoOpen() {
    globalCasinoStatus = true; // Tvinga casinot öppet
    updateCasinoStatus();
    alert("Global override activated! Casino is now open.");
}

function forceCasinoClosed() {
    globalCasinoStatus = false; // Tvinga casinot stängt
    updateCasinoStatus();
    alert("Global override activated! Casino is now closed.");
}

function resetGlobalOverride() {
    globalCasinoStatus = null; // Återställ till normal drift
    updateCasinoStatus();
    alert("Global override reset! Normal schedule resumed.");
}

// Lägg till händelselyssnare för administratörsknappar
document.getElementById('force-open-button').addEventListener('click', forceCasinoOpen);
document.getElementById('force-close-button').addEventListener('click', forceCasinoClosed);
document.getElementById('reset-override-button').addEventListener('click', resetGlobalOverride);

// Visa administratörsknappar (Ctrl + B)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'b') {
        document.getElementById('admin-controls').style.display = 'block';
    }
});

// Uppdatera tid och casinostatus varje sekund
setInterval(updateCasinoStatus, 1000);
updateCasinoStatus();

