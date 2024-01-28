import InputList, { ListInput } from "@/components/InputList/InputList";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Select, { SelectOption } from "@/ui/Select/Select";
import Textarea from "@/ui/Textarea/Textarea";
import Title from "@/ui/Title/Title";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useBoards } from "../../useBoards";
import styles from "./TaskFormModal.module.css";

export interface ITaskFormValues {
	title: string;
	description: string;
	subtasks: ListInput[];
	status: SelectOption;
}

export type TaskFormModalProps = {
	title: string;
	submitButtonText: string;
	onSubmit: SubmitHandler<ITaskFormValues>;
	initialTitle?: string;
	initialDescription?: string;
	initialSubtasks?: ListInput[];
	initialStatus?: SelectOption;
} & Pick<ModalProps, "isOpened" | "onClose">;

const TaskFormModal = ({
	title,
	submitButtonText,
	onSubmit,
	isOpened,
	onClose,
	initialTitle,
	initialDescription,
	initialSubtasks,
	initialStatus,
}: TaskFormModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<ITaskFormValues>({
		shouldUnregister: true,
		defaultValues: useMemo(
			() => ({
				title: initialTitle || "",
				description: initialDescription || "",
				subtasks: initialSubtasks || [],
				status: initialStatus || { label: "", value: "" },
			}),
			[initialTitle, initialDescription, initialSubtasks, initialStatus]
		),
		resetOptions: {
			keepDefaultValues: true,
		},
	});

	useEffect(() => {
		reset({
			title: initialTitle || "",
			description: initialDescription || "",
			subtasks: initialSubtasks || [],
			status: initialStatus || { label: "", value: "" },
		});
	}, [reset, initialTitle, initialDescription, initialSubtasks, initialStatus]);

	const [activeBoard] = useBoards();

	const options = activeBoard?.columns.map((col) => ({
		value: col.id,
		label: col.name,
	}));

	return (
		<Modal isOpened={isOpened} onClose={onClose}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.modalForm}
				autoComplete="off"
			>
				<Title tag="h2" size="l">
					{title}
				</Title>
				<Input
					label="Name"
					placeholder="e.g. Take coffee break"
					{...register("title", {
						required: {
							value: true,
							message: "Can’t be empty",
						},
					})}
					errorMessage={errors.title?.message}
				/>
				<Textarea
					label="Description"
					placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
					{...register("description")}
				/>
				<InputList
					name="subtasks"
					label="Subtasks"
					buttonText="+ Add New Subtask"
					control={control}
					register={register}
					errors={errors}
				/>
				<Controller
					control={control}
					name="status"
					defaultValue={initialStatus}
					render={({ field: { ref, value, onChange } }) => (
						<Select
							label="Status"
							ref={ref}
							options={options}
							value={options?.find((option) => option.value === value?.value)}
							onChange={(val) => onChange(val)}
						/>
					)}
				/>
				<Button color="primary" size="s" type="submit">
					{submitButtonText}
				</Button>
			</form>
		</Modal>
	);
};

export default TaskFormModal;
