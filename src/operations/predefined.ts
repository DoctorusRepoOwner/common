import { Action } from "./actions";
import { Operation } from "./operation";
import { Resource } from "./resources";

/**
 * Predefined common operations for convenience
 */
export const Operations = {
  // Patient operations
  PATIENT_CREATE: new Operation(Resource.PATIENT, Action.CREATE),
  PATIENT_READ: new Operation(Resource.PATIENT, Action.READ),
  PATIENT_UPDATE: new Operation(Resource.PATIENT, Action.UPDATE),
  PATIENT_DELETE: new Operation(Resource.PATIENT, Action.DELETE),
  PATIENT_LIST: new Operation(Resource.PATIENT, Action.LIST),

  // Medical record operations
  MEDICAL_RECORD_CREATE: new Operation(Resource.MEDICAL_RECORD, Action.CREATE),
  MEDICAL_RECORD_READ: new Operation(Resource.MEDICAL_RECORD, Action.READ),
  MEDICAL_RECORD_UPDATE: new Operation(Resource.MEDICAL_RECORD, Action.UPDATE),
  MEDICAL_RECORD_DELETE: new Operation(Resource.MEDICAL_RECORD, Action.DELETE),
  MEDICAL_RECORD_SHARE: new Operation(Resource.MEDICAL_RECORD, Action.SHARE),
  MEDICAL_RECORD_EXPORT: new Operation(Resource.MEDICAL_RECORD, Action.EXPORT),

  // Prescription operations
  PRESCRIPTION_CREATE: new Operation(Resource.PRESCRIPTION, Action.CREATE),
  PRESCRIPTION_READ: new Operation(Resource.PRESCRIPTION, Action.READ),
  PRESCRIPTION_UPDATE: new Operation(Resource.PRESCRIPTION, Action.UPDATE),
  PRESCRIPTION_SIGN: new Operation(Resource.PRESCRIPTION, Action.SIGN),
  PRESCRIPTION_PRESCRIBE: new Operation(
    Resource.PRESCRIPTION,
    Action.PRESCRIBE,
  ),

  // Diagnosis operations
  DIAGNOSIS_CREATE: new Operation(Resource.DIAGNOSIS, Action.CREATE),
  DIAGNOSIS_READ: new Operation(Resource.DIAGNOSIS, Action.READ),
  DIAGNOSIS_UPDATE: new Operation(Resource.DIAGNOSIS, Action.UPDATE),
  DIAGNOSIS_DIAGNOSE: new Operation(Resource.DIAGNOSIS, Action.DIAGNOSE),
  DIAGNOSIS_VERIFY: new Operation(Resource.DIAGNOSIS, Action.VERIFY),

  // Appointment operations
  APPOINTMENT_CREATE: new Operation(Resource.APPOINTMENT, Action.CREATE),
  APPOINTMENT_READ: new Operation(Resource.APPOINTMENT, Action.READ),
  APPOINTMENT_UPDATE: new Operation(Resource.APPOINTMENT, Action.UPDATE),
  APPOINTMENT_DELETE: new Operation(Resource.APPOINTMENT, Action.DELETE),
  APPOINTMENT_SCHEDULE: new Operation(Resource.APPOINTMENT, Action.SCHEDULE),
  APPOINTMENT_CANCEL: new Operation(Resource.APPOINTMENT, Action.CANCEL),
  APPOINTMENT_LIST: new Operation(Resource.APPOINTMENT, Action.LIST),

  // User operations
  USER_CREATE: new Operation(Resource.USER, Action.CREATE),
  USER_READ: new Operation(Resource.USER, Action.READ),
  USER_UPDATE: new Operation(Resource.USER, Action.UPDATE),
  USER_DELETE: new Operation(Resource.USER, Action.DELETE),
  USER_LIST: new Operation(Resource.USER, Action.LIST),
  USER_LOGIN: new Operation(Resource.USER, Action.LOGIN),
  USER_LOGOUT: new Operation(Resource.USER, Action.LOGOUT),

  // Audit log operations
  AUDIT_LOG_CREATE: new Operation(Resource.AUDIT_LOG, Action.CREATE),
  AUDIT_LOG_READ: new Operation(Resource.AUDIT_LOG, Action.READ),
  AUDIT_LOG_LIST: new Operation(Resource.AUDIT_LOG, Action.LIST),
  AUDIT_LOG_AUDIT: new Operation(Resource.AUDIT_LOG, Action.AUDIT),

  // System operations
  SYSTEM_CONFIGURE: new Operation(Resource.SYSTEM, Action.CONFIGURE),
  SYSTEM_AUDIT: new Operation(Resource.SYSTEM, Action.AUDIT),
} as const;

/**
 * Get all predefined operations as an array
 */
export function getAllOperations(): Operation[] {
  return Object.values(Operations);
}

/**
 * Get all operations for a specific resource
 */
export function getOperationsByResource(resource: Resource): Operation[] {
  return getAllOperations().filter((op) => op.resource === resource);
}

/**
 * Get all operations for a specific action
 */
export function getOperationsByAction(action: Action): Operation[] {
  return getAllOperations().filter((op) => op.action === action);
}
