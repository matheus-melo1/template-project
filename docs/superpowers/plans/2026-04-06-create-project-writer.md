# create-project-writer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the wizard into a monorepo CLI tool that generates complete React projects.

**Architecture:** Turborepo monorepo with 3 packages: web (wizard), engine (generation logic), cli (npx entry point). Engine is a pure lib, CLI handles I/O.

**Tech Stack:** TypeScript, Turborepo, pnpm workspaces, tsup, express, Vite

---

### Task 1: Convert to Monorepo Structure

**Files:**
- Create: `packages/web/` (move all existing src/, config, package.json here)
- Create: `turbo.json`
- Modify: root `package.json` (convert to workspace root)
- Create: `pnpm-workspace.yaml`

- [ ] **Step 1: Create pnpm-workspace.yaml**
- [ ] **Step 2: Move existing project into packages/web/**
- [ ] **Step 3: Update root package.json to workspace root**
- [ ] **Step 4: Create turbo.json**
- [ ] **Step 5: Verify packages/web still builds**
- [ ] **Step 6: Commit**

### Task 2: Create Engine Package — Types & Schema

**Files:**
- Create: `packages/engine/package.json`
- Create: `packages/engine/tsconfig.json`
- Create: `packages/engine/tsup.config.ts`
- Create: `packages/engine/src/types/` (move all enums + schema from web)
- Create: `packages/engine/src/index.ts`

- [ ] **Step 1: Scaffold engine package**
- [ ] **Step 2: Move types/enums/schema from web to engine**
- [ ] **Step 3: Update web to import types from @create-project-writer/engine**
- [ ] **Step 4: Export types from engine index**
- [ ] **Step 5: Verify web still builds with engine types**
- [ ] **Step 6: Commit**

### Task 3: Engine — Core Generators (package.json, tsconfig, vite, tailwind, eslint)

**Files:**
- Create: `packages/engine/src/generators/package-json.ts`
- Create: `packages/engine/src/generators/tsconfig.ts`
- Create: `packages/engine/src/generators/vite-config.ts`
- Create: `packages/engine/src/generators/tailwind.ts`
- Create: `packages/engine/src/generators/eslint-config.ts`
- Create: `packages/engine/src/resolver.ts`

- [ ] **Step 1: Create package-json generator**
- [ ] **Step 2: Create tsconfig generator**
- [ ] **Step 3: Create vite-config generator**
- [ ] **Step 4: Create tailwind/CSS generator**
- [ ] **Step 5: Create eslint-config generator**
- [ ] **Step 6: Create resolver that orchestrates generators**
- [ ] **Step 7: Commit**

### Task 4: Engine — App & Home Page Generators

**Files:**
- Create: `packages/engine/src/generators/app.ts`
- Create: `packages/engine/src/generators/home-page.ts`
- Create: `packages/engine/src/generators/layout.ts`
- Create: `packages/engine/src/generators/structure.ts`

- [ ] **Step 1: Create app generator (App.tsx, main.tsx)**
- [ ] **Step 2: Create layout generator (theme provider, root layout)**
- [ ] **Step 3: Create home-page generator (simple components)**
- [ ] **Step 4: Create structure generator (folder scaffolding by architecture)**
- [ ] **Step 5: Commit**

### Task 5: Engine — Optional Generators (state, testing, backend, extras)

**Files:**
- Create: `packages/engine/src/generators/state-management.ts`
- Create: `packages/engine/src/generators/testing.ts`
- Create: `packages/engine/src/generators/backend.ts`
- Create: `packages/engine/src/generators/extras.ts`

- [ ] **Step 1: Create state-management generator**
- [ ] **Step 2: Create testing generator**
- [ ] **Step 3: Create backend generator**
- [ ] **Step 4: Create extras generator (routing, i18n, http, animation)**
- [ ] **Step 5: Wire all optional generators into resolver**
- [ ] **Step 6: Commit**

### Task 6: CLI Package

**Files:**
- Create: `packages/cli/package.json`
- Create: `packages/cli/tsconfig.json`
- Create: `packages/cli/tsup.config.ts`
- Create: `packages/cli/src/cli.ts`
- Create: `packages/cli/src/server.ts`
- Create: `packages/cli/src/writer.ts`

- [ ] **Step 1: Scaffold CLI package**
- [ ] **Step 2: Create writer (writes Map<string,string> to disk)**
- [ ] **Step 3: Create server (serve web dist + POST /generate)**
- [ ] **Step 4: Create CLI entry point (prompts + open browser)**
- [ ] **Step 5: Verify full flow locally**
- [ ] **Step 6: Commit**

### Task 7: Frontend Changes — Connect Generate Button

**Files:**
- Modify: `packages/web/src/steps/StepSummary.tsx`
- Modify: `packages/web/src/hooks/useWizard.ts`
- Modify: `packages/web/src/App.tsx`

- [ ] **Step 1: Add generate handler in useWizard**
- [ ] **Step 2: Update StepSummary with generate button + loading/success states**
- [ ] **Step 3: Update App to handle generate flow on last step**
- [ ] **Step 4: Verify full end-to-end flow**
- [ ] **Step 5: Commit**
