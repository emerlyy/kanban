import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { useMemo } from "react";
import { SubmitHandler } from "react-hook-form";
import { createBoard, editBoard } from "./boardsSlice";
import { IBoardFormValues } from "./modals/BoardFormModal/BoardFormModal";
import { useBoards } from "./useBoards";

export const useBoardModal = (type: "new" | "edit") => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();
	const [activeBoard] = useBoards();

	const initialColumns = useMemo(
		() => activeBoard?.columns || [],
		[activeBoard]
	);

	const onSubmit: SubmitHandler<IBoardFormValues> = (data) => {
		const { name, columns } = data;

		switch (type) {
			case "new":
				dispatch(
					createBoard({
						name: name,
						columnNames: columns.map((col) => col.value),
					})
				);
				break;
			case "edit":
				const newColumns = columns.map((col) => ({
					name: col.value,
					tasks:
						initialColumns.find((icol) => icol.id === col.inputId)?.tasks || [],
					id: col.inputId,
				}));

				activeBoard &&
					dispatch(
						editBoard({
							id: activeBoard.id,
							name: name,
							newColumns,
						})
					);

				break;
		}
		closeModal();
	};

	const modalProps = {
		isOpened,
		onClose: closeModal,
		onSubmit,
		...(type === "edit" && {
			initialName: activeBoard?.name,
			initialColumns: initialColumns.map((col) => ({
				value: col.name,
				inputId: col.id,
			})),
		}),
	};

	return { openModal, modalProps };
};
