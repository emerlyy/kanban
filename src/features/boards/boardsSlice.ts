import { LocalBoard } from "@/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { loadBoards } from "./boardsAsyncActions";

type Status = "idle" | "loading" | "received" | "rejected";

type BoardsState = {
	active: LocalBoard["id"] | null;
	items: LocalBoard[];
	status: Status;
};

const initialState: BoardsState = {
	active: null,
	items: [],
	status: "idle",
};

const boardsSlice = createSlice({
	name: "@@boards",
	initialState,
	reducers: {
		createBoard: (
			state,
			action: PayloadAction<{ name: LocalBoard["name"]; columnNames: string[] }>
		) => {
			const newBoard: LocalBoard = {
				id: nanoid(),
				name: action.payload.name,
				columns: action.payload.columnNames.map((name) => ({
					id: nanoid(),
					name,
					tasks: [],
				})),
			};
			state.items.push(newBoard);
			if (!state.active) {
				state.active = newBoard.id;
			}
		},
		setActiveBoard: (state, action: PayloadAction<BoardsState["active"]>) => {
			state.active = action.payload;
		},
		editBoard: (
			state,
			action: PayloadAction<{
				id: string;
				name: string;
				newColumns: LocalBoard["columns"];
			}>
		) => {
			const board = state.items.find((board) => board.id === action.payload.id);
			if (board) {
				board.name = action.payload.name;
				board.columns = action.payload.newColumns;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadBoards.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loadBoards.fulfilled, (state, action) => {
				state.status = "received";
				state.items.push(...action.payload);
				if (state.items.length) state.active = state.items[0].id;
			})
			.addCase(loadBoards.rejected, (state) => {
				state.status = "rejected";
			});
	},
});

export const { createBoard, setActiveBoard, editBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
