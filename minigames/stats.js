class Stats {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.canvas = document.querySelector("#eatGame > canvas");
	}

	start() {
		slides.goto("statsStart");
        console.log("showingstats");
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
		}, 2000);

        setTimeout(() => {
			this.end();
		}, 30000);
	}

	end() {
        slides.goto("statsEnd");
		setTimeout(() => {

			onGameComplete();
		}, 2000);
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
