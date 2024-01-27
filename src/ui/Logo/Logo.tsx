import LogoDark from "@/assets/logo-dark.svg";
import LogoLight from "@/assets/logo-light.svg";
import LogoSmall from "@/assets/logo-mobile.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Theme } from "@/types";
import styles from "./Logo.module.css";
type Props = {
	color?: Theme;
	className?: string;
};

const Logo = ({ color = "dark", className }: Props) => {
	const isAboveSmallScreens = useMediaQuery("(min-width:601px)");

	const logoSrc = isAboveSmallScreens
		? color === "dark"
			? LogoDark
			: LogoLight
		: LogoSmall;

	return (
		<div className={`${styles.logo}  ${className ? ` ${className}` : ""}`}>
			<img
				className={styles.img}
				src={logoSrc}
				alt="kanban"
				
			/>
		</div>
	);
};

export default Logo;
