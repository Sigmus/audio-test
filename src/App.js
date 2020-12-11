import { useRef, useEffect } from "react";

import useAudioRecorder from "./useAudioRecorder";
import "./App.css";

function App() {
  const audioRef = useRef();

  useEffect(() => {
    const audioEl = new Audio();
    audioRef.current = audioEl;
  }, []);

  const {
    isRecording,
    startRecording,
    stopRecording,
    duration,
    permission,
  } = useAudioRecorder();

  return (
    <div className="App">
      {/* <div style={{ display: "none" }}>
        <audio ref={audioRef} controls playsInline></audio>
      </div> */}

      <h4>{permission}</h4>

      <section>
        <button
          onClick={() => {
            console.log("Playing it (still empty first time)");
            audioRef.current.play();
          }}
        >
          Click me first
        </button>
        <br />
        <br />
        <br />
        <button disabled={isRecording} onClick={() => startRecording()}>
          Start recording
        </button>
        <button
          disabled={!isRecording}
          onClick={() => {
            stopRecording().then((blob) => {
              console.log(blob);
              audioRef.current.src = URL.createObjectURL(blob);
            });
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
