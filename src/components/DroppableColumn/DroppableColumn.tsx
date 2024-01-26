import Column, { ColumnProps } from "@/ui/Column/Column";
import { useDroppable } from "@dnd-kit/core";
import styles from "./DroppableColumn.module.css";
interface DroppableColumnProps extends ColumnProps {
	id: string;
}

const DroppableColumn = ({ id, column }: DroppableColumnProps) => {
	const { isOver, setNodeRef } = useDroppable({ id });

	return (
		<div ref={setNodeRef} className={styles.columnWrapper}>
			<Column column={column} isOver={isOver} />
		</div>
	);
};

export default DroppableColumn;
