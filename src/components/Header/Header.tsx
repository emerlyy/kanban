import icon from "@/assets/icon-vertical-ellipsis.svg";
import { useTheme } from "@/context/ThemeContext";
import { selectMenuState } from "@/features/menu/menuSelectors";
import { useAppSelector } from "@/hooks/reduxHooks";
import Button from "@/ui/Button/Button";
import Logo from "@/ui/Logo/Logo";
import Title from "@/ui/Title/Title";
import styles from "./Header.module.css";

const Header = () => {
	const { theme } = useTheme();
	const isMenuOpened = useAppSelector(selectMenuState);
	return (
		<div className={styles.header}>
			{!isMenuOpened && (
				<Logo
					className={styles.logo}
					color={theme === "light" ? "dark" : "light"}
				/>
			)}
			<div className={styles.content}>
				<Title size="xl">Platform Launch</Title>
				<div className={styles.buttonsWrapper}>
					<Button color="primary" size="l">
						+ Add New Task
					</Button>
					<button className={styles.settings}>
						<img src={icon} alt="" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
