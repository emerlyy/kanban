import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { nanoid } from "@reduxjs/toolkit";
import { SubmitHandler } from "react-hook-form";
import { ITaskFormValues } from "./TaskFormModal/TaskFormModal";
import { addTask } from "./boardsSlice";
import { useBoards } from "./useBoards";

export const useNewTaskModal = () => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const { activeBoard } = useBoards();

	const onSubmit: SubmitHandler<ITaskFormValues> = (data) => {
		console.log(data)
		if (activeBoard) {
			dispatch(
				addTask({
					boardId: activeBoard.id,
					columnId: data.status,
					task: {
						id: nanoid(),
						title: data.name,
						description: data.description,
						subtasks: data.subtasks.map((subtask) => ({
							id: subtask.inputId,
							title: subtask.value,
							isCompleted: false,
						})),
						status: "Todo",
					},
				})
			);
		}
		closeModal();
	};

	return { openModal, modalProps: { isOpened, onClose: closeModal, onSubmit } };
};
