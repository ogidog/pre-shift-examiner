<template>
  <div class="form-container" v-if="this.store.questions">
    <QuestionContainer :question="this.store.questions[this.store.currentQuestionIndex]"/>
    <ControlButtonsContainer/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {store} from "@/store/store";
import QuestionContainer from "@/components/testing/QuestionContainer.vue";
import ControlButtonsContainer from "@/components/testing/ControlButtonsContainer.vue";

export default defineComponent({

  name: "QuestionsForm",
  components: {QuestionContainer, ControlButtonsContainer},

  setup() {
    return {
      store
    }
  },

  async beforeRouteEnter() {
    await store.getQuestions();
  }

});

</script>

<style scoped>

@media (max-width: 1024px) {
  .form-container {
    display: flex;
    flex-direction: column;

    justify-content: start;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
  }
}

@media (min-width: 1025px) {
  .form-container {
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
