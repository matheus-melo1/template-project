import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { ExtraFormValidation } from "@/types/enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "@/types/enum/ExtraUtilities.enum";
import { ExtraHTTP } from "@/types/enum/ExtraHTTP.enum";
import { ExtraAnimation } from "@/types/enum/ExtraAnimation.enum";
import { ExtraRouting } from "@/types/enum/ExtraRouting.enum";
import { ExtraI18n } from "@/types/enum/ExtraI18n.enum";
import { Framework } from "@/types/enum/Framework.enum";

export const useStepExtraLibs = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const {
    extra_form_validation: extraFormValidation,
    extra_utilities: extraUtilities,
    extra_http: extraHTTP,
    extra_animation: extraAnimation,
    extra_routing: extraRouting,
    extra_i18n: extraI18n,
    framework,
  } = formHook.watch();

  const safeFormValidation = (extraFormValidation ?? []) as ExtraFormValidation[];
  const safeUtilities = (extraUtilities ?? []) as ExtraUtilities[];
  const safeHTTP = (extraHTTP ?? []) as ExtraHTTP[];
  const safeAnimation = (extraAnimation ?? []) as ExtraAnimation[];
  const safeRouting = (extraRouting ?? []) as ExtraRouting[];
  const safeI18n = (extraI18n ?? []) as ExtraI18n[];

  const isVite = framework === Framework.VITE_REACT || framework === Framework.VITE_VUE;

  if (isVite && safeRouting.length === 0) {
    formHook.setValue("extra_routing", [ExtraRouting.REACT_ROUTER]);
  }

  const toggleFormValidation = (id: ExtraFormValidation) => {
    const next = safeFormValidation.includes(id)
      ? safeFormValidation.filter((v) => v !== id)
      : [...safeFormValidation, id];
    formHook.setValue("extra_form_validation", next);
  };

  const toggleUtilities = (id: ExtraUtilities) => {
    const next = safeUtilities.includes(id)
      ? safeUtilities.filter((v) => v !== id)
      : [...safeUtilities, id];
    formHook.setValue("extra_utilities", next);
  };

  const toggleHTTP = (id: ExtraHTTP) => {
    if (id === ExtraHTTP.AXIOS) return;
    const next = safeHTTP.includes(id)
      ? safeHTTP.filter((v) => v !== id)
      : [...safeHTTP, id];
    formHook.setValue("extra_http", next);
  };

  const toggleAnimation = (id: ExtraAnimation) => {
    const next = safeAnimation.includes(id)
      ? safeAnimation.filter((v) => v !== id)
      : [...safeAnimation, id];
    formHook.setValue("extra_animation", next);
  };

  const toggleRouting = (id: ExtraRouting) => {
    if (isVite) return;
    const next = safeRouting.includes(id)
      ? safeRouting.filter((v) => v !== id)
      : [...safeRouting, id];
    formHook.setValue("extra_routing", next);
  };

  const toggleI18n = (id: ExtraI18n) => {
    const next = safeI18n.includes(id)
      ? safeI18n.filter((v) => v !== id)
      : [...safeI18n, id];
    formHook.setValue("extra_i18n", next);
  };

  const lockedIds = new Set<string>([
    ExtraHTTP.AXIOS,
    ...(isVite ? [ExtraRouting.REACT_ROUTER] : []),
  ]);

  const selectedIds = new Set<string>([
    ...safeFormValidation,
    ...safeUtilities,
    ...safeHTTP,
    ...safeAnimation,
    ...safeRouting,
    ...safeI18n,
  ]);

  return {
    selectedIds,
    lockedIds,
    toggleFormValidation,
    toggleUtilities,
    toggleHTTP,
    toggleAnimation,
    toggleRouting,
    toggleI18n,
  };
};
