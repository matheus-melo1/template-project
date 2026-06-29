import { ServerState } from "@/types/enum/ServerState.enum";
import { ClientState } from "@/types/enum/ClientState.enum";
import { SiReactquery, SiSwr, SiRedux, SiVite } from "react-icons/si";
import { LuAtom, LuZap } from "react-icons/lu";
import type {
  MultiSelectCategoryItem,
  MultiSelectCategory,
} from "@/components/MultiSelectCardGroup";

export const serverStateOptions: MultiSelectCategoryItem[] = [
  {
    id: ServerState.TANSTACK_QUERY,
    name: "TanStack Query",
    icon: SiReactquery,
    recommended: true,
  },
  {
    id: ServerState.SWR,
    name: "SWR",
    icon: SiSwr,
  },
  {
    id: ServerState.RTK_QUERY,
    name: "RTK Query",
    icon: SiRedux,
  },
];

export const clientStateOptions: MultiSelectCategoryItem[] = [
  {
    id: ClientState.ZUSTAND,
    name: "Zustand",
    icon: LuZap,
    recommended: true,
  },
  {
    id: ClientState.REDUX_TOOLKIT,
    name: "Redux Toolkit",
    icon: SiRedux,
  },
  {
    id: ClientState.JOTAI,
    name: "Jotai",
    icon: LuAtom,
  },
];

export const stateManagementCategories: MultiSelectCategory[] = [
  { label: "Server State", items: serverStateOptions },
  { label: "Client State", items: clientStateOptions },
];
