(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  if (window.__lkAssessmentPolishV4) return;
  window.__lkAssessmentPolishV4 = true;

  const styleId = 'lk-assessment-polish-v4-styles';
  const css = `
    #lk-assessment{
      position:relative!important;
      height:auto!important;
      min-height:0!important;
      padding:68px 24px!important;
      background:
        radial-gradient(circle at 8% 12%,rgba(228,0,109,.16),transparent 28%),
        radial-gradient(circle at 96% 92%,rgba(216,173,61,.17),transparent 30%),
        linear-gradient(145deg,#0e1014 0%,#151821 58%,#251423 100%)!important;
      color:#fff!important;
      scroll-margin-top:22px!important;
      overflow:visible!important;
    }
    #lk-assessment [data-testid='colorUnderlay']{
      background:
        radial-gradient(circle at 8% 12%,rgba(228,0,109,.16),transparent 28%),
        radial-gradient(circle at 96% 92%,rgba(216,173,61,.17),transparent 30%),
        linear-gradient(145deg,#0e1014 0%,#151821 58%,#251423 100%)!important;
    }
    #lk-assessment .comp-msij8949-container{
      position:relative!important;
      height:auto!important;
      min-height:0!important;
      display:grid!important;
      grid-template-columns:minmax(260px,360px) minmax(480px,640px)!important;
      grid-template-rows:auto auto auto!important;
      column-gap:56px!important;
      row-gap:16px!important;
      align-items:start!important;
      justify-content:center!important;
      width:min(1080px,100%)!important;
      margin:0 auto!important;
    }
    #comp-msijsmo2,#comp-msijvz8b,#comp-msij9nuo,#lk-assessment-benefits-v4{
      inset:auto!important;
      transform:none!important;
      margin:0!important;
      max-width:none!important;
      align-self:start!important;
      justify-self:stretch!important;
    }
    #comp-msijsmo2{
      position:static!important;
      grid-column:1!important;
      grid-row:1!important;
      width:auto!important;
      height:auto!important;
    }
    #comp-msijvz8b{
      position:static!important;
      grid-column:1!important;
      grid-row:2!important;
      width:auto!important;
      height:auto!important;
    }
    #comp-msij9nuo{
      position:static!important;
      grid-column:2!important;
      grid-row:1 / span 3!important;
      width:auto!important;
      height:auto!important;
      min-height:0!important;
      padding:12px!important;
      border:1px solid rgba(242,214,117,.46)!important;
      border-radius:28px!important;
      background:rgba(255,255,255,.08)!important;
      box-shadow:0 28px 75px rgba(0,0,0,.32)!important;
      backdrop-filter:blur(10px);
    }
    #comp-msij9nuo>div,#comp-msij9nuo [data-mesh-id]{height:auto!important;min-height:0!important}
    #comp-msijsmo2 .wixui-rich-text__text{
      color:#fff!important;
      font-family:Georgia,'Times New Roman',serif!important;
      letter-spacing:-.035em!important;
      line-height:1.02!important;
    }
    #comp-msijvz8b .wixui-rich-text__text{color:#e8e1ea!important;line-height:1.65!important}
    #lk-assessment-benefits-v4{
      position:static!important;
      grid-column:1!important;
      grid-row:3!important;
      width:auto!important;
      padding:24px!important;
      border:1px solid rgba(242,214,117,.32)!important;
      border-radius:20px!important;
      background:rgba(255,255,255,.065)!important;
      box-shadow:0 18px 48px rgba(0,0,0,.2)!important;
      color:#fff!important;
    }
    #lk-assessment-benefits-v4 .lk4-assessment-kicker{
      display:block;
      color:#f2d675;
      font:900 11px/1.3 Inter,Lato,'Segoe UI',Arial,sans-serif;
      letter-spacing:.12em;
      text-transform:uppercase;
      margin-bottom:8px;
    }
    #lk-assessment-benefits-v4 h3{
      margin:0 0 14px;
      color:#fff;
      font:700 23px/1.15 Georgia,'Times New Roman',serif;
    }
    #lk-assessment-benefits-v4 ul{display:grid;gap:10px;margin:0;padding:0;list-style:none}
    #lk-assessment-benefits-v4 li{
      position:relative;
      padding-left:23px;
      color:#eee7ef;
      font:600 14px/1.45 Inter,Lato,'Segoe UI',Arial,sans-serif;
    }
    #lk-assessment-benefits-v4 li::before{content:'✓';position:absolute;left:0;color:#f2d675;font-weight:900}
    #lk-assessment-benefits-v4 p{margin:15px 0 0;color:#cfc7d1;font:600 12px/1.45 Inter,Lato,'Segoe UI',Arial,sans-serif}
    #lk-assessment form{border-radius:20px!important;overflow:hidden!important}
    #lk-assessment input:focus-visible,#lk-assessment textarea:focus-visible,#lk-assessment button:focus-visible{
      outline:3px solid #f2d675!important;
      outline-offset:2px!important;
    }
    @media(max-width:880px){
      #lk-assessment{padding:52px 16px!important}
      #lk-assessment .comp-msij8949-container{
        display:flex!important;
        flex-direction:column!important;
        width:min(680px,100%)!important;
        gap:16px!important;
      }
      #comp-msijsmo2,#comp-msijvz8b,#comp-msij9nuo,#lk-assessment-benefits-v4{
        width:100%!important;
        position:static!important;
        grid-column:auto!important;
        grid-row:auto!important;
      }
      #comp-msijsmo2{order:1!important}
      #comp-msijvz8b{order:2!important}
      #lk-assessment-benefits-v4{order:3!important}
      #comp-msij9nuo{order:4!important;padding:8px!important;border-radius:22px!important}
    }
    @media(max-width:480px){
      #lk-assessment{padding:44px 12px!important}
      #lk-assessment-benefits-v4{padding:20px!important}
    }
  `;

  function installStyle(){
    if (document.getElementById(styleId)) return;
    const style=document.createElement('style');
    style.id=styleId;
    style.textContent=css;
    document.head.appendChild(style);
  }

  function decorate(){
    const section=document.getElementById('lk-assessment');
    if(!section) return false;
    section.setAttribute('aria-label','Request a $60 personalized learning assessment');
    const container=section.querySelector('.comp-msij8949-container');
    const formCard=section.querySelector('#comp-msij9nuo');
    if(!container||!formCard) return false;

    if(!container.querySelector('#lk-assessment-benefits-v4')){
      const aside=document.createElement('aside');
      aside.id='lk-assessment-benefits-v4';
      aside.setAttribute('aria-label','What your assessment includes');
      aside.innerHTML='<span class="lk4-assessment-kicker">Your first step</span><h3>What your $60 assessment includes</h3><ul><li>30-minute live skills assessment</li><li>Personalized priority skill map</li><li>Recommended Learning Kingdom placement</li><li>Practical next steps you can use immediately</li><li>Your learning plan to keep</li></ul><p>Parent or guardian submissions only • Secure Wix form • No pressure to enroll</p>';
      container.insertBefore(aside,formCard);
    }
    return true;
  }

  installStyle();
  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(decorate()||attempts>100) clearInterval(timer);
  },200);

  const observer=new MutationObserver(()=>decorate());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),15000);
})();