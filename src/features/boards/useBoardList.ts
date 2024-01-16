import { useAppDispatch } from "@/hooks/reduxHooks";
import { Board } from "@/types";
import { setActiveBoard } from "./boardsSlice";
import { useBoards } from "./useBoards";

export const useBoardList = () => {
	const dispatch = useAppDispatch();

	const { boards, activeBoard } = useBoards();

	const changeBoard = (board: Board) => () => {
		if (board !== activeBoard) {
			dispatch(setActiveBoard(board));
		}
	};

	return [boards, activeBoard, changeBoard] as const;
};
