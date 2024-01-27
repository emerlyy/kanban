import { loadSidebarState } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
	isOpened: boolean;
}

const initialState: SidebarState = {
	isOpened: false,
};

const savedState = loadSidebarState();

const menuSlice = createSlice({
	name: "@@menu",
	initialState: savedState ? { isOpened: savedState } : initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isOpened = !state.isOpened;
		},
	},
});

export const { toggleSidebar } = menuSlice.actions;

export default menuSlice.reducer;
