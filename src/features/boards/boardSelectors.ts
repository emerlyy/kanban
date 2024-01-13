import { RootState } from "@/store";

export const selectAllBoards = (state: RootState) => state.boards.items;

export const selectActiveBoard = (state: RootState) => state.boards.active;

export const selectBoardsStatus = (state: RootState) => state.boards.status;
