<template>
  <div class="header" style="-webkit-app-region: drag">
    <div class="h-left">
      <p>双兴矿用视屏会议系统</p>
      <p>SHUANGXING MINING VIDEO CONFERENCE SYSTEM</p>
    </div>
    <div class="h-right">
      <span>2021/07/12 10:10:22</span>
      <span>|</span>
      <span>李书伟</span>
      <el-icon @click="isShow = true"><Tools /></el-icon>
    </div>
  </div>
  <setting-dialog
    :isShow="isShow"
    :before-close="() => (isShow = false)"
    :doAddHandle="() => (isShow = false)"
  ></setting-dialog>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";
import { Tools,Plus } from "@element-plus/icons-vue";
import { ipcRenderer } from 'electron'

const SettingDialog = defineAsyncComponent(
  () => import("@/components/settingDialog/index.vue")
);

const zoomIn = () => {
  // this.$electron.ipcRenderer.send("window-min");
};
const zoomOut = () => {
  console.log(1111);
};
const close = () => {
  // $electron.ipcRenderer.send("window-close");

};

const isShow = ref(false);
</script>

<style lang="scss" scoped>
.header {
  background: #34363c;
  height: vh(121);
  padding-left: vw(59);
  padding-right: vw(44);
  align-items: center;
  display: flex;
  justify-content: space-between;
  .h-left {
    color: #00a0ff;
    text-align: left;
    :nth-child(1) {
      font-size: 21px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
    }
    :nth-child(2) {
      font-size: 12px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #00a0ff;
    }
  }
  .h-right {
    color: #fefefe;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    :deep(.el-icon) {
      margin-left: 1vw;
      cursor: pointer;
      width: vw(44);
      height: vw(44);
    }
  }
}
</style>
