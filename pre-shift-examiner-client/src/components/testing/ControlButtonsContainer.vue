<template>
  <div class="control-buttons-container">
    <button @click="$router.push('/')" v-show="currentQuestionIndex === this.store.questions.length - 1">Завершить
    </button>
    <button @click="onNextQuestion"
            v-show="currentQuestionIndex < this.store.questions.length - 1 && this.store.questions.length > 1">Далее
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {store} from "@/store/store";

export default defineComponent({
  name: "ControlButtonsContainer",

  setup() {
    return {
      store
    }
  },

  methods: {
    onNextQuestion(currentQuestionIndex: number) {
      this.$emit("nextQuestion", currentQuestionIndex++);
    }
  }
})

</script>

<style scoped>

.control-buttons-container {
  display: flex;
  justify-content: center;

  width: 95%;
}

.control-buttons-container button {
  background-color: rgba(107, 137, 234, 0.78);
  border-radius: 8px;
  border-width: 0;
  color: rgb(3, 3, 3);
  cursor: pointer;
  display: inline-block;
  font-family: "PTC55F";
  font-weight: bold;
  font-size: 1.1em;
  line-height: 20px;
  list-style: none;
  margin: 5px;
  padding: 10px 12px;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
}

</style>
