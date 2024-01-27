import { moveTask } from "@/features/boards/boardsSlice";
import { LocalBoard } from "@/types";
import { isUserUsingMobile } from "@/utils/isUserUsingMobile";
import {
	DragEndEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useAppDispatch } from "./reduxHooks";

const TouchOptions = {
	delay: 600,
	tolerance: 5,
};

const PointerOptions = {
	distance: 8,
};

export const useBoardDnd = (board: LocalBoard) => {
	const dispatch = useAppDispatch();

	const isMobileEntry = isUserUsingMobile();

	const detectSensor = () => (isMobileEntry ? TouchSensor : PointerSensor);

	const sensors = useSensors(
		useSensor(detectSensor(), {
			activationConstraint: isMobileEntry ? TouchOptions : PointerOptions,
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
