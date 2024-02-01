import Task, { TaskProps } from "@/ui/Task/Task";
import {
	AnimateLayoutChanges,
	defaultAnimateLayoutChanges,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableTaskProps extends TaskProps {
	id: string;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const DraggableTask = React.memo(({ id, ...taskProps }: DraggableTaskProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		animateLayoutChanges,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		zIndex: isDragging ? 100 : 0,
		opacity: isDragging ? 0.5 : 1,
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Task {...taskProps} />
		</div>
	);
});

export default DraggableTask;
