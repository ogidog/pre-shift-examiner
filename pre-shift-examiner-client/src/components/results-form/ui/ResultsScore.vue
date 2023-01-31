<template>
  <div class="results-score-container">{{ score[0] }} / {{ score[1] }}</div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {testingStore} from "@/store";

const score = computed(() => {
  const _ = [0, testingStore.results.length]
  testingStore.results.forEach((result) => {
    if (result.is_correct) {
      _[0] += 1;
    }
  });
  return _;
});

</script>

<style scoped>
.results-score-container {
  font-family: PTC55F;
  font-size: 2.7em;
}
</style>
