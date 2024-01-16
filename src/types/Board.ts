export type Board = {
	name: string;
	columns: Column[];
};

export type Column = {
	name: string;
	tasks: Task[];
};

export type Task = {
	title: string;
	description: string;
	status: TaskStatus;
	subtasks: Subtask[];
};

type TaskStatus = "Todo" | "Doing" | "Done";

type Subtask = {
	title: string;
	isCompleted: boolean;
};

export type LocalBoard = {
	id: string;
	name: string;
	columns: LocalColumn[];
};

export type LocalColumn = {
	id: string;
	name: string;
	tasks: LocalTask[];
};

export type LocalTask = {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	subtasks: LocalSubtask[];
};

type LocalSubtask = WithId<Subtask>;

type WithId<T> = T & { id: string };
