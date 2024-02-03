import IconAddTask from "@/assets/icon-add-task-mobile.svg";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import { useTheme } from "@/context/ThemeContext";
import ActionPopup from "@/features/boards/ActionPopup/ActionPopup";
import { selectActiveBoard } from "@/features/boards/boardsSelectors";
import { deleteBoard } from "@/features/boards/boardsSlice";
import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import TaskFormModal from "@/features/boards/modals/TaskFormModal/TaskFormModal";
import { useBoardModal } from "@/features/boards/useBoardModal";
import { useDeleteModal } from "@/features/boards/useDeleteModal";
import { useTaskModal } from "@/features/boards/useTaskModal";
import MobileMenu from "@/features/sidebar/MobileMenu/MobileMenu";
import { useSidebarState } from "@/features/sidebar/useSidebarState";
import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import Button from "@/ui/Button/Button";
import Logo from "@/ui/Logo/Logo";
import Title from "@/ui/Title/Title";
import { AnimatePresence, m } from "framer-motion";
import styles from "./Header.module.css";

const variants = {
	sidebarClosed: {
		marginLeft: "0",
	},
	sidebarActive: {
		marginLeft: "var(--sidebar-width)",
	},
};

const logoVariants = {
	open: {
		width: "auto",
	},
	closed: {
		width: 0,
	},
};

const Header = () => {
	const { theme } = useTheme();
	const [isSidebarVisible, , isAboveSmallScreens] = useSidebarState();
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
			<m.div
				className={styles.header}
				variants={variants}
				animate={isSidebarVisible ? "sidebarActive" : "sidebarClosed"}
				transition={{ duration: 0.2 }}
			>
				<AnimatePresence initial={false}>
					{!isSidebarVisible && (
						<m.div
							key="logo"
							className={styles.logoWrapper}
							variants={logoVariants}
							animate="open"
							exit="closed"
							style={{ originX: 1 }}
							transition={{ duration: 0.1 }}
						>
							<Logo
								className={styles.logo}
								color={theme === "light" ? "dark" : "light"}
							/>
						</m.div>
					)}
				</AnimatePresence>
				<div className={styles.content}>
					<div className={styles.boardNameWrapper}>
						{activeBoard?.name && (
							<>
								<Title size="xl" className={styles.headerBoardName}>
									{activeBoard.name}
								</Title>
								{!isAboveSmallScreens && <MobileMenu />}
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
			</m.div>
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
