import { useStepTesting } from "@/hooks/useStepTesting";
import { MultiSelectCardGroup } from "@/components/MultiSelectCardGroup";
import { testingCategories } from "./arch/testing-options";
import { TestingUnit } from "@/types/enum/TestingUnit.enum";
import { TestingE2E } from "@/types/enum/TestingE2E.enum";
import { TestingComponent } from "@/types/enum/TestingComponent.enum";

export default function StepTesting() {
  const { selectedTestingUnit, selectedTestingE2E, selectedTestingComponent, selectTestingUnit, selectTestingE2E, selectTestingComponent } =
    useStepTesting();

  const selectedIds = new Set<string>([
    ...(selectedTestingUnit ? [selectedTestingUnit] : []),
    ...(selectedTestingE2E ? [selectedTestingE2E] : []),
    ...(selectedTestingComponent ? [selectedTestingComponent] : []),
  ]);

  const handleToggle = (id: string) => {
    if (Object.values(TestingUnit).includes(id as TestingUnit)) {
      selectTestingUnit(id as TestingUnit);
    } else if (Object.values(TestingE2E).includes(id as TestingE2E)) {
      selectTestingE2E(id as TestingE2E);
    } else if (Object.values(TestingComponent).includes(id as TestingComponent)) {
      selectTestingComponent(id as TestingComponent);
    }
  };

  return (
    <MultiSelectCardGroup
      categories={testingCategories}
      selectedIds={selectedIds}
      onToggle={handleToggle}
    />
  );
}
