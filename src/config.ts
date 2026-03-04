export const APP_ROUTES = {
  home: '/',
  quiz: '/quiz',
  sales: '/sales',
  checkout: '/checkout',
  thankYou: '/thank-you',
  dashboard: '/dashboard',
  printVersion: '/print-version',
  bonusMaterials: '/bonus-materials',
} as const;

export const SHOPIFY_CONFIG = {
  // Replace with your real Shopify checkout/product URLs
  ebookCheckoutUrl: 'https://YOUR_SHOP.myshopify.com/cart',
  bundleCheckoutUrl: 'https://YOUR_SHOP.myshopify.com/cart',
  coachingCheckoutUrl: 'https://YOUR_SHOP.myshopify.com/cart',
};

export const GOOGLE_AUTOMATION_CONFIG = {
  // Deploy a Google Apps Script Web App and paste URL here
  webAppUrl: 'https://script.google.com/macros/s/AKfycbwj4BlIoLvRifzsItSAInH_ugcYNDGgKUlO9gYw_f5a6NFgC2K-lIGnrCKdb0WuZIGPXw/exec',
  driveFolderUrl: 'https://drive.google.com/drive/my-drive',
  leadSheetUrl: 'https://docs.google.com/spreadsheets/',
};
