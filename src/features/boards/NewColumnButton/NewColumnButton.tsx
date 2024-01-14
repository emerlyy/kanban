import { useAppDispatch } from "@/hooks/reduxHooks";
import Title from "../../../ui/Title/Title";
import styles from "./NewColumnButton.module.css";

const NewColumnButton = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {};
	return (
		<button className={styles.newColumnButton}>
			<Title tag="span" size="xl" color="gray">
				+ New Column
			</Title>
		</button>
	);
};

export default NewColumnButton;
