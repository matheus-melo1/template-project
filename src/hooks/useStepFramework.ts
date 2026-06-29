import { Framework } from "@/types/enum/Framework.enum";
import { Stack } from "@/types/enum/Stack.enum";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { useFormContext } from "react-hook-form";
import type { SelectableCardItem } from "@/components/SelectableCardGroup";
import { RiNextjsFill } from "react-icons/ri";
import { SiNuxt, SiVite } from "react-icons/si";

interface FrameworkValue extends SelectableCardItem {
  id: Framework;
}

export const useStepFramework = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { stack, framework } = formHook.watch();

  const frameworks: Record<Stack, FrameworkValue[]> = {
    [Stack.REACT]: [
      { id: Framework.VITE_REACT, name: "Vite", icon: SiVite },
      { id: Framework.NEXT, name: "Nextjs", icon: RiNextjsFill, disabled: true },
    ],
    [Stack.VUE]: [
      { id: Framework.VITE_VUE, name: "Vite", icon: SiVite },
      { id: Framework.NUXT, name: "Nuxt", icon: SiNuxt },
    ],
    [Stack.ANGULAR]: [],
  };

  const stackFrameworkSelected = frameworks[stack];

  const onChangeFramework = (framework: Framework) => {
    formHook.setValue("framework", framework);
  };

  return {
    stackFrameworkSelected,
    onChangeFramework,
    framework,
  };
};
