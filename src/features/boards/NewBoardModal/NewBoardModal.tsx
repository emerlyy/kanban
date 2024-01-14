import BoardModal, { IFormValues } from "@/components/BoardModal/BoardModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { SubmitHandler } from "react-hook-form";
import { createBoard } from "../boardsSlice";

type Props = {
	isOpened: boolean;
	onClose: () => void;
};

const NewBoardModal = ({ isOpened, onClose }: Props) => {
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<IFormValues> = (data) => {
		dispatch(
			createBoard({
				name: data.name,
				columnNames: data.columns.map((col) => col.value),
			})
		);
		onClose();
	};

	return (
		<BoardModal
			title="Add New Board"
			submiButtonText="+ Create New Board"
			isOpened={isOpened}
			onSubmit={onSubmit}
			onClose={onClose}
		/>
	);
};

export default NewBoardModal;
