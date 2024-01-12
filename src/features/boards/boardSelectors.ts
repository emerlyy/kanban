import { RootState } from "@/store";

export const selectAllBoards = (state: RootState) => state.boards.items;

export const selectBoardsStatus = (state: RootState) => state.boards.status;
