import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Board } from "@/types";
import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import { selectActiveBoard, selectAllBoards } from "../boardSelectors";
import { setActiveBoard } from "../boardsSlice";
import styles from "./BoardsList.module.css";

const BoardsList = () => {
	const boards = useAppSelector(selectAllBoards);
	const activeBoard = useAppSelector(selectActiveBoard);

	const dispatch = useAppDispatch();

	const changeBoard = (board: Board) => () => {
		if (board !== activeBoard) {
			dispatch(setActiveBoard(board));
		}
	};

	return (
		<>
			<Title tag="h2" size="s" color="gray" className={styles.listTitle}>
				All Boards ({boards.length})
			</Title>
			<ul className={styles.list}>
				{boards.map((board, index) => (
					<li key={`${board.name}-${index}`}>
						<BoardListItem
							title={board.name}
							active={board === activeBoard}
							onClick={changeBoard(board)}
						/>
					</li>
				))}
				<li>
					<BoardListItem
						title="+ Create New Board"
						className={styles.colorAccent}
					/>
				</li>
			</ul>
		</>
	);
};

export default BoardsList;
