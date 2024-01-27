import ChevronDown from "@/assets/icon-chevron-down.svg";
import Modal from "@/components/Modal/Modal";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import BoardsList from "@/features/boards/BoardList/BoardList";
import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import { useBoardModal } from "@/features/boards/useBoardModal";
import { useModal } from "@/hooks/useModal";
import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
	const [isMenuOpened, openMenu, closeMenu] = useModal();
	const { openModal: openBoardModal, modalProps: boardModalProps } =
		useBoardModal("new");

	return (
		<>
			<button
				onClick={openMenu}
				className={`${styles.menuButton}${
					isMenuOpened ? ` ${styles.opened}` : ""
				}`}
			>
				<img src={ChevronDown} alt="" />
			</button>
			<Modal
				isOpened={isMenuOpened}
				onClose={closeMenu}
				className={styles.menuModal}
			>
				<div className={styles.boardsList} onClick={closeMenu}>
					<BoardsList onCreateNewBoardButtonClick={openBoardModal} />
				</div>
				<div className={styles.themeSwitcher}>
					<ThemeSwitcher />
				</div>
			</Modal>
			<BoardFormModal
				title="Add New Board"
				submiButtonText="+ Create New Board"
				{...boardModalProps}
			/>
		</>
	);
};

export default MobileMenu;
