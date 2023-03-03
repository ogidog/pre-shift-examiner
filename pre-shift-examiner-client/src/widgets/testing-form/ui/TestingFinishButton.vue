<template>
  <ButtonA text="Завершить" @click="finishTestingHandler"
           v-if="testingStore.questions.length === 1 || testingStore.currentQuestionIndex === testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {INotifier} from "pre-shift-examiner-types";
import {testingStore, uiStore,} from "@/store";
import {ButtonA} from "@/shared/ui/button-a";
import router from "@/router/router";
import {checkAnswers} from "@/widgets/testing-form/api";
import {NotifierMessages} from "@/shared/constants";

const finishTestingHandler = async (e: Event) => {
  try {
    e.preventDefault();

    uiStore.notify(true, NotifierMessages.CHECKING_ANSWERS);

    const form: HTMLFormElement = document.forms.namedItem(testingStore.questions[testingStore.currentQuestionIndex].id.toString())!;
    const formData = new FormData(form as HTMLFormElement)
    for (const value of formData.values()) {
      testingStore.setAnswer(testingStore.questions[testingStore.currentQuestionIndex].id, Number(value));
    }

    await clearInterval(uiStore.countDownTimer);

    const results = await checkAnswers(testingStore.answers);
    testingStore.setResults(results);
    await router.push("/main/results");

    uiStore.notify(false);

  } catch (error: any) {
    uiStore.notify(true, error.message, error as INotifier["error"]);
    await router.push({path: "/"});
  }
}

</script>
