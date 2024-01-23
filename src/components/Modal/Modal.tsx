import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { useRef } from "react";
import Overlay from "../Overlay/Overlay";
import styles from "./Modal.module.css";

export type ModalProps = {
	isOpened: boolean;
	onClose: () => void;
	className?: string;
	children?: React.ReactNode;
};

const Modal = ({ isOpened, onClose, className, children }: ModalProps) => {
	const ref = useRef<HTMLDivElement>(null);
	useOutsideClick(ref, onClose, isOpened);

	if (!isOpened) return null;

	return (
		<Overlay>
			<div
				className={`${styles.modal}${className ? ` ${className}` : ""}`}
				ref={ref}
			>
				{children}
			</div>
		</Overlay>
	);
};

export default Modal;
