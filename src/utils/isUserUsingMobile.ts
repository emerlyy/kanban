export const isUserUsingMobile = () => {
	// User agent string method
	let isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

	// Screen resolution method
	if (!isMobile) {
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		isMobile = screenWidth < 768 || screenHeight < 768;
	}

	// Touch events method
	if (!isMobile) {
		isMobile =
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0 ||
			navigator.maxTouchPoints > 0;
	}

	// CSS media queries method
	if (!isMobile) {
		const bodyElement = document.getElementsByTagName("body")[0];
		isMobile =
			window
				.getComputedStyle(bodyElement)
				.getPropertyValue("content")
				.indexOf("mobile") !== -1;
	}

	return isMobile;
};
