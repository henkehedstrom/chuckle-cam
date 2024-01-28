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


        this.showEmotionStat("happy");
        this.showEmotionStat("sad");
        this.showEmotionStat("angry");





		setTimeout(() => {
		    setTimeout(() => {
			let blob = getBlob("timelapse")
			const url = URL.createObjectURL(blob);
			const video = document.getElementById("timelapse");
			video.src = url;
		    video.defaultPlaybackRate = 2; 
		    video.play();
		    },0);
		}, 2000);

        
	}

    showEmotionStat(emotion)
    {
        let strong = "This was your strongest emotion overall!"

        let image = document.getElementById(emotion + "Image");
        let label = document.getElementById(emotion + "Label");
        image.src = emote.maxEmotionPictures[emotion];

        switch(emotion)
        {
            case "happy":
                label.textContent = "This was your happiest state! You had a happiness score of: " +  emote.maxEmotionScores[emotion];
                break;
            case "sad":
                label.textContent = "This was your saddest state! You had a sadness score of: " +  emote.maxEmotionScores[emotion];
                break;
            case "angry":
                label.textContent = "This was your angriest state! You had a angriness score of: " +  emote.maxEmotionScores[emotion];
                break;
        }

        if(emote.highestEmotion == emotion)
            label.textContent += strong;
    }

    showTimelapse()
    {
		slides.goto("statsTimelapse");
        setTimeout(() => {
			this.showStatsStart();
		}, 30000);
    }

    showStatsStart()
    {
        slides.goto("statsEmotionsStart");
        setTimeout(() => {
			this.showStatsEmotions();
		}, 3000);
    }

    showStatsEmotions()
    {
        slides.goto("statsEmotions");
        setTimeout(() => {
			this.end();
		}, 3000);
    }

	end() {
        slides.goto("statsEnd");
		setTimeout(() => {
			slides.goto("statsEnd");

			onGameComplete();
		}, 2000);
	}
}
