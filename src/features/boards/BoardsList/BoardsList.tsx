import { useAppSelector } from "@/hooks/reduxHooks";
import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import { selectAllBoards } from "../boardSelectors";
import styles from "./BoardsList.module.css";

const BoardsList = () => {
	const boards = useAppSelector(selectAllBoards);

	return (
		<>
			<Title tag="h2" size="s" color="gray" className={styles.listTitle}>
				All Boards ({boards.length})
			</Title>
			<ul className={styles.list}>
				{boards.map((board, index) => (
					<li key={`${board.name}-${index}`}>
						<BoardListItem title={board.name} active={false} />
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
