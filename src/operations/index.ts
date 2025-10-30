export {
    Resource,
    MEDICAL_RESOURCES,
    PUBLIC_RESOURCES,
    isMedicalResource,
    isPublicResource,
} from "./resources";
export { Action } from "./actions";
export {
    Operation,
    OPERATION,
    getResourceFromOperation,
    getActionFromOperation,
} from "./operation";
export {
    Operations,
    getAllOperations,
    getOperationsByResource,
    getOperationsByAction,
} from "./predefined";
