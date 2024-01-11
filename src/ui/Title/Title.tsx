import styles from "./Title.module.css";

type TitleSize = "xl" | "l" | "m" | "s";
type TitleColor = "primary" | "light" | "dark" | "gray";

type Props = {
	tag?: React.ElementType;
	size?: TitleSize;
	color?: TitleColor;
	className?: string;
	children: React.ReactNode;
};

const Title = ({
	tag = "h2",
	size = "m",
	color = "primary",
	className,
	children,
}: Props) => {
	const Tag = tag;
	const style = `${styles.title} ${styles[size]} ${styles[color]}${
		className ? ` ${className}` : ""
	}`;
	return <Tag className={style}>{children}</Tag>;
};

export default Title;
