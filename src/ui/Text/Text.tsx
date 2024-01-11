import styles from "./Text.module.css";

type TextSize = "m" | "l";
type TextColor = "primary" | "light" | "dark" | "gray";
type TextWeight = "500" | "700";

type Props = {
	tag?: React.ElementType;
	size?: TextSize;
	color?: TextColor;
	weight?: TextWeight;
	className?: string;
	children: React.ReactNode;
};

const weights = {
	[500]: "medium",
	[700]: "bold",
};

const Text = ({
	tag = "p",
	size = "m",
	color = "primary",
	weight = "500",
	className,
	children,
}: Props) => {
	const Tag = tag;
	const style = `${styles.text} ${styles[size]} ${styles[color]} ${
		styles[weights[weight]]
	} ${className ? ` ${className}` : ""}`;
	return <Tag className={style}>{children}</Tag>;
};

export default Text;
