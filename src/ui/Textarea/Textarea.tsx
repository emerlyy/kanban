import React, { forwardRef } from "react";
import Text from "../Text/Text";
import styles from "./Textarea.module.css";

type TextareaProps = {
	label?: string;
	className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, className, ...props }, ref) => {
		const textareaStyles = `${styles.textarea}${
			className ? ` ${className}` : ""
		}`;

		return (
			<label className={styles.textareaWrapper}>
				{label && (
					<Text tag="span" size="m" color="label" weight="700">
						{label}
					</Text>
				)}
				<textarea
					ref={ref}
					rows={4}
					className={textareaStyles}
					{...props}
				></textarea>
			</label>
		);
	}
);
export default Textarea;
