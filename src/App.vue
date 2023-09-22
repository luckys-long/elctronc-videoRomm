<template>
  <div id="app-view" style="height: 100%; overflow: hidden">
    <div class="back">
      <el-button @click="goBack" type="primary">返回上一级</el-button>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const route = useRoute();
const goBack = () => {
  if (route.name !== "login") {
    router.go(-1);
  }
};
</script>
<style lang="scss">
.back {
  position: fixed;
  right: 1vw;
  top: 14vh;
}
</style>
