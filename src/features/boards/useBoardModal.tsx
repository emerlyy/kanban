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
		() => (activeBoard?.columns ? activeBoard.columns : []),
		[activeBoard]
	);

	const onSubmit: SubmitHandler<IBoardFormValues> = (data) => {
		switch (type) {
			case "new":
				dispatch(
					createBoard({
						name: data.name,
						columnNames: data.columns.map((col) => col.value),
					})
				);
				break;
			case "edit":
				const newColumns = data.columns.map((col) => ({
					name: col.value,
					tasks:
						initialColumns.find((icol) => icol.id === col.inputId)?.tasks ||
						[],
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
				break;
		}
		closeModal();
	};

	switch (type) {
		case "new":
			return {
				openModal,
				modalProps: {
					isOpened,
					onClose: closeModal,
					onSubmit,
				},
			};
		case "edit":
			return {
				openModal,
				modalProps: {
					isOpened,
					onClose: closeModal,
					onSubmit,
					initialName: activeBoard?.name,
					initialColumns: initialColumns.map((col) => ({
						value: col.name,
						inputId: col.id,
					})),
				},
			};
	}
};
