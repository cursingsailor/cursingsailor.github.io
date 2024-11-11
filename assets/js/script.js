document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeStyle = document.getElementById('theme-style');

    // Hole den Dark Mode Status aus dem Local Storage
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }

    // Event Listener für den Dark Mode Toggle Button
    toggleButton.addEventListener('click', function () {
        // Überprüfen, ob aktuell das Light Mode-Stylesheet aktiv ist
        if (themeStyle.getAttribute('href').includes('style.css') && !themeStyle.getAttribute('href').includes('dark-style.css')) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    function enableDarkMode() {
        // Setze den Pfad zu dark-style.css dynamisch
        const darkModePath = themeStyle.getAttribute('href').includes('../')
            ? '../assets/css/dark-style.css'
            : 'assets/css/dark-style.css';
        themeStyle.setAttribute('href', darkModePath);

        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('dark-mode', 'enabled');
    }

    function disableDarkMode() {
        // Setze den Pfad zu style.css dynamisch
        const lightModePath = themeStyle.getAttribute('href').includes('../')
            ? '../assets/css/style.css'
            : 'assets/css/style.css';
        themeStyle.setAttribute('href', lightModePath);

        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('dark-mode', 'disabled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const weatherInfo = document.getElementById('weather-info');

    async function fetchWeather() {
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.2082&longitude=16.3738&current_weather=true');
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature); // Aktuelle Temperatur auf ganze Zahl runden
            weatherInfo.innerText = `${temp}°C`;
        } catch (error) {
            console.error('Wetterdaten konnten nicht geladen werden:', error);
            weatherInfo.innerText = 'Wetterdaten nicht verfügbar';
        }
    }

    fetchWeather();
});

document.addEventListener('DOMContentLoaded', function () {
    const textSection = document.querySelector('.text-section');
    
    textSection.addEventListener('mousemove', (event) => {
        const { offsetX, offsetY } = event; // Position der Maus relativ zur Sektion
        const width = textSection.offsetWidth;
        const height = textSection.offsetHeight;

        // Berechnung der Position für den Farbverlauf
        const xPercent = (offsetX / width) * 100;
        const yPercent = (offsetY / height) * 100;

        // Aktualisieren des Hintergrundverlaufs basierend auf der Mausposition
        textSection.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #f0f4f8, #d9e2ec)`;
    });

    // Hintergrund zurücksetzen, wenn Maus die Sektion verlässt
    textSection.addEventListener('mouseleave', () => {
        textSection.style.background = 'linear-gradient(135deg, #f0f4f8, #d9e2ec)';
    });
});

window.addEventListener('scroll', function () {
    const content = document.querySelector('.content-section');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Berechne die Opazität basierend auf der Scrollposition
    const opacity = Math.max(1 - scrollPosition / windowHeight, 0);
    content.style.opacity = opacity;
});
