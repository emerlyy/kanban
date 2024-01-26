import DraggableTask from "@/components/DraggableTask/DraggableTask";
import { LocalColumn } from "@/types";
import React from "react";
import Title from "../Title/Title";
import styles from "./Column.module.css";

export type ColumnProps = {
	column: LocalColumn;
	isOver?: boolean;
};

const Column = React.memo(({ column, isOver }: ColumnProps) => {
	const { id, name, tasks } = column;

	return (
		<div className={styles.column}>
			<Title tag="h2" color="gray" size="s" className={styles.columnTitle}>
				{name} ({tasks.length})
			</Title>
			<ul
				className={`${styles.tasksWrapper}${isOver ? ` ${styles.over}` : ""}`}
			>
				{tasks.map((task) => (
					<DraggableTask key={task.id} id={task.id} task={task} columnId={id} />
				))}
			</ul>
		</div>
	);
});

export default Column;
