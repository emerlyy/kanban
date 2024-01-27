import api from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./features/boards/boardsSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import { saveSidebarState } from "./utils/localStorage";

export const store = configureStore({
	reducer: {
		sidebar: sidebarReducer,
		boards: boardsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: { extraArgument: { api } },
		}),
});

store.subscribe(() => {
	saveSidebarState(store.getState().sidebar.isOpened);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
