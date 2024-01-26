import { moveTask } from "@/features/boards/boardsSlice";
import { LocalBoard } from "@/types";
import {
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useAppDispatch } from "./reduxHooks";

export const useBoardDnd = (board: LocalBoard) => {
	const dispatch = useAppDispatch();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;
		if (!over) return;
		if (!board) return;

		const oldColumnId = board.columns.find((col) =>
			col.tasks.some((task) => task.id === active.id)
		)?.id;

		if (!oldColumnId) return;

		const nextColumnId = over.id.toString();
		const taskId = active.id.toString();

		if (nextColumnId === oldColumnId) return;

		dispatch(
			moveTask({
				boardId: board?.id,
				oldColumnId,
				nextColumnId,
				taskId,
			})
		);
	}

	return [sensors, handleDragEnd] as const;
};
