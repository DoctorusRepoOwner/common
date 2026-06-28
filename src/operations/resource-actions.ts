import { Action, ActionAccess, getActionAccess } from './actions';
import { Operation } from './operation';
import { Resource } from './resources';

export const RESOURCE_ACTIONS = {
  [Resource.ACCOUNT]: [
    Action.LIST,
    Action.ASSIGN,
    Action.VIEW,
    Action.UPDATE,
    Action.TRANSFER_OWNERSHIP,
    Action.DISABLE,
    Action.ENABLE,
    Action.CREATE,
  ],
  [Resource.CALCULATED_MEASURE_MODEL]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.CALENDAR_SETTINGS]: [Action.VIEW, Action.UPDATE],
  [Resource.CALENDAR_SYNC]: [Action.ENABLE, Action.DISABLE, Action.VIEW],
  [Resource.CALENDAR_TOKEN]: [Action.VIEW, Action.ROTATE, Action.GENERATE],
  [Resource.CONTACT]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.DOCUMENT_LAYOUT]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE, Action.GENERATE],
  [Resource.DOCUMENT_MODEL]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.GENERAL_SETTINGS]: [Action.LIST, Action.VIEW, Action.UPDATE],
  [Resource.GENERATED_DOCUMENT]: [
    Action.LIST,
    Action.VIEW,
    Action.GENERATE,
    Action.DELETE,
    Action.UPDATE,
    Action.CREATE,
  ],
  [Resource.LOCATION]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEASURE_MODEL]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEDICATION]: [Action.LIST],
  [Resource.MEDICAL_SERVICE_SLOT]: [Action.LIST],
  [Resource.MEDICAL_SERVICE]: [
    Action.LIST,
    Action.VIEW,
    Action.CREATE,
    Action.UPDATE,
    Action.DELETE,
    Action.CHECK_IN,
    Action.COMPLETE,
    Action.CANCEL,
    Action.ASSIGN,
  ],
  [Resource.MEDICAL_SERVICE_NOTE]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.MEMBERSHIP]: [Action.LIST, Action.VIEW, Action.INVITE, Action.UPDATE, Action.DELETE],
  [Resource.OBSERVATION]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_PUBLIC_PROPERTY]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_MEDICAL_PROPERTY]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_MEDICAL_NOTE]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_PAYMENT]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PATIENT_PROPERTY_MODEL]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PREFERENCES]: [Action.LIST, Action.VIEW, Action.UPDATE],
  [Resource.PRESCRIPTION]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.PRESCRIPTION_MODEL]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.ROLE]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE, Action.ASSIGN],
  [Resource.TASK_TYPE]: [Action.LIST, Action.VIEW, Action.CREATE, Action.UPDATE, Action.DELETE],
  [Resource.UPLOAD_DOCUMENT]: [Action.LIST, Action.VIEW, Action.CREATE, Action.DELETE],
  [Resource.USER]: [Action.LIST, Action.VIEW, Action.UPDATE],
} as const satisfies Record<Resource, readonly Action[]>;

export type AllowedActionFor<R extends Resource> = (typeof RESOURCE_ACTIONS)[R][number];

export function getResourceActions(resource: Resource): Action[] {
  return [...RESOURCE_ACTIONS[resource]];
}

/**
 * Returns true if the given action is valid for the given resource.
 */
export function isValidOperation(resource: Resource, action: Action): boolean {
  return (RESOURCE_ACTIONS[resource] as readonly Action[]).includes(action);
}

export function getAllResourceActions(): Readonly<Record<Resource, Action[]>> {
  return RESOURCE_ACTIONS as unknown as Readonly<Record<Resource, Action[]>>;
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
    const allowedActions = RESOURCE_ACTIONS[resource] as readonly Action[];

    actions.forEach((action) => {
      if (!allowedActions.includes(action)) {
        return;
      }

      const key = `${resource}:${action}`;
      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      operations.push(new Operation(resource, action as AllowedActionFor<Resource>));
    });
  });

  return operations;
}
