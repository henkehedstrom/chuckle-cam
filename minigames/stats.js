class Stats {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.canvas = document.querySelector("#eatGame > canvas");
	}

	start() {
		GoTo("statsStart");
        console.log("eating");
        stopRecording("timelapse");

		setTimeout(() => {
		    setTimeout(() => {
			let blob = getBlob("timelapse")
			const url = URL.createObjectURL(blob);
			const video = document.getElementById("timelapse");
			video.src = url;
		    video.defaultPlaybackRate = 2; 
		    video.play();
		    },0);
		slides.goto("statsTimelapse");
			this.loop();
		}, 2000);

        setTimeout(() => {
			this.end();
		}, 30000);
	}

	end() {
        slides.goto("statsEnd");
		setTimeout(() => {
			slides.goto("statsEnd");

			onGameComplete();
		}, 2000);
	}
}
