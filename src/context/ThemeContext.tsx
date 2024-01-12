import { Theme } from "@/types";
import { loadTheme, saveTheme } from "@/utils/localStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
	toggleTheme: () => void;
	theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {},
});

type ThemeProviderProps = {
	children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<ThemeContextType["theme"]>(
		loadTheme() || "light"
	);

	const themeValue: ThemeContextType = useMemo(
		() => ({
			theme,
			toggleTheme: () => {
				setTheme((prev) => (prev === "light" ? "dark" : "light"));
			},
		}),
		[theme]
	);

	useEffect(() => {
		document.body.dataset.theme = theme;
		saveTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
