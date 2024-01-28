import NewColumnButton from "@/features/boards/NewColumnButton/NewColumnButton";
import { useBoards } from "@/features/boards/useBoards";
import Title from "../Title/Title";
import styles from "./EmptyScreen.module.css";

const EmptyScreen = () => {
	const [, , { qty }] = useBoards();
	return (
		<div className={styles.emptyScreen}>
			<Title tag="h1" color="gray" size="l" className={styles.message}>
				{qty
					? "This board is empty. Create a new column to get started."
					: "There are no boards available. Create a new board to get started"}
			</Title>
			<NewColumnButton action={qty ? "edit" : "new"} />
		</div>
	);
};

export default EmptyScreen;
