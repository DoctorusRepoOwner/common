import { Action, ActionAccess, getActionAccess } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

const RESOURCE_ACTIONS: Record<Resource, Action[]> = {
  [Resource.ACCOUNT]: [Action.VIEW, Action.UPDATE, Action.TRANSFER_OWNERSHIP],
  [Resource.CALCULATED_MEASURE_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.CALENDAR_SETTINGS]: [Action.VIEW, Action.UPDATE],
  [Resource.CALENDAR_SYNC]: [Action.ENABLE, Action.DISABLE, Action.VIEW],
  [Resource.CALENDAR_TOKEN]: [Action.VIEW, Action.ROTATE],
  [Resource.CONTACT]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.DOCUMENT_LAYOUT]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.DOCUMENT_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.GENERAL_SETTINGS]: [Action.VIEW, Action.UPDATE],
  [Resource.GENERATED_DOCUMENT]: [Action.VIEW, Action.GENERATE, Action.DELETE],
  [Resource.LOCATION]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEASURE_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEDICATION_SEARCH]: [Action.VIEW],
  [Resource.MEDICAL_HISTORY]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEDICAL_HISTORY_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEDICAL_SERVICE]: [
    Action.VIEW,
    Action.CREATE,
    Action.UPDATE,
    Action.DELETE,
    Action.CHECK_IN,
    Action.COMPLETE,
    Action.CANCEL,
    Action.ASSIGN,
  ],
  [Resource.MEDICAL_SERVICE_NOTE]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEMBERSHIP]: [Action.VIEW, Action.INVITE, Action.UPDATE, Action.REMOVE],
  [Resource.OBSERVATION]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_MEDICAL_NOTE]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_PAYMENT]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_PROPERTY_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PREFERENCES]: [Action.VIEW, Action.UPDATE],
  [Resource.PRESCRIPTION]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PRESCRIPTION_MODEL]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.ROLE]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.TASK_TYPE]: [Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.UPLOAD_DOCUMENT]: [Action.VIEW, Action.CREATE, Action.DELETE],
  [Resource.USER]: [Action.VIEW, Action.UPDATE],
  [Resource.AVAILABLE_SLOTS]: [Action.VIEW],
};

export function getResourceActions(resource: Resource): Action[] {
  return [...RESOURCE_ACTIONS[resource]];
}

export function getAllResourceActions(): Readonly<Record<Resource, Action[]>> {
  return RESOURCE_ACTIONS;
}

export function getResourceActionsByAccess(resource: Resource, access: ActionAccess): Action[] {
  return RESOURCE_ACTIONS[resource].filter((action) => getActionAccess(action) === access);
}

export function getAllResourceActionsByAccess(access: ActionAccess): Readonly<Record<Resource, Action[]>> {
  const filtered = {} as Record<Resource, Action[]>;

  (Object.values(Resource) as Resource[]).forEach((resource) => {
    filtered[resource] = RESOURCE_ACTIONS[resource].filter((action) => getActionAccess(action) === access);
  });

  return filtered;
}

export function getResourceOperationsByAccess(resource: Resource, access: ActionAccess): Operation[] {
  return RESOURCE_ACTIONS[resource]
    .filter((action) => getActionAccess(action) === access)
    .map((action) => new Operation(resource, action));
}

/**
 * Generate valid operations for a list of resources based on a provided action list.
 *
 * Only actions allowed for each resource are kept.
 */
export function generateOperationsForResources(resources: Resource[], actions: Action[]): Operation[] {
  const operations: Operation[] = [];
  const seen = new Set<string>();

  resources.forEach((resource) => {
    const allowedActions = RESOURCE_ACTIONS[resource];

    actions.forEach((action) => {
      if (!allowedActions.includes(action)) {
        return;
      }

      const key = `${resource}:${action}`;
      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      operations.push(new Operation(resource, action));
    });
  });

  return operations;
}
