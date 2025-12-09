/**
 * Medical History Status enumeration and metadata
 * Defines the status of medical history records (active or expired)
 */

import type { Locale } from '../operations/labels';

export enum MedicalHistoryStatus {
  CURRENT = 'current',
  EXPIRED = 'expired',
}

/**
 * Status metadata including icons, colors, and translations
 */
export interface StatusMetadata {
  icon: string; // Material icon name
  color: string; // Hex color or CSS color name
  label: {
    short: {
      'us-EN': string;
      'fr-FR': string;
    };
    long: {
      'us-EN': string;
      'fr-FR': string;
    };
  };
  description: {
    'us-EN': string;
    'fr-FR': string;
  };
}

/**
 * Medical History Status metadata configuration
 */
export const MEDICAL_HISTORY_STATUS_METADATA: Record<MedicalHistoryStatus, StatusMetadata> = {
  [MedicalHistoryStatus.CURRENT]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Active',
        'fr-FR': 'Actif',
      },
      long: {
        'us-EN': 'Currently Active',
        'fr-FR': 'Actuellement actif',
      },
    },
    description: {
      'us-EN': 'Medical history record is currently active and relevant',
      'fr-FR': "L'historique médical est actuellement actif et pertinent",
    },
  },
  [MedicalHistoryStatus.EXPIRED]: {
    icon: 'do_not_disturb_on',
    color: '#808080', // Gray
    label: {
      short: {
        'us-EN': 'Expired',
        'fr-FR': 'Expiré',
      },
      long: {
        'us-EN': 'Expired Record',
        'fr-FR': 'Enregistrement expiré',
      },
    },
    description: {
      'us-EN': 'Medical history record has expired and is no longer current',
      'fr-FR': "L'historique médical a expiré et n'est plus actuel",
    },
  },
};

/**
 * Get status metadata
 */
export function getStatusMetadata(status: MedicalHistoryStatus): StatusMetadata {
  return MEDICAL_HISTORY_STATUS_METADATA[status];
}

/**
 * Get status icon
 */
export function getStatusIcon(status: MedicalHistoryStatus): string {
  return MEDICAL_HISTORY_STATUS_METADATA[status].icon;
}

/**
 * Get status color
 */
export function getStatusColor(status: MedicalHistoryStatus): string {
  return MEDICAL_HISTORY_STATUS_METADATA[status].color;
}

/**
 * Get status label (short or long)
 */
export function getStatusLabel(
  status: MedicalHistoryStatus,
  locale: Locale = 'us-EN',
  format: 'short' | 'long' = 'short',
): string {
  return MEDICAL_HISTORY_STATUS_METADATA[status].label[format][locale];
}

/**
 * Get status description
 */
export function getStatusDescription(status: MedicalHistoryStatus, locale: Locale = 'us-EN'): string {
  return MEDICAL_HISTORY_STATUS_METADATA[status].description[locale];
}

/**
 * Get all available statuses
 */
export function getAllMedicalHistoryStatuses(): MedicalHistoryStatus[] {
  return Object.values(MedicalHistoryStatus);
}

/**
 * Check if a value is a valid MedicalHistoryStatus
 */
export function isValidMedicalHistoryStatus(value: string): value is MedicalHistoryStatus {
  return Object.values(MedicalHistoryStatus).includes(value as MedicalHistoryStatus);
}
