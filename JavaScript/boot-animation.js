function waitForHeader() {
  if (document.querySelector('.header')) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    document.addEventListener('headerLoaded', resolve, { once: true });
  });
}

function animateHeader() {
  const headerContainer = document.querySelector('.header-container');
  const headerCore = document.querySelector('[data-boot-nav-core]');
  const navWave = document.querySelector('.nav-wave');
  const navLinks = [...document.querySelectorAll('.header .nav-link')];
  const navActions = [...document.querySelectorAll('.header .hamburger-menu')];
  const keeperLogo = document.querySelector('[data-boot-logo]');
  const topRightButtons = document.querySelector('[data-boot-actions]');
  if (!headerContainer || !headerCore) {
    return;
  }
  headerContainer.style.opacity = '0';
  headerContainer.style.transform = 'translateY(-40px) scale(0.7)';
  headerCore.style.transformOrigin = 'center';
  headerCore.style.transform = 'scaleX(0.4)';
  headerCore.style.opacity = '0';
  if (navWave) {
    navWave.style.transformOrigin = 'center';
    navWave.style.transform = 'scaleX(0)';
    navWave.style.opacity = '0';
    navWave.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,1), rgba(255,255,255,0.0))';
  }
  navLinks.forEach(link => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(10px)';
  });
  navActions.forEach(action => {
    action.style.opacity = '0';
    action.style.transform = 'translateY(-8px)';
  });
  const headerTimeline = anime.timeline({ autoplay: false });
  headerTimeline.add({
    targets: headerContainer,
    opacity: [0, 1],
    translateY: ['-40px', '0px'],
    scale: [0.7, 1],
    duration: 600,
    easing: 'easeOutCubic'
  }).add({
    targets: headerCore,
    opacity: [0, 1],
    scaleX: [0.4, 1],
    duration: 420,
    easing: 'easeOutCubic'
  }, '-=420');
  if (navWave) {
    headerTimeline.add({
      targets: navWave,
      opacity: [0, 1, 0],
      scaleX: [0, 1.05],
      duration: 360,
      easing: 'easeOutSine'
    }, '-=200');
  }
  if (navLinks.length) {
    const centerIndex = Math.floor((navLinks.length - 1) / 2);
    const groups = [[navLinks[centerIndex]]];
    for (let offset = 1; offset <= navLinks.length; offset += 1) {
      const left = navLinks[centerIndex - offset];
      const right = navLinks[centerIndex + offset];
      const group = [];
      if (left) group.push(left);
      if (right) group.push(right);
      if (group.length) groups.push(group);
    }
    groups.forEach((group, index) => {
      headerTimeline.add({
        targets: group,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 260,
        easing: 'easeOutQuad'
      }, 460 + index * 140);
    });
  }
  if (navActions.length) {
    headerTimeline.add({
      targets: navActions,
      opacity: [0, 1],
      translateY: [-8, 0],
      duration: 240,
      easing: 'easeOutQuad',
      delay: anime.stagger(60)
    }, '+=60');
  }
  const extras = [keeperLogo, topRightButtons].filter(Boolean);
  if (extras.length) {
    extras.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-6px)';
    });
    headerTimeline.add({
      targets: extras,
      opacity: [0, 1],
      translateY: [-6, 0],
      duration: 260,
      easing: 'easeOutQuad',
      delay: anime.stagger(90)
    }, '+=40');
  }
  headerTimeline.finished.then(() => {
    headerContainer.style.transform = '';
    headerContainer.style.opacity = '';
    headerCore.style.transform = '';
    headerCore.style.opacity = '';
    if (navWave) {
      navWave.style.transform = '';
      navWave.style.opacity = '';
      navWave.style.background = '';
    }
    navLinks.forEach(link => {
      link.style.opacity = '';
      link.style.transform = '';
    });
    navActions.forEach(action => {
      action.style.opacity = '';
      action.style.transform = '';
    });
    extras.forEach(element => {
      element.style.opacity = '';
      element.style.transform = '';
    });
  });
  headerTimeline.play();
}

function startBootSequence() {
  const isHomePage = location.pathname.endsWith('/') || location.pathname.endsWith('index.html');
  if (isHomePage) {
    animateHeader();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  waitForHeader().then(startBootSequence);
});
