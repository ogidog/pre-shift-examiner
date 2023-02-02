<template>
  <div class="c-main">
    <InfoPanel/>
    <div class="c-router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {InfoPanel} from "@/widgets/info-panel/ui";
</script>

<style scoped>
/*.c-main {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: flex-start;*/

/*  height: 100%;*/
/*  width: 100%;*/
/*}*/

/*.c-router-view {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: flex-start;*/

/*  height: 100%;*/
/*  width: 100%;*/
/*}*/

@media (min-width: 1025px) {
  .c-main {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: start;

    width: 1025px;
    height: fit-content;
  }

  .c-router-view {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    height: 100%;
    width: 100%;
  }
}

</style>
