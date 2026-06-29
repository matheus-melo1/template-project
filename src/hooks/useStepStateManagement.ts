import { useFormContext } from "react-hook-form";
import type { ProjectSpecType } from "@/types/schema/ProjectSpec.schema";
import { ServerState } from "@/types/enum/ServerState.enum";
import { ClientState } from "@/types/enum/ClientState.enum";

export const useStepStateManagement = () => {
  const formHook = useFormContext<ProjectSpecType>();
  const { server_state: serverState, client_state: clientState } = formHook.watch();

  const safeServerState = (serverState ?? []) as ServerState[];
  const safeClientState = (clientState ?? []) as ClientState[];

  const selectedServerState = safeServerState[0];
  const selectedClientState = safeClientState[0];

  const isRtkQuerySelected = selectedServerState === ServerState.RTK_QUERY;

  const selectServerState = (id: ServerState) => {
    const next = selectedServerState === id ? [] : [id];
    formHook.setValue("server_state", next);
    if (id === ServerState.RTK_QUERY && next.length > 0) {
      formHook.setValue("client_state", [ClientState.REDUX_TOOLKIT]);
    }
  };

  const selectClientState = (id: ClientState) => {
    if (isRtkQuerySelected && id !== ClientState.REDUX_TOOLKIT) return;
    const next = selectedClientState === id ? [] : [id];
    formHook.setValue("client_state", next);
  };

  const isClientStateDisabled = (id: ClientState) => {
    return isRtkQuerySelected && id !== ClientState.REDUX_TOOLKIT;
  };

  return {
    selectedServerState,
    selectedClientState,
    selectServerState,
    selectClientState,
    isClientStateDisabled,
  };
};
