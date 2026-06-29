import { z } from "zod";
import { Stack } from "../enum/Stack.enum";
import { Framework } from "../enum/Framework.enum";
import { Architecture } from "../enum/Architecture.enum";
import { ComponentDesign } from "../enum/ComponentDesign.enum";
import { DesignSystem } from "../enum/DesignSystem.enum";
import { ServerState } from "../enum/ServerState.enum";
import { ClientState } from "../enum/ClientState.enum";
import { TestingUnit } from "../enum/TestingUnit.enum";
import { TestingE2E } from "../enum/TestingE2E.enum";
import { TestingComponent } from "../enum/TestingComponent.enum";
import { ExtraFormValidation } from "../enum/ExtraFormValidation.enum";
import { ExtraUtilities } from "../enum/ExtraUtilities.enum";
import { ExtraHTTP } from "../enum/ExtraHTTP.enum";
import { ExtraAnimation } from "../enum/ExtraAnimation.enum";
import { ExtraRouting } from "../enum/ExtraRouting.enum";
import { ExtraI18n } from "../enum/ExtraI18n.enum";
import { Backend } from "../enum/Backend.enum";

export const ProjectSpecSchema = z.object({
  stack: z.nativeEnum(Stack),
  framework: z.nativeEnum(Framework),
  architecture: z.nativeEnum(Architecture).optional(),
  component_design: z.nativeEnum(ComponentDesign),
  design_system: z.nativeEnum(DesignSystem),
  server_state: z.array(z.nativeEnum(ServerState)).optional(),
  client_state: z.array(z.nativeEnum(ClientState)).optional(),
  testing_unit: z.array(z.nativeEnum(TestingUnit)).optional(),
  testing_e2e: z.array(z.nativeEnum(TestingE2E)).optional(),
  testing_component: z.array(z.nativeEnum(TestingComponent)).optional(),
  extra_form_validation: z.array(z.nativeEnum(ExtraFormValidation)).optional(),
  extra_utilities: z.array(z.nativeEnum(ExtraUtilities)).optional(),
  extra_http: z.array(z.nativeEnum(ExtraHTTP)).optional(),
  extra_animation: z.array(z.nativeEnum(ExtraAnimation)).optional(),
  extra_routing: z.array(z.nativeEnum(ExtraRouting)).optional(),
  extra_i18n: z.array(z.nativeEnum(ExtraI18n)).optional(),
  backend: z.nativeEnum(Backend).optional(),
});

export type ProjectSpecType = z.infer<typeof ProjectSpecSchema>;
