import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { Architecture } from "@/types/enum/Architecture.enum";

export const useStepArchitecture = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { architecture } = formHook.watch();

  const onChangeArchitecture = (architecture: Architecture) => {
    formHook.setValue("architecture", architecture);
  };

  return {
    architecture,
    onChangeArchitecture,
  };
};
