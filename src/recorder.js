import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";

let stream;
let recorder;

async function init() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  } catch (error) {
    alert("Unable to access your microphone.");
    console.error(error);
  }
}

async function start() {
  await init();

  recorder = new RecordRTCPromisesHandler(stream, {
    type: "audio",
    recorderType: StereoAudioRecorder,
    desiredSampRate: 16000,
  });

  recorder.startRecording();
}

async function stop() {
  await recorder.stopRecording();

  stream.stop();

  return await recorder.getBlob();
}

// eslint-disable-next-line
export default { start, stop };
