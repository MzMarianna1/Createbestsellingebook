(() => {
  'use strict';
  if (location.pathname !== '/' && location.pathname !== '') return;
  const id='lk-home-micro-polish-v4-styles';
  if(document.getElementById(id)) return;
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    #lk-assessment *,#lk-assessment *::before,#lk-assessment *::after{box-sizing:border-box!important}
    @media(max-width:880px){
      #lk-assessment-benefits-v4{width:100%!important;max-width:100%!important}
      #comp-msij9nuo{max-width:100%!important}
    }
  `;
  document.head.appendChild(style);
})();