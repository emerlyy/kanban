import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { LocalTask } from "@/types";
import { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { editTask } from "./boardsSlice";
import {
	ITaskFormValues,
	TaskFormModalProps,
} from "./modals/TaskFormModal/TaskFormModal";
import { useBoards } from "./useBoards";

type ReturnType = {
	openModal: () => void;
	modalProps: Omit<TaskFormModalProps, "submitButtonText" | "title">;
};

export const useEditTaskModal = (
	task: LocalTask,
	initialStatusId: string
): ReturnType => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const [activeBoard] = useBoards();

	const initialSubtasks = useMemo(() => task.subtasks, [task]);

	const onSubmit: SubmitHandler<ITaskFormValues> = (data) => {
		const newSubtasks = data.subtasks
			? data.subtasks.map((subtask) => ({
					title: subtask.value,
					id: subtask.inputId,
					isCompleted:
						initialSubtasks.find((isubtask) => isubtask.id === subtask.inputId)
							?.isCompleted || false,
			  }))
			: [];
		if (activeBoard) {
			dispatch(
				editTask({
					boardId: activeBoard?.id,
					columnId: initialStatusId,
					taskId: task.id,
					newTask: {
						id: task.id,
						title: data.title,
						description: data.description,
						status: data.status.label,
						subtasks: newSubtasks,
					},
					newColumnId: data.status.value,
				})
			);
		}

		closeModal();
	};

	return {
		openModal,
		modalProps: {
			isOpened,
			onClose: closeModal,
			onSubmit,
			initialTitle: task.title,
			initialDescription: task.description,
			initialSubtasks: task.subtasks.map((subtask) => ({
				value: subtask.title,
				inputId: subtask.id,
			})),
			initialStatus: {
				label: task.status,
				value: initialStatusId,
			},
		},
	};
};
