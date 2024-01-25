import { useAppSelector } from "@/hooks/reduxHooks";
import Board from "@/ui/Board/Board";
import { selectActiveBoard } from "./boardsSelectors";

const ActiveBoardDisplay = () => {
	const activeBoard = useAppSelector(selectActiveBoard);

	return <Board board={activeBoard} />;
};

export default ActiveBoardDisplay;
