import { moveTask } from "@/features/boards/boardsSlice";
import { LocalBoard } from "@/types";
import { isUserUsingMobile } from "@/utils/isUserUsingMobile";
import {
	CollisionDetection,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	PointerSensor,
	TouchSensor,
	UniqueIdentifier,
	closestCenter,
	getFirstCollision,
	pointerWithin,
	rectIntersection,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "throttle-debounce";
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

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const lastOverId = useRef<UniqueIdentifier | null>(null);
	const recentlyMovedToNewContainer = useRef(false);

	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			if (
				activeId &&
				board.columns.map((col) => col.id).includes(activeId.toString())
			) {
				return closestCenter({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(container) => container.id === activeId
					),
				});
			}

			// Start by finding any intersecting droppable
			const pointerIntersections = pointerWithin(args);
			const intersections =
				pointerIntersections.length > 0
					? // If there are droppables intersecting with the pointer, return those
					  pointerIntersections
					: rectIntersection(args);
			let overId = getFirstCollision(intersections, "id");

			if (overId != null) {
				if (board.columns.map((col) => col.id).includes(overId.toString())) {
					//const containerItems = items[overId];
					const containerItems = board.columns
						.find((col) => col.id === overId)
						?.tasks.map((task) => task.id);
					// If a container is matched and it contains items (columns 'A', 'B', 'C')
					if (containerItems && containerItems.length > 0) {
						// Return the closest droppable within that container
						overId = closestCenter({
							...args,
							droppableContainers: args.droppableContainers.filter(
								(container) =>
									container.id !== overId &&
									containerItems.includes(container.id.toString())
							),
						})[0]?.id;
					}
				}

				lastOverId.current = overId;

				return [{ id: overId }];
			}

			// When a draggable item moves to a new container, the layout may shift
			// and the `overId` may become `null`. We manually set the cached `lastOverId`
			// to the id of the draggable item that was moved to the new container, otherwise
			// the previous `overId` will be returned which can cause items to incorrectly shift positions
			if (recentlyMovedToNewContainer.current) {
				lastOverId.current = activeId;
			}

			// If no droppable is matched, return the last match
			return lastOverId.current ? [{ id: lastOverId.current }] : [];
		},
		[activeId, board.columns]
	);

	useEffect(() => {
		requestAnimationFrame(() => {
			recentlyMovedToNewContainer.current = false;
		});
	}, [board.columns]);

	function findContainer(id: string) {
		return board.columns.find(
			(column) =>
				column.id === id || column.tasks.some((task) => task.id === id)
		);
	}

	function handleDragStart(event: DragStartEvent) {
		setActiveId(event.active.id);
	}

	const handleMoveTask = useMemo(
		() =>
			throttle(75, ({ boardId, oldColumnId, nextColumnId, taskId, index }) =>
				dispatch(
					moveTask({
						boardId,
						oldColumnId,
						nextColumnId,
						taskId,
						index,
					})
				)
			),
		[dispatch]
	);

	function handleDragOver(event: DragOverEvent) {
		const { over, active } = event;
		if (!over) return;
		if (!board) return;

		const taskId = active.id.toString();
		const overId = over.id.toString();

		const oldColumn = findContainer(taskId);
		const overColumn = findContainer(overId);

		if (!oldColumn || !overColumn || oldColumn === overColumn) return;

		const overIndex = overColumn.tasks.map((task) => task.id).indexOf(overId);

		const isBelowOverItem =
			over &&
			active.rect.current.translated &&
			active.rect.current.translated.top > over.rect.top + over.rect.height;

		const modifier = isBelowOverItem ? 1 : 0;

		const newIndex = overIndex >= 0 ? overIndex + modifier : undefined;

		recentlyMovedToNewContainer.current = true;

		handleMoveTask({
			boardId: board.id,
			oldColumnId: oldColumn.id,
			nextColumnId: overColumn.id,
			taskId,
			index: overId !== overColumn.id ? newIndex : undefined,
		});
	}

	function handleDragEnd(event: DragEndEvent) {
		const { over, active } = event;
		if (!over) {
			setActiveId(null);
			return;
		}

		const taskId = active.id.toString();
		const overId = over.id.toString();

		const oldColumn = findContainer(taskId);
		const overColumn = findContainer(overId);

		if (!oldColumn || !overColumn || oldColumn !== overColumn) {
			setActiveId(null);
			return;
		}

		const oldIndex = oldColumn.tasks.map((task) => task.id).indexOf(taskId);
		const overIndex = overColumn.tasks.map((task) => task.id).indexOf(overId);

		if (oldIndex === overIndex) {
			setActiveId(null);
			return;
		}

		dispatch(
			moveTask({
				boardId: board.id,
				oldColumnId: oldColumn.id,
				nextColumnId: overColumn.id,
				taskId,
				index: overId !== overColumn.id ? overIndex : undefined,
			})
		);
		setActiveId(null);
	}

	const activeTask = useMemo(
		() =>
			board.columns
				.find((col) => col.tasks.some((task) => task.id === activeId))
				?.tasks.find((task) => task.id === activeId),
		[activeId, board.columns]
	);

	return {
		activeTask,
		sensors,
		onDragStart: handleDragStart,
		onDragEnd: handleDragEnd,
		onDragOver: handleDragOver,
		collisionDetection: collisionDetectionStrategy,
	} as const;
};
