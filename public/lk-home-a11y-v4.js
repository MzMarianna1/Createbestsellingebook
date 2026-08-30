(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  if (window.__lkHomeA11yV4) return;
  window.__lkHomeA11yV4 = true;

  const LEGACY_IDS = [
    'comp-msl92nrb1',
    'comp-msgzqs4p1__item1',
    'comp-msgzkv495',
    'comp-msgzqs4p1__item-j9plerjk',
    'comp-msgzqs4p1__item-j9ples3e',
    'comp-msat5bgc',
    'comp-msat5bdf'
  ];

  function altFor(img) {
    const src = `${img.getAttribute('src') || ''} ${img.getAttribute('data-src') || ''} ${img.getAttribute('alt') || ''}`.toLowerCase();
    if (src.includes('c584a9_9371640ba9914db48b73976534c8e22a')) return 'Mz. Marianna, founder and tutor at The Learning Kingdom';
    if (src.includes('1b3c7b_e8cf8ff1714149b182ccff7ec5a09a77')) return 'Mz. Katelyn, tutor at The Learning Kingdom';
    if (src.includes('learning%20kingdom%20hero') || src.includes('learning kingdom hero') || src.includes('420e1ade94d044cbb57cc198c895ac1d')) return 'Learning Kingdom personalized K–8 homeschool and tutoring learning path';
    return 'Learning Kingdom educational program illustration';
  }

  function repair() {
    let found = 0;
    LEGACY_IDS.forEach((id) => {
      const root = document.getElementById(id);
      if (!root) return;
      const images = root.matches('img') ? [root] : Array.from(root.querySelectorAll('img'));
      images.forEach((img) => {
        img.setAttribute('alt', altFor(img));
        if (img.getAttribute('aria-label') === '') img.removeAttribute('aria-label');
        found += 1;
      });
    });
    return found;
  }

  repair();
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    const count = repair();
    if (count >= 7 || attempts > 100) clearInterval(timer);
  }, 200);

  const observer = new MutationObserver(() => repair());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();