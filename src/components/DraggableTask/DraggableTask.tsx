import { useMountStatus } from "@/hooks/useMountStatus";
import Task, { TaskProps } from "@/ui/Task/Task";
import {
	AnimateLayoutChanges,
	defaultAnimateLayoutChanges,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import styles from "./DraggableTask.module.css";

interface DraggableTaskProps extends TaskProps {
	id: string;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const DraggableTask = React.memo(({ id, ...taskProps }: DraggableTaskProps) => {
	const [isDisabled, setIsDisabled] = useState(false);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		disabled: isDisabled,
		animateLayoutChanges,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const mounted = useMountStatus();
	const mountedWhileDragging = isDragging && !mounted;

	const className = `${isDragging ? styles.dragging : ""} ${
		mountedWhileDragging ? styles.fadeIn : ""
	}`;

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Task
				{...taskProps}
				className={className}
				onModalToggle={setIsDisabled}
			/>
		</div>
	);
});

export default DraggableTask;
