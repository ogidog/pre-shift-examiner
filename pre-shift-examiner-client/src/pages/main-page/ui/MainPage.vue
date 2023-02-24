<template>
  <div class="c-main">
    <InfoPanel/>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {InfoPanel} from "@/widgets/info-panel/ui";
</script>

<style scoped>

@media (max-width: 1024px) {
  .c-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    height: 100%;
    width: 100%;
  }
}

@media (min-width: 1025px) {
  .c-main {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    width: 1025px;
    height: 768px;
  }
}

</style>
