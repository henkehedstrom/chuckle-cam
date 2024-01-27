let recording = false;
let mediaRecorder;
let recordedChunks;

let recordingDictionary = new Object();


function startRecording()
{
  console.log("Starting the recording");
  const stream = outputCanvas.captureStream(25);
  mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
                      ignoreMutedMedia: true
  });
  recordedChunks = [];
  mediaRecorder.ondataavailable = e => {
      if(e.data.size > 0){
          recordedChunks.push(e.data);
      }
  };
  mediaRecorder.start();
}

function stopRecording()
{
    console.log("Stopping the recording and spawning video");
    mediaRecorder.stop();
  setTimeout(() => {
    const blob = new Blob(recordedChunks, {
        type: "video/webm"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("video");
    a.src = url;
    document.body.appendChild(a);
},0);
}