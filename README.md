
Built by https://www.blackbox.ai

---

```markdown
# PrayTime - Modern Islamic Prayer Times

## Project Overview
PrayTime is a web application designed to provide accurate Islamic prayer times based on the user's location. The application features a clean and modern UI built with Tailwind CSS, featuring a dark mode option. Users can view current time, date, and prayer times for today and tomorrow, with the capability to toggle themes. The app also allows users to customize settings related to location and prayer time calculation methods.

## Installation
To run the PrayTime application locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/praytime.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd praytime
   ```

3. Open the `index.html` file in a web browser. The app does not require a server to run as it relies on client-side technologies.

## Usage
- Upon loading, the application automatically retrieves the user's location and displays the current time, date, and prayer times.
- You can toggle between today and tomorrow prayer times using the provided buttons.
- The theme can be changed from light to dark mode using the moon/sun icon in the navigation bar.
- Visit the settings page (`settings.html`) to customize location methods and prayer time calculation preferences.

## Features
- **Automatic Location Detection:** Uses the browser's geolocation capabilities to fetch the user's current location.
- **Prayer Times:** Displays prayer times for Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.
- **Date Information:** Shows the current Gregorian and Hijri dates.
- **Theme Management:** Users can toggle between light and dark themes.
- **Settings Page:** Customize settings for location methods and prayer calculation methods.
- **Responsive Design:** Optimized for various devices, ensuring a good user experience on both desktop and mobile.

## Dependencies
The project uses the following dependencies:
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development.
- **[Font Awesome](https://fontawesome.com/)** - Icons for various UI elements.

The main JavaScript functionalities are implemented in the following files:
- `app.js`: Handles the DOM manipulations, time updates, and prayer time calculations.
- `prayer-times.js`: Contains functions for calculating prayer times based on geographical coordinates.
- `theme.js`: Manages theme toggling and persistence in local storage.

## Project Structure
Here's a brief overview of the project structure:

```
praytime/
│
├── index.html         # The main HTML file for the application
├── settings.html      # HTML file for the settings page
│
├── styles.css         # Custom styles using Tailwind CSS
│
├── app.js             # Main application logic
├── prayer-times.js    # Prayer time calculation logic
├── theme.js           # Theme management script
├── settings.js        # Settings management script
│
└── assets/            # Directory for additional assets like images (if any)
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```