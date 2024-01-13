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

export type Subtask = {
	title: string;
	isCompleted: boolean;
};
