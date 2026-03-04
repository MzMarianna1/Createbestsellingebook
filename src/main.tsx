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

function resolvePage(pathname: string) {
  switch (pathname) {
    case '/quiz':
      return <Quiz />;
    case '/sales':
      return <SalesPage />;
    case '/checkout':
      return <Checkout />;
    case '/thank-you':
      return <ThankYou />;
    case '/dashboard':
      return <MarketingDashboard />;
    case '/print-version':
      return <PrintVersion />;
    case '/bonus-materials':
      return <BonusMaterials />;
    case '/':
    default:
      return <App />;
  }
}

createRoot(document.getElementById('root')!).render(resolvePage(window.location.pathname));
