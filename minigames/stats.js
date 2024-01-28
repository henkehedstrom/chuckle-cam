class Stats {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;

        this.time = 0;
        this.happyImage = "none";
        this.sadImage = "none";
        this.angryImage = "none";
        this.happyScore = 0;
        this.sadScore = 0;
        this.angryScore = 0;

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

        this.saveStatsToLocalStorage();

		setTimeout(() => {
		    setTimeout(() => {
		    },0);
            this.showTimelapse();
		}, 6000);

        
	}

    saveStatsToLocalStorage()
    {
        let saveString = "";
        
        saveString += this.happyImage + ";";
        saveString += this.happyScore + ";";

        saveString += this.sadImage + ";";
        saveString += this.sadScore + ";";

        saveString+= this.angryImage + ";";
        saveString+= this.angryScore + ";";

        saveString+= this.time;

        localStorage.setItem(playerName,saveString);
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
                this.happyScore = emote.maxEmotionScores[emotion];
                this.happyImage = image.src;
                label.textContent = "This was your happiest state! You had a happiness score of: " +  emote.maxEmotionScores[emotion];
                break;
            case "sad":
                this.sadScore = emote.maxEmotionScores[emotion];
                this.sadImage = image.src;
                label.textContent = "This was your saddest state! You had a sadness score of: " +  emote.maxEmotionScores[emotion];
                break;
            case "angry":
                this.angryScore = emote.maxEmotionScores[emotion];
                this.angryImage = image.src;
                label.textContent = "This was your angriest state! You had a angriness score of: " +  emote.maxEmotionScores[emotion];
                break;
        }

        if(emote.highestEmotion == emotion)
            label.textContent += strong;
    }

    showTimelapse()
    {
	    slides.goto("statsTimelapse");

	    let blob = getBlob("timelapse")
	    const url = URL.createObjectURL(blob);
	    const video = document.getElementById("timelapse");
	    video.src = url;
	    video.playbackRate = 4; 
	    video.play();

	    video.onended = (e) => {
		    this.showStatsStart();
	    };
    }

    showStatsStart()
    {
        slides.goto("statsEmotionsStart");
        setTimeout(() => {
			this.showHappy();
		}, 4000);
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
		}, 6000);
    }

	end() {
        slides.goto("statsEnd");
		setTimeout(() => {
			slides.goto("statsEnd");

			onGameComplete();
		}, 2000);
	}
}
