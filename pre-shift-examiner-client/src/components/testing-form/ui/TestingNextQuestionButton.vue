<template>
  <ButtonA text="Далее" @click="nextQuestionHandler"
           v-show="testingStore.questions.length > 1 && testingStore.currentQuestionIndex < testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {IOption} from "pre-shift-examiner-types";
import {testingStore} from "@/store";
import {ButtonA} from "@/shared/ui/button-a";

const nextQuestionHandler = (e: Event) => {
  e.preventDefault()

  const form: HTMLFormElement = document.forms.namedItem(testingStore.questions[testingStore.currentQuestionIndex].id.toString())!;
  const formData = new FormData(form as HTMLFormElement)
  for (const value of formData.values()) {
    testingStore.setAnswer(testingStore.questions[testingStore.currentQuestionIndex].id, Number(value));
  }

  testingStore.currentQuestionIndex++
}

</script>

