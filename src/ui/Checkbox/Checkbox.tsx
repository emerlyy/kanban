import React from "react";
import Text from "../Text/Text";
import styles from "./Checkbox.module.css";
type Props = {
	label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, ...props }: Props) => {
	return (
		<label className={styles.checkboxWrapper}>
			<Text tag="span" size="m" weight="700" color="primary">
				{label}
			</Text>
			<input type="checkbox" {...props} />
			<span className={styles.checkmark}></span>
		</label>
	);
};

export default Checkbox;
