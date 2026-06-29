import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Stack } from "@/types/enum/Stack.enum";
import { Framework } from "@/types/enum/Framework.enum";
import { ComponentDesign } from "@/types/enum/ComponentDesign.enum";
import { DesignSystem } from "@/types/enum/DesignSystem.enum";
import { Architecture } from "@/types/enum/Architecture.enum";
import { Backend } from "@/types/enum/Backend.enum";

import {
  SiReact,
  SiVuedotjs,
  SiVite,
  SiNuxt,
  SiShadcnui,
  SiMaterialdesign,
  SiSupabase,
  SiFirebase,
  SiAppwrite,
  SiNhost,
  SiReactquery,
  SiSwr,
  SiRedux,
  SiVitest,
  SiJest,
  SiCypress,
  SiStorybook,
  SiLodash,
  SiDatefns,
  SiAxios,
  SiGsap,
  SiSpring,
  SiReactrouter,
  SiI18Next,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import {
  LuZap,
  LuAtom,
  LuShieldCheck,
  LuListChecks,
  LuCalendar,
  LuGlobe,
  LuLayers,
  LuPaintbrush,
  LuCircleDot,
} from "react-icons/lu";
import { createElement, type ReactNode } from "react";
import type { IconType } from "react-icons";

import { ServerState } from "@/types/enum/ServerState.enum";
import { ClientState } from "@/types/enum/ClientState.enum";
import { TestingUnit } from "@/types/enum/TestingUnit.enum";
import { TestingE2E } from "@/types/enum/TestingE2E.enum";
import { TestingComponent } from "@/types/enum/TestingComponent.enum";
import { ExtraFormValidation } from "@/types/enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "@/types/enum/ExtraUtilities.enum";
import { ExtraHTTP } from "@/types/enum/ExtraHTTP.enum";
import { ExtraAnimation } from "@/types/enum/ExtraAnimation.enum";
import { ExtraRouting } from "@/types/enum/ExtraRouting.enum";
import { ExtraI18n } from "@/types/enum/ExtraI18n.enum";

type LabelMap = Record<string, { name: string; icon: IconType }>;

const stackLabels: LabelMap = {
  [Stack.REACT]: { name: "React", icon: SiReact },
  [Stack.VUE]: { name: "Vue", icon: SiVuedotjs },
  [Stack.ANGULAR]: { name: "Angular", icon: SiReact },
};

const frameworkLabels: LabelMap = {
  [Framework.VITE_REACT]: { name: "Vite", icon: SiVite },
  [Framework.NEXT]: { name: "Next.js", icon: RiNextjsFill },
  [Framework.VITE_VUE]: { name: "Vite", icon: SiVite },
  [Framework.NUXT]: { name: "Nuxt", icon: SiNuxt },
};

const componentLabels: LabelMap = {
  [ComponentDesign.SHADCN_REACT]: { name: "shadcn/ui", icon: SiShadcnui },
  [ComponentDesign.SHADCN_VUE]: { name: "shadcn-vue", icon: SiShadcnui },
  [ComponentDesign.MUI]: { name: "Material UI", icon: SiMaterialdesign },
};

const designSystemLabels: Record<string, { name: string; radius: string }> = {
  [DesignSystem.ROUNDED_NONE]: { name: "Sharp", radius: "0px" },
  [DesignSystem.ROUNDED_LIGHT]: { name: "Light", radius: "4px" },
  [DesignSystem.ROUNDED_MEDIUM]: { name: "Medium", radius: "8px" },
  [DesignSystem.ROUNDED_HIGH]: { name: "High", radius: "16px" },
};

const architectureLabels: LabelMap = {
  [Architecture.PACKAGE_BY_FEATURE]: { name: "Package by Feature", icon: LuLayers },
  [Architecture.FEATURE_SLICED_DESIGN]: { name: "Feature Sliced Design", icon: LuLayers },
  [Architecture.CLEAN_ARCHITECTURE]: { name: "Clean Architecture", icon: LuLayers },
};

const backendLabels: LabelMap = {
  [Backend.SUPABASE]: { name: "Supabase", icon: SiSupabase },
  [Backend.FIREBASE]: { name: "Firebase", icon: SiFirebase },
  [Backend.APPWRITE]: { name: "Appwrite", icon: SiAppwrite },
  [Backend.NHOST]: { name: "Nhost", icon: SiNhost },
};

const allItemLabels: LabelMap = {
  [ServerState.TANSTACK_QUERY]: { name: "TanStack Query", icon: SiReactquery },
  [ServerState.SWR]: { name: "SWR", icon: SiSwr },
  [ServerState.RTK_QUERY]: { name: "RTK Query", icon: SiRedux },
  [ClientState.ZUSTAND]: { name: "Zustand", icon: LuZap },
  [ClientState.REDUX_TOOLKIT]: { name: "Redux Toolkit", icon: SiRedux },
  [ClientState.JOTAI]: { name: "Jotai", icon: LuAtom },
  [ClientState.VALTIO]: { name: "Valtio", icon: SiVite },
  [TestingUnit.VITEST]: { name: "Vitest + RTL", icon: SiVitest },
  [TestingUnit.JEST]: { name: "Jest + RTL", icon: SiJest },
  [TestingE2E.PLAYWRIGHT]: { name: "Playwright", icon: LuShieldCheck },
  [TestingE2E.CYPRESS]: { name: "Cypress", icon: SiCypress },
  [TestingComponent.STORYBOOK]: { name: "Storybook", icon: SiStorybook },
  [ExtraFormValidation.RHF_ZOD]: { name: "RHF + Zod", icon: LuListChecks },
  [ExtraUtilities.LODASH]: { name: "Lodash", icon: SiLodash },
  [ExtraUtilities.DATE_FNS]: { name: "Date-fns", icon: SiDatefns },
  [ExtraUtilities.DAYJS]: { name: "Day.js", icon: LuCalendar },
  [ExtraHTTP.AXIOS]: { name: "Axios", icon: SiAxios },
  [ExtraHTTP.KY]: { name: "Ky", icon: LuGlobe },
  [ExtraAnimation.GSAP]: { name: "GSAP", icon: SiGsap },
  [ExtraAnimation.REACT_SPRING]: { name: "React Spring", icon: SiSpring },
  [ExtraRouting.REACT_ROUTER]: { name: "React Router", icon: SiReactrouter },
  [ExtraI18n.I18NEXT]: { name: "i18next", icon: SiI18Next },
};

function SummaryCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-foreground/5 p-4">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ icon, name }: { icon: IconType; name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border bg-foreground/5 px-3 py-1.5 text-sm">
      {createElement(icon, { className: "w-3.5 h-3.5 text-foreground/70" })}
      {name}
    </span>
  );
}

function EmptyChip() {
  return (
    <span className="text-sm text-muted-foreground italic">None</span>
  );
}

export default function StepSummary() {
  const formHook = useFormContext<ProjectSpecType>();
  const values = formHook.watch();

  const serverState = (values.server_state ?? []) as string[];
  const clientState = (values.client_state ?? []) as string[];
  const testingUnit = (values.testing_unit ?? []) as string[];
  const testingE2e = (values.testing_e2e ?? []) as string[];
  const testingComponent = (values.testing_component ?? []) as string[];
  const extraFormValidation = (values.extra_form_validation ?? []) as string[];
  const extraUtilities = (values.extra_utilities ?? []) as string[];
  const extraHttp = (values.extra_http ?? []) as string[];
  const extraAnimation = (values.extra_animation ?? []) as string[];
  const extraRouting = (values.extra_routing ?? []) as string[];
  const extraI18n = (values.extra_i18n ?? []) as string[];

  const stateItems = [...serverState, ...clientState];
  const testingItems = [...testingUnit, ...testingE2e, ...testingComponent];
  const extraItems = [
    ...extraFormValidation,
    ...extraUtilities,
    ...extraHttp,
    ...extraAnimation,
    ...extraRouting,
    ...extraI18n,
  ];

  const ds = values.design_system ? designSystemLabels[values.design_system] : null;

  return (
    <ScrollArea className="w-full h-full">
      <div className="grid grid-cols-3 gap-3 p-2">
        <SummaryCard label="Stack">
          {values.stack && stackLabels[values.stack] ? (
            <Chip {...stackLabels[values.stack]} />
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Framework">
          {values.framework && frameworkLabels[values.framework] ? (
            <Chip {...frameworkLabels[values.framework]} />
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Components">
          {values.component_design && componentLabels[values.component_design] ? (
            <Chip {...componentLabels[values.component_design]} />
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Design System">
          {ds ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg border bg-foreground/5 px-3 py-1.5 text-sm">
              {createElement(LuPaintbrush, {
                className: "w-3.5 h-3.5 text-foreground/70",
              })}
              {ds.name}
              <span className="text-[10px] font-mono text-muted-foreground ml-1">
                {ds.radius}
              </span>
            </span>
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Architecture">
          {values.architecture && architectureLabels[values.architecture] ? (
            <Chip {...architectureLabels[values.architecture]} />
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Backend">
          {values.backend && backendLabels[values.backend] ? (
            <Chip {...backendLabels[values.backend]} />
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="State Management">
          {stateItems.length > 0 ? (
            stateItems.map((id) => {
              const item = allItemLabels[id];
              return item ? <Chip key={id} {...item} /> : null;
            })
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Testing">
          {testingItems.length > 0 ? (
            testingItems.map((id) => {
              const item = allItemLabels[id];
              return item ? <Chip key={id} {...item} /> : null;
            })
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>

        <SummaryCard label="Extra Libraries">
          {extraItems.length > 0 ? (
            extraItems.map((id) => {
              const item = allItemLabels[id];
              return item ? <Chip key={id} {...item} /> : null;
            })
          ) : (
            <EmptyChip />
          )}
        </SummaryCard>
      </div>
    </ScrollArea>
  );
}
