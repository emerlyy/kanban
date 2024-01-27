import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { selectSidebarState } from "./sidebarSelectors";

export const useSidebarState = () => {
	const isSidebarOpened = useAppSelector(selectSidebarState);

	const isAboveMediumScreens = useMediaQuery("(min-width: 700px)");

	const isSidebarVisible = isSidebarOpened && isAboveMediumScreens;

  return [isSidebarVisible, isSidebarOpened, isAboveMediumScreens];
};
