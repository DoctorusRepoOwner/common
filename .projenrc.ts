import { typescript, JsonFile } from "projen";
import {
  NodePackageManager,
  NpmAccess,
  TrailingComma,
  TypeScriptModuleResolution,
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
  // Ensure dev config (used by ts-node/jest/projen) runs in CJS for compatibility
  tsconfigDev: {
    compilerOptions: {
      module: "CommonJS",
      moduleResolution: TypeScriptModuleResolution.NODE,
      target: "ES2022",
      resolveJsonModule: true,
      outDir: "lib",
    },
  },
});

// Configure package for dual CJS + ESM consumers
project.package.addField("publishConfig", { access: "public" });
project.package.addField("exports", {
  ".": {
    types: "./lib/index.d.ts",
    require: "./lib/index.js",
    import: "./esm/index.js",
  },
});
project.package.addField("module", "./esm/index.js");

// Add format script for convenience
project.addTask("format", {
  description: "Format code with prettier",
  exec: 'prettier --write "src/**/*.ts" "test/**/*.ts" ".projenrc.ts"',
});

// Add husky for git hooks
project.addDevDeps("husky@^9", "lint-staged@^15");

// Add lint-staged configuration
project.package.addField("lint-staged", {
  "*.ts": ["prettier --write"],
});

// Add prepare script for husky
project.packageTask.exec("husky || true");

// Keep Jest default (CommonJS) for local tests; consumers can use ESM via exports.import

// Generate ESM tsconfig and build task
new JsonFile(project, "tsconfig.esm.json", {
  obj: {
    $schema: "https://json.schemastore.org/tsconfig",
    extends: "./tsconfig.dev.json",
    compilerOptions: {
      module: "ES2022",
      moduleResolution: "node",
      outDir: "esm",
      declaration: false,
      emitDeclarationOnly: false,
      target: "ES2022",
      esModuleInterop: true,
      skipLibCheck: true,
    },
    include: ["src/**/*.ts"],
  },
});

// Run ESM compilation after main compile
project.postCompileTask.exec("tsc -p tsconfig.esm.json");

project.synth();
