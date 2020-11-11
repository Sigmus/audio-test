import { useRef } from "react";

import recorder from "./recorder";
import "./App.css";

function App() {
  const audioRef = useRef();

  return (
    <div className="App">
      <audio ref={audioRef} controls playsInline></audio>

      <section>
        <button onClick={() => recorder.start()}>Start recording</button>

        <button
          onClick={async () => {
            const blob = await recorder.stop();

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
