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
    const iframeContainer = document.getElementById('iframe-container');
    let isFullScreen = false;

    function toggleFullScreen() {
      if (!isFullScreen) {
        if (iframeContainer.requestFullscreen) {
          iframeContainer.requestFullscreen();
        } else if (iframeContainer.mozRequestFullScreen) {
          iframeContainer.mozRequestFullScreen();
        } else if (iframeContainer.webkitRequestFullscreen) {
          iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) {
          iframeContainer.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }

    fullscreenBtn.addEventListener('click', toggleFullScreen);

    function updateFullscreenButtonState() {
      isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement || 
                        document.mozFullScreenElement || document.msFullscreenElement);
      fullscreenBtn.textContent = isFullScreen ? '✖' : '⛶';
    }

    document.addEventListener('fullscreenchange', updateFullscreenButtonState);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
    document.addEventListener('mozfullscreenchange', updateFullscreenButtonState);
    document.addEventListener('MSFullscreenChange', updateFullscreenButtonState);
  }

  // Dark mode functionality
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