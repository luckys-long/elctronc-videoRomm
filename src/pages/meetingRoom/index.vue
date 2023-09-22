<template>
  <div>
    <room-header></room-header>
    <div style="display: flex;">
      <sider-bar></sider-bar>
      <List></List>
    </div>
    <bottom></bottom>
  </div>
  
</template>

<script setup lang="ts">
import RoomHeader from "./components/header.vue"
import SiderBar from "./components/sider.vue"
import Bottom from "./components/bottom.vue"
import List from "./components/list.vue"

</script>

<style></style>
