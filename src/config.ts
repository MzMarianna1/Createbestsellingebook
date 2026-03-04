/**
 * Central configuration for Mz. Marianna's Learning Kingdom
 *
 * PHASE 1 — LIVE CONFIGURATION
 * PHASE 2 — Replace Shopify placeholder URLs with real cart links once live.
 */

// ─── Google Apps Script (Lead Capture → Google Sheets) ─────────────────────
// Receives quiz leads and writes them to the connected Google Sheet.
// Deployed as a Web App with "Anyone" access from: Apps Script project.
//
// NOTE: This URL is intentionally public — it functions like an HTML <form>
// action URL. The Apps Script itself validates and sanitises incoming data.
// No private credentials are embedded here; the script only appends rows.
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwOCKfCDHV8Mu2lLIyyVvV4jjR_krnEFO72QHZ3axZa_FubKsIHBI2s2CMsOun5AJejcw/exec';

// ─── Google Drive Hub ────────────────────────────────────────────────────────
// Replace the empty string values with the actual Google Drive folder IDs once
// the five hub folders have been created inside your Drive.
// How to find a folder ID: open the folder in Drive → copy the ID from the URL
// (everything after /folders/ and before any ?).
export const GOOGLE_DRIVE_FOLDERS: Record<string, string> = {
  '01-Ebook-Master': '',       // Master ebook source files & PDF exports
  '02-Canva-Exports': '',      // Finished social graphics exported from Canva
  '03-Social-Content': '',     // Scheduled post copy & caption drafts
  '04-Challenge-Tracker': '',  // 30-Day Challenge workbooks & tracking sheets
  '05-Testimonials': '',       // Parent testimonial screenshots & videos
};

// ─── Shopify Cart Links (Phase 2) ───────────────────────────────────────────
// Replace these placeholder paths with your real Shopify cart permalink URLs
// from www.mzmarianna.com once the Shopify store is connected.
// Format: https://www.mzmarianna.com/cart/<variant_id>:1
export const SHOPIFY_CART_URLS = {
  ebook:    'https://www.mzmarianna.com/cart/ebook',     // $47 — Stop Homework Battles ebook
  bundle:   'https://www.mzmarianna.com/cart/bundle',    // $97 — Complete Bundle
  coaching: 'https://www.mzmarianna.com/cart/coaching',  // $297 — 1-on-1 Strategy Session
};
