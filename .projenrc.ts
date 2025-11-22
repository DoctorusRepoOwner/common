import { typescript } from 'projen';
import { NodePackageManager, NpmAccess } from 'projen/lib/javascript';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@doctorus/common',
  packageName: '@doctorus/common',
  projenrcTs: true,
  depsUpgrade: true,
  description: 'Common utilities and libraries for the SMC project',
  deps: [],
  devDeps: ['@types/node', 'prettier'],
  peerDeps: [],
  // Publishing configuration
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  packageManager: NodePackageManager.PNPM,
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
    },
  },

  // VS Code configuration
  vscode: true,
});

// Configure VS Code settings
if (project.vscode) {
  project.vscode.settings.addSettings({
    'editor.formatOnSave': true,
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

  project.vscode.extensions.addRecommendations(
    'esbenp.prettier-vscode',
    'dbaeumer.vscode-eslint',
  );
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
