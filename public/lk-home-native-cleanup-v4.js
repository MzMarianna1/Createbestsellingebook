(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  if (window.__lkNativeCleanupV4) return;
  window.__lkNativeCleanupV4 = true;

  function findAssessment(){
    const form=Array.from(document.querySelectorAll('form')).find((item)=>/Request\s*\$60\s*Assessment|Assessment\s*\+\s*Personalized\s*Plan/i.test(`${item.getAttribute('aria-label')||''} ${item.textContent||''}`));
    if(!form) return null;
    const section=form.closest('section')||form.parentElement||form;
    section.id='lk-assessment';
    return section;
  }

  function removePrelude(){
    const assessment=findAssessment();
    if(!assessment) return false;
    const main=assessment.closest('main')||document.querySelector('main')||document.querySelector('#SITE_PAGES');
    if(!main) return false;
    const sections=Array.from(main.querySelectorAll('section'));
    let removed=0;
    sections.forEach((section)=>{
      if(section===assessment||section.contains(assessment)||assessment.contains(section)) return;
      const relation=section.compareDocumentPosition(assessment);
      if(relation & Node.DOCUMENT_POSITION_FOLLOWING){
        section.remove();
        removed+=1;
      }
    });
    return removed>=0;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(removePrelude()||attempts>100) clearInterval(timer);
  },200);

  const observer=new MutationObserver(()=>removePrelude());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),15000);
})();