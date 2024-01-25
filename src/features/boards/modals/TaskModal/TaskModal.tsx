import DeleteModal from "@/components/DeleteModal/DeleteModal";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import ActionPopup from "@/features/boards/ActionPopup/ActionPopup";
import {
	deleteTask,
	moveTask,
	toggleSubtask,
} from "@/features/boards/boardsSlice";
import { useBoards } from "@/features/boards/useBoards";
import { useDeleteModal } from "@/features/boards/useDeleteModal";
import { useEditTaskModal } from "@/features/boards/useEditTaskModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { LocalTask } from "@/types";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Select, { SelectOption } from "@/ui/Select/Select";
import Text from "@/ui/Text/Text";
import Title from "@/ui/Title/Title";
import { useState } from "react";
import TaskFormModal from "../TaskFormModal/TaskFormModal";
import styles from "./TaskModal.module.css";

type Props = Pick<ModalProps, "isOpened" | "onClose"> & {
	task: LocalTask;
	initialStatusId: SelectOption["value"];
};

const TaskModal = ({ isOpened, onClose, task, initialStatusId }: Props) => {
	const [statusId, setStatusId] = useState(initialStatusId);

	const [activeBoard] = useBoards();

	const dispatch = useAppDispatch();

	const totalSubtasks = task.subtasks.length;
	const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

	const options = activeBoard?.columns.map((c) => ({
		value: c.id,
		label: c.name,
	}));

	const handleClose = () => {
		if (activeBoard && initialStatusId !== statusId) {
			dispatch(
				moveTask({
					boardId: activeBoard.id,
					oldColumnId: initialStatusId,
					nextColumnId: statusId,
					taskId: task.id,
				})
			);
		}

		onClose();
	};

	const { openModal: openEditTaskModal, modalProps: editTaskModalProps } =
		useEditTaskModal(task, initialStatusId);

	const { openModal: openDeleteModal, modalProps: deleteModalProps } =
		useDeleteModal(
			deleteTask({
				boardId: activeBoard!.id,
				columnId: initialStatusId,
				taskId: task.id,
			})
		);

	const isInnerModalOpened =
		editTaskModalProps.isOpened || deleteModalProps.isOpened;

	const isModalOpened = isOpened && !isInnerModalOpened;
	return (
		<>
			<Modal
				isOpened={isModalOpened}
				onClose={handleClose}
				closeOnOutsideClick={!isInnerModalOpened}
			>
				<div className={styles.modalForm}>
					<div className={styles.titleWrapper}>
						<Title tag="h2" size="l" className={styles.title}>
							{task.title}
						</Title>
						<ActionPopup
							type="task"
							position="center"
							onEdit={openEditTaskModal}
							onDelete={openDeleteModal}
						/>
					</div>
					{task.description && (
						<Text tag="p" size="l" color="gray">
							{task.description}
						</Text>
					)}
					<div>
						<Text tag="div" color="label" size="m" weight="700">
							Subtasks ({completedSubtasks} of {totalSubtasks})
						</Text>
						<ul className={styles.subtasksList}>
							{task.subtasks.map((subtask) => (
								<li key={subtask.id}>
									<Checkbox
										label={subtask.title}
										checked={subtask.isCompleted}
										onChange={() => dispatch(toggleSubtask(subtask.id))}
									/>
								</li>
							))}
						</ul>
					</div>
					<Select
						label="Current Status"
						options={options}
						value={options?.find((option) => option.value === statusId)}
						onChange={(val) => {
							if (val) {
								setStatusId(val.value);
							}
						}}
					/>
				</div>
			</Modal>
			<TaskFormModal
				title="Edit Task"
				submitButtonText="Edit Task"
				{...editTaskModalProps}
			/>
			<DeleteModal type="task" name={task.title} {...deleteModalProps} />
		</>
	);
};

export default TaskModal;
