import { Action } from './actions';
import type { AllowedActionFor } from './resource-actions';
import { Resource } from './resources';

/**
 * Operation string type in RESOURCE:ACTION format
 */
export type OPERATION = `${Resource}:${Action}`;

/**
 * Valid operation string union derived from RESOURCE_ACTIONS.
 */
export type AllowedOperationFor<R extends Resource> = R extends Resource ? `${R}:${AllowedActionFor<R>}` : never;
export type AllowedOperation = AllowedOperationFor<Resource>;
export type ResourceFromOperation<O extends OPERATION> = O extends `${infer R extends Resource}:${Action}` ? R : never;
export type ActionFromOperation<O extends OPERATION> = O extends `${Resource}:${infer A extends Action}` ? A : never;
export type OperationFromString<O extends AllowedOperation> =
  O extends `${infer R extends Resource}:${infer A extends Action}`
    ? A extends AllowedActionFor<R>
      ? Operation<R, A>
      : never
    : never;

/**
 * Operation in RESOURCE:ACTION format
 */
export class Operation<R extends Resource = Resource, A extends AllowedActionFor<R> = AllowedActionFor<R>> {
  /**
   * Create operation with compile-time action restriction based on resource.
   */
  static create<R extends Resource, A extends AllowedActionFor<R>>(resource: R, action: A): Operation<R, A> {
    return new Operation(resource, action);
  }

  /**
   * Create operation from string
   * @param operationString - String in RESOURCE:ACTION format
   * @returns Operation instance or null if invalid
   */
  static fromString<const O extends AllowedOperation>(operationString: O): OperationFromString<O>;
  static fromString(operationString: string): Operation | null;
  static fromString(operationString: string): Operation | null {
    const parts = operationString.split(':');
    if (parts.length !== 2) {
      return null;
    }

    const [resourceStr, actionStr] = parts;

    // Validate resource
    if (!Object.values(Resource).includes(resourceStr as Resource)) {
      return null;
    }

    // Validate action
    if (!Object.values(Action).includes(actionStr as Action)) {
      return null;
    }

    return new Operation(resourceStr as Resource, actionStr as AllowedActionFor<Resource>);
  }

  constructor(
    public readonly resource: R,
    public readonly action: A,
  ) {}

  /**
   * Get operation string in RESOURCE:ACTION format
   */
  toString(): `${R}:${A}` {
    return `${this.resource}:${this.action}` as `${R}:${A}`;
  }

  /**
   * Check if two operations are equal
   */
  equals(other: Operation): boolean {
    return this.resource === other.resource && this.action === other.action;
  }

  /**
   * Convert to JSON representation
   */
  toJSON(): { resource: R; action: A; operation: `${R}:${A}` } {
    return {
      resource: this.resource,
      action: this.action,
      operation: this.toString(),
    };
  }
}

/**
 * Extract Resource from an OPERATION string
 * @param operation - Operation string in RESOURCE:ACTION format
 * @returns Resource or null if invalid
 *
 * @example
 * ```ts
 * getResourceFromOperation("PATIENT:RETRIEVE") // Returns: Resource.PATIENT
 * getResourceFromOperation("INVALID:ACTION") // Returns: null
 * ```
 */
export function getResourceFromOperation<const O extends OPERATION>(operation: O): ResourceFromOperation<O>;
export function getResourceFromOperation(operation: string): Resource | null;
export function getResourceFromOperation(operation: string): Resource | null {
  const parts = operation.split(':');
  if (parts.length !== 2) {
    return null;
  }

  const [resourceStr] = parts;

  // Validate resource
  if (Object.values(Resource).includes(resourceStr as Resource)) {
    return resourceStr as Resource;
  }

  return null;
}

/**
 * Extract Action from an OPERATION string
 * @param operation - Operation string in RESOURCE:ACTION format
 * @returns Action or null if invalid
 *
 * @example
 * ```ts
 * getActionFromOperation("PATIENT:RETRIEVE") // Returns: Action.RETRIEVE
 * getActionFromOperation("PATIENT:INVALID") // Returns: null
 * ```
 */
export function getActionFromOperation<const O extends OPERATION>(operation: O): ActionFromOperation<O>;
export function getActionFromOperation(operation: string): Action | null;
export function getActionFromOperation(operation: string): Action | null {
  const parts = operation.split(':');
  if (parts.length !== 2) {
    return null;
  }

  const [, actionStr] = parts;

  // Validate action
  if (Object.values(Action).includes(actionStr as Action)) {
    return actionStr as Action;
  }

  return null;
}
