<template>
  <div class="c-line">
    <LoginVirtualKeyboardButton v-for="charCode in charCodes" :char-code="charCode" :key="charCode"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import LoginVirtualKeyboardButton from "./LoginVirtualKeyboardButton.vue";

const props = defineProps({charCodes: {type: Array as PropType<Array<number>>, required: true}})
</script>

<style scoped>

.c-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
