if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

if (document.getElementById('fullscreenBtn')) {
  document.getElementById('fullscreenBtn').addEventListener('click', function() {
    var elem = document.getElementById('myIframe');
    if (!elem.classList.contains('fullscreen')) {
      elem.classList.add('fullscreen');
      this.innerHTML = 'Exit Fullscreen';
    } else {
      elem.classList.remove('fullscreen');
      this.innerHTML = 'Go Fullscreen';
    }
  });
}
