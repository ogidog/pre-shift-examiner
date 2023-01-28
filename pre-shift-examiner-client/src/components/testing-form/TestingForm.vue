<template>
  <NotifierA>
<!--    <div class="form-container">-->
<!--      <QuestionContainer :question="testingStore.questions[testingStore.currentQuestionIndex]"/>-->
<!--      <TestingControlButtonsContainer/>-->
<!--    </div>-->
  </NotifierA>
</template>

<script setup lang="ts">
import {NotifierA} from "@/helpers/ui/notifier-a";
import {NotifierMessages} from "pre-shift-examiner-types"
import {uiStore, userStore} from "@/store";
//import QuestionContainer from "./QuestionContainer.vue";
import {startTesting} from "./api"
//import TestingControlButtonsContainer from "./TestingControlButtonsContainer.vue";
import {onMounted} from "vue";

onMounted(async () => {
  try {
    console.log(uiStore.notifier)
    uiStore.notifier = {visible: true, message: NotifierMessages.TEST_LOADING};
    console.log(uiStore.notifier)
    await startTesting(userStore.user.settingId)
    // uiStore.notifier = {visible: false};

  } catch (error: any) {
    console.log(error)
    // uiStore.notifier = {visible: true, message: error.message, error: error};
  }
});

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
