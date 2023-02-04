<template>
  <NotifierA>
    <div class="c-login">
      <LoginPersonnelIdInput/>
      <LoginStartTestButton/>
      <div class="c-login__div-keyboard">This is a mobile device</div>
    </div>
  </NotifierA>

</template>

<script setup lang="ts">
import {NotifierA} from "@/shared/ui/notifier-a";
import LoginPersonnelIdInput from "./LoginPersonnelIdInput.vue";
import LoginStartTestButton from "./LoginStartTestingButton.vue";

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

@media (max-resolution: 1dppx) {
  .c-login__div-keyboard {
    display: none;
  }
}

</style>
