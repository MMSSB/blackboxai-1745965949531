// DOM Elements
const locationElement = document.getElementById('location');
const currentTimeElement = document.getElementById('currentTime');
const currentDateElement = document.getElementById('currentDate');
const hijriDateElement = document.getElementById('hijriDate');
const todayBtn = document.getElementById('todayBtn');
const tomorrowBtn = document.getElementById('tomorrowBtn');
const prayerTimesContainer = document.getElementById('prayerTimes');

// Date formatting options
const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};

// Update current time
function updateTime() {
    const now = new Date();
    currentTimeElement.textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Get user's location
async function getLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        
        // Update location display
        const cityName = data.address.city || data.address.town || data.address.village || 'Unknown location';
        locationElement.innerHTML = `<i class="fas fa-location-dot mr-2"></i>${cityName}`;
        
        // Calculate and display prayer times
        updatePrayerTimes(latitude, longitude);
    } catch (error) {
        locationElement.textContent = 'Unable to get location';
        console.error('Error getting location:', error);
    }
}

// Convert Gregorian to Hijri date
function getHijriDate() {
    const today = new Date();
    const options = { 
        calendar: 'islamic',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    
    const hijriDate = today.toLocaleDateString('en-US', options);
    hijriDateElement.textContent = hijriDate + ' AH';
}

// Initialize the application
function init() {
    getLocation();
    getHijriDate();
    
    // Add event listeners for today/tomorrow toggle
    todayBtn.addEventListener('click', () => {
        todayBtn.classList.add('bg-blue-500', 'text-white');
        tomorrowBtn.classList.remove('bg-blue-500', 'text-white');
        // Recalculate prayer times for today
        getLocation();
    });
    
    tomorrowBtn.addEventListener('click', () => {
        tomorrowBtn.classList.add('bg-blue-500', 'text-white');
        todayBtn.classList.remove('bg-blue-500', 'text-white');
        // Recalculate prayer times for tomorrow
        getLocation(true);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
