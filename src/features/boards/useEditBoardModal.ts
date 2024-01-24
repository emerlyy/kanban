import { IBoardFormValues } from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { editBoard } from "./boardsSlice";
import { useBoards } from "./useBoards";

export const useEditBoardModal = () => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const { activeBoard } = useBoards();

	const initialColumns = useMemo(() => activeBoard?.columns, [activeBoard]);

	const onSubmit: SubmitHandler<IBoardFormValues> = (data) => {
		const newColumns = data.columns.map((col) => ({
			name: col.value,
			tasks:
				initialColumns?.find((icol) => icol.id === col.inputId)?.tasks || [],
			id: col.inputId,
		}));

		if (activeBoard) {
			dispatch(
				editBoard({
					id: activeBoard.id,
					name: data.name,
					newColumns,
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
			initialName: activeBoard?.name,
			initialColumns: initialColumns?.map((col) => ({
				value: col.name,
				inputId: col.id,
			})),
		},
	};
};
