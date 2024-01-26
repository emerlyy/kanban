import Task, { TaskProps } from "@/ui/Task/Task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableTaskProps extends TaskProps {
	id: string;
}

const DraggableTask = ({ id, ...taskProps }: DraggableTaskProps) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

	const style = transform
		? {
				transform: CSS.Translate.toString(transform),
				zIndex: 100,
		  }
		: undefined;

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Task {...taskProps} />
		</div>
	);
};

export default DraggableTask;
