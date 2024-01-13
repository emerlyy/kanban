import { useAppSelector } from "@/hooks/reduxHooks";
import Board from "@/ui/Board/Board";
import { selectActiveBoard } from "../boardSelectors";

const ActiveBoard = () => {
	const activeBoard = useAppSelector(selectActiveBoard);

	return <Board board={activeBoard} />;
};

export default ActiveBoard;
