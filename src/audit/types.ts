import { OPERATION } from '../operations';

export type ISODateTime = string;
export type UUID = string;

export type FieldChange<T, K extends keyof T> = {
  from: T[K];
  to: T[K];
};

export type ModifiedChanges<T> = {
  [K in keyof T]?: FieldChange<T, K>;
};

export type ModifiedChangesAlt<T> = {
  [K in keyof T]?: { from: T[K]; to: T[K] };
};

export interface AuditLogRecord<
  T = Record<string, any>,
  I = { graphql?: { fieldName: string; typeName: string }; userInfo?: any },
> {
  PK: string;
  SK: string;
  timestamp: ISODateTime;
  userId: string;
  operation: OPERATION;
  objectId: string;
  eventId: UUID;
  lastKnownState?: T;
  info?: I;
  changed?: {
    full?: Record<string, any>;
    added?: Record<string, any>;
    modified?: ModifiedChanges<T>;
    removed?: Record<string, any>;
  };
}

export interface PublishedEvent<T = Record<string, any>> {
  accountId: string;
  userId: string;
  at: ISODateTime;
  object?: T;
  operation: string;
  changed?: T;
}
