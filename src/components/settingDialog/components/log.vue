<template>
  <div>
    <p>日志</p>
    <el-divider style="border-top: 1px solid #565e66" />
    <el-form
      label-position="right"
      label-width="120px"
      :model="logForm"
      style="max-width: 460px"
    >
      <el-form-item label="日志文件夹">
        <el-input v-model="logForm.name" />
      </el-form-item>
      <el-form-item label="日志上传服务器">
        <el-input v-model="logForm.region" />
      </el-form-item>
      <el-form-item label="启用日志">
        <el-switch v-model="logForm.type" />
      </el-form-item>
    </el-form>
    <div class="log-btn">
      <el-button color="#4BBEF7" :dark="true" plain >清理日志</el-button>
      <el-button color="#FFAE00" :dark="true" plain style="margin-left: 3vw;">发送日志</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElButton,
} from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";

const logForm = ref({ name: "", region: "", type: "" });
</script>

<style lang="scss" scoped>
.log-btn {
  @include flexCenter;
}
</style>
