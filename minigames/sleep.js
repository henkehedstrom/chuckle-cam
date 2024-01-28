class SleepGame {
	constructor() {
		this.openEyes = 0;
		this.closedEyes = 0;
		this.hasSleepMinigameStarted = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.warnings = 0;
		this.trueEnding = true;
		this.canvas = document.querySelector("#sleepGame > canvas");
		this.placeholder = document.querySelector("#sleepCanvasPlaceholder");
		this.canvasOwner = document.querySelector("#sleepGame");
	}

	start() {
		slides.goto("sleepStart");

		setTimeout(() => {
			slides.goto("sleepStart2");
		}, 2000);

		setTimeout(() => {
			slides.goto("sleepStart3");
		}, 3000);

		setTimeout(() => {
			slides.goto("sleepGame");
			this.canvasOwner.appendChild(outputCanvas);
			this.canvasOwner.removeChild(this.placeholder);
			playMusic("lo-fi.mp3");
			this.loop();
		}, 5500);
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
		 	slides.goto("sleepEnd");
		
		  	onGameComplete();
		  }, 4000);
		this.statsTest();
	}

	statsTest()
	{

		// stopRecording("timelapse");
		// setTimeout(() => {
		// 	let blob = getBlob("timelapse")
		// 	const url = URL.createObjectURL(blob);
		// 	const video = document.getElementById("timelapse");
		// 	video.src = url;
		// 	video.autoplay = true;
		// video.defaultPlaybackRate = 8.0; 
		// video.play();
		// },0);
		// slides.goto("statsTimelapse");
		

	}

	moveOn() {
		this.trueEnding = false;
		this.shouldBreak = true;
		stopMusic();

		slides.goto("sleepTooBad1");
		
		setTimeout(() => {
			slides.goto("sleepTooBad2");
		}, 2000);

		setTimeout(() => {
			onGameComplete();
		}, 4000);
	}

	warning() {
		this.warnings++;
		if (this.warnings >= 2) {
			this.moveOn();
			return;
		}
		playSound("record-scratch.flac");
		stopMusic();
		playSound("wambulance.mp3");
		slides.goto("sleepWarning");

		setTimeout(() => {
			slides.goto("sleepGame");
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
		if (this.closedEyes >= 200) {
			this.hasWon = true;
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
