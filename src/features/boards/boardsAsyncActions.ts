import { Api } from "@/api";
import { RootState } from "@/store";
import { LocalBoard } from "@/types";
import { extractLocalBoards } from "@/utils/extractLocalBoards";
import { loadLocalBoards } from "@/utils/localStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadBoards = createAsyncThunk<
  LocalBoard[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
    extra: { api: Api };
  }
>(
  "@@boards/loadBoards",
  async (_, { rejectWithValue, extra: { api } }) => {
    try {
      const boards = await api.getAllBoards();
      const savedBoards = loadLocalBoards();
      const localBoards = savedBoards || extractLocalBoards(boards);
      return localBoards;
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
