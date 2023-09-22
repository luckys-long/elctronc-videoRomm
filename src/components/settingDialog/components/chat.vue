<template>
  <el-row>
    <el-col :span="24">
      <el-form label-position="right" label-width="200px" :model="logForm">
        <CustomerDivider label="通话" />
        <el-row>
          <el-col :span="12">
            <el-form-item label="加密">
              <el-checkbox-group v-model="checkboxGroup3" size="small">
                <el-checkbox-button
                  v-for="city in cities"
                  :key="city"
                  :label="city"
                  >{{ city }}</el-checkbox-button
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自动录制通话">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="自动接听">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="硬化是强制性的">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="自动接听(使用视频)">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="延时(毫秒)">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="自动显示拨号盘">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在后台保留通话窗口">
              <el-switch v-model="logForm.type" />
            </el-form-item>
          </el-col>
        </el-row>
        <CustomerDivider label="聊天" />
        <el-form-item label="启用通知铃声">
          <el-switch v-model="logForm.type" />
        </el-form-item>
        <el-form-item label="文件服务器">
          <el-switch v-model="logForm.type" />
        </el-form-item>
        <el-form-item label="通知铃声">
          <el-switch v-model="logForm.type" />
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElSwitch,
  ElButton,
  ElRow,
  ElCol,
  ElCheckboxGroup,
  ElCheckboxButton,
} from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import CustomerDivider from "@/components/customerDivider.vue";

const checkboxGroup3 = ref(["Shanghai"]);
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

const logForm = ref({ name: "", region: "", type: "" });
</script>

<style lang="scss" scoped>
.log-btn {
  @include flexCenter;
}
.el-col-12 {
  flex: 0 0 45%;
}
</style>
