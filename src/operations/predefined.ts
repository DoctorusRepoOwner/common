import { Action } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

/**
 * Predefined operations aligned with the permission catalog architecture.
 */
export const Operations = {
  ACCOUNT_VIEW: new Operation(Resource.ACCOUNT, Action.VIEW),
  ACCOUNT_UPDATE: new Operation(Resource.ACCOUNT, Action.UPDATE),
  ACCOUNT_TRANSFER_OWNERSHIP: new Operation(Resource.ACCOUNT, Action.TRANSFER_OWNERSHIP),

  USER_VIEW: new Operation(Resource.USER, Action.VIEW),
  USER_UPDATE: new Operation(Resource.USER, Action.UPDATE),

  MEMBERSHIP_VIEW: new Operation(Resource.MEMBERSHIP, Action.VIEW),
  MEMBERSHIP_INVITE: new Operation(Resource.MEMBERSHIP, Action.INVITE),
  MEMBERSHIP_UPDATE: new Operation(Resource.MEMBERSHIP, Action.UPDATE),
  MEMBERSHIP_DELETE: new Operation(Resource.MEMBERSHIP, Action.DELETE),

  ROLE_VIEW: new Operation(Resource.ROLE, Action.VIEW),
  ROLE_CREATE: new Operation(Resource.ROLE, Action.CREATE),
  ROLE_UPDATE: new Operation(Resource.ROLE, Action.UPDATE),
  ROLE_DELETE: new Operation(Resource.ROLE, Action.DELETE),

  PATIENT_VIEW: new Operation(Resource.PATIENT, Action.VIEW),
  PATIENT_CREATE: new Operation(Resource.PATIENT, Action.CREATE),
  PATIENT_UPDATE: new Operation(Resource.PATIENT, Action.UPDATE),
  PATIENT_DELETE: new Operation(Resource.PATIENT, Action.DELETE),

  CONTACT_VIEW: new Operation(Resource.CONTACT, Action.VIEW),
  CONTACT_CREATE: new Operation(Resource.CONTACT, Action.CREATE),
  CONTACT_UPDATE: new Operation(Resource.CONTACT, Action.UPDATE),
  CONTACT_DELETE: new Operation(Resource.CONTACT, Action.DELETE),

  PATIENT_PAYMENT_VIEW: new Operation(Resource.PATIENT_PAYMENT, Action.VIEW),
  PATIENT_PAYMENT_CREATE: new Operation(Resource.PATIENT_PAYMENT, Action.CREATE),
  PATIENT_PAYMENT_UPDATE: new Operation(Resource.PATIENT_PAYMENT, Action.UPDATE),
  PATIENT_PAYMENT_DELETE: new Operation(Resource.PATIENT_PAYMENT, Action.DELETE),

  MEDICAL_SERVICE_VIEW: new Operation(Resource.MEDICAL_SERVICE, Action.VIEW),
  MEDICAL_SERVICE_CREATE: new Operation(Resource.MEDICAL_SERVICE, Action.CREATE),
  MEDICAL_SERVICE_UPDATE: new Operation(Resource.MEDICAL_SERVICE, Action.UPDATE),
  MEDICAL_SERVICE_DELETE: new Operation(Resource.MEDICAL_SERVICE, Action.DELETE),
  MEDICAL_SERVICE_CHECK_IN: new Operation(Resource.MEDICAL_SERVICE, Action.CHECK_IN),
  MEDICAL_SERVICE_COMPLETE: new Operation(Resource.MEDICAL_SERVICE, Action.COMPLETE),
  MEDICAL_SERVICE_CANCEL: new Operation(Resource.MEDICAL_SERVICE, Action.CANCEL),
  MEDICAL_SERVICE_ASSIGN: new Operation(Resource.MEDICAL_SERVICE, Action.ASSIGN),

  MEDICAL_SERVICE_NOTE_VIEW: new Operation(Resource.MEDICAL_SERVICE_NOTE, Action.VIEW),
  MEDICAL_SERVICE_NOTE_CREATE: new Operation(Resource.MEDICAL_SERVICE_NOTE, Action.CREATE),
  MEDICAL_SERVICE_NOTE_UPDATE: new Operation(Resource.MEDICAL_SERVICE_NOTE, Action.UPDATE),
  MEDICAL_SERVICE_NOTE_DELETE: new Operation(Resource.MEDICAL_SERVICE_NOTE, Action.DELETE),

  PATIENT_MEDICAL_NOTE_VIEW: new Operation(Resource.PATIENT_MEDICAL_NOTE, Action.VIEW),
  PATIENT_MEDICAL_NOTE_CREATE: new Operation(Resource.PATIENT_MEDICAL_NOTE, Action.CREATE),
  PATIENT_MEDICAL_NOTE_UPDATE: new Operation(Resource.PATIENT_MEDICAL_NOTE, Action.UPDATE),
  PATIENT_MEDICAL_NOTE_DELETE: new Operation(Resource.PATIENT_MEDICAL_NOTE, Action.DELETE),

  MEDICAL_HISTORY_VIEW: new Operation(Resource.MEDICAL_HISTORY, Action.VIEW),
  MEDICAL_HISTORY_CREATE: new Operation(Resource.MEDICAL_HISTORY, Action.CREATE),
  MEDICAL_HISTORY_UPDATE: new Operation(Resource.MEDICAL_HISTORY, Action.UPDATE),
  MEDICAL_HISTORY_DELETE: new Operation(Resource.MEDICAL_HISTORY, Action.DELETE),

  OBSERVATION_VIEW: new Operation(Resource.OBSERVATION, Action.VIEW),
  OBSERVATION_CREATE: new Operation(Resource.OBSERVATION, Action.CREATE),
  OBSERVATION_UPDATE: new Operation(Resource.OBSERVATION, Action.UPDATE),
  OBSERVATION_DELETE: new Operation(Resource.OBSERVATION, Action.DELETE),

  PRESCRIPTION_VIEW: new Operation(Resource.PRESCRIPTION, Action.VIEW),
  PRESCRIPTION_CREATE: new Operation(Resource.PRESCRIPTION, Action.CREATE),
  PRESCRIPTION_UPDATE: new Operation(Resource.PRESCRIPTION, Action.UPDATE),
  PRESCRIPTION_DELETE: new Operation(Resource.PRESCRIPTION, Action.DELETE),

  DOCUMENT_LAYOUT_VIEW: new Operation(Resource.DOCUMENT_LAYOUT, Action.VIEW),
  DOCUMENT_LAYOUT_CREATE: new Operation(Resource.DOCUMENT_LAYOUT, Action.CREATE),
  DOCUMENT_LAYOUT_UPDATE: new Operation(Resource.DOCUMENT_LAYOUT, Action.UPDATE),
  DOCUMENT_LAYOUT_DELETE: new Operation(Resource.DOCUMENT_LAYOUT, Action.DELETE),

  DOCUMENT_MODEL_VIEW: new Operation(Resource.DOCUMENT_MODEL, Action.VIEW),
  DOCUMENT_MODEL_CREATE: new Operation(Resource.DOCUMENT_MODEL, Action.CREATE),
  DOCUMENT_MODEL_UPDATE: new Operation(Resource.DOCUMENT_MODEL, Action.UPDATE),
  DOCUMENT_MODEL_DELETE: new Operation(Resource.DOCUMENT_MODEL, Action.DELETE),

  GENERATED_DOCUMENT_VIEW: new Operation(Resource.GENERATED_DOCUMENT, Action.VIEW),
  GENERATED_DOCUMENT_GENERATE: new Operation(Resource.GENERATED_DOCUMENT, Action.GENERATE),
  GENERATED_DOCUMENT_DELETE: new Operation(Resource.GENERATED_DOCUMENT, Action.DELETE),

  UPLOAD_DOCUMENT_VIEW: new Operation(Resource.UPLOAD_DOCUMENT, Action.VIEW),
  UPLOAD_DOCUMENT_CREATE: new Operation(Resource.UPLOAD_DOCUMENT, Action.CREATE),
  UPLOAD_DOCUMENT_DELETE: new Operation(Resource.UPLOAD_DOCUMENT, Action.DELETE),

  GENERAL_SETTINGS_VIEW: new Operation(Resource.GENERAL_SETTINGS, Action.VIEW),
  GENERAL_SETTINGS_UPDATE: new Operation(Resource.GENERAL_SETTINGS, Action.UPDATE),
  PREFERENCES_VIEW: new Operation(Resource.PREFERENCES, Action.VIEW),
  PREFERENCES_UPDATE: new Operation(Resource.PREFERENCES, Action.UPDATE),

  MEASURE_MODEL_VIEW: new Operation(Resource.MEASURE_MODEL, Action.VIEW),
  MEASURE_MODEL_CREATE: new Operation(Resource.MEASURE_MODEL, Action.CREATE),
  MEASURE_MODEL_UPDATE: new Operation(Resource.MEASURE_MODEL, Action.UPDATE),
  MEASURE_MODEL_DELETE: new Operation(Resource.MEASURE_MODEL, Action.DELETE),

  CALCULATED_MEASURE_MODEL_VIEW: new Operation(Resource.CALCULATED_MEASURE_MODEL, Action.VIEW),
  CALCULATED_MEASURE_MODEL_CREATE: new Operation(Resource.CALCULATED_MEASURE_MODEL, Action.CREATE),
  CALCULATED_MEASURE_MODEL_UPDATE: new Operation(Resource.CALCULATED_MEASURE_MODEL, Action.UPDATE),
  CALCULATED_MEASURE_MODEL_DELETE: new Operation(Resource.CALCULATED_MEASURE_MODEL, Action.DELETE),

  TASK_TYPE_VIEW: new Operation(Resource.TASK_TYPE, Action.VIEW),
  TASK_TYPE_CREATE: new Operation(Resource.TASK_TYPE, Action.CREATE),
  TASK_TYPE_UPDATE: new Operation(Resource.TASK_TYPE, Action.UPDATE),
  TASK_TYPE_DELETE: new Operation(Resource.TASK_TYPE, Action.DELETE),

  LOCATION_VIEW: new Operation(Resource.LOCATION, Action.VIEW),
  LOCATION_CREATE: new Operation(Resource.LOCATION, Action.CREATE),
  LOCATION_UPDATE: new Operation(Resource.LOCATION, Action.UPDATE),
  LOCATION_DELETE: new Operation(Resource.LOCATION, Action.DELETE),

  MEDICAL_HISTORY_MODEL_VIEW: new Operation(Resource.MEDICAL_HISTORY_MODEL, Action.VIEW),
  MEDICAL_HISTORY_MODEL_CREATE: new Operation(Resource.MEDICAL_HISTORY_MODEL, Action.CREATE),
  MEDICAL_HISTORY_MODEL_UPDATE: new Operation(Resource.MEDICAL_HISTORY_MODEL, Action.UPDATE),
  MEDICAL_HISTORY_MODEL_DELETE: new Operation(Resource.MEDICAL_HISTORY_MODEL, Action.DELETE),

  PRESCRIPTION_MODEL_VIEW: new Operation(Resource.PRESCRIPTION_MODEL, Action.VIEW),
  PRESCRIPTION_MODEL_CREATE: new Operation(Resource.PRESCRIPTION_MODEL, Action.CREATE),
  PRESCRIPTION_MODEL_UPDATE: new Operation(Resource.PRESCRIPTION_MODEL, Action.UPDATE),
  PRESCRIPTION_MODEL_DELETE: new Operation(Resource.PRESCRIPTION_MODEL, Action.DELETE),

  PATIENT_PROPERTY_MODEL_VIEW: new Operation(Resource.PATIENT_PROPERTY_MODEL, Action.VIEW),
  PATIENT_PROPERTY_MODEL_CREATE: new Operation(Resource.PATIENT_PROPERTY_MODEL, Action.CREATE),
  PATIENT_PROPERTY_MODEL_UPDATE: new Operation(Resource.PATIENT_PROPERTY_MODEL, Action.UPDATE),
  PATIENT_PROPERTY_MODEL_DELETE: new Operation(Resource.PATIENT_PROPERTY_MODEL, Action.DELETE),

  CALENDAR_TOKEN_VIEW: new Operation(Resource.CALENDAR_TOKEN, Action.VIEW),
  CALENDAR_TOKEN_ROTATE: new Operation(Resource.CALENDAR_TOKEN, Action.ROTATE),
  CALENDAR_SETTINGS_VIEW: new Operation(Resource.CALENDAR_SETTINGS, Action.VIEW),
  CALENDAR_SETTINGS_UPDATE: new Operation(Resource.CALENDAR_SETTINGS, Action.UPDATE),

  CALENDAR_SYNC_ENABLE: new Operation(Resource.CALENDAR_SYNC, Action.ENABLE),
  CALENDAR_SYNC_DISABLE: new Operation(Resource.CALENDAR_SYNC, Action.DISABLE),
  CALENDAR_SYNC_VIEW: new Operation(Resource.CALENDAR_SYNC, Action.VIEW),

  AVAILABLE_SLOTS_VIEW: new Operation(Resource.AVAILABLE_SLOTS, Action.VIEW),
  MEDICATION_SEARCH_VIEW: new Operation(Resource.MEDICATION_SEARCH, Action.VIEW),
} as const;

export function getAllOperations(): Operation[] {
  return Object.values(Operations);
}

export function getOperationsByResource(resource: Resource): Operation[] {
  return getAllOperations().filter((op) => op.resource === resource);
}

export function getOperationsByAction(action: Action): Operation[] {
  return getAllOperations().filter((op) => op.action === action);
}
