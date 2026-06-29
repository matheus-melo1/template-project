import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectSpecSchema,
  type ProjectSpecType,
} from "@/types/schema/ProjectSpec.schema";
import { Stack } from "@/types/enum/Stack.enum";
import { ExtraHTTP } from "@/types/enum/ExtraHTTP.enum";
import { ExtraFormValidation } from "@/types/enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "@/types/enum/ExtraUtilities.enum";

const TOTAL_STEPS = 10;

const stepTitles: Record<number, string> = {
  2: "Select a framework",
  3: "Select a component library",
  4: "Select a design system",
  5: "Select a architecture",
  6: "Select state management",
  7: "Select testing tools",
  8: "Select extra libraries",
  9: "Select a backend as a service",
  10: "Summary",
};

const optionalSteps = new Set([6, 7, 8, 9]);

const requiredFieldsByStep = new Map<number, (keyof ProjectSpecType)[]>([
  [2, ["framework"]],
  [3, ["component_design"]],
  [4, ["design_system"]],
  [5, ["architecture"]],
]);

export const useWizard = () => {
  const [step, setStep] = useState(1);

  const incrementStep = () => {
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const decrementStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const formHook = useForm<ProjectSpecType>({
    resolver: zodResolver(ProjectSpecSchema),
    defaultValues: {
      stack: Stack.REACT,
      server_state: [],
      client_state: [],
      testing_unit: [],
      testing_e2e: [],
      testing_component: [],
      extra_form_validation: [ExtraFormValidation.RHF_ZOD],
      extra_utilities: [ExtraUtilities.LODASH, ExtraUtilities.DATE_FNS],
      extra_http: [ExtraHTTP.AXIOS],
      extra_animation: [],
      extra_routing: [],
    },
  });

  const values = formHook.watch();

  const isStepComplete = () => {
    const fields = requiredFieldsByStep.get(step);
    if (!fields) return true;
    return fields.every((field) => {
      const value = values[field];
      return value !== undefined && value !== null && value !== "";
    });
  };

  const isOptionalStep = optionalSteps.has(step);
  const stepTitle = stepTitles[step];
  const isLastStep = step === TOTAL_STEPS;

  return {
    step,
    stepTitle,
    isOptionalStep,
    isLastStep,
    isStepComplete,
    incrementStep,
    decrementStep,
    formHook,
  };
};
