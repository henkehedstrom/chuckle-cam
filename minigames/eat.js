class EatGame {
	constructor() {
        this.mouthOpen = false;
		this.hasWon = false;
		this.shouldBreak = false;
		this.canvas = document.querySelector("#eatGame > canvas");
	}

	start() {
		slides.goto("eatStart");
        console.log("eating");
		setTimeout(() => {
			slides.goto("eatGame");
			outputCanvas = this.canvas;
			this.loop();
		}, 2000);
	}

	end() {
		setInterval(() => {
			slides.goto("eatEnd");
        console.log("end");

			onGameComplete();
		}, 4000);
	}

    drawMouth()
    {
      

       
    
        console.log("mouth position is " + lipsOuterUpper);

    }

    draw()
    {
        var face = human.result.face[0];
        if (face)
        {
            var lipPoints = face.annotations.lipsUpperOuter;
        }
        
        else
            return;
        const ctx = this.canvas.getContext("2d");

        ctx.fillStyle = "#FF0000";
     
            ctx.fillRect(lipPoints[0][0],lipPoints[0][1],10,10);
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
