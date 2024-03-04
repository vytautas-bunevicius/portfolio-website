if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

// Check if the fullscreen button exists
if (document.getElementById('fullscreenBtn')) {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const iframeElement = document.getElementById('myIframe');

  // Function to handle fullscreen toggle
  function toggleFullscreen(button) {
    if (!iframeElement.classList.contains('fullscreen')) {
      iframeElement.classList.add('fullscreen');
      button.innerHTML = 'Exit Fullscreen';
      // Push current state to history
      history.pushState({ page: 'fullscreen' }, '', window.location.href);
    } else {
      iframeElement.classList.remove('fullscreen');
      button.innerHTML = 'Go Fullscreen';
      // Push current state to history
      history.pushState({ page: 'normal' }, '', window.location.href);
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
    // Check if the current state is fullscreen
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