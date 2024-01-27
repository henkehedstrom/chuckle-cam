function isEyesClosed(result) {
	var gestures = result.gesture;
	var leftEyeClosed = gestures.find((x) => x.gesture == "blink left eye");
	var rightEyeClosed = gestures.find((x) => x.gesture == "blink right eye");
	return leftEyeClosed && rightEyeClosed;
}

function sleepGameLoop() {
	var result = human.result;
	if (isEyesClosed(result)) {
		console.log("Eyes closed!");
	}
	setTimeout(sleepGameLoop, 10);
}
