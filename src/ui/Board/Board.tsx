import { Board as TBoard } from "@/types";
import Column from "@/ui/Column/Column";
import styles from "./Board.module.css";

type Props = {
	board: TBoard | null;
};

const Board = ({ board }: Props) => {
	return (
		<div className={styles.board}>
			{board?.columns.map((col, index) => {
				return (
					<Column
						key={`${col.name}-${index}`}
						name={col.name}
						tasks={col.tasks}
					/>
				);
			})}
		</div>
	);
};

export default Board;
