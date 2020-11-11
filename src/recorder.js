import RecordRTC, { StereoAudioRecorder } from "recordrtc";

var recorder; // globally accessible

const audio = new Audio();

function captureMicrophone(callback) {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(callback)
    .catch(function (error) {
      alert("Unable to access your microphone.");
      console.error(error);
    });
}

function startRecording() {
  // this.disabled = true;
  captureMicrophone(function (microphone) {
    audio.srcObject = microphone;

    recorder = RecordRTC(microphone, {
      type: "audio",
      recorderType: StereoAudioRecorder,
      desiredSampRate: 16000,
    });

    recorder.startRecording();

    // release microphone on stopRecording
    recorder.microphone = microphone;

    // document.getElementById("btn-stop-recording").disabled = false;
  });
}

function start() {
  startRecording();
}

async function stop() {
  recorder.stopRecording(() => {
    audio.srcObject = null;
    var blob = recorder.getBlob();
    audio.src = URL.createObjectURL(blob);

    recorder.microphone.stop();

    audio.play();
  });
}

export default { start, stop };
