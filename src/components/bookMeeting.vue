<template>
  <div class="form-wrap">
    <el-dialog :model-value="isShow"  title="新增预定会议" width="28.2%"  :before-close="handleClosed">
      <el-form :model="form">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入会议主题"/>
        </el-form-item>
        <el-form-item label="开始" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="请选择会议时间"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500"> </span>
          </el-col>
          <el-col :span="8">
            <el-time-picker
              v-model="form.date2"
              placeholder=""
              format="HH:mm"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="时长" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择会议时长">
            <el-option label="15分钟" value="15" />
            <el-option label="30分钟" value="30" />
          </el-select>
        </el-form-item>
        <el-form-item label="安全" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.type">
            <el-col style="display: flex;">
              <el-checkbox label="入会密码" name="type" />
              <el-input v-model="form.name" style="margin-left: 20px;" /> 
            </el-col>
            <el-checkbox label="允许成员在主持人进会前加入会议" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="静音" :label-width="formLabelWidth">
            <el-col>
            <p>成员入会时静音</p>
        </el-col>
          <el-radio-group v-model="form.resource">
            <el-radio label="开启" />
            <el-radio label="关闭" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文档" :label-width="formLabelWidth">
            <el-checkbox v-model="form.resource">允许成员上传文档</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="handleSubmit"
            type="success"
            style="width: 242px"
            >预定会议</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElForm,
  ElInput,
  ElSelect,
  ElOption,
  ElRadio,
  ElCheckbox,
  ElFormItem,
  ElDialog,
  ElCol,
  ElDatePicker,
  ElTimePicker,
  ElCheckboxGroup,
  ElRadioGroup,
} from "element-plus";

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
  color: #FFFFFF;
  border: 1px solid #616A73;
}
  :deep(.el-input .el-input__inner) {
  box-shadow: none;
  font-weight: 500;
  color: #FFFFFF;
}
:deep(.el-checkbox__label) {
    font-weight: 500;
    color: #ffffff;
  }
  :deep(.el-radio__label) {
    font-weight: 500;
    color: #ffffff;
  }

  
}
</style>
