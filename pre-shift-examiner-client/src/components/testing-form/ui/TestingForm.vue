<template>
  <NotifierA>
    <form :id="testingStore.questions[testingStore.currentQuestionIndex].id">
      <div class="testing-form-container">
        <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>
        <TestingControlButtonsContainer/>
      </div>
    </form>
  </NotifierA>
</template>

<script async setup lang="ts">
import {NotifierA} from "@/helpers/ui/notifier-a";
import {NotifierMessages, IAnswer} from "pre-shift-examiner-types"
import {testingStore, uiStore, userStore} from "@/store";
import QuestionContainer from "./QuestionContainer.vue";
import {startTesting} from "../api"
import TestingControlButtonsContainer from "./TestingControlButtonsContainer.vue";
import {onMounted} from "vue";
import router from "@/router/router";

onMounted(async () => {
  try {
    uiStore.notifier = {visible: true, message: NotifierMessages.TEST_LOADING};
    await startTesting(userStore.user.settingId)
    uiStore.notifier = {visible: false};

    testingStore.questions.forEach(question => testingStore.results[question.id] = [] as IAnswer);

  } catch (error: any) {
    uiStore.notifier = {visible: true, message: error.message, error: error};
    await router.push({path: "/"});
  }
});

</script>

<style scoped>

@media (max-width: 1024px) {
  .testing-form-container {
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
  .testing-form-container {
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
