/**
 * Action types for operations
 */
export enum Action {
  // CRUD operations
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LIST = "LIST",

  // Access control
  GRANT = "GRANT",
  REVOKE = "REVOKE",

  // Medical specific
  PRESCRIBE = "PRESCRIBE",
  DIAGNOSE = "DIAGNOSE",
  SCHEDULE = "SCHEDULE",
  CANCEL = "CANCEL",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  SIGN = "SIGN",
  VERIFY = "VERIFY",

  // Data operations
  EXPORT = "EXPORT",
  IMPORT = "IMPORT",
  ARCHIVE = "ARCHIVE",
  RESTORE = "RESTORE",
  SHARE = "SHARE",
  DOWNLOAD = "DOWNLOAD",
  UPLOAD = "UPLOAD",

  // System operations
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  CONFIGURE = "CONFIGURE",
  AUDIT = "AUDIT",
}
