var soundDict = {};
var musicDict = {};
var activeMusic;

function playSound(fileName) {
	var audio = soundDict[fileName];
	if (audio == null) {
		soundDict[fileName] = new Audio("/sounds/" + fileName);
		audio = soundDict[fileName];
	}
	audio.play();
}

function playMusic(fileName) {
	if (activeMusic != null) {
		activeMusic.pause();
		activeMusic.currentTime = 0;
	}

	var audio = musicDict[fileName];
	if (audio == null) {
		musicDict[fileName] = new Audio("/music/" + fileName);
		audio = musicDict[fileName];
	}
	audio.play();
}
