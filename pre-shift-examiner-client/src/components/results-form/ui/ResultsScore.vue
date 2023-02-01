<template>
  <div class="c-score">
    <span :class="score[0] === score[1]?'score-container__span':'score-container__span--color-incorrect'">
      {{ score[0] }}
    </span>
    /
    <span class="score-container__span">{{ score[1] }}</span>
  </div>
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
.c-score {
  font-family: PTC55F;
  font-size: 2.7em;
}


.score-container__span--color-incorrect {
  color: rgb(224, 65, 65);
}

.score-container__span {
  color: darkseagreen;
}
</style>
