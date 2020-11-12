import { useState } from "react";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";

let stream;
let recorder;
let dateStarted;
let interval;

export default function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

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

    dateStarted = new Date().getTime();

    interval = setInterval(() => {
      setDuration((new Date().getTime() - dateStarted) / 1000);
    }, 1000);

    setIsRecording(true);
  }

  async function stopRecording() {
    clearInterval(interval);

    await recorder.stopRecording();

    stream.stop();

    setIsRecording(false);

    return await recorder.getBlob();
  }

  return { isRecording, startRecording, stopRecording, duration };
}
