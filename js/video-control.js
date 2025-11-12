document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('hero-video');
  const gif = document.getElementById('hero-gif');
  
  if (video) {
    // Ensure video loops properly
    video.loop = true;
    
    // Try to play the video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        // Video failed to play, show GIF fallback
        console.log('Video autoplay prevented, using GIF fallback:', error);
        if (gif) {
          video.style.display = 'none';
          gif.style.display = 'block';
        }
      });
    }
    
    // Handle video loading errors
    video.addEventListener('error', function() {
      console.log('Video failed to load, using GIF fallback');
      if (gif) {
        video.style.display = 'none';
        gif.style.display = 'block';
      }
    });
    
    // Check if video can actually play
    video.addEventListener('loadeddata', function() {
      // Video loaded successfully
      if (gif) {
        gif.style.display = 'none';
      }
    });
  } else if (gif) {
    // No video element, show GIF
    gif.style.display = 'block';
  }
});