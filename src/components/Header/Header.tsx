import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { useTheme } from "@/context/ThemeContext";
import ActionPopup from "@/features/boards/ActionPopup/ActionPopup";
import { selectActiveBoard } from "@/features/boards/boardSelectors";
import { deleteBoard } from "@/features/boards/boardsSlice";
import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import TaskFormModal from "@/features/boards/modals/TaskFormModal/TaskFormModal";
import { useDeleteModal } from "@/features/boards/useDeleteModal";
import { useEditBoardModal } from "@/features/boards/useEditBoardModal";
import { useNewTaskModal } from "@/features/boards/useNewTaskModal";
import { selectMenuState } from "@/features/menu/menuSelectors";
import { useAppSelector } from "@/hooks/reduxHooks";
import Button from "@/ui/Button/Button";
import Logo from "@/ui/Logo/Logo";
import Title from "@/ui/Title/Title";
import styles from "./Header.module.css";

const Header = () => {
	const { theme } = useTheme();
	const isMenuOpened = useAppSelector(selectMenuState);
	const activeBoard = useAppSelector(selectActiveBoard);

	const { openModal: openNewTaskModal, modalProps: newTaskModalProps } =
		useNewTaskModal();
	const isButtonsActive = activeBoard && !!activeBoard.columns.length;

	const { openModal: openEditBoardModal, modalProps: editBoardModalProps } =
		useEditBoardModal();

	const {
		openModal: openDeleteActiveBoardModal,
		modalProps: deleteActiveBoardModalProps,
	} = useDeleteModal(deleteBoard(activeBoard?.id || ""));

	return (
		<>
			<div
				className={`${styles.header} ${
					isMenuOpened ? styles.sidebarActive : ""
				}`}
			>
				{!isMenuOpened && (
					<Logo
						className={styles.logo}
						color={theme === "light" ? "dark" : "light"}
					/>
				)}
				<div className={styles.content}>
					<Title size="xl">{activeBoard?.name || ". . ."}</Title>
					<div className={styles.buttonsWrapper}>
						<Button
							color="primary"
							size="l"
							onClick={openNewTaskModal}
							disabled={!isButtonsActive}
						>
							+ Add New Task
						</Button>
						<ActionPopup
							type="board"
							onEdit={openEditBoardModal}
							onDelete={openDeleteActiveBoardModal}
							disabled={!isButtonsActive}
						/>
					</div>
				</div>
			</div>
			<TaskFormModal
				title="Add New Task"
				submitButtonText="Create Task"
				{...newTaskModalProps}
			/>
			<BoardFormModal
				title="Edit Board"
				submiButtonText="Save Changes"
				{...editBoardModalProps}
			/>
			<DeleteModal
				type="board"
				name={activeBoard?.name || ""}
				{...deleteActiveBoardModalProps}
			/>
		</>
	);
};

export default Header;
