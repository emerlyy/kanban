import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import { useBoardList } from "../useBoardList";
import styles from "./BoardList.module.css";

type BoardListProps = {
	onCreateNewBoardButtonClick: () => void;
	className?: string;
};

const BoardsList = ({
	onCreateNewBoardButtonClick,
	className,
}: BoardListProps) => {
	const [boards, activeBoard, changeBoard] = useBoardList();

	return (
		<div className={`${styles.boardList}${className ? ` ${className}` : ""}`}>
			<Title tag="h2" size="s" color="gray" className={styles.listTitle}>
				All Boards ({boards.length})
			</Title>
			{!!boards.length && (
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
			)}
		</div>
	);
};

export default BoardsList;
