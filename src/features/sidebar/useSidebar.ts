import { useAppDispatch } from "@/hooks/reduxHooks";
import { toggleSidebar } from "./sidebarSlice";
import { useSidebarState } from "./useSidebarState";

export const useSidebar = () => {
	const dispatch = useAppDispatch();
	const [, isSidebarOpened, isAboveMediumScreens] = useSidebarState();

	const toggle = () => dispatch(toggleSidebar());

	return [isAboveMediumScreens, isSidebarOpened, toggle] as const;
};
