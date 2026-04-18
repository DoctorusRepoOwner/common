/**
 * Action types aligned with the permission catalog architecture.
 */
export enum Action {
  CREATE = 'CREATE',
  VIEW = 'VIEW',
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
  REMOVE = 'REMOVE',
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

const ACTION_ACCESS: Record<Action, ActionAccess> = {
  [Action.CREATE]: ActionAccess.WRITE,
  [Action.VIEW]: ActionAccess.READ,
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
  [Action.REMOVE]: ActionAccess.WRITE,
  [Action.ROTATE]: ActionAccess.WRITE,
  [Action.TRANSFER_OWNERSHIP]: ActionAccess.WRITE,
};

export function getActionAccess(action: Action): ActionAccess {
  return ACTION_ACCESS[action];
}

export function isReadAction(action: Action): boolean {
  return ACTION_ACCESS[action] === ActionAccess.READ;
}

export function isWriteAction(action: Action): boolean {
  return ACTION_ACCESS[action] === ActionAccess.WRITE;
}

export function getActionsByAccess(access: ActionAccess): Action[] {
  return (Object.values(Action) as Action[]).filter((action) => ACTION_ACCESS[action] === access);
}
