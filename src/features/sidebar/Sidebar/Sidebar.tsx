import EyeIcon from "@/assets/icon-show-sidebar.svg";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import BoardsList from "@/features/boards/BoardList/BoardList";
import BoardFormModal from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import { useBoardModal } from "@/features/boards/useBoardModal";
import Button from "@/ui/Button/Button";
import Title from "@/ui/Title/Title";
import { AnimatePresence, m } from "framer-motion";
import { useSidebar } from "../useSidebar";
import styles from "./Sidebar.module.css";

const variants = {
	hidden: { marginLeft: "calc(var(--sidebar-width) * -1)" },
	show: { marginLeft: "0" },
};

const Sidebar = () => {
	const [isAboveMediumScreens, isSidebarOpened, toggleSidebar] = useSidebar();
	const { openModal: openBoardModal, modalProps: boardModalProps } =
		useBoardModal("new");

	if (!isAboveMediumScreens) return;

	return (
		<AnimatePresence initial={false}>
			{isSidebarOpened ? (
				<m.aside
					className={styles.sidebar}
					key="sidebar"
					variants={variants}
					initial="hidden"
					animate="show"
					exit="hidden"
					transition={{ duration: 0.2 }}
				>
					<BoardsList
						onCreateNewBoardButtonClick={openBoardModal}
						className={styles.boardsList}
					/>
					<div className={styles.bottomControls}>
						<ThemeSwitcher className={styles.themeSwitcher} />
						<Button
							variant="sidebar"
							size="l"
							color="secondary"
							onClick={toggleSidebar}
						>
							<HideIcon />
							<Title tag="span" size="m" color="gray">
								Hide Sidebar
							</Title>
						</Button>
					</div>
					<BoardFormModal
						title="Add New Board"
						submiButtonText="+ Create New Board"
						{...boardModalProps}
					/>
				</m.aside>
			) : (
				<button className={styles.sidebarLabel} onClick={toggleSidebar}>
					<img src={EyeIcon} alt="Show Sidebar" />
				</button>
			)}
		</AnimatePresence>
	);
};

const HideIcon = () => (
	<svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
			fill="#828FA3"
		/>
	</svg>
);

export default Sidebar;
