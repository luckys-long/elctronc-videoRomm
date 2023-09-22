<template>
  <div class="sip-content">
    <p>默认身份</p>
    <el-divider style="border-top: 1px solid #565e66" />
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="显示名称">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.region" />
      </el-form-item>
      <el-form-item label="SIP地址">
        <el-input v-model="formLabelAlign.type" />
      </el-form-item>
    </el-form>

    <div style="display: flex; justify-content: space-between">
      <span>代理账号</span>
      <el-button type="success" size="small" :icon="Plus" @click="handleAdd"
        >添加账号</el-button
      >
    </div>
    <el-divider style="border-top: 1px solid #565e66" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="account" label="账户">
        <template #default="scope">
          <p v-show="scope.row.isEdit" @dblclick="scope.row.isEdit = false">
            {{ scope.row.account }}
            <el-icon
              :size="20"
              @click="scope.row.isEdit = false"
              style="margin-left: 10px; transform: translateY(5px)"
            >
              <Edit />
            </el-icon>
          </p>
          <el-input
            v-show="!scope.row.isEdit"
            v-model="scope.row.account"
            @blur="scope.row.isEdit = true"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-icon
            :size="20"
            style="margin-left: 10px"
            @click="handleDelete(scope.$index, scope.row)"
          >
            <Delete />
          </el-icon>
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
  ElTable,
  ElTableColumn,
  ElIcon,
  ElButton,
} from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});

const tableData = ref([
  {
    account: "SIP:2753501@192.168.20.32",
    isEdit: true,
  },
  {
    account: "SIP:1005@192.168.0.143",
    isEdit: true,
  },
]);

const handleDelete = (index: number, row: any) => {
  console.log(index, row);
  tableData.value.splice(index, 1);
};

const handleAdd = () => {
  tableData.value.push({
    account: "",
    isEdit: false,
  });
};


</script>

<style lang="scss" scoped>
.sip-content {
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
}
</style>
