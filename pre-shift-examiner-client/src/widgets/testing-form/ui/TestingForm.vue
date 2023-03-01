<template>
    <div class="c-testing">
      <form :id="testingStore.questions[testingStore.currentQuestionIndex].id">
        <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>
        <TestingControlButtonsContainer/>
      </form>
    </div>
</template>

<script async setup lang="ts">
import {testingStore} from "@/store";
import QuestionContainer from "./QuestionContainer.vue";
import TestingControlButtonsContainer from "./TestingControlButtonsContainer.vue";

</script>

<style scoped>

.c-testing {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

</style>
