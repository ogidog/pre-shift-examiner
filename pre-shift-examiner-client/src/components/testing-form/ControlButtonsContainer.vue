<template>
  <div class="control-buttons-container">

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {storeTest} from "@/storeTest/storeTest";

export default defineComponent({
  name: "ControlButtonsContainer",
  props: {currentQuestionIndex: Number},

  setup() {
    return {
      storeTest: storeTest
    }
  },

});

</script>

<style scoped>

.control-buttons-container {
  display: flex;
  justify-content: center;

  width: 95%;
}

.control-buttons-container button {
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
