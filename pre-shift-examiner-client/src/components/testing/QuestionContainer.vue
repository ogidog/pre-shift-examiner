<template>
  <div class="question-container">
    <div class="question-container__content">
      {{ this.$props.question?.content }}
    </div>
    <QuestionOption :option="this.$props.question?.options[0]" :type="'checkbox'"/>
  </div>
</template>

<script lang="ts">

import {Question} from "pre-shift-examiner-middleware";
import {defineComponent, PropType} from "vue";
import QuestionOption from "@/components/testing/QuestionOption.vue";

export default defineComponent({

  name: "QuestionContainer",
  props: {question: {} as PropType<Question>},
  components: {QuestionOption}

})
</script>

<style scoped>
@media (max-width: 1024px) {
  .question-container {
    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  .question-container__content {
    width: 90%;
    font-family: "Days";
    font-weight: bold;
    font-size: 1.2em;

    margin-top: 20px;
    margin-bottom: 10px;
  }
}

@media (min-width: 1025px) {
  .container {
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
