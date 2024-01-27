import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

type Props = {
	onClick?: () => void;
	className?: string;
	children?: React.ReactNode;
};

const Overlay = ({ onClick, className, children }: Props) => {
	const overlayClasses = `${styles.overlay}${
		className ? ` ${styles.className}` : ""
	}`;

	useEffect(() => {
		document.body.classList.add(styles.noscroll);

		return () => {
			document.body.classList.remove(styles.noscroll);
		};
	}, []);

	return (
		<>
			{createPortal(
				<div className={overlayClasses} onClick={onClick}>
					{children}
				</div>,
				document.body
			)}
		</>
	);
};

export default Overlay;
