/**
 * Resource types aligned with the provided schema taxonomy.
 */
export enum Resource {
  ACCOUNT = 'ACCOUNT',
  CALCULATED_MEASURE_MODEL = 'CALCULATED_MEASURE_MODEL',
  CALENDAR_SETTINGS = 'CALENDAR_SETTINGS',
  CALENDAR_SYNC = 'CALENDAR_SYNC',
  CALENDAR_TOKEN = 'CALENDAR_TOKEN',
  CONTACT = 'CONTACT',
  DOCUMENT_LAYOUT = 'DOCUMENT_LAYOUT',
  DOCUMENT_MODEL = 'DOCUMENT_MODEL',
  GENERAL_SETTINGS = 'GENERAL_SETTINGS',
  GENERATED_DOCUMENT = 'GENERATED_DOCUMENT',
  LOCATION = 'LOCATION',
  MEASURE_MODEL = 'MEASURE_MODEL',
  MEDICATION_SEARCH = 'MEDICATION_SEARCH',
  MEDICAL_HISTORY = 'MEDICAL_HISTORY',
  MEDICAL_HISTORY_MODEL = 'MEDICAL_HISTORY_MODEL',
  MEDICAL_SERVICE = 'MEDICAL_SERVICE',
  MEDICAL_SERVICE_NOTE = 'MEDICAL_SERVICE_NOTE',
  MEMBERSHIP = 'MEMBERSHIP',
  OBSERVATION = 'OBSERVATION',
  PATIENT = 'PATIENT',
  PATIENT_MEDICAL_NOTE = 'PATIENT_MEDICAL_NOTE',
  PATIENT_PAYMENT = 'PATIENT_PAYMENT',
  PATIENT_PROPERTY_MODEL = 'PATIENT_PROPERTY_MODEL',
  PREFERENCES = 'PREFERENCES',
  PRESCRIPTION = 'PRESCRIPTION',
  PRESCRIPTION_MODEL = 'PRESCRIPTION_MODEL',
  ROLE = 'ROLE',
  TASK_TYPE = 'TASK_TYPE',
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  USER = 'USER',
  AVAILABLE_SLOTS = 'AVAILABLE_SLOTS',
}

export enum ResourceCategory {
  CORE = 'core',
  MEMBERSHIP = 'membership',
  CLINICAL = 'clinical',
  DOCUMENTS = 'documents',
  SETTINGS = 'settings',
  INTEGRATION = 'integration',
  SCHEDULING = 'scheduling',
  EXTERNAL = 'external',
  SYSTEM = 'system',
}

const RESOURCE_CATEGORIES: {
  core: Resource[];
  membership: Resource[];
  clinical: Resource[];
  documents: Resource[];
  settings: Resource[];
  integration: Resource[];
  scheduling: Resource[];
  external: Resource[];
  system: Resource[];
} = {
  core: [Resource.ACCOUNT],
  membership: [Resource.USER, Resource.MEMBERSHIP],
  clinical: [
    Resource.PATIENT,
    Resource.CONTACT,
    Resource.MEDICAL_SERVICE,
    Resource.MEDICAL_SERVICE_NOTE,
    Resource.PATIENT_MEDICAL_NOTE,
    Resource.MEDICAL_HISTORY,
    Resource.OBSERVATION,
    Resource.PRESCRIPTION,
    Resource.PATIENT_PAYMENT,
  ],
  documents: [Resource.DOCUMENT_LAYOUT, Resource.DOCUMENT_MODEL, Resource.GENERATED_DOCUMENT, Resource.UPLOAD_DOCUMENT],
  settings: [
    Resource.GENERAL_SETTINGS,
    Resource.PREFERENCES,
    Resource.MEASURE_MODEL,
    Resource.CALCULATED_MEASURE_MODEL,
    Resource.TASK_TYPE,
    Resource.LOCATION,
    Resource.MEDICAL_HISTORY_MODEL,
    Resource.PRESCRIPTION_MODEL,
    Resource.PATIENT_PROPERTY_MODEL,
  ],
  integration: [Resource.CALENDAR_TOKEN, Resource.CALENDAR_SETTINGS, Resource.CALENDAR_SYNC],
  scheduling: [Resource.AVAILABLE_SLOTS],
  external: [Resource.MEDICATION_SEARCH],
  system: [],
} as const;

const LEGACY_RESOURCE_CATEGORIES: {
  medical: Resource[];
  public: Resource[];
} = {
  medical: [
    Resource.AVAILABLE_SLOTS,
    Resource.CALCULATED_MEASURE_MODEL,
    Resource.CONTACT,
    Resource.GENERATED_DOCUMENT,
    Resource.MEASURE_MODEL,
    Resource.MEDICATION_SEARCH,
    Resource.MEDICAL_HISTORY,
    Resource.MEDICAL_HISTORY_MODEL,
    Resource.MEDICAL_SERVICE,
    Resource.MEDICAL_SERVICE_NOTE,
    Resource.OBSERVATION,
    Resource.PATIENT,
    Resource.PATIENT_MEDICAL_NOTE,
    Resource.PATIENT_PAYMENT,
    Resource.PATIENT_PROPERTY_MODEL,
    Resource.PRESCRIPTION,
    Resource.PRESCRIPTION_MODEL,
    Resource.UPLOAD_DOCUMENT,
  ],
  public: [
    Resource.ACCOUNT,
    Resource.CALENDAR_SETTINGS,
    Resource.CALENDAR_SYNC,
    Resource.CALENDAR_TOKEN,
    Resource.DOCUMENT_LAYOUT,
    Resource.DOCUMENT_MODEL,
    Resource.GENERAL_SETTINGS,
    Resource.LOCATION,
    Resource.MEMBERSHIP,
    Resource.PREFERENCES,
    Resource.ROLE,
    Resource.TASK_TYPE,
    Resource.USER,
  ],
} as const;

/**
 * Resource owner scope:
 * - USER: resource belongs to / is scoped to an individual user
 * - ACCOUNT: resource belongs to / is scoped to the whole account (organisation)
 */
export enum ResourceScope {
  USER = 'user',
  ACCOUNT = 'account',
}

const RESOURCE_SCOPE: Record<Resource, ResourceScope> = {
  // Account-scoped resources
  [Resource.ACCOUNT]: ResourceScope.ACCOUNT,
  [Resource.LOCATION]: ResourceScope.ACCOUNT,
  [Resource.ROLE]: ResourceScope.ACCOUNT,
  [Resource.MEMBERSHIP]: ResourceScope.ACCOUNT,
  [Resource.GENERAL_SETTINGS]: ResourceScope.ACCOUNT,
  [Resource.TASK_TYPE]: ResourceScope.ACCOUNT,
  [Resource.DOCUMENT_LAYOUT]: ResourceScope.ACCOUNT,
  [Resource.DOCUMENT_MODEL]: ResourceScope.ACCOUNT,
  [Resource.MEASURE_MODEL]: ResourceScope.ACCOUNT,
  [Resource.CALCULATED_MEASURE_MODEL]: ResourceScope.ACCOUNT,
  [Resource.MEDICAL_HISTORY_MODEL]: ResourceScope.ACCOUNT,
  [Resource.PRESCRIPTION_MODEL]: ResourceScope.ACCOUNT,
  [Resource.PATIENT_PROPERTY_MODEL]: ResourceScope.ACCOUNT,
  [Resource.MEDICATION_SEARCH]: ResourceScope.ACCOUNT,
  [Resource.AVAILABLE_SLOTS]: ResourceScope.ACCOUNT,

  // User-scoped resources
  [Resource.USER]: ResourceScope.USER,
  [Resource.PREFERENCES]: ResourceScope.USER,
  [Resource.CALENDAR_SETTINGS]: ResourceScope.USER,
  [Resource.CALENDAR_SYNC]: ResourceScope.USER,
  [Resource.CALENDAR_TOKEN]: ResourceScope.USER,

  // Clinical resources are patient/account-scoped — grouped under ACCOUNT
  [Resource.PATIENT]: ResourceScope.ACCOUNT,
  [Resource.CONTACT]: ResourceScope.ACCOUNT,
  [Resource.MEDICAL_SERVICE]: ResourceScope.ACCOUNT,
  [Resource.MEDICAL_SERVICE_NOTE]: ResourceScope.ACCOUNT,
  [Resource.PATIENT_MEDICAL_NOTE]: ResourceScope.ACCOUNT,
  [Resource.MEDICAL_HISTORY]: ResourceScope.ACCOUNT,
  [Resource.OBSERVATION]: ResourceScope.ACCOUNT,
  [Resource.PRESCRIPTION]: ResourceScope.ACCOUNT,
  [Resource.PATIENT_PAYMENT]: ResourceScope.ACCOUNT,
  [Resource.GENERATED_DOCUMENT]: ResourceScope.ACCOUNT,
  [Resource.UPLOAD_DOCUMENT]: ResourceScope.ACCOUNT,
};

export const USER_RESOURCES: Resource[] = (Object.entries(RESOURCE_SCOPE) as [Resource, ResourceScope][])
  .filter(([, owner]) => owner === ResourceScope.USER)
  .map(([resource]) => resource);

export const ACCOUNT_RESOURCES: Resource[] = (Object.entries(RESOURCE_SCOPE) as [Resource, ResourceScope][])
  .filter(([, owner]) => owner === ResourceScope.ACCOUNT)
  .map(([resource]) => resource);

export function getResourceScope(resource: Resource): ResourceScope {
  return RESOURCE_SCOPE[resource];
}

export function isUserResource(resource: Resource): boolean {
  return RESOURCE_SCOPE[resource] === ResourceScope.USER;
}

export function isAccountResource(resource: Resource): boolean {
  return RESOURCE_SCOPE[resource] === ResourceScope.ACCOUNT;
}

export function getResourcesByScope(owner: ResourceScope): Resource[] {
  return (Object.entries(RESOURCE_SCOPE) as [Resource, ResourceScope][]).filter(([, o]) => o === owner).map(([r]) => r);
}

export const MEDICAL_RESOURCES: Resource[] = [...LEGACY_RESOURCE_CATEGORIES.medical];

export const PUBLIC_RESOURCES: Resource[] = [...LEGACY_RESOURCE_CATEGORIES.public];

export const CORE_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.core];
export const MEMBERSHIP_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.membership];
export const CLINICAL_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.clinical];
export const DOCUMENT_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.documents];
export const SETTINGS_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.settings];
export const INTEGRATION_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.integration];
export const SCHEDULING_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.scheduling];
export const EXTERNAL_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.external];
export const SYSTEM_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.system];

export function isMedicalResource(resource: Resource): boolean {
  return LEGACY_RESOURCE_CATEGORIES.medical.indexOf(resource) !== -1;
}

export function isPublicResource(resource: Resource): boolean {
  return LEGACY_RESOURCE_CATEGORIES.public.indexOf(resource) !== -1;
}

export function getAllResources(): Resource[] {
  return [...LEGACY_RESOURCE_CATEGORIES.medical, ...LEGACY_RESOURCE_CATEGORIES.public];
}

export function getResourceCategories(): Readonly<typeof RESOURCE_CATEGORIES> {
  return RESOURCE_CATEGORIES;
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return [...RESOURCE_CATEGORIES[category]];
}

export function getResourcesByCategories(categories: ResourceCategory[]): Resource[] {
  const resources = categories.flatMap((category) => RESOURCE_CATEGORIES[category]);
  return Array.from(new Set(resources));
}
