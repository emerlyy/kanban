import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { LocalTask } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import { SubmitHandler } from "react-hook-form";
import { addTask, editTask } from "./boardsSlice";
import {
	ITaskFormValues,
	TaskFormModalProps,
} from "./modals/TaskFormModal/TaskFormModal";
import { useBoards } from "./useBoards";

type NewTaskProps = {
	type: "new";
};

type EditTaskProps = {
	type: "edit";
	task: LocalTask;
	initialStatusId: string;
};

type ArgumentType = NewTaskProps | EditTaskProps;

type ReturnType = {
	openModal: () => void;
	modalProps: Omit<TaskFormModalProps, "submitButtonText" | "title">;
};

export const useTaskModal = (props: ArgumentType): ReturnType => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const [activeBoard] = useBoards();

	const onSubmit: SubmitHandler<ITaskFormValues> = (data) => {
		closeModal();
		if (!activeBoard) return;

		switch (props.type) {
			case "new": {
				const subtasks = data.subtasks
					? data.subtasks.map((subtask) => ({
							id: subtask.inputId,
							title: subtask.value,
							isCompleted: false,
					  }))
					: [];

				dispatch(
					addTask({
						boardId: activeBoard.id,
						columnId: data.status.value,
						task: {
							id: nanoid(),
							title: data.title,
							description: data.description,
							subtasks,
							status: data.status.label,
						},
					})
				);
				break;
			}
			case "edit": {
				const { task, initialStatusId } = props;
				const initialSubtasks = task.subtasks;
				const newSubtasks = data.subtasks
					? data.subtasks.map((subtask) => ({
							title: subtask.value,
							id: subtask.inputId,
							isCompleted:
								initialSubtasks.find(
									(isubtask) => isubtask.id === subtask.inputId
								)?.isCompleted || false,
					  }))
					: [];

				dispatch(
					editTask({
						boardId: activeBoard.id,
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
				break;
			}
		}
	};

	switch (props.type) {
		case "new":
			return {
				openModal,
				modalProps: {
					isOpened,
					onClose: closeModal,
					onSubmit,
					initialStatus: activeBoard?.columns[0]
						? {
								label: activeBoard.columns[0].name,
								value: activeBoard.columns[0].id,
						  }
						: undefined,
				},
			};
		case "edit":
			return {
				openModal,
				modalProps: {
					isOpened,
					onClose: closeModal,
					onSubmit,
					initialTitle: props.task.title,
					initialDescription: props.task.description,
					initialSubtasks: props.task.subtasks.map((subtask) => ({
						value: subtask.title,
						inputId: subtask.id,
					})),
					initialStatus: {
						label: props.task.status,
						value: props.initialStatusId,
					},
				},
			};
	}
};
