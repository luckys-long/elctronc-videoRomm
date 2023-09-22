<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="form" label-width="160px">
        <customer-divider label="传输"></customer-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="DTMF发送方式">
              <el-radio-group v-model="form.resource" size="small">
                <el-radio-button label="Sponsor" />
                <el-radio-button label="Venue" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许IPv6">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <customer-divider label="宽带控制"></customer-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下载速度限制Kbit/s">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传速度限制Kbit/s">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="启用自适应控流">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12"> </el-col>
        </el-row>
        <customer-divider label="在线状态" />
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用RLS URI">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <customer-divider label="网络协议端口" />
        <el-row>
          <el-col :span="8">
            <el-form-item label="端口">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="自动接听">
              <el-switch v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
  ElForm,
  ElFormItem,
  ElCol,
  ElRow,
  ElRadioButton,
  ElRadioGroup,
} from "element-plus";
import CustomerDivider from "@/components/customerDivider.vue";

const form = ref({ resource: "", name: false });
</script>

<style></style>
