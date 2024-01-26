


window.onload = async () => {
const config = { backend: 'webgl', modelBasePath: 'models/' };
const human = new Human.Human(); // create instance of Human
const outputCanvas = document.getElementById('canvas-id');

async function drawResults() {
  const interpolated = human.next(); // get smoothened result using last-known results
  human.draw.canvas(human.webcam.element, outputCanvas); // draw current webcam frame
  human.draw.all(outputCanvas, interpolated); // draw the frame detectgion results
  requestAnimationFrame(drawResults); // run draw loop
}

await human.webcam.start({ crop: true });
outputCanvas.width = human.webcam.width;
outputCanvas.height = human.webcam.height;
human.video(human.webcam.element); // start detection loop which continously updates results
drawResults(); // start draw loop
};
