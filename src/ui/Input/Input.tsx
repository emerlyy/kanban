import React, { forwardRef } from "react";
import Text from "../Text/Text";
import styles from "./Input.module.css";

interface DefaultInput {
	removable?: false;
	onRemove?: undefined;
}

interface RemovableInput {
	removable?: true;
	onRemove?: () => void;
}

type InputProps = {
	label?: string;
	errorMessage?: string;
	className?: string;
} & (DefaultInput | RemovableInput) &
	React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, errorMessage, className, removable, onRemove, ...props },
		ref
	) => {
		const hasError = !!errorMessage?.length;

		const inputStyles = `${styles.inputField}${
			hasError ? ` ${styles.error}` : ""
		}${className ? ` ${className}` : ""}`;

		return (
			<label className={styles.inputBody}>
				{label && (
					<Text tag="span" size="m" color="label" weight="700">
						{label}
					</Text>
				)}
				<div className={styles.inputWrapper}>
					<div className={styles.input}>
						<input ref={ref} type="text" className={inputStyles} {...props} />
						{hasError && (
							<Text
								tag="strong"
								size="l"
								weight="500"
								color="warning"
								className={styles.errorMessage}
							>
								{errorMessage}
							</Text>
						)}
					</div>
					{removable && (
						<button onClick={onRemove} className={styles.removeButton}>
							<DeleteIcon />
						</button>
					)}
				</div>
			</label>
		);
	}
);

const DeleteIcon = () => (
	<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
		<g fill="#828FA3" fillRule="evenodd">
			<path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
			<path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
		</g>
	</svg>
);

export default Input;
