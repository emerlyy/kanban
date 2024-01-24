import { useEffect } from "react";

export const useKeyPress = (
	keyCode: string,
	handler: () => void,
	attached = true
) => {
	useEffect(() => {
		if (!attached) return;

		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.code !== keyCode) return;
			handler();
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [keyCode, handler, attached]);
};
