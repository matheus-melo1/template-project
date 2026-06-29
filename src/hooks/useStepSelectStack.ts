import { Stack } from "@/types/enum/Stack.enum";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { useFormContext } from "react-hook-form";

export const useStepSelectStack = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { stack: stackSelected } = formHook.watch();

  const stacks = [
    { label: "React", value: Stack.REACT },
    { label: "Vue", value: Stack.VUE },
  ];

  const onChangeStack = (stack: Stack) => {
    formHook.setValue("stack", stack);
  };

  return { stacks, onChangeStack, stackSelected };
};
