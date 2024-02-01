import Column, { ColumnProps } from "@/ui/Column/Column";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import styles from "./DroppableColumn.module.css";

interface DroppableColumnProps extends ColumnProps {
	id: string;
}

const DroppableColumn = React.memo(({ id, column }: DroppableColumnProps) => {
	const { isOver, setNodeRef } = useDroppable({ id });

	const items = useMemo(() => column.tasks.map((task) => task.id), [column]);

	return (
		<SortableContext
			items={items}
			strategy={verticalListSortingStrategy}
			id={id}
		>
			<div ref={setNodeRef} className={styles.columnWrapper}>
				<Column column={column} isOver={isOver} />
			</div>
		</SortableContext>
	);
});

export default DroppableColumn;
