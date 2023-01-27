<template>
  <div class="question-container">
    <QuestionText :text="props.question.text"/>
    <QuestionOption v-for="(option) in props.question.options"
                    :key="option.id"
                    :option="option"
                    :type="props.question.multiple?'checkbox':'radio'"/>
  </div>
</template>

<script setup lang="ts">

import {IQuestion} from "pre-shift-examiner-types/index";
import {defineProps, PropType} from "vue";
import QuestionOption from "./QuestionOption.vue";
import QuestionText from "./QuestionText.vue";

const props = defineProps({question: {} as PropType<IQuestion>});

</script>

<style scoped>
@media (max-width: 1024px) {
  .question-container {
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: fit-content;
  }
}

@media (min-width: 1025px) {
  .question-container {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    width: 1025px;
    height: fit-content;

    border: 0px solid red;
  }
}
</style>
