import { useEffect } from "react";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import { loadBoards } from "./features/boards/boardsAsyncActions";
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
			</main>
		</>
	);
};

export default App;
