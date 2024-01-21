import icon from "@/assets/icon-vertical-ellipsis.svg";
import { useTheme } from "@/context/ThemeContext";
import TaskFormModal from "@/features/boards/TaskFormModal/TaskFormModal";
import { selectActiveBoard } from "@/features/boards/boardSelectors";
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

	const { openModal, modalProps } = useNewTaskModal();

	const isNewTaskButtonActive = activeBoard && !!activeBoard.columns.length;

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
							onClick={openModal}
							disabled={!isNewTaskButtonActive}
						>
							+ Add New Task
						</Button>
						<button className={styles.settings}>
							<img src={icon} alt="" />
						</button>
					</div>
				</div>
			</div>
			<TaskFormModal
				title="Add New Task"
				submiButtonText="Create Task"
				{...modalProps}
			/>
		</>
	);
};

export default Header;
