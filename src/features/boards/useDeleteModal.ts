import { DeleteModalProps } from "@/components/DeleteModal/DeleteModal";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useModal } from "@/hooks/useModal";
import { UnknownAction } from "@reduxjs/toolkit";

type ReturnType = {
	openModal: () => void;
	modalProps: Omit<DeleteModalProps, "type" | "name">;
};

export const useDeleteModal = (deleteAction: UnknownAction): ReturnType => {
	const [isOpened, openModal, closeModal] = useModal();

	const dispatch = useAppDispatch();

	const onDelete = () => {
		dispatch(deleteAction);
		closeModal();
	};

	return {
		openModal,
		modalProps: {
			isOpened,
			onClose: closeModal,
			onDelete,
			onCancel: closeModal,
		},
	};
};
