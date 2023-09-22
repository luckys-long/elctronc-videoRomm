<!-- peer to peer 点对点音视频通话 -->

<template>
  <div class="full-video">
    <div class="full-icon">
      <i
        class="iconfont icon-suoxiao"
        style="font-size: 25px"
        @click="$emit('update:show', false)"
      ></i>
    </div>
    <el-button @click="stopStream">Stop</el-button>
    <video
      id="myVideo"
      ref="remote_video"
      autoplay
      controls
      class="remote-video"
    ></video>
    <video ref="local_video" autoplay class="local-video"></video>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ElButton, ElRow, ElCol } from "element-plus";
import VideoMeeting from "@/mesh/videoMeeting";
import { ref } from "vue";
import { useRoomStore } from "@/stores/room";

import { useMitt } from "@/hooks/utils";
import janus from "janus-gateway";

// @ts-ignore
const globalProperties =
  getCurrentInstance().appContext.config.globalProperties;
const $janusHandle = globalProperties.$janusHandle;

let localTracks = {};
 let localVideos = 0;

const local_video = ref();
const remote_video = ref();

const emitter = useMitt();

let videoMeeting;

let feedStreams = {};
onMounted(async () => {
  // videoMeeting = new VideoMeeting();
  // let videoStream = await videoMeeting.getStream();
  // local_video.value!.srcObject = videoStream;
  registerUsername();
  getParticipant();
});

const registerUsername = () => {
  let register = {
    request: "join",
    room: 1234,
    ptype: "publisher",
    display: "longlong",
  };
  $janusHandle.send({ message: register });
};

const getParticipant = () => {
  $janusHandle.send({
    message: {
      request: "listparticipants",
      room: 1234,
      audio: true,
      video: true,
    },
    success: function (response) {
      // 成功回调中可以获取所有房间内发布者的列表
      const participants = response["participants"];
      console.log("===>participants", participants);
      //Todo 选择第一个用户开始订阅 默认只有一个流, 完了map 订阅会议室中所有人的流
      const firstPart = participants[0];
      startStream(firstPart);
    },
    error: function (error) {
      console.error("::: Error getting participant list :::", error);
    },
  });
};

const startStream = (selectedStream) => {
  // 获取到发布者的id
  var selectedStreamId = selectedStream?.["id"];
  if (selectedStreamId === undefined || selectedStreamId === null) {
    return console.log("::: No selected stream :::");
  }
  // 订阅流video和audio
  $janusHandle.send({
    message: {
      request: "join",
      feed: selectedStreamId,
      room: 1234,
      ptype: "subscriber",
      audio: true,
      video: true,
    },
  });
};

emitter.on("onremotestream", (stream) => {
  console.log("===>stream", stream);
  handleStream(stream);
});

emitter.on("onmessage", (obj) => {
  const { msg, jsdp } = obj || {};
  console.log("===>onmessage", msg, jsdp);
  const event = msg["videoroom"];
  if (event) {
    if (event === "joined") {
      publishOwnFeed(true);
      if (msg["publishers"]) {
        getParticipant();
      } else if (msg["publishers"]) {
      }
    }
  }
  handleSDP(jsdp);
});

emitter.on("onlocaltrack", (tracks) => {
  const { track, on } = tracks;
  console.log("====onlocaltrack", track, on);
  let trackId = track.id.replace(/[{}]/g, "");
  if (!on) {
    let stream = localTracks[trackId];
    if (stream) {
      try {
        let tracks = stream.getTracks();
        for (let i in tracks) {
          let mst = tracks[i];
          if (mst !== null && mst !== undefined) mst.stop();
        }
      } catch (e) {}
      Janus.attachMediaStream(local_video.value, stream);
    }
    if(track.kind === "video") {
      localVideos--;
    }
    
  }
});

const publishOwnFeed = (useAudio) => {
  let tracks = [];
  if (useAudio) {
    tracks.push({
      type: "audio",
      capture: true,
      recv: false,
    });
  }
  tracks.push({
    type: "video",
    capture: { width: 1920, height: 1080 },
    recv: false,
    simulcast: true,
    simulcastMaxBitrates: {
      high: 50_000_000,
      medium: 10_000_000,
      low: 5_000_000,
    },
  });
  $janusHandle.createOffer({
    tracks: tracks,
    customizeSdp: function (jsep) {},
    success: function (jsep) {
      let publish = { request: "configure", audio: useAudio, video: true };
      $janusHandle.send({ message: publish, jsep: jsep });
    },
    error: function (error) {
      if (useAudio) {
        publishOwnFeed(false);
      } else {
      }
    },
  });
};

const newRemoteFeed = (id, display, streams) => {
  let remoteFeed = null;
  if (!streams) {
    streams = feedStreams[id];
  }

  janus.attach({});
  
};

const handleSDP = (jsep) => {
  if (jsep !== undefined && jsep !== null) {
    $janusHandle.createAnswer({
      jsep,
      media: { audioSend: false, videoSend: false },
      success: keepRTC,
      error: function (error) {
        console.error("::: WebRTC error :::" + JSON.stringify(error));
      },
    });
  }
};

const keepRTC = (sdp) => {
  console.log("::: sdp :::", sdp);
  pluginHandler.value.send({
    message: { request: "start" },
    jsep: sdp,
  });
};

const handleStream = (stream) => {
  const streamRemote = new MediaStream();
  streamRemote.addTrack(stream);
  const videoElement = document.getElementById(videoId);
  videoElement.srcObject = streamRemote;
  videoElement.oncanplay = () => {
    videoElement.play();
  };
};

const stopStream = () => {
  $janusHandle.send({ message: { request: "stop" } });
  $janusHandle.hangup();
};
</script>

<style lang="scss">
.full-video {
  width: 85vw;
  height: calc(100vh - 18vh);
  position: relative;
  .full-icon {
    position: absolute;
    top: 23px;
    right: vw(61);
    z-index: 999;
    color: #fff;
    cursor: pointer;
  }

  .remote-video {
    width: vw(1585);
    height: vh(867);
  }
  .local-video {
    position: absolute;
    right: vw(80);
    bottom: vh(20);
    width: vw(611);
    height: vh(334);
  }
}
</style>
