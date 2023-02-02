<template>
  <InfoPanel/>
  <router-view class="c-router-view"></router-view>
</template>

<script setup lang="ts">
import {InfoPanel} from "@/widgets/info-panel/ui";

</script>

<style scoped>
.c-router-view {
  height: 100%;
  width: 100%;
}
</style>
