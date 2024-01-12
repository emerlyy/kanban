import LogoDark from "@/assets/logo-dark.svg";
import LogoLight from "@/assets/logo-light.svg";
import { Theme } from "@/types";
import styles from "./Logo.module.css";
type Props = {
	color?: Theme;
	className?: string;
};

const Logo = ({ color = "dark", className }: Props) => {
	return (
		<div className={`${styles.logo}  ${className ? ` ${className}` : ""}`}>
			<img
				className={styles.img}
				src={color == "dark" ? LogoDark : LogoLight}
				alt="kanban"
				width={152}
				height={25}
			/>
		</div>
	);
};

export default Logo;
