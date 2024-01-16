import { Board, LocalBoard } from "@/types";
import { nanoid } from "@reduxjs/toolkit";

export const extractLocalBoards = (boards: Board[]): LocalBoard[] => {
	return boards.map((board) => {
		const stack: Array<any> = [board];
		while (stack.length) {
			const item = stack.pop();
			if (typeof item === "object") {
				item.id = nanoid();
				for (const key in item) {
					if (Array.isArray(item[key])) {
						stack.push(...item[key]);
					}
				}
			}
		}
		return board as LocalBoard;
	});
};
