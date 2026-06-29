import { Backend } from "@/types/enum/Backend.enum";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { useFormContext } from "react-hook-form";
import { SiSupabase, SiFirebase, SiAppwrite, SiNhost } from "react-icons/si";
import type { SelectableCardItem } from "@/components/SelectableCardGroup";

interface BackendValue extends SelectableCardItem {
  id: Backend;
}

export const useStepBackend = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { backend } = formHook.watch();

  const backends: BackendValue[] = [
    { id: Backend.SUPABASE, name: "Supabase", icon: SiSupabase },
    { id: Backend.FIREBASE, name: "Firebase", icon: SiFirebase, disabled: true },
    { id: Backend.APPWRITE, name: "Appwrite", icon: SiAppwrite, disabled: true },
    { id: Backend.NHOST, name: "Nhost", icon: SiNhost, disabled: true },
  ];

  const onChangeBackend = (value: Backend) => {
    formHook.setValue("backend", value === backend ? undefined : value);
  };

  return {
    backends,
    onChangeBackend,
    backend,
  };
};
