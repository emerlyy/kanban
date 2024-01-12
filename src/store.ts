import api from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./features/boards/boardsSlice";
import menuReducer from "./features/menu/menuSlice";

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		boards: boardsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: { extraArgument: {api} },
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
