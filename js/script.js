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

    // Function to handle fullscreen toggle
    function toggleFullscreen(button) {
      if (!iframeElement.classList.contains('fullscreen')) {
        // Always push the 'normal' state before entering fullscreen
        history.pushState({ page: 'normal' }, '', window.location.href);

        iframeElement.classList.add('fullscreen');
        button.innerHTML = 'Exit Fullscreen';
        history.pushState({ page: 'fullscreen' }, '', window.location.href); // Changed to pushState
      } else {
        iframeElement.classList.remove('fullscreen');
        button.innerHTML = 'Go Fullscreen';
        history.replaceState({ page: 'normal' }, '', window.location.href);
      }
    }

    // Event listener for fullscreen button click
    fullscreenBtn.addEventListener('click', function() {
      toggleFullscreen(this); // Pass the button element as an argument
    });

    // Event listener for Escape key press
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && iframeElement.classList.contains('fullscreen')) {
        toggleFullscreen(fullscreenBtn); // Pass the button element as an argument
      }
    });

    // Event listener for popstate (back button) event
    window.addEventListener('popstate', function(event) {
      // Check if the current state exists and is "fullscreen"
      if (event.state && event.state.page === 'fullscreen') {
        // If yes, exit fullscreen
        iframeElement.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = 'Go Fullscreen';
      } else if (event.state && event.state.page === 'normal' && iframeElement.classList.contains('fullscreen')) {
        // If the current state is normal and the iframe is in fullscreen, exit fullscreen
        iframeElement.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = 'Go Fullscreen';
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