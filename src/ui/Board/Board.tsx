import { LocalBoard as TBoard } from "@/types";
import Column from "@/ui/Column/Column";
import NewColumnButton from "../../features/boards/NewColumnButton/NewColumnButton";
import EmptyScreen from "../EmptyScreen/EmptyScreen";
import styles from "./Board.module.css";

type Props = {
	board: TBoard | null;
};

const Board = ({ board }: Props) => {
	return (
		<div className={styles.board}>
			{board?.columns.length ? (
				<>
					{board?.columns.map((column) => {
						return <Column key={column.id} column={column} />;
					})}
					<NewColumnButton type="column" />
				</>
			) : (
				<EmptyScreen />
			)}
		</div>
	);
};

export default Board;
