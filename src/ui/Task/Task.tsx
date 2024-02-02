import TaskModal from "@/features/boards/modals/TaskModal/TaskModal";
import { useModal } from "@/hooks/useModal";
import { LocalColumn, LocalTask } from "@/types";
import React, { useEffect } from "react";
import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./Task.module.css";

export type TaskProps = {
	task: LocalTask;
	columnId?: LocalColumn["id"];
	onModalToggle?: (isOpened: boolean) => void;
	className?: string;
};

const Task = React.memo(
	({ task, columnId, onModalToggle, className }: TaskProps) => {
		const [isOpened, openModal, closeModal] = useModal();

		const completedSubtasks = task.subtasks.filter(
			(subtask) => subtask.isCompleted
		).length;

		useEffect(() => {
			onModalToggle && onModalToggle(isOpened);
		}, [isOpened]);

		return (
			<>
				<button
					className={`${styles.taskBody}${className ? ` ${className}` : ""}`}
					onClick={openModal}
				>
					<Title tag="h3" color="primary" size="m" className={styles.taskTitle}>
						{task.title}
					</Title>
					<Text tag="div" color="gray" weight="700">
						{completedSubtasks} of {task.subtasks.length} subtasks
					</Text>
				</button>
				<TaskModal
					isOpened={isOpened}
					onClose={closeModal}
					task={task}
					initialStatusId={columnId || ""}
				/>
			</>
		);
	}
);

export default Task;
