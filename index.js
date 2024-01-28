let human;
let slides;
let outputCanvas;
let drawDebug = false;
let onresult;
let playerName = "Unknown name";
let interval;
let counter = 0
let emote = new EmotionGame();
let sleep = new SleepGame();
let minigames;
let consent = false;

class Intro {
	constructor() {
		this.playerName = document.querySelector("#introText");
		this.playerName.value = "";

		this.startButton = document.querySelector("#introButton");
		this.startButton.onclick = (e) => {
			this.end();
			this.startButton.disabled = true;
		}
	}
	start() {
		document.querySelector("#consent").checked = true;
		GoTo("intro");

	}

	end() {
		playerName = this.playerName.value;
		consent = document.querySelector("#consent").checked;
		console.log("consent="+consent);
		onGameComplete();
	}
}

document.addEventListener('keydown', function(event) {
	switch(event.code)
	{
		case 'KeyE':
			switchDebugDrawing();
			break;
		case 'KeyN':
			currentMinigame.end();
			break;
		case 'KeyA':
			takePicture();
			playSound("party-horn.wav");
			playSound("confetti-pop.wav");
			break;
		default:
			break;
	}

});

function switchDebugDrawing()
{
	drawDebug = !drawDebug
	console.log("switching debugdraw")
}

function convertSec(cnt) {
	let sec = cnt % 60;
	let min = Math.floor(cnt / 60);
	if (sec < 10) {
	  if (min < 10) {
		return "0" + min + ":0" + sec;
	  } else {
		return min + ":0" + sec;
	  }
	} else if ((min < 10) && (sec >= 10)) {
	  return "0" + min + ":" + sec;
	} else {
	  return min + ":" + sec;
	}
  }
  
  function startTimer() {
	interval = setInterval(function() {
		console.log(counter++);
	}, 1000);
  }

  function stopTimer() {
	clearInterval(interval);
  }

function takePicture()
{
	let image_data_url = outputCanvas.toDataURL('image/jpeg');
	console.log(image_data_url);
	return image_data_url;
}

async function drawResults() {
	if (outputCanvas != null) {
		const interpolated = human.next(); // get smoothened result using last-known results
		human.draw.canvas(human.webcam.element, outputCanvas); // draw current webcam frame
		if(drawDebug)
		{
			human.draw.all(outputCanvas, interpolated); // draw the frame detection results
		}
	}
	requestAnimationFrame(drawResults); // run draw loop
}

async function detectLoop() {
	let result = await human.detect(human.webcam.element);

	if (onresult) {
		onresult(result);
	}

	requestAnimationFrame(detectLoop);
}

function GoTo(slide) {
	console.log(`Going to slide ${slide}`);
	slides.goto(slide);
}

window.onload = async () => {
	let width = 1280;

	slides = impress();
	slides.init();

	const config = { backend: 'webgl', modelBasePath: 'models/' };
	human = new Human.Human(); // create instance of Human
	//outputCanvas = document.getElementById('canvas-id');



	await human.webcam.start({ crop: false, width });
	if (outputCanvas != null) {
		outputCanvas.width = human.webcam.width;
		outputCanvas.height = human.webcam.height;
	}
	drawResults(); // start draw loop
	detectLoop();


	// To add a minigame add an instance of your minigame class in minigames
	// A minigame class MUST implement start() and run onGameComplete() when finished
	minigames = [
		new Intro(),
		new NodGame(),
		emote,
		sleep,
		new Stats()
	]

	onGameComplete();
};

let currentGameIndex = -1; // Start at -1 since we increas it in onGameComplete


function removeFragment() {
	window.location.replace("#");

// slice off the remaining '#' in HTML5:
	if (typeof window.history.replaceState == 'function') {
		history.replaceState({}, '', window.location.href.slice(0, -1));
	}
}

removeFragment();

let currentMinigame;
function onGameComplete() {
	currentGameIndex++;

	if (currentGameIndex >= minigames.length) {
		return;
	}

	currentMinigame = minigames[currentGameIndex];
	currentMinigame.start();
}
