import { Theme } from "@/types";

export const saveTheme = (theme: Theme) => {
	localStorage.setItem("theme", theme);
};

export const loadTheme = (): Theme | null => {
	const theme = localStorage.getItem("theme");
	if (theme) return theme as Theme;
	return null;
};
