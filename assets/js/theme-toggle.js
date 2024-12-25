// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    const switchInput = document.querySelector('.switch__input'); // Get the toggle input element
    const body = document.body; // Get the body element
  
    // If there's no saved preference in localStorage, check the system's default theme
    if (localStorage.getItem('dark-mode') === 'enabled') {
      body.classList.add('dark-mode'); // Apply dark mode
      switchInput.checked = true; // Check the toggle
    } else if (localStorage.getItem('dark-mode') === 'disabled') {
      body.classList.remove('dark-mode'); // Apply light mode
      switchInput.checked = false; // Uncheck the toggle
    } else {
      // Default to system preference if nothing is stored
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        switchInput.checked = true;
      }
    }
  
    // Listen for changes to the toggle switch
    switchInput.addEventListener('change', function() {
      if (switchInput.checked) {
        body.classList.add('dark-mode'); // Activate dark mode
        localStorage.setItem('dark-mode', 'enabled'); // Save preference to localStorage
      } else {
        body.classList.remove('dark-mode'); // Activate light mode
        localStorage.setItem('dark-mode', 'disabled'); // Save preference to localStorage
      }
    });
  });
  