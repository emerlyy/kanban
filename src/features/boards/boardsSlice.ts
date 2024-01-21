import { LocalBoard, LocalTask } from "@/types";
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
		addTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				columnId: string;
				task: LocalTask;
			}>
		) => {
			const board = state.items.find(
				(board) => board.id === action.payload.boardId
			);
			const column = board?.columns.find(
				(col) => col.id === action.payload.columnId
			);
			column?.tasks.push(action.payload.task);
		},
		moveTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				oldColumnId: string;
				nextColumnId: string;
				taskId: string;
			}>
		) => {
			const board = state.items.find((b) => b.id === action.payload.boardId);

			const oldColumn = board?.columns.find(
				(col) => col.id === action.payload.oldColumnId
			);
			const nextColumn = board?.columns.find(
				(col) => col.id === action.payload.nextColumnId
			);

			if (oldColumn && nextColumn) {
				const task = oldColumn.tasks.find(
					(task) => task.id === action.payload.taskId
				);

				if (oldColumn.tasks) {
					oldColumn.tasks = oldColumn.tasks.filter(
						(task) => task.id !== action.payload.taskId
					);
				}

				if (task) {
					task.status = nextColumn.name;
					nextColumn.tasks.push(task);
				}
			}
		},
		toggleSubtask: (state, action: PayloadAction<string>) => {
			state.items.forEach((b) =>
				b.columns.forEach((c) =>
					c.tasks.forEach((t) =>
						t.subtasks.forEach(
							(s) => s.id === action.payload && (s.isCompleted = !s.isCompleted)
						)
					)
				)
			);
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

export const {
	createBoard,
	setActiveBoard,
	editBoard,
	addTask,
	moveTask,
	toggleSubtask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
