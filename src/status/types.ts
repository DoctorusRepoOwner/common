/**
 * Shared status types for all status modules
 * Provides common interfaces and types used across status definitions
 */

import type { Locale } from '../operations/labels';

/**
 * Status metadata interface
 * Defines the structure for all status metadata including icons, colors, and translations
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
 * Generic status configuration type
 * Used to define metadata for any enum-based status
 */
export type StatusConfiguration<T extends string | number> = Record<T, StatusMetadata>;

/**
 * Utility type for locale parameter
 */
export type { Locale };
