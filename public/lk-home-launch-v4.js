(() => {
  'use strict';

  if (location.pathname !== '/' && location.pathname !== '') return;

  const MARIANNA_IMAGE = 'https://static.wixstatic.com/media/c584a9_9371640ba9914db48b73976534c8e22a~mv2.jpg';
  const KATELYN_IMAGE = 'https://static.wixstatic.com/media/1b3c7b_e8cf8ff1714149b182ccff7ec5a09a77~mv2.jpg';

  const COLORS = {
    onyx: '#0e1014',
    onyxSoft: '#171a20',
    cream: '#fff9ee',
    ivory: '#fffdf8',
    gold: '#d8ad3d',
    goldLight: '#f2d675',
    pink: '#e4006d',
    pinkLight: '#ff5aa7',
    ink: '#191b21',
    muted: '#625e68',
    line: 'rgba(216,173,61,.28)'
  };

  const css = `
    :root{
      --lk4-onyx:${COLORS.onyx};--lk4-onyx-soft:${COLORS.onyxSoft};--lk4-cream:${COLORS.cream};
      --lk4-ivory:${COLORS.ivory};--lk4-gold:${COLORS.gold};--lk4-gold-light:${COLORS.goldLight};
      --lk4-pink:${COLORS.pink};--lk4-pink-light:${COLORS.pinkLight};--lk4-ink:${COLORS.ink};
      --lk4-muted:${COLORS.muted};--lk4-line:${COLORS.line};--lk4-shadow:0 22px 70px rgba(14,16,20,.14)
    }
    #lk-launch-v4,#lk-sticky-v4{box-sizing:border-box;font-family:Inter,Lato,"Segoe UI",Arial,sans-serif}
    #lk-launch-v4 *{box-sizing:border-box}
    #lk-launch-v4 h1,#lk-launch-v4 h2,#lk-launch-v4 .lk4-serif{font-family:Georgia,"Times New Roman",serif}
    #lk-announcement-v3{position:relative;z-index:40;background:var(--lk4-onyx);color:#fff;padding:11px 18px;text-align:center;font-size:13px;font-weight:800;letter-spacing:.045em;border-bottom:1px solid rgba(242,214,117,.35)}
    #lk-announcement-v3 a.lk4-announcement-link{color:var(--lk4-gold-light);text-decoration:underline;text-underline-offset:3px;margin-left:8px;font-weight:900}
    .lk4-shell{width:min(1160px,calc(100% - 40px));margin:0 auto}
    .lk4-kicker{display:inline-flex;align-items:center;gap:9px;color:var(--lk4-gold-light);font-size:12px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
    .lk4-kicker::before{content:'✦';color:var(--lk4-pink-light);font-size:14px}
    .lk4-button{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:13px 21px;border-radius:999px;border:0;font-weight:900;font-size:15px;cursor:pointer;text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
    .lk4-button:hover{transform:translateY(-2px)}
    .lk4-primary{background:linear-gradient(135deg,var(--lk4-gold-light),var(--lk4-gold));color:#1b160c;box-shadow:0 14px 34px rgba(216,173,61,.28)}
    .lk4-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5)}
    .lk4-dark-button{background:var(--lk4-onyx);color:#fff}
    .lk4-pink-button{background:linear-gradient(135deg,#bb0059,var(--lk4-pink));color:#fff;box-shadow:0 14px 34px rgba(228,0,109,.18)}
    .lk4-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:27px}

    #lk4-hero{position:relative;overflow:hidden;background:radial-gradient(circle at 84% 10%,rgba(228,0,109,.16),transparent 27%),radial-gradient(circle at 12% 100%,rgba(216,173,61,.16),transparent 30%),var(--lk4-onyx);color:#fff;padding:70px 0 58px}
    #lk4-hero::after{content:'';position:absolute;right:-170px;top:-210px;width:480px;height:480px;border-radius:50%;border:1px solid rgba(242,214,117,.2);box-shadow:0 0 0 55px rgba(242,214,117,.035),0 0 0 110px rgba(228,0,109,.035)}
    .lk4-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(300px,.78fr);gap:62px;align-items:center;position:relative;z-index:1}
    #lk4-title{margin:16px 0 15px;font-size:clamp(44px,6vw,76px);line-height:.98;letter-spacing:-.045em;color:#fff;max-width:760px}
    #lk4-title em{display:block;font-style:normal;color:var(--lk4-gold-light)}
    .lk4-lead{max-width:720px;margin:0;color:#f5eff4;font-size:clamp(18px,2vw,22px);line-height:1.6}
    .lk4-micro{margin-top:13px;color:#cfc8d1;font-size:13px;line-height:1.45}
    .lk4-hero-visual{position:relative;max-width:390px;justify-self:end}
    .lk4-hero-visual::before{content:'';position:absolute;inset:-18px 24px 30px -20px;border:1px solid rgba(242,214,117,.5);border-radius:32px;transform:rotate(-3deg)}
    .lk4-hero-photo{position:relative;z-index:1;width:100%;display:block;aspect-ratio:4/5;object-fit:cover;object-position:62% 42%;border-radius:28px;border:6px solid rgba(255,253,248,.94);box-shadow:0 30px 75px rgba(0,0,0,.45)}
    .lk4-photo-card{position:absolute;z-index:2;left:-34px;bottom:24px;max-width:250px;padding:14px 17px;border-radius:16px;background:var(--lk4-ivory);color:var(--lk4-ink);box-shadow:0 18px 48px rgba(0,0,0,.28);font-size:14px;line-height:1.4}
    .lk4-photo-card strong{display:block;color:#a80050;font-family:Georgia,"Times New Roman",serif;font-size:18px;margin-bottom:2px}
    .lk4-proof{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:34px}
    .lk4-proof-item{padding:15px 16px;border:1px solid rgba(242,214,117,.22);border-radius:16px;background:rgba(255,255,255,.055)}
    .lk4-proof-item strong{display:block;color:var(--lk4-gold-light);font-size:14px;margin-bottom:4px}.lk4-proof-item span{color:#e3dce5;font-size:13px;line-height:1.4}

    .lk4-light-section{padding:68px 0;background:var(--lk4-ivory);color:var(--lk4-ink)}
    .lk4-cream-section{padding:68px 0;background:var(--lk4-cream);color:var(--lk4-ink)}
    .lk4-dark-section{padding:68px 0;background:var(--lk4-onyx-soft);color:#fff}
    .lk4-heading{max-width:820px;margin:0 auto 34px;text-align:center}
    .lk4-heading .lk4-kicker{color:#a80050;justify-content:center}
    .lk4-heading h2{margin:9px 0 10px;font-size:clamp(32px,4.5vw,52px);line-height:1.05;letter-spacing:-.035em;color:var(--lk4-onyx)}
    .lk4-heading p{margin:0;color:var(--lk4-muted);font-size:17px;line-height:1.62}
    .lk4-dark-section .lk4-heading h2{color:#fff}.lk4-dark-section .lk4-heading p{color:#d9d2da}.lk4-dark-section .lk4-heading .lk4-kicker{color:var(--lk4-gold-light)}

    .lk4-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
    .lk4-step{position:relative;padding:25px;border-radius:20px;background:#fff;border:1px solid rgba(25,27,33,.08);box-shadow:0 14px 38px rgba(14,16,20,.07)}
    .lk4-step-number{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--lk4-onyx);color:var(--lk4-gold-light);font-weight:900;margin-bottom:14px}
    .lk4-step h3{margin:0 0 7px;font-size:20px;color:var(--lk4-onyx)}.lk4-step p{margin:0;color:var(--lk4-muted);line-height:1.58;font-size:15px}

    .lk4-program-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    .lk4-program{display:flex;flex-direction:column;min-height:100%;padding:24px;border-radius:21px;background:#fff;border:1px solid rgba(216,173,61,.32);box-shadow:var(--lk4-shadow)}
    .lk4-program.lk4-featured{background:linear-gradient(145deg,var(--lk4-onyx),#24272f);color:#fff;border-color:rgba(242,214,117,.55);transform:translateY(-7px)}
    .lk4-program-badge{align-self:flex-start;padding:6px 9px;border-radius:999px;background:#f4e7bd;color:#5e4510;font-size:11px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
    .lk4-featured .lk4-program-badge{background:var(--lk4-pink);color:#fff}
    .lk4-program h3{margin:14px 0 4px;font-size:21px;color:var(--lk4-onyx)}.lk4-featured h3{color:#fff}
    .lk4-price{font-family:Georgia,"Times New Roman",serif;font-size:30px;font-weight:700;color:#a80050;margin:7px 0 12px}.lk4-featured .lk4-price{color:var(--lk4-gold-light)}
    .lk4-program p{margin:0;color:var(--lk4-muted);line-height:1.55;font-size:14px}.lk4-featured p{color:#e5dee7}
    .lk4-program ul{display:grid;gap:8px;margin:16px 0 0;padding:0;list-style:none;font-size:13px;line-height:1.4;color:#47434c}.lk4-featured ul{color:#f5eef7}
    .lk4-program li{position:relative;padding-left:19px}.lk4-program li::before{content:'✓';position:absolute;left:0;color:#aa7b08;font-weight:900}.lk4-featured li::before{color:var(--lk4-gold-light)}
    .lk4-program .lk4-button{margin-top:auto;align-self:stretch;margin-top:20px}
    .lk4-disclaimer{max-width:900px;margin:22px auto 0;text-align:center;color:#706b73;font-size:12px;line-height:1.5}

    .lk4-audience-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    .lk4-audience{padding:24px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(242,214,117,.22)}
    .lk4-audience-icon{font-size:24px;margin-bottom:13px;color:var(--lk4-gold-light)}
    .lk4-audience h3{margin:0 0 8px;font-family:Georgia,"Times New Roman",serif;font-size:21px;color:#fff}.lk4-audience p{margin:0;color:#d9d1da;font-size:14px;line-height:1.6}

    .lk4-method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .lk4-method{padding:27px;border-radius:21px;background:#fff;border:1px solid rgba(25,27,33,.08);box-shadow:0 13px 36px rgba(14,16,20,.07)}
    .lk4-method .lk4-word{font-family:Georgia,"Times New Roman",serif;font-size:34px;color:#a80050;margin-bottom:9px}.lk4-method p{margin:0;color:var(--lk4-muted);line-height:1.6}

    .lk4-team-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
    .lk4-team-card{display:grid;grid-template-columns:190px 1fr;min-height:300px;overflow:hidden;border-radius:24px;background:#fff;box-shadow:var(--lk4-shadow);border:1px solid rgba(216,173,61,.24)}
    .lk4-team-card img{width:100%;height:100%;object-fit:cover}.lk4-team-card:first-child img{object-position:62% 42%}.lk4-team-card:last-child img{object-position:54% 44%}
    .lk4-team-copy{padding:28px 25px;align-self:center}.lk4-team-role{color:#a80050;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.09em}.lk4-team-copy h3{margin:6px 0 10px;font-family:Georgia,"Times New Roman",serif;font-size:27px;color:var(--lk4-onyx)}.lk4-team-copy p{margin:0;color:var(--lk4-muted);line-height:1.62;font-size:15px}

    .lk4-funding{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;padding:34px;border-radius:26px;background:linear-gradient(145deg,#101217,#20242b);border:1px solid rgba(242,214,117,.3);box-shadow:0 22px 64px rgba(14,16,20,.25)}
    .lk4-funding h2{margin:7px 0 10px;font-size:clamp(31px,4vw,46px);color:#fff}.lk4-funding p{margin:0;color:#dcd5df;line-height:1.62}
    .lk4-chip-grid{display:flex;flex-wrap:wrap;gap:10px}.lk4-chip{padding:9px 12px;border-radius:999px;background:#fff;color:#29252d;font-size:13px;font-weight:800;border:1px solid #ead79b}
    .lk4-funding-note{display:block;margin-top:13px;color:#bdb5c0;font-size:11px;line-height:1.45}

    #lk4-final{padding:56px 0;background:linear-gradient(90deg,#a7004f,var(--lk4-pink));color:#fff;text-align:center}
    #lk4-final h2{margin:0 auto 10px;max-width:850px;font-size:clamp(32px,4.5vw,50px);line-height:1.05;color:#fff}.lk4-final-copy{max-width:720px;margin:0 auto;color:#fff1f7;font-size:17px;line-height:1.55}.lk4-final-actions{justify-content:center}

    #lk-assessment{scroll-margin-top:24px}
    #lk-sticky-v4{position:fixed;left:50%;bottom:14px;transform:translateX(-50%) translateY(130%);z-index:99999;width:min(720px,calc(100% - 24px));display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px 12px 18px;border:1px solid rgba(242,214,117,.5);border-radius:18px;background:rgba(14,16,20,.96);color:#fff;box-shadow:0 22px 60px rgba(0,0,0,.35);backdrop-filter:blur(12px);transition:transform .22s ease}
    #lk-sticky-v4.lk4-visible{transform:translateX(-50%) translateY(0)}
    #lk-sticky-v4 strong{display:block;font-family:Georgia,"Times New Roman",serif;font-size:16px}#lk-sticky-v4 span{display:block;color:#cec6d0;font-size:12px;margin-top:2px}
    #lk-sticky-v4 .lk4-sticky-go{border:0;border-radius:999px;padding:11px 16px;background:var(--lk4-gold-light);color:#17130a;font-weight:900;cursor:pointer;white-space:nowrap}
    #lk-sticky-v4 .lk4-sticky-close{position:absolute;right:-7px;top:-8px;width:25px;height:25px;border-radius:50%;border:1px solid #ddd;background:#fff;color:#252129;font-weight:900;cursor:pointer}

    @media(max-width:980px){.lk4-hero-grid{grid-template-columns:1fr;gap:38px}.lk4-hero-visual{justify-self:start;max-width:340px}.lk4-proof{grid-template-columns:repeat(2,1fr)}.lk4-program-grid,.lk4-audience-grid{grid-template-columns:repeat(2,1fr)}.lk4-team-grid{grid-template-columns:1fr}.lk4-funding{grid-template-columns:1fr}}
    @media(max-width:700px){.lk4-shell{width:min(100% - 28px,1160px)}#lk4-hero{padding:50px 0 42px}.lk4-actions{display:grid}.lk4-button{width:100%}.lk4-steps,.lk4-method-grid{grid-template-columns:1fr}.lk4-program-grid,.lk4-audience-grid{grid-template-columns:1fr}.lk4-program.lk4-featured{transform:none}.lk4-team-card{grid-template-columns:1fr}.lk4-team-card img{height:280px}.lk4-photo-card{left:14px;right:-12px;bottom:16px}.lk4-proof{grid-template-columns:1fr 1fr}.lk4-light-section,.lk4-cream-section,.lk4-dark-section{padding:54px 0}#lk-sticky-v4 span{display:none}}
    @media(max-width:430px){.lk4-proof{grid-template-columns:1fr}.lk4-hero-visual{max-width:100%}}
    @media(prefers-reduced-motion:reduce){.lk4-button,#lk-sticky-v4{transition:none}.lk4-button:hover{transform:none}}
  `;

  function findAssessment() {
    const form = Array.from(document.querySelectorAll('form')).find((item) => /Request\s*\$60\s*Assessment|Assessment\s*\+\s*Personalized\s*Plan/i.test(`${item.getAttribute('aria-label') || ''} ${item.textContent || ''}`));
    if (!form) return null;
    const section = form.closest('section') || form.parentElement || form;
    section.id = 'lk-assessment';
    return section;
  }

  function goToAssessment(event) {
    if (event) event.preventDefault();
    const target = findAssessment();
    if (!target) return;
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => {
      const field = target.querySelector('input,select,textarea,button');
      if (field && typeof field.focus === 'function') field.focus({ preventScroll: true });
    }, 550);
  }

  function hideNativePrelude(assessment) {
    const main = assessment.closest('main') || document.querySelector('main') || document.querySelector('#SITE_PAGES');
    if (!main) return;
    Array.from(main.querySelectorAll('section')).forEach((section) => {
      if (section === assessment || section.contains(assessment) || assessment.contains(section)) return;
      const relation = section.compareDocumentPosition(assessment);
      if (relation & Node.DOCUMENT_POSITION_FOLLOWING) {
        section.style.setProperty('display', 'none', 'important');
        section.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function patchKnownAccessibility(assessment) {
    const ids = ['comp-msat5bdf','comp-msgzqs4p1__item-j9ples3e','comp-msgzkv495','comp-msgzqs4p1__item-j9plerjk','comp-msat5bgc','comp-msgzqs4p1__item1','comp-msl92nrb1'];
    ids.forEach((id) => {
      const root = document.getElementById(id);
      if (!root) return;
      const hidden = root.closest('[aria-hidden="true"]') || getComputedStyle(root).display === 'none';
      if (hidden) return;
      const img = root.matches('img') ? root : root.querySelector('img');
      if (img && !img.getAttribute('alt')) img.setAttribute('alt', 'Learning Kingdom educational program visual');
    });
    const headingRoot = document.getElementById('comp-msgxswre6');
    if (headingRoot && !(headingRoot.closest('[aria-hidden="true"]'))) {
      const heading = headingRoot.querySelector('h1,h2,h3,h4,h5,h6,[role="heading"]') || headingRoot;
      heading.setAttribute('role', 'heading');
      heading.setAttribute('aria-level', '2');
    }
    if (assessment) assessment.setAttribute('aria-label', 'Request a $60 personalized learning assessment');
  }

  function cleanupOldLayers() {
    ['lk-conversion-stack','lk-sticky-cta-v3','lk-sticky-cta-v2','lk-core-offer','lk-buyer-fit','lk-core-sticky','lk-fall-bar'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    ['lk-conversion-v3-styles','lk-conversion-styles'].forEach((id) => {
      const style = document.getElementById(id);
      if (style) style.remove();
    });
  }

  function buildLaunch() {
    const wrap = document.createElement('div');
    wrap.id = 'lk-launch-v4';
    wrap.innerHTML = `
      <div id="lk-announcement-v3">FALL 2026 ENROLLMENT IS OPEN <a class="lk4-announcement-link" href="#lk-assessment">Start with the $60 assessment →</a></div>
      <section id="lk4-hero" aria-labelledby="lk4-title">
        <div class="lk4-shell">
          <div class="lk4-hero-grid">
            <div>
              <span class="lk4-kicker">K–8 • Personalized homeschool + tutoring</span>
              <h1 id="lk4-title">Here, your child is royalty.<em>Learning should fit them.</em></h1>
              <p class="lk4-lead">The Learning Kingdom helps K–8 learners build real math, reading, writing, and executive-function skills through personalized live teaching that protects confidence and makes room for how each child learns best.</p>
              <div class="lk4-actions"><button class="lk4-button lk4-primary lk4-assessment-go" type="button">Start the $60 Assessment</button><button class="lk4-button lk4-secondary lk4-program-go" type="button">Explore Programs & Pricing</button></div>
              <div class="lk4-micro">One-time $60 • 30-minute live assessment • Personalized plan is yours to keep</div>
            </div>
            <div class="lk4-hero-visual"><img class="lk4-hero-photo" src="${MARIANNA_IMAGE}" alt="Mz. Marianna, founder of The Learning Kingdom" loading="eager" fetchpriority="high"><div class="lk4-photo-card"><strong>Helping every child excel.</strong>Clear expectations. Kind support. A learning path built around the child in front of us.</div></div>
          </div>
          <div class="lk4-proof"><div class="lk4-proof-item"><strong>Live online</strong><span>Human teaching and real connection</span></div><div class="lk4-proof-item"><strong>K–8 support</strong><span>Math, reading, writing & more</span></div><div class="lk4-proof-item"><strong>Personalized</strong><span>Readiness before rigid grade labels</span></div><div class="lk4-proof-item"><strong>Funding guidance</strong><span>Clear help with eligible programs</span></div></div>
        </div>
      </section>

      <section class="lk4-light-section" id="lk4-start" aria-labelledby="lk4-start-title"><div class="lk4-shell">
        <div class="lk4-heading"><span class="lk4-kicker">Start with clarity</span><h2 id="lk4-start-title">Do not buy another curriculum until you know what your child actually needs.</h2><p>The assessment gives you a practical starting point and an ordered plan, whether you enroll with us or use the plan at home.</p></div>
        <div class="lk4-steps"><article class="lk4-step"><div class="lk4-step-number">1</div><h3>Tell us what you are seeing</h3><p>Share strengths, concerns, grade level, interests, and the moments that feel hardest right now.</p></article><article class="lk4-step"><div class="lk4-step-number">2</div><h3>We assess the priority skills</h3><p>A focused live session helps us identify where support will make the biggest difference first.</p></article><article class="lk4-step"><div class="lk4-step-number">3</div><h3>You leave with a plan</h3><p>Get parent-friendly next steps, recommended placement, and a path you can confidently follow.</p></article></div>
        <div class="lk4-actions" style="justify-content:center"><button class="lk4-button lk4-pink-button lk4-assessment-go" type="button">Get My Child’s Learning Plan — $60</button></div>
      </div></section>

      <section class="lk4-cream-section" id="lk4-programs" aria-labelledby="lk4-programs-title"><div class="lk4-shell">
        <div class="lk4-heading"><span class="lk4-kicker">Programs & pricing</span><h2 id="lk4-programs-title">Choose the amount of support your family needs.</h2><p>Every path begins with clarity. Families can then choose full homeschool support, year-long structure, or focused tutoring.</p></div>
        <div class="lk4-program-grid">
          <article class="lk4-program"><span class="lk4-program-badge">Start here</span><h3>Personalized Learning Assessment</h3><div class="lk4-price">$60</div><p>A live K–8 assessment plus a personalized learning plan.</p><ul><li>30-minute live assessment</li><li>Priority skill map</li><li>Placement recommendation</li><li>Plan is yours to keep</li></ul><button class="lk4-button lk4-dark-button lk4-assessment-go" type="button">Start Assessment</button></article>
          <article class="lk4-program lk4-featured"><span class="lk4-program-badge">Most complete</span><h3>Full Learning Kingdom Week</h3><div class="lk4-price">$180/week</div><p>Structured live learning with curriculum, progress support, and community built in.</p><ul><li>Multi-subject live learning</li><li>Personalized curriculum</li><li>Progress monitoring</li><li>Family support</li></ul><button class="lk4-button lk4-primary lk4-assessment-go" type="button">See If It Fits</button></article>
          <article class="lk4-program"><span class="lk4-program-badge">Full year</span><h3>36-Week Homeschool Plan</h3><div class="lk4-price">$5,400</div><p>A complete school-year option for families who want one clear learning home.</p><ul><li>36 weeks of structure</li><li>Custom curriculum</li><li>Curriculum box included</li><li>Ongoing progress visibility</li></ul><button class="lk4-button lk4-dark-button lk4-assessment-go" type="button">Start With Assessment</button></article>
          <article class="lk4-program"><span class="lk4-program-badge">Focused support</span><h3>Supplemental Programs</h3><div class="lk4-price">From $30</div><p>Add targeted support without changing your entire homeschool plan.</p><ul><li>Math tutoring — $30 group</li><li>Reading tutoring — $30 group</li><li>Executive Functioning — $199 / 8 weeks</li><li>Multiplication Masters — $299</li></ul><button class="lk4-button lk4-dark-button lk4-assessment-go" type="button">Find the Right Level</button></article>
        </div>
        <p class="lk4-disclaimer">Program availability, schedules, funding eligibility, and reimbursement rules vary. The Learning Kingdom helps families understand documentation and next steps; final funding approval is determined by each funding administrator.</p>
      </div></section>

      <section class="lk4-dark-section" id="lk4-audiences" aria-labelledby="lk4-audiences-title"><div class="lk4-shell">
        <div class="lk4-heading"><span class="lk4-kicker">Built to flex</span><h2 id="lk4-audiences-title">One learning platform. Different kinds of families and schools.</h2><p>Personalized instruction works best when the structure adapts to the learner and the setting—not the other way around.</p></div>
        <div class="lk4-audience-grid"><article class="lk4-audience"><div class="lk4-audience-icon" aria-hidden="true">♛</div><h3>Homeschool families</h3><p>Replace scattered resources with a clear weekly rhythm, live support, and visible progress.</p></article><article class="lk4-audience"><div class="lk4-audience-icon" aria-hidden="true">✦</div><h3>Microschools & co-ops</h3><p>Add curriculum, assessment, small-group instruction, or enrichment without rebuilding your whole program.</p></article><article class="lk4-audience"><div class="lk4-audience-icon" aria-hidden="true">▦</div><h3>Schools & charter partners</h3><p>Support individual learners or small groups with structured instruction and documentation-friendly progress.</p></article><article class="lk4-audience"><div class="lk4-audience-icon" aria-hidden="true">♥</div><h3>IEP & learning-difference families</h3><p>Use interests, movement, choice, repetition, and encouragement while keeping academic goals clear.</p></article></div>
      </div></section>

      <section class="lk4-light-section" id="lk4-method" aria-labelledby="lk4-method-title"><div class="lk4-shell">
        <div class="lk4-heading"><span class="lk4-kicker">Learn • Practice • Play</span><h2 id="lk4-method-title">Engagement is not the reward after learning. It is part of how learning sticks.</h2><p>We teach the skill clearly, practice it in more than one way, and use games or student interests—including Roblox when it fits—to make repetition meaningful.</p></div>
        <div class="lk4-method-grid"><article class="lk4-method"><div class="lk4-word">Learn</div><p>Explicit teaching, worked examples, standards-based skills, and a clear purpose for the lesson.</p></article><article class="lk4-method"><div class="lk4-word">Practice</div><p>Guided repetition, multisensory choices, feedback, and enough structure to build independence.</p></article><article class="lk4-method"><div class="lk4-word">Play</div><p>Optional Roblox, challenges, projects, and creative application that make practice worth returning to.</p></article></div>
      </div></section>

      <section class="lk4-cream-section" id="lk4-team" aria-labelledby="lk4-team-title"><div class="lk4-shell">
        <div class="lk4-heading"><span class="lk4-kicker">Real people in your corner</span><h2 id="lk4-team-title">Warm enough for a worried child. Structured enough for a busy parent.</h2><p>Your family should know who is teaching, what the goal is, and what comes next.</p></div>
        <div class="lk4-team-grid"><article class="lk4-team-card"><img src="${MARIANNA_IMAGE}" alt="Mz. Marianna, founder and tutor at The Learning Kingdom" loading="lazy"><div class="lk4-team-copy"><span class="lk4-team-role">Founder • Learning designer</span><h3>Mz. Marianna</h3><p>I built The Learning Kingdom around a simple belief: bright children should not have to fail repeatedly before adults change the method. We start with the child, make the path clear, and use their strengths to help skills grow.</p></div></article><article class="lk4-team-card"><img src="${KATELYN_IMAGE}" alt="Mz. Katelyn, tutor at The Learning Kingdom" loading="lazy"><div class="lk4-team-copy"><span class="lk4-team-role">Tutor • Encouraging guide</span><h3>Mz. Katelyn</h3><p>Mz. Katelyn brings a calm, encouraging presence to practice. She helps learners feel comfortable asking questions, trying again, and noticing the small wins that build real confidence over time.</p></div></article></div>
      </div></section>

      <section class="lk4-light-section" id="lk4-funding" aria-labelledby="lk4-funding-title"><div class="lk4-shell"><div class="lk4-funding"><div><span class="lk4-kicker">Funding help</span><h2 id="lk4-funding-title" class="lk4-serif">Funding support without the maze.</h2><p>We help eligible families understand the correct documentation and payment steps before they spend money unnecessarily.</p><span class="lk4-funding-note">Eligibility, covered services, and payment approval are controlled by the funding program—not by The Learning Kingdom.</span></div><div class="lk4-chip-grid"><span class="lk4-chip">Arizona ESA / ClassWallet</span><span class="lk4-chip">Florida Step Up / EMA</span><span class="lk4-chip">Georgia Promise guidance</span><span class="lk4-chip">School / Charter Funding</span><span class="lk4-chip">Purchase Orders</span><span class="lk4-chip">Ask About Your State</span></div></div></div></section>

      <section id="lk4-final" aria-labelledby="lk4-final-title"><div class="lk4-shell"><h2 id="lk4-final-title">You do not need to solve the whole school year today.</h2><p class="lk4-final-copy">Start by finding out what your child needs next. We will make the first step clear.</p><div class="lk4-actions lk4-final-actions"><button class="lk4-button lk4-primary lk4-assessment-go" type="button">Start the $60 Assessment</button></div></div></section>
    `;
    return wrap;
  }

  function wireLaunch(root) {
    root.querySelectorAll('.lk4-assessment-go').forEach((button) => button.addEventListener('click', goToAssessment));
    root.querySelector('.lk4-program-go')?.addEventListener('click', () => root.querySelector('#lk4-programs')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
    root.querySelector('.lk4-announcement-link')?.addEventListener('click', goToAssessment);
  }

  function addSticky() {
    let sticky = document.getElementById('lk-sticky-v4');
    if (sticky) return sticky;
    sticky = document.createElement('div');
    sticky.id = 'lk-sticky-v4';
    sticky.setAttribute('role', 'region');
    sticky.setAttribute('aria-label', 'Assessment shortcut');
    sticky.innerHTML = '<div><strong>Ready for a clear next step?</strong><span>Live assessment + personalized plan • $60</span></div><button class="lk4-sticky-go" type="button">Start Assessment</button><button class="lk4-sticky-close" type="button" aria-label="Close assessment shortcut">×</button>';
    document.body.appendChild(sticky);
    sticky.querySelector('.lk4-sticky-go').addEventListener('click', goToAssessment);
    sticky.querySelector('.lk4-sticky-close').addEventListener('click', () => sticky.remove());
    let ticking = false;
    const update = () => {
      if (!sticky.isConnected) return;
      const assessment = findAssessment();
      const visible = assessment ? (() => { const r = assessment.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; })() : false;
      sticky.classList.toggle('lk4-visible', scrollY > 760 && !visible);
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive:true });
    addEventListener('resize', update, { passive:true });
    update();
    return sticky;
  }

  function mount() {
    if (document.getElementById('lk-launch-v4')) return true;
    const siteRoot = document.querySelector('#SITE_CONTAINER');
    const assessment = findAssessment();
    if (!document.body || !document.head || !siteRoot || !assessment) return false;

    cleanupOldLayers();
    hideNativePrelude(assessment);
    patchKnownAccessibility(assessment);

    if (!document.getElementById('lk-launch-v4-styles')) {
      const style = document.createElement('style');
      style.id = 'lk-launch-v4-styles';
      style.textContent = css;
      document.head.appendChild(style);
    }

    const launch = buildLaunch();
    document.body.insertBefore(launch, siteRoot);
    wireLaunch(launch);
    addSticky();

    const maintain = new MutationObserver(() => {
      const currentAssessment = findAssessment() || assessment;
      hideNativePrelude(currentAssessment);
      patchKnownAccessibility(currentAssessment);
    });
    maintain.observe(siteRoot, { childList:true, subtree:true });
    setTimeout(() => maintain.disconnect(), 15000);

    const params = new URLSearchParams(location.search);
    if (params.get('start') === 'assessment') setTimeout(goToAssessment, 800);
    return true;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (mount() || attempts > 100) clearInterval(timer);
  }, 250);
})();