import EyeIcon from "@/assets/icon-show-sidebar.svg";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { toggleMenu } from "../menuSlice";
import styles from "./ShowMenuLabel.module.css";

const ShowMenuLabel = () => {
	const dispatch = useAppDispatch();

	const openMenu = () => {
		dispatch(toggleMenu());
	};

	return (
		<button className={styles.menuLabel} onClick={openMenu}>
			<img src={EyeIcon} alt="Show Sidebar" />
		</button>
	);
};

export default ShowMenuLabel;
