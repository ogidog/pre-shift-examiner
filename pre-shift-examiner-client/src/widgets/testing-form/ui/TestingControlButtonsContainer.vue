<template>
  <div class="c-control-buttons">
    <TestingNextQuestionButton/>
    <TestingFinishButton/>
  </div>
</template>

<script setup lang="ts">

import TestingNextQuestionButton from "./TestingNextQuestionButton"
import TestingFinishButton from "./TestingFinishButton"

</script>

<style scoped>

.c-control-buttons {
  display: flex;
  justify-content: center;

  width: 95%;
}

</style>
