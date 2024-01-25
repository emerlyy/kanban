import { useAppSelector } from "@/hooks/reduxHooks";
import {
	selectActiveBoard,
	selectAllBoards,
	selectBoardsInfo,
} from "./boardsSelectors";

export const useBoards = () => {
	const activeBoard = useAppSelector(selectActiveBoard);
	const boards = useAppSelector(selectAllBoards);
	const { status, error, qty } = useAppSelector(selectBoardsInfo);
	return [activeBoard, boards, { status, error, qty }] as const;
};
