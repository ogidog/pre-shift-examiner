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
@media (max-width: 1024px) {
  .c-result-form {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
  }
}

@media (min-width: 1025px) {
  .c-result-form {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 1025px;
    height: fit-content;

    border: 0px solid red;
  }
}

</style>
