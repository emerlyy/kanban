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
		addBoard: (store, action: PayloadAction<Board>) => {
			store.items.push(action.payload);
		},
		setActiveBoard: (store, action: PayloadAction<Board>) => {
			store.active = action.payload;
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

export const { addBoard, setActiveBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
