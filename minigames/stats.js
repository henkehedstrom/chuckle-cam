class Stats {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.canvas = document.querySelector("#eatGame > canvas");
	}

	start() {
		slides.goto("statsStart");
        console.log("eating");
        stopRecording("timelapse");

		setTimeout(() => {
		    setTimeout(() => {
			let blob = getBlob("timelapse")
			const url = URL.createObjectURL(blob);
			const video = document.getElementById("timelapse");
			video.src = url;
			video.autoplay = true;
		    video.defaultPlaybackRate = 8.0; 
		    video.play();
		    },0);
		slides.goto("statsTimelapse");
			this.loop();
		}, 2000);
	}

	end() {
		setTimeout(() => {
			slides.goto("statsEnd");

			onGameComplete();
		}, 50000);
	}


	loop() {
		console.log("looping");
       
       
	
		if (this.shouldBreak) {
			this.end();
		} else {
			setTimeout(() => this.loop(), 10);
		}
	}
}
