import { GOOGLE_AUTOMATION_CONFIG } from '../config';

type EventPayload = Record<string, unknown>;

export function trackEvent(eventName: string, payload: EventPayload = {}) {
  const event = {
    eventName,
    payload,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // Local visibility during setup
  console.log('[trackEvent]', event);

  const { webAppUrl } = GOOGLE_AUTOMATION_CONFIG;
  if (!webAppUrl) return;

  const body = JSON.stringify(event);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(webAppUrl, blob);
    return;
  }

  void fetch(webAppUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch((error) => {
    console.warn('Failed to send tracking event', error);
  });
}
