import { IBoardFormValues } from "@/features/boards/BoardFormModal/BoardFormModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { Column } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { editBoard } from "./boardsSlice";
import { useBoards } from "./useBoards";

export const useEditBoardModal = () => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const { activeBoard } = useBoards();

	const initialColumns = useMemo(
		() =>
			activeBoard?.columns.map((col) => ({
				...col,
				inputId: nanoid(),
			})),
		[activeBoard]
	);

	const onSubmit: SubmitHandler<IBoardFormValues> = (data) => {
		const newColumns: Column[] = data.columns.map((col) => ({
			name: col.value,
			tasks:
				initialColumns?.find((icol) => icol.inputId === col.inputId)?.tasks ||
				[],
		}));

		dispatch(
			editBoard({
				name: data.name,
				newColumns,
			})
		);
		closeModal();
	};

	return {
		openModal,
		modalProps: {
			isOpened,
			onClose: closeModal,
			onSubmit,
			initialName: activeBoard?.name,
			initialColumns: initialColumns?.map((col) => ({
				value: col.name,
				inputId: col.inputId,
			})),
		},
	};
};
