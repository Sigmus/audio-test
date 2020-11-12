import { useState } from "react";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";

let stream;
let recorder;
let dateStarted;
let interval;

export default function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [permission, setPermission] = useState("pending"); // pending, prompt, grant, denied

  async function initMic() {
    try {
      const perms = await navigator.permissions.query({ name: "microphone" });

      if (perms.state === "denied") {
        setPermission("denied");
        return;
      }

      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setPermission("granted");
    } catch (error) {
      setPermission("denied");
    }
  }

  async function startRecording() {
    await initMic();

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

  return {
    initMic,
    isRecording,
    startRecording,
    stopRecording,
    permission,
    duration,
  };
}
