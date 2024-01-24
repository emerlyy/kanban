import { LocalBoard as TBoard } from "@/types";
import Column from "@/ui/Column/Column";
import NewColumnButton from "../../features/boards/NewColumnButton/NewColumnButton";
import styles from "./Board.module.css";

type Props = {
	board: TBoard | null;
};

const Board = ({ board }: Props) => {
	return (
		<div className={styles.board}>
			{board?.columns.map((column) => {
				return <Column key={column.id} column={column} />;
			})}
			<NewColumnButton />
		</div>
	);
};

export default Board;
