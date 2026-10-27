import type { HandoffTarget } from './types';
import type { IntegrationMode } from './ports';

/**
 * Integration configuration, read from public Expo env vars.
 *
 * `EXPO_PUBLIC_*` values are bundled into the app binary and are readable by
 * anyone who has it. They must never contain secrets, API keys or client
 * secrets. A live integration that needs credentials requires a backend
 * (see docs/SECURITY_COMPLIANCE_CHECKLIST.md).
 */
export type IntegrationConfig = {
  mode: IntegrationMode;
  /**
   * Hosted-portal URLs. Each entry stays null until Karpa (or the approved
   * vendor) confirms the URL in writing and the handoff is reviewed.
   */
  portal: Record<HandoffTarget, string | null>;
};

const requestedMode = process.env.EXPO_PUBLIC_INTEGRATION_MODE;

function httpsOrNull(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export const integrationConfig: IntegrationConfig = {
  mode: requestedMode === 'hosted-portal' ? 'hosted-portal' : 'mock',
  portal: {
    intake: httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_INTAKE_URL),
    scheduling: httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_SCHEDULING_URL),
    'video-visit': httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_VIDEO_URL),
    messages: httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_MESSAGES_URL),
    billing: httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_BILLING_URL),
    records: httpsOrNull(process.env.EXPO_PUBLIC_PORTAL_RECORDS_URL),
  },
};

export { httpsOrNull };
