import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
	isOpened: boolean;
}

const initialState: MenuState = {
	isOpened: false,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		toggleMenu: (state) => {
			state.isOpened = !state.isOpened;
		},
	},
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
