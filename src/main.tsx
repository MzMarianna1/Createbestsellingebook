import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SalesPage from "./SalesPage.tsx";
import Quiz from "./Quiz.tsx";
import Checkout from "./Checkout.tsx";
import ThankYou from "./ThankYou.tsx";
import MarketingDashboard from "./MarketingDashboard.tsx";
import BonusMaterials from "./BonusMaterials.tsx";
import PrintVersion from "./PrintVersion.tsx";
import "./index.css";

function Router() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  switch (hash) {
    case "#/sales":
      return <SalesPage />;
    case "#/quiz":
      return <Quiz />;
    case "#/checkout":
      return <Checkout />;
    case "#/thank-you":
      return <ThankYou />;
    case "#/dashboard":
      return <MarketingDashboard />;
    case "#/bonus":
      return <BonusMaterials />;
    case "#/print":
      return <PrintVersion />;
    default:
      return <App />;
  }
}

createRoot(document.getElementById("root")!).render(<Router />);
