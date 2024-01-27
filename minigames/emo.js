class EmotionGame {
    constructor() {
        this.finished = false;
        this.state = 0;
        this.canvas = document.querySelector("#emoCanvas");
        this.title = document.querySelector("#emoGame > h1");
		this.canvasOwner = document.querySelector("#emoFrame");
		this.placeholder = document.querySelector("#emoCanvasPlaceHolder");


        onresult = (r) => this.loop(r);
    }

    start() {
        onresult = (r) => this.loop(r);

        slides.goto("emoStart");

        setTimeout(() => {
            console.log("Starting game");

            slides.goto("emoGame");
            this.jelly();
			this.canvasOwner.appendChild(outputCanvas);
			this.canvasOwner.removeChild(this.placeholder)
            this.changeState(1)
            startRecording("emo");
			startRecording("timelapse");
        }, 5000);
    }

    end() {
        console.log("Ending game");

        slides.goto("emoEnd");
        this.finished = true;
        stopRecording("emo");

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
                this.title.innerText = "Show us your happy face 😹";
                break;
            case 2:
                this.title.innerText = "Show us your sad face 😢";
                break;
            case 3:
                this.title.innerText = "Get angry!!! 😡😠";
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
            case 3:
                if (emo == "angry") {
                    this.currentScore += score;
                }
                break;
        }

        if (this.currentScore > 1) {
            console.log(`emotion ${emo} done!`);

            playSound("party-horn.wav");
            playSound("confetti-pop.wav");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {y: 0.6},
            });
            this.changeState(this.state + 1);
        }
    }

    jelly() {
        //this.canvas.classList.toggle("jelly", !this.canvas.classList.contains("jelly"));

        if (!this.finished) {
            setTimeout(() => this.jelly(), Math.random() * 3000 + 2000);
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
