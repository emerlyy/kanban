import React from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

type Props = {
	onClick?: () => void;
	children?: React.ReactNode;
};

const Overlay = ({ onClick, children }: Props) => {
	return (
		<>
			{createPortal(
				<div className={styles.overlay} onClick={onClick}>
					{children}
				</div>,
				document.body
			)}
		</>
	);
};

export default Overlay;
