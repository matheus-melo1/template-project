import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { DesignSystem } from "@/types/enum/DesignSystem.enum";

export const useStepDesignSystem = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { design_system: designSystem } = formHook.watch();

  const onChangeDesignSystem = (designSystem: DesignSystem) => {
    formHook.setValue("design_system", designSystem);
  };

  return {
    designSystem,
    onChangeDesignSystem,
  };
};
