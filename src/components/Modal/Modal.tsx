import { useKeyPress } from "@/hooks/useKeyPress";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { useRef } from "react";
import Overlay from "../Overlay/Overlay";
import styles from "./Modal.module.css";

export type ModalProps = {
	isOpened: boolean;
	onClose: () => void;
	closeOnOutsideClick?: boolean;
	className?: string;
	children?: React.ReactNode;
};

const Modal = ({
	isOpened,
	onClose,
	closeOnOutsideClick = true,
	className,
	children,
}: ModalProps) => {
	const ref = useRef<HTMLDivElement>(null);
	useOutsideClick(ref, onClose, closeOnOutsideClick && isOpened);
	useKeyPress("Escape", onClose, isOpened);
	
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
