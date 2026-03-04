/**
 * Google Apps Script automation layer for this funnel.
 *
 * REQUIRED SCRIPT PROPERTIES
 * - LEADS_SHEET_ID: Google Sheet ID used for leads/events/queue/KPI tabs
 * - WEBHOOK_SECRET: shared secret that callers must send as the `secret` query
 *   parameter to authenticate POST requests
 * - ADMIN_EMAIL: optional email for daily digest alerts
 *
 * RECOMMENDED SHEET TABS
 * - leads
 * - events
 * - publish_queue
 * - kpi_daily
 */

function doGet() {
  return json({ ok: true, service: 'ebook-automation', status: 'healthy', timestamp: new Date().toISOString() });
}

function doPost(e) {
  try {
    // Authenticate the request using a shared secret stored in Script Properties.
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
    if (expectedSecret) {
      const headerSecret = (e && e.parameter && e.parameter.secret) || '';
      if (headerSecret !== expectedSecret) {
        return json({ ok: false, error: 'Unauthorized' });
      }
    }

    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const sheetId = getRequiredProperty_('LEADS_SHEET_ID');
    const ss = SpreadsheetApp.openById(sheetId);

    if (payload.type === 'publish_queue_upsert') {
      upsertPublishQueue_(ss, payload);
      return json({ ok: true, message: 'queue row upserted' });
    }

    // Default path: event ingestion from app trackEvent()
    const tabName = String(payload.eventName || '').includes('checkout') ? 'events' : 'leads';
    const sheet = getOrCreateSheet_(ss, tabName, ['timestamp', 'eventName', 'email', 'name', 'page', 'payload']);

    sheet.appendRow([
      new Date(),
      sanitize_(payload.eventName || 'unknown'),
      sanitize_(safe_(payload, 'payload.email')),
      sanitize_(safe_(payload, 'payload.name')),
      sanitize_(payload.page || ''),
      JSON.stringify(payload.payload || {}),
    ]);

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

/**
 * Run once manually to create installable triggers.
 */
function installAutomationTriggers() {
  const handlers = ['dailyPublishQueueAudit', 'dailyKpiSnapshot'];
  const existing = ScriptApp.getProjectTriggers().map((t) => t.getHandlerFunction());

  handlers.forEach((handler) => {
    if (!existing.includes(handler)) {
      ScriptApp.newTrigger(handler).timeBased().everyDays(1).atHour(8).create();
    }
  });
}

/**
 * Optional: daily check for scheduled posts and alerts admin.
 */
function dailyPublishQueueAudit() {
  const sheetId = getRequiredProperty_('LEADS_SHEET_ID');
  const adminEmail = PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL');
  if (!adminEmail) return;

  const ss = SpreadsheetApp.openById(sheetId);
  const queue = ss.getSheetByName('publish_queue');
  if (!queue || queue.getLastRow() < 2) return;

  const values = queue.getDataRange().getValues();
  const headers = values[0];
  const rows = values.slice(1);
  const now = new Date();

  const idx = {
    day: headers.indexOf('day'),
    platform: headers.indexOf('platform'),
    publishDatetime: headers.indexOf('publish_datetime'),
    status: headers.indexOf('status'),
  };

  const due = rows.filter((r) => {
    const status = String(r[idx.status] || '').toLowerCase();
    const when = new Date(r[idx.publishDatetime]);
    return status === 'scheduled' && String(when) !== 'Invalid Date' && when <= now;
  });

  if (!due.length) return;

  const body = due
    .slice(0, 30)
    .map((r) => `- Day ${r[idx.day]} | ${r[idx.platform]} | ${r[idx.publishDatetime]}`)
    .join('\n');

  MailApp.sendEmail({
    to: adminEmail,
    subject: `Publish Queue Alert: ${due.length} post(s) due`,
    body: `Scheduled posts ready to publish:\n\n${body}`,
  });
}

/**
 * Daily KPI snapshot from events tab.
 */
function dailyKpiSnapshot() {
  const sheetId = getRequiredProperty_('LEADS_SHEET_ID');
  const ss = SpreadsheetApp.openById(sheetId);
  const events = ss.getSheetByName('events');
  const kpi = getOrCreateSheet_(ss, 'kpi_daily', ['date', 'checkout_started', 'checkout_started_shopify', 'checkout_error']);

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  let started = 0;
  let startedShopify = 0;
  let errors = 0;

  if (events && events.getLastRow() > 1) {
    const data = events.getDataRange().getValues().slice(1);
    data.forEach((row) => {
      const ts = row[0];
      const eventName = String(row[1] || '');
      const rowDate = Utilities.formatDate(new Date(ts), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      if (rowDate !== today) return;
      if (eventName === 'checkout_started') started += 1;
      if (eventName === 'checkout_started_shopify') startedShopify += 1;
      if (eventName === 'checkout_error') errors += 1;
    });
  }

  kpi.appendRow([today, started, startedShopify, errors]);
}

function upsertPublishQueue_(ss, payload) {
  const sheet = getOrCreateSheet_(
    ss,
    'publish_queue',
    ['day', 'platform', 'asset_drive_url', 'caption', 'cta_url', 'publish_datetime', 'status']
  );

  const day = sanitize_(payload.day || '');
  const platform = sanitize_(payload.platform || '');
  const rowValues = [
    day,
    platform,
    sanitize_(payload.assetDriveUrl || ''),
    sanitize_(payload.caption || ''),
    sanitize_(payload.ctaUrl || ''),
    sanitize_(payload.publishDatetime || ''),
    sanitize_(payload.status || 'draft'),
  ];

  // Find an existing row matching day + platform and update it in place.
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  let targetSheetRow = -1; // 1-based row number in the sheet, or -1 if not found

  // Start from index 1 to skip the header row at index 0.
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === day && String(values[i][1]) === platform) {
      targetSheetRow = i + 1; // convert 0-based array index to 1-based sheet row
      break;
    }
  }

  if (targetSheetRow !== -1) {
    sheet.getRange(targetSheetRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }
}

function getOrCreateSheet_(ss, name, headers) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  return sheet;
}

function getRequiredProperty_(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value) throw new Error(`Missing script property: ${key}`);
  return value;
}

function safe_(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
}

/**
 * Prevents spreadsheet formula injection by prefixing strings that start
 * with a formula trigger character (=, +, -, @) with a single quote.
 * Google Sheets treats values written via setValues/appendRow as strings,
 * but this extra guard ensures safety even if that behavior changes.
 */
function sanitize_(value) {
  const str = String(value === null || value === undefined ? '' : value);
  if (str.match(/^[=+\-@]/)) {
    return "'" + str;
  }
  return str;
}

function json(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
