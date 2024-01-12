import data from "@/data/data.json";
import { Board } from "@/types";

export type Api = {
	getAllBoards: () => Promise<Board[]>;
};

const client: Api = {
	getAllBoards: async (): Promise<Board[]> => {
		return await new Promise((resolve) =>
			setTimeout(() => resolve(data.boards as Board[]), 3000)
		);
	},
};

export default client;
