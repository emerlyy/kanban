import { useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoard from "./features/boards/ActiveBoard/ActiveBoard";
import { loadBoards } from "./features/boards/boardsAsyncActions";
import Menu from "./features/menu/Menu/Menu";
import ShowMenuLabel from "./features/menu/ShowMenuLabel/ShowMenuLabel";
import { selectMenuState } from "./features/menu/menuSelectors";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

const App = () => {
	const isMenuOpened = useAppSelector(selectMenuState);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadBoards());
	}, [dispatch]);

	return (
		<>
			{isMenuOpened && <Menu />}
			<main>
				<Header />
				<ShowMenuLabel />
				<div
					className={`${styles.boardWrapper} ${
						isMenuOpened ? styles.sidebarActive : ""
					}`}
				>
					<ActiveBoard />
				</div>
			</main>
		</>
	);
};

export default App;
