import { useModal } from "@/hooks/useModal";
import BoardListItem from "@/ui/BoardsListItem/BoardsListItem";
import Title from "@/ui/Title/Title";
import NewBoardModal from "../NewBoardModal/NewBoardModal";
import { useBoards } from "../useBoards";
import styles from "./BoardsList.module.css";

const BoardsList = () => {
	const [boards, activeBoard, changeBoard] = useBoards();
	const [isModalOpened, openModal, closeModal] = useModal();

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
			<NewBoardModal isOpened={isModalOpened} onClose={closeModal} />
		</>
	);
};

export default BoardsList;
