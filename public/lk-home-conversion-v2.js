(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  if (window.__lkFall2026ConversionV2) return;
  window.__lkFall2026ConversionV2 = true;

  const css = `
    :root{--lk-purple:#5f3894;--lk-deep:#321a55;--lk-gold:#e2b83f;--lk-ink:#2b2133;--lk-muted:#695c70;--lk-shadow:0 22px 64px rgba(50,26,85,.16)}
    #lk-conversion-stack,#lk-sticky-cta-v2{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}
    #lk-conversion-stack *{box-sizing:border-box}
    #lk-announcement-v2{background:linear-gradient(90deg,#321a55,#7144a3);color:#fff;padding:11px 18px;text-align:center;font-size:14px;font-weight:800;letter-spacing:.01em;box-shadow:0 8px 26px rgba(50,26,85,.2)}
    #lk-announcement-v2 button{border:0;background:transparent;color:#fff;text-decoration:underline;text-underline-offset:3px;font-weight:900;cursor:pointer;margin-left:8px}
    #lk-hero-v2{position:relative;overflow:hidden;color:var(--lk-ink);padding:62px 24px 52px;background:radial-gradient(circle at 88% 14%,rgba(226,184,63,.28),transparent 26%),radial-gradient(circle at 7% 88%,rgba(114,68,164,.18),transparent 30%),linear-gradient(145deg,#fff 0%,#f6f0ff 58%,#fff9e9 100%);border-bottom:1px solid rgba(95,56,148,.12)}
    #lk-hero-v2::before{content:'';position:absolute;width:360px;height:360px;right:-150px;top:-170px;border-radius:50%;border:2px solid rgba(95,56,148,.08);box-shadow:0 0 0 44px rgba(226,184,63,.06),0 0 0 90px rgba(95,56,148,.04)}
    .lk-shell-v2{max-width:1120px;margin:0 auto;position:relative;z-index:1}
    .lk-eyebrow-v2{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.95);border:1px solid rgba(95,56,148,.16);border-radius:999px;padding:8px 13px;color:var(--lk-deep);font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;box-shadow:0 8px 24px rgba(50,26,85,.08)}
    .lk-eyebrow-v2::before{content:'✦';color:var(--lk-gold);font-size:16px}
    #lk-hero-v2 h1{max-width:920px;margin:18px 0 15px;color:var(--lk-deep);font-size:clamp(38px,6vw,70px);line-height:1.01;letter-spacing:-.048em}
    #lk-hero-v2 h1 span{color:var(--lk-purple)}
    .lk-lead-v2{max-width:860px;margin:0;color:#584c61;font-size:clamp(18px,2.2vw,23px);line-height:1.52}
    .lk-actions-v2{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
    .lk-button-v2{min-height:54px;border-radius:15px;padding:14px 22px;font-size:16px;font-weight:900;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease}
    .lk-button-v2:hover{transform:translateY(-2px)}
    .lk-primary-v2{border:0;background:linear-gradient(135deg,var(--lk-purple),#8654b8);color:#fff;box-shadow:0 15px 34px rgba(95,56,148,.31);animation:lkPulseV2 2.9s ease-in-out infinite}
    .lk-secondary-v2{border:1px solid rgba(95,56,148,.2);background:#fff;color:var(--lk-deep)}
    .lk-micro-v2{margin-top:12px;color:#706278;font-size:13px;line-height:1.45}
    .lk-proof-grid-v2{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:35px}
    .lk-proof-v2{background:rgba(255,255,255,.9);border:1px solid rgba(95,56,148,.12);border-radius:17px;padding:17px;box-shadow:0 10px 30px rgba(50,26,85,.07)}
    .lk-proof-v2 strong{display:block;color:var(--lk-deep);font-size:15px;margin-bottom:4px}.lk-proof-v2 span{color:#685b70;font-size:13px;line-height:1.4}
    #lk-buyer-fit-v2{padding:66px 24px;background:#fff;color:var(--lk-ink);border-bottom:1px solid rgba(95,56,148,.1)}
    .lk-fit-heading-v2{max-width:800px;margin:0 auto 32px;text-align:center}
    #lk-buyer-fit-v2 h2{margin:0 0 11px;color:var(--lk-deep);font-size:clamp(31px,4vw,48px);line-height:1.08;letter-spacing:-.035em}
    .lk-fit-heading-v2 p{margin:0;color:var(--lk-muted);font-size:17px;line-height:1.58}
    .lk-avatar-grid-v2{display:grid;grid-template-columns:repeat(3,1fr);gap:19px}
    .lk-avatar-card-v2{background:linear-gradient(180deg,#fff,#fbf8ff);border:1px solid rgba(95,56,148,.14);border-radius:23px;padding:25px;box-shadow:var(--lk-shadow)}
    .lk-avatar-v2{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--lk-deep),var(--lk-purple));border:4px solid #eee4ff;color:#fff;font-size:22px;font-weight:900;box-shadow:0 9px 22px rgba(95,56,148,.22)}
    .lk-avatar-card-v2 h3{margin:16px 0 8px;color:var(--lk-deep);font-size:20px;line-height:1.25}.lk-avatar-card-v2 p{margin:0;color:#62566a;font-size:15px;line-height:1.58}
    .lk-avatar-card-v2 small{display:block;margin-top:15px;padding-top:14px;border-top:1px solid rgba(95,56,148,.1);color:var(--lk-purple);font-size:13px;font-weight:900;line-height:1.4}
    .lk-package-v2{display:grid;grid-template-columns:1.05fr 1.95fr;gap:20px;align-items:center;margin-top:25px;padding:30px;border-radius:25px;background:linear-gradient(135deg,var(--lk-deep),#7144a3);color:#fff;box-shadow:0 24px 56px rgba(50,26,85,.26)}
    .lk-package-v2 h3{margin:0 0 8px;font-size:26px}.lk-package-v2 p{margin:0;color:#efe7f6;line-height:1.5}
    .lk-package-grid-v2{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.lk-package-item-v2{padding:16px;border-radius:16px;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.18)}
    .lk-package-item-v2 strong{display:block;margin-bottom:4px}.lk-package-item-v2 span{color:#eee6f5;font-size:13px;line-height:1.36}
    .lk-center-v2{justify-content:center}
    #lk-sticky-cta-v2{position:fixed;z-index:99999;left:50%;bottom:15px;transform:translateX(-50%);width:min(720px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px 12px 18px;border-radius:19px;background:rgba(50,26,85,.96);color:#fff;box-shadow:0 20px 52px rgba(0,0,0,.29);backdrop-filter:blur(12px)}
    #lk-sticky-cta-v2 strong{display:block;font-size:15px}#lk-sticky-cta-v2 span{display:block;margin-top:2px;color:#eadff3;font-size:12px}
    .lk-sticky-go-v2{border:0;border-radius:12px;padding:11px 16px;background:linear-gradient(135deg,#f1ca55,#d8a72c);color:#2e1b13;font-weight:900;cursor:pointer;white-space:nowrap}
    .lk-sticky-close-v2{position:absolute;right:-7px;top:-8px;width:25px;height:25px;border-radius:50%;border:1px solid #ddd;background:#fff;color:#3c2558;font-weight:900;cursor:pointer}
    @keyframes lkPulseV2{0%,100%{box-shadow:0 15px 34px rgba(95,56,148,.31)}50%{box-shadow:0 15px 44px rgba(95,56,148,.5)}}
    @media(max-width:900px){.lk-proof-grid-v2{grid-template-columns:1fr 1fr}.lk-avatar-grid-v2{grid-template-columns:1fr}.lk-package-v2{grid-template-columns:1fr}}
    @media(max-width:620px){#lk-hero-v2{padding:47px 18px 38px}#lk-buyer-fit-v2{padding:52px 18px}.lk-actions-v2{display:grid}.lk-button-v2{width:100%}.lk-package-grid-v2{grid-template-columns:1fr}#lk-sticky-cta-v2 span{display:none}}
    @media(prefers-reduced-motion:reduce){.lk-primary-v2{animation:none}.lk-button-v2{transition:none}}
  `;

  const findAssessment = () => {
    const form = Array.from(document.querySelectorAll('form')).find((item) => /Request\s*\$60\s*Assessment|Assessment\s*\+\s*Personalized\s*Plan/i.test(`${item.getAttribute('aria-label') || ''} ${item.textContent || ''}`));
    if (!form) return null;
    const section = form.closest('section') || form.parentElement || form;
    section.id = 'lk-assessment';
    return section;
  };

  const goToAssessment = (event) => {
    if (event) event.preventDefault();
    const target = findAssessment();
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      const field = target.querySelector('input,select,textarea,button');
      if (field && typeof field.focus === 'function') field.focus({ preventScroll: true });
    }, 650);
  };

  const hideLegacyHero = () => {
    const banner = Array.from(document.querySelectorAll('img')).find((img) => /learning-kingdom-banner-v3-graduation-vibe\.png/i.test(`${img.getAttribute('src') || ''} ${img.getAttribute('alt') || ''}`));
    if (!banner) return false;
    const section = banner.closest('section');
    if (!section) return false;
    section.style.setProperty('display', 'none', 'important');
    section.setAttribute('aria-hidden', 'true');
    return true;
  };

  const buildStack = () => {
    const stack = document.createElement('div');
    stack.id = 'lk-conversion-stack';
    stack.innerHTML = `
      <div id="lk-announcement-v2">Fall 2026 enrollment is open • Small-group learning bands begin September 8 <button type="button">Get a personalized plan →</button></div>
      <section id="lk-hero-v2" aria-labelledby="lk-title-v2">
        <div class="lk-shell-v2">
          <span class="lk-eyebrow-v2">Made for bright kids who learn differently</span>
          <h1 id="lk-title-v2">A calmer school year starts with a plan <span>built around your child.</span></h1>
          <p class="lk-lead-v2">Live, confidence-first K–8 homeschool support for families who are tired of piecing everything together. We combine personalized teaching, curriculum, materials, and progress monitoring—without forcing your child into a one-size-fits-all method.</p>
          <div class="lk-actions-v2"><button class="lk-button-v2 lk-primary-v2" type="button">Get My Child’s $60 Learning Path</button><button class="lk-button-v2 lk-secondary-v2" type="button">See Who We Help</button></div>
          <div class="lk-micro-v2">The personalized plan is yours whether or not you enroll. Funding guidance is available for ESA, Step Up/EMA, ClassWallet, and approved charter programs.</div>
          <div class="lk-proof-grid-v2"><div class="lk-proof-v2"><strong>Live small groups</strong><span>Peer connection with personal support</span></div><div class="lk-proof-v2"><strong>Personalized curriculum</strong><span>Built from real strengths and gaps</span></div><div class="lk-proof-v2"><strong>Materials included</strong><span>Less hunting, printing, and planning</span></div><div class="lk-proof-v2"><strong>Progress monitoring</strong><span>Know what moved and what comes next</span></div></div>
        </div>
      </section>
      <section id="lk-buyer-fit-v2" aria-labelledby="lk-buyer-title-v2">
        <div class="lk-shell-v2">
          <div class="lk-fit-heading-v2"><h2 id="lk-buyer-title-v2">Built for families like yours.</h2><p>These privacy-safe parent avatars are modeled from the needs of recent Learning Kingdom buyers. We never use customer photos or identities without permission.</p></div>
          <div class="lk-avatar-grid-v2">
            <article class="lk-avatar-card-v2"><div class="lk-avatar-v2" aria-hidden="true">🧩</div><h3>The overwhelmed homeschool parent</h3><p>Your child is bright, but lessons stall and you are carrying the roles of parent, teacher, curriculum planner, and accountability coach.</p><small>Needs: a complete plan, live support, and less daily conflict</small></article>
            <article class="lk-avatar-card-v2"><div class="lk-avatar-v2" aria-hidden="true">AZ</div><h3>The funding-savvy family</h3><p>You have ESA, Step Up/EMA, ClassWallet, or approved charter funds and need a provider who can make the path clear instead of adding another portal loop.</p><small>Needs: funding-friendly steps and one dependable learning home</small></article>
            <article class="lk-avatar-card-v2"><div class="lk-avatar-v2" aria-hidden="true">★</div><h3>The neurodivergent learner’s advocate</h3><p>Your child needs ADHD-, dyslexia-, autism-, or anxiety-aware teaching that uses interests, movement, games, choice, and encouragement.</p><small>Needs: dignity, engagement, and measurable progress</small></article>
          </div>
          <div class="lk-package-v2"><div><h3>What full-year families choose</h3><p>Recent full-year buyers invested in a complete support package—not another worksheet subscription.</p></div><div class="lk-package-grid-v2"><div class="lk-package-item-v2"><strong>32 weeks</strong><span>Personalized live academic instruction</span></div><div class="lk-package-item-v2"><strong>Curriculum + materials</strong><span>Resources matched to the learner</span></div><div class="lk-package-item-v2"><strong>Assessment + monitoring</strong><span>A clear start and ongoing progress checks</span></div></div></div>
          <div class="lk-actions-v2 lk-center-v2"><button class="lk-button-v2 lk-primary-v2" type="button">Start With the $60 Learning Path</button></div>
        </div>
      </section>`;
    return stack;
  };

  const mount = () => {
    if (document.getElementById('lk-conversion-stack')) return true;
    const siteRoot = document.querySelector('#SITE_CONTAINER');
    const banner = Array.from(document.querySelectorAll('img')).find((img) => /learning-kingdom-banner-v3-graduation-vibe\.png/i.test(`${img.getAttribute('src') || ''} ${img.getAttribute('alt') || ''}`));
    const assessment = findAssessment();
    if (!document.body || !document.head || !siteRoot || !banner || !assessment) return false;

    document.querySelectorAll('#lk-fall-announcement,#lk-fall-hero,#lk-buyer-fit,#lk-sticky-cta').forEach((el) => el.remove());
    document.documentElement.classList.remove('lk-fall-conversion-ready');

    const style = document.createElement('style');
    style.id = 'lk-conversion-v2-styles';
    style.textContent = css;
    document.head.appendChild(style);

    const stack = buildStack();
    document.body.insertBefore(stack, siteRoot);

    const sticky = document.createElement('div');
    sticky.id = 'lk-sticky-cta-v2';
    sticky.innerHTML = '<div><strong>Ready for a calmer school year?</strong><span>Start with a live assessment + personalized plan.</span></div><button class="lk-sticky-go-v2" type="button">Start for $60</button><button class="lk-sticky-close-v2" type="button" aria-label="Close">×</button>';
    document.body.appendChild(sticky);

    stack.querySelector('#lk-announcement-v2 button').addEventListener('click', goToAssessment);
    stack.querySelector('#lk-hero-v2 .lk-primary-v2').addEventListener('click', goToAssessment);
    stack.querySelector('#lk-hero-v2 .lk-secondary-v2').addEventListener('click', () => stack.querySelector('#lk-buyer-fit-v2').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    stack.querySelector('#lk-buyer-fit-v2 .lk-primary-v2').addEventListener('click', goToAssessment);
    sticky.querySelector('.lk-sticky-go-v2').addEventListener('click', goToAssessment);
    sticky.querySelector('.lk-sticky-close-v2').addEventListener('click', () => sticky.remove());

    hideLegacyHero();

    const maintain = new MutationObserver(() => {
      hideLegacyHero();
      findAssessment();
      Array.from(document.querySelectorAll('a,button')).forEach((item) => {
        const text = (item.textContent || '').trim();
        if (/Start My Child.{0,4}s (Assessment|Learning Path)|Learning Path Assessment|Request My \$60 Assessment Plan/i.test(text) && !item.dataset.lkV2Wired) {
          item.addEventListener('click', goToAssessment);
          if (item.tagName === 'A') item.setAttribute('href', '#lk-assessment');
          item.dataset.lkV2Wired = '1';
        }
      });
    });
    maintain.observe(siteRoot, { childList: true, subtree: true });

    const params = new URLSearchParams(location.search);
    if (params.get('start') === 'assessment') window.setTimeout(goToAssessment, 900);
    return true;
  };

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (mount() || attempts > 100) window.clearInterval(timer);
  }, 250);
})();
