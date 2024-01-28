import DroppableColumn from "@/components/DroppableColumn/DroppableColumn";
import { useBoardDnd } from "@/hooks/useBoardDnd";
import { LocalBoard as TBoard } from "@/types";
import { DndContext } from "@dnd-kit/core";
import NewColumnButton from "../../features/boards/NewColumnButton/NewColumnButton";
import EmptyScreen from "../EmptyScreen/EmptyScreen";
import styles from "./Board.module.css";

type Props = {
	board: TBoard;
};

const Board = ({ board }: Props) => {
	const [sensors, handleDragEnd] = useBoardDnd(board);

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
