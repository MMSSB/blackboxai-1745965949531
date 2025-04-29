// Prayer times calculation and display
const prayerNames = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
};

// Prayer time calculation helper functions
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

function calculatePrayerTimes(latitude, longitude, date = new Date()) {
    // Prayer time calculation parameters
    const params = {
        fajr: 18, // Dawn twilight angle
        isha: 17, // Night twilight angle
        dhuhr: 12, // Noon
        maghrib: 0, // Sunset
        asr: 1 // Asr shadow factor (Standard = 1, Hanafi = 2)
    };

    // Calculate prayer times based on location and date
    const times = {
        fajr: calculateFajrTime(latitude, date, params.fajr),
        sunrise: calculateSunrise(latitude, date),
        dhuhr: calculateDhuhr(longitude, date),
        asr: calculateAsr(latitude, date, params.asr),
        maghrib: calculateMaghrib(latitude, date),
        isha: calculateIshaTime(latitude, date, params.isha)
    };

    return times;
}

// Calculate Fajr time
function calculateFajrTime(latitude, date, angle) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Simplified calculation (actual implementation would be more complex)
    const jd = getJulianDate(year, month, day);
    const decl = getSunDeclination(jd);
    const t = calculateTimeAngle(-angle, latitude, decl);

    return new Date(date.setHours(t, 0, 0, 0));
}

// Get Julian date
function getJulianDate(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

// Get sun's declination
function getSunDeclination(jd) {
    const d = jd - 2451545.0;
    const g = 357.529 + 0.98560028 * d;
    const q = 280.459 + 0.98564736 * d;
    const l = q + 1.915 * Math.sin(degreesToRadians(g)) + 0.020 * Math.sin(degreesToRadians(2 * g));
    const e = 23.439 - 0.00000036 * d;
    const ra = radiansToDegrees(Math.atan2(Math.cos(degreesToRadians(e)) * Math.sin(degreesToRadians(l)), Math.cos(degreesToRadians(l))));
    return radiansToDegrees(Math.asin(Math.sin(degreesToRadians(e)) * Math.sin(degreesToRadians(l))));
}

// Calculate time angle
function calculateTimeAngle(angle, latitude, declination) {
    const lat = degreesToRadians(latitude);
    const decl = degreesToRadians(declination);
    const t = (1/15) * radiansToDegrees(Math.acos((-Math.sin(degreesToRadians(angle)) - Math.sin(lat) * Math.sin(decl)) / (Math.cos(lat) * Math.cos(decl))));
    return t;
}

// Display prayer times in the UI
function updatePrayerTimes(latitude, longitude, isTomorrow = false) {
    const date = new Date();
    if (isTomorrow) {
        date.setDate(date.getDate() + 1);
    }

    const times = calculatePrayerTimes(latitude, longitude, date);
    const prayerTimesHTML = Object.entries(times).map(([prayer, time]) => {
        const isNext = isNextPrayer(prayer, time);
        return `
            <div class="prayer-card ${isNext ? 'active' : ''} animate-fade-in">
                <div class="prayer-info">
                    <div class="prayer-name">${prayerNames[prayer]}</div>
                    ${isNext ? '<div class="text-sm text-blue-500 dark:text-blue-400">Next Prayer</div>' : ''}
                </div>
                <div class="prayer-time">${formatTime(time)}</div>
            </div>
        `;
    }).join('');

    prayerTimesContainer.innerHTML = prayerTimesHTML;
}

// Format time to 12-hour format
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Check if this is the next prayer
function isNextPrayer(prayer, time) {
    const now = new Date();
    const prayerTime = new Date(time);
    
    // If prayer time is in the past, it's not next
    if (prayerTime < now) return false;
    
    // Check if this is the earliest upcoming prayer
    const times = Object.values(calculatePrayerTimes(latitude, longitude));
    const upcomingTimes = times.filter(t => t > now);
    return prayerTime.getTime() === Math.min(...upcomingTimes.map(t => t.getTime()));
}

// Calculate other prayer times (simplified versions)
function calculateSunrise(latitude, date) {
    // Simplified calculation
    const baseTime = new Date(date.setHours(6, 0, 0, 0));
    return baseTime;
}

function calculateDhuhr(longitude, date) {
    // Simplified calculation
    const baseTime = new Date(date.setHours(12, 0, 0, 0));
    return baseTime;
}

function calculateAsr(latitude, date, factor) {
    // Simplified calculation
    const baseTime = new Date(date.setHours(15, 30, 0, 0));
    return baseTime;
}

function calculateMaghrib(latitude, date) {
    // Simplified calculation
    const baseTime = new Date(date.setHours(18, 0, 0, 0));
    return baseTime;
}

function calculateIshaTime(latitude, date, angle) {
    // Simplified calculation
    const baseTime = new Date(date.setHours(19, 30, 0, 0));
    return baseTime;
}
