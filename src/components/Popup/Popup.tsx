import SettingsIcon from "@/assets/icon-vertical-ellipsis.svg";
import { useModal } from "@/hooks/useModal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef } from "react";
import styles from "./Popup.module.css";

type Props = {
	position?: "left" | "center";
};

const Popup = ({ position = "left" }: Props) => {
	const [isOpened, _, closeModal, toggleModal] = useModal();

	const ref = useRef(null);
	useOutsideClick(ref, closeModal, isOpened);

	return (
		<div className={styles.popupWrapper} ref={ref}>
			<button className={styles.popupButton} onClick={toggleModal}>
				<img src={SettingsIcon} alt="Settings" />
			</button>
			{isOpened && (
				<div
					className={`${styles.popupBody} ${
						position === "center" ? ` ${styles.center}` : ""
					}`}
				></div>
			)}
		</div>
	);
};

export default Popup;
