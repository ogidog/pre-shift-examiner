<template>
  <button @click="$router.push('/')"
          v-show="this.storeTest.questions.length===1 || this.storeTest.currentQuestionIndex===this.storeTest.questions.length-1">
    Завершить
  </button>
</template>

<script>
import {defineComponent} from "vue";
import {storeTest} from "@/storeTest/storeTest";

export default defineComponent({
  name: "FinishTestingButton",

  setup() {
    return {
      storeTest: storeTest
    }
  }
});

</script>

<style scoped>
button {
  background-color: #5488f1;
  border-radius: 8px;
  border-width: 0;
  color: rgb(255, 255, 255);
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
