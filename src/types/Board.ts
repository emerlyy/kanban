export type Board = {
	name: string;
	columns: Item[];
};

export  type Item = {
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
