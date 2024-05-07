document.addEventListener('DOMContentLoaded', (event) => {
  // Link to scroll to "My Work" section
  if (document.getElementById('my-work-link')) {
    document.getElementById('my-work-link').addEventListener('click', () => {
      document.getElementById('my-work-section').scrollIntoView({ behavior: "smooth" });
    });
  }

  // Fullscreen functionality
  if (document.getElementById('fullscreenBtn')) {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const iframeElement = document.getElementById('myIframe');
    const fullscreenIcon = fullscreenBtn.querySelector('img'); // Assuming the <img> tag is a direct child of the button

    // Function to handle fullscreen toggle
    function toggleFullscreen() {
      if (!iframeElement.classList.contains('fullscreen')) {
        // Always push the 'normal' state before entering fullscreen
        history.pushState({ page: 'normal' }, '', window.location.href);

        iframeElement.classList.add('fullscreen');
        fullscreenIcon.src = '../assets/icons/fullscreen.svg'; // Keep the icon the same for simplicity
        history.pushState({ page: 'fullscreen' }, '', window.location.href);
      } else {
        iframeElement.classList.remove('fullscreen');
        fullscreenIcon.src = '../assets/icons/fullscreen.svg'; // Keep the icon the same for simplicity
        history.replaceState({ page: 'normal' }, '', window.location.href);
      }
    }

    // Event listener for fullscreen button click
    fullscreenBtn.addEventListener('click', function() {
      toggleFullscreen(); // No need to pass the button element as an argument
    });

    // Event listener for Escape key press
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && iframeElement.classList.contains('fullscreen')) {
        toggleFullscreen(); // No need to pass the button element as an argument
      }
    });

    // Event listener for popstate (back button) event
    window.addEventListener('popstate', function(event) {
      // Check if the current state exists and is "fullscreen"
      if (event.state && event.state.page === 'fullscreen') {
        // If yes, exit fullscreen
        iframeElement.classList.remove('fullscreen');
        fullscreenIcon.src = '../assets/icons/fullscreen.svg'; // Keep the icon the same for simplicity
      } else if (event.state && event.state.page === 'normal' && iframeElement.classList.contains('fullscreen')) {
        // If the current state is normal and the iframe is in fullscreen, exit fullscreen
        iframeElement.classList.remove('fullscreen');
        fullscreenIcon.src = '../assets/icons/fullscreen.svg'; // Keep the icon the same for simplicity
      }
    });
  }
  const lightIcon = document.getElementById("light-icon");
  const darkIcon = document.getElementById("dark-icon");
  let darkMode = localStorage.getItem('darkMode') === 'true';

  if (darkMode) {
    document.body.classList.add("dark-mode");
    darkIcon.setAttribute("display", "none");
    lightIcon.setAttribute("display", "block");
  } else {
    lightIcon.setAttribute("display", "none");
    darkIcon.setAttribute("display", "block");
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode");

    if (darkMode) {
      lightIcon.setAttribute("display", "block");
      darkIcon.setAttribute("display", "none");
    } else {
      lightIcon.setAttribute("display", "none");
      darkIcon.setAttribute("display", "block");
    }

    // Save the current mode to localStorage
    localStorage.setItem('darkMode', darkMode);
  }

  // Assuming the button with the onclick event is already in your HTML
  document.querySelector('button[onclick="toggleDarkMode()"]').addEventListener('click', toggleDarkMode);
  
});

