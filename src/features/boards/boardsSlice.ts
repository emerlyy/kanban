import { LocalBoard, LocalTask } from "@/types";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { loadBoards } from "./boardsAsyncActions";

type Status = "idle" | "loading" | "received" | "rejected";

type BoardsState = {
	active: LocalBoard["id"] | null;
	items: LocalBoard[];
	status: Status;
	error: string | null;
};

const initialState: BoardsState = {
	active: null,
	items: [],
	status: "idle",
	error: null,
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
			state.active = newBoard.id;
		},
		deleteBoard: (state, action: PayloadAction<LocalBoard["id"]>) => {
			state.items = state.items.filter((board) => board.id !== action.payload);
			if (state.active === action.payload)
				state.active = state.items[0]?.id || null;
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
		deleteTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				columnId: string;
				taskId: string;
			}>
		) => {
			const board = state.items.find(
				(board) => board.id === action.payload.boardId
			);
			const column = board?.columns.find(
				(col) => col.id === action.payload.columnId
			);

			if (column?.tasks) {
				column.tasks = column?.tasks.filter(
					(task) => task.id !== action.payload.taskId
				);
			}
		},
		editTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				columnId: string;
				taskId: string;
				newTask: LocalTask;
				newColumnId?: string;
			}>
		) => {
			const { boardId, columnId, taskId, newTask, newColumnId } =
				action.payload;

			const board = state.items.find((board) => board.id === boardId);
			const oldColumn = board?.columns.find((col) => col.id === columnId);

			if (oldColumn) {
				if (newColumnId) {
					oldColumn.tasks = oldColumn.tasks.filter(
						(task) => task.id !== taskId
					);

					const newColumn = board?.columns.find(
						(col) => col.id === newColumnId
					);

					newColumn?.tasks.push(newTask);
				} else {
					const oldTask = oldColumn.tasks.find((task) => task.id === taskId);

					if (oldTask) {
						oldTask.title = newTask.title;
						oldTask.description = newTask.description;
						oldTask.subtasks = newTask.subtasks;
					}
				}
			}
		},
		moveTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				oldColumnId: string;
				nextColumnId?: string;
				taskId: string;
				index?: number;
			}>
		) => {
			const { boardId, nextColumnId, oldColumnId, taskId, index } =
				action.payload;

			const board = state.items.find((b) => b.id === boardId);

			const oldColumn = board?.columns.find((col) => col.id === oldColumnId);
			const nextColumn = nextColumnId
				? board?.columns.find((col) => col.id === nextColumnId)
				: oldColumn;

			if (oldColumn && nextColumn) {
				const task = oldColumn.tasks.find((task) => task.id === taskId);

				if (oldColumn.tasks) {
					oldColumn.tasks = oldColumn.tasks.filter(
						(task) => task.id !== taskId
					);
				}

				if (task) {
					task.status = nextColumn.name;

					if (index !== undefined) {
						nextColumn.tasks = [
							...nextColumn.tasks.slice(0, index),
							task,
							...nextColumn.tasks.slice(index),
						];
					} else {
						nextColumn.tasks.push(task);
					}
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
				state.error = null;
			})
			.addCase(loadBoards.fulfilled, (state, action) => {
				state.status = "received";
				state.items.push(...action.payload);
				if (state.items.length) state.active = state.items[0].id;
			})
			.addCase(loadBoards.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload || "Cannot load data";
			});
	},
});

export const {
	createBoard,
	deleteBoard,
	setActiveBoard,
	editBoard,
	addTask,
	deleteTask,
	editTask,
	moveTask,
	toggleSubtask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
