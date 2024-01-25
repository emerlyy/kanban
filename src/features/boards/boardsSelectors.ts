import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAllBoards = (state: RootState) => state.boards.items;

export const selectActiveBoard = (state: RootState) =>
	state.boards.items.find((board) => board.id === state.boards.active) ?? null;

const selectBoardsStatus = (state: RootState) => state.boards.status;
const selectBoardsError = (state: RootState) => state.boards.error;

export const selectBoardsInfo = createSelector(
	[selectAllBoards, selectBoardsStatus, selectBoardsError],
	(boards, status, error) => ({
		status: status,
		error: error,
		qty: boards.length,
	})
);
