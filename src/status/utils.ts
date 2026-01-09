/**
 * Status utilities for extracting and querying status metadata
 * Provides common functions to work with status configurations
 */

import type { BooleanStatus } from './boolean-status';
import type { AccountLocationStatus } from './account-location-status';
import type { MedicalHistoryStatus } from './medical-history-status';
import type { MedicalServiceStatus } from './medical-service-status';
import type { StatusMetadata, Locale } from './types';
import { BOOLEAN_METADATA_REGISTRY } from './boolean-status';
import { ACCOUNT_LOCATION_STATUS_METADATA } from './account-location-status';
import { MEDICAL_HISTORY_STATUS_METADATA } from './medical-history-status';
import { MEDICAL_SERVICE_STATUS_METADATA } from './medical-service-status';

/**
 * Feature type for status selection
 */
export type StatusFeature =
  | 'medicalService'
  | 'accountLocation'
  | 'medicalHistory'
  | 'yesNo'
  | 'activeInactive'
  | 'enabledDisabled'
  | 'validInvalid';

/**
 * Status type mapping for each feature
 */
export type StatusTypeMap = {
  medicalService: MedicalServiceStatus;
  accountLocation: AccountLocationStatus;
  medicalHistory: MedicalHistoryStatus;
  yesNo: BooleanStatus;
  activeInactive: BooleanStatus;
  enabledDisabled: BooleanStatus;
  validInvalid: BooleanStatus;
};

/**
 * Metadata registry mapping features to their status configurations
 */
const METADATA_REGISTRY: Record<StatusFeature, Record<string | number, StatusMetadata>> = {
  medicalService: MEDICAL_SERVICE_STATUS_METADATA,
  accountLocation: ACCOUNT_LOCATION_STATUS_METADATA,
  medicalHistory: MEDICAL_HISTORY_STATUS_METADATA,
  yesNo: BOOLEAN_METADATA_REGISTRY.yesNo,
  activeInactive: BOOLEAN_METADATA_REGISTRY.activeInactive,
  enabledDisabled: BOOLEAN_METADATA_REGISTRY.enabledDisabled,
  validInvalid: BOOLEAN_METADATA_REGISTRY.validInvalid,
};

/**
 * Get status metadata for a specific feature and status
 * @param feature - The feature name (e.g., 'medicalService', 'accountLocation')
 * @param status - The status value
 * @returns The complete StatusMetadata for the given feature and status
 * @throws Error if feature or status is not found
 */
export function getStatusMetadataForFeature<T extends StatusFeature>(
  feature: T,
  status: StatusTypeMap[T],
): StatusMetadata {
  const registry = METADATA_REGISTRY[feature];
  if (!registry) {
    throw new Error(`Unknown status feature: ${feature}`);
  }

  const metadata = registry[status];
  if (!metadata) {
    throw new Error(`Unknown status for feature ${feature}: ${status}`);
  }

  return metadata;
}

/**
 * Get status icon for a specific feature and status
 * @param feature - The feature name
 * @param status - The status value
 * @returns The Material icon name
 */
export function getStatusIconForFeature<T extends StatusFeature>(feature: T, status: StatusTypeMap[T]): string {
  return getStatusMetadataForFeature(feature, status).icon;
}

/**
 * Get status color for a specific feature and status
 * @param feature - The feature name
 * @param status - The status value
 * @returns The hex color code
 */
export function getStatusColorForFeature<T extends StatusFeature>(feature: T, status: StatusTypeMap[T]): string {
  return getStatusMetadataForFeature(feature, status).color;
}

/**
 * Get status label for a specific feature and status
 * @param feature - The feature name
 * @param status - The status value
 * @param locale - The language locale (default: 'us-EN')
 * @param format - Label format: 'short' or 'long' (default: 'short')
 * @returns The translated label
 */
export function getStatusLabelForFeature<T extends StatusFeature>(
  feature: T,
  status: StatusTypeMap[T],
  locale: Locale = 'us-EN',
  format: 'short' | 'long' = 'short',
): string {
  const metadata = getStatusMetadataForFeature(feature, status);
  return metadata.label[format][locale];
}

/**
 * Get status description for a specific feature and status
 * @param feature - The feature name
 * @param status - The status value
 * @param locale - The language locale (default: 'us-EN')
 * @returns The translated description
 */
export function getStatusDescriptionForFeature<T extends StatusFeature>(
  feature: T,
  status: StatusTypeMap[T],
  locale: Locale = 'us-EN',
): string {
  return getStatusMetadataForFeature(feature, status).description[locale];
}

/**
 * Get all metadata for a specific feature
 * @param feature - The feature name
 * @returns Record of all statuses and their metadata for the feature
 */
export function getAllStatusMetadataForFeature<T extends StatusFeature>(
  feature: T,
): Record<StatusTypeMap[T], StatusMetadata> {
  const registry = METADATA_REGISTRY[feature];
  if (!registry) {
    throw new Error(`Unknown status feature: ${feature}`);
  }
  return registry as Record<StatusTypeMap[T], StatusMetadata>;
}

/**
 * Get all statuses for a specific feature
 * @param feature - The feature name
 * @returns Array of all status values for the feature
 */
export function getAllStatusesForFeature<T extends StatusFeature>(feature: T): StatusTypeMap[T][] {
  const metadata = getAllStatusMetadataForFeature(feature);
  return Object.keys(metadata) as StatusTypeMap[T][];
}

/**
 * Filter statuses by criteria
 * @param feature - The feature name
 * @param predicate - Function to test each status metadata
 * @returns Array of statuses that match the predicate
 */
export function filterStatusesByFeature<T extends StatusFeature>(
  feature: T,
  predicate: (metadata: StatusMetadata, status: StatusTypeMap[T]) => boolean,
): StatusTypeMap[T][] {
  const metadata = getAllStatusMetadataForFeature(feature);
  return Object.entries(metadata)
    .filter(([status, meta]) => predicate(meta as StatusMetadata, status as StatusTypeMap[T]))
    .map(([status]) => status as StatusTypeMap[T]);
}

/**
 * Map statuses to a specific value using a transform function
 * @param feature - The feature name
 * @param transform - Function to transform each status metadata
 * @returns Record of statuses mapped to the transformed values
 */
export function mapStatusesByFeature<T extends StatusFeature, U>(
  feature: T,
  transform: (metadata: StatusMetadata, status: StatusTypeMap[T]) => U,
): Record<StatusTypeMap[T], U> {
  const metadata = getAllStatusMetadataForFeature(feature);
  const result: Record<string, U> = {};

  Object.entries(metadata).forEach(([status, meta]) => {
    result[status] = transform(meta as StatusMetadata, status as StatusTypeMap[T]);
  });

  return result as Record<StatusTypeMap[T], U>;
}

/**
 * Get status metadata with computed properties
 * @param feature - The feature name
 * @param status - The status value
 * @param locale - The language locale
 * @returns Extended metadata with computed labels and description
 */
export interface ExtendedStatusMetadata extends Omit<StatusMetadata, 'description'> {
  shortLabel: string;
  longLabel: string;
  description: string;
}

export function getExtendedStatusMetadataForFeature<T extends StatusFeature>(
  feature: T,
  status: StatusTypeMap[T],
  locale: Locale = 'us-EN',
): ExtendedStatusMetadata {
  const metadata = getStatusMetadataForFeature(feature, status);

  return {
    icon: metadata.icon,
    color: metadata.color,
    label: metadata.label,
    shortLabel: metadata.label.short[locale],
    longLabel: metadata.label.long[locale],
    description: metadata.description[locale],
  };
}

/**
 * Search statuses by label
 * @param feature - The feature name
 * @param searchTerm - The search term (case-insensitive)
 * @param locale - The language locale
 * @returns Array of statuses matching the search term
 */
export function searchStatusesByFeature<T extends StatusFeature>(
  feature: T,
  searchTerm: string,
  locale: Locale = 'us-EN',
): StatusTypeMap[T][] {
  const lowerSearch = searchTerm.toLowerCase();

  return filterStatusesByFeature(feature, (metadata) => {
    const shortLabel = metadata.label.short[locale].toLowerCase();
    const longLabel = metadata.label.long[locale].toLowerCase();
    const description = metadata.description[locale].toLowerCase();

    return shortLabel.includes(lowerSearch) || longLabel.includes(lowerSearch) || description.includes(lowerSearch);
  });
}

/**
 * Get status metadata grouped by color
 * @param feature - The feature name
 * @returns Record of colors mapped to arrays of statuses
 */
export function groupStatusesByColorForFeature<T extends StatusFeature>(
  feature: T,
): Record<string, StatusTypeMap[T][]> {
  const metadata = getAllStatusMetadataForFeature(feature);
  const grouped: Record<string, StatusTypeMap[T][]> = {};

  Object.entries(metadata).forEach(([status, meta]) => {
    const metaTyped = meta as StatusMetadata;
    if (!grouped[metaTyped.color]) {
      grouped[metaTyped.color] = [];
    }
    grouped[metaTyped.color].push(status as StatusTypeMap[T]);
  });

  return grouped;
}

/**
 * Get status metadata grouped by icon
 * @param feature - The feature name
 * @returns Record of icons mapped to arrays of statuses
 */
export function groupStatusesByIconForFeature<T extends StatusFeature>(feature: T): Record<string, StatusTypeMap[T][]> {
  const metadata = getAllStatusMetadataForFeature(feature);
  const grouped: Record<string, StatusTypeMap[T][]> = {};

  Object.entries(metadata).forEach(([status, meta]) => {
    const metaTyped = meta as StatusMetadata;
    if (!grouped[metaTyped.icon]) {
      grouped[metaTyped.icon] = [];
    }
    grouped[metaTyped.icon].push(status as StatusTypeMap[T]);
  });

  return grouped;
}
