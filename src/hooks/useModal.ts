import { useState } from "react";

export const useModal = () => {
	const [isOpened, setIsOpened] = useState(false);

	const openModal = () => {
		setIsOpened(true);
	};

	const closeModal = () => {
		setIsOpened(false);
	};

	const toggleModal = () => {
		setIsOpened((prev) => !prev);
	};

	return [isOpened, openModal, closeModal, toggleModal] as const;
};
