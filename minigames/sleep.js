class SleepGame {
	constructor() {
		this.openEyes = 0;
		this.closedEyes = 0;
		this.hasSleepMinigameStarted = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.warnings = 0;
		this.trueEnding = true;
		this.canvas = document.querySelector("#sleepGameCanvas");
		this.placeholder = document.querySelector("#sleepGameCanvas");
		this.canvasOwner = document.querySelector("#sleepFrame");
		this.longestClosedEyes=0;
	}

	playDontLook() {
		playSound(`dontlook${Math.round(Math.random() * 4)+1}.opus`);
	}

	start() {
		GoTo("sleepStart");

		setTimeout(() => {
			GoTo("sleepStart2");

		}, 3000);

		setTimeout(() => {
			GoTo("sleepStart3");
			playSound(`relax${Math.round(Math.random())+1}.opus`);
		}, 5000);

		setTimeout(() => {
			GoTo("sleepGame");
			this.playDontLook();

			this.canvasOwner.appendChild(outputCanvas);
			this.canvasOwner.removeChild(this.placeholder);
			playMusic("lo-fi.mp3");
			this.loop();
		}, 7500);
	}

	end() {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
		playSound("party-horn.wav");
		playSound("confetti-pop.wav");
		stopMusic();
		
		 setTimeout(() => {
		 	GoTo("sleepEnd");
		
		  	onGameComplete();
		  }, 7500);
	}

	moveOn() {
		this.trueEnding = false;
		this.shouldBreak = true;
		stopMusic();
		playSound("so-sad.mp3");

		GoTo("sleepTooBad1");
		
		setTimeout(() => {
			GoTo("sleepTooBad2");
		}, 3000);

		setTimeout(() => {
			onGameComplete();
		}, 4800);
	}

	warning() {
		this.warnings++;
		if (this.warnings >= 4) {
			this.moveOn();
			playSound("betterluck.opus");
			return;
		}
		this.playDontLook();
		playSound("record-scratch.flac");
		stopMusic();
		playSound("wambulance.mp3");
		GoTo("sleepWarning");

		setTimeout(() => {
			GoTo("sleepGame");
			playMusic("lo-fi.mp3");
		}, 2500);
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

		const openEyesLean = 50;
		this.openEyes = openEyesLean;
		if (this.isEyesClosed(result)) {
			this.closedEyes++;
			this.openEyes = 0;
			this.hasSleepMinigameStarted = true;
		} else if (this.hasSleepMinigameStarted) {
			if (Math.random() < 0.1) {
				this.playDontLook();
			}

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
			this.warning();
		}

		// 200 = 20s = WIN
		if (this.closedEyes >= 150) {
			this.hasWon = true;
		}
		if(this.closedEyes > this.longestClosedEyes)
		{
			this.longestClosedEyes = this.closedEyes;
		}

		if (this.hasWon) {
			console.log("You win!");
		} else {
			console.log("closed eyes: " + this.closedEyes);
		}

		if (this.shouldBreak) {
			if (this.trueEnding) {
				this.end();
			}
		} else {
			setTimeout(() => this.loop(), 10);
		}
	}
}
