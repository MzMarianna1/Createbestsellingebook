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

const VALID_PRODUCTS = ["ebook", "bundle", "coaching"] as const;
type ProductType = (typeof VALID_PRODUCTS)[number];

function parseHash(rawHash: string): { path: string; params: URLSearchParams } {
  const withoutLeading = rawHash.startsWith("#") ? rawHash.slice(1) : rawHash;
  const [pathPart, queryPart] = withoutLeading.split("?");
  const path = pathPart.replace(/^\/+|\/+$/g, "") || "/";
  return { path, params: new URLSearchParams(queryPart ?? "") };
}

function Router() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const { path, params } = parseHash(hash);

  switch (path) {
    case "sales":
      return <SalesPage />;
    case "quiz":
      return <Quiz />;
    case "checkout": {
      const product = params.get("product") as ProductType | null;
      const initialProduct: ProductType = VALID_PRODUCTS.includes(product as ProductType)
        ? (product as ProductType)
        : "ebook";
      return <Checkout initialProduct={initialProduct} />;
    }
    case "thank-you":
      return <ThankYou />;
    case "dashboard":
      return <MarketingDashboard />;
    case "bonus":
      return <BonusMaterials />;
    case "print":
      return <PrintVersion />;
    default:
      return <App />;
  }
}

createRoot(document.getElementById("root")!).render(<Router />);
