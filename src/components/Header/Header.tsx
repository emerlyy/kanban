import icon from "@/assets/icon-vertical-ellipsis.svg";
import Button from "@/ui/Button/Button";
import Logo from "@/ui/Logo/Logo";
import Title from "@/ui/Title/Title";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Logo className={styles.logo} />
			<div className={styles.content}>
				<Title size="xl">Platform Launch</Title>
				<div className={styles.buttonsWrapper}>
					<Button color="primary" size="l">
						+ Add New Task
					</Button>
					<button className={styles.settings}>
						<img src={icon} alt="" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
