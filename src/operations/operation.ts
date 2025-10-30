import { Action } from "./actions";
import { Resource } from "./resources";

/**
 * Operation string type in RESOURCE:ACTION format
 */
export type OPERATION = `${Resource}:${Action}`;

/**
 * Operation in RESOURCE:ACTION format
 */
export class Operation {
  /**
   * Create operation from string
   * @param operationString - String in RESOURCE:ACTION format
   * @returns Operation instance or null if invalid
   */
  static fromString(operationString: string): Operation | null {
    const parts = operationString.split(":");
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

    return new Operation(resourceStr as Resource, actionStr as Action);
  }

  constructor(
    public readonly resource: Resource,
    public readonly action: Action,
  ) {}

  /**
   * Get operation string in RESOURCE:ACTION format
   */
  toString(): OPERATION {
    return `${this.resource}:${this.action}` as OPERATION;
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
  toJSON(): { resource: Resource; action: Action; operation: OPERATION } {
    return {
      resource: this.resource,
      action: this.action,
      operation: this.toString(),
    };
  }
}
