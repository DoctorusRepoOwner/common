import { typescript } from "projen";
import {
  NodePackageManager,
  NpmAccess,
  TrailingComma,
} from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@doctorus/common",
  description: "Common TypeScript utilities for Doctorus",
  repository: "git@github.com:DoctorusRepoOwner/common.git",
  packageManager: NodePackageManager.PNPM,
  projenrcTs: true, // Add this line to enable TypeScript config
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      tabWidth: 2,
      semi: true,
      singleQuote: false,
      trailingComma: TrailingComma.ALL,
    },
  },
  jest: true,

  // Build & Release
  release: true,
  releaseTrigger: ReleaseTrigger.continuous(), // release on every push to main
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC, // <-- public package
  npmProvenance: true,

  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "CommonJS",
      declaration: true,
      outDir: "lib",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    include: ["src/**/*.ts"],
  },
});

project.addFields({
  publishConfig: { access: "public" }, // ensure scoped package is public
  exports: { ".": { types: "./lib/index.d.ts", require: "./lib/index.js" } },
});

// Add format script for convenience
project.addTask("format", {
  description: "Format code with prettier",
  exec: 'prettier --write "src/**/*.ts" "test/**/*.ts" ".projenrc.ts"',
});

// Add husky for git hooks
project.addDevDeps("husky@^9", "lint-staged@^15");

// Add lint-staged configuration
project.addFields({
  "lint-staged": {
    "*.ts": ["prettier --write"],
  },
});

// Add prepare script for husky
project.packageTask.exec("husky || true");

project.synth();
