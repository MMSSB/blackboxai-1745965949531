// Theme handling
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or use system preference
function getThemePreference() {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
    }
    return 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);

    // Add animation to theme toggle button
    themeToggleBtn.classList.add('rotate-180');
    setTimeout(() => {
        themeToggleBtn.classList.remove('rotate-180');
    }, 300);
}

// Initialize theme
function initializeTheme() {
    // Apply initial theme
    const theme = getThemePreference();
    applyTheme(theme);

    // Add event listener for theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Add transition class for smooth theme changes
    document.documentElement.classList.add('transition-colors', 'duration-300');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
