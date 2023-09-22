<template>
  <Header></Header>
  <div class="wrap">
    <sider-bar @click-item="handleClick"></sider-bar>

    <div class="main-content">
      <div class="main-title">
        <span>{{ selectItem }}</span>
        <ElButton @click="isShow = true">新增预定会议</ElButton>
      </div>

      <div class="no-data" v-if="list.length === 0">
        <img :src="nodata" alt="暂无数据" />
        <p>这里暂时还没有会议,快去添加吧~</p>
      </div>
      <img :src="pre" alt="#" class="pre-icon" @click="hanldePrePage" />
      <div class="list">
        <MeetingCard v-for="(item, index) in currentData" :info="item" :key="index" />
      </div>
      <img :src="next" alt="#" class="next-icon" @click="handleNextPage" />
    </div>
  </div>
  <book-meeting
    :isShow="isShow"
    :before-close="beforeClose"
    :doAddHandle="doAddHandle"
    v-if="isShow"
  ></book-meeting>
  <join-meeting
    :isShow="isVisible"
    :before-close="() => (isVisible = false)"
    :doAddHandle="handleJoin"
    v-if="isVisible"
  ></join-meeting>

  <HistoryMeeting
    :isShow="isShowHitory"
    :before-close="() => (isShowHitory = false)"
    :doAddHandle="() => (isShowHitory = false)"
    v-if="isShowHitory"
  />
</template>

<script setup lang="ts">
import Header from "@/layout/components/header.vue";
import SiderBar from "@/layout/components/sider.vue";
import MeetingCard from "@/components/card.vue";
import { ElButton, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import nodata from "@/assets/imgs/nodata.png";
import pre from "@/assets/imgs/pre-icon.png";
import next from "@/assets/imgs/next-icon.png";
//@ts-ignore
import { useRoomEffect } from "@/hooks/useRoomEffect.js";

const router = useRouter();
// const {createRoomHandle} =useRoomEffect();

const BookMeeting = defineAsyncComponent(
  () => import("@/components/bookMeeting.vue")
);

const JoinMeeting = defineAsyncComponent(
  () => import("@/components/joinMeeting.vue")
);

const HistoryMeeting = defineAsyncComponent(
  () => import("@/components/historyMeeting.vue")
);

const isShow = ref(false);
const isVisible = ref(false);
const isShowHitory = ref(false);
const selectItem = ref("我的会议");

const pageNum = ref(1);
const pageSize = ref(12);
const currentData = ref<any>([]);
const totalPages = ref();
const list = ref<any>([]);


const handleClick = (label: string) => {
  if (label === "加入会议") {
    isVisible.value = true;
  } else if (label === "开始会议") {
    router.push("room");
  } else if (label === "预定会议") {
    isShow.value = true;
  } else if (label === "历史会议") {
    isShowHitory.value = true;
  }
  selectItem.value = label;
};

const beforeClose = () => {
  isShow.value = false;
};

const doAddHandle = () => {
  isShow.value = false;
};

const handleJoin = () => {
  isVisible.value = false;
  router.push("room");
};

const handleNextPage = () => {
  if (pageNum.value < totalPages.value) {
    pageNum.value++;
    paginate(list.value, 12, pageNum.value);
  }else{
    ElMessage({
      type:'warning',
      message:'已经到最后一页啦'
    })
  }
};

const hanldePrePage = () => {
  if(pageNum.value>1){
    pageNum.value--;
    paginate(list.value, 12, pageNum.value);
  }else{
    ElMessage({
      type:'warning',
      message:'已经到第一页啦'
    })
  }
  
};

const paginate = (
  data: string | any[],
  pageSize: number,
  pageNumber: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;

  const endIndex = startIndex + pageSize;

  const pageData = data.slice(startIndex, endIndex);
  currentData.value=pageData
};

 const initTotalList = () => {
  list.value = [
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
    { hostName: "1", meetingName: "煤矿xxx会议" },
  ];
  totalPages.value = Math.ceil(list.value.length / pageSize.value);
  paginate(list.value, 12, pageNum.value);
};

onMounted(() => {
  initTotalList();
});
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
}
.main-content {
  width: vw(1616);
  height: vh(894);
  margin: vw(28) vh(30);
  background: #171c20;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;

  .main-title {
    color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
  }
  .pre-icon {
    position: fixed;
    left: 12.5vw;
    top: 48vh;
    z-index: 999;
    width: vw(66);
    height: vw(66);
    cursor: pointer;
  }

  .next-icon {
    position: fixed;
    z-index: 999;
    right: 2vw;
    top: 48vh;
    width: vw(66);
    height: vw(66);
    cursor: pointer;
  }
  .no-data {
    width: 100%;
    height: 100%;
    @include flexCenter;
    flex-direction: column;
    img {
      width: 32vw;
      height: 41vh;
    }
    p {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.35;
      margin-top: 20px;
    }
  }
}
</style>
