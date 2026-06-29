import { Stack } from "@/types/enum/Stack.enum";
import StepSelectStack from "./StepSelectStack";
import StepFramework from "./StepFramework";
import type { StepsDependencyInjection } from "@/types/models/StepsDependencyInjection.model";
import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import type { JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import StepArch from "./StepArch";
import StepComponentLibrary from "./StepComponentLibrary";
import StepDesignSystem from "./StepDesignSystem";
import StepStateManagement from "./StepStateManagement";
import StepTesting from "./StepTesting";
import StepExtraLibs from "./StepExtraLibs";
import StepBackend from "./StepBackend";
import StepSummary from "./StepSummary";

export default function Steps(props: StepsDependencyInjection) {
  const { step } = props;
  const formHook = useFormContext<ProjectSpecType>();
  const { stack } = formHook.watch();

  const stepComponents: Record<Stack, Record<number, JSX.ElementType>> = {
    [Stack.REACT]: {
      1: StepSelectStack,
      2: StepFramework,
      3: StepComponentLibrary,
      4: StepDesignSystem,
      5: StepArch,
      6: StepStateManagement,
      7: StepTesting,
      8: StepExtraLibs,
      9: StepBackend,
      10: StepSummary,
    },
    [Stack.VUE]: {
      1: StepSelectStack,
      2: StepFramework,
    },
    [Stack.ANGULAR]: {
      1: StepSelectStack,
    },
  };

  const StepComponent = stepComponents[stack][step];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${stack}-${step}`}
        initial={{ opacity: 0, y: "-12px" }}
        animate={{ opacity: 1, y: "0px" }}
        exit={{ opacity: 0, y: "12px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col items-center justify-between flex-1 min-h-0 w-full"
      >
        <StepComponent {...props} />
      </motion.div>
    </AnimatePresence>
  );
}
