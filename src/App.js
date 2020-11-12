import { useRef } from "react";

import useAudioRecorder from "./useAudioRecorder";
import "./App.css";

function App() {
  const audioRef = useRef();

  const { isRecording, startRecording, stopRecording } = useAudioRecorder();

  return (
    <div className="App">
      <audio ref={audioRef} controls playsInline></audio>

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
    </div>
  );
}

export default App;
