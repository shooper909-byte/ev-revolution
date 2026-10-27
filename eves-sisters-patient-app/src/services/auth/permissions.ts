import type { Role } from '@/integrations/karpa/types';

/**
 * Role-based authorization for UI gating.
 *
 * Client-side checks only decide what to *show*. Every real authorization
 * decision must also be enforced server-side by the clinical platform or the
 * Eve's Sisters backend; the device is never trusted.
 */
export type Permission =
  | 'appointments:read'
  | 'appointments:schedule'
  | 'appointments:cancel'
  | 'care-plan:read'
  | 'intake:submit'
  | 'membership:manage'
  | 'messages:read'
  | 'messages:send'
  | 'journey:write'
  | 'account:delete-request'
  | 'patients:read-assigned'
  | 'care-plan:write'
  | 'audit:read';

const rolePermissions: Record<Role, readonly Permission[]> = {
  patient: [
    'appointments:read',
    'appointments:schedule',
    'appointments:cancel',
    'care-plan:read',
    'intake:submit',
    'membership:manage',
    'messages:read',
    'messages:send',
    'journey:write',
    'account:delete-request',
  ],
  // Non-clinical support staff: scheduling help only, no clinical records.
  support: ['appointments:read', 'appointments:schedule', 'appointments:cancel', 'messages:read', 'messages:send'],
  clinician: ['appointments:read', 'patients:read-assigned', 'care-plan:read', 'care-plan:write', 'messages:read', 'messages:send'],
  admin: ['audit:read'],
};

export function can(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  return rolePermissions[role].includes(permission);
}

/** This app is the patient app; other roles are rejected at sign-in. */
export const APP_ALLOWED_ROLES: readonly Role[] = ['patient'];
