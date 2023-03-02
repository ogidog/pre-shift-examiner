<template>
  <div class="c-score">
    <span
        :class="score === testingStore.questions.length ? 'c-score__span': 'c-score__span_incorrect'">
      {{ score || 0 }}
    </span>
    /
    <span class="c-score__span">{{ testingStore.questions.length }}</span>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {testingStore,} from "@/store";

const score = computed(() => {
  let _score = 0;
  testingStore.results.forEach((result) => {
    if (result.isCorrect) {
      _score += 1;
    }
  });
  return _score;
});

</script>

<style scoped>
.c-score {
  font-family: PTC55F;
  font-size: 2.7em;
}

.c-score__span_incorrect {
  color: rgb(224, 65, 65);
}

.c-score__span {
  color: darkseagreen;
}

</style>
