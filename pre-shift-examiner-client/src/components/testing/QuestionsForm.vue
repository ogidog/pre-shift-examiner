<template>
  <div class="form-container" v-if="this.store.questions">
    <QuestionContainer :question="this.store.questions[currentQuestionIndex]"/>
    <div>
      <button @click="$router.push('/')" v-show="currentQuestionIndex === this.store.questions.length - 1">Завершить
      </button>
      <button @click="onNextQuestion"
              v-show="currentQuestionIndex < this.store.questions.length - 1 && this.store.questions.length > 1">Далее
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {store} from "@/store/store";
import QuestionContainer from "@/components/testing/QuestionContainer.vue";

export default defineComponent({

  name: "QuestionsForm",
  components: {QuestionContainer},

  setup() {
    return {
      store
    }
  },

  data() {
    return {
      currentQuestionIndex: 0 as number
    }
  },

  created() {
    store.getQuestions();
  },

  methods: {
    onNextQuestion() {
      this.currentQuestionIndex++;
    }
  }

})

</script>

<style scoped>

@media (max-width: 1024px) {
  .form-container {
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
