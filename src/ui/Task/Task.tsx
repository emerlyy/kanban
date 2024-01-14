import { Task as TTask } from "@/types";
import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./Task.module.css";

type Props = Pick<TTask, "title" | "subtasks">;

const Task = ({ title, subtasks }: Props) => {
	const completedSubtasks = subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;
	return (
		<button className={styles.taskBody}>
			<Title tag="h3" color="primary" size="m" className={styles.taskTitle}>
				{title}
			</Title>
			<Text tag='div' color="gray" weight="700">
				{completedSubtasks} of {subtasks.length} subtasks
			</Text>
		</button>
	);
};

export default Task;
