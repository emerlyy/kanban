import { RootState } from "@/store";

export const selectMenuState = (state: RootState) => state.menu.isOpened;
