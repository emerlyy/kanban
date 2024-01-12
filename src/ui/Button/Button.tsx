import styles from "./Button.module.css";

type ButtonColor = "primary" | "secondary" | "destructive";
type ButtonSize = "l" | "s";
type ButtonType = "default" | "sidebar";

type Props = {
	color?: ButtonColor;
	size?: ButtonSize;
	type?: ButtonType;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

const Button = ({
	color = "primary",
	size = "s",
	type = "default",
	className,
	onClick,
	children,
}: Props) => {
	const style = `${styles.button} ${styles[size]} ${styles[color]} ${
		type === "sidebar" ? ` ${styles.sidebar}` : ""
	} ${className ? ` ${className}` : ""}`;
	return (
		<button onClick={onClick} className={style}>
			{children}
		</button>
	);
};

export default Button;
