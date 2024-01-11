import styles from "./Button.module.css";

type ButtonColor = "primary" | "secondary" | "destructive";
type ButtonSize = "l" | "s";

type Props = {
	color?: ButtonColor;
	size?: ButtonSize;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

const Button = ({
	color = "primary",
	size = "s",
	className,
	onClick,
	children,
}: Props) => {
	const style = `${styles.button} ${styles[size]} ${styles[color]} ${
		className ? ` ${className}` : ""
	}`;
	return (
		<button onClick={onClick} className={style}>
			{children}
		</button>
	);
};

export default Button;
