import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Quiz from './Quiz';
import SalesPage from './SalesPage';
import Checkout from './Checkout';
import ThankYou from './ThankYou';
import MarketingDashboard from './MarketingDashboard';
import PrintVersion from './PrintVersion';
import BonusMaterials from './BonusMaterials';
import { APP_ROUTES } from './config';

function resolvePage(pathname: string) {
  // Normalize: strip trailing slash (except root) to handle /sales/ == /sales
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  switch (normalized) {
    case APP_ROUTES.quiz:
      return <Quiz />;
    case APP_ROUTES.sales:
      return <SalesPage />;
    case APP_ROUTES.checkout:
      return <Checkout />;
    case APP_ROUTES.thankYou:
      return <ThankYou />;
    case APP_ROUTES.dashboard:
      return <MarketingDashboard />;
    case APP_ROUTES.printVersion:
      return <PrintVersion />;
    case APP_ROUTES.bonusMaterials:
      return <BonusMaterials />;
    case APP_ROUTES.home:
    default:
      return <App />;
  }
}

createRoot(document.getElementById('root')!).render(resolvePage(window.location.pathname));
