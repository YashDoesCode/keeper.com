
function bindNavDropdowns() {
  const items = document.querySelectorAll('.has-dropdown');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!items.length || !backdrop) return;
  items.forEach(item => {
    let leaveTimer = null;
    item.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimer);
      items.forEach(i => i.classList.remove('open'));
      item.classList.add('open');
      backdrop.classList.add('show');
    });
    item.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(() => {
        if (!item.classList.contains('open')) return;
        item.classList.remove('open');
        backdrop.classList.remove('show');
      }, 700);
    });
    const toggleLink = item.querySelector('.nav-link');
    if (toggleLink) {
      toggleLink.addEventListener('click', event => {
        event.preventDefault();
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
          backdrop.classList.add('show');
        } else {
          backdrop.classList.remove('show');
        }
      });
    }
  });
  backdrop.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('open'));
    backdrop.classList.remove('show');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      items.forEach(i => i.classList.remove('open'));
      backdrop.classList.remove('show');
    }
  });
  let closeOnMoveTimer = null;
  document.addEventListener('mousemove', event => {
    const openItem = document.querySelector('.has-dropdown.open');
    if (!openItem) return;
    const half = window.innerHeight / 2;
    if (event.clientY > half) {
      clearTimeout(closeOnMoveTimer);
      closeOnMoveTimer = setTimeout(() => {
        items.forEach(i => i.classList.remove('open'));
        backdrop.classList.remove('show');
      }, 180);
    } else {
      clearTimeout(closeOnMoveTimer);
    }
  });
}

if (document.readyState !== 'loading') {
  bindNavDropdowns();
}

document.addEventListener('headerLoaded', bindNavDropdowns);
