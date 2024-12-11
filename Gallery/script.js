const lightbox = document.getElementById('lightbox'); // Elementet för ljusboxen
const lightboxImg = document.getElementById('lightbox-img'); // Bilden som visas i ljusboxen
const lightboxClose = document.getElementById('lightbox-close'); // Stäng-knappen för ljusboxen

// Lägg till klickhändelser på alla miniatyrbilder
document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        lightboxImg.src = thumbnail.getAttribute('data-full'); 
        lightbox.classList.remove('hidden'); 
    });
});

// Lägg till en klickhändelse för att stänga ljusboxen med stäng-knappen
lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden'); // Dölj ljusboxen genom att lägga till klassen 'hidden'
});

// Lägg till en klickhändelse för att stänga ljusboxen om användaren klickar utanför bilden
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) { 
        lightbox.classList.add('hidden'); 
    }
});
