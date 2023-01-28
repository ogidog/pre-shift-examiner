<template>
  <ButtonA text="Завершить" @click="finishTestingHandler"
           v-if="testingStore.questions.length === 1 || testingStore.currentQuestionIndex === testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {finishTesting} from "../api";
import {testingStore} from "@/store";
import {ButtonA} from "@/helpers/ui/button-a";

const finishTestingHandler = async () => {
  try {
    await finishTesting();

  } catch (e) {
    console.log()
  }

}

</script>
