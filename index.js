let human;
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
    case 'KeyE':2
      switchDebugDrawing();
      break;
    case 'KeyA':
      takePicture();
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

	const config = { backend: 'webgl', modelBasePath: 'models/' };
	human = new Human.Human(); // create instance of Human
	outputCanvas = document.getElementById('canvas-id');

	await human.webcam.start({ crop: false, width });
	outputCanvas.width = human.webcam.width;
	outputCanvas.height = human.webcam.height;
	drawResults(); // start draw loop
	detectLoop();

	sleepGameLoop();

	let game = new EmotionGame(human);
	game.start();
};
