import { ExtraFormValidation } from "@/types/enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "@/types/enum/ExtraUtilities.enum";
import { ExtraHTTP } from "@/types/enum/ExtraHTTP.enum";
import { ExtraAnimation } from "@/types/enum/ExtraAnimation.enum";
import { ExtraRouting } from "@/types/enum/ExtraRouting.enum";
import { ExtraI18n } from "@/types/enum/ExtraI18n.enum";
import { SiLodash, SiDatefns, SiAxios, SiGsap, SiSpring, SiReactrouter, SiI18Next } from "react-icons/si";
import { LuCalendar, LuGlobe, LuListChecks } from "react-icons/lu";
import type { CheckboxItem } from "@/components/CheckboxGroup";
import type { MultiSelectCategoryCheckbox } from "@/components/MultiSelectCardGroup";

export const formValidationOptions: CheckboxItem[] = [
  {
    id: ExtraFormValidation.RHF_ZOD,
    name: "RHF + Zod",
    icon: LuListChecks,
    recommended: true,
  },
];

export const utilitiesOptions: CheckboxItem[] = [
  {
    id: ExtraUtilities.LODASH,
    name: "Lodash",
    icon: SiLodash,
  },
  {
    id: ExtraUtilities.DATE_FNS,
    name: "Date-fns",
    icon: SiDatefns,
  },
  {
    id: ExtraUtilities.DAYJS,
    name: "Day.js",
    icon: LuCalendar,
  },
];

export const httpOptions: CheckboxItem[] = [
  {
    id: ExtraHTTP.AXIOS,
    name: "Axios",
    icon: SiAxios,
    recommended: true,
  },
  {
    id: ExtraHTTP.KY,
    name: "Ky",
    icon: LuGlobe,
  },
];

export const animationOptions: CheckboxItem[] = [
  {
    id: ExtraAnimation.GSAP,
    name: "GSAP",
    icon: SiGsap,
  },
  {
    id: ExtraAnimation.REACT_SPRING,
    name: "React Spring",
    icon: SiSpring,
  },
];

export const routingOptions: CheckboxItem[] = [
  {
    id: ExtraRouting.REACT_ROUTER,
    name: "React Router",
    icon: SiReactrouter,
  },
];

export const i18nOptions: CheckboxItem[] = [
  {
    id: ExtraI18n.I18NEXT,
    name: "i18next",
    icon: SiI18Next,
  },
];

export function getExtraLibsCategories(showRouting: boolean): MultiSelectCategoryCheckbox[] {
  const categories: MultiSelectCategoryCheckbox[] = [
    { label: "Form & Validation", items: formValidationOptions },
    { label: "Utilities", items: utilitiesOptions },
    { label: "HTTP Client", items: httpOptions },
    { label: "Animation", items: animationOptions },
    { label: "i18n", items: i18nOptions },
  ];

  if (showRouting) {
    categories.splice(3, 0, { label: "Routing", items: routingOptions });
  }

  return categories;
}
