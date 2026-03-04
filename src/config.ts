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

const DEPLOYED_GOOGLE_APPS_SCRIPT_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbwj4BlIoLvRifzsItSAInH_ugcYNDGgKUlO9gYw_f5a6NFgC2K-lIGnrCKdb0WuZIGPXw/exec';

export const GOOGLE_AUTOMATION_CONFIG = {
  // Verified deployed Apps Script endpoint
  webAppUrl: DEPLOYED_GOOGLE_APPS_SCRIPT_WEBAPP_URL,
  driveFolderUrl: 'https://drive.google.com/drive/my-drive',
  leadSheetUrl: 'https://docs.google.com/spreadsheets/',
};
