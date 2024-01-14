import styles from "./Button.module.css";

type ButtonColor = "primary" | "secondary" | "destructive";
type ButtonSize = "l" | "s";
type ButtonVariant = "default" | "sidebar";

type Props = {
	color?: ButtonColor;
	size?: ButtonSize;
	variant?: ButtonVariant;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	color = "primary",
	size = "s",
	variant = "default",
	className,
	onClick,
	children,
	...props
}: Props) => {
	const style = `${styles.button} ${styles[size]} ${styles[color]} ${
		variant === "sidebar" ? ` ${styles.sidebar}` : ""
	} ${className ? ` ${className}` : ""}`;
	return (
		<button type='button' onClick={onClick} className={style} {...props}>
			{children}
		</button>
	);
};

export default Button;
