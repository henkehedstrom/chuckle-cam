let human;
let outputCanvas;
let drawDebug = true;

class EmotionGame {
	constructor(human) {
		this.human = human;
		this.finished = false;
	}

	start() {
		setTimeout(end, 10000);
		loop();
	}

	end() {
		this.finished = true;
	}

	loop() {
		let result = human.result;
		if (result.face.length > 0) {
			console.log("Emotions: " + result.face[0].emotion);
		}

		if (!this.finished) {
			setTimeout(loop, 30);
		}
	}
}


async function drawResults() {
	const interpolated = human.next(); // get smoothened result using last-known results
	human.draw.canvas(human.webcam.element, outputCanvas); // draw current webcam frame
	if(drawDebug)
	{
		human.draw.all(outputCanvas, interpolated); // draw the frame detection results
	}
	requestAnimationFrame(drawResults); // run draw loop
}

document.onkeypress = function (e) {
	e = e || window.event;
	drawDebug = !drawDebug
	console.log("switching debugdraw")
};

window.onload = async () => {
	let width = 1280;

	const config = { backend: 'webgl', modelBasePath: 'models/' };
	human = new Human.Human(); // create instance of Human
	outputCanvas = document.getElementById('canvas-id');

	await human.webcam.start({ crop: false, width });
	outputCanvas.width = human.webcam.width;
	outputCanvas.height = human.webcam.height;
	human.video(human.webcam.element); // start detection loop which continously updates results
	drawResults(); // start draw loop

	sleepGameLoop();
};
