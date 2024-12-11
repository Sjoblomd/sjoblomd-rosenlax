// Ladda sparat tema eller använd standard
function loadTheme() {
    const savedTheme = localStorage.getItem("backgroundTheme");
    const savedTextColor = localStorage.getItem("textColor");

    // Använd sparat tema som bakgrundsfärg för body och innehåll
    if (savedTheme) {
        document.body.style.backgroundColor = savedTheme;
    }

    // Använd sparad textfärg
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
    }
}

// Spara tema i localStorage
function saveTheme(theme) {
    localStorage.setItem("backgroundTheme", theme);
}

// Spara textfärg i localStorage
function saveTextColor(color) {
    localStorage.setItem("textColor", color);
}

// Hantera färgblandning (sliders)
function updateColors() {
    const redSlider = document.getElementById("red-slider");
    const greenSlider = document.getElementById("green-slider");
    const blueSlider = document.getElementById("blue-slider");
    //const textPreview = document.getElementById("text-preview");

    if (redSlider && greenSlider && blueSlider /*&& textPreview*/) {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        const color = `rgb(${red}, ${green}, ${blue})`;

        // Uppdatera textfärg och förhandsvisning
        document.body.style.color = color;
        //textPreview.style.color = color;

        // Spara textfärgen
        saveTextColor(color);
    }
}

// Använd sparat tema och färger när sidan laddas
loadTheme();

// Event listeners för dropdown-menyn
const themeSelector = document.getElementById("theme-selector");
if (themeSelector) {
    themeSelector.addEventListener("change", (event) => {
        const theme = event.target.value;
        document.body.style.backgroundColor = theme === "default" ? "" : theme;
        saveTheme(theme === "default" ? "" : theme);
    });
}

// Event listeners för sliders
const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");

if (redSlider && greenSlider && blueSlider) {
    redSlider.addEventListener("input", updateColors);
    greenSlider.addEventListener("input", updateColors);
    blueSlider.addEventListener("input", updateColors);
}
