# Status Module

## Overview

The Status module provides a comprehensive, reusable pattern for managing application statuses with rich metadata including icons, colors, and bilingual translations. Currently implements Medical Service Status with the pattern designed for extension to other entities.

## Features

- ✅ **Type-safe status enums**
- ✅ **Material Design icons** for visual representation
- ✅ **Color schemes** for UI theming
- ✅ **Bilingual support** (English/French) with short and long labels
- ✅ **Detailed descriptions** for each status
- ✅ **Status transition rules** and validation
- ✅ **Utility functions** for easy integration
- ✅ **100% test coverage**

## Medical Service Status

### Status Values

```typescript
import { MedicalServiceStatus } from '@doctorus/common';

MedicalServiceStatus.PENDING; // 'pending'
MedicalServiceStatus.ON_WAITING_ROOM; // 'on_waiting_room'
MedicalServiceStatus.IN_PROGRESS; // 'in_progress'
MedicalServiceStatus.COMPLETED; // 'completed'
MedicalServiceStatus.CANCELED; // 'canceled'
```

### Status Metadata

Each status includes comprehensive metadata:

| Status          | Icon                | Color              | Short Label (EN) | Short Label (FR) |
| --------------- | ------------------- | ------------------ | ---------------- | ---------------- |
| PENDING         | `schedule`          | `#9E9E9E` (Gray)   | Pending          | En attente       |
| ON_WAITING_ROOM | `person_pin_circle` | `#FF9800` (Orange) | Waiting          | En attente       |
| IN_PROGRESS     | `medical_services`  | `#2196F3` (Blue)   | In Progress      | En cours         |
| COMPLETED       | `check_circle`      | `#4CAF50` (Green)  | Completed        | Terminé          |
| CANCELED        | `cancel`            | `#F44336` (Red)    | Canceled         | Annulé           |

### Status Transitions

The module includes built-in business logic for valid state transitions:

```
PENDING
  ↓ → ON_WAITING_ROOM
  ↓ → IN_PROGRESS
  ↓ → CANCELED

ON_WAITING_ROOM
  ↓ → IN_PROGRESS
  ↓ → CANCELED
  ↓ → PENDING (undo check-in)

IN_PROGRESS
  ↓ → COMPLETED
  ↓ → CANCELED

COMPLETED
  ↓ → IN_PROGRESS (reopen)

CANCELED
  ↓ → PENDING (uncancel)
```

## Usage Examples

### Basic Status Operations

```typescript
import { MedicalServiceStatus, getStatusMetadata, getStatusLabel } from '@doctorus/common';

// Get status metadata
const status = MedicalServiceStatus.IN_PROGRESS;
const metadata = getStatusMetadata(status);

console.log(metadata);
// {
//   icon: 'medical_services',
//   color: '#2196F3',
//   label: {
//     short: { 'us-EN': 'In Progress', 'fr-FR': 'En cours' },
//     long: { 'us-EN': 'Service In Progress', 'fr-FR': 'Service en cours' }
//   },
//   description: {
//     'us-EN': 'The medical service consultation is currently in progress',
//     'fr-FR': 'La consultation du service médical est actuellement en cours'
//   }
// }
```

### Getting Status Labels

```typescript
import { MedicalServiceStatus, getStatusLabel } from '@doctorus/common';

const status = MedicalServiceStatus.COMPLETED;

// Short label in English (default)
const label = getStatusLabel(status);
console.log(label); // "Completed"

// Short label in French
const labelFr = getStatusLabel(status, 'fr-FR');
console.log(labelFr); // "Terminé"

// Long label in English
const longLabel = getStatusLabel(status, 'us-EN', 'long');
console.log(longLabel); // "Service Completed"

// Long label in French
const longLabelFr = getStatusLabel(status, 'fr-FR', 'long');
console.log(longLabelFr); // "Service terminé"
```

### Getting Icons and Colors

```typescript
import { MedicalServiceStatus, getStatusIcon, getStatusColor } from '@doctorus/common';

const status = MedicalServiceStatus.ON_WAITING_ROOM;

const icon = getStatusIcon(status);
console.log(icon); // "person_pin_circle"

const color = getStatusColor(status);
console.log(color); // "#FF9800"

// Use in UI
<mat-icon [style.color]="getStatusColor(status)">
  {{ getStatusIcon(status) }}
</mat-icon>
```

### Status Descriptions

```typescript
import { MedicalServiceStatus, getStatusDescription } from '@doctorus/common';

const status = MedicalServiceStatus.PENDING;

// English description
const desc = getStatusDescription(status);
console.log(desc);
// "The medical service is scheduled and waiting to begin"

// French description
const descFr = getStatusDescription(status, 'fr-FR');
console.log(descFr);
// "Le service médical est planifié et en attente de démarrage"
```

### Status Validation

```typescript
import { MedicalServiceStatus, isValidMedicalServiceStatus, getAllMedicalServiceStatuses } from '@doctorus/common';

// Validate status string
const userInput = 'pending';
if (isValidMedicalServiceStatus(userInput)) {
  const status = userInput as MedicalServiceStatus;
  // Safe to use as MedicalServiceStatus
}

// Get all available statuses
const allStatuses = getAllMedicalServiceStatuses();
console.log(allStatuses);
// [
//   MedicalServiceStatus.PENDING,
//   MedicalServiceStatus.ON_WAITING_ROOM,
//   MedicalServiceStatus.IN_PROGRESS,
//   MedicalServiceStatus.COMPLETED,
//   MedicalServiceStatus.CANCELED
// ]
```

### Status Transitions

```typescript
import { MedicalServiceStatus, isValidTransition, getAllowedTransitions } from '@doctorus/common';

// Check if transition is allowed
const currentStatus = MedicalServiceStatus.PENDING;
const newStatus = MedicalServiceStatus.ON_WAITING_ROOM;

if (isValidTransition(currentStatus, newStatus)) {
  // Transition is valid, proceed with update
  console.log('Transition allowed');
} else {
  console.log('Invalid transition');
}

// Get all allowed next states
const allowedStates = getAllowedTransitions(currentStatus);
console.log(allowedStates);
// [
//   MedicalServiceStatus.ON_WAITING_ROOM,
//   MedicalServiceStatus.IN_PROGRESS,
//   MedicalServiceStatus.CANCELED
// ]
```

## UI Integration Examples

### Status Badge Component (React/Angular)

```typescript
import { MedicalServiceStatus, getStatusLabel, getStatusColor } from '@doctorus/common';

function StatusBadge({ status, locale = 'us-EN' }: { status: MedicalServiceStatus; locale?: 'us-EN' | 'fr-FR' }) {
  const label = getStatusLabel(status, locale);
  const color = getStatusColor(status);

  return (
    <span style={{
      backgroundColor: color,
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px'
    }}>
      {label}
    </span>
  );
}
```

### Status Icon with Tooltip

```typescript
import { MedicalServiceStatus, getStatusIcon, getStatusColor, getStatusDescription } from '@doctorus/common';

function StatusIcon({ status, locale = 'us-EN' }: { status: MedicalServiceStatus; locale?: 'us-EN' | 'fr-FR' }) {
  const icon = getStatusIcon(status);
  const color = getStatusColor(status);
  const description = getStatusDescription(status, locale);

  return (
    <mat-icon
      [style.color]="color"
      [matTooltip]="description"
    >
      {icon}
    </mat-icon>
  );
}
```

### Status Dropdown/Select

```typescript
import { getAllMedicalServiceStatuses, getStatusLabel } from '@doctorus/common';

function StatusSelect({ locale = 'us-EN', onChange }: { locale?: 'us-EN' | 'fr-FR'; onChange: (status: MedicalServiceStatus) => void }) {
  const statuses = getAllMedicalServiceStatuses();

  return (
    <select onChange={(e) => onChange(e.target.value as MedicalServiceStatus)}>
      {statuses.map(status => (
        <option key={status} value={status}>
          {getStatusLabel(status, locale)}
        </option>
      ))}
    </select>
  );
}
```

### Status Stepper/Timeline

```typescript
import { MedicalServiceStatus, getStatusLabel, getStatusIcon, getAllowedTransitions } from '@doctorus/common';

function StatusStepper({ currentStatus, locale = 'us-EN' }: { currentStatus: MedicalServiceStatus; locale?: 'us-EN' | 'fr-FR' }) {
  const nextStates = getAllowedTransitions(currentStatus);

  return (
    <div className="status-stepper">
      <div className="current">
        <mat-icon>{getStatusIcon(currentStatus)}</mat-icon>
        <span>{getStatusLabel(currentStatus, locale, 'long')}</span>
      </div>

      <div className="next-states">
        {nextStates.map(nextStatus => (
          <button key={nextStatus} onClick={() => handleTransition(nextStatus)}>
            <mat-icon>{getStatusIcon(nextStatus)}</mat-icon>
            {getStatusLabel(nextStatus, locale)}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Common Patterns

### Status Change with Validation

```typescript
import { MedicalServiceStatus, isValidTransition } from '@doctorus/common';

async function updateMedicalServiceStatus(
  serviceId: string,
  newStatus: MedicalServiceStatus,
  currentStatus: MedicalServiceStatus,
) {
  // Validate transition
  if (!isValidTransition(currentStatus, newStatus)) {
    throw new Error(`Cannot transition from ${currentStatus} to ${newStatus}`);
  }

  // Proceed with update
  await api.updateStatus(serviceId, newStatus);
}
```

### Status History Logging

```typescript
import { MedicalServiceStatus, getStatusLabel } from '@doctorus/common';

interface StatusChange {
  from: MedicalServiceStatus;
  to: MedicalServiceStatus;
  timestamp: Date;
  userId: string;
}

function logStatusChange(change: StatusChange, locale: 'us-EN' | 'fr-FR' = 'us-EN') {
  const fromLabel = getStatusLabel(change.from, locale);
  const toLabel = getStatusLabel(change.to, locale);

  console.log(`Status changed from "${fromLabel}" to "${toLabel}" by user ${change.userId}`);
}
```

### Conditional UI Rendering

```typescript
import { MedicalServiceStatus } from '@doctorus/common';

function renderActionsForStatus(status: MedicalServiceStatus) {
  switch (status) {
    case MedicalServiceStatus.PENDING:
      return <CheckInButton />;

    case MedicalServiceStatus.ON_WAITING_ROOM:
      return <StartServiceButton />;

    case MedicalServiceStatus.IN_PROGRESS:
      return <CompleteServiceButton />;

    case MedicalServiceStatus.COMPLETED:
      return <ReopenButton />;

    case MedicalServiceStatus.CANCELED:
      return <UncancelButton />;

    default:
      return null;
  }
}
```

## Extending the Pattern

This status pattern is designed for reuse across other entities. To add a new status type:

1. **Create new enum** (e.g., `AppointmentStatus`, `PaymentStatus`)
2. **Define metadata** with icons, colors, and translations
3. **Add transition rules** if needed
4. **Implement utility functions** following the same pattern
5. **Export from** `src/status/index.ts`

### Example: Adding Appointment Status

```typescript
// src/status/appointment-status.ts
import type { Locale } from '../operations/labels';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  ARRIVED = 'arrived',
  NO_SHOW = 'no_show',
}

export interface StatusMetadata {
  icon: string;
  color: string;
  label: { short: Record<Locale, string>; long: Record<Locale, string> };
  description: Record<Locale, string>;
}

export const APPOINTMENT_STATUS_METADATA: Record<AppointmentStatus, StatusMetadata> = {
  // ... define metadata
};

// ... implement utility functions
```

## API Reference

### Enums

- `MedicalServiceStatus` - Status enum with 5 values

### Types

- `StatusMetadata` - Interface for status metadata
- `Locale` - Type alias for supported locales ('us-EN' | 'fr-FR')

### Functions

- `getStatusMetadata(status)` - Get complete metadata object
- `getStatusIcon(status)` - Get Material icon name
- `getStatusColor(status)` - Get hex color
- `getStatusLabel(status, locale?, format?)` - Get translated label
- `getStatusDescription(status, locale?)` - Get translated description
- `getAllMedicalServiceStatuses()` - Get array of all statuses
- `isValidMedicalServiceStatus(value)` - Type guard for validation
- `isValidTransition(from, to)` - Check if transition is allowed
- `getAllowedTransitions(status)` - Get array of valid next states

### Constants

- `MEDICAL_SERVICE_STATUS_METADATA` - Complete metadata for all statuses
- `MEDICAL_SERVICE_STATUS_TRANSITIONS` - Transition rules matrix

## Testing

The status module has 100% test coverage with 27 comprehensive tests. See `test/status.test.ts` for examples.

## Best Practices

1. **Always validate transitions** before updating status
2. **Use utility functions** instead of accessing metadata directly
3. **Provide locale context** for all user-facing labels
4. **Use type guards** (`isValidMedicalServiceStatus`) for runtime validation
5. **Display descriptions** in tooltips or help text for clarity
6. **Use color consistently** across your UI for better UX
7. **Test transition logic** thoroughly in your application
