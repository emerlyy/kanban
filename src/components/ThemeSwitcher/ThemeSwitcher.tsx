import MoonIcon from "@/assets/icon-dark-theme.svg";
import SunIcon from "@/assets/icon-light-theme.svg";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import styles from "./ThemeSwitcher.module.css";

type Props = {
	className?: string;
};

const ThemeSwitcher = React.memo(({ className }: Props) => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div
			className={`${styles.themeSwitcher} ${className ? ` ${className}` : ""}`}
		>
			<img src={SunIcon} alt="light" />
			<label className={styles.themeToggler}>
				<input
					type="checkbox"
					checked={theme === "dark"}
					onChange={toggleTheme}
				/>
				<span className={styles.slider}></span>
			</label>
			<img src={MoonIcon} alt="dark" />
		</div>
	);
});

export default ThemeSwitcher;
