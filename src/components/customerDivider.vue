<template>
  <p>{{ label }}</p>
  <el-divider style="border-top: 1px solid #565e66" />
</template>

<script setup lang="ts">
import { ElDivider } from "element-plus";

type Props = {
  label?: string;
};
withDefaults(defineProps<Props>(), {
  label: "",
});
</script>

<style></style>
