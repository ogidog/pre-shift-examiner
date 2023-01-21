<template>
  <button class="start-testing__button" @click="onClick" role="button">Начать тестирование</button>
</template>

<script lang="ts">
import {store} from "@/store/store";

export default {
  name: "StartTestingButton",

  setup() {
    return {
      store
    }
  },

  methods: {
    onClick: () => {
      store.login()
    }
  }
}
</script>

<style scoped>
.start-testing__button {
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
