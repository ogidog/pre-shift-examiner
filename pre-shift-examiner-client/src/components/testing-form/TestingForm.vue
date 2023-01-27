<template>
  <div class="form-container">
    <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>
    <TestingControlButtonsContainer/>
  </div>
</template>

<script setup lang="ts">
import {testingStore} from "@/store";
import QuestionContainer from "./QuestionContainer.vue";
import TestingControlButtonsContainer from "./TestingControlButtonsContainer.vue";

</script>

<style scoped>

@media (max-width: 1024px) {
  .form-container {
    display: flex;
    flex-direction: column;

    justify-content: start;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
  }
}

@media (min-width: 1025px) {
  .form-container {
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
