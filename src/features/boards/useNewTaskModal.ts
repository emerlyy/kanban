import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { nanoid } from "@reduxjs/toolkit";
import { SubmitHandler } from "react-hook-form";
import { addTask } from "./boardsSlice";
import {
	ITaskFormValues,
	TaskFormModalProps,
} from "./modals/TaskFormModal/TaskFormModal";
import { useBoards } from "./useBoards";

type ReturnType = {
	openModal: () => void;
	modalProps: Pick<
		TaskFormModalProps,
		"isOpened" | "onClose" | "onSubmit" | "initialStatus"
	>;
};

export const useNewTaskModal = (): ReturnType => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const [activeBoard] = useBoards();

	const onSubmit: SubmitHandler<ITaskFormValues> = (data) => {
		if (activeBoard) {
			dispatch(
				addTask({
					boardId: activeBoard.id,
					columnId: data.status.value,
					task: {
						id: nanoid(),
						title: data.title,
						description: data.description,
						subtasks: data.subtasks
							? data.subtasks.map((subtask) => ({
									id: subtask.inputId,
									title: subtask.value,
									isCompleted: false,
							  }))
							: [],
						status: data.status.label,
					},
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
			initialStatus: activeBoard?.columns[0]
				? {
						label: activeBoard.columns[0].name,
						value: activeBoard.columns[0].id,
				  }
				: undefined,
		},
	};
};
