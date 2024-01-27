let recording = false;
let mediaRecorder;
let recordedChunks;

let recordingDictionary = new Object();


function startRecording(recordingName)
{
  console.log("Starting the recording with name: " + recordingName);
  const stream = outputCanvas.captureStream(25);
  recordingDictionary[recordingName] = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
                      ignoreMutedMedia: true
  });
  recordedChunks = [];
  recordingDictionary[recordingName].ondataavailable = e => {
      if(e.data.size > 0){
          recordedChunks.push(e.data);
      }
  };
  recordingDictionary[recordingName].start();
}

function stopRecording(recordingName)
{
    console.log("Stopping the recording with name " + recordingName);
    recordingDictionary[recordingName].stop();
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

function viewRecording(recordingName)
{
    
}