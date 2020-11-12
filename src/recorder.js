import { useState } from "react";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";

let stream;
let recorder;

export default function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);

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

  async function startRecording() {
    await init();

    recorder = new RecordRTCPromisesHandler(stream, {
      type: "audio",
      recorderType: StereoAudioRecorder,
      desiredSampRate: 16000,
    });

    recorder.startRecording();
    setIsRecording(true);
  }

  async function stopRecording() {
    await recorder.stopRecording();
    stream.stop();
    setIsRecording(false);

    return await recorder.getBlob();
  }

  return { isRecording, startRecording, stopRecording };
}
