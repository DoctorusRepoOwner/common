# Audit Module

## Overview

The Audit module provides comprehensive types and utilities for tracking and logging user actions, system events, and data changes across the Doctorus platform. It enables complete audit trails for compliance, security, and debugging purposes.

## Features

- ✅ **Type-safe audit event structures**
- ✅ **Flexible metadata support**
- ✅ **User and system event tracking**
- ✅ **Data change tracking** with before/after states
- ✅ **Integration with Operations module** for action/resource context
- ✅ **Timestamp and user attribution**
- ✅ **Support for correlation and tracing**

## Core Types

### 1. AuditEvent

The main audit event structure:

```typescript
interface AuditEvent {
  id: string; // Unique event identifier (UUID)
  timestamp: Date; // When the event occurred
  userId?: string; // User who performed the action (optional for system events)
  action: string; // Action performed (from Action enum)
  resource: string; // Resource affected (from Resource enum)
  resourceId?: string; // Specific resource instance ID
  metadata?: Record<string, any>; // Additional context data
  result: 'success' | 'failure'; // Outcome of the action
  errorMessage?: string; // Error details if result is 'failure'
  ipAddress?: string; // IP address of the requester
  userAgent?: string; // User agent string
  correlationId?: string; // For tracing related events
  parentEventId?: string; // For hierarchical event relationships
}
```

### 2. AuditEventType

Categorizes audit events:

```typescript
enum AuditEventType {
  USER_ACTION = 'user_action', // User-initiated actions
  SYSTEM_EVENT = 'system_event', // System-generated events
  DATA_CHANGE = 'data_change', // Data modification events
  AUTHENTICATION = 'authentication', // Login/logout events
  AUTHORIZATION = 'authorization', // Permission checks
  CONFIGURATION = 'configuration', // System configuration changes
  ERROR = 'error', // Error events
}
```

### 3. DataChange

For tracking data modifications:

```typescript
interface DataChange {
  field: string; // Name of the changed field
  oldValue?: any; // Previous value
  newValue?: any; // New value
  changeType: 'create' | 'update' | 'delete';
}

interface DataChangeEvent extends AuditEvent {
  eventType: AuditEventType.DATA_CHANGE;
  changes: DataChange[]; // Array of field changes
}
```

## Usage Examples

### Basic Audit Logging

```typescript
import { AuditEvent, Action, Resource } from '@doctorus/common';
import { v4 as uuidv4 } from 'uuid';

function createAuditEvent(
  userId: string,
  action: Action,
  resource: Resource,
  resourceId: string,
  result: 'success' | 'failure',
  metadata?: Record<string, any>,
): AuditEvent {
  return {
    id: uuidv4(),
    timestamp: new Date(),
    userId,
    action,
    resource,
    resourceId,
    result,
    metadata,
  };
}

// Log a successful patient creation
const event = createAuditEvent('user-123', Action.CREATE, Resource.PATIENT, 'patient-456', 'success', {
  patientName: 'John Doe',
  createdBy: 'Dr. Smith',
});

await auditLogger.log(event);
```

### Authentication Events

```typescript
import { AuditEvent, AuditEventType, Action, Resource } from '@doctorus/common';

async function logLoginAttempt(
  userId: string,
  success: boolean,
  ipAddress: string,
  userAgent: string,
  errorMessage?: string,
): Promise<void> {
  const event: AuditEvent = {
    id: uuidv4(),
    timestamp: new Date(),
    userId,
    action: Action.LOGIN,
    resource: Resource.ACCOUNT,
    result: success ? 'success' : 'failure',
    errorMessage,
    ipAddress,
    userAgent,
    metadata: {
      eventType: AuditEventType.AUTHENTICATION,
    },
  };

  await auditLogger.log(event);
}

// Usage
await logLoginAttempt('user-123', true, '192.168.1.1', 'Mozilla/5.0...');
await logLoginAttempt('user-456', false, '10.0.0.1', 'Mozilla/5.0...', 'Invalid password');
```

### Data Change Tracking

```typescript
import { DataChangeEvent, DataChange, AuditEventType, Action, Resource } from '@doctorus/common';

async function logDataChange(
  userId: string,
  resource: Resource,
  resourceId: string,
  changes: DataChange[],
): Promise<void> {
  const event: DataChangeEvent = {
    id: uuidv4(),
    timestamp: new Date(),
    userId,
    action: Action.UPDATE,
    resource,
    resourceId,
    result: 'success',
    eventType: AuditEventType.DATA_CHANGE,
    changes,
  };

  await auditLogger.log(event);
}

// Track patient information update
const changes: DataChange[] = [
  {
    field: 'phone',
    oldValue: '+1-555-0100',
    newValue: '+1-555-0101',
    changeType: 'update',
  },
  {
    field: 'address',
    oldValue: '123 Old St',
    newValue: '456 New Ave',
    changeType: 'update',
  },
];

await logDataChange('user-123', Resource.PATIENT, 'patient-456', changes);
```

### Medical Actions Audit

```typescript
import { AuditEvent, Action, Resource, getOperationLabel } from '@doctorus/common';

async function logMedicalAction(
  userId: string,
  action: Action,
  resource: Resource,
  resourceId: string,
  patientId: string,
  metadata?: Record<string, any>,
): Promise<void> {
  const event: AuditEvent = {
    id: uuidv4(),
    timestamp: new Date(),
    userId,
    action,
    resource,
    resourceId,
    result: 'success',
    metadata: {
      ...metadata,
      patientId,
      actionLabel: getOperationLabel(new Operation(action, resource), 'us-EN'),
    },
  };

  await auditLogger.log(event);
}

// Log prescription creation
await logMedicalAction('doctor-123', Action.PRESCRIBE, Resource.PRESCRIPTION, 'prescription-789', 'patient-456', {
  medication: 'Amoxicillin',
  dosage: '500mg',
  duration: '7 days',
});

// Log diagnosis
await logMedicalAction('doctor-123', Action.DIAGNOSE, Resource.DIAGNOSIS, 'diagnosis-101', 'patient-456', {
  condition: 'Acute bronchitis',
  icdCode: 'J20.9',
});
```

### System Events

```typescript
import { AuditEvent, AuditEventType, Resource } from '@doctorus/common';

async function logSystemEvent(action: string, resource: Resource, metadata?: Record<string, any>): Promise<void> {
  const event: AuditEvent = {
    id: uuidv4(),
    timestamp: new Date(),
    // No userId for system events
    action,
    resource,
    result: 'success',
    metadata: {
      ...metadata,
      eventType: AuditEventType.SYSTEM_EVENT,
    },
  };

  await auditLogger.log(event);
}

// Log scheduled backup
await logSystemEvent('BACKUP', Resource.SYSTEM, { backupType: 'full', size: '2.5GB', duration: '45min' });

// Log automatic cleanup
await logSystemEvent('CLEANUP', Resource.SYSTEM, { deletedRecords: 150, table: 'expired_sessions' });
```

### Correlation and Tracing

```typescript
import { AuditEvent, Action, Resource } from '@doctorus/common';

// Create a parent event (e.g., medical service creation)
const parentEvent: AuditEvent = {
  id: uuidv4(),
  timestamp: new Date(),
  userId: 'doctor-123',
  action: Action.CREATE,
  resource: Resource.MEDICAL_SERVICE,
  resourceId: 'service-789',
  result: 'success',
  correlationId: uuidv4(), // Trace ID for all related events
};

await auditLogger.log(parentEvent);

// Create related child events
const childEvents = [
  {
    id: uuidv4(),
    timestamp: new Date(),
    userId: 'doctor-123',
    action: Action.CREATE,
    resource: Resource.MEDICAL_SERVICE_SCHEDULE,
    resourceId: 'schedule-101',
    result: 'success',
    correlationId: parentEvent.correlationId,
    parentEventId: parentEvent.id,
  },
  {
    id: uuidv4(),
    timestamp: new Date(),
    userId: 'doctor-123',
    action: Action.SET_MEDICAL_SERVICE_FEES,
    resource: Resource.MEDICAL_SERVICE_FEES,
    resourceId: 'fees-102',
    result: 'success',
    correlationId: parentEvent.correlationId,
    parentEventId: parentEvent.id,
  },
];

for (const event of childEvents) {
  await auditLogger.log(event);
}

// Query all related events
const relatedEvents = await auditLogger.findByCorrelationId(parentEvent.correlationId);
```

## Common Patterns

### 1. Audit Logger Service

```typescript
import { AuditEvent } from '@doctorus/common';

class AuditLogger {
  private repository: AuditEventRepository;

  async log(event: AuditEvent): Promise<void> {
    // Validate event
    this.validateEvent(event);

    // Store in database
    await this.repository.save(event);

    // Optionally: send to external logging service
    await this.sendToExternalService(event);
  }

  async findByUserId(userId: string, limit = 100): Promise<AuditEvent[]> {
    return this.repository.findByUserId(userId, limit);
  }

  async findByResource(resource: string, resourceId: string): Promise<AuditEvent[]> {
    return this.repository.findByResource(resource, resourceId);
  }

  async findByCorrelationId(correlationId: string): Promise<AuditEvent[]> {
    return this.repository.findByCorrelationId(correlationId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<AuditEvent[]> {
    return this.repository.findByDateRange(startDate, endDate);
  }

  private validateEvent(event: AuditEvent): void {
    if (!event.id || !event.timestamp || !event.action || !event.resource) {
      throw new Error('Invalid audit event: missing required fields');
    }
  }

  private async sendToExternalService(event: AuditEvent): Promise<void> {
    // Send to CloudWatch, Splunk, etc.
  }
}
```

### 2. Decorator for Automatic Audit Logging

```typescript
import { AuditEvent, Action, Resource } from '@doctorus/common';

function Auditable(action: Action, resource: Resource) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      let result: 'success' | 'failure' = 'success';
      let errorMessage: string | undefined;

      try {
        const methodResult = await originalMethod.apply(this, args);
        return methodResult;
      } catch (error) {
        result = 'failure';
        errorMessage = error instanceof Error ? error.message : String(error);
        throw error;
      } finally {
        const event: AuditEvent = {
          id: uuidv4(),
          timestamp: new Date(),
          userId: this.getCurrentUserId?.() || 'system',
          action,
          resource,
          result,
          errorMessage,
          metadata: {
            method: propertyKey,
            duration: Date.now() - startTime,
          },
        };

        await auditLogger.log(event);
      }
    };

    return descriptor;
  };
}

// Usage
class PatientService {
  @Auditable(Action.CREATE, Resource.PATIENT)
  async createPatient(data: PatientData): Promise<Patient> {
    // Method implementation
  }

  @Auditable(Action.UPDATE, Resource.PATIENT)
  async updatePatient(id: string, data: Partial<PatientData>): Promise<Patient> {
    // Method implementation
  }
}
```

### 3. Compliance Reporting

```typescript
import { AuditEvent, Resource } from '@doctorus/common';

class ComplianceReporter {
  async generateHIPAAReport(startDate: Date, endDate: Date): Promise<Report> {
    const events = await auditLogger.findByDateRange(startDate, endDate);

    // Filter medical resource access
    const medicalAccess = events.filter((e) => isMedicalResource(e.resource as Resource));

    return {
      totalEvents: events.length,
      medicalResourceAccess: medicalAccess.length,
      failedAccess: events.filter((e) => e.result === 'failure').length,
      userActivity: this.groupByUser(medicalAccess),
      resourceAccess: this.groupByResource(medicalAccess),
    };
  }

  private groupByUser(events: AuditEvent[]): Record<string, number> {
    return events.reduce(
      (acc, event) => {
        if (event.userId) {
          acc[event.userId] = (acc[event.userId] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  private groupByResource(events: AuditEvent[]): Record<string, number> {
    return events.reduce(
      (acc, event) => {
        acc[event.resource] = (acc[event.resource] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }
}
```

### 4. Real-time Audit Monitoring

```typescript
import { AuditEvent, AuditEventType } from '@doctorus/common';

class AuditMonitor {
  private subscribers: Array<(event: AuditEvent) => void> = [];

  subscribe(handler: (event: AuditEvent) => void): void {
    this.subscribers.push(handler);
  }

  async onAuditEvent(event: AuditEvent): Promise<void> {
    // Notify all subscribers
    this.subscribers.forEach((handler) => handler(event));

    // Check for security alerts
    if (event.result === 'failure' && event.metadata?.eventType === AuditEventType.AUTHENTICATION) {
      await this.handleFailedLogin(event);
    }

    // Check for suspicious patterns
    if (await this.detectSuspiciousActivity(event)) {
      await this.triggerSecurityAlert(event);
    }
  }

  private async handleFailedLogin(event: AuditEvent): Promise<void> {
    // Track failed login attempts
    // Implement rate limiting, account lockout, etc.
  }

  private async detectSuspiciousActivity(event: AuditEvent): Promise<boolean> {
    // Detect unusual patterns:
    // - Multiple failed access attempts
    // - Access to many records in short time
    // - Unusual access times
    // - Access from unusual locations
    return false; // Implement detection logic
  }

  private async triggerSecurityAlert(event: AuditEvent): Promise<void> {
    // Send notification to security team
  }
}
```

## API Reference

### Types

- `AuditEvent` - Main audit event interface
- `AuditEventType` - Enum for event categories
- `DataChange` - Interface for tracking field changes
- `DataChangeEvent` - Extended audit event with change tracking

### Utility Functions

The audit module integrates with the Operations module for action and resource labeling:

- Use `getOperationLabel()` to get human-readable operation descriptions
- Use `isMedicalResource()` to identify medical data access
- Use `Action` and `Resource` enums for type-safe audit logging

## Best Practices

1. **Always log user actions** that modify data
2. **Include resource IDs** for specific record tracking
3. **Use correlation IDs** for tracing complex operations
4. **Store IP addresses** for security analysis
5. **Track before/after states** for data changes
6. **Log both success and failure** events
7. **Include meaningful metadata** for context
8. **Implement retention policies** for audit data
9. **Use parent/child relationships** for hierarchical operations
10. **Monitor for suspicious patterns** in real-time

## Security Considerations

- Store audit logs in **immutable storage** (append-only)
- **Encrypt sensitive data** in metadata
- **Control access** to audit logs (need-to-know basis)
- **Regular backup** audit data
- **Comply with regulations** (HIPAA, GDPR, etc.)
- **Never log passwords** or sensitive credentials
- **Anonymize or hash PII** where appropriate

## Compliance

The audit module helps meet compliance requirements:

- **HIPAA**: Track all PHI access and modifications
- **GDPR**: Log data access, modification, and deletion
- **SOC 2**: Comprehensive activity logging
- **ISO 27001**: Security event tracking

## Testing

Write tests for your audit logging implementation to ensure:

- All critical actions are logged
- Events contain required fields
- Metadata is properly structured
- Error cases are handled
- Integration with your storage works correctly
