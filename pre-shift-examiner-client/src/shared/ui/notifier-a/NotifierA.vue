<template>
  <div class="notifier-container" v-if="uiStore.notifier.visible"
       :style="uiStore.notifier.error?{'color':'rgba(252, 16, 16, 0.48)'}:{'color':'lightgrey'}">
    {{ uiStore.notifier.message }}
    <ButtonA text="Закрыть" v-show="uiStore.notifier.error" @click="() => uiStore.notifier = {visible: false}"/>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import {uiStore} from "@/store";
import {ButtonA} from "@/shared/ui/button-a";

</script>

<style scoped>
.notifier-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "Days";
  font-weight: bold;
  font-size: 1.1em;
  color: lightgrey;

  width: 100%;
  height: 100%;
}
</style>
