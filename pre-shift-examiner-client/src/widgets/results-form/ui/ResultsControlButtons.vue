<template>
  <div class="c-controls">
    <ButtonA text="Закрыть" @click="closeHandler"/>
  </div>
</template>

<script setup lang="ts">
import {ButtonA} from "@/shared/ui/button-a";
import router from "@/router/router";
import {testingStore, uiStore, userStore} from "@/store";
import {onMounted, onUnmounted} from "vue";

let timeoutId: number;

const closeHandler = async () => {
  await router.push("/");
  await testingStore.setDefaultState();
  await userStore.setDefaultState();
  await uiStore.setDefaultState();
}

onMounted(() => timeoutId = setTimeout(() => closeHandler(), 10000));
onUnmounted(() => clearTimeout(timeoutId))

</script>

<style scoped>
.c-controls {
  margin-top: 30px;
}
</style>
