<template>
  <div class="doting" v-if="show">
    <div class="point1"></div>
    <div class="point2"></div>
    <div class="point3"></div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  show?: boolean;
};
withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<style lang="scss" scoped>
.doting > div {
  margin-top: 10px;
  width: 10px;
  height: 10px;
  margin-left: 10px;
  background-color: #616a73;
  border-radius: 50%;
  display: inline-block;
  animation: action 1.8s infinite ease-in-out;
  animation-fill-mode: both;
}
.content .point1 {
  animation-delay: -0.8s;
}
.content .point2 {
  animation-delay: -0.5s;
}

@keyframes action {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.3);
  }
}
</style>
