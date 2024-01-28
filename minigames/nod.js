class NodGame {
    constructor() {
        this.targetDir = "none";
        this.text = document.querySelector("#nodTitle");
        this.canvas = document.querySelector("#nodCanvas");
        this.instructions = [
            "up", "down", "left", "right",
        ]
        this.hasGivenTip = true;
    }

    setTargetDirection(dir) {
        this.targetDir = dir;
        switch (dir) {
            case "up":
                this.text.innerText = "Look up!";
                playSound(`up${Math.round(Math.random())+1}.opus`);
                break;

            case "down":
                this.text.innerText = "Look down!";
                playSound(`down${Math.round(Math.random())+1}.opus`);
                break;

            case "left":
                this.text.innerText = "Look to the left!";
                playSound(`left${Math.round(Math.random())+1}.opus`);
                break;

            case "right":
                this.text.innerText = "Look to the right!";
                playSound(`right${Math.round(Math.random())+1}.opus`);
                break;
        }
    }

    start() {
        onresult = (r) => this.loop(r);
        startTimer();
        GoTo("nodStart");
        outputCanvas = this.canvas;

        setTimeout(() => {
            startRecording("timelapse");
            this.setTargetDirection(this.instructions.pop());
            GoTo("nodGame");
        }, 8000);
    }

    end() {
        console.log("Ending game");

        playSound("party-horn.wav");
        playSound("confetti-pop.wav");
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6},
        });

        GoTo("nodEnd");
        this.finished = true;

        setTimeout(() => {
            onGameComplete();
        }, 4000);
    }

    loop(result) {
        let now = new Date();
        if (this.lastLoop === null) {
            this.lastLoop = now;
        }

        console.log(`${this.targetDir}: ${this.lookedFor}`);
        let directions = this.getDirections(result);

        if (directions.indexOf(this.targetDir)) {
            this.lookedFor = 0;
        } else {
            this.hasGivenTip = false;
            this.lookedFor += (now - this.lastLoop);
        }

        if (result.face.length === 0 && !this.hasGivenTip) {
            playSound(`tooFar${Math.round(Math.random())+1}.opus`);
            this.hasGivenTip = true;
        }

        if (this.lookedFor >= 2000) {
            if (this.instructions.length === 0) {
                this.end();
            }
            this.lookedFor = 0;
            this.setTargetDirection(this.instructions.pop());
            playSound("success-ding.wav");
        }

        this.lastLoop = now;
    }

    getDirections(result) {
        let dirs = [];
        result.gesture.forEach(g => {
            if (g.face === 0) {
                switch (g.gesture) {
                    case "head down":
                        dirs.push("down");
                        break;
                    case "head up":
                        dirs.push("up");
                        break;
                    case "facing left":
                        dirs.push("left");
                        break;
                    case "facing right":
                        dirs.push("right");
                        break;
                }
            }
        });
        return dirs;
    }
}
