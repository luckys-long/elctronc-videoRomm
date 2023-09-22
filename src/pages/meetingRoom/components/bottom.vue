<template>
  <div class="room-bottom">
    <div class="operation-btns">
      <el-button round @click="isShow = true">
        <i class="iconfont icon-adduser"></i
      ></el-button>
      <el-button round @click="toggleMute">
        <i class="iconfont icon-Microphone"></i
      ></el-button>
      <el-button round @click="unpublishOwnFeed"> <i class="iconfont icon-shexiangtou"></i></el-button>
      <el-button round> <i class="iconfont icon-fenxiang"></i></el-button>
      <el-button round> <i class="iconfont icon-renqun-01"></i></el-button>
      <el-button round>
        <i class="iconfont icon-luzhi" @click="handleRecording"></i
      ></el-button>
      <el-button round> <i class="iconfont icon-yunliao"></i></el-button>
      <el-button round> <i class="iconfont icon-2"></i></el-button>
    </div>
    <el-button round class="end-icon">
      <i class="iconfont icon-guaduan"></i
    ></el-button>
  </div>
  <add-members
    :isShow="isShow"
    :before-close="() => (isShow = false)"
    :doAddHandle="() => (isShow = false)"
  ></add-members>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { ipcRenderer } from "electron";
import { Delete, Edit, Avatar } from "@element-plus/icons-vue";

import ScreenRecorder from "@/mesh/screenRecording";

const isShow = ref(false);

const AddMembers = defineAsyncComponent(() => import("./addMembers.vue"));

// @ts-ignore
const globalProperties =getCurrentInstance().appContext.config.globalProperties;
const $janusHandle = globalProperties.$janusHandle;

let Recorder: {
  startRecording(): unknown;
  stopRecording: () => void;
};

onMounted(() => {
  Recorder = new ScreenRecorder();
});
const handleRecording = () => {
  Recorder.startRecording();
};

const toggleMute = () => {
  let muted = $janusHandle.isAudioMuted();
  if (muted) {
    $janusHandle.unmuteAudio();
  } else {
    $janusHandle.muteAudio();
  }
  muted = $janusHandle.isAudioMuted();
};

const unpublishOwnFeed = () => {
  // Unpublish our stream
  let unpublish = { request: "unpublish" };
  $janusHandle.send({ message: unpublish });
};


</script>

<style lang="scss" scoped>
.room-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: vh(75);
  min-height: 60px;
  background: #34363c;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.4);
  @include flexCenter;
  .end-icon {
    position: fixed;
    background: #da4532;
    border-color: #da4532;
    color: #fff;
    right: vw(65);
    width: vw(82);
    height: 40px;
  }
}
</style>
