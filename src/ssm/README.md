# SSM (Secure String Manager) Module

## Overview

The SSM module provides utilities for managing AWS Systems Manager Parameter Store keys and values, with type-safe key construction and validation. It's designed for secure configuration management and secrets handling.

## Features

- ✅ **Hierarchical key structure** with namespacing
- ✅ **Type-safe key construction**
- ✅ **Key validation** and parsing
- ✅ **Environment-aware** (development, staging, production)
- ✅ **Utility functions** for common operations
- ✅ **100% test coverage**

## Key Structure

SSM keys follow a hierarchical structure:

```
/{environment}/{application}/{category}/{subcategory}/{name}
```

### Examples:

- `/production/doctorus/database/postgres/connection-string`
- `/staging/doctorus/api/stripe/secret-key`
- `/development/doctorus/email/sendgrid/api-key`

## Core Components

### 1. SSMKey Interface

Represents a complete SSM key with all components:

```typescript
interface SSMKey {
  environment: string; // e.g., 'production', 'staging', 'development'
  application: string; // e.g., 'doctorus'
  category: string; // e.g., 'database', 'api', 'email'
  subcategory?: string; // Optional: e.g., 'postgres', 'stripe'
  name: string; // e.g., 'connection-string', 'api-key'
}
```

### 2. Predefined Key Categories

```typescript
export const SSM_CATEGORIES = {
  DATABASE: 'database',
  API: 'api',
  EMAIL: 'email',
  AUTH: 'auth',
  STORAGE: 'storage',
  CACHE: 'cache',
  QUEUE: 'queue',
  SECRET: 'secret',
  CONFIG: 'config',
} as const;
```

## Usage Examples

### Building SSM Keys

```typescript
import { buildSSMKey, SSM_CATEGORIES } from '@doctorus/common';

// Simple key
const dbKey = buildSSMKey({
  environment: 'production',
  application: 'doctorus',
  category: SSM_CATEGORIES.DATABASE,
  name: 'connection-string',
});
console.log(dbKey); // "/production/doctorus/database/connection-string"

// Key with subcategory
const stripeKey = buildSSMKey({
  environment: 'production',
  application: 'doctorus',
  category: SSM_CATEGORIES.API,
  subcategory: 'stripe',
  name: 'secret-key',
});
console.log(stripeKey); // "/production/doctorus/api/stripe/secret-key"
```

### Parsing SSM Keys

```typescript
import { parseSSMKey } from '@doctorus/common';

// Parse a key string
const keyString = '/production/doctorus/database/postgres/connection-string';
const parsed = parseSSMKey(keyString);

console.log(parsed);
// {
//   environment: 'production',
//   application: 'doctorus',
//   category: 'database',
//   subcategory: 'postgres',
//   name: 'connection-string'
// }

// Parse simple key (without subcategory)
const simpleKey = '/staging/doctorus/email/api-key';
const parsedSimple = parseSSMKey(simpleKey);

console.log(parsedSimple);
// {
//   environment: 'staging',
//   application: 'doctorus',
//   category: 'email',
//   name: 'api-key'
// }
```

### Validating SSM Keys

```typescript
import { isValidSSMKey } from '@doctorus/common';

// Valid keys
console.log(isValidSSMKey('/production/doctorus/database/connection-string')); // true
console.log(isValidSSMKey('/staging/doctorus/api/stripe/secret-key')); // true

// Invalid keys
console.log(isValidSSMKey('production/doctorus/database/key')); // false (no leading slash)
console.log(isValidSSMKey('/prod/app')); // false (too few segments)
console.log(isValidSSMKey('')); // false (empty string)
```

### Getting Key Components

```typescript
import { getSSMKeyEnvironment, getSSMKeyApplication, getSSMKeyCategory, getSSMKeyName } from '@doctorus/common';

const key = '/production/doctorus/database/postgres/connection-string';

console.log(getSSMKeyEnvironment(key)); // 'production'
console.log(getSSMKeyApplication(key)); // 'doctorus'
console.log(getSSMKeyCategory(key)); // 'database'
console.log(getSSMKeyName(key)); // 'connection-string'
```

### Building Key Prefixes

```typescript
import { buildSSMKeyPrefix } from '@doctorus/common';

// Get all keys for an environment
const envPrefix = buildSSMKeyPrefix({
  environment: 'production',
});
console.log(envPrefix); // "/production/"

// Get all keys for an application in an environment
const appPrefix = buildSSMKeyPrefix({
  environment: 'production',
  application: 'doctorus',
});
console.log(appPrefix); // "/production/doctorus/"

// Get all database keys
const dbPrefix = buildSSMKeyPrefix({
  environment: 'production',
  application: 'doctorus',
  category: 'database',
});
console.log(dbPrefix); // "/production/doctorus/database/"

// Get all postgres database keys
const postgresPrefix = buildSSMKeyPrefix({
  environment: 'production',
  application: 'doctorus',
  category: 'database',
  subcategory: 'postgres',
});
console.log(postgresPrefix); // "/production/doctorus/database/postgres/"
```

## Common Use Cases

### 1. Configuration Management

```typescript
import { buildSSMKey, SSM_CATEGORIES } from '@doctorus/common';

class ConfigManager {
  private environment: string;
  private application: string;

  constructor(environment: string, application: string) {
    this.environment = environment;
    this.application = application;
  }

  getConfigKey(category: string, name: string, subcategory?: string): string {
    return buildSSMKey({
      environment: this.environment,
      application: this.application,
      category,
      subcategory,
      name,
    });
  }

  getDatabaseKey(database: string, key: string): string {
    return this.getConfigKey(SSM_CATEGORIES.DATABASE, key, database);
  }

  getAPIKey(service: string, key: string): string {
    return this.getConfigKey(SSM_CATEGORIES.API, key, service);
  }
}

// Usage
const config = new ConfigManager('production', 'doctorus');
const pgKey = config.getDatabaseKey('postgres', 'connection-string');
const stripeKey = config.getAPIKey('stripe', 'secret-key');
```

### 2. AWS SSM Parameter Store Integration

```typescript
import { buildSSMKey, parseSSMKey, SSM_CATEGORIES } from '@doctorus/common';
import { SSMClient, GetParameterCommand, PutParameterCommand } from '@aws-sdk/client-ssm';

class SSMService {
  private client: SSMClient;
  private environment: string;
  private application: string;

  constructor(environment: string, application: string) {
    this.client = new SSMClient({ region: 'us-east-1' });
    this.environment = environment;
    this.application = application;
  }

  async getParameter(category: string, name: string, subcategory?: string): Promise<string | undefined> {
    const key = buildSSMKey({
      environment: this.environment,
      application: this.application,
      category,
      subcategory,
      name,
    });

    try {
      const command = new GetParameterCommand({
        Name: key,
        WithDecryption: true,
      });
      const response = await this.client.send(command);
      return response.Parameter?.Value;
    } catch (error) {
      console.error(`Failed to get parameter ${key}:`, error);
      return undefined;
    }
  }

  async setParameter(
    category: string,
    name: string,
    value: string,
    subcategory?: string,
    isSecret: boolean = false,
  ): Promise<void> {
    const key = buildSSMKey({
      environment: this.environment,
      application: this.application,
      category,
      subcategory,
      name,
    });

    const command = new PutParameterCommand({
      Name: key,
      Value: value,
      Type: isSecret ? 'SecureString' : 'String',
      Overwrite: true,
    });

    await this.client.send(command);
  }
}

// Usage
const ssm = new SSMService('production', 'doctorus');

// Get database connection string
const dbConnection = await ssm.getParameter(SSM_CATEGORIES.DATABASE, 'connection-string', 'postgres');

// Set API key (encrypted)
await ssm.setParameter(SSM_CATEGORIES.API, 'api-key', 'sk_live_...', 'stripe', true);
```

### 3. Environment-Specific Configuration

```typescript
import { buildSSMKey, SSM_CATEGORIES } from '@doctorus/common';

interface AppConfig {
  databaseUrl: string;
  redisUrl: string;
  apiKeys: {
    stripe: string;
    sendgrid: string;
  };
}

async function loadConfig(environment: 'development' | 'staging' | 'production'): Promise<AppConfig> {
  const application = 'doctorus';

  // Build keys for this environment
  const keys = {
    database: buildSSMKey({
      environment,
      application,
      category: SSM_CATEGORIES.DATABASE,
      subcategory: 'postgres',
      name: 'url',
    }),
    redis: buildSSMKey({
      environment,
      application,
      category: SSM_CATEGORIES.CACHE,
      subcategory: 'redis',
      name: 'url',
    }),
    stripeKey: buildSSMKey({
      environment,
      application,
      category: SSM_CATEGORIES.API,
      subcategory: 'stripe',
      name: 'secret-key',
    }),
    sendgridKey: buildSSMKey({
      environment,
      application,
      category: SSM_CATEGORIES.EMAIL,
      subcategory: 'sendgrid',
      name: 'api-key',
    }),
  };

  // Fetch all parameters
  // (implementation depends on your SSM client)
  const config: AppConfig = {
    databaseUrl: await fetchParameter(keys.database),
    redisUrl: await fetchParameter(keys.redis),
    apiKeys: {
      stripe: await fetchParameter(keys.stripeKey),
      sendgrid: await fetchParameter(keys.sendgridKey),
    },
  };

  return config;
}
```

### 4. Key Migration/Validation

```typescript
import { parseSSMKey, buildSSMKey, isValidSSMKey } from '@doctorus/common';

async function migrateKeys(oldEnvironment: string, newEnvironment: string) {
  const oldKeys = await listAllKeys(oldEnvironment); // Your implementation

  for (const oldKey of oldKeys) {
    if (!isValidSSMKey(oldKey)) {
      console.warn(`Skipping invalid key: ${oldKey}`);
      continue;
    }

    const parsed = parseSSMKey(oldKey);

    // Build new key with updated environment
    const newKey = buildSSMKey({
      ...parsed,
      environment: newEnvironment,
    });

    // Copy value to new key
    const value = await getParameter(oldKey);
    await putParameter(newKey, value);

    console.log(`Migrated: ${oldKey} → ${newKey}`);
  }
}
```

### 5. Dynamic Key Generation

```typescript
import { buildSSMKey, SSM_CATEGORIES } from '@doctorus/common';

class SecretsManager {
  private environment: string;
  private application: string;

  constructor(environment: string, application: string) {
    this.environment = environment;
    this.application = application;
  }

  // Generate keys for different secret types
  getDatabaseSecret(database: string, secretName: string): string {
    return buildSSMKey({
      environment: this.environment,
      application: this.application,
      category: SSM_CATEGORIES.DATABASE,
      subcategory: database,
      name: secretName,
    });
  }

  getAPISecret(service: string, secretName: string): string {
    return buildSSMKey({
      environment: this.environment,
      application: this.application,
      category: SSM_CATEGORIES.API,
      subcategory: service,
      name: secretName,
    });
  }

  getAuthSecret(provider: string, secretName: string): string {
    return buildSSMKey({
      environment: this.environment,
      application: this.application,
      category: SSM_CATEGORIES.AUTH,
      subcategory: provider,
      name: secretName,
    });
  }
}

// Usage
const secrets = new SecretsManager('production', 'doctorus');

const keys = {
  postgres: secrets.getDatabaseSecret('postgres', 'password'),
  stripe: secrets.getAPISecret('stripe', 'webhook-secret'),
  oauth: secrets.getAuthSecret('google', 'client-secret'),
};
```

## API Reference

### Constants

- `SSM_CATEGORIES` - Predefined key categories (DATABASE, API, EMAIL, AUTH, STORAGE, CACHE, QUEUE, SECRET, CONFIG)

### Types

- `SSMKey` - Interface for SSM key components
- `SSMKeyPrefix` - Partial SSMKey for building prefixes

### Functions

- `buildSSMKey(key: SSMKey): string` - Build complete SSM key path
- `buildSSMKeyPrefix(prefix: Partial<SSMKey>): string` - Build key prefix for filtering
- `parseSSMKey(keyPath: string): SSMKey` - Parse key path into components
- `isValidSSMKey(keyPath: string): boolean` - Validate key format
- `getSSMKeyEnvironment(keyPath: string): string` - Extract environment
- `getSSMKeyApplication(keyPath: string): string` - Extract application
- `getSSMKeyCategory(keyPath: string): string` - Extract category
- `getSSMKeyName(keyPath: string): string` - Extract name

## Key Naming Conventions

1. **Use lowercase** for all key components
2. **Use hyphens** for multi-word names (kebab-case)
3. **Be descriptive** but concise
4. **Use consistent categories** from SSM_CATEGORIES
5. **Group related keys** using subcategories

### Good Examples:

- `/production/doctorus/database/postgres/connection-string`
- `/staging/doctorus/api/stripe/webhook-secret`
- `/production/doctorus/email/sendgrid/api-key`

### Avoid:

- `/Production/Doctorus/Database/ConnectionString` (wrong case)
- `/production/doctorus/db_conn` (unclear abbreviations)
- `/production/doctorus/key` (too generic)

## Testing

The SSM module has 100% test coverage. See `test/ssm.test.ts` for examples.

## Best Practices

1. **Always validate keys** before using them
2. **Use predefined categories** for consistency
3. **Parse keys** when you need to inspect components
4. **Build prefixes** for batch operations
5. **Separate by environment** to prevent accidents
6. **Use subcategories** for logical grouping
7. **Keep key names descriptive** and meaningful
8. **Use SecureString type** for sensitive data in AWS SSM
