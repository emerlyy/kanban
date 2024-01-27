import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import { useBoardList } from "../useBoardList";
import styles from "./BoardList.module.css";

type BoardListProps = {
	onCreateNewBoardButtonClick: () => void;
};

const BoardsList = ({ onCreateNewBoardButtonClick }: BoardListProps) => {
	const [boards, activeBoard, changeBoard] = useBoardList();

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
						onClick={onCreateNewBoardButtonClick}
					/>
				</li>
			</ul>
		</>
	);
};

export default BoardsList;
