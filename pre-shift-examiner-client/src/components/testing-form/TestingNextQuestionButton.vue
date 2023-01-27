<template>
  <ButtonA text="Далее" @click="() => testingStore.currentQuestionIndex++"
           v-show="testingStore.questions.length > 1 && testingStore.currentQuestionIndex < testingStore.questions.length - 1"/>
</template>

<script setup lang="ts">
import {testingStore} from "@/store";
import {ButtonA} from "@/helpers/ui/button-a";

</script>

