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
  // Set VITE_GOOGLE_WEB_APP_URL in your .env file (leave empty to disable tracking)
  webAppUrl: import.meta.env.VITE_GOOGLE_WEB_APP_URL || '',
  // Set VITE_WEBHOOK_SECRET to match the WEBHOOK_SECRET Apps Script property
  webhookSecret: import.meta.env.VITE_WEBHOOK_SECRET || '',
  driveFolderUrl: 'https://drive.google.com/drive/my-drive',
  leadSheetUrl: 'https://docs.google.com/spreadsheets/',
};
