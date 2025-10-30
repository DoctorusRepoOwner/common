/**
 * Resource types for operations
 */
export enum Resource {
  // Medical resources
  PATIENT = "PATIENT",
  MEDICAL_RECORD = "MEDICAL_RECORD",
  PRESCRIPTION = "PRESCRIPTION",
  DIAGNOSIS = "DIAGNOSIS",
  APPOINTMENT = "APPOINTMENT",
  LAB_RESULT = "LAB_RESULT",
  IMAGING = "IMAGING",
  VITAL_SIGNS = "VITAL_SIGNS",
  MEDICATION = "MEDICATION",
  ALLERGY = "ALLERGY",
  IMMUNIZATION = "IMMUNIZATION",
  PROCEDURE = "PROCEDURE",
  CLINICAL_NOTE = "CLINICAL_NOTE",

  // Public resources
  USER = "USER",
  PROFILE = "PROFILE",
  NOTIFICATION = "NOTIFICATION",
  SETTINGS = "SETTINGS",
  REPORT = "REPORT",
  AUDIT_LOG = "AUDIT_LOG",
  SYSTEM = "SYSTEM",
}

/**
 * Medical resources - require special access control
 */
export const MEDICAL_RESOURCES: Resource[] = [
  Resource.PATIENT,
  Resource.MEDICAL_RECORD,
  Resource.PRESCRIPTION,
  Resource.DIAGNOSIS,
  Resource.APPOINTMENT,
  Resource.LAB_RESULT,
  Resource.IMAGING,
  Resource.VITAL_SIGNS,
  Resource.MEDICATION,
  Resource.ALLERGY,
  Resource.IMMUNIZATION,
  Resource.PROCEDURE,
  Resource.CLINICAL_NOTE,
];

/**
 * Public resources - standard access control
 */
export const PUBLIC_RESOURCES: Resource[] = [
  Resource.USER,
  Resource.PROFILE,
  Resource.NOTIFICATION,
  Resource.SETTINGS,
  Resource.REPORT,
  Resource.AUDIT_LOG,
  Resource.SYSTEM,
];

/**
 * Check if a resource is medical
 */
export function isMedicalResource(resource: Resource): boolean {
  return MEDICAL_RESOURCES.includes(resource);
}

/**
 * Check if a resource is public
 */
export function isPublicResource(resource: Resource): boolean {
  return PUBLIC_RESOURCES.includes(resource);
}
