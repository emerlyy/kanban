import { LocalBoard, Theme } from "@/types";

export const saveTheme = (theme: Theme) => {
  localStorage.setItem("theme", theme);
};

export const loadTheme = (): Theme | null => {
  const theme = localStorage.getItem("theme");
  if (theme) return theme as Theme;
  return null;
};

export const saveSidebarState = (isOpened: boolean) => {
  localStorage.setItem("isSidebarOpened", JSON.stringify(isOpened));
};

export const loadSidebarState = (): boolean | null => {
  const isOpened = localStorage.getItem("isSidebarOpened");
  if (isOpened) return JSON.parse(isOpened);
  return null;
};

export const saveLocalBoards = (boards: LocalBoard[]) => {
  localStorage.setItem("boards", JSON.stringify(boards));
};

export const loadLocalBoards = (): LocalBoard[] | null => {
  const boards = localStorage.getItem("boards");
  if (boards) return JSON.parse(boards) as LocalBoard[];
  return null;
};
