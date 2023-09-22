<template>
  <div class="menu">
    <div class="menu-box">
      <div
        v-for="item in list"
        @click="handleClick(item)"
        class="item"
        :class="activeItem === item.label ? 'active-item' : ''"
      >
        <img :src="item.icon" alt="图片未找到" />
        <div class="label">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon1 from "@/assets/imgs/加入会议.png";
import icon2 from "@/assets/imgs/开始会议.png";
import icon3 from "@/assets/imgs/预定会议.png";
import icon4 from "@/assets/imgs/历史会议.png";

const list = [
  { icon: icon1, label: "加入会议", url: "" },
  { icon: icon2, label: "开始会议", url: "" },
  { icon: icon3, label: "预定会议", url: "" },
  { icon: icon4, label: "历史会议", url: "" },
];

const emit = defineEmits(["clickItem"]);

const handleClick = (item: { label: string; }) => {
  activeItem.value = item.label;
  emit("clickItem", item.label);
};

const activeItem = ref("");
</script>

<style lang="scss">
.menu {
  height: calc(100vh - 11.2vh);
  width: vw(220);
  .menu-box {
    color: #fff;
    background: $siderBarthemeColor;
    height: 100%;
    width: 100%;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: vh(103);
    .item {
    width: vw(140);
    height: vw(140);
    border-radius: 10px;
    margin-bottom: vh(46);
    @include flexCenter;
    flex-direction: column;
    cursor: pointer;
    img {
      margin-top: 8px;
      width: vw(80);
      height: vw(80);
    }
  
    .label {
      margin-top: 8px;
      width: vw(125);
      height: vh(38);
      @include flexCenter;
      padding: 5px;
      span {
        font-size: 13px;
        font-family: Alibaba PuHuiTi 2;
        font-weight: normal;
        color: #6afdff;
      }
    }
  }
  .active-item {
    border: 1px solid #00ffff;
    border-radius: 10px;
  }
  }
}
</style>
