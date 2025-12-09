/**
 * Medical Service Status enumeration and metadata
 */

import type { StatusMetadata, Locale } from './types';

export enum MedicalServiceStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  ON_WAITING_ROOM = 'on_waiting_room',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

/**
 * Medical Service Status metadata configuration
 */
export const MEDICAL_SERVICE_STATUS_METADATA: Record<MedicalServiceStatus, StatusMetadata> = {
  [MedicalServiceStatus.PENDING]: {
    icon: 'schedule',
    color: '#9E9E9E', // Gray
    label: {
      short: {
        'us-EN': 'Pending',
        'fr-FR': 'En attente',
      },
      long: {
        'us-EN': 'Pending Service',
        'fr-FR': 'Service en attente',
      },
    },
    description: {
      'us-EN': 'The medical service is scheduled and waiting to begin',
      'fr-FR': 'Le service médical est planifié et en attente de démarrage',
    },
  },
  [MedicalServiceStatus.ON_WAITING_ROOM]: {
    icon: 'event_busy',
    color: '#FF9800', // Orange
    label: {
      short: {
        'us-EN': 'Waiting',
        'fr-FR': 'En attente',
      },
      long: {
        'us-EN': 'In Waiting Room',
        'fr-FR': "Dans la salle d'attente",
      },
    },
    description: {
      'us-EN': 'Patient has checked in and is waiting in the waiting room',
      'fr-FR': "Le patient s'est enregistré et attend dans la salle d'attente",
    },
  },
  [MedicalServiceStatus.IN_PROGRESS]: {
    icon: 'medical_services',
    color: '#2196F3', // Blue
    label: {
      short: {
        'us-EN': 'In Progress',
        'fr-FR': 'En cours',
      },
      long: {
        'us-EN': 'Service In Progress',
        'fr-FR': 'Service en cours',
      },
    },
    description: {
      'us-EN': 'The medical service consultation is currently in progress',
      'fr-FR': 'La consultation du service médical est actuellement en cours',
    },
  },
  [MedicalServiceStatus.COMPLETED]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Completed',
        'fr-FR': 'Terminé',
      },
      long: {
        'us-EN': 'Service Completed',
        'fr-FR': 'Service terminé',
      },
    },
    description: {
      'us-EN': 'The medical service has been successfully completed',
      'fr-FR': 'Le service médical a été terminé avec succès',
    },
  },
  [MedicalServiceStatus.CANCELED]: {
    icon: 'cancel',
    color: '#F44336', // Red
    label: {
      short: {
        'us-EN': 'Canceled',
        'fr-FR': 'Annulé',
      },
      long: {
        'us-EN': 'Service Canceled',
        'fr-FR': 'Service annulé',
      },
    },
    description: {
      'us-EN': 'The medical service has been canceled and will not proceed',
      'fr-FR': 'Le service médical a été annulé et ne sera pas effectué',
    },
  },
};

/**
 * Get status metadata
 */
export function getStatusMetadata(status: MedicalServiceStatus): StatusMetadata {
  return MEDICAL_SERVICE_STATUS_METADATA[status];
}

/**
 * Get status icon
 */
export function getStatusIcon(status: MedicalServiceStatus): string {
  return MEDICAL_SERVICE_STATUS_METADATA[status].icon;
}

/**
 * Get status color
 */
export function getStatusColor(status: MedicalServiceStatus): string {
  return MEDICAL_SERVICE_STATUS_METADATA[status].color;
}

/**
 * Get status label (short or long)
 */
export function getStatusLabel(
  status: MedicalServiceStatus,
  locale: Locale = 'us-EN',
  format: 'short' | 'long' = 'short',
): string {
  return MEDICAL_SERVICE_STATUS_METADATA[status].label[format][locale];
}

/**
 * Get status description
 */
export function getStatusDescription(status: MedicalServiceStatus, locale: Locale = 'us-EN'): string {
  return MEDICAL_SERVICE_STATUS_METADATA[status].description[locale];
}

/**
 * Get all available statuses
 */
export function getAllMedicalServiceStatuses(): MedicalServiceStatus[] {
  return Object.values(MedicalServiceStatus);
}

/**
 * Check if a value is a valid MedicalServiceStatus
 */
export function isValidMedicalServiceStatus(value: string): value is MedicalServiceStatus {
  return Object.values(MedicalServiceStatus).includes(value as MedicalServiceStatus);
}

/**
 * Status transition rules (optional: define which transitions are allowed)
 */
export const MEDICAL_SERVICE_STATUS_TRANSITIONS: Record<MedicalServiceStatus, MedicalServiceStatus[]> = {
  [MedicalServiceStatus.PENDING]: [
    MedicalServiceStatus.ON_WAITING_ROOM,
    MedicalServiceStatus.IN_PROGRESS,
    MedicalServiceStatus.CANCELED,
  ],
  [MedicalServiceStatus.ON_WAITING_ROOM]: [
    MedicalServiceStatus.IN_PROGRESS,
    MedicalServiceStatus.CANCELED,
    MedicalServiceStatus.PENDING,
  ],
  [MedicalServiceStatus.IN_PROGRESS]: [MedicalServiceStatus.COMPLETED, MedicalServiceStatus.CANCELED],
  [MedicalServiceStatus.COMPLETED]: [MedicalServiceStatus.IN_PROGRESS], // Allow reopening
  [MedicalServiceStatus.CANCELED]: [MedicalServiceStatus.PENDING], // Allow uncanceling
};

/**
 * Check if a status transition is valid
 */
export function isValidTransition(from: MedicalServiceStatus, to: MedicalServiceStatus): boolean {
  return MEDICAL_SERVICE_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Get allowed transitions from a status
 */
export function getAllowedTransitions(status: MedicalServiceStatus): MedicalServiceStatus[] {
  return MEDICAL_SERVICE_STATUS_TRANSITIONS[status] ?? [];
}
