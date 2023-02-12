<template>
  <NotifierA>
    <div class="c-login">
      <div class="c-login__input-controls">
        <LoginPersonnelIdInput/>
        <LoginShowVirtualKeyboardButton/>
      </div>
      <LoginVirtualKeyboard/>
      <LoginStartTestButton/>
    </div>
  </NotifierA>

</template>

<script setup lang="ts">
import {NotifierA} from "@/shared/ui/notifier-a";
import LoginPersonnelIdInput from "./LoginPersonnelIdInput.vue";
import LoginStartTestButton from "./LoginStartTestingButton.vue";
import LoginShowVirtualKeyboardButton from "./LoginShowVirtualKeyboardButton.vue"
import LoginVirtualKeyboard from "./LoginVirtualKeyboard.vue";
import {onMounted} from "vue";
import {setAccessToken} from "../api";

onMounted(async () => await setAccessToken());

</script>

<style scoped>
.c-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.c-login__input-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
