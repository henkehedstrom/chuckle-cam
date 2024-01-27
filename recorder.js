let recording = false;
let mediaRecorder;

let recordings = new Object();
let recordedChunksDic = new Object();


function startRecording(recordingName)
{
  console.log("Starting the recording with name: " + recordingName);
  const stream = outputCanvas.captureStream(25);
  recordings[recordingName] = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8',
                      ignoreMutedMedia: true
  });
  recordedChunksDic[recordingName] = [];
  recordings[recordingName].ondataavailable = e => {
      if(e.data.size > 0){
        recordedChunksDic[recordingName].push(e.data);
      }
  };
  recordings[recordingName].start();
}

function stopRecording(recordingName)
{
    console.log("Stopping the recording with name " + recordingName);
    recordings[recordingName].stop();
}

function viewRecording(recordingName)
{
    setTimeout(() => {
        let blob = getBlob(recordingName)
        const url = URL.createObjectURL(blob);
        const video = document.createElement("video");
        video.src = url;
        video.id = recordingName;
        document.body.appendChild(video);
    },0);
}

function getBlob(recordingName)
{
    const blob = new Blob(recordedChunksDic[recordingName], {
        type: "video/webm"
    });
    return blob;
}