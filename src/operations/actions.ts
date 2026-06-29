/**
 * Action types aligned with the permission catalog architecture.
 */
export enum Action {
  CREATE = 'CREATE',
  VIEW = 'VIEW',
  LIST = 'LIST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ASSIGN = 'ASSIGN',
  CANCEL = 'CANCEL',
  CHECK_IN = 'CHECK_IN',
  COMPLETE = 'COMPLETE',
  DISABLE = 'DISABLE',
  ENABLE = 'ENABLE',
  GENERATE = 'GENERATE',
  INVITE = 'INVITE',
  UPSERT = 'UPSERT',
  ROTATE = 'ROTATE',
  TRANSFER_OWNERSHIP = 'TRANSFER_OWNERSHIP',
}

/**
 * Access level classification for actions.
 * - READ: does not modify domain state
 * - WRITE: modifies domain state
 */
export enum ActionAccess {
  READ = 'READ',
  WRITE = 'WRITE',
}

const ACTION_ACCESS = {
  [Action.CREATE]: ActionAccess.WRITE,
  [Action.VIEW]: ActionAccess.READ,
  [Action.LIST]: ActionAccess.READ,
  [Action.UPDATE]: ActionAccess.WRITE,
  [Action.DELETE]: ActionAccess.WRITE,
  [Action.ASSIGN]: ActionAccess.WRITE,
  [Action.CANCEL]: ActionAccess.WRITE,
  [Action.CHECK_IN]: ActionAccess.WRITE,
  [Action.COMPLETE]: ActionAccess.WRITE,
  [Action.DISABLE]: ActionAccess.WRITE,
  [Action.ENABLE]: ActionAccess.WRITE,
  [Action.GENERATE]: ActionAccess.WRITE,
  [Action.INVITE]: ActionAccess.WRITE,
  [Action.UPSERT]: ActionAccess.WRITE,
  [Action.ROTATE]: ActionAccess.WRITE,
  [Action.TRANSFER_OWNERSHIP]: ActionAccess.WRITE,
} as const satisfies Record<Action, ActionAccess>;

export type ActionForAccess<A extends ActionAccess> = {
  [ActionName in Action]: (typeof ACTION_ACCESS)[ActionName] extends A ? ActionName : never;
}[Action];

export function getActionAccess<A extends Action>(action: A): (typeof ACTION_ACCESS)[A] {
  return ACTION_ACCESS[action];
}

export function isReadAction(action: Action): boolean {
  return ACTION_ACCESS[action] === ActionAccess.READ;
}

export function isWriteAction(action: Action): boolean {
  return ACTION_ACCESS[action] === ActionAccess.WRITE;
}

export function getActionsByAccess<A extends ActionAccess>(access: A): ActionForAccess<A>[] {
  return (Object.values(Action) as Action[]).filter(
    (action) => ACTION_ACCESS[action] === access,
  ) as ActionForAccess<A>[];
}
