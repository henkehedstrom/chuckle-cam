var soundDict = {};
var musicDict = {};
let activeMusic = null;
var soundOn = true;

function playSound(fileName, volume) {
	if (!soundOn) {
		return;
	}

	var audio = soundDict[fileName];
	if (audio == null) {
		soundDict[fileName] = new Audio("sounds/" + fileName);
		audio = soundDict[fileName];
	}
	if (typeof volume === Number) {
		audio.volume = volume;
	}
	audio.play();
}

function playMusic(fileName, volume) {
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
	if (typeof volume === Number) {
		activeMusic.volume = volume;
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
