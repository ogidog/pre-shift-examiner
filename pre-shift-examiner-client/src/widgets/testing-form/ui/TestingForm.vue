<template>
  <NotifierA>
    <div class="c-testing">
      <form :id="testingStore.questions[testingStore.currentQuestionIndex].id">
        <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>
        <TestingControlButtonsContainer/>
      </form>
    </div>
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

    const responseObject = await startTesting(userStore.user.settingId);
    let {questions, settings} = responseObject;
    await testingStore.setQuestions(questions!);
    await testingStore.initAnswers();
    await testingStore.setSettings(settings!);

    uiStore.notify(false);

  } catch (error: any) {
    uiStore.notify(true, error.message, error);

    await router.push({path: "/"});
  }
});

</script>

<style scoped>

.c-testing {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

</style>
