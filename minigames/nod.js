class NodGame {
    constructor() {
        this.targetDir = "none";
        this.text = document.querySelector("#nodTitle");
        this.canvas = document.querySelector("#nodCanvas");
        this.instructions = [
            "up", "down", "left", "right",
        ]
    }

    setTargetDirection(dir) {
        this.targetDir = dir;
        switch (dir) {
            case "up":
                this.text.innerText = "Look up!";
                playSound("up.opus");
                break;

            case "down":
                this.text.innerText = "Look down!";
                playSound("down.opus");
                break;

            case "left":
                this.text.innerText = "Look to the left!";
                playSound("left.opus");
                break;

            case "right":
                this.text.innerText = "Look to the right!";
                playSound("right.opus");
                break;
        }
    }

    start() {
        onresult = (r) => this.loop(r);

        GoTo("nodStart");
        outputCanvas = this.canvas;

        setTimeout(() => {
            this.setTargetDirection(this.instructions.pop());
            GoTo("nodGame");
        }, 5000);
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
        }, 3000);
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
            this.lookedFor += (now - this.lastLoop);
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