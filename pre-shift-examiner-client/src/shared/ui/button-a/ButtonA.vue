<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({text: String});

</script>

<template>
  <button>{{ props.text }}</button>
</template>

<style scoped>
button {
  background-color: rgba(84, 136, 241, 0.97);
  border-radius: 2px;
  border-width: 0;
  color: rgb(255, 255, 255);
  cursor: pointer;

  font-family: "PTC55F";
  font-weight: bold;
  font-size: 1.2em;
  line-height: 30px;
  list-style: none;
  padding: 10px 10px;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
}
</style>
