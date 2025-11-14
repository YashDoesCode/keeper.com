function smoothScrollTo(destination, duration = 4500, offset = 0) {
  console.log('Smooth scroll started...');
  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  const distance = destinationOffsetToScroll - start + offset;

  const easeInOutExpoCustom = (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return Math.pow(2, 30 * t - 15) / 2;
    return (2 - Math.pow(2, -30 * t + 15)) / 2;
  };

  const scroll = () => {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easeInOutExpoCustom(time);
    window.scroll(0, Math.ceil((timeFunction * distance) + start));
    if (Math.abs(window.pageYOffset - (start + distance)) < 1 || time >= 1) {
      window.scroll(0, start + distance);
      console.log('Smooth scroll finished.');
      return;
    }
    requestAnimationFrame(scroll);
  };

  scroll();
}

window.smoothScrollInstance = {
  scrollToElement: (element, offset = 0, duration = 5000) => {
    if (!element) return;
    smoothScrollTo(element, duration, offset);
  },
  scrollTo: (yPosition, offset = 0, duration = 5000) => {
    smoothScrollTo(yPosition, duration, offset);
  }
};