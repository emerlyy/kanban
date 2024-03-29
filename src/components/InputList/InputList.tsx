/* eslint-disable  @typescript-eslint/no-explicit-any */
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Text from "@/ui/Text/Text";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import {
	Control,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import styles from "./InputList..module.css";

export type ListInput = { value: string; inputId: ReturnType<typeof nanoid> };

type Props = {
	label?: string;
	inputPlaceholder?: string;
	name: string;
	buttonText: string;
	control: Control<any>;
	register: UseFormRegister<any>;
	errors: FieldErrors<any>;
};

const InputList = ({
	label,
	inputPlaceholder,
	control,
	name,
	buttonText,
	register,
	errors,
}: Props) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	return (
		<div>
			<Text
				tag="div"
				color="label"
				size="m"
				weight="700"
				className={styles.inputListTitle}
			>
				{label}
			</Text>
			<div className={styles.inputList}>
				{fields.map((field, index) => (
					<React.Fragment key={field.id}>
						<Input
							autoComplete="off"
							placeholder={inputPlaceholder}
							removable
							{...register(`${name}.${index}.value`, {
								required: {
									value: true,
									message: "Can’t be empty",
								},
							})}
							onRemove={() => remove(index)}
							// @ts-expect-error errors has any type
							errorMessage={errors[name]?.[index]?.value?.message}
						/>
						<div
							style={{ display: "none" }}
							{...register(`${name}.${index}.inputId`)}
						/>
					</React.Fragment>
				))}
				<Button
					type="button"
					color="secondary"
					onClick={() => {
						append({ value: "", inputId: nanoid() });
					}}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
};

export default InputList;
