import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import Title from "@/ui/Title/Title";
import { useEditBoardModal } from "../useEditBoardModal";
import styles from "./NewColumnButton.module.css";

const NewColumnButton = () => {
	const { openModal, modalProps } = useEditBoardModal();

	return (
		<>
			<button className={styles.newColumnButton} onClick={openModal}>
				<Title tag="span" size="xl" color="gray">
					+ New Column
				</Title>
			</button>
			<BoardFormModal
				title="Edit Board"
				submiButtonText="Save Changes"
				{...modalProps}
			/>
		</>
	);
};

export default NewColumnButton;
