import SettingsIcon from "@/assets/icon-vertical-ellipsis.svg";
import Modal, { ModalProps } from "@/components/Modal/Modal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { LocalTask } from "@/types";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Select from "@/ui/Select/Select";
import Text from "@/ui/Text/Text";
import Title from "@/ui/Title/Title";
import { useState } from "react";
import { moveTask, toggleSubtask } from "../boardsSlice";
import { useBoards } from "../useBoards";
import styles from "./EditTaskModal.module.css";

type Props = Pick<ModalProps, "isOpened" | "onClose"> & {
	task: LocalTask;
};

const EditTaskModal = ({ isOpened, onClose, task }: Props) => {
	const initialStatus = task.status;
	const [status, setStatus] = useState(initialStatus);

	const { activeBoard } = useBoards();

	const dispatch = useAppDispatch();

	const totalSubtasks = task.subtasks.length;
	const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

	const options = activeBoard?.columns.map((c) => ({
		value: c.id,
		label: c.name,
	}));

	const handleClose = () => {
		const oldColumnId = activeBoard?.columns.find(
			(col) => col.name === initialStatus
		)?.id;

		const nextColumnId = activeBoard?.columns.find(
			(col) => col.name === status
		)?.id;

		if (activeBoard && oldColumnId && nextColumnId) {
			dispatch(
				moveTask({
					boardId: activeBoard.id,
					oldColumnId,
					nextColumnId,
					taskId: task.id,
				})
			);
		}

		onClose && onClose();
	};
	return (
		<Modal isOpened={isOpened} onClose={handleClose}>
			<div className={styles.modalForm}>
				<div className={styles.titleWrapper}>
					<Title tag="h2" size="l">
						{task.title}
					</Title>
					<button className={styles.settings}>
						<img src={SettingsIcon} alt="" />
					</button>
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
					value={options?.find((s) => s.label === status)}
					onChange={(val) => {
						if (val) {
							setStatus(val.label);
						}
					}}
				/>
			</div>
		</Modal>
	);
};

export default EditTaskModal;
