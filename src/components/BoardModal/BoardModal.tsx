import InputList from "@/components/InputList/InputList";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Title from "@/ui/Title/Title";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./BoardModal.module.css";

export interface IFormValues {
	name: string;
	columns: { value: string }[];
}

type Props = {
	title: string;
	submiButtonText: string;
	onSubmit: SubmitHandler<IFormValues>;
} & Pick<ModalProps, "isOpened" | "onClose">;

const BoardModal = ({
	title,
	submiButtonText,
	onSubmit,
	isOpened,
	onClose,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<IFormValues>({
		shouldUnregister: true,
	});

	return (
		<Modal isOpened={isOpened} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
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

export default BoardModal;
