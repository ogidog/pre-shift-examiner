<template>
  <div class="c-keyboard" v-if="uiStore.virtualKeyBoardVisible">
    <LoginVirtualKeyboardButtonLine v-for="(charCodes, key) in charLineCodes" :char-codes="charCodes" :key="key"/>
  </div>
</template>

<script setup lang="ts">
import LoginVirtualKeyboardButtonLine from "./LoginVirtualKeyboardButtonLine.vue";
import {uiStore} from "@/store/uiStore";

const charLineCodes = [
  [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 8],
  [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098],
  [1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101],
  [1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102]
];

</script>

<style scoped>

.c-keyboard {
  display: none;
}

@media (max-resolution: 1dppx) {
  .c-keyboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    display: block;

    margin-top: 20px;
  }
}
</style>
