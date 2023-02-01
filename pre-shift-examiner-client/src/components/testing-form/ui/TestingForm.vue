<template>
  <NotifierA>
    <form :id="testingStore.questions[testingStore.currentQuestionIndex].id">
      <div class="c-testing-form">
        <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>
        <TestingControlButtonsContainer/>
      </div>
    </form>
  </NotifierA>
</template>

<script async setup lang="ts">
import {NotifierA} from "@/shared/ui/notifier-a";
import {NotifierMessages} from "pre-shift-examiner-types"
import {testingStore, uiStore, userStore} from "@/store";
import QuestionContainer from "./QuestionContainer.vue";
import {startTesting} from "../api"
import TestingControlButtonsContainer from "./TestingControlButtonsContainer.vue";
import {onMounted} from "vue";
import router from "@/router/router";

onMounted(async () => {
  try {
    uiStore.notify(true, NotifierMessages.TEST_LOADING);

    const questions  = await startTesting(userStore.user.settingId);
    await testingStore.setQuestions(questions);
    await testingStore.initAnswers();

    uiStore.notify(false);

  } catch (error: any) {
    uiStore.notify(true, error.message, error);

    await router.push({path: "/"});
  }
});

</script>

<style scoped>

@media (max-width: 1024px) {
  .c-testing-form {
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
  .c-testing-form {
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
