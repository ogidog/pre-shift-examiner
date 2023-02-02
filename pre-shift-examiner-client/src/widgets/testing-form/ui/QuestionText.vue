<template>
  <div class="text">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({text: String})

</script>

<style scoped>
.text {
  width: 95%;

  text-align: center;

  font-family: "Days";
  font-weight: bold;
  font-size: 1.2em;

  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
