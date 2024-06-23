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
    const iframe = document.getElementById('myIframe');
    let isFullScreen = false;

    // Check if native fullscreen is supported
    const fullscreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;

    function toggleFullScreen() {
      if (fullscreenEnabled) {
        // Desktop logic
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
          } else if (iframeContainer.mozRequestFullScreen) {
            iframeContainer.mozRequestFullScreen();
          } else if (iframeContainer.webkitRequestFullscreen) {
            iframeContainer.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
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
      } else {
        // Mobile fallback
        isFullScreen = !isFullScreen;
        if (isFullScreen) {
          iframeContainer.style.position = 'fixed';
          iframeContainer.style.top = '0';
          iframeContainer.style.left = '0';
          iframeContainer.style.width = '100%';
          iframeContainer.style.height = '100%';
          iframeContainer.style.zIndex = '9999';
          document.body.style.overflow = 'hidden';
          fullscreenBtn.style.position = 'fixed';
          fullscreenBtn.style.top = '10px';
          fullscreenBtn.style.right = '10px';
          fullscreenBtn.style.zIndex = '10000';
        } else {
          iframeContainer.style.position = '';
          iframeContainer.style.top = '';
          iframeContainer.style.left = '';
          iframeContainer.style.width = '';
          iframeContainer.style.height = '';
          iframeContainer.style.zIndex = '';
          document.body.style.overflow = '';
          fullscreenBtn.style.position = '';
          fullscreenBtn.style.top = '';
          fullscreenBtn.style.right = '';
          fullscreenBtn.style.zIndex = '';
        }
      }
      updateFullscreenButtonState();
    }

    fullscreenBtn.addEventListener('click', toggleFullScreen);

    function updateFullscreenButtonState() {
      if (fullscreenEnabled) {
        isFullScreen = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
      }
      fullscreenBtn.textContent = isFullScreen ? '✖' : '⛶';
    }

    if (fullscreenEnabled) {
      document.addEventListener('fullscreenchange', updateFullscreenButtonState);
      document.addEventListener('mozfullscreenchange', updateFullscreenButtonState);
      document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
      document.addEventListener('MSFullscreenChange', updateFullscreenButtonState);
    }

    // Ensure correct button state when leaving fullscreen via Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isFullScreen) {
        isFullScreen = false;
        updateFullscreenButtonState();
      }
    });

    // Initial update of button state
    updateFullscreenButtonState();
  }

  // Dark mode functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const lightIcon = document.getElementById("light-icon");
  const darkIcon = document.getElementById("dark-icon");
  
  // Check for saved dark mode preference or default to false
  let darkMode = localStorage.getItem('darkMode') === 'true';

  // Function to set the dark mode
  function setDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (lightIcon && darkIcon) {
      lightIcon.style.display = isDark ? "block" : "none";
      darkIcon.style.display = isDark ? "none" : "block";
    }
    localStorage.setItem('darkMode', isDark);
  }

  // Set initial dark mode
  setDarkMode(darkMode);

  // Toggle dark mode when the button is clicked
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      darkMode = !darkMode;
      setDarkMode(darkMode);
    });
  }
});