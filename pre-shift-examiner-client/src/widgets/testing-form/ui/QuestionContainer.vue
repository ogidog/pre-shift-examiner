<template>
  <div class="c-question" v-if="props.question">
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

const props = defineProps({question: {type: {} as PropType<IQuestion | undefined>, required: true}});

</script>

<style scoped>

.c-question {
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;

  width: 100%;
}
</style>
