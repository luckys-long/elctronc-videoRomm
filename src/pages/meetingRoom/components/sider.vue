<template>
  <el-menu
    class="el-menu-demo"
    background-color="#171C20"
    text-color="#fff"
    active-text-color="#4BBEF7"
    @select="handleSelect"
  >
    <el-sub-menu v-for="(item, index) in groupPersons" :index="item.id">
      <template #title>{{ item.name }}</template>
      <el-menu-item :index="i.id" v-for="(i, index) in item.children">{{
        i.name
      }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  ElMenu,
  ElMenuItem,
  ElSubMenu,
} from "element-plus";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const groupPersons = [
  {
    name: "领导群组",
    id: "1",
    children: [
      { name: "张贵轩", id: "1-1" },
      { name: "张贵轩", id: "1-2" },
      { name: "李书伟", id: "1-3" },
    ],
  },
  {
    name: "巷道二组",
    id: "2",
    children: [
      { name: "张贵轩", id: "2-1" },
      { name: "张贵轩", id: "2-2" },
      { name: "李书伟", id: "2-3" },
    ],
  },
  {
    name: "变电所三组",
    id: '3',
    children: [
      { name: "张贵轩", id: "3-1" },
      { name: "张贵轩", id: "3-2" },
      { name: "李书伟", id: "3-3" },
    ],
  },
];
</script>


<style lang="scss" scoped>
.el-menu-demo {
  width: vw(270);
  min-width: 240px;
  height: calc(100vh - 7.5vh);
  overflow-x: hidden;
  overflow-y: auto;
  border: none;
}

:deep(.el-menu-item is-active) {
  border-left: 2px solid #4bbef7;
}
</style>
