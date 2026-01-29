/**
 * Resource types for operations
 */
export enum Resource {
  ACCOUNT = 'ACCOUNT',
  ACCOUNT_OWNERSHIP = 'ACCOUNT_OWNERSHIP',
  ACCOUNT_PREFERENCES = 'ACCOUNT_PREFERENCES',
  USER = 'USER',
  CONTACT = 'CONTACT',
  PATIENT = 'PATIENT',
  PATIENT_MEDICAL_NOTES = 'PATIENT_MEDICAL_NOTES',
  PATIENT_MEDICAL_PROPERTIES = 'PATIENT_MEDICAL_PROPERTIES',
  PATIENT_PUBLIC_PROPERTIES = 'PATIENT_PUBLIC_PROPERTIES',
  PATIENT_PAYMENT = 'PATIENT_PAYMENT',
  MEDICAL_SERVICE = 'MEDICAL_SERVICE',
  MEDICAL_SERVICE_NOTE = 'MEDICAL_SERVICE_NOTE',
  MEDICAL_SERVICE_SCHEDULE = 'MEDICAL_SERVICE_SCHEDULE',
  MEDICAL_SERVICE_FEES = 'MEDICAL_SERVICE_FEES',
  MEDICAL_SERVICE_STATUS = 'MEDICAL_SERVICE_STATUS',
  MEDICAL_NOTE = 'MEDICAL_NOTE',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  MEDICAL_HISTORY = 'MEDICAL_HISTORY',
  MEDICAL_HISTORY_MODEL = 'MEDICAL_HISTORY_MODEL',
  PRESCRIPTION = 'PRESCRIPTION',
  PRESCRIPTION_MODEL = 'PRESCRIPTION_MODEL',
  DIAGNOSIS = 'DIAGNOSIS',
  OBSERVATION = 'OBSERVATION',
  MEDICATION = 'MEDICATION',
  ALLERGY = 'ALLERGY',
  IMMUNIZATION = 'IMMUNIZATION',
  PROCEDURE = 'PROCEDURE',
  CLINICAL_NOTE = 'CLINICAL_NOTE',
  VITAL_SIGNS = 'VITAL_SIGNS',
  MEASURE_MODEL = 'MEASURE_MODEL',
  CALCULATED_MEASURE_MODEL = 'CALCULATED_MEASURE_MODEL',
  UPLOADED_DOCUMENT = 'UPLOADED_DOCUMENT',
  DOCUMENT_LAYOUT = 'DOCUMENT_LAYOUT',
  GENERATED_DOCUMENT = 'GENERATED_DOCUMENT',
  DOCUMENT_MODEL = 'DOCUMENT_MODEL',
  SNIPPET = 'SNIPPET',
  LOCATION = 'LOCATION',
  TASK_TYPE = 'TASK_TYPE',
  LAB_RESULT = 'LAB_RESULT',
  IMAGING = 'IMAGING',
  MEMBERSHIP = 'MEMBERSHIP',
  SETTINGS = 'SETTINGS',
  NOTIFICATION = 'NOTIFICATION',
  USER_PREFERENCES = 'USER_PREFERENCES',
  CALENDAR_SYNC_SETTINGS = 'CALENDAR_SYNC_SETTINGS',
  REPORT = 'REPORT',
  AUDIT_LOG = 'AUDIT_LOG',
  SYSTEM = 'SYSTEM',
  PUBLIC_RESOURCE = 'PUBLIC_RESOURCE',
  MEDICAL_RESOURCE = 'MEDICAL_RESOURCE',
}

/**
 * Medical resources - require special access control
 */
// Central definition of resource categories for easier maintenance
// Explicitly widen tuple arrays to Resource[] to avoid overly narrow union inference
const RESOURCE_CATEGORIES: {
  medical: Resource[];
  public: Resource[];
} = {
  medical: [
    Resource.PATIENT,
    Resource.PATIENT_MEDICAL_NOTES,
    Resource.PATIENT_MEDICAL_PROPERTIES,
    Resource.PATIENT_PAYMENT,
    Resource.MEDICAL_SERVICE,
    Resource.MEDICAL_SERVICE_NOTE,
    Resource.MEDICAL_SERVICE_SCHEDULE,
    Resource.MEDICAL_SERVICE_FEES,
    Resource.MEDICAL_SERVICE_STATUS,
    Resource.MEDICAL_NOTE,
    Resource.MEDICAL_RECORD,
    Resource.MEDICAL_HISTORY,
    Resource.MEDICAL_HISTORY_MODEL,
    Resource.PRESCRIPTION,
    Resource.PRESCRIPTION_MODEL,
    Resource.DIAGNOSIS,
    Resource.OBSERVATION,
    Resource.MEDICATION,
    Resource.ALLERGY,
    Resource.IMMUNIZATION,
    Resource.PROCEDURE,
    Resource.CLINICAL_NOTE,
    Resource.VITAL_SIGNS,
    Resource.MEASURE_MODEL,
    Resource.CALCULATED_MEASURE_MODEL,
    Resource.LAB_RESULT,
    Resource.IMAGING,
    Resource.MEDICAL_RESOURCE,
  ],
  public: [
    Resource.ACCOUNT,
    Resource.ACCOUNT_OWNERSHIP,
    Resource.ACCOUNT_PREFERENCES,
    Resource.USER,
    Resource.CONTACT,
    Resource.PATIENT_PUBLIC_PROPERTIES,
    Resource.UPLOADED_DOCUMENT,
    Resource.DOCUMENT_LAYOUT,
    Resource.GENERATED_DOCUMENT,
    Resource.DOCUMENT_MODEL,
    Resource.SNIPPET,
    Resource.LOCATION,
    Resource.TASK_TYPE,
    Resource.MEMBERSHIP,
    Resource.SETTINGS,
    Resource.NOTIFICATION,
    Resource.USER_PREFERENCES,
    Resource.CALENDAR_SYNC_SETTINGS,
    Resource.REPORT,
    Resource.AUDIT_LOG,
    Resource.SYSTEM,
    Resource.PUBLIC_RESOURCE,
  ],
} as const;

export const MEDICAL_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.medical];

/**
 * Public resources - standard access control
 */
export const PUBLIC_RESOURCES: Resource[] = [...RESOURCE_CATEGORIES.public];

/**
 * Check if a resource is medical
 */
export function isMedicalResource(resource: Resource): boolean {
  return RESOURCE_CATEGORIES.medical.indexOf(resource) !== -1;
}

/**
 * Check if a resource is public
 */
export function isPublicResource(resource: Resource): boolean {
  return RESOURCE_CATEGORIES.public.indexOf(resource) !== -1;
}

/**
 * Get all resources across categories (medical + public)
 */
export function getAllResources(): Resource[] {
  return [...RESOURCE_CATEGORIES.medical, ...RESOURCE_CATEGORIES.public];
}

/**
 * Return the underlying category buckets (read-only)
 */
export function getResourceCategories(): Readonly<typeof RESOURCE_CATEGORIES> {
  return RESOURCE_CATEGORIES;
}
