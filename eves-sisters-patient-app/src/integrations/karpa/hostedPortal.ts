import type { HandoffPort } from './ports';
import type { HandoffTarget } from './types';

/**
 * Hosted-portal / deep-link fallback.
 *
 * If Karpa offers a patient portal but no API, the app can hand the patient
 * to that portal for clinical actions while keeping branded, non-clinical
 * screens native. The portal opens in the system auth browser
 * (SFSafariViewController / Chrome Custom Tabs via expo-web-browser), so the
 * portal owns its own session cookies and the app never sees clinical data.
 *
 * Rules enforced here:
 *  - HTTPS only, and only hosts on an explicit allow-list.
 *  - Nothing is appended to the URL: no tokens, no email, no health data.
 *    Only the configured URL is returned.
 *
 * No portal URL is configured today; every target returns null and the UI
 * shows the action as unavailable.
 */
export function createHostedPortalHandoff(
  portal: Record<HandoffTarget, string | null>,
  allowedHosts: string[],
): HandoffPort {
  return {
    urlFor(target) {
      const raw = portal[target];
      if (!raw) return null;
      try {
        const url = new URL(raw);
        if (url.protocol !== 'https:') return null;
        if (!allowedHosts.includes(url.hostname)) return null;
        return url.toString();
      } catch {
        return null;
      }
    },
  };
}
