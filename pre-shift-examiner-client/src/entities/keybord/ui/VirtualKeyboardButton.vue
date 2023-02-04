<template>
  <div class="c-button">
    {{ String.fromCharCode(props.charCode) }}
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({charCode: {type: Number, required: true}});

</script>

<style scoped>
.c-button {
  width: fit-content;
  height: fit-content;

  margin: 3px;

  width: 40px;
  height: 40px;

  text-align: center;
  line-height: 40px;

  font-family: Days;
  color: #b2b0b0;

  background-color: white;
  border-radius: 2px;
  border: 1px solid gray;
}
</style>
