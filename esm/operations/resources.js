/**
 * Resource types for operations
 */
export var Resource;
(function (Resource) {
    // Account & Ownership
    Resource["ACCOUNT"] = "ACCOUNT";
    Resource["ACCOUNT_OWNERSHIP"] = "ACCOUNT_OWNERSHIP";
    Resource["ACCOUNT_PREFERENCES"] = "ACCOUNT_PREFERENCES";
    // User & Contact
    Resource["USER"] = "USER";
    Resource["CONTACT"] = "CONTACT";
    // Patient resources
    Resource["PATIENT"] = "PATIENT";
    Resource["PATIENT_MEDICAL_NOTES"] = "PATIENT_MEDICAL_NOTES";
    Resource["PATIENT_MEDICAL_PROPERTIES"] = "PATIENT_MEDICAL_PROPERTIES";
    Resource["PATIENT_PUBLIC_PROPERTIES"] = "PATIENT_PUBLIC_PROPERTIES";
    Resource["PATIENT_PAYMENT"] = "PATIENT_PAYMENT";
    // Medical Service
    Resource["MEDICAL_SERVICE"] = "MEDICAL_SERVICE";
    Resource["MEDICAL_SERVICE_NOTE"] = "MEDICAL_SERVICE_NOTE";
    Resource["MEDICAL_SERVICE_SCHEDULE"] = "MEDICAL_SERVICE_SCHEDULE";
    Resource["MEDICAL_SERVICE_FEES"] = "MEDICAL_SERVICE_FEES";
    Resource["MEDICAL_SERVICE_STATUS"] = "MEDICAL_SERVICE_STATUS";
    // Medical resources
    Resource["MEDICAL_NOTE"] = "MEDICAL_NOTE";
    Resource["MEDICAL_RECORD"] = "MEDICAL_RECORD";
    Resource["PRESCRIPTION"] = "PRESCRIPTION";
    Resource["DIAGNOSIS"] = "DIAGNOSIS";
    Resource["OBSERVATION"] = "OBSERVATION";
    Resource["MEDICATION"] = "MEDICATION";
    Resource["ALLERGY"] = "ALLERGY";
    Resource["IMMUNIZATION"] = "IMMUNIZATION";
    Resource["PROCEDURE"] = "PROCEDURE";
    // Clinical & Measurements
    Resource["CLINICAL_NOTE"] = "CLINICAL_NOTE";
    Resource["VITAL_SIGNS"] = "VITAL_SIGNS";
    Resource["MEASURE_MODEL"] = "MEASURE_MODEL";
    Resource["CALCULATED_MEASURE_MODEL"] = "CALCULATED_MEASURE_MODEL";
    // Documents
    Resource["UPLOADED_DOCUMENT"] = "UPLOADED_DOCUMENT";
    Resource["DOCUMENT_LAYOUT"] = "DOCUMENT_LAYOUT";
    Resource["GENERATED_DOCUMENT"] = "GENERATED_DOCUMENT";
    Resource["DOCUMENT_MODEL"] = "DOCUMENT_MODEL";
    Resource["SNIPPET"] = "SNIPPET";
    // Scheduling & Location
    Resource["LOCATION"] = "LOCATION";
    Resource["TASK_TYPE"] = "TASK_TYPE";
    // Diagnostic
    Resource["LAB_RESULT"] = "LAB_RESULT";
    Resource["IMAGING"] = "IMAGING";
    // Membership & Settings
    Resource["MEMBERSHIP"] = "MEMBERSHIP";
    Resource["SETTINGS"] = "SETTINGS";
    // System
    Resource["NOTIFICATION"] = "NOTIFICATION";
    Resource["REPORT"] = "REPORT";
    Resource["AUDIT_LOG"] = "AUDIT_LOG";
    Resource["SYSTEM"] = "SYSTEM";
    // Generic resources
    Resource["PUBLIC_RESOURCE"] = "PUBLIC_RESOURCE";
    Resource["MEDICAL_RESOURCE"] = "MEDICAL_RESOURCE";
})(Resource || (Resource = {}));
/**
 * Medical resources - require special access control
 */
export const MEDICAL_RESOURCES = [
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
    Resource.PRESCRIPTION,
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
];
/**
 * Public resources - standard access control
 */
export const PUBLIC_RESOURCES = [
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
    Resource.REPORT,
    Resource.AUDIT_LOG,
    Resource.SYSTEM,
    Resource.PUBLIC_RESOURCE,
];
/**
 * Check if a resource is medical
 */
export function isMedicalResource(resource) {
    return MEDICAL_RESOURCES.includes(resource);
}
/**
 * Check if a resource is public
 */
export function isPublicResource(resource) {
    return PUBLIC_RESOURCES.includes(resource);
}
