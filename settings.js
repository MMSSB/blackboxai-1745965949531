// DOM Elements
const locationMethod = document.getElementById('locationMethod');
const manualLocation = document.getElementById('manualLocation');
const calculationMethod = document.getElementById('calculationMethod');
const asrMethod = document.getElementById('asrMethod');
const saveButton = document.querySelector('button:last-child');

// Load saved settings
function loadSettings() {
    // Load location method
    const savedLocationMethod = localStorage.getItem('locationMethod') || 'auto';
    locationMethod.value = savedLocationMethod;
    manualLocation.style.display = savedLocationMethod === 'manual' ? 'block' : 'none';

    // Load calculation method
    calculationMethod.value = localStorage.getItem('calculationMethod') || 'mwl';
    
    // Load Asr calculation method
    asrMethod.value = localStorage.getItem('asrMethod') || 'standard';

    // Load notification settings
    const notificationToggles = document.querySelectorAll('input[type="checkbox"]');
    notificationToggles.forEach((toggle, index) => {
        const settingKey = index === 0 ? 'notifications' : 'notificationSound';
        toggle.checked = localStorage.getItem(settingKey) !== 'false';
    });
}

// Save settings
function saveSettings() {
    // Save location method
    localStorage.setItem('locationMethod', locationMethod.value);

    // Save manual location if applicable
    if (locationMethod.value === 'manual') {
        const city = document.querySelector('input[placeholder="Enter city name"]').value;
        const country = document.querySelector('input[placeholder="Enter country name"]').value;
        localStorage.setItem('manualCity', city);
        localStorage.setItem('manualCountry', country);
    }

    // Save calculation methods
    localStorage.setItem('calculationMethod', calculationMethod.value);
    localStorage.setItem('asrMethod', asrMethod.value);

    // Save notification settings
    const notificationToggles = document.querySelectorAll('input[type="checkbox"]');
    localStorage.setItem('notifications', notificationToggles[0].checked);
    localStorage.setItem('notificationSound', notificationToggles[1].checked);

    // Show success message
    showNotification('Settings saved successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Toggle manual location fields
locationMethod.addEventListener('change', (e) => {
    manualLocation.style.display = e.target.value === 'manual' ? 'block' : 'none';
});

// Save button click handler
saveButton.addEventListener('click', saveSettings);

// Initialize settings
document.addEventListener('DOMContentLoaded', loadSettings);

// Handle manual location input
const cityInput = document.querySelector('input[placeholder="Enter city name"]');
const countryInput = document.querySelector('input[placeholder="Enter country name"]');

if (cityInput && countryInput) {
    cityInput.value = localStorage.getItem('manualCity') || '';
    countryInput.value = localStorage.getItem('manualCountry') || '';
}

// Add input validation
function validateInputs() {
    if (locationMethod.value === 'manual') {
        const city = cityInput.value.trim();
        const country = countryInput.value.trim();
        
        if (!city || !country) {
            showNotification('Please fill in both city and country fields');
            return false;
        }
    }
    return true;
}

// Update save button to include validation
saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateInputs()) {
        saveSettings();
    }
});
