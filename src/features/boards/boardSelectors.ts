import { RootState } from "@/store";

export const selectAllBoards = (state: RootState) => state.boards.items;

export const selectActiveBoard = (state: RootState) =>
	state.boards.items.find((board) => board.id === state.boards.active) ?? null;

export const selectBoardsStatus = (state: RootState) => state.boards.status;
