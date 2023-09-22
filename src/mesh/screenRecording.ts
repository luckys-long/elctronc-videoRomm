/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

const { BrowserWindow, desktopCapturer, } = require("electron");


import fs from "fs";
import path from "path";

let i = 0;
let recorder = null;
export default class ScreenRecording {
  constructor() {
    this.desktopCapturer=desktopCapturer
  }

  /** 开始录制 */
  async startRecording() {
    let source;
    this.desktopCapturer.getSources(
      { types: ["window", "screen"] },
      (error, sources) => {
        if (error) throw error;
        console.log("===>",sources); // sources 当前屏幕和应用窗口的数组
        source = sources[0];
        const sourceId = source.id;
        let stream = navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: sourceId,
              maxWidth: window.screen.width,
              maxHeight: window.screen.height,
            },
          },
        });
        /*因为无法通过直接设置 audio: true 来获取音频，所以需要另外加入麦克风的音轨。*/
        stream.then((Mediastream) => {
          let audioTracks = navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          }).then(audioStream=>{
            Mediastream.addTrack(audioStream.getAudioTracks()[0]);
            // createRecorder
          }).catch(err=>console.error('startRecord error',err));
        });
      }
    );
  }

  /** 暂停录制 */
  pauseRecord(event: Event) {
    const mediaRecorderValue = this.mediaRecorder;
    if (mediaRecorderValue) {
      mediaRecorderValue.pause();
    }
  }

  /** 恢复录制 */
  resumeRecord(event: Event) {
    const mediaRecorderValue = this.mediaRecorder;
    if (mediaRecorderValue) {
      mediaRecorderValue.resume();
    }
  }

  /** 结束录制 */
  stopRecording() {
    const mediaRecorderValue = this.mediaRecorder;
    if (mediaRecorderValue) {
      mediaRecorderValue.stop();
    }
  }

  handleDataAvailable(e: BlobEvent) {
    if (e && e.data && e.data.size > 0) {
      this.recordBuffer.push(e.data);
    }
  }
  handleSace(blob: Blob) {
    let reader = new FileReader();
    reader.onload = () => {
      let buffer = new Buffer(reader.result);
      fs.writeFile("test" + i + ".mp4", buffer, {}, (err: any, res: any) => {
        if (err) return console.error(err, res);
      });
      i++;
    };
    reader.onerror = (err) => console.error(err);
    reader.readAsArrayBuffer(blob);
  }
}
