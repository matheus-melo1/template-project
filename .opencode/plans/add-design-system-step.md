# Plan: Add Design System Selection Step (Step 5)

## Goal
Add a new step (step 5) for selecting a design system based on border radius. Cards similar to `ArchCard` with visual previews of each rounding style.

## Current State Analysis
- `DesignSystem.enum.ts` already exists with 4 values: `ROUNDED_NONE`, `ROUNDED_LIGHT`, `ROUNDED_MEDIUM`, `ROUNDED_HIGH`
- `ProjectSpecSchema` already has `design_system` field
- ArchCard pattern: large card with tabs (diagram/structure) + title + description
- Need to adapt this pattern for design system previews

## Files to Create

### 1. `src/steps/arch/design-system-options.tsx` (NEW)
Following the exact pattern of `package-by-feature.tsx`:
- 4 exports: `roundedNone`, `roundedLight`, `roundedMedium`, `roundedHigh`
- Each has: `title`, `description`, `preview` (ReactNode showing UI elements with that border radius)
- Preview: SVG or React components showing buttons, cards, inputs with the specific border radius

### 2. `src/components/DesignSystemCard.tsx` (NEW)
Similar to `ArchCard` but adapted for design system previews:
- Large card with visual preview area (showing UI mockup with the border radius)
- Title and description below
- Clickable with hover effects
- Shows actual component previews (button, card, input) with the specific radius

### 3. `src/steps/StepDesignSystem.tsx` (NEW)
Renders 4 `DesignSystemCard` components side by side (or in a grid)
- Follows same pattern as `StepArch.tsx`
- Uses a hook or direct state to select the design system

## Files to Modify

### 4. `src/steps/Steps.tsx`
Add step 5 for React:
```ts
[Stack.REACT]: {
  1: StepSelectStack,
  2: StepFramework,
  3: StepComponentLibrary,
  4: StepArch,
  5: StepDesignSystem,  // NEW
},
```

### 5. `src/App.tsx`
Add step title:
```ts
const stepTitles: Record<number, string> = {
  2: "Select a framework",
  3: "Select a component library",
  4: "Select a architecture",
  5: "Select a design system",  // NEW
};
```

## Design System Options

| Option | Radius | Preview Style |
|---|---|---|
| **Sharp** | 0px | Angular, brutalist aesthetic |
| **Light** | 4-6px | Subtle, professional |
| **Medium** | 8-12px | Balanced, modern |
| **High** | 16-24px | Playful, friendly |

## Preview Content (per card)
Each card shows a mini UI mockup with:
- A card/container with the border radius
- A button with the border radius
- An input field with the border radius
- The actual radius value displayed

## Implementation Order
1. Create `design-system-options.tsx` with 4 design system configs + SVG previews
2. Create `DesignSystemCard.tsx` component
3. Create `StepDesignSystem.tsx` step component
4. Register step 5 in `Steps.tsx`
5. Add title in `App.tsx`
