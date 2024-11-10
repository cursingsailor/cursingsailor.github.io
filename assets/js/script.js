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
