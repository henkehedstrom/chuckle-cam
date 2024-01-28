var soundDict = {};
var musicDict = {};
let activeMusic = null;
var soundOn = true;

function playSound(fileName) {
	if (!soundOn) {
		return;
	}

	var audio = soundDict[fileName];
	if (audio == null) {
		soundDict[fileName] = new Audio("/sounds/" + fileName);
		audio = soundDict[fileName];
	}
	audio.play();
}

function playMusic(fileName) {
	if (!soundOn) {
		return;
	}

	if (activeMusic != null) {
		activeMusic.pause();
		activeMusic.currentTime = 0;
	}

	activeMusic = musicDict[fileName];
	if (activeMusic == null) {
		musicDict[fileName] = new Audio("/music/" + fileName);
		activeMusic = musicDict[fileName];
	}
	activeMusic.play();
}

function stopMusic() {
	if (!soundOn) {
		return;
	}

	if (activeMusic != null) {
		activeMusic.pause();
		activeMusic.currentTime = 0;
	}
}
