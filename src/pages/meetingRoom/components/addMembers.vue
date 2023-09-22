<template>
  <div class="form-wrap">
    <el-dialog
      :model-value="isShow"
      title="添加会议成员"
      width="43.2%"
      :before-close="handleClosed"
    >
      <div class="box-wrap">
        <div class="left">
          <el-input
            v-model="input2"
            placeholder="请输入"
            style="
              width: 15vw;
              height: 39px;
              margin-top: 18px;
              margin-left: 16px;
              margin-bottom: 10px;
            "
          >
            <template #append>
              <el-icon> <Search /> </el-icon
            ></template>
          </el-input>
          <el-tree
            ref="treeRef"
            :data="data"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            @check="currentChecked"
          />
        </div>
        <div class="right">
          <p>已添加{{ selectedList?.length }}个成员</p>
          <div class="right-item" v-for="item in selectedList" :key="item.id">
            <span>{{ item.label }}</span>
            <el-icon style="cursor: pointer" @click="handleDel(item)">
              <Close />
            </el-icon>
          </div>
        </div>
        <img class="arrow-img" :src="arrow" alt="箭头" />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleSubmit" type="success" style="width: 242px"
            >完成</el-button
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
  ElCheckbox,
  ElFormItem,
  ElDialog,
  ElTree,
  ElIcon,
} from "element-plus";
import { Close, Search } from "@element-plus/icons-vue";
import arrow from "@/assets/imgs/arrow.png";

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

const defaultProps = {
  children: "children",
  label: "label",
};

const treeRef = ref<InstanceType<typeof ElTree>>();

const input2 = ref("");

const selectedList = ref([{id:'',label:''}]);

// 点击删除按钮
const handleDel = (item: { id: any; }) => {
  const _id = item.id;
  selectedList.value = selectedList.value.filter((item) => item.id !== _id);

  const checkedKeys = selectedList.value.map((item) => item.id);
  treeRef.value!.setCheckedKeys(checkedKeys, false);
};

const data = [
  {
    id: 1,
    label: "巷道二组",
    children: [
      {
        id: 4,
        label: "张三",
      },
    ],
  },
  {
    id: 2,
    label: "变电所三组",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "变电所组二",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];

const currentChecked = (checkedNodes: any, checkedKeys: { checkedNodes: any[]; }) => {
  selectedList.value = checkedKeys.checkedNodes.filter(
    (item: { children: any; }) => !item.children
  );
};
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

.box-wrap {
  display: flex;
  justify-content: space-between;

  .left {
    width: vw(335);
    height: vh(385);
    background: rgba(120, 120, 120, 0.35);
    padding-left: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .right {
    width: vw(335);
    height: vh(385);
    background: rgba(120, 120, 120, 0.35);
    padding-left: vw(10);
    padding-right: vw(10);
    overflow-y: auto;
    overflow-x: hidden;
    p {
      margin-top: vh(28);
      margin-left: vw(24);
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 45px;
      opacity: 0.48;
    }

    .right-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }
  }

  .arrow-img {
    position: absolute;
    width: vw(49);
    height: vh(44);
    left: vw(386);
    top: vh(234);
    transform: rotate(-90deg);
  }

  :deep(.el-tree) {
    background: transparent;
    color: #fff;
    --el-tree-node-content-height: 26px;
    --el-tree-node-hover-bg-color: none;
    --el-tree-text-color: #fff;
    --el-tree-expand-icon-color: var(--el-text-color-placeholder);
  }

  :deep(.el-input-group__append) {
    width: 53px;
    height: 36px;
    background: #2b2f34;
    opacity: 0.71;
  }
  :deep(.el-tree-node__content) {
    margin-bottom: 3px;
  }
}
</style>
