
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.removeAttribute('loop');
  video.addEventListener('canplay', () => { video.play().catch(() => {}); });
  video.addEventListener('ended', () => {
    try {
      video.currentTime = Math.max(0, video.duration - 0.01);
      video.pause();
    } catch (e) {}
  });
});
