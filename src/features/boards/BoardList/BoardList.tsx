import BoardFormModal from "@/features/boards/BoardFormModal/BoardFormModal";
import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import { useBoardList } from "../useBoardList";
import { useNewBoardModal } from "../useNewBoardModal";
import styles from "./BoardList.module.css";

const BoardsList = () => {
	const [boards, activeBoard, changeBoard] = useBoardList();
	const { openModal, modalProps } = useNewBoardModal();

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
						onClick={openModal}
					/>
				</li>
			</ul>
			<BoardFormModal
				title="Add New Board"
				submiButtonText="+ Create New Board"
				{...modalProps}
			/>
		</>
	);
};

export default BoardsList;