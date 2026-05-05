export {
  Resource,
  ResourceCategory,
  ResourceScope,
  MEDICAL_RESOURCES,
  PUBLIC_RESOURCES,
  USER_RESOURCES,
  ACCOUNT_RESOURCES,
  CORE_RESOURCES,
  MEMBERSHIP_RESOURCES,
  CLINICAL_RESOURCES,
  DOCUMENT_RESOURCES,
  SETTINGS_RESOURCES,
  INTEGRATION_RESOURCES,
  SCHEDULING_RESOURCES,
  EXTERNAL_RESOURCES,
  SYSTEM_RESOURCES,
  isMedicalResource,
  isPublicResource,
  isUserResource,
  isAccountResource,
  getResourceScope,
  getResourcesByScope,
  getResourceCategories,
  getResourcesByCategory,
  getResourcesByCategories,
} from './resources';
export { Action, ActionAccess, getActionAccess, isReadAction, isWriteAction, getActionsByAccess } from './actions';
export { Operation, OPERATION, getResourceFromOperation, getActionFromOperation } from './operation';
export {
  RESOURCE_ACTIONS,
  getResourceActions,
  getAllResourceActions,
  getResourceActionsByAccess,
  getAllResourceActionsByAccess,
  getResourceOperationsByAccess,
  generateOperationsForResources,
  isValidOperation,
} from './resource-actions';
export type { AllowedActionFor } from './resource-actions';
export * from './labels';
