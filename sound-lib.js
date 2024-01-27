var soundDict = {};

function playSound(fileName) {
	var audio = soundDict[fileName];
	if (audio == null) {
		soundDict[fileName] = new Audio("/sounds/" + fileName);
		audio = soundDict[fileName];
	}
	audio.play();
}
