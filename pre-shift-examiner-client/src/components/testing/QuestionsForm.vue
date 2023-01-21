<template>
  <div class="container">
    <QuestionContainer :question="this.question"/>
    <div>
      <button @click="$router.push('/')">Завершить</button>
      <button @click="$router.push('/')">Далее</button>
    </div>
  </div>
</template>

<script lang="ts">

// @ts-ignore
import {Question} from "pre-shift-examiner-middleware";

import {store} from "@/store/store";
import {defineComponent, PropType} from "vue";
import QuestionContainer from "@/components/testing/QuestionContainer.vue";

export default defineComponent({

  name: "QuestionsForm",
  components: {QuestionContainer},

  data() {
    return {
      question: {} as PropType<Question>
    }
  },

  setup() {
    return {
      store
    }
  },

  mounted() {
    store.getQuestions()
  }
})
</script>

<style scoped>

@media (max-width: 1024px) {
  .container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
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

    justify-content: center;
    align-items: center;

    width: 1025px;
    height: fit-content;

    border: 0px solid red;
  }
}

</style>
