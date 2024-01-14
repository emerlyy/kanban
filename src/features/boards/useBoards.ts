import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Board } from "@/types";
import { selectActiveBoard, selectAllBoards } from "./boardSelectors";
import { setActiveBoard } from "./boardsSlice";

export const useBoards = () => {
	const dispatch = useAppDispatch();

	const boards = useAppSelector(selectAllBoards);
	const activeBoard = useAppSelector(selectActiveBoard);

	const changeBoard = (board: Board) => () => {
		if (board !== activeBoard) {
			dispatch(setActiveBoard(board));
		}
	};

	return [boards, activeBoard, changeBoard] as const;
};
