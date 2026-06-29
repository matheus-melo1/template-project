# Plan: Add 2 New Frontend Architectures to Arch Step

## Goal
Add **Feature-Sliced Design (FSD)** and **Clean Architecture (Ports & Adapters)** as two new architecture options in the Arch step, following the existing project pattern.

## Files to Modify

### 1. `src/steps/arch/package-by-feature.tsx`
Add two new exports following the exact pattern of `packageByFeature`:

#### A. `featureSlicedDesign` (FSD)
- **treeData**: `src/` → `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`
  - Each slice contains segments: `ui/`, `model/`, `api/`, `lib/`, `config/`
  - Public API via `index.ts`
- **FSDDiagram**: SVG showing 6 stacked horizontal layers with unidirectional arrows (top→bottom)
  - Legend: "A slice can only import from lower layers"
- **description**: Explains FSD methodology, 6 layers, golden rule of imports, segments

#### B. `cleanArchitecture` (Clean Architecture / Ports & Adapters)
- **treeData**: `src/` → `domain/`, `application/`, `adapters/`, `infrastructure/`, `presentation/`
  - Domain: entities, value objects, interface contracts
  - Application: UseCase classes
  - Adapters: HTTP client, storage implementations
  - Infrastructure: config, env
  - Presentation: UI (atoms/molecules/pages), hooks, App.tsx
- **CleanArchDiagram**: SVG showing 5 concentric circles with dependency arrows pointing inward
  - Legend: "Dependencies point inward — outer layers depend on inner"
- **description**: Explains concentric layers, dependency rule, testability benefits, framework independence

### 2. `src/steps/StepArch.tsx`
Change from 3 identical cards to 3 different architectures:
```tsx
// Before (broken):
<ArchCard {...packageByFeature} />
<ArchCard {...packageByFeature} />
<ArchCard {...packageByFeature} />

// After (fixed):
<ArchCard {...packageByFeature} />
<ArchCard {...featureSlicedDesign} />
<ArchCard {...cleanArchitecture} />
```

## Implementation Order
1. Add FSD treeData + FSDDiagram + export to `package-by-feature.tsx`
2. Add Clean Architecture treeData + CleanArchDiagram + export to `package-by-feature.tsx`
3. Update `StepArch.tsx` to import and use all 3 architectures

## Pattern Compliance
- Same `TreeNodeData` type for tree structures
- Same SVG helper function pattern (`box`, `conn` → `layer`, `ring`)
- Same `viewBox="0 0 340 400"` for diagrams
- Same `ArchCardProps` interface
- Same CSS classes and styling conventions
