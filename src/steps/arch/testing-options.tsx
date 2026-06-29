import { TestingUnit } from "@/types/enum/TestingUnit.enum";
import { TestingE2E } from "@/types/enum/TestingE2E.enum";
import { TestingComponent } from "@/types/enum/TestingComponent.enum";
import { SiVitest, SiJest, SiCypress, SiStorybook } from "react-icons/si";
import { LuShieldCheck } from "react-icons/lu";
import type { MultiSelectCategoryItem, MultiSelectCategory } from "@/components/MultiSelectCardGroup";

export const unitTestOptions: MultiSelectCategoryItem[] = [
  {
    id: TestingUnit.VITEST,
    name: "Vitest + RTL",
    icon: SiVitest,
    recommended: true,
  },
  {
    id: TestingUnit.JEST,
    name: "Jest + RTL",
    icon: SiJest,
  },
];

export const e2eOptions: MultiSelectCategoryItem[] = [
  {
    id: TestingE2E.PLAYWRIGHT,
    name: "Playwright",
    icon: LuShieldCheck,
  },
  {
    id: TestingE2E.CYPRESS,
    name: "Cypress",
    icon: SiCypress,
    recommended: true,
  },
];

export const componentOptions: MultiSelectCategoryItem[] = [
  {
    id: TestingComponent.STORYBOOK,
    name: "Storybook",
    icon: SiStorybook,
  },
];

export const testingCategories: MultiSelectCategory[] = [
  { label: "Unit & Integration", items: unitTestOptions },
  { label: "E2E", items: e2eOptions },
  { label: "Component", items: componentOptions },
];
