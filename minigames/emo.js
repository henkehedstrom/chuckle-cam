class EmotionGame {
	constructor() {
		this.finished = false;
		this.state = 0;
		this.canvas = document.querySelector("#emoGame > canvas");
		onresult = (r) => this.loop(r);
	}

	start() {
		slides.goto("emoStart");


		setTimeout(() => {
			console.log("Starting game");

			slides.goto("emoGame");
			outputCanvas = this.canvas;
			this.changeState(1)
			startRecording("emo");
		}, 5000);
	}

	end() {
		console.log("Ending game");

		slides.goto("emoEnd");
		this.finished = true;
		stopRecording("emo");
		viewRecording("emo");

		setTimeout(() => {
			onGameComplete();
		}, 3000);
	}

	changeState(nextState) {
		this.state = nextState;
		this.currentScore = 0;
		switch (this.state) {
			case 0:
				break;
			case 1:
				this.showOverlay("Show us your happy face");
				break;
			case 2:
				this.showOverlay("Show us your sad face");
				break;
			default:
				if (!this.finished) {
					this.end();
				}
				break;
		}
	}

	emotion(emo, score) {
		// console.log(`${emo}: ${score}`);

		switch (this.state) {
			case 1:
				if (emo == "happy") {
					this.currentScore += score;
				}
				break;
			case 2:
				if (emo == "sad") {
					this.currentScore += score;
				}
				break;
		}

		if (this.currentScore > 5) {
			console.log(`emotion ${emo} done!`);
			this.changeState(this.state + 1);
		}
	}

	showOverlay(text) {
	}

	loop(result) {
		if (result.face.length > 0) {
			result.face[0].emotion.forEach((e) => {
				this.emotion(e.emotion, e.score);
			});
		}
	}
}
