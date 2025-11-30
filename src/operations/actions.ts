/**
 * Action types for operations
 */
export enum Action {
  // CRUD operations
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  PUT = 'PUT',
  LIST = 'LIST',

  // General actions
  MANAGE = 'MANAGE',
  VIEW = 'VIEW',
  SEARCH = 'SEARCH',

  // Access control
  GRANT = 'GRANT',
  REVOKE = 'REVOKE',

  // Medical specific
  PRESCRIBE = 'PRESCRIBE',
  DIAGNOSE = 'DIAGNOSE',
  SCHEDULE = 'SCHEDULE',
  CANCEL = 'CANCEL',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  SIGN = 'SIGN',
  VERIFY = 'VERIFY',

  // Medical Account specific
  RECOVER = 'RECOVER',
  DISABLE = 'DISABLE',

  // Medical service specific
  SET_MEDICAL_SERVICE_STATUS = 'SET_MEDICAL_SERVICE_STATUS',
  SET_MEDICAL_SERVICE_FEES = 'SET_MEDICAL_SERVICE_FEES',

  // Patient specific
  UPDATE_STATUS = 'UPDATE_STATUS',
  VIEW_PATIENTS = 'VIEW_PATIENTS',
  PUT_PATIENT_PAYMENT = 'PUT_PATIENT_PAYMENT',
  DELETE_PATIENT_PAYMENT = 'DELETE_PATIENT_PAYMENT',

  // Data operations
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  ARCHIVE = 'ARCHIVE',
  RESTORE = 'RESTORE',
  SHARE = 'SHARE',
  DOWNLOAD = 'DOWNLOAD',
  UPLOAD = 'UPLOAD',

  // System operations
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CONFIGURE = 'CONFIGURE',
  AUDIT = 'AUDIT',
}
