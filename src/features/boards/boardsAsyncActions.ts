import { Api } from "@/api";
import { RootState } from "@/store";
import { Board } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadBoards = createAsyncThunk<
	Board[],
	undefined,
	{
		state: RootState;
		rejectValue: string;
		extra: { api: Api };
	}
>(
	"boards/loadBoards",
	async (_, { rejectWithValue, extra: { api } }) => {
		try {
			return await api.getAllBoards();
		} catch (err) {
			if (err instanceof Error) return rejectWithValue(err.message);
			return rejectWithValue("Cannot fetch boards");
		}
	},
	{
		condition: (_, { getState }) => {
			const { status } = getState().boards;

			if (status === "loading") return false;
		},
	}
);
