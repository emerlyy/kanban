import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Text from "@/ui/Text/Text";
import { nanoid } from "@reduxjs/toolkit";
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import styles from "./InputList..module.css";

export type ListInput = { value: string; inputId: ReturnType<typeof nanoid> };

type Props = {
	label?: string;
	register: UseFormRegister<any>;
	control: Control<any>;
	errors?: FieldErrors<any>;
	name: string;
};

const InputList = ({ label, control, errors, name, register }: Props) => {
	const { fields, append, remove } = useFieldArray<
		any,
		string,
		"id" | "value" | "inputId"
	>({
		control,
		//@ts-ignore
		name: "columns",
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
					<Controller
						name={`${name}.${index}`}
						key={field.id}
						control={control}
						render={({ field: { value, onChange, ...rest } }) => (
							<Input
								autoComplete="off"
								removable
								value={value.value}
								onChange={(event) =>
									onChange({
										value: event.target.value,
										inputId: field.inputId,
									})
								}
								onRemove={() => remove(index)}
								{...rest}
								//@ts-ignore
								errorMessage={errors[name]?.[index]?.value.message}
							/>
						)}
					/>
				))}
				<Button
					type="button"
					color="secondary"
					onClick={() => {
						//@ts-ignore
						append({ value: "", inputId: nanoid() });
					}}
				>
					+ Add New Column
				</Button>
			</div>
		</div>
	);
};

export default InputList;
