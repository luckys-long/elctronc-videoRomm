<template>
  <div class="room-header" style="-webkit-app-region: drag">
    <div class="h-left">
      <span>会议号: #{{ 779 - 2885 - 8997 }}</span>
    </div>

    <div class="h-center">
      <span> 煤矿二号井升级改造</span>
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
import { Tools } from "@element-plus/icons-vue";


const SettingDialog = defineAsyncComponent(
  () => import("@/components/settingDialog/index.vue")
);

const isShow = ref(false);
</script>

<style lang="scss" scoped>


.room-header {
  background: #34363c;
  height: vh(82);
  min-height: 62px;
  padding-left: vw(59);
  padding-right: vw(44);
  color: #fefefe;
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
    justify-content:flex-start;
    align-items: center;
    :deep(.el-icon){
      margin-left: 1vw;
      cursor: pointer;
      width: vw(44);
      height: vw(44);
    }
  }
}
</style>
