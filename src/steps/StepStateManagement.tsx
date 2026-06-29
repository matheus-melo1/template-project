import { useStepStateManagement } from "@/hooks/useStepStateManagement";
import { MultiSelectCardGroup } from "@/components/MultiSelectCardGroup";
import { stateManagementCategories } from "./arch/state-management-options";
import { ServerState } from "@/types/enum/ServerState.enum";
import { ClientState } from "@/types/enum/ClientState.enum";

export default function StepStateManagement() {
  const { selectedServerState, selectedClientState, selectServerState, selectClientState, isClientStateDisabled } =
    useStepStateManagement();

  const selectedIds = new Set<string>([
    ...(selectedServerState ? [selectedServerState] : []),
    ...(selectedClientState ? [selectedClientState] : []),
  ]);

  const disabledClientIds = new Set<string>(
    Object.values(ClientState).filter((id) => isClientStateDisabled(id))
  );

  const handleToggle = (id: string) => {
    const isServer = Object.values(ServerState).includes(id as ServerState);
    if (isServer) {
      selectServerState(id as ServerState);
    } else {
      selectClientState(id as ClientState);
    }
  };

  return (
    <MultiSelectCardGroup
      categories={stateManagementCategories}
      selectedIds={selectedIds}
      onToggle={handleToggle}
      disabledIds={disabledClientIds}
    />
  );
}
