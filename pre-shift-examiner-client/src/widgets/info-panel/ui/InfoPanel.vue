<template>
  <div class="c-info-panel">
    <UserProfile/>
    <InfoCountDownTimer/>
  </div>
</template>

<script setup lang="ts">
import UserProfile from "./InfoUserProfile.vue";
import InfoCountDownTimer from "./InfoCountDownTimer.vue";
</script>

<style scoped>
.c-info-panel {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: fit-content;

  border-bottom: 1px solid rgba(107, 137, 234, 0.78);
}
</style>
