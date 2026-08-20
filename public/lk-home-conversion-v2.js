(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  if (window.__lkFall2026ConversionV3) return;
  window.__lkFall2026ConversionV3 = true;

  const MARIANNA_IMAGE = 'https://static.wixstatic.com/media/c584a9_9371640ba9914db48b73976534c8e22a~mv2.jpg';
  const KATELYN_IMAGE = 'https://static.wixstatic.com/media/1b3c7b_e8cf8ff1714149b182ccff7ec5a09a77~mv2.jpg';

  const css = `
    :root{--lk-purple:#5f3894;--lk-deep:#321a55;--lk-gold:#e2b83f;--lk-gold-light:#f4d778;--lk-ink:#2b2133;--lk-muted:#695c70;--lk-lavender:#f7f2fb;--lk-shadow:0 22px 64px rgba(50,26,85,.16)}
    #lk-conversion-stack,#lk-sticky-cta-v3{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}
    #lk-conversion-stack *{box-sizing:border-box}
    #lk-announcement-v3{background:linear-gradient(90deg,#321a55,#7144a3);color:#fff;padding:11px 18px;text-align:center;font-size:14px;font-weight:800;letter-spacing:.01em;box-shadow:0 8px 26px rgba(50,26,85,.2)}
    #lk-announcement-v3 button{border:0;background:transparent;color:#fff;text-decoration:underline;text-underline-offset:3px;font-weight:900;cursor:pointer;margin-left:8px}
    #lk-hero-v3{position:relative;overflow:hidden;color:var(--lk-ink);padding:70px 24px 58px;background:radial-gradient(circle at 88% 14%,rgba(226,184,63,.28),transparent 26%),radial-gradient(circle at 7% 88%,rgba(114,68,164,.18),transparent 30%),linear-gradient(145deg,#fff 0%,#f6f0ff 58%,#fff9e9 100%);border-bottom:1px solid rgba(95,56,148,.12)}
    #lk-hero-v3::before{content:'';position:absolute;width:390px;height:390px;right:-160px;top:-180px;border-radius:50%;border:2px solid rgba(95,56,148,.08);box-shadow:0 0 0 44px rgba(226,184,63,.06),0 0 0 90px rgba(95,56,148,.04)}
    .lk-shell-v3{max-width:1160px;margin:0 auto;position:relative;z-index:1}
    .lk-hero-grid-v3{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(340px,.92fr);gap:58px;align-items:center}
    .lk-eyebrow-v3{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.95);border:1px solid rgba(95,56,148,.16);border-radius:999px;padding:8px 13px;color:var(--lk-deep);font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;box-shadow:0 8px 24px rgba(50,26,85,.08)}
    .lk-eyebrow-v3::before{content:'*';display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--lk-gold);color:var(--lk-deep);font-size:14px}
    #lk-hero-v3 h1{max-width:710px;margin:18px 0 15px;color:var(--lk-deep);font-size:clamp(42px,5.6vw,70px);line-height:1.01;letter-spacing:-.048em}
    #lk-hero-v3 h1 span{color:var(--lk-purple)}
    .lk-lead-v3{max-width:690px;margin:0;color:#584c61;font-size:clamp(18px,2vw,22px);line-height:1.54}
    .lk-actions-v3{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
    .lk-button-v3{display:inline-flex;align-items:center;justify-content:center;min-height:54px;border-radius:15px;padding:14px 22px;font-size:16px;font-weight:900;cursor:pointer;transition:transform .18s ease,box-shadow .18s ease;text-decoration:none}
    .lk-button-v3:hover{transform:translateY(-2px)}
    .lk-primary-v3{border:0;background:linear-gradient(135deg,var(--lk-purple),#8654b8);color:#fff;box-shadow:0 15px 34px rgba(95,56,148,.31);animation:lkPulseV3 2.9s ease-in-out infinite}
    .lk-secondary-v3{border:1px solid rgba(95,56,148,.2);background:#fff;color:var(--lk-deep)}
    .lk-micro-v3{margin-top:12px;color:#706278;font-size:13px;line-height:1.45}
    .lk-hero-image-v3{position:relative;max-width:440px;justify-self:end}
    .lk-hero-image-v3::before{content:'';position:absolute;inset:-18px 22px 28px -20px;border:1px solid rgba(95,56,148,.24);border-radius:30px;transform:rotate(-3deg)}
    .lk-hero-photo-v3{position:relative;z-index:1;display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:62% 42%;border-radius:26px;border:6px solid rgba(255,255,255,.92);box-shadow:0 30px 70px rgba(50,26,85,.28)}
    .lk-photo-note-v3{position:absolute;z-index:2;left:-26px;bottom:26px;max-width:260px;background:#fff;color:var(--lk-ink);padding:14px 17px;border-radius:16px;box-shadow:0 16px 38px rgba(50,26,85,.24);font-size:14px;line-height:1.35;font-weight:750}
    .lk-photo-note-v3 strong{display:block;color:var(--lk-purple);font-size:16px;margin-bottom:2px}
    .lk-proof-grid-v3{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:36px}
    .lk-proof-v3{background:rgba(255,255,255,.9);border:1px solid rgba(95,56,148,.12);border-radius:17px;padding:17px;box-shadow:0 10px 30px rgba(50,26,85,.07)}
    .lk-proof-v3 strong{display:block;color:var(--lk-deep);font-size:15px;margin-bottom:4px}.lk-proof-v3 span{color:#685b70;font-size:13px;line-height:1.4}
    #lk-buyer-fit-v3{padding:66px 24px;background:#fff;color:var(--lk-ink);border-bottom:1px solid rgba(95,56,148,.1)}
    .lk-section-heading-v3{max-width:800px;margin:0 auto 32px;text-align:center}
    .lk-section-heading-v3 .lk-kicker-v3{margin:0 0 8px;color:var(--lk-purple);font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:13px}
    .lk-section-heading-v3 h2{margin:0 0 11px;color:var(--lk-deep);font-size:clamp(31px,4vw,48px);line-height:1.08;letter-spacing:-.035em}
    .lk-section-heading-v3 p{margin:0;color:var(--lk-muted);font-size:17px;line-height:1.58}
    .lk-avatar-grid-v3{display:grid;grid-template-columns:repeat(3,1fr);gap:19px}
    .lk-avatar-card-v3{background:linear-gradient(180deg,#fff,#fbf8ff);border:1px solid rgba(95,56,148,.14);border-radius:23px;padding:25px;box-shadow:var(--lk-shadow)}
    .lk-avatar-v3{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--lk-deep),var(--lk-purple));border:4px solid #eee4ff;color:#fff;font-size:19px;font-weight:900;box-shadow:0 9px 22px rgba(95,56,148,.22)}
    .lk-avatar-card-v3 h3{margin:16px 0 8px;color:var(--lk-deep);font-size:20px;line-height:1.25}.lk-avatar-card-v3 p{margin:0;color:#62566a;font-size:15px;line-height:1.58}
    .lk-avatar-card-v3 small{display:block;margin-top:15px;padding-top:14px;border-top:1px solid rgba(95,56,148,.1);color:var(--lk-purple);font-size:13px;font-weight:900;line-height:1.4}
    .lk-package-v3{display:grid;grid-template-columns:1.05fr 1.95fr;gap:20px;align-items:center;margin-top:25px;padding:30px;border-radius:25px;background:linear-gradient(135deg,var(--lk-deep),#7144a3);color:#fff;box-shadow:0 24px 56px rgba(50,26,85,.26)}
    .lk-package-v3 h3{margin:0 0 8px;font-size:26px}.lk-package-v3 p{margin:0;color:#efe7f6;line-height:1.5}
    .lk-package-grid-v3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.lk-package-item-v3{padding:16px;border-radius:16px;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.18)}
    .lk-package-item-v3 strong{display:block;margin-bottom:4px}.lk-package-item-v3 span{color:#eee6f5;font-size:13px;line-height:1.36}
    .lk-center-v3{justify-content:center}
    #lk-trust-v3{padding:78px 24px 82px;background:var(--lk-lavender);color:var(--lk-ink)}
    .lk-steps-v3{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-bottom:48px}
    .lk-step-v3{padding:24px 22px 22px;background:#fff;border:1px solid rgba(95,56,148,.14);border-radius:18px;box-shadow:0 12px 34px rgba(50,26,85,.07)}
    .lk-step-number-v3{display:grid;place-items:center;width:38px;height:38px;margin-bottom:15px;border-radius:50%;background:var(--lk-purple);color:#fff;font-weight:900}
    .lk-step-v3 h3{margin:0 0 7px;color:var(--lk-purple);font-size:20px}.lk-step-v3 p{margin:0;color:#584c61;line-height:1.55}
    .lk-human-grid-v3{display:grid;grid-template-columns:.9fr 1.1fr;gap:22px}
    .lk-founder-v3{display:flex;flex-direction:column;justify-content:center;padding:34px;border-radius:22px;background:linear-gradient(145deg,var(--lk-deep),#6d3e9f);color:#fff;box-shadow:var(--lk-shadow)}
    .lk-founder-v3 span{color:var(--lk-gold-light);font-size:13px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.lk-founder-v3 h3{margin:8px 0 12px;font-size:30px;line-height:1.12}.lk-founder-v3 p{margin:0;color:#f0e8f5;line-height:1.62}.lk-founder-v3 strong{display:block;margin-top:18px;color:#fff}
    .lk-tutor-v3{display:grid;grid-template-columns:225px 1fr;min-height:300px;overflow:hidden;background:#fff;border-radius:22px;box-shadow:var(--lk-shadow)}
    .lk-tutor-v3 img{width:100%;height:100%;object-fit:cover;object-position:54% 44%}.lk-tutor-copy-v3{padding:30px 27px;align-self:center}.lk-tutor-copy-v3 span{display:block;color:var(--lk-purple);font-weight:900;font-size:13px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px}.lk-tutor-copy-v3 h3{margin:0 0 9px;color:var(--lk-deep);font-size:26px}.lk-tutor-copy-v3 p{margin:0;color:#5e5266;line-height:1.58}
    .lk-quote-v3{max-width:870px;margin:30px auto 0;padding:24px 28px;text-align:center;background:#fffaf0;border:1px solid #efd99f;border-radius:18px;color:#44334e;font-size:18px;line-height:1.6;font-weight:700}.lk-quote-v3 span{display:block;margin-top:8px;color:var(--lk-purple);font-size:14px}
    #comp-msjjegx4,#comp-msii507q,#comp-msgzkv3s,#comp-msl92njt,#comp-msgzqs44{display:none!important}
    #lk-assessment{height:auto!important;min-height:0!important;padding:78px 24px!important;background:#f6f0fa!important}
    #lk-assessment .comp-msij8949-container{position:relative!important;height:auto!important;min-height:0!important;display:grid!important;grid-template-columns:minmax(260px,360px) minmax(480px,620px)!important;grid-template-rows:auto auto!important;column-gap:54px!important;row-gap:18px!important;align-items:start!important;justify-content:center!important}
    #comp-msijsmo2,#comp-msijvz8b,#comp-msij9nuo{position:static!important;inset:auto!important;transform:none!important;margin:0!important;width:auto!important;max-width:none!important;align-self:start!important;justify-self:stretch!important}
    #comp-msijsmo2{grid-column:1!important;grid-row:1!important}#comp-msijvz8b{grid-column:1!important;grid-row:2!important}#comp-msij9nuo{grid-column:2!important;grid-row:1 / span 2!important;height:auto!important;min-height:0!important}
    #comp-msij9nuo>div{height:auto!important;min-height:0!important}
    #lk-sticky-cta-v3{position:fixed;z-index:99999;left:50%;bottom:15px;transform:translate(-50%,20px);width:min(720px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px 12px 18px;border-radius:19px;background:rgba(50,26,85,.96);color:#fff;box-shadow:0 20px 52px rgba(0,0,0,.29);backdrop-filter:blur(12px);opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease}
    #lk-sticky-cta-v3.lk-sticky-visible{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
    #lk-sticky-cta-v3 strong{display:block;font-size:15px}#lk-sticky-cta-v3 span{display:block;margin-top:2px;color:#eadff3;font-size:12px}
    .lk-sticky-go-v3{border:0;border-radius:12px;padding:11px 16px;background:linear-gradient(135deg,#f1ca55,#d8a72c);color:#2e1b13;font-weight:900;cursor:pointer;white-space:nowrap}.lk-sticky-close-v3{position:absolute;right:-7px;top:-8px;width:25px;height:25px;border-radius:50%;border:1px solid #ddd;background:#fff;color:#3c2558;font-weight:900;cursor:pointer}
    @keyframes lkPulseV3{0%,100%{box-shadow:0 15px 34px rgba(95,56,148,.31)}50%{box-shadow:0 15px 44px rgba(95,56,148,.5)}}
    @media(max-width:900px){.lk-proof-grid-v3{grid-template-columns:1fr 1fr}.lk-avatar-grid-v3{grid-template-columns:1fr}.lk-package-v3{grid-template-columns:1fr}.lk-human-grid-v3{grid-template-columns:1fr}.lk-tutor-v3{grid-template-columns:210px 1fr}}
    @media(max-width:760px){#lk-hero-v3{padding:48px 17px 44px}.lk-hero-grid-v3{grid-template-columns:1fr;gap:38px}.lk-hero-copy-v3{text-align:center}#lk-hero-v3 h1{font-size:42px;margin-left:auto;margin-right:auto}.lk-lead-v3{margin:auto}.lk-actions-v3{justify-content:center;display:grid}.lk-button-v3{width:100%}.lk-hero-image-v3{max-width:340px;justify-self:center}.lk-photo-note-v3{left:-8px;right:-8px;bottom:16px;max-width:none}.lk-proof-grid-v3{grid-template-columns:1fr 1fr}#lk-buyer-fit-v3,#lk-trust-v3{padding:52px 17px}.lk-package-grid-v3,.lk-steps-v3{grid-template-columns:1fr}.lk-steps-v3{margin-bottom:34px}.lk-tutor-v3{grid-template-columns:135px 1fr;min-height:230px}.lk-tutor-copy-v3{padding:20px 18px}.lk-quote-v3{font-size:16px;padding:21px 18px}#lk-assessment{padding:54px 17px!important}#lk-assessment .comp-msij8949-container{grid-template-columns:1fr!important;grid-template-rows:auto auto auto!important;row-gap:20px!important}#comp-msijsmo2{grid-column:1!important;grid-row:1!important}#comp-msijvz8b{grid-column:1!important;grid-row:2!important}#comp-msij9nuo{grid-column:1!important;grid-row:3!important;width:100%!important}#lk-sticky-cta-v3{bottom:8px;padding:9px 9px 9px 12px}#lk-sticky-cta-v3 span{display:none}.lk-sticky-go-v3{padding:11px;font-size:12px}}
    @media(prefers-reduced-motion:reduce){.lk-primary-v3{animation:none}.lk-button-v3,#lk-sticky-cta-v3{transition:none}}
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
      <div id="lk-announcement-v3">Fall 2026 enrollment is open &bull; Small-group learning bands begin September 8 <button type="button">Get a personalized plan &rarr;</button></div>
      <section id="lk-hero-v3" aria-labelledby="lk-title-v3"><div class="lk-shell-v3">
        <div class="lk-hero-grid-v3">
          <div class="lk-hero-copy-v3"><span class="lk-eyebrow-v3">Made for bright kids who learn differently</span><h1 id="lk-title-v3">A calmer school year starts with a plan <span>built around your child.</span></h1><p class="lk-lead-v3">Live, confidence-first K-8 homeschool support for families who are tired of piecing everything together. We combine personalized teaching, curriculum, materials, and progress monitoring without forcing your child into a one-size-fits-all method.</p><div class="lk-actions-v3"><button class="lk-button-v3 lk-primary-v3 lk-assessment-trigger" type="button">Start My Child's $60 Learning Path</button><button class="lk-button-v3 lk-secondary-v3 lk-fit-trigger" type="button">See Who We Help</button></div><div class="lk-micro-v3">One-time $60 &bull; No subscription &bull; The personalized plan is yours whether or not you enroll.</div></div>
          <div class="lk-hero-image-v3"><img class="lk-hero-photo-v3" src="${MARIANNA_IMAGE}" alt="Mz. Marianna, founder and educator at Learning Kingdom" loading="eager" fetchpriority="high"><div class="lk-photo-note-v3"><strong>A caring expert in your corner</strong>Personal guidance built around your child's real learning needs.</div></div>
        </div>
        <div class="lk-proof-grid-v3"><div class="lk-proof-v3"><strong>20+ years</strong><span>Teaching experience</span></div><div class="lk-proof-v3"><strong>Live small groups</strong><span>Peer connection with personal support</span></div><div class="lk-proof-v3"><strong>Materials included</strong><span>Less hunting, printing, and planning</span></div><div class="lk-proof-v3"><strong>Progress monitoring</strong><span>Know what moved and what comes next</span></div></div>
      </div></section>
      <section id="lk-buyer-fit-v3" aria-labelledby="lk-buyer-title-v3"><div class="lk-shell-v3">
        <div class="lk-section-heading-v3"><p class="lk-kicker-v3">You are in the right place if...</p><h2 id="lk-buyer-title-v3">You know your child can thrive with the right support.</h2><p>Learning Kingdom turns the daily guesswork into an expert-guided path that protects confidence and builds real skills.</p></div>
        <div class="lk-avatar-grid-v3"><article class="lk-avatar-card-v3"><div class="lk-avatar-v3" aria-hidden="true">1:1</div><h3>The overwhelmed homeschool parent</h3><p>Your child is bright, but lessons stall and you are carrying the roles of parent, teacher, curriculum planner, and accountability coach.</p><small>Needs: a complete plan, live support, and less daily conflict</small></article><article class="lk-avatar-card-v3"><div class="lk-avatar-v3" aria-hidden="true">AZ</div><h3>The funding-savvy family</h3><p>You have ESA, Step Up/EMA, ClassWallet, or approved charter funds and need a provider who makes the path clear.</p><small>Needs: funding-friendly steps and one dependable learning home</small></article><article class="lk-avatar-card-v3"><div class="lk-avatar-v3" aria-hidden="true">A+</div><h3>The neurodivergent learner's advocate</h3><p>Your child needs ADHD-, dyslexia-, autism-, or anxiety-aware teaching that uses interests, movement, games, choice, and encouragement.</p><small>Needs: dignity, engagement, and measurable progress</small></article></div>
        <div class="lk-package-v3"><div><h3>What full-year families choose</h3><p>A complete support package, not another worksheet subscription.</p></div><div class="lk-package-grid-v3"><div class="lk-package-item-v3"><strong>32 weeks</strong><span>Personalized live academic instruction</span></div><div class="lk-package-item-v3"><strong>Curriculum + materials</strong><span>Resources matched to the learner</span></div><div class="lk-package-item-v3"><strong>Assessment + monitoring</strong><span>A clear start and ongoing progress checks</span></div></div></div>
        <div class="lk-actions-v3 lk-center-v3"><button class="lk-button-v3 lk-primary-v3 lk-assessment-trigger" type="button">Start My Child's $60 Learning Path</button></div>
      </div></section>
      <section id="lk-trust-v3" aria-labelledby="lk-trust-title-v3"><div class="lk-shell-v3">
        <div class="lk-section-heading-v3"><p class="lk-kicker-v3">Clarity first. Confidence next.</p><h2 id="lk-trust-title-v3">A simple, human path from “I'm worried” to “I know what to do.”</h2><p>You do not need another generic worksheet. You need to understand where your child is now and the next right step forward.</p></div>
        <div class="lk-steps-v3"><article class="lk-step-v3"><div class="lk-step-number-v3">1</div><h3>Tell us what you are seeing</h3><p>Share your child's grade, strengths, concerns, and the moments that feel hardest right now.</p></article><article class="lk-step-v3"><div class="lk-step-number-v3">2</div><h3>We find the real gaps</h3><p>A focused assessment helps separate symptoms from the priority skills that need support.</p></article><article class="lk-step-v3"><div class="lk-step-number-v3">3</div><h3>You get a clear plan</h3><p>Walk away with parent-friendly insights and an ordered path you can confidently follow.</p></article></div>
        <div class="lk-human-grid-v3"><article class="lk-founder-v3"><span>Founder-led care</span><h3>Your child is not being handed to an algorithm.</h3><p>Mz. Marianna brings more than 20 years of teaching experience and a whole-child approach that protects confidence while building skill.</p><strong>Patient guidance. Clear communication. A plan made for your child.</strong></article><article class="lk-tutor-v3"><img src="${KATELYN_IMAGE}" alt="Mz. Katelyn, Learning Kingdom tutor" loading="lazy"><div class="lk-tutor-copy-v3"><span>Patient &bull; Encouraging &bull; Pre-K-8</span><h3>Meet Mz. Katelyn</h3><p>A warm tutor who helps children feel safe asking questions, practicing new skills, and celebrating meaningful progress.</p></div></article></div>
        <blockquote class="lk-quote-v3">“My kiddo had been really resistant to working with a tutor. Five months later, we've seen her confidence and skills grow, and she's excited to attend class.”<span>- Danielle A., Learning Kingdom parent</span></blockquote>
        <div class="lk-actions-v3 lk-center-v3"><button class="lk-button-v3 lk-primary-v3 lk-assessment-trigger" type="button">Start My Child's $60 Learning Path</button></div>
      </div></section>`;
    return stack;
  };

  const mount = () => {
    if (document.getElementById('lk-conversion-stack')) return true;
    const siteRoot = document.querySelector('#SITE_CONTAINER');
    const banner = Array.from(document.querySelectorAll('img')).find((img) => /learning-kingdom-banner-v3-graduation-vibe\.png/i.test(`${img.getAttribute('src') || ''} ${img.getAttribute('alt') || ''}`));
    const assessment = findAssessment();
    if (!document.body || !document.head || !siteRoot || !banner || !assessment) return false;

    document.querySelectorAll('#lk-fall-announcement,#lk-fall-hero,#lk-buyer-fit,#lk-sticky-cta,#lk-sticky-cta-v2').forEach((element) => element.remove());
    document.documentElement.classList.remove('lk-fall-conversion-ready');

    const style = document.createElement('style');
    style.id = 'lk-conversion-v3-styles';
    style.textContent = css;
    document.head.appendChild(style);

    const stack = buildStack();
    document.body.insertBefore(stack, siteRoot);

    const sticky = document.createElement('div');
    sticky.id = 'lk-sticky-cta-v3';
    sticky.innerHTML = '<div><strong>Ready for a clear next step?</strong><span>Personalized Learning Path &bull; One-time $60</span></div><button class="lk-sticky-go-v3" type="button">Start My Child\'s Path</button><button class="lk-sticky-close-v3" type="button" aria-label="Close">&times;</button>';
    document.body.appendChild(sticky);

    stack.querySelector('#lk-announcement-v3 button').addEventListener('click', goToAssessment);
    stack.querySelectorAll('.lk-assessment-trigger').forEach((button) => button.addEventListener('click', goToAssessment));
    stack.querySelector('.lk-fit-trigger').addEventListener('click', () => stack.querySelector('#lk-buyer-fit-v3').scrollIntoView({ behavior: 'smooth', block: 'start' }));
    sticky.querySelector('.lk-sticky-go-v3').addEventListener('click', goToAssessment);
    sticky.querySelector('.lk-sticky-close-v3').addEventListener('click', () => sticky.remove());

    let ticking = false;
    const updateSticky = () => {
      if (!sticky.isConnected) return;
      const assessmentBox = assessment.getBoundingClientRect();
      const assessmentVisible = assessmentBox.top < window.innerHeight && assessmentBox.bottom > 0;
      sticky.classList.toggle('lk-sticky-visible', window.scrollY > 620 && !assessmentVisible);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateSticky);
      }
    }, { passive: true });
    window.addEventListener('resize', updateSticky, { passive: true });
    updateSticky();

    hideLegacyHero();
    const maintain = new MutationObserver(() => {
      hideLegacyHero();
      findAssessment();
      Array.from(document.querySelectorAll('a,button')).forEach((item) => {
        const text = (item.textContent || '').trim();
        if (/Start My Child.{0,4}s (Assessment|Learning Path)|Learning Path Assessment|Request My \$60 Assessment Plan/i.test(text) && !item.dataset.lkV3Wired) {
          item.addEventListener('click', goToAssessment);
          if (item.tagName === 'A') item.setAttribute('href', '#lk-assessment');
          item.dataset.lkV3Wired = '1';
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
