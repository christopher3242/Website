// script.js

const cities = [
    { name: "Malta", tz: "Europe/Malta" }, 
    { name: "Rome", tz: "Europe/Rome" }, 
    { name: "Catania", tz: "Europe/Rome" } ,
    { name: "London", tz: "Europe/London" },
    { name: "Tokyo", tz: "Asia/Tokyo" },
    { name: "Sydney", tz: "Australia/Sydney" },
    { name: "New York", tz: "America/New_York" },
   
];

let currentIndex = 0;

function updateClock() {
    const currentCity = cities[currentIndex];
    const currentTime = new Date().toLocaleString("en-US", { timeZone: currentCity.tz });
    document.getElementById("cityName").textContent = currentCity.name;
    document.getElementById("timeDisplay").textContent = new Date(currentTime).toLocaleTimeString();
}

function nextCity() {
    currentIndex = (currentIndex + 1) % cities.length;
    updateClock();
}

function previousCity() {
    currentIndex = (currentIndex - 1 + cities.length) % cities.length;
    updateClock();
}

// Event listeners for the buttons
document.getElementById("nextBtn").addEventListener("click", nextCity);
document.getElementById("backBtn").addEventListener("click", previousCity);

// Update the clock every second
setInterval(updateClock, 1000);
updateClock();  // initial call to display time immediately on page load