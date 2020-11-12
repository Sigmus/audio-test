import { useRef } from "react";

import useAudioRecorder from "./useAudioRecorder";
import "./App.css";

function App() {
  const audioRef = useRef();

  const {
    isRecording,
    startRecording,
    stopRecording,
    duration,
    permission,
  } = useAudioRecorder();

  return (
    <div className="App">
      <audio ref={audioRef} controls playsInline></audio>

      <h4>{permission}</h4>

      <section>
        <button disabled={isRecording} onClick={() => startRecording()}>
          Start recording
        </button>

        <button
          disabled={!isRecording}
          onClick={async () => {
            const blob = await stopRecording();

            console.log(blob);

            audioRef.current.src = URL.createObjectURL(blob);
          }}
        >
          Stop recording
        </button>
      </section>

      {duration > 0 && <h2>{calculateTimeDuration(duration)}</h2>}
    </div>
  );
}

function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  if (hr <= 0) {
    return min + ":" + sec;
  }

  return hr + ":" + min + ":" + sec;
}

export default App;
