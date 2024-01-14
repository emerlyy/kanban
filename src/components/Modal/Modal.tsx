import React from "react";
import Overlay from "../Overlay/Overlay";
import styles from "./Modal.module.css";

export type ModalProps = {
	isOpened: boolean;
	onClose?: () => void;
	className?: string;
	children?: React.ReactNode;
};

const Modal = ({ isOpened, onClose, className, children }: ModalProps) => {
	return (
		<>
			{isOpened && (
				<Overlay onClick={onClose}>
					<div
						className={`${styles.modal}${className ? ` ${className}` : ""}`}
						onClick={(e) => e.stopPropagation()}
					>
						{children}
					</div>
				</Overlay>
			)}
		</>
	);
};

export default Modal;
