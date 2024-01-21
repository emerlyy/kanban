import { LocalColumn } from "@/types";
import Task from "../Task/Task";
import Title from "../Title/Title";
import styles from "./Column.module.css";

type Props = Pick<LocalColumn, "name" | "tasks">;

const Column = ({ name, tasks }: Props) => {
	return (
		<div className={styles.column}>
			<Title tag="h2" color="gray" size="s" className={styles.columnTitle}>
				{name} ({tasks.length})
			</Title>
			<ul className={styles.tasksWrapper}>
				{tasks.map((task, index) => (
					<Task key={`${task.title}-${index}`} task={task} />
				))}
			</ul>
		</div>
	);
};

export default Column;
