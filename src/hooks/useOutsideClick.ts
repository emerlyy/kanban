import { useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
	elementRef: React.RefObject<T>,
	handler: () => void,
	attached = true
) => {
	useEffect(() => {
		if (!attached) return;

		let insideMouseDown = false;

		const handleMouseDown = (event: MouseEvent) => {
			if (!elementRef.current) return;
			insideMouseDown = elementRef.current.contains(event.target as Node);
		};

		const handleClick = (event: MouseEvent) => {
			if (!elementRef.current) return;
			if (
				!elementRef.current.contains(event.target as Node) &&
				!insideMouseDown
			) {
				handler();
			}
		};

		setTimeout(() => {
			document.addEventListener("mousedown", handleMouseDown);
			document.addEventListener("click", handleClick);
		}, 0);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("click", handleClick);
		};
	}, [elementRef, handler, attached]);
};
