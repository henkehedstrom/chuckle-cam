class EmotionGame {
    constructor() {
        this.finished = false;
        this.state = 0;
        this.canvas = document.querySelector("#emoCanvas");
        this.title = document.querySelector("#emoGame > h1");
        this.counter = document.querySelector("#emoCounter");
		this.canvasOwner = document.querySelector("#emoFrame");
		this.placeholder = document.querySelector("#emoCanvasPlaceHolder");

        this.maxEmotionScores = new Object();
        this.maxEmotionPictures = new Object();
        this.highestEmotion = "unknown";
        this.highestEmotionScore = 0.0;
        this.currentScore = 0;


        onresult = (r) => this.loop(r);
    }

    populateEmotions()
    {
        this.maxEmotionScores["happy"] = 0;
        this.maxEmotionScores["sad"] = 0;
        this.maxEmotionScores["angry"] = 0;
    }

    start() {
        onresult = (r) => this.loop(r);

        GoTo("emoStart");
        this.populateEmotions();

        setTimeout(() => {
            console.log("Starting game");

            GoTo("emoGame");
            this.jelly();
			this.canvasOwner.appendChild(outputCanvas);
			this.canvasOwner.removeChild(this.placeholder)
            this.changeState(1)
        }, 5000);
    }


    end() {
        console.log("Ending game");

        console.log("Your strongest emotion was : " + this.highestEmotion + " with the score of: " + this.highestEmotionScore);


        GoTo("emoEnd");
        this.finished = true;

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

    getHeadPosition(result) {
        if (result.face.length > 0) {
            let face = result.face[0];
            let x = (face.box[0]+face.box[2])/2;
            let y = (face.box[1]+face.box[3])/2;

            this.counter.style.transform = `translate(${x}px, ${y}px) scale(5.5)`;
            this.counter.style.opacity = "1";
        } else {
            this.counter.style.opacity = "0";
        }
    }

    emotion(emo, score) {
        switch (this.state) {
            case 1:
                if (emo == "happy") {
                    this.currentScore += score;
                    this.saveMaxEmotion("happy",score);
                } else {
                    this.currentScore *= 0.95;
                }
                break;
            case 2:
                if (emo == "sad") {
                    this.currentScore += score;
                    this.saveMaxEmotion("sad",score);
                } else {
                    this.currentScore *= 0.95;
                }
                break;
            case 3:
                if (emo == "angry") {
                    this.currentScore += score;
                    this.saveMaxEmotion("angry",score);
                } else {
                    this.currentScore *= 0.95;
                }
                break;
        }

        this.counter.value = this.currentScore * 20;

        console.log(this.currentScore );
        console.log(this.counter.value);


        if (this.currentScore > 5) {
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

    saveMaxEmotion(emotionType,score)
    {
        if(this.maxEmotionScores[emotionType] < score)
        {
            this.maxEmotionScores[emotionType] = score;
            this.maxEmotionPictures[emotionType] = takePicture();    
        }
        console.log("highest emo is " + this.highestEmotionScore + " score is " + score)
        if(this.highestEmotionScore < score)
        {
            this.highestEmotionScore = score;
            this.highestEmotion = emotionType;
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
        this.getHeadPosition(result);
        if (result.face.length > 0) {
            result.face[0].emotion.forEach((e) => {
                this.emotion(e.emotion, e.score);
            });
        }
    }
}
