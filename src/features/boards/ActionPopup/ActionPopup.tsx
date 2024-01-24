import { DeleteModalProps } from "@/components/DeleteModal/DeleteModal";
import Popup, { PopupProps } from "@/components/Popup/Popup";
import { useModal } from "@/hooks/useModal";
import Text from "@/ui/Text/Text";
import styles from "./ActionPopup.module.css";

interface ActionPopupProps
	extends Pick<PopupProps, "position">,
		Pick<DeleteModalProps, "type"> {
	onEdit: () => void;
	onDelete: () => void;
	disabled?: boolean;
}

const ActionPopup = ({
	type,
	position,
	onEdit,
	onDelete,
	disabled,
}: ActionPopupProps) => {
	const [isPopupOpened, , closePopup, togglePopup] = useModal();

	const handleEdit = () => {
		onEdit();
		closePopup();
	};

	const handleDelete = () => {
		onDelete();
		closePopup();
	};

	return (
		<>
			<Popup
				isOpened={isPopupOpened}
				onClose={closePopup}
				onToggle={togglePopup}
				className={styles.actionPopup}
				disabled={disabled}
				position={position}
			>
				<button onClick={handleEdit}>
					<Text tag="span" color="gray" size="l">
						Edit {type[0].toLocaleUpperCase() + type.slice(1)}
					</Text>
				</button>
				<button onClick={handleDelete}>
					<Text tag="span" color="warning" size="l">
						Delete {type[0].toLocaleUpperCase() + type.slice(1)}
					</Text>
				</button>
			</Popup>
		</>
	);
};

export default ActionPopup;
