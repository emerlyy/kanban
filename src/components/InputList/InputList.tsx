import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Text from "@/ui/Text/Text";
import {
	Control,
	FieldErrors,
	FieldValues,
	UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import styles from "./InputList..module.css";

type Props<T extends FieldValues> = {
	label?: string;
	register: UseFormRegister<T>;
	control: Control<T>;
	errors: FieldErrors<T>;
	name: string;
};

const InputList = <T extends FieldValues>({
	label,
	control,
	errors,
	name,
	register,
}: Props<T>) => {
	const { fields, append, remove } = useFieldArray({
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
					<Input
						removable
						key={field.id}
						{...register(`${name}.${index}.value` as any, {
							required: { value: true, message: "Can’t be empty" },
						})}
						onRemove={() => remove(index)}
						//@ts-ignore
						errorMessage={errors[name]?.[index]?.value.message}
					/>
				))}
				<Button
					type="button"
					color="secondary"
					onClick={() => {
						//@ts-ignore
						append({ value: "" });
					}}
				>
					+ Add New Column
				</Button>
			</div>
		</div>
	);
};

export default InputList;
