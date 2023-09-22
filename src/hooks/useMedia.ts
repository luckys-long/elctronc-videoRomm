type SelectOption = {
  value: string;
  label: string;
};

const audioInputOptions = ref<SelectOption[]>([]);

const videoInputOptions = ref<SelectOption[]>([]);

const audioOutputOptions = ref<SelectOption[]>([]);

const microphoneVolume=ref<Number>(0)
const audioContext = ref<AudioContext>(new AudioContext()) 
const stream = ref<MediaStream | null>(null);

const initDevices = async () => {
  // 枚举 cameras 和 microphones
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const audioInputOptionsNew: SelectOption[] = [];
      const videoInputOptionsNew: SelectOption[] = [];
      const audioOutputOptionsNew: SelectOption[] = [];
      // 设备信息
      devices.forEach((deviceInfo) => {
        // console.log(
        //   `${deviceInfo.kind}: ${deviceInfo.label}  id = ${deviceInfo.deviceId}`
        // );
        if (deviceInfo.kind === "audioinput") {
          audioInputOptionsNew.push({
            value: deviceInfo.deviceId,
            label: deviceInfo.label,
          });
        } else if (deviceInfo.kind === "videoinput") {
          videoInputOptionsNew.push({
            value: deviceInfo.deviceId,
            label: deviceInfo.label,
          });
        } else if (deviceInfo.kind === "audiooutput") {
          audioOutputOptionsNew.push({
            value: deviceInfo.deviceId,
            label: deviceInfo.label,
          });
        }
      });
      audioInputOptions.value=audioInputOptionsNew
      videoInputOptions.value=videoInputOptionsNew
      audioOutputOptions.value=audioOutputOptionsNew
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
      return {};
    });
};



const closeStream = async () => {
  if (stream.value && stream.value.getTracks()) {
    stream.value.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });
  }
  stream.value=null;
  await audioContext.value?.close();
}

const getMicroVolume = async (mediaStream: MediaStream) => {
  /**
   * In this case the audioWorklet.addModule() method expects the path to point to your public folder. 
   * It can also be an external URL for example a link to Github repository that loads the JS file.
   * https://stackoverflow.com/questions/49972336/audioworklet-error-domexception-the-user-aborted-a-request
   */
  await audioContext.value?.audioWorklet.addModule('/vumeterProcessor.js');
  const microphone = audioContext.value?.createMediaStreamSource(mediaStream);
  const node = new AudioWorkletNode(audioContext.value, 'vumeter');

  node.port.onmessage = event => {
    let volume = 0;
    if (event.data.volume) volume = Math.round(event.data.volume);
    microphoneVolume.value=volume;
  }
  microphone?.connect(node).connect(audioContext.value.destination);
}



export const useMedia = (): any => ({
  initDevices,
  audioInputOptions,
  audioOutputOptions,
  videoInputOptions,
  closeStream,
  getMicroVolume,
  microphoneVolume,
  stream
});
