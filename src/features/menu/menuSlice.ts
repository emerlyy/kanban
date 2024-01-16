import { loadSidebarState } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
	isOpened: boolean;
}

const initialState: MenuState = {
	isOpened: false,
};

const savedState = loadSidebarState();

const menuSlice = createSlice({
	name: "@@menu",
	initialState: savedState ? { isOpened: savedState } : initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isOpened = !state.isOpened;
		},
	},
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
