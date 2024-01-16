import { useAppSelector } from "@/hooks/reduxHooks";
import { selectActiveBoard, selectAllBoards } from "./boardSelectors";

export const useBoards = () => {
	const allBoards = useAppSelector(selectAllBoards);
	const activeBoard = useAppSelector(selectActiveBoard);

	return {
		boards: allBoards,
		activeBoard,
	};
};
