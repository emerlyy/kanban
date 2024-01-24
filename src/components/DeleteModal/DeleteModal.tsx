import Modal, { ModalProps } from "@/components/Modal/Modal";
import Button from "@/ui/Button/Button";
import Text from "@/ui/Text/Text";
import Title from "@/ui/Title/Title";
import styles from "./DeleteModal.module.css";

type DeleteModalType = "board" | "task";

export type DeleteModalProps = Pick<ModalProps, "isOpened" | "onClose"> & {
	type: DeleteModalType;
	name: string;
	onDelete: () => void;
	onCancel: () => void;
};

const DeleteModal = ({
	isOpened,
	onClose,
	type,
	name,
	onDelete,
	onCancel,
}: DeleteModalProps) => {
	return (
		<Modal isOpened={isOpened} onClose={onClose} className={styles.deleteModal}>
			<Title tag="h3" color="red" size="l">
				Delete this {type}?
			</Title>
			<Text tag="span" color="gray" size="l">
				Are you sure you want to delete the ‘{name}’ {type}? This action will
				remove all columns and tasks and cannot be reversed.
			</Text>
			<div className={styles.buttonsWrapper}>
				<Button color="destructive" size="s" onClick={onDelete}>
					Delete
				</Button>
				<Button color="secondary" size="s" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default DeleteModal;
