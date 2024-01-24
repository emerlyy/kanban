import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoardDisplay from "./features/boards/ActiveBoardDisplay";
import { useLoadBoards } from "./features/boards/useLoadBoard";
import Menu from "./features/menu/Menu/Menu";
import ShowMenuLabel from "./features/menu/ShowMenuLabel/ShowMenuLabel";
import { selectMenuState } from "./features/menu/menuSelectors";
import { useAppSelector } from "./hooks/reduxHooks";

const App = () => {
	const isMenuOpened = useAppSelector(selectMenuState);

	useLoadBoards();

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
					<ActiveBoardDisplay />
				</div>
			</main>
		</>
	);
};

export default App;
