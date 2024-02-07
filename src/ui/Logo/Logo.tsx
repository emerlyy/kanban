import LogoDark from "@/assets/logo-dark.svg";
import LogoLight from "@/assets/logo-light.svg";
import LogoSmall from "@/assets/logo-mobile.svg";
import { useTheme } from "@/context/ThemeContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import styles from "./Logo.module.css";

type Props = {
	className?: string;
};

const Logo = ({ className }: Props) => {
	const { theme } = useTheme();
	const isAboveSmallScreens = useMediaQuery("(min-width:601px)");

	const logoSrc = isAboveSmallScreens
		? theme === "light"
			? LogoDark
			: LogoLight
		: LogoSmall;

	return (
		<div className={`${styles.logo}${className ? ` ${className}` : ""}`}>
			<img className={styles.img} src={logoSrc} alt="kanban" />
		</div>
	);
};

export default Logo;
