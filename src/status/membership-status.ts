/**
 * Membership Status enumeration and metadata
 * Describes the lifecycle state of a user's membership in an account
 */

import type { StatusMetadata, Locale } from './types';

export enum MembershipStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  REVOKED = 'revoked',
  REFUSED = 'refused',
}

/**
 * Membership Status metadata configuration
 */
export const MEMBERSHIP_STATUS_METADATA: Record<MembershipStatus, StatusMetadata> = {
  [MembershipStatus.ACTIVE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Active',
        'fr-FR': 'Actif',
      },
      long: {
        'us-EN': 'Active Membership',
        'fr-FR': 'Adhésion active',
      },
    },
    description: {
      'us-EN': 'The membership is valid and grants normal access',
      'fr-FR': "L'adhésion est valide et accorde un accès normal",
    },
  },
  [MembershipStatus.PENDING]: {
    icon: 'schedule',
    color: '#FF9800', // Orange
    label: {
      short: {
        'us-EN': 'Pending',
        'fr-FR': 'En attente',
      },
      long: {
        'us-EN': 'Pending Membership',
        'fr-FR': 'Adhésion en attente',
      },
    },
    description: {
      'us-EN': 'The membership exists but setup/invitation is not fully completed yet',
      'fr-FR': "L'adhésion existe mais la configuration/invitation n'est pas encore complètement terminée",
    },
  },
  [MembershipStatus.REVOKED]: {
    icon: 'cancel',
    color: '#F44336', // Red
    label: {
      short: {
        'us-EN': 'Revoked',
        'fr-FR': 'Révoqué',
      },
      long: {
        'us-EN': 'Revoked Membership',
        'fr-FR': 'Adhésion révoquée',
      },
    },
    description: {
      'us-EN': 'The membership was removed and no longer grants access',
      'fr-FR': "L'adhésion a été supprimée et n'accorde plus d'accès",
    },
  },
  [MembershipStatus.REFUSED]: {
    icon: 'block',
    color: '#9C27B0', // Purple
    label: {
      short: {
        'us-EN': 'Refused',
        'fr-FR': 'Refusé',
      },
      long: {
        'us-EN': 'Refused Membership',
        'fr-FR': 'Adhésion refusée',
      },
    },
    description: {
      'us-EN': 'The invitation or membership was explicitly declined and grants no access',
      'fr-FR': "L'invitation ou l'adhésion a été explicitement refusée et n'accorde pas d'accès",
    },
  },
};

/**
 * Get status metadata
 */
export function getStatusMetadata(status: MembershipStatus): StatusMetadata {
  return MEMBERSHIP_STATUS_METADATA[status];
}

/**
 * Get status icon
 */
export function getStatusIcon(status: MembershipStatus): string {
  return getStatusMetadata(status).icon;
}

/**
 * Get status color
 */
export function getStatusColor(status: MembershipStatus): string {
  return getStatusMetadata(status).color;
}

/**
 * Get status short label
 */
export function getStatusLabel(status: MembershipStatus, locale: Locale): string {
  return getStatusMetadata(status).label.short[locale];
}

/**
 * Get status long label
 */
export function getStatusLongLabel(status: MembershipStatus, locale: Locale): string {
  return getStatusMetadata(status).label.long[locale];
}

/**
 * Get status description
 */
export function getStatusDescription(status: MembershipStatus, locale: Locale): string {
  return getStatusMetadata(status).description[locale];
}

/**
 * Check if membership is in an active usable state
 */
export function isActiveMembership(status: MembershipStatus): boolean {
  return status === MembershipStatus.ACTIVE;
}

/**
 * Check if membership is in a pending incomplete state
 */
export function isPendingMembership(status: MembershipStatus): boolean {
  return status === MembershipStatus.PENDING;
}

/**
 * Check if membership is in an inactive end state (revoked or refused)
 */
export function isInactiveMembership(status: MembershipStatus): boolean {
  return status === MembershipStatus.REVOKED || status === MembershipStatus.REFUSED;
}
