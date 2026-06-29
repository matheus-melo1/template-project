# Plan: Add Component Library Selection Step (Step 4)

## Goal
Add a new step (step 4) for selecting a component library. Options: **shadcn** (enabled) and **Material UI** (disabled with "Coming Soon" badge).

## Current State Analysis
- Steps are driven by `Steps.tsx` which maps `stack → step number → component`
- Currently React has 3 steps: SelectStack → Framework → Arch
- The schema already has `component_design` and `design_system` fields
- Selection UI pattern follows `StepFramework.tsx`: clickable cards with icons

## Files to Modify

### 1. `src/steps/StepComponentLibrary.tsx` (NEW)
New component following the same pattern as `StepFramework.tsx`:
- Display 2 cards: shadcn and Material UI
- shadcn: clickable, sets `component_design` in form
- Material UI: disabled, opacity reduced, "Coming Soon" badge
- Uses `cn()` for conditional styling (disabled state)
- Badge component inline (simple span with pill styling)

### 2. `src/steps/Steps.tsx`
Add StepComponentLibrary to React stack at step 4:
```ts
[Stack.REACT]: {
  1: StepSelectStack,
  2: StepFramework,
  3: StepArch,
  4: StepComponentLibrary,  // NEW
},
```

### 3. `src/App.tsx`
Add step title for step 4:
```ts
const stepTitles: Record<number, string> = {
  2: "Select a framework",
  3: "Select a architecture",
  4: "Select a component library",  // NEW
};
```

### 4. `src/types/enum/ComponentDesign.enum.ts`
Add Material UI enum value:
```ts
export enum ComponentDesign {
  SHADCN_REACT = "SHADCN_REACT",
  SHADCN_VUE = "SHADCN_VUE",
  MUI = "MUI",  // NEW
}
```

### 5. `src/hooks/useStepComponentLibrary.ts` (NEW)
Hook following the pattern of `useStepFramework.ts`:
- Returns list of component libraries with metadata (id, name, logo, disabled flag)
- `onChangeComponentLibrary` function to update form
- Watches `component_design` from form context

## Implementation Details

### StepComponentLibrary UI
- Same card layout as StepFramework (centered, clickable cards)
- shadcn card: `SiShadcnui` from react-icons (or similar), enabled
- MUI card: `SiMaterialdesign` from react-icons, disabled + badge
- Badge: `<span className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full">Coming Soon</span>`
- Disabled card: `opacity-50 pointer-events-none cursor-not-allowed`

### Icon choices
- shadcn: No official react-icons entry available — will use a simple text/icon alternative or Lucide's `Blocks` icon
- MUI: `SiMaterialdesign` from react-icons/si

## Implementation Order
1. Add `MUI` to `ComponentDesign` enum
2. Create `useStepComponentLibrary` hook
3. Create `StepComponentLibrary` component
4. Register step 4 in `Steps.tsx`
5. Add title in `App.tsx`
