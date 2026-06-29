import { Action, ActionAccess, getActionAccess } from './actions';
import type { ActionForAccess } from './actions';
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
export type AllowedActionForAccess<R extends Resource, A extends ActionAccess> = Extract<
  AllowedActionFor<R>,
  ActionForAccess<A>
>;
export type ResourceActions = {
  [ResourceName in Resource]: AllowedActionFor<ResourceName>[];
};
export type ResourceActionsByAccess<A extends ActionAccess> = {
  [ResourceName in Resource]: AllowedActionForAccess<ResourceName, A>[];
};
export type ResourceOperationForAccess<R extends Resource, A extends ActionAccess> = R extends Resource
  ? Operation<R, AllowedActionForAccess<R, A>>
  : never;
export type GeneratedOperationFor<R extends Resource, A extends Action> = R extends Resource
  ? Extract<A, AllowedActionFor<R>> extends never
    ? never
    : Operation<R, Extract<A, AllowedActionFor<R>>>
  : never;

export function getResourceActions<R extends Resource>(resource: R): AllowedActionFor<R>[] {
  return [...RESOURCE_ACTIONS[resource]] as AllowedActionFor<R>[];
}

/**
 * Returns true if the given action is valid for the given resource.
 */
export function isValidOperation<R extends Resource>(resource: R, action: Action): action is AllowedActionFor<R> {
  return (RESOURCE_ACTIONS[resource] as readonly Action[]).includes(action);
}

export function getAllResourceActions(): Readonly<ResourceActions> {
  return RESOURCE_ACTIONS as unknown as Readonly<ResourceActions>;
}

export function getResourceActionsByAccess<R extends Resource, A extends ActionAccess>(
  resource: R,
  access: A,
): AllowedActionForAccess<R, A>[] {
  return RESOURCE_ACTIONS[resource].filter((action) => getActionAccess(action) === access) as AllowedActionForAccess<
    R,
    A
  >[];
}

export function getAllResourceActionsByAccess<A extends ActionAccess>(access: A): Readonly<ResourceActionsByAccess<A>> {
  const filtered = {} as Record<Resource, Action[]>;

  (Object.values(Resource) as Resource[]).forEach((resource) => {
    filtered[resource] = RESOURCE_ACTIONS[resource].filter((action) => getActionAccess(action) === access);
  });

  return filtered as ResourceActionsByAccess<A>;
}

export function getResourceOperationsByAccess<R extends Resource, A extends ActionAccess>(
  resource: R,
  access: A,
): ResourceOperationForAccess<R, A>[] {
  return RESOURCE_ACTIONS[resource]
    .filter((action) => getActionAccess(action) === access)
    .map(
      (action) => new Operation(resource, action as AllowedActionForAccess<R, A>) as ResourceOperationForAccess<R, A>,
    );
}

/**
 * Generate valid operations for a list of resources based on a provided action list.
 *
 * Only actions allowed for each resource are kept.
 */
export function generateOperationsForResources<const R extends readonly Resource[], const A extends readonly Action[]>(
  resources: R,
  actions: A,
): GeneratedOperationFor<R[number], A[number]>[] {
  const operations: GeneratedOperationFor<R[number], A[number]>[] = [];
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
      operations.push(
        new Operation(resource, action as AllowedActionFor<typeof resource>) as GeneratedOperationFor<
          R[number],
          A[number]
        >,
      );
    });
  });

  return operations;
}
