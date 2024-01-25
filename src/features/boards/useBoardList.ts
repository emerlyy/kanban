import { useAppDispatch } from "@/hooks/reduxHooks";
import { LocalBoard } from "@/types";
import { setActiveBoard } from "./boardsSlice";
import { useBoards } from "./useBoards";

export const useBoardList = () => {
	const dispatch = useAppDispatch();

	const [activeBoard, boards] = useBoards();

	const changeBoard = (board: LocalBoard) => () => {
		if (board.id !== activeBoard?.id) {
			dispatch(setActiveBoard(board.id));
		}
	};

	return [boards, activeBoard, changeBoard] as const;
};
