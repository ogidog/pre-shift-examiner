<template>
  <div class="c-line">
    <VirtualKeyboardButton v-for="charCode in charCodes" :char-code="charCode" :key="charCode"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import VirtualKeyboardButton from "./VirtualKeyboardButton.vue";

const props = defineProps({charCodes: {type: Array as PropType<Array<number>>, required: true}})
</script>

<style scoped>

.c-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
