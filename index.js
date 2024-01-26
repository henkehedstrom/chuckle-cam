


window.onload = async () => {
const config = { backend: 'webgl', modelBasePath: 'models/' };
const human = new Human.Human(); // create instance of Human
const outputCanvas = document.getElementById('canvas-id');
let drawDebug = true;
let playerName = "Unknown name";

function saveName()
{
  playerName = document.getElementById("userInput").value;
  console.log(playerName);
}

document.getElementById("start_button").onclick = saveName;

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



await human.webcam.start({ crop: true });
outputCanvas.width = human.webcam.width;
outputCanvas.height = human.webcam.height;
human.video(human.webcam.element); // start detection loop which continously updates results
drawResults(); // start draw loop
};
