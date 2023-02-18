<template>
  <ButtonA text="Завершить" @click="finishTestingHandler"
           v-if="testingStore.questions.length === 1 || testingStore.currentQuestionIndex === testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {NotifierMessages, INotifier} from "pre-shift-examiner-types";
import {checkAnswers} from "../api";
import {testingStore, uiStore, userStore} from "@/store";
import {ButtonA} from "@/shared/ui/button-a";
import router from "@/router/router";

const finishTestingHandler = async (e: Event) => {
  try {
    e.preventDefault();

    const form: HTMLFormElement = document.forms.namedItem(testingStore.questions[testingStore.currentQuestionIndex].id.toString())!;
    const formData = new FormData(form as HTMLFormElement)
    for (const value of formData.values()) {
      testingStore.setAnswer(testingStore.questions[testingStore.currentQuestionIndex].id, Number(value));
    }

    uiStore.notify(true, NotifierMessages.CHECKING_ANSWERS);
    const results = await checkAnswers(userStore.user.id, userStore.user.settingId, testingStore.answers);
    await testingStore.setResults(results);
    await router.push("/main/results");
    uiStore.notify(false);

  } catch (error: any) {
    uiStore.notify(true, error.message, error as INotifier["error"]);
    await router.push({path: "/"});
  }
}

</script>
