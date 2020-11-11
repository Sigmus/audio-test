import { useRef } from "react";
import "./App.css";

import RecordRTC, { StereoAudioRecorder } from "recordrtc";

var recorder; // globally accessible

function App() {
  const audio = useRef();

  function captureMicrophone(callback) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(callback)
      .catch(function (error) {
        alert("Unable to access your microphone.");
        console.error(error);
      });
  }

  function stopRecordingCallback() {
    audio.current.srcObject = null;
    var blob = recorder.getBlob();
    audio.current.src = URL.createObjectURL(blob);

    recorder.microphone.stop();
  }

  function startRecording() {
    // this.disabled = true;
    captureMicrophone(function (microphone) {
      audio.current.srcObject = microphone;

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

  return (
    <div className="App">
      <audio ref={audio} controls autoPlay playsInline></audio>
      <button onClick={() => startRecording()}>Start recording</button>
      <button onClick={() => recorder.stopRecording(stopRecordingCallback)}>
        Stop recording
      </button>
    </div>
  );
}

export default App;
