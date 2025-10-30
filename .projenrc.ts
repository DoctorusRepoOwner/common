import { typescript } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";
import { ReleaseTrigger } from "projen/lib/release";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@doctorus/utils",
  description: "Common TypeScript utilities for Doctorus",
  repository: "git@github.com:DoctorusRepoOwner/doctorus-common.git",
  packageManager: NodePackageManager.PNPM,
  projenrcTs: true, // Add this line to enable TypeScript config
  eslint: true,
  prettier: true,
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

project.synth();
