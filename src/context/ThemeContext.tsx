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

const setInitialState = () => {
	let currentTheme: Theme = "light";

	if (typeof window !== "undefined" && window.localStorage) {
		const storageTheme = loadTheme();
		currentTheme = storageTheme ? storageTheme : "light";
	}

	return currentTheme;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] =
		useState<ThemeContextType["theme"]>(setInitialState);

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
