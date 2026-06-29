# Plan: Add State Management Selection Step (Step 6)

## Goal
Add a new step (step 6) for selecting state management libraries with **multi-selection grouped by categories**. Users can combine libraries (e.g., TanStack Query + Zustand).

## Current State Analysis
- Steps are driven by `Steps.tsx` with `stack → step number → component` mapping
- React currently has 5 steps: SelectStack → Framework → ComponentLibrary → DesignSystem → Arch
- Schema has single-value fields, needs array fields for multi-select
- `SelectableCardGroup` exists for single-select — need multi-select variant

## Files to Create

### 1. `src/types/enum/ServerState.enum.ts` (NEW)
```ts
export enum ServerState {
  TANSTACK_QUERY = "TANSTACK_QUERY",
  SWR = "SWR",
}
```

### 2. `src/types/enum/ClientState.enum.ts` (NEW)
```ts
export enum ClientState {
  ZUSTAND = "ZUSTAND",
  REDUX_TOOLKIT = "REDUX_TOOLKIT",
  JOTAI = "JOTAI",
  VALTIO = "VALTIO",
}
```

### 3. `src/components/MultiSelectCardGroup.tsx` (NEW)
Multi-select component with category grouping:
- Accepts `categories: { label: string; items: MultiSelectCardItem[] }[]`
- Each item: `{ id: string; name: string; icon: IconType | ReactNode; disabled?: boolean }`
- Shows check badge on selected items (same visual as SelectableCardGroup)
- Category labels as section headers
- Allows toggling selection on/off
- Uses same card styling as SelectableCardGroup (w-44 h-40, rounded-2xl, etc.)

### 4. `src/steps/arch/state-management-options.tsx` (NEW)
Defines all state management options grouped by category:
- **Server State**: TanStack Query (SiReactquery), SWR
- **Client State**: Zustand, Redux Toolkit (SiRedux), Jotai, Valtio
- Each entry: `{ id: ServerState | ClientState; name: string; icon: IconType; description: string }`
- Description shown on hover or below card name

### 5. `src/hooks/useStepStateManagement.ts` (NEW)
Hook for managing multi-select state:
- Watches `server_state` and `client_state` arrays from form
- `toggleServerState(id)` — add/remove from array
- `toggleClientState(id)` — add/remove from array
- Returns categorized data for the UI

### 6. `src/steps/StepStateManagement.tsx` (NEW)
Renders `MultiSelectCardGroup` with all categories.

## Files to Modify

### 7. `src/types/schema/ProjectSpec.schema.ts`
Add array fields:
```ts
server_state: z.array(z.nativeEnum(ServerState)).default([]),
client_state: z.array(z.nativeEnum(ClientState)).default([]),
```

### 8. `src/steps/Steps.tsx`
Add step 6 for React:
```ts
[Stack.REACT]: {
  1: StepSelectStack,
  2: StepFramework,
  3: StepComponentLibrary,
  4: StepDesignSystem,
  5: StepArch,
  6: StepStateManagement,
},
```

### 9. `src/App.tsx`
Add step title:
```ts
6: "Select state management",
```

## UI Layout
```
┌──────────────────────────────────────────────────┐
│  Select state management                         │
├──────────────────────────────────────────────────┤
│                                                  │
│  SERVER STATE                                    │
│  ┌────────────┐  ┌────────────┐                  │
│  │ ✓ TanStack  │  │    SWR     │                  │
│  │   Query     │  │            │                  │
│  └────────────┘  └────────────┘                  │
│                                                  │
│  CLIENT STATE                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ ✓ Zustand   │  │   Redux    │  │   Jotai    │  │
│  └────────────┘  └────────────┘  └────────────┘  │
│  ┌────────────┐  ┌────────────┐                  │
│  │   Valtio    │  │            │                  │
│  └────────────┘                                  │
│                                                  │
│  [Back]                    [Next]                │
└──────────────────────────────────────────────────┘
```

## Icon Choices
| Library | Icon Source |
|---|---|
| TanStack Query | `SiReactquery` from react-icons/si |
| SWR | `SiReact` from react-icons/si (closest match) |
| Zustand | `SiZustand` from react-icons/si (verify availability) |
| Redux Toolkit | `SiRedux` from react-icons/si |
| Jotai | `SiJotai` from react-icons/si (verify availability) |
| Valtio | `SiVite` or text fallback (verify availability) |

## Implementation Order
1. Create `ServerState` and `ClientState` enums
2. Update schema with array fields
3. Create `state-management-options.tsx` with categorized data
4. Create `MultiSelectCardGroup` component
5. Create `useStepStateManagement` hook
6. Create `StepStateManagement` component
7. Register step 6 in `Steps.tsx`
8. Add title in `App.tsx`
