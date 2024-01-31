import { Board, LocalBoard } from "@/types";
import { nanoid } from "@reduxjs/toolkit";

type StackEl = { id?: string; [key: string]: StackEl[] | string | undefined };

export const extractLocalBoards = (boards: Board[]): LocalBoard[] => {
	return boards.map((board) => {
		const stack: Array<StackEl> = [board];
		while (stack.length) {
			const item = stack.pop();
			if (typeof item === "object") {
				item.id = nanoid();
				for (const key in item) {
					const value = item[key];
					if (Array.isArray(value)) {
						stack.push(...value);
					}
				}
			}
		}
		return board as LocalBoard;
	});
};
