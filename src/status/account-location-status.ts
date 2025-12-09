/**
 * Account Location Status enumeration and metadata
 * Defines availability policies for medical service locations
 */

import type { StatusMetadata, Locale } from './types';

export enum AccountLocationStatus {
  INHERIT = 'inherit',
  ALWAYS_OPEN = 'always_open',
  CLOSED = 'closed',
  PERIODS = 'periods',
}

/**
 * Account Location Status metadata configuration
 */
export const ACCOUNT_LOCATION_STATUS_METADATA: Record<AccountLocationStatus, StatusMetadata> = {
  [AccountLocationStatus.INHERIT]: {
    icon: 'settings_backup_restore',
    color: '#808080', // Gray
    label: {
      short: {
        'us-EN': 'Inherit',
        'fr-FR': 'Hériter',
      },
      long: {
        'us-EN': 'Inherit Settings',
        'fr-FR': 'Hériter des paramètres',
      },
    },
    description: {
      'us-EN': 'Location inherits availability settings from parent',
      'fr-FR': 'Le lieu hérite les paramètres de disponibilité du parent',
    },
  },
  [AccountLocationStatus.ALWAYS_OPEN]: {
    icon: 'public',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Always Open',
        'fr-FR': 'Toujours ouvert',
      },
      long: {
        'us-EN': 'Always Open',
        'fr-FR': 'Toujours ouvert',
      },
    },
    description: {
      'us-EN': 'Location is available 24/7 without restrictions',
      'fr-FR': 'Le lieu est disponible 24h/24, 7j/7 sans restrictions',
    },
  },
  [AccountLocationStatus.CLOSED]: {
    icon: 'block',
    color: '#F44336', // Red
    label: {
      short: {
        'us-EN': 'Closed',
        'fr-FR': 'Fermé',
      },
      long: {
        'us-EN': 'Closed',
        'fr-FR': 'Fermé',
      },
    },
    description: {
      'us-EN': 'Location is closed and unavailable for services',
      'fr-FR': 'Le lieu est fermé et indisponible pour les services',
    },
  },
  [AccountLocationStatus.PERIODS]: {
    icon: 'schedule',
    color: '#2196F3', // Blue
    label: {
      short: {
        'us-EN': 'Periods',
        'fr-FR': 'Périodes',
      },
      long: {
        'us-EN': 'Custom Periods',
        'fr-FR': 'Périodes personnalisées',
      },
    },
    description: {
      'us-EN': 'Location has custom availability periods',
      'fr-FR': 'Le lieu a des périodes de disponibilité personnalisées',
    },
  },
};

/**
 * Get status metadata
 */
export function getStatusMetadata(status: AccountLocationStatus): StatusMetadata {
  return ACCOUNT_LOCATION_STATUS_METADATA[status];
}

/**
 * Get status icon
 */
export function getStatusIcon(status: AccountLocationStatus): string {
  return ACCOUNT_LOCATION_STATUS_METADATA[status].icon;
}

/**
 * Get status color
 */
export function getStatusColor(status: AccountLocationStatus): string {
  return ACCOUNT_LOCATION_STATUS_METADATA[status].color;
}

/**
 * Get status label (short or long)
 */
export function getStatusLabel(
  status: AccountLocationStatus,
  locale: Locale = 'us-EN',
  format: 'short' | 'long' = 'short',
): string {
  return ACCOUNT_LOCATION_STATUS_METADATA[status].label[format][locale];
}

/**
 * Get status description
 */
export function getStatusDescription(status: AccountLocationStatus, locale: Locale = 'us-EN'): string {
  return ACCOUNT_LOCATION_STATUS_METADATA[status].description[locale];
}

/**
 * Get all available statuses
 */
export function getAllAccountLocationStatuses(): AccountLocationStatus[] {
  return Object.values(AccountLocationStatus);
}

/**
 * Check if a value is a valid AccountLocationStatus
 */
export function isValidAccountLocationStatus(value: string): value is AccountLocationStatus {
  return Object.values(AccountLocationStatus).includes(value as AccountLocationStatus);
}
