import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import Button from "@/ui/Button/Button";
import Title from "@/ui/Title/Title";
import { useBoardModal } from "../useBoardModal";
import styles from "./NewColumnButton.module.css";

type NewColumnButtonProps = {
	type?: "button" | "column";
	action?: "new" | "edit";
};

const NewColumnButton = ({
	type = "button",
	action = "edit",
}: NewColumnButtonProps) => {
	const { openModal, modalProps } = useBoardModal(action);

	return (
		<>
			<Button
				color="primary"
				size="l"
				onClick={openModal}
				className={type === "column" ? styles.columnButton : undefined}
			>
				{type === "button" ? (
					action === "new" ? (
						"+ Create New Board"
					) : (
						"+ Add New Column"
					)
				) : (
					<Title tag="span" size="xl" color="gray">
						{action === "new" ? "+ New Board" : "+ New Column"}
					</Title>
				)}
			</Button>
			<BoardFormModal
				title={action === "new" ? "Add New Board" : "Edit Board"}
				submiButtonText={
					action === "new" ? "+ Create New Board" : "Save Changes"
				}
				{...modalProps}
			/>
		</>
	);
};

export default NewColumnButton;
