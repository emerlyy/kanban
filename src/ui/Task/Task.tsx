import EditTaskModal from "@/features/boards/EditTaskModal/EditTaskModal";
import { useModal } from "@/hooks/useModal";
import { LocalTask } from "@/types";
import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./Task.module.css";

type Props = {
	task: LocalTask;
};

const Task = ({ task }: Props) => {
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
			<EditTaskModal isOpened={isOpened} onClose={closeModal} task={task} />
		</>
	);
};

export default Task;
