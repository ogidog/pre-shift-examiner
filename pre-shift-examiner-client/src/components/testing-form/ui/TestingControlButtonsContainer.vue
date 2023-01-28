<template>
  <div class="control-buttons-container">
    <TestingNextQuestionButton/>
    <TestingFinishButton/>
  </div>
</template>

<script setup lang="ts">

import TestingNextQuestionButton from "./TestingNextQuestionButton"
import TestingFinishButton from "./TestingFinishButton"

</script>

<style scoped>

.control-buttons-container {
  display: flex;
  justify-content: center;

  width: 95%;
}

</style>
