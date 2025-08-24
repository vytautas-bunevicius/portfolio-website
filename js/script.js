/**
 * Initializes event listeners and functionality when the DOM is fully loaded.
 * Handles smooth scrolling, fullscreen toggling, and dark mode features.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling to "My Work" section
  const myWorkLink = document.getElementById('my-work-link');
  if (myWorkLink) {
    myWorkLink.addEventListener('click', () => {
      document.getElementById('my-work-section').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Fullscreen functionality for iframe content
  const fullscreenBtns = document.querySelectorAll('.fullscreen-btn, #fullscreenBtn');
  
  fullscreenBtns.forEach(function(fullscreenBtn) {
    if (fullscreenBtn) {
      const iframeContainer = fullscreenBtn.closest('.iframe-container') || fullscreenBtn.closest('#iframe-container');
      let isFullScreen = false;

      const fullscreenEnabled = !!(document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled);

      /**
       * Toggles fullscreen mode using native API or fallback styling.
       */
      async function toggleFullScreen() {
        if (fullscreenEnabled && iframeContainer) {
          try {
            // Handle native fullscreen for desktop browsers
            if (!document.fullscreenElement && 
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement && 
                !document.msFullscreenElement) {
              
              if (iframeContainer.requestFullscreen) {
                await iframeContainer.requestFullscreen();
              } else if (iframeContainer.mozRequestFullScreen) {
                await iframeContainer.mozRequestFullScreen();
              } else if (iframeContainer.webkitRequestFullscreen) {
                await iframeContainer.webkitRequestFullscreen();
              } else if (iframeContainer.msRequestFullscreen) {
                await iframeContainer.msRequestFullscreen();
              }
            } else {
              if (document.exitFullscreen) {
                await document.exitFullscreen();
              } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
              }
            }
          } catch (error) {
            console.warn('Fullscreen operation failed:', error);
          }
      } else {
        // Fallback for mobile devices without fullscreen API
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

      /**
       * Updates the fullscreen button's visual state based on fullscreen status.
       */
      function updateFullscreenButtonState() {
        if (fullscreenEnabled) {
          isFullScreen = !!(document.fullscreenElement || 
            document.mozFullScreenElement ||
            document.webkitFullscreenElement || 
            document.msFullscreenElement);
        }

      // Create SVG for minimize (exit fullscreen)
      const minimizeSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="5,11 1,15 5,15"></polyline>
          <polyline points="11,15 15,15 15,11"></polyline>
          <polyline points="15,5 15,1 11,1"></polyline>
          <polyline points="5,1 1,1 1,5"></polyline>
        </svg>
      `;

      // Create SVG for maximize (enter fullscreen)
      const maximizeSvg = `
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="5,1 1,1 1,5"></polyline>
          <polyline points="15,5 15,1 11,1"></polyline>
          <polyline points="1,11 1,15 5,15"></polyline>
          <polyline points="11,15 15,15 15,11"></polyline>
        </svg>
      `;

        fullscreenBtn.innerHTML = isFullScreen ? minimizeSvg : maximizeSvg;
      }

      if (fullscreenEnabled) {
        // Add fullscreen change listeners for all browser variants
        document.addEventListener('fullscreenchange', updateFullscreenButtonState);
        document.addEventListener('mozfullscreenchange', updateFullscreenButtonState);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
        document.addEventListener('MSFullscreenChange', updateFullscreenButtonState);
      }

      // Handle Escape key press to exit fullscreen
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isFullScreen) {
          isFullScreen = false;
          updateFullscreenButtonState();
        }
      });

      // Set initial button state
      updateFullscreenButtonState();
    }
  });

  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');

  // Initialize dark mode from localStorage, default to false
  let darkMode = localStorage.getItem('darkMode') === 'true';

  /**
   * Applies or removes dark mode styling and updates localStorage.
   * @param {boolean} isDark - Whether dark mode should be enabled.
   */
  function setDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (lightIcon && darkIcon) {
      lightIcon.style.display = isDark ? 'none' : 'block';
      darkIcon.style.display = isDark ? 'block' : 'none';
    }
    localStorage.setItem('darkMode', isDark.toString());
  }

  // Apply initial dark mode state
  setDarkMode(darkMode);

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      setDarkMode(darkMode);
    });
  }
});