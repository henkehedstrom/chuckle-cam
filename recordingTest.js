const canvas = document.querySelector("canvas");
const recordBtn = document.querySelector("button");

let recording = false;
let mediaRecorder;
let recordedChunks;

recordBtn.addEventListener("click", () => {
  recording = !recording;
    if(recording){
            recordBtn.textContent = "Stop";
            const stream = canvas.captureStream(25);
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
        } else {
            recordBtn.textContent = "Record"
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
});