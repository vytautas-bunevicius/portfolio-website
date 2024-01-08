document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;

  // Check if the user has a preference for dark mode using the prefers-color-scheme media query
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial dark mode state based on user preference
  if (prefersDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Toggle dark mode when the button is clicked
  darkModeToggle.addEventListener('click', function () {
    if (body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // Function to enable dark mode
  function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeIcon.setAttribute('fill', '#ffffff'); // Change the icon color in dark mode
  }

  // Function to disable dark mode
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    darkModeIcon.setAttribute('fill', '#000000'); // Change the icon color in light mode
  }

  // Smooth scroll to the "My Work" section when the link is clicked
  const myWorkLink = document.getElementById('my-work-link');
  if (myWorkLink) {
    myWorkLink.addEventListener('click', function (event) {
      event.preventDefault();
      const myWorkSection = document.getElementById('my-work-section');
      if (myWorkSection) {
        myWorkSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
