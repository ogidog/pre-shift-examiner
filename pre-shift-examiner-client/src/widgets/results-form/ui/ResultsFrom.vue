<template>
  <div class="c-result-form">
    <ResultsScoreTitle/>
    <ResultsScore/>
    <ResultsControlButtons/>
  </div>
</template>

<script setup lang="ts">
import ResultsScoreTitle from "./ResultsScoreTitle.vue";
import ResultsScore from "./ResultsScore.vue";
import ResultsControlButtons from "./ResultsControlButtons.vue";

</script>

<style scoped>

.c-result-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

</style>
