# create-project-writer — Design Spec

## Overview

Transform the existing wizard frontend into a full CLI tool (`npx create-project-writer`) that generates complete frontend projects based on user selections.

**Flow:** User runs the CLI in terminal → wizard opens in browser → user fills 10 steps → clicks Generate → project is scaffolded on disk.

## Monorepo Structure

Turborepo with 3 packages:

```
create-project-writer/
├── turbo.json
├── package.json                (root — pnpm workspaces + turborepo)
├── packages/
│   ├── web/                    (wizard frontend — existing code)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── engine/                 (project generation — pure lib, no I/O)
│   │   ├── src/
│   │   │   ├── generators/     (functions that generate each file)
│   │   │   ├── resolver.ts     (orchestrates which generators to run)
│   │   │   └── index.ts
│   │   └── package.json
│   └── cli/                    (npx entry point)
│       ├── src/
│       │   ├── cli.ts          (parse args, prompt project name)
│       │   ├── server.ts       (serve web build + POST /generate endpoint)
│       │   └── writer.ts       (write files to disk)
│       ├── package.json        (bin: "create-project-writer")
│       └── tsup.config.ts
```

### Shared Types

`ProjectSpecType` and all enums live in the **engine** package (`engine/src/types/`), exported from its public API. Both **web** and **cli** import types from `@create-project-writer/engine`. This avoids a 4th package while keeping a single source of truth for the spec shape.

### Why 3 packages

- **engine** is a pure library with no I/O — receives `ProjectSpecType`, returns `Map<string, string>` (filepath → content). Easy to test in isolation.
- **cli** handles I/O — serves the frontend, receives the spec via HTTP, uses the engine to generate, writes files to disk.
- **web** stays as-is with minimal changes (POST on Generate, success screen).

## Execution Flow

```
User runs: npx create-project-writer
    │
    ▼
CLI prompts: "Project name?" (via `prompts` in terminal)
    │
    ▼
CLI serves the static web build on a local port (e.g. 3456)
+ opens the browser automatically (via `open` package)
    │
    ▼
User fills the wizard in the browser (10 steps)
    │
    ▼
Clicks "Generate" → POST /generate with ProjectSpecType as JSON
    │
    ▼
CLI receives spec → passes to engine
    │
    ▼
Engine resolves which generators to run based on spec
Returns Map<string, string> (filepath → content)
    │
    ▼
CLI writes files to ./<project-name>/
    │
    ▼
CLI runs `npm install` in the generated directory
    │
    ▼
CLI shuts down the server, prints instructions:
    "cd <project-name> && npm run dev"
```

- Frontend shows loading/progress during generation
- On error, CLI returns 500 and frontend displays the message
- After success, frontend shows "Done!" screen, CLI kills the server

## Engine Design

### Interface

```ts
export function generateProject(spec: ProjectSpecType): Map<string, string>
```

Receives the full spec, returns a map of relative file paths to file contents.

### Generator Organization

Each generator is a pure function: receives spec, returns `Map<string, string>`.

```
engine/src/generators/
├── package-json.ts       → package.json (dynamic deps based on choices)
├── tsconfig.ts           → tsconfig.json / tsconfig.app.json
├── vite-config.ts        → vite.config.ts
├── eslint-config.ts      → eslint.config.js
├── tailwind.ts           → globals.css with tailwind imports
├── app.ts                → App.tsx (entry with router or not)
├── home-page.ts          → Home page with example components
├── layout.ts             → base layout (theme provider, etc.)
├── structure.ts          → folder structure for chosen architecture
├── state-management.ts   → zustand/redux/jotai setup (if selected)
├── testing.ts            → vitest.config.ts, setup files, example test
├── backend.ts            → supabase/firebase/etc client (if selected)
└── extras.ts             → routing, i18n, http client configs
```

### Resolver

The resolver orchestrates which generators to run:

```ts
export function resolveGenerators(spec: ProjectSpecType): Map<string, string> {
  const files = new Map<string, string>();

  // Always run
  merge(files, generatePackageJson(spec));
  merge(files, generateTsConfig(spec));
  merge(files, generateViteConfig(spec));
  merge(files, generateApp(spec));
  merge(files, generateHomePage(spec));
  merge(files, generateStructure(spec));

  // Conditional
  if (spec.client_state?.length || spec.server_state?.length) {
    merge(files, generateStateManagement(spec));
  }
  if (spec.testing_unit?.length || spec.testing_e2e?.length) {
    merge(files, generateTesting(spec));
  }
  if (spec.backend) {
    merge(files, generateBackend(spec));
  }
  // ...
  return files;
}
```

### Template Approach

Programmatic — TypeScript functions using template literals and conditional logic. No external template engine. Type-safe via `ProjectSpecType`.

## CLI Package

### Entry Point

```ts
#!/usr/bin/env node
import prompts from "prompts";
import { startServer } from "./server.js";
import open from "open";

const { projectName } = await prompts({
  type: "text",
  name: "projectName",
  message: "Project name:",
  initial: "my-app",
});

const { port, waitForGeneration } = await startServer(projectName);
await open(`http://localhost:${port}`);
await waitForGeneration();

console.log(`\n  Project created at ./${projectName}`);
console.log(`  cd ${projectName} && npm run dev\n`);
process.exit(0);
```

### Server

- Serves the static build of `packages/web` (dist embedded in CLI package)
- Exposes `POST /generate` — receives JSON, runs engine, writes to disk
- Returns success/error to frontend

### Build and Distribution

- `tsup` bundles the CLI into ESM
- Web build is copied into the CLI package at build time (served as static assets)
- Published to npm as `create-project-writer`
- `package.json`:
  ```json
  {
    "name": "create-project-writer",
    "bin": { "create-project-writer": "./dist/cli.js" },
    "files": ["dist", "web-dist"]
  }
  ```

### Turborepo Pipeline

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

Build order: engine → web → cli (resolved by dependency graph).

## Frontend Changes (web)

Minimal changes to the existing wizard:

1. **StepSummary** — "Generate" button does `POST /generate` with form values as JSON body
2. **Success screen** — After generation, show "Project created! You can close this tab. Check your terminal for next steps."
3. **useWizard** — When `isLastStep`, the button calls `handleGenerate` instead of `incrementStep`

## Generated Project Output

The generated project includes:
- Complete `package.json` with all selected dependencies
- TypeScript and Vite configs
- Tailwind CSS setup
- Folder structure matching the selected architecture
- A Home page with simple example components using the selected component library
- State management setup (if selected)
- Testing config and an example test (if selected)
- Backend client setup (if selected)
- Routing, i18n, HTTP client configs (if selected from extras)

## Scope

**Initial scope:** React stack only (Vite + Next.js frameworks). Vue and Angular to be expanded later.

## Key Dependencies

- **CLI:** `prompts`, `open`, `express` (or `sirv`), `tsup`
- **Engine:** only `ProjectSpecType` from shared types — no external deps
- **Monorepo:** `turbo`, `pnpm` workspaces
