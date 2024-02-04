import SettingsIcon from "@/assets/icon-vertical-ellipsis.svg";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatePresence, m } from "framer-motion";
import { useRef } from "react";
import styles from "./Popup.module.css";

export type PopupProps = {
	isOpened: boolean;
	onToggle: () => void;
	onClose: () => void;
	position?: "left" | "center";
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
};

const Popup = ({
	isOpened,
	onToggle,
	onClose,
	position = "left",
	disabled = false,
	className,
	children,
}: PopupProps) => {
	const ref = useRef(null);
	useOutsideClick(ref, onClose, isOpened);

	const popubBodyClasses = `${styles.popupBody} ${
		position === "center" ? ` ${styles.center}` : ""
	}${className ? ` ${className}` : ""}`;

	return (
		<div className={styles.popupWrapper} ref={ref}>
			<button
				className={styles.popupButton}
				onClick={onToggle}
				disabled={disabled}
			>
				<img src={SettingsIcon} alt="Settings" />
			</button>
			<AnimatePresence>
				{isOpened && (
					<m.div
						key="popup"
						className={popubBodyClasses}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
					>
						{children}
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Popup;
