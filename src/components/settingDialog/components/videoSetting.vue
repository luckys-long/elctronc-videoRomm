<template>
  <div class="video-content">
    <p>视屏捕捉参数</p>
    <el-divider style="border-top: 1px solid #565e66" />
    <el-form
      label-position="right"
      label-width="120px"
      :model="logForm"
      style="max-width: 460px"
    >
      <el-form-item label="视屏输入设备">
        <el-select v-model="logForm.region" placeholder="请选择">
          <el-option
            v-for="item in videoInputOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="视屏预设">
        <el-select v-model="logForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="视屏分辨率">
        <el-select v-model="logForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="log-btn">
      <el-button color="#4BBEF7" :dark="true" plain>视屏预览</el-button>
    </div>
    <p>视屏编解码器</p>
    <el-divider style="border-top: 1px solid #565e66" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="desc" label="描述信息" />
      <el-table-column prop="Hz" label="率(赫兹)" />
      <el-table-column prop="bite" label="比特率(Kbit/s)">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.bite"
            class="mx-4"
            :min="1"
            controls-position="right"
          />
        </template>
      </el-table-column>
      <el-table-column prop="params" label="参数">
        <template #default="scope">
          <el-input
            v-model="scope.row.params"
          />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch v-model="scope.row.status" />
        </template>
       </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElTableColumn,
  ElIcon,
  ElButton,
  ElTable,
  ElSelect,
  ElOption,
  ElInputNumber
} from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { useMedia } from "@/hooks/useMedia";

const {
  initDevices,
  audioInputOptions,
  audioOutputOptions,
  videoInputOptions,
} = useMedia();
const logForm = ref({ name: "", region: "", type: "" });

const tableData = ref([
  {
    name:'VP8',
    desc:'SIP:1005@192.168.0.143',
    Hz:'90000',
    bite:1500,
    params:'',
    status: false,
  },
  {
    name:'H264',
    desc:'SIP:1005@192.168.0.143',
    Hz:'90000',
    bite:1500,
    params:'753501@192.168',
    status: true,
  },

]);


onMounted(async () => {
  await initDevices();
});

</script>

<style lang="scss" scoped>
.log-btn {
  @include flexCenter;
}
.video-content {
  :deep(.el-table) {
    color: #fff !important;
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-row-hover-bg-color: transparent;
    --el-table-border-color: transparent;
  }

  :deep(.el-icon svg) {
    color: #fff;
    cursor: pointer;
  }
  :deep(.el-table__header) {
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.47;
  }
  :deep(.el-input-number__increase){
    background: #616A73;
    border: none;
  }
  :deep( .el-input-number__decrease){
    background: #616A73;
    border: none;
  }
  .el-input {
    --el-input-border-color:#616A73;
  }
 
}
</style>
