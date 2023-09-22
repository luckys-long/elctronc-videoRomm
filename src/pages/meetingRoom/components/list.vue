<template>
  <div class="list-wrap">
    <Room v-if="isFull" v-model:show="isFull"></Room>
    <div class="item" v-for="item in list" v-else>
      <div
        class="item-name"
        :style="{ background: item.online ? '#30AFEE' : '#616A73' }"
      >
        {{ item.name }}
      </div>
      <CustomerLoading :show="!item.online"></CustomerLoading>
      <div class="full-icon">
        <i
          class="iconfont icon-quanpingmu"
          style="font-size: 25px"
          @click="handleFull"
        ></i>
      </div>
      <div class="sound-icon">
        <el-icon size="25">
          <Microphone v-if="item.online" /> 
          <Mute v-else />
        </el-icon>
      </div>
      <video ref="local_video" autoplay  v-if="false" ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElIcon, ElTabPane, ElTabs } from "element-plus";
import { FullScreen, Microphone, Mute } from "@element-plus/icons-vue";
import CustomerLoading from "@/components/customerLoding.vue";
import Room from "./room.vue";


const list = ref([
  { name: "李四", online: true },
  { name: "李四", online: true },
  { name: "李博才", online: false },
  { name: "李四", online: true },
  { name: "李四", online: true },
  { name: "李四", online: true },
  { name: "李四", online: false },
  { name: "李四", online: true },
  { name: "李四", online: true },
]);
// @ts-ignore
const globalProperties = getCurrentInstance().appContext.config.globalProperties; 
const  $janusHandle =globalProperties.$janusHandle
console.log("===>$janusHandle",$janusHandle);

const isFull = ref(false);

const handleFull = () => {
  isFull.value = true;
};



</script>

<style lang="scss" scoped>
.list-wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: calc(100vh - 13vh);
  padding: 18px;
  overflow: auto;
  .item {
    width: vw(521);
    height: vh(285);
    margin-left: 12px;
    margin-top: 5px;
    background: #171c20;
    color: #fff;
    @include flexCenter;
    flex-direction: column;
    position: relative;
    .full-icon {
      position: absolute;
      top: 10px;
      right: 17px;
      cursor: pointer;
    }
    .sound-icon {
      position: absolute;
      right: 17px;
      bottom: 10px;
      cursor: pointer;
    }
    .item-name {
      width: vw(136);
      height: vw(136);
      line-height: vw(136);
      @include flexCenter;
      border-radius: 50%;
      padding-left: 10px;
      padding-right: 10px;
      @include single-line;
    }
  }
  .video-item:hover {
    border: 2px solid #1ba264;
  }
}
</style>
