<template>
  <NotifierA>
    <div class="c-login">
      <LoginPersonnelIdInput/>
      <VirtualKeyboard/>
      <LoginStartTestButton/>
    </div>
  </NotifierA>

</template>

<script setup lang="ts">
import {NotifierA} from "@/shared/ui/notifier-a";
import LoginPersonnelIdInput from "./LoginPersonnelIdInput.vue";
import LoginStartTestButton from "./LoginStartTestingButton.vue";
import {VirtualKeyboard} from "@/entities/keybord/ui";

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

</style>
