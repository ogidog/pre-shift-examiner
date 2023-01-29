<template>
  <ButtonA text="Далее" @click="nextQuestionHandler"
           v-show="testingStore.questions.length > 1 && testingStore.currentQuestionIndex < testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {testingStore} from "@/store";
import {ButtonA} from "@/helpers/ui/button-a";

const nextQuestionHandler = (e:Event) => {
  e.preventDefault()

  const form: HTMLFormElement = document.forms.namedItem(testingStore.questions[testingStore.currentQuestionIndex].id.toString())!;
  const formData = new FormData(form as HTMLFormElement)
  for (const value of formData.values()) {
    testingStore.results[testingStore.questions[testingStore.currentQuestionIndex].id].push(Number(value));
  }
  console.log(testingStore.results)
  testingStore.currentQuestionIndex++
}

</script>

