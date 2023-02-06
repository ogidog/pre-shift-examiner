<template>
  <div class="c-button" @click="clickHandler"></div>
</template>

<script setup lang="ts">
import {uiStore} from "@/store/uiStore"

const clickHandler = () => {
  uiStore.setVirtualKeyBoardVisible();
}
</script>

<style scoped>
.c-button {

  width: 40px;
  height: 40px;

  background: url("@/assets/images/keyboard-1385.png") center/100% no-repeat;
  background-origin: content-box;
  background-color: white;

  border-radius: 2px;
  border: 1px solid #bdbdbd;

  padding: 5px;

  cursor: pointer;
}
</style>
