import { Board } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadBoards } from "./boardsAsyncActions";

type Status = "idle" | "loading" | "received" | "rejected";

type BoardsState = {
	active: Board | null;
	items: Board[];
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
			store,
			action: PayloadAction<{ name: Board["name"]; columnNames: string[] }>
		) => {
			const newBoard: Board = {
				name: action.payload.name,
				columns: action.payload.columnNames.map((name) => ({
					name,
					tasks: [],
				})),
			};
			store.items.push(newBoard);
			if (!store.active) {
				store.active = newBoard;
			}
		},
		setActiveBoard: (store, action: PayloadAction<Board>) => {
			store.active = action.payload;
		},
		editBoard: (
			store,
			action: PayloadAction<{ name: string; newColumns: Board["columns"] }>
		) => {
			if (store.active) {
				store.active.name = action.payload.name;
				store.active.columns = action.payload.newColumns;
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
			})
			.addCase(loadBoards.rejected, (state, action) => {
				state.status = "rejected";
			});
	},
});

export const { createBoard, setActiveBoard, editBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
