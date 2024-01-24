import TaskModal from "@/features/boards/modals/TaskModal/TaskModal";
import { useModal } from "@/hooks/useModal";
import { LocalColumn, LocalTask } from "@/types";
import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./Task.module.css";

type Props = {
	task: LocalTask;
	columnId: LocalColumn["id"];
};

const Task = ({ task, columnId }: Props) => {
	const [isOpened, openModal, closeModal] = useModal();
	
	const completedSubtasks = task.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;

	return (
		<>
			<button className={styles.taskBody} onClick={openModal}>
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
				initialStatusId={columnId}
			/>
		</>
	);
};

export default Task;
