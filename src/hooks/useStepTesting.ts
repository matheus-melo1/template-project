import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { TestingUnit } from "@/types/enum/TestingUnit.enum";
import { TestingE2E } from "@/types/enum/TestingE2E.enum";
import { TestingComponent } from "@/types/enum/TestingComponent.enum";

export const useStepTesting = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { testing_unit: testingUnit, testing_e2e: testingE2E, testing_component: testingComponent } = formHook.watch();

  const safeTestingUnit = (testingUnit ?? []) as TestingUnit[];
  const safeTestingE2E = (testingE2E ?? []) as TestingE2E[];
  const safeTestingComponent = (testingComponent ?? []) as TestingComponent[];

  const selectedTestingUnit = safeTestingUnit[0];
  const selectedTestingE2E = safeTestingE2E[0];
  const selectedTestingComponent = safeTestingComponent[0];

  const selectTestingUnit = (id: TestingUnit) => {
    const next = selectedTestingUnit === id ? [] : [id];
    formHook.setValue("testing_unit", next);
  };

  const selectTestingE2E = (id: TestingE2E) => {
    const next = selectedTestingE2E === id ? [] : [id];
    formHook.setValue("testing_e2e", next);
  };

  const selectTestingComponent = (id: TestingComponent) => {
    const next = selectedTestingComponent === id ? [] : [id];
    formHook.setValue("testing_component", next);
  };

  return {
    selectedTestingUnit,
    selectedTestingE2E,
    selectedTestingComponent,
    selectTestingUnit,
    selectTestingE2E,
    selectTestingComponent,
  };
};
