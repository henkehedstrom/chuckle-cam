class SleepGame {
	constructor() {
		this.openEyes = 0;
		this.closedEyes = 0;
		this.hasSleepMinigameStarted = false;
		this.hasWon = false;
		this.shouldBreak = false;
	}

	start() {
		this.loop();
	}

	end() {
		onGameComplete();
	}

	isEyesClosed(result) {
		var gestures = result.gesture;
		var leftEyeClosed = gestures.find((x) => x.gesture == "blink left eye");
		var rightEyeClosed = gestures.find((x) => x.gesture == "blink right eye");
		return leftEyeClosed && rightEyeClosed;
	}

	loop() {
		var result = human.result;
		var didPeek = false;

		const openEyesLean = 5;
		this.openEyes = openEyesLean;
		if (this.isEyesClosed(result)) {
			this.closedEyes++;
			this.openEyes = 0;
			this.hasSleepMinigameStarted = true;
		} else if (this.hasSleepMinigameStarted) {
			if (this.hasWon) {
				this.shouldBreak = true;
			} else {
				this.openEyes++;
				if (this.openEyes < openEyesLean) {
					this.closedEyes++;
				} else {
					this.closedEyes = 0;
					didPeek = true;
				}
			}
		}


		if (didPeek) {
			console.log("No peeking!!! >:(");
			this.hasSleepMinigameStarted = false;
		}

		// 200 = 20s = WIN
		if (this.closedEyes >= 200) {
			this.hasWon = true;
		}

		if (this.hasWon) {
			console.log("You win!");
		} else {
			console.log("closed eyes: " + this.closedEyes);
		}

		if (this.shouldBreak) {
			this.end();
		} else {
			setTimeout(() => this.loop(), 10);
		}
	}
}
