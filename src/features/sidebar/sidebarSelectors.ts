import { RootState } from "@/store";

export const selectSidebarState = (state: RootState) => state.sidebar.isOpened;
