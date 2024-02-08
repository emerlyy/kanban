import IconAddTask from "@/assets/icon-add-task-mobile.svg";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import ActionPopup from "@/features/boards/ActionPopup/ActionPopup";
import { selectActiveBoard } from "@/features/boards/boardsSelectors";
import { deleteBoard } from "@/features/boards/boardsSlice";
import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import TaskFormModal from "@/features/boards/modals/TaskFormModal/TaskFormModal";
import { useBoardModal } from "@/features/boards/useBoardModal";
import { useDeleteModal } from "@/features/boards/useDeleteModal";
import { useTaskModal } from "@/features/boards/useTaskModal";
import { useSidebarState } from "@/features/sidebar/useSidebarState";
import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import Button from "@/ui/Button/Button";
import Title from "@/ui/Title/Title";
import styles from "./Header.module.css";

const Header = () => {
	const [, , isSidebarEnabled] = useSidebarState();
	const activeBoard = useAppSelector(selectActiveBoard);

	const { openModal: openNewTaskModal, modalProps: newTaskModalProps } =
		useTaskModal({ type: "new" });

	const { openModal: openEditBoardModal, modalProps: editBoardModalProps } =
		useBoardModal("edit");

	const {
		openModal: openDeleteActiveBoardModal,
		modalProps: deleteActiveBoardModalProps,
	} = useDeleteModal(deleteBoard(activeBoard?.id || ""));

	const isTaskButtonDisabled = !activeBoard?.columns.length;
	const isPopupDisabled = !activeBoard;

	const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");

	return (
		<>
			<div className={styles.header}>
				<div className={styles.content}>
					<div className={styles.boardNameWrapper}>
						{activeBoard && (
							<>
								<Title size="xl" className={styles.headerBoardName}>
									{activeBoard.name}
								</Title>
								{!isSidebarEnabled && <MobileMenu />}
							</>
						)}
					</div>
					<div className={styles.buttonsWrapper}>
						<Button
							color="primary"
							size="l"
							onClick={openNewTaskModal}
							disabled={isTaskButtonDisabled}
							className={styles.addNewTaskButton}
						>
							{isAboveMediumScreens ? (
								"+ Add New Task"
							) : (
								<img src={IconAddTask} alt="Add New Task" />
							)}
						</Button>
						<ActionPopup
							type="board"
							onEdit={openEditBoardModal}
							onDelete={openDeleteActiveBoardModal}
							disabled={isPopupDisabled}
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
