import "./App.css";

import recorder from "./recorder";

function App() {
  return (
    <div className="App">
      {/* <audio ref={audio} controls autoPlay playsInline></audio> */}
      <button onClick={() => recorder.start()}>Start recording</button>
      <button onClick={() => recorder.stop()}>Stop recording</button>
    </div>
  );
}

export default App;
