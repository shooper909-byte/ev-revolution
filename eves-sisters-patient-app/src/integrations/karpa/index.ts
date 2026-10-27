import { integrationConfig } from './config';
import { createHostedPortalHandoff } from './hostedPortal';
import { createMockClient } from './mock/mockClient';
import type { ClinicalPlatformClient } from './ports';

export * from './errors';
export type * from './ports';
export type * from './types';
export { createMockClient } from './mock/mockClient';
export { createHostedPortalHandoff } from './hostedPortal';

/**
 * Hosts approved for hosted-portal handoff. Empty until a Karpa portal host
 * is confirmed in writing. Adding a host here is a reviewed change.
 */
export const APPROVED_PORTAL_HOSTS: string[] = [];

/**
 * The one client instance the app uses.
 *
 * - "mock" (default): fictional data, every clinical action simulated.
 * - "hosted-portal": still mock data for native screens, plus handoff URLs for
 *   approved portal pages (none are approved yet, so behaves like mock).
 * - "live": intentionally not implemented. There is no documented Karpa API
 *   to build against; see docs/KARPA_INTEGRATION_REQUIREMENTS.md.
 */
function createClient(): ReturnType<typeof createMockClient> {
  const client = createMockClient();
  if (integrationConfig.mode === 'hosted-portal') {
    client.handoff = createHostedPortalHandoff(integrationConfig.portal, APPROVED_PORTAL_HOSTS);
  }
  return client;
}

export const karpa = createClient();
export type AppClient = ClinicalPlatformClient;
