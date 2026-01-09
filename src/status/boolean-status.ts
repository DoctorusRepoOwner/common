/**
 * Generic Boolean Status enumeration and metadata
 * Provides flexible labeling for boolean states with support for multiple label pairs
 */

import type { StatusMetadata } from './types';

export enum BooleanStatus {
  TRUE = 'true',
  FALSE = 'false',
}

/**
 * Boolean Status metadata configuration with default labels
 * Can be overridden for specific use cases (e.g., active/inactive, yes/no, enabled/disabled)
 */
export const BOOLEAN_STATUS_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Yes',
        'fr-FR': 'Oui',
      },
      long: {
        'us-EN': 'Active',
        'fr-FR': 'Actif',
      },
    },
    description: {
      'us-EN': 'Status is active or enabled',
      'fr-FR': 'Le statut est actif ou activé',
    },
  },
  [BooleanStatus.FALSE]: {
    icon: 'cancel',
    color: '#F44336', // Red
    label: {
      short: {
        'us-EN': 'No',
        'fr-FR': 'Non',
      },
      long: {
        'us-EN': 'Inactive',
        'fr-FR': 'Inactif',
      },
    },
    description: {
      'us-EN': 'Status is inactive or disabled',
      'fr-FR': 'Le statut est inactif ou désactivé',
    },
  },
};

/**
 * Preset metadata configurations for common boolean label pairs
 */
export const BOOLEAN_STATUS_PRESETS = {
  /**
   * Yes/No preset
   */
  yesNo: (): Record<BooleanStatus, StatusMetadata> => ({
    [BooleanStatus.TRUE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE],
      label: {
        short: {
          'us-EN': 'Yes',
          'fr-FR': 'Oui',
        },
        long: {
          'us-EN': 'Yes',
          'fr-FR': 'Oui',
        },
      },
    },
    [BooleanStatus.FALSE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE],
      label: {
        short: {
          'us-EN': 'No',
          'fr-FR': 'Non',
        },
        long: {
          'us-EN': 'No',
          'fr-FR': 'Non',
        },
      },
    },
  }),

  /**
   * Active/Inactive preset
   */
  activeInactive: (): Record<BooleanStatus, StatusMetadata> => ({
    [BooleanStatus.TRUE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE],
      label: {
        short: {
          'us-EN': 'Active',
          'fr-FR': 'Actif',
        },
        long: {
          'us-EN': 'Active',
          'fr-FR': 'Actif',
        },
      },
    },
    [BooleanStatus.FALSE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE],
      label: {
        short: {
          'us-EN': 'Inactive',
          'fr-FR': 'Inactif',
        },
        long: {
          'us-EN': 'Inactive',
          'fr-FR': 'Inactif',
        },
      },
    },
  }),

  /**
   * Enabled/Disabled preset
   */
  enabledDisabled: (): Record<BooleanStatus, StatusMetadata> => ({
    [BooleanStatus.TRUE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE],
      label: {
        short: {
          'us-EN': 'Enabled',
          'fr-FR': 'Activé',
        },
        long: {
          'us-EN': 'Enabled',
          'fr-FR': 'Activé',
        },
      },
    },
    [BooleanStatus.FALSE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE],
      label: {
        short: {
          'us-EN': 'Disabled',
          'fr-FR': 'Désactivé',
        },
        long: {
          'us-EN': 'Disabled',
          'fr-FR': 'Désactivé',
        },
      },
    },
  }),

  /**
   * Valid/Invalid preset
   */
  validInvalid: (): Record<BooleanStatus, StatusMetadata> => ({
    [BooleanStatus.TRUE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.TRUE],
      label: {
        short: {
          'us-EN': 'Valid',
          'fr-FR': 'Valide',
        },
        long: {
          'us-EN': 'Valid',
          'fr-FR': 'Valide',
        },
      },
    },
    [BooleanStatus.FALSE]: {
      ...BOOLEAN_STATUS_METADATA[BooleanStatus.FALSE],
      label: {
        short: {
          'us-EN': 'Invalid',
          'fr-FR': 'Invalide',
        },
        long: {
          'us-EN': 'Invalid',
          'fr-FR': 'Invalide',
        },
      },
    },
  }),
};
