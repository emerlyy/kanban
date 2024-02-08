import { LazyMotion } from "framer-motion";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoardDisplay from "./features/boards/ActiveBoardDisplay";
import { useBoards } from "./features/boards/useBoards";
import { useLoadBoards } from "./features/boards/useLoadBoard";
import Sidebar from "./features/sidebar/Sidebar/Sidebar";
import Error from "./ui/Error/Error";
import Loading from "./ui/Loading/Loading";
import Logo from "./ui/Logo/Logo.tsx";

const loadFeatures = () => import("./features.ts").then((res) => res.default);

const App = () => {
	const [, , { status, error }] = useBoards();
	useLoadBoards();

	if (status === "loading") return <Loading />;
	if (status === "rejected") return <Error message={error || ""} />;

	return (
		<LazyMotion features={loadFeatures} strict>
			<main className={styles.app}>
				<Logo className={styles.logo} />
				<Header />
				<Sidebar />
				{status === "received" && (
					<div className={styles.board}>
						<ActiveBoardDisplay />
					</div>
				)}
			</main>
		</LazyMotion>
	);
};

export default App;
