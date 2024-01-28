class Stats {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;
	}

	start() {
		playMusic("recap-song.mp3");
		GoTo("statsStart");
        console.log("eating");
        stopRecording("timelapse");
        stopTimer();
        
        this.time = convertSec(counter); 
        let header = document.getElementById("timerHeader");
        header.innerText = "You managed to finish the game in " +  this.time + " seconds.";

        this.showEmotionStat("happy");
        this.showEmotionStat("sad");
        this.showEmotionStat("angry");

		setTimeout(() => {
		    setTimeout(() => {
			let blob = getBlob("timelapse")
			const url = URL.createObjectURL(blob);
			const video = document.getElementById("timelapse");
			video.src = url;
		    video.playbackRate = 4; 
		    video.play();
		    },0);
            this.showTimelapse();
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
		}, 20000);
    }

    showStatsStart()
    {
        slides.goto("statsEmotionsStart");
        setTimeout(() => {
			this.showHappy();
		}, 3000);
    }

    showHappy()
    {
        slides.goto("happiestEmotion");
        setTimeout(() => {
			this.showSad();
		}, 5000);
    }

    showSad()
    {
        slides.goto("saddestEmotion");
        setTimeout(() => {
			this.showAngry();
		}, 5000);
    }

    showAngry()
    {
        slides.goto("angriestEmotion");
        setTimeout(() => {
			this.showTimer();
		}, 5000);
    }

    showTimer()
    {
        slides.goto("timer");
        setTimeout(() => {
			this.end();
		}, 5000);
    }

	end() {
        slides.goto("statsEnd");
		setTimeout(() => {
			slides.goto("statsEnd");

			onGameComplete();
		}, 2000);
	}
}
