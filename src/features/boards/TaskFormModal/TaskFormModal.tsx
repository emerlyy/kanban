import InputList, { ListInput } from "@/components/InputList/InputList";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Select, { StatusOption } from "@/ui/Select/Select";
import Textarea from "@/ui/Textarea/Textarea";
import Title from "@/ui/Title/Title";
import { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useBoards } from "../useBoards";
import styles from "./TaskFormModal.module.css";

export interface ITaskFormValues {
	name: string;
	description: string;
	subtasks: ListInput[];
	status: string;
}

type Props = {
	title: string;
	submiButtonText: string;
	onSubmit: SubmitHandler<ITaskFormValues>;
	initialName?: string;
	initialDescription?: string;
	initialSubtasks?: ListInput[];
} & Pick<ModalProps, "isOpened" | "onClose">;

const TaskFormModal = ({
	title,
	submiButtonText,
	onSubmit,
	isOpened,
	onClose,
	initialName,
	initialDescription,
	initialSubtasks,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<ITaskFormValues>({
		shouldUnregister: true,
		defaultValues: {
			name: initialName,
			description: initialDescription,
			subtasks: initialSubtasks,
		},
		resetOptions: {
			keepDefaultValues: true,
		},
	});

	useEffect(() => {
		reset({
			name: initialName,
			description: initialDescription,
			subtasks: initialSubtasks,
		});
	}, [reset, initialName, initialDescription, initialSubtasks]);

	const { activeBoard } = useBoards();

	const status: StatusOption[] = useMemo(
		() =>
			activeBoard?.columns.map((col) => ({
				value: col.id,
				label: col.name,
			})) || [],
		[activeBoard]
	);

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
					{...register("name", {
						required: {
							value: true,
							message: "Can’t be empty",
						},
					})}
					errorMessage={errors.name?.message}
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
					defaultValue={!!status.length ? status[0].value : undefined}
					render={({ field: { ref, value, onChange } }) => (
						<Select
						label="Status"
							ref={ref}
							options={status}
							value={status?.find((s) => s.value === value)}
							onChange={(val) => onChange(val?.value)}
							defaultValue={status && status[0]}
						/>
					)}
				/>
				<Button color="primary" size="s" type="submit">
					{submiButtonText}
				</Button>
			</form>
		</Modal>
	);
};

export default TaskFormModal;
