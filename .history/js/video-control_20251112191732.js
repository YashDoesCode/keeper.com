document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('hero-video');
  const gif = document.getElementById('hero-gif');
  
  if (video) {
    video.loop = true;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        console.log('Video autoplay prevented, using GIF fallback:', error);
        if (gif) {
          video.style.display = 'none';
          gif.style.display = 'block';
        }
      });
    }
    video.addEventListener('error', function() {
      console.log('Video failed to load, using GIF fallback');
      if (gif) {
        video.style.display = 'none';
        gif.style.display = 'block';
      }
    });
    video.addEventListener('loadeddata', function() {
      if (gif) {
        gif.style.display = 'none';
      }
    });
  } else if (gif) {
    gif.style.display = 'block';
  }
});