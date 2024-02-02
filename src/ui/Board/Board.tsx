import DroppableColumn from "@/components/DroppableColumn/DroppableColumn";
import { useBoardDnd } from "@/hooks/useBoardDnd";
import { LocalBoard as TBoard } from "@/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import NewColumnButton from "../../features/boards/NewColumnButton/NewColumnButton";
import EmptyScreen from "../EmptyScreen/EmptyScreen";
import Task from "../Task/Task";
import styles from "./Board.module.css";

type Props = {
	board: TBoard;
};

const Board = ({ board }: Props) => {
	const { activeTask, ...contextProps } = useBoardDnd(board);

	return (
		<DndContext {...contextProps}>
			<div className={styles.boardWrapper}>
				{!!board.columns.length ? (
					<div className={styles.board}>
						{board.columns.map((column) => {
							return (
								<DroppableColumn
									key={column.id}
									id={column.id}
									column={column}
								/>
							);
						})}
						{createPortal(
							<DragOverlay className={styles.dragOverlay}>
								{activeTask && <Task task={activeTask!} />}
							</DragOverlay>,
							document.body
						)}
						<NewColumnButton type="column" />
					</div>
				) : (
					<EmptyScreen />
				)}
			</div>
		</DndContext>
	);
};

export default Board;
