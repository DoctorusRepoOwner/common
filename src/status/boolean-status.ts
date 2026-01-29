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
 * Boolean Status preset type
 */
export type BooleanStatusPreset =
  | 'yesNo'
  | 'activeInactive'
  | 'enabledDisabled'
  | 'validInvalid'
  | 'verifiedUnverified'
  | 'subscribedNotSubscribed';

/**
 * Preset metadata configurations for common boolean label pairs
 */
const YES_NO_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
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
        'us-EN': 'No',
        'fr-FR': 'Non',
      },
    },
    description: {
      'us-EN': 'Status is inactive or disabled',
      'fr-FR': 'Le statut est inactif ou désactivé',
    },
  },
};

const ACTIVE_INACTIVE_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
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
        'us-EN': 'Inactive',
        'fr-FR': 'Inactif',
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

const ENABLED_DISABLED_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
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
    description: {
      'us-EN': 'Status is enabled',
      'fr-FR': 'Le statut est activé',
    },
  },
  [BooleanStatus.FALSE]: {
    icon: 'cancel',
    color: '#F44336', // Red
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
    description: {
      'us-EN': 'Status is disabled',
      'fr-FR': 'Le statut est désactivé',
    },
  },
};

const VALID_INVALID_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
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
    description: {
      'us-EN': 'Status is valid',
      'fr-FR': 'Le statut est valide',
    },
  },
  [BooleanStatus.FALSE]: {
    icon: 'cancel',
    color: '#F44336', // Red
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
    description: {
      'us-EN': 'Status is invalid',
      'fr-FR': 'Le statut est invalide',
    },
  },
};

const VERIFIED_UNVERIFIED_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Verified',
        'fr-FR': 'Vérifié',
      },
      long: {
        'us-EN': 'Verified',
        'fr-FR': 'Vérifié',
      },
    },
    description: {
      'us-EN': 'Status is verified',
      'fr-FR': 'Le statut est vérifié',
    },
  },
  [BooleanStatus.FALSE]: {
    icon: 'cancel',
    color: '#F44336', // Red
    label: {
      short: {
        'us-EN': 'Unverified',
        'fr-FR': 'Non vérifié',
      },
      long: {
        'us-EN': 'Unverified',
        'fr-FR': 'Non vérifié',
      },
    },
    description: {
      'us-EN': 'Status is unverified',
      'fr-FR': "Le statut n'est pas vérifié",
    },
  },
};

const SUBSCRIBED_NOT_SUBSCRIBED_METADATA: Record<BooleanStatus, StatusMetadata> = {
  [BooleanStatus.TRUE]: {
    icon: 'check_circle',
    color: '#4CAF50', // Green
    label: {
      short: {
        'us-EN': 'Subscribed',
        'fr-FR': 'Abonné',
      },
      long: {
        'us-EN': 'Subscribed',
        'fr-FR': 'Abonné',
      },
    },
    description: {
      'us-EN': 'User is subscribed',
      'fr-FR': "L'utilisateur est abonné",
    },
  },
  [BooleanStatus.FALSE]: {
    icon: 'block',
    color: '#9E9E9E', // Gray
    label: {
      short: {
        'us-EN': 'Not Subscribed',
        'fr-FR': 'Non abonné',
      },
      long: {
        'us-EN': 'Not Subscribed',
        'fr-FR': 'Non abonné',
      },
    },
    description: {
      'us-EN': 'User is not subscribed',
      'fr-FR': "L'utilisateur n'est pas abonné",
    },
  },
};

/**
 * Boolean Status preset metadata registry
 * Maps preset names to their metadata configurations
 */
export const BOOLEAN_METADATA_REGISTRY: Record<BooleanStatusPreset, Record<BooleanStatus, StatusMetadata>> = {
  yesNo: YES_NO_METADATA,
  activeInactive: ACTIVE_INACTIVE_METADATA,
  enabledDisabled: ENABLED_DISABLED_METADATA,
  validInvalid: VALID_INVALID_METADATA,
  verifiedUnverified: VERIFIED_UNVERIFIED_METADATA,
  subscribedNotSubscribed: SUBSCRIBED_NOT_SUBSCRIBED_METADATA,
};
