import { github, typescript } from 'projen';
import { NodePackageManager, NpmAccess } from 'projen/lib/javascript';

const readmeContents = `# @doctorus/common

Common TypeScript building blocks shared across the Doctorus platform.

This package centralizes:

- operations and permission primitives
- status enums with metadata and translations
- audit event types
- AWS SSM parameter keys and path helpers

## Installation

\`\`\`bash
pnpm add @doctorus/common
\`\`\`

## Exports

\`\`\`ts
import {
  // Operations
  Action,
  Operation,
  Resource,
  getActionLabel,
  getOperationLabel,

  // Status
  MedicalServiceStatus,
  getStatusLabel,
  getStatusMetadata,

  // Audit
  AuditEvent,

  // SSM
  SSM_PARAM_KEY,
  SSM_PARAM_METADATA,
  getSSMParamDescription,
  buildSSMPath,
} from '@doctorus/common';
\`\`\`

## Modules

### Operations

Defines typed actions, resources, and \`Operation\` pairs used for authorization, labeling, and audit context.

\`\`\`ts
import { Action, Operation, Resource, getOperationLabel } from '@doctorus/common';

const operation = new Operation(Action.CREATE, Resource.PRESCRIPTION);

getOperationLabel(operation, 'us-EN'); // "Create Prescription"
getOperationLabel(operation, 'fr-FR'); // "Créer Ordonnance"
\`\`\`

[Operations documentation](src/operations/README.md)

### Status

Provides reusable status enums and metadata with labels, descriptions, colors, and icons.

\`\`\`ts
import { MedicalServiceStatus, getStatusLabel, getStatusMetadata } from '@doctorus/common';

const status = MedicalServiceStatus.IN_PROGRESS;

getStatusLabel(status, 'us-EN'); // "In Progress"
getStatusMetadata(status).icon; // e.g. "medical_services"
\`\`\`

[Status documentation](src/status/README.md)

### Audit

Contains audit event types shared by services that log user or system activity.

\`\`\`ts
import { AuditEvent, Action, Resource } from '@doctorus/common';

const event: AuditEvent = {
  id: 'evt-123',
  timestamp: new Date(),
  action: Action.CREATE,
  resource: Resource.PATIENT,
  result: 'success',
};
\`\`\`

[Audit documentation](src/audit/README.md)

### SSM

Defines known SSM parameter keys and utilities to build, inspect, and describe parameter paths.

\`\`\`ts
import {
  SSM_PARAM_KEY,
  getSSMParamDescription,
  buildSSMPath,
  extractKeyFromPath,
} from '@doctorus/common';

const key = SSM_PARAM_KEY.DB_PASSWORD;

buildSSMPath('prod', key); // "/prod/db-password"
getSSMParamDescription(key); // "Database password used by application services."
extractKeyFromPath('/prod/db-password'); // SSM_PARAM_KEY.DB_PASSWORD
\`\`\`

[SSM documentation](src/ssm/README.md)

## Internationalization

User-facing labels in this package use the shared locale shape:

- \`'us-EN'\`
- \`'fr-FR'\`

This applies to operations and status metadata APIs.

## Development

- \`pnpm test\` runs Jest and lint checks via Projen
- \`pnpm build\` compiles the library
- \`pnpm projen\` regenerates project files from [.projenrc.ts](.projenrc.ts)

## Notes

- The root \`README.md\` is generated from \`.projenrc.ts\`
- Edit Projen configuration first, then re-run \`pnpm projen\` when documentation changes
`;

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@doctorus/common',
  packageName: '@doctorus/common',
  projenrcTs: true,
  depsUpgrade: true,
  description: 'Common utilities and libraries for the DOCTORUS project',
  deps: [],
  devDeps: ['@types/node', 'prettier', '@types/jest'],
  peerDeps: [],
  // Publishing configuration
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  packageManager: NodePackageManager.PNPM,
  npmTrustedPublishing: true,
  npmProvenance: false, // Disable provenance for private repositories
  eslint: true,
  // Repository settings
  repository: 'git@github.com:DoctorusRepoOwner/common.git',

  // TypeScript settings
  tsconfig: {
    compilerOptions: {
      lib: ['ES2020'],
      target: 'ES2020',
      module: 'CommonJS',
    },
  },

  // Prettier configuration
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      tabWidth: 2,
      semi: true,
      printWidth: 120,
    },
  },
  readme: {
    contents: readmeContents,
  },
  githubOptions: {
    projenCredentials: github.GithubCredentials.fromPersonalAccessToken({
      secret: 'NPM_TOKEN',
    }),
  },

  // VS Code configuration
  vscode: true,
});

// Configure VS Code settings
if (project.vscode) {
  project.vscode.settings.addSettings({
    'editor.formatOnSave': true,
    'eslint.format.enable': true,
    'eslint.useFlatConfig': false,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    '[typescript]': {
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
    '[javascript]': {
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
    '[json]': {
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
    '[markdown]': {
      'editor.formatOnSave': true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
    },
  });

  project.vscode.extensions.addRecommendations('esbenp.prettier-vscode', 'dbaeumer.vscode-eslint');
}

// Add format task for manual use (writes changes)
project.addTask('format', {
  description: 'Format all source files',
  exec: 'prettier --write "src/**/*.ts" "test/**/*.ts" .projenrc.ts',
});

// Add format check task that only verifies formatting (no modifications)
const formatCheckTask = project.addTask('format:check', {
  description: 'Check if all source files are formatted',
  exec: 'prettier --check "src/**/*.ts" "test/**/*.ts" .projenrc.ts',
});

// Only check formatting during compile (avoid write operations in build to keep git diff clean)
project.compileTask.prependSpawn(formatCheckTask);

// Add an eslint:check task that runs eslint without --fix to keep release read-only
// and avoid git diffs caused by auto-fixes during CI release.
const eslintCheckTask = project.addTask('eslint:check', {
  description: 'Run eslint without fixing (CI-safe)',
  env: {
    ESLINT_USE_FLAT_CONFIG: 'false',
    NODE_NO_WARNINGS: '1',
  },
  exec: 'eslint --ext .ts,.tsx --no-error-on-unmatched-pattern src test .projenrc.ts',
});

// Reset default test task to use jest then eslint:check (rather than eslint --fix)
project.testTask.reset();
project.testTask.exec('jest --passWithNoTests --updateSnapshot');
project.testTask.spawn(eslintCheckTask);

// Add lint-staged and husky for pre-commit formatting
project.addDevDeps('lint-staged', 'husky');
project.package.addField('lint-staged', {
  '**/*.{ts,tsx,js,jsx,json,md}': ['prettier --write'],
});
project.package.addField('husky', {
  hooks: {
    'pre-commit': 'lint-staged',
  },
});

project.synth();
