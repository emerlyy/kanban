import { LazyMotion, m } from "framer-motion";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import ActiveBoardDisplay from "./features/boards/ActiveBoardDisplay";
import { useBoards } from "./features/boards/useBoards";
import { useLoadBoards } from "./features/boards/useLoadBoard";
import Sidebar from "./features/sidebar/Sidebar/Sidebar";
import { useSidebarState } from "./features/sidebar/useSidebarState";
import Error from "./ui/Error/Error";
import Loading from "./ui/Loading/Loading";

const variants = {
	sidebarClosed: {
		paddingLeft: 0,
	},
	sidebarActive: {
		paddingLeft: 300,
	},
};

const loadFeatures = () => import("./features.ts").then((res) => res.default);

const App = () => {
	const [, , { status, error }] = useBoards();
	useLoadBoards();

	const [isSidebarVisible] = useSidebarState();

	if (status === "loading") return <Loading />;
	if (status === "rejected") return <Error message={error || ""} />;

	return (
		<LazyMotion features={loadFeatures} strict>
			<Sidebar />
			<Header />
			<m.main
				className={styles.app}
				variants={variants}
				animate={isSidebarVisible ? "sidebarActive" : "sidebarClosed"}
				transition={{ duration: 0.2 }}
			>
				{status === "received" && <ActiveBoardDisplay />}
			</m.main>
		</LazyMotion>
	);
};

export default App;
