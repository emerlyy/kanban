import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoardDisplay from "./features/boards/ActiveBoardDisplay";
import { useBoards } from "./features/boards/useBoards";
import { useLoadBoards } from "./features/boards/useLoadBoard";
import Sidebar from "./features/sidebar/Sidebar/Sidebar";
import { useSidebarState } from "./features/sidebar/useSidebarState";
import Error from "./ui/Error/Error";
import Loading from "./ui/Loading/Loading";

const App = () => {
	const [, , { status, error }] = useBoards();
	useLoadBoards();

	const [isSidebarVisible] = useSidebarState();

	return (
		<main>
			{status === "loading" && <Loading />}
			{status === "rejected" && <Error message={error || ""} />}
			{status === "received" && (
				<>
					<Sidebar />
					<Header />

					<div
						className={`${styles.boardWrapper} ${
							isSidebarVisible ? styles.sidebarActive : ""
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
