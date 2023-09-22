<template>
  <div class="form-wrap">
    <el-dialog
      :model-value="isShow"
      title="加入会议"
      width="21.2%"
      :before-close="handleClosed"
    >
      <el-form :model="form">
        <el-form-item label="会议号" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入会议号" />
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="会议设置" label-position="top">
          <el-checkbox-group v-model="form.type">
            <el-col> <el-checkbox label="自动链接音频" name="type" /></el-col>
            <el-col> <el-checkbox label="入会开启摄像头" name="type" /></el-col>
            <el-col> <el-checkbox label="入会开启麦克风" name="type" /></el-col>
            <el-col> <el-checkbox label="入会开启美颜" name="type" /></el-col>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSubmit" type="success" style="width: 242px"
            >加入</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import {
  ElButton,
  ElForm,
  ElInput,
  ElCheckbox,
  ElFormItem,
  ElDialog,
  ElCol,
  ElCheckboxGroup,
} from "element-plus";
import { useMitt } from '@/hooks/utils';
type Props = {
  isShow: boolean;
  beforeClose(): void;
  doAddHandle?: () => void;
};

const emitter = useMitt();
const props = withDefaults(defineProps<Props>(), {
  isShow: false,
  doAddHandle: () => {
    /* doAddHandle */
  },
});




const formLabelWidth = "80px";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});


const handleClosed = () => {
  emitter.emit('onmessage',{
  msg: 2,
  jsep: 3
})

  props.beforeClose();
};

const handleSubmit = () => {
  props.doAddHandle();
};


</script>

<style lang="scss" scoped>
.form-wrap {
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

  :deep(.el-checkbox__label) {
    box-shadow: none;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
