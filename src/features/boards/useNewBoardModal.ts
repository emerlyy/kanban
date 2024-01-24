import { IBoardFormValues } from "@/features/boards/modals/BoardFormModal/BoardFormModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { SubmitHandler } from "react-hook-form";
import { createBoard } from "./boardsSlice";

export const useNewBoardModal = () => {
	const dispatch = useAppDispatch();
	const [isOpened, openModal, closeModal] = useModal();

	const onSubmit: SubmitHandler<IBoardFormValues> = (data) => {
		dispatch(
			createBoard({
				name: data.name,
				columnNames: data.columns.map((col) => col.value),
			})
		);
		closeModal();
	};

	return { openModal, modalProps: { isOpened, onClose: closeModal, onSubmit } };
};
