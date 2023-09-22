<template>
  <div class="tab-wrap">
    <el-dialog
      :model-value="isShow"
      title="设置"
      width="54.2%"
      :before-close="handleClosed"
    >
      <el-tabs type="border-card" class="demo-tabs" v-model="activeName">
        <el-tab-pane name="sip">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">SIP账号</span>
            </span>
          </template>
          <Sip></Sip>
        </el-tab-pane>
        <el-tab-pane name="audio">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">音频</span>
            </span>
          </template>
          <AudioSetting></AudioSetting>
          </el-tab-pane>
        <el-tab-pane name="video">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">视屏</span>
            </span>
          </template>
          <video-setting></video-setting>
        </el-tab-pane>
        <el-tab-pane name="chat">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">通话和聊天</span>
            </span>
          </template>
          <Chat/>
          </el-tab-pane>
        <el-tab-pane name="chatwork">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">网络</span>
            </span>
          </template>
          <Network></Network>
        </el-tab-pane>
        <el-tab-pane name="user">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">用户界面</span>
            </span>
          </template>
          <User/>
        </el-tab-pane>
        <el-tab-pane name="log">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon>
                <calendar />
              </el-icon>
              <span style="margin-left: 8px">日志</span>
            </span>
          </template>
            <Log></Log>
          </el-tab-pane>
      </el-tabs>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSubmit" type="success" style="width: 128px">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElIcon, ElTabPane, ElTabs } from "element-plus";
import { Calendar } from "@element-plus/icons-vue";
import Sip from "./components/sip.vue";
import Log from "./components/log.vue";
import VideoSetting from "./components/videoSetting.vue";
import Network from "./components/network.vue";
import User from "./components/user.vue";
import Chat from "./components/chat.vue";
import AudioSetting from "./components/audioSetting.vue";

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
const activeName=ref('sip')

const handleClosed = () => {
  props.beforeClose();
};

const handleSubmit = () => {
  props.doAddHandle();
};
</script>

<style lang="scss" scoped>
.tab-wrap {
  color: #ffffff;
  background: #1d2329;

  :deep(.el-dialog__header) {
    background-color: #34363c;
    margin-right: 0;
  }

  :deep(.el-dialog__title) {
    font-size: 20px;
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
  }

  :deep(.el-dialog__footer) {
    background: $themeColor;
    color: #ffffff;
    @include flexCenter;
  }


  :deep(.el-tabs--border-card) {
    background: transparent;
    border: 1px solid #616a73;
  }

  .demo-tabs {
    p {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.57;
    }
  }

  :deep(.el-form) {
    margin: 0 auto;
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
    font-weight: 400;
    font-family: Source Han Sans CN;
    color: #ffffff;
  }

  :deep(.el-tabs__nav-scroll) {
    background: #616a73;
    color: #fff;
  }

  :deep(.el-tabs__item.is-active) {
    color: #fff;
    background-color: #1d2329;
    border-right-color: #1d2329;
    border-left-color: #1d2329;
    border-bottom-color: #616a73;
  }

  :deep(.el-tabs__item) {
    color: #fff;
  }
  
  :deep(.el-input) {
    
    --el-input-bg-color: #34363C;
    font-weight: 500;
    color: #ffffff;
    border: 1px solid #616a73;
  }

  :deep(.el-input .el-input__inner) {
    box-shadow: none;
    font-weight: 500;
    color: #ffffff;
  }

  :deep(.el-tabs__nav-next) {
    background: #616a73;
  }

  :deep(.el-tabs__nav-prev) {
    background: #616a73;
  }
  :deep(.el-tabs__content) {
    height: vh(462);
    overflow-y: auto;
}
}
</style>
