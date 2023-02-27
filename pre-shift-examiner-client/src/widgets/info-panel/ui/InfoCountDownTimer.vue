<script setup lang="ts">
import {testingStore} from "@/store";
import {ref, watch, watchEffect} from "vue";
import router from "@/router/router";
import {onBeforeRouteLeave} from "vue-router";

let countDownTimer: number;
let remainTime = ref(0);

watch(() => testingStore.settings, (settings) => {
  if (settings.testDuration) {
    remainTime.value = testingStore.settings.testDuration!;
    countDownTimer = setInterval(() => {
      remainTime.value--;

      if (remainTime.value === 0) {
        clearInterval(countDownTimer);
        router.push("/main/results");
      }
    }, 1000);
  }
});

watch(() => testingStore.results, () => clearInterval(countDownTimer))

onBeforeRouteLeave(() => clearInterval(countDownTimer));

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
