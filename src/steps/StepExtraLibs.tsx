import { useStepExtraLibs } from "@/hooks/useStepExtraLibs";
import { CheckboxGroupContainer } from "@/components/MultiSelectCardGroup";
import { getExtraLibsCategories } from "./arch/extra-libs-options";
import { ExtraFormValidation } from "@/types/enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "@/types/enum/ExtraUtilities.enum";
import { ExtraHTTP } from "@/types/enum/ExtraHTTP.enum";
import { ExtraAnimation } from "@/types/enum/ExtraAnimation.enum";
import { ExtraRouting } from "@/types/enum/ExtraRouting.enum";
import { ExtraI18n } from "@/types/enum/ExtraI18n.enum";
import { Framework } from "@/types/enum/Framework.enum";
import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";

export default function StepExtraLibs() {
  const formHook = useFormContext<ProjectSpecType>();
  const { framework } = formHook.watch();
  const isVite = framework === Framework.VITE_REACT || framework === Framework.VITE_VUE;

  const {
    selectedIds,
    lockedIds,
    toggleFormValidation,
    toggleUtilities,
    toggleHTTP,
    toggleAnimation,
    toggleRouting,
    toggleI18n,
  } = useStepExtraLibs();

  const categories = getExtraLibsCategories(isVite);

  const handleToggle = (id: string) => {
    if (Object.values(ExtraFormValidation).includes(id as ExtraFormValidation)) {
      toggleFormValidation(id as ExtraFormValidation);
    } else if (Object.values(ExtraUtilities).includes(id as ExtraUtilities)) {
      toggleUtilities(id as ExtraUtilities);
    } else if (Object.values(ExtraHTTP).includes(id as ExtraHTTP)) {
      toggleHTTP(id as ExtraHTTP);
    } else if (Object.values(ExtraAnimation).includes(id as ExtraAnimation)) {
      toggleAnimation(id as ExtraAnimation);
    } else if (Object.values(ExtraRouting).includes(id as ExtraRouting)) {
      toggleRouting(id as ExtraRouting);
    } else if (Object.values(ExtraI18n).includes(id as ExtraI18n)) {
      toggleI18n(id as ExtraI18n);
    }
  };

  return (
    <CheckboxGroupContainer
      categories={categories}
      selectedIds={selectedIds}
      onToggle={handleToggle}
      lockedIds={lockedIds}
    />
  );
}
