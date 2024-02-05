import data from "@/data/data.json";
import { Board } from "@/types";

export type Api = {
	getAllBoards: () => Promise<Board[]>;
};

const getRandom = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const client: Api = {
	getAllBoards: async (): Promise<Board[]> => {
		return await new Promise((resolve) =>
			setTimeout(() => resolve(data.boards as Board[]), getRandom(300, 1500))
		);
	},
};

export default client;
