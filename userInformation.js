const platform = navigator.oscpu || navigator.platform; // Fallback om oscpu inte finns
const browser = navigator.userAgent;
const language = navigator.language;

console.log("User Information:");
console.log(`Platform: ${platform}`);
console.log(`Browser: ${browser}`);
console.log(`Language: ${language}`);

// Skärmstorlek
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log("Screen and Window Info:");
console.log(`Screen Resolution: ${screenWidth}x${screenHeight}`);
console.log(`Window Size: ${windowWidth}x${windowHeight}`);


console.log("Screen and Window Info:");
console.log(`Screen Resolution: ${screenWidth}x${screenHeight}`);
console.log(`Window Size: ${windowWidth}x${windowHeight}`);
// Geolocation (longitud och latitud)
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Geolocation Info:");
            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);

  
        },
        (error) => {
            console.error("The user denied geolocation or an error occurred.");
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}