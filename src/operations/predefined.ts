import { Action } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

/**
 * Predefined common operations for convenience
 */
export const Operations = {
  // Account operations
  ACCOUNT_CREATE: new Operation(Resource.ACCOUNT, Action.CREATE),
  ACCOUNT_READ: new Operation(Resource.ACCOUNT, Action.READ),
  ACCOUNT_UPDATE: new Operation(Resource.ACCOUNT, Action.UPDATE),
  ACCOUNT_DELETE: new Operation(Resource.ACCOUNT, Action.DELETE),
  ACCOUNT_MANAGE: new Operation(Resource.ACCOUNT, Action.MANAGE),
  ACCOUNT_OWNERSHIP_TRANSFER: new Operation(Resource.ACCOUNT_OWNERSHIP, Action.UPDATE),

  // Patient operations
  PATIENT_CREATE: new Operation(Resource.PATIENT, Action.CREATE),
  PATIENT_READ: new Operation(Resource.PATIENT, Action.READ),
  PATIENT_UPDATE: new Operation(Resource.PATIENT, Action.UPDATE),
  PATIENT_DELETE: new Operation(Resource.PATIENT, Action.DELETE),
  PATIENT_LIST: new Operation(Resource.PATIENT, Action.LIST),
  PATIENT_VIEW: new Operation(Resource.PATIENT, Action.VIEW_PATIENTS),
  PATIENT_UPDATE_STATUS: new Operation(Resource.PATIENT, Action.UPDATE_STATUS),

  // Patient payment operations
  PATIENT_PAYMENT_PUT: new Operation(Resource.PATIENT_PAYMENT, Action.PUT_PATIENT_PAYMENT),
  PATIENT_PAYMENT_DELETE: new Operation(Resource.PATIENT_PAYMENT, Action.DELETE_PATIENT_PAYMENT),

  // Medical service operations
  MEDICAL_SERVICE_CREATE: new Operation(Resource.MEDICAL_SERVICE, Action.CREATE),
  MEDICAL_SERVICE_READ: new Operation(Resource.MEDICAL_SERVICE, Action.READ),
  MEDICAL_SERVICE_UPDATE: new Operation(Resource.MEDICAL_SERVICE, Action.UPDATE),
  MEDICAL_SERVICE_DELETE: new Operation(Resource.MEDICAL_SERVICE, Action.DELETE),
  MEDICAL_SERVICE_MANAGE: new Operation(Resource.MEDICAL_SERVICE, Action.MANAGE),
  MEDICAL_SERVICE_SET_STATUS: new Operation(Resource.MEDICAL_SERVICE_STATUS, Action.SET_MEDICAL_SERVICE_STATUS),
  MEDICAL_SERVICE_SET_FEES: new Operation(Resource.MEDICAL_SERVICE_FEES, Action.SET_MEDICAL_SERVICE_FEES),

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
  PRESCRIPTION_PRESCRIBE: new Operation(Resource.PRESCRIPTION, Action.PRESCRIBE),

  // Diagnosis operations
  DIAGNOSIS_CREATE: new Operation(Resource.DIAGNOSIS, Action.CREATE),
  DIAGNOSIS_READ: new Operation(Resource.DIAGNOSIS, Action.READ),
  DIAGNOSIS_UPDATE: new Operation(Resource.DIAGNOSIS, Action.UPDATE),
  DIAGNOSIS_DIAGNOSE: new Operation(Resource.DIAGNOSIS, Action.DIAGNOSE),
  DIAGNOSIS_VERIFY: new Operation(Resource.DIAGNOSIS, Action.VERIFY),

  // Medical history operations
  MEDICAL_HISTORY_CREATE: new Operation(Resource.MEDICAL_HISTORY, Action.CREATE),
  MEDICAL_HISTORY_READ: new Operation(Resource.MEDICAL_HISTORY, Action.READ),
  MEDICAL_HISTORY_UPDATE: new Operation(Resource.MEDICAL_HISTORY, Action.UPDATE),

  // Document operations
  UPLOADED_DOCUMENT_CREATE: new Operation(Resource.UPLOADED_DOCUMENT, Action.CREATE),
  UPLOADED_DOCUMENT_READ: new Operation(Resource.UPLOADED_DOCUMENT, Action.READ),
  UPLOADED_DOCUMENT_DELETE: new Operation(Resource.UPLOADED_DOCUMENT, Action.DELETE),
  GENERATED_DOCUMENT_CREATE: new Operation(Resource.GENERATED_DOCUMENT, Action.CREATE),
  GENERATED_DOCUMENT_READ: new Operation(Resource.GENERATED_DOCUMENT, Action.READ),

  // Medical service scheduling operations (appointments)
  MEDICAL_SERVICE_SCHEDULE: new Operation(Resource.MEDICAL_SERVICE, Action.SCHEDULE),
  MEDICAL_SERVICE_CANCEL: new Operation(Resource.MEDICAL_SERVICE, Action.CANCEL),
  MEDICAL_SERVICE_LIST: new Operation(Resource.MEDICAL_SERVICE, Action.LIST),

  // User operations
  USER_CREATE: new Operation(Resource.USER, Action.CREATE),
  USER_READ: new Operation(Resource.USER, Action.READ),
  USER_UPDATE: new Operation(Resource.USER, Action.UPDATE),
  USER_DELETE: new Operation(Resource.USER, Action.DELETE),
  USER_LIST: new Operation(Resource.USER, Action.LIST),
  USER_LOGIN: new Operation(Resource.USER, Action.LOGIN),
  USER_LOGOUT: new Operation(Resource.USER, Action.LOGOUT),

  // Membership operations
  MEMBERSHIP_CREATE: new Operation(Resource.MEMBERSHIP, Action.CREATE),
  MEMBERSHIP_READ: new Operation(Resource.MEMBERSHIP, Action.READ),
  MEMBERSHIP_UPDATE: new Operation(Resource.MEMBERSHIP, Action.UPDATE),
  MEMBERSHIP_DELETE: new Operation(Resource.MEMBERSHIP, Action.DELETE),

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
