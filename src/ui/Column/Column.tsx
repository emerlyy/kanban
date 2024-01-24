import { LocalColumn } from "@/types";
import Task from "../Task/Task";
import Title from "../Title/Title";
import styles from "./Column.module.css";

type Props = {
	column: LocalColumn;
};

const Column = ({ column }: Props) => {
	const { id, name, tasks } = column;

	return (
		<div className={styles.column}>
			<Title tag="h2" color="gray" size="s" className={styles.columnTitle}>
				{name} ({tasks.length})
			</Title>
			<ul className={styles.tasksWrapper}>
				{tasks.map((task) => (
					<Task key={task.id} task={task} columnId={id} />
				))}
			</ul>
		</div>
	);
};

export default Column;
