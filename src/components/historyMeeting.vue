<template>
  <div class="list-wrap">
    <el-dialog
      :model-value="isShow"
      title="历史会议"
      width="21.2%"
      :before-close="handleClosed"
    >
      <el-input
        v-model="input1"
        class="search"
        size="large"
        placeholder="会议名称、会议号、发起人"
        :suffix-icon="Search"
      />
      <div class="list">
        <div v-for="item in hitoryList">
          <p class="title">
            <span>{{ item.date }}</span> <span>{{ item.year }}</span>
          </p>
          <el-divider style="border-top: 1px solid #565e66" />
          <div class="cur-list">
            <div class="cur-item" v-for="i in item.todayMeetingList">
              <p>{{ i.meetingNum }}</p>
              <p style="font-size: 20px; margin: 10px 0; font-weight: 600">
                {{ i.meetingTitle }}
              </p>
              <p style="opacity: 0.57">
                <span>时间: 10:58</span>
                <span style="margin-left: 20px">发起人: {{ i.name }}</span>
              </p>
              <el-divider style="border-top: 1px solid #565e66" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElForm,
  ElInput,
  ElCheckbox,
  ElFormItem,
  ElDialog,
  ElCol,
  ElDivider,
} from "element-plus";
import { Search } from "@element-plus/icons-vue";

type Props = {
  isShow: boolean;
  beforeClose(): void;
  doAddHandle?: () => void;
};

const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  doAddHandle: () => {
    /* doAddHandle */
  },
});

const input1 = ref("");

const hitoryList = ref([
  {
    date: "7月29日 周六",
    year: "2023年",
    todayMeetingList: [
      { name: "李四", meetingNum: "360 977 004", time: "10:59" ,meetingTitle:'站立会议'},
      { name: "allen", meetingNum: "360 977 004", time: "11:59" ,meetingTitle:'站立会议'},
    ],
  },
  {
    date: "7月28日 周五",
    year: "2023年",
    todayMeetingList: [
      { name: "张三", meetingNum: "360 977 004", time: "10:59",meetingTitle:'站立会议' },
    ],
  },
  {
    date: "7月30日 周日",
    year: "2023年",
    todayMeetingList: [
      { name: "王五", meetingNum: "360 977 004", time: "10:59" ,meetingTitle:'周会'},
    ],
  },
]);

const handleClosed = () => {
  props.beforeClose();
};

const handleSubmit = () => {
  props.doAddHandle();
};
</script>

<style lang="scss" scoped>
.list-wrap {
  color: #ffffff;
  background: #1d2329;
  .list {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      :nth-child(1) {
        font-size: 19px;
        font-weight: 600;
      }
      :nth-child(2) {
        font-size: 18px;
        opacity: 0.57;
      }
    }
  }
  :deep(.el-dialog__header) {
    background-color: #34363c;
    margin-right: 0;
    min-width: 300px;
  }

  :deep(.el-dialog__title) {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }

  :deep(.el-icon svg) {
    color: #fff;
  }
  :deep(.el-dialog__body) {
    background: $themeColor;
    color: #ffffff;
    height: vh(680);
    padding-top: 9px;
    min-width: 300px;
    overflow: hidden;
   
  }
  :deep(.el-dialog__footer) {
    background: $themeColor;
    color: #ffffff;
    @include flexCenter;
  }

  :deep(.el-input) {
    --el-input-bg-color: transparent;
    font-weight: 500;
    color: #ffffff;
    border: 1px solid #616a73;
  }
  :deep(.el-input .el-input__inner) {
    box-shadow: none;
    font-weight: 500;
    color: #ffffff;
  }
  :deep(.el-divider--horizontal) {
    margin: 18px 0;
  }
}
</style>
