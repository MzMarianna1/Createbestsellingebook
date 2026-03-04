import { GOOGLE_AUTOMATION_CONFIG } from '../config';

type EventPayload = Record<string, unknown>;

export function trackEvent(eventName: string, payload: EventPayload = {}) {
  const event = {
    eventName,
    payload,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  if (import.meta.env.DEV) {
    console.log('[trackEvent]', event);
  }

  const { webAppUrl, webhookSecret } = GOOGLE_AUTOMATION_CONFIG;
  if (!webAppUrl) return;

  const url = webhookSecret
    ? `${webAppUrl}?secret=${encodeURIComponent(webhookSecret)}`
    : webAppUrl;

  const body = JSON.stringify(event);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'text/plain' });
    navigator.sendBeacon(url, blob);
    return;
  }

  void fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body,
    keepalive: true,
  }).catch((error) => {
    if (import.meta.env.DEV) {
      console.warn('Failed to send tracking event', error);
    }
  });
}
