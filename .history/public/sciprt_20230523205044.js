window.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const skipButton = document.getElementById('skipButton');
  
    playButton.addEventListener('click', function() {
      audioPlayer.play();
    });
  
    pauseButton.addEventListener('click', function() {
      audioPlayer.pause();
    });
  
    skipButton.addEventListener('click', function() {
      // Replace the URL with the next track's URL
      audioPlayer.src = 'https://youtu.be/MK9hxakQMN8';
      audioPlayer.play();
    });
  });