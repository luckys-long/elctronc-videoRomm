<template>
  <div class="card" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div class="title">{{ info.meetingName }}</div>
    <div class="wrap">
      <div class="left">
        <img :src="meeting" alt="#" />
      </div>
      <div class="right">
        <p>主持人: {{ info.hostName }}</p>
        <p>日期: xxx</p>
        <p>会议时间: xxx</p>
        <p>会议号码: xxx</p>
      </div>
    </div>

    <div class="hover-btn" v-show="isShow">
      <ElButton type="primary" style="border-radius: 15px" @click="handleJoin"
        >加入会议</ElButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";
import  meeting from '@/assets/imgs/meeting.png'

const router = useRouter();
type Props = {
  info?: any;
};
withDefaults(defineProps<Props>(), {
  info: {},
});

const isShow = ref(false);

const handleMouseOver = () => {
  isShow.value = true;
};
const handleMouseLeave = () => {
  isShow.value = false;
};
const handleJoin = () => {
  router.push("room");
};
</script>

<style lang="scss" scoped>
.card {
  width: vw(378);
  height: vh(242);
  background: #34363c;
  border-radius: 10px;
  // opacity: 0.75;
  margin: vw(5);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .title {
    color: #00a0ff;
    border-bottom: 1.2px solid #00a0ff;
    height: vh(71);
    @include flexCenter;
  }
  .wrap {
    @include flexCenter;
    height: 70%;
    .left {
      img {
        width: vw(89);
        height: vh(95);
        margin-right: vw(29);
        display: block;
        opacity: 0.37;
      }
    }
    .right {
      font-weight: 400;
      color: #ffffff;
      font-size: 16px;
      line-height: vh(30);
      font-family: Source Han Sans CN;
      opacity: 0.75;
    }
  }
}

.hover-btn {
  position: absolute;
  left: 35%;
  top: 35%;
  z-index: 999;
}
.card:hover {
  background: #171c20;
  border: 2px solid #00ffff;
}
</style>
