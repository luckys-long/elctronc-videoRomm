<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="form" label-width="200px">
        <customer-divider label="语言" />
        <el-row>
          <el-col :span="24">
            <el-form-item label="语言">
              <el-select
                v-model="value"
                class="m-2"
                placeholder="WASPI:扬声器（Realtk(R)Audio）——(0.0.0.0)..."
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <customer-divider label="路径" />
        <el-col :span="18">
          <el-form-item label="已保存的截图文件夹">
            <el-input v-model="form.resource" placeholder="Please input">
              <template #append>
                <el-icon><Folder /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="已保存的呼叫文件夹">
            <el-input v-model="form.resource" placeholder="Please input">
              <template #append
                ><el-icon><Folder /></el-icon
              ></template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="下载文件夹">
            <el-input v-model="form.resource" placeholder="Please input">
              <template #append
                ><el-icon><Folder /></el-icon
              ></template>
            </el-input>
          </el-form-item>
        </el-col>
        <customer-divider label="用户界面数据" />
        <el-form-item label-width="300px">
          <el-button color="#4BBEF7" :dark="true" plain>擦除头像</el-button>
        </el-form-item>
        <customer-divider label="其他" />
        <el-row>
          <el-col :span="12">
            <el-form-item label="启动接听">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启动通知铃声">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  ElDivider,
  ElInputNumber,
  ElSwitch,
  ElSlider,
  ElInput,
  ElForm,
  ElFormItem,
  ElCol,
  ElRow,
  ElButton,
  ElRadioButton,
  ElRadioGroup,
  ElIcon,
  ElSelect,
  ElOption,
} from "element-plus";
import { Folder } from "@element-plus/icons-vue";
import CustomerDivider from "@/components/customerDivider.vue";

const form = ref({ resource: "", name: false });

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  --el-border-color: #616a73;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  background: #717377;
}
</style>
