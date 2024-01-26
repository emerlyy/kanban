import { useAppSelector } from "@/hooks/reduxHooks";
import Board from "@/ui/Board/Board";
import { selectActiveBoard } from "./boardsSelectors";
import EmptyScreen from "@/ui/EmptyScreen/EmptyScreen";

const ActiveBoardDisplay = () => {
	const activeBoard = useAppSelector(selectActiveBoard);

	if (!activeBoard) return <EmptyScreen />;

	return <Board board={activeBoard} />;
};

export default ActiveBoardDisplay;
