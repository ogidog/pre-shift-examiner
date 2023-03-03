<script setup lang="ts">
import {testingStore, uiStore} from "@/store";
import {ref, onMounted} from "vue";
import router from "@/router/router";
import {onBeforeRouteLeave} from "vue-router";

let remainTime = ref(0);

onMounted(() => {
  if (testingStore.settings.testDuration) {
    remainTime.value = testingStore.settings.testDuration!;
    let countDownTimer = setInterval(() => {
      remainTime.value--;

      if (remainTime.value === 0) {
        clearInterval(countDownTimer);
        router.push("/main/results");
      }
    }, 1000);
    uiStore.setCountDownTimer(countDownTimer);
  }
});

onBeforeRouteLeave(() => clearInterval(uiStore.countDownTimer));

</script>

<template>
  <div class="c-timer" v-if="testingStore.settings.testDuration">00:{{ remainTime.toString().padStart(2, 0) }}</div>
</template>

<style scoped>

.c-timer {
  margin: 5px;

  font-family: Days;
  color: #8c8a8a;
}
</style>
