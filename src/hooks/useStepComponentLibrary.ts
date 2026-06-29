import { ComponentDesign } from "@/types/enum/ComponentDesign.enum";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { useFormContext } from "react-hook-form";
import { SiShadcnui, SiMaterialdesign } from "react-icons/si";
import type { SelectableCardItem } from "@/components/SelectableCardGroup";

interface ComponentLibraryValue extends SelectableCardItem {
  id: ComponentDesign;
}

export const useStepComponentLibrary = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { component_design: componentDesign } = formHook.watch();

  const componentLibraries: ComponentLibraryValue[] = [
    { id: ComponentDesign.SHADCN_REACT, name: "shadcn", icon: SiShadcnui, disabled: false },
    { id: ComponentDesign.MUI, name: "Material UI", icon: SiMaterialdesign, disabled: true },
  ];

  const onChangeComponentLibrary = (componentDesign: ComponentDesign) => {
    formHook.setValue("component_design", componentDesign);
  };

  return {
    componentLibraries,
    onChangeComponentLibrary,
    componentDesign,
  };
};
