import InputList, { ListInput } from "@/components/InputList/InputList";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Title from "@/ui/Title/Title";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./BoardFormModal.module.css";

export interface IBoardFormValues {
	name: string;
	columns: ListInput[];
}

type Props = {
	title: string;
	submiButtonText: string;
	onSubmit: SubmitHandler<IBoardFormValues>;
	initialName?: string;
	initialColumns?: ListInput[];
} & Pick<ModalProps, "isOpened" | "onClose">;

const BoardFormModal = ({
	title,
	submiButtonText,
	onSubmit,
	isOpened,
	onClose,
	initialName,
	initialColumns,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<IBoardFormValues>({
		shouldUnregister: true,
		defaultValues: useMemo(
			() => ({ name: initialName || "", columns: initialColumns || [] }),
			[initialName, initialColumns]
		),
		resetOptions: {
			keepDefaultValues: true,
		},
	});

	useEffect(() => {
		reset({ name: initialName, columns: initialColumns });
	}, [initialColumns, initialName]);

	return (
		<Modal isOpened={isOpened} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm} autoComplete="off">
				<Title tag="h2" size="l">
					{title}
				</Title>
				<div>
					<Input
						label="Name"
						placeholder="e.g. Web Design"
						{...register("name", {
							required: {
								value: true,
								message: "Can’t be empty",
							},
						})}
						errorMessage={errors.name?.message}
					/>
				</div>
				<InputList
					name="columns"
					label="Columns"
					control={control}
					register={register}
					errors={errors}
				/>
				<Button color="primary" size="s" type="submit">
					{submiButtonText}
				</Button>
			</form>
		</Modal>
	);
};

export default BoardFormModal;
