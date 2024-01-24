import { useAppDispatch } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { loadBoards } from "./boardsAsyncActions";

export const useLoadBoards = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadBoards());
	}, [dispatch]);
};
