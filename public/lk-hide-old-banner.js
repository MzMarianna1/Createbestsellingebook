(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;

  const hideLegacyBanner = () => {
    const images = Array.from(document.querySelectorAll('img'));
    const banner = images.find((img) => /learning-kingdom-banner-v3-graduation-vibe\.png/i.test(`${img.getAttribute('src') || ''} ${img.getAttribute('alt') || ''}`));
    if (!banner) return false;
    const section = banner.closest('section');
    if (!section || section.id === 'lk-fall-hero') return false;
    section.style.display = 'none';
    section.setAttribute('aria-hidden', 'true');
    section.dataset.lkLegacyHidden = 'true';
    return true;
  };

  if (!hideLegacyBanner()) {
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (hideLegacyBanner() || tries > 60) window.clearInterval(timer);
    }, 250);
  }
})();
