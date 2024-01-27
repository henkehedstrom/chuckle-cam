let human;
let slides;
let outputCanvas;
let drawDebug = true;
let onresult;
let playerName = "Unknown name";


function saveName()
{
  playerName = document.getElementById("userInput").value;
  console.log(playerName);
}


let start_button = document.getElementById("start_button");
if (document.getElementById("start_button"))
{
	start_button.onclick = saveName;
}

document.addEventListener('keydown', function(event) {
	switch(event.code)
	{
		case 'KeyE':
			switchDebugDrawing();
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


function takePicture()
{
	let image_data_url = outputCanvas.toDataURL('image/jpeg');
	console.log(image_data_url);
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

async function detectLoop() {
	let result = await human.detect(human.webcam.element);

	if (onresult) {
		onresult(result);
	}

	requestAnimationFrame(detectLoop);
}

window.onload = async () => {
	let width = 1280;

	slides = impress();
	slides.init();

	const config = { backend: 'webgl', modelBasePath: 'models/' };
	human = new Human.Human(); // create instance of Human
	//outputCanvas = document.getElementById('canvas-id');

	onGameComplete();


	await human.webcam.start({ crop: false, width });
	outputCanvas.width = human.webcam.width;
	outputCanvas.height = human.webcam.height;
	drawResults(); // start draw loop
	detectLoop();

};

let currentGameIndex = -1; // Start at -1 since we increas it in onGameComplete

// To add a minigame add an instance of your minigame class in minigames
// A minigame class MUST implement start() and run onGameComplete() when finished
let minigames = [
	new NodGame(),
	new EmotionGame(),
	new SleepGame(),
	new Stats()
]

let currentMinigame;
function onGameComplete() {
	currentGameIndex++;

	if (currentGameIndex >= minigames.length) {
		return;
	}

	currentMinigame = minigames[currentGameIndex];
	currentMinigame.start();
}
