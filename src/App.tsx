import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoardDisplay from "./features/boards/ActiveBoardDisplay";
import { useBoards } from "./features/boards/useBoards";
import { useLoadBoards } from "./features/boards/useLoadBoard";
import Menu from "./features/menu/Menu/Menu";
import ShowMenuLabel from "./features/menu/ShowMenuLabel/ShowMenuLabel";
import { selectMenuState } from "./features/menu/menuSelectors";
import { useAppSelector } from "./hooks/reduxHooks";
import Error from "./ui/Error/Error";
import Loading from "./ui/Loading/Loading";

const App = () => {
	const isMenuOpened = useAppSelector(selectMenuState);
	const [, , { status, error }] = useBoards();
	useLoadBoards();

	return (
		<main>
			{status === "loading" && <Loading />}
			{status === "rejected" && <Error message={error || ""} />}
			{status === "received" && (
				<>
					{isMenuOpened && <Menu />}
					<Header />
					<ShowMenuLabel />
					<div
						className={`${styles.boardWrapper} ${
							isMenuOpened ? styles.sidebarActive : ""
						}`}
					>
						<ActiveBoardDisplay />
					</div>
				</>
			)}
		</main>
	);
};

export default App;
