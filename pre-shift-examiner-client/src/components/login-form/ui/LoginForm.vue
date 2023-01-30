<template>
  <NotifierA>
    <div class="login-form-container">
      <LoginPersonnelIdInput/>
      <LoginStartTestButton/>
    </div>
  </NotifierA>

</template>

<script setup lang="ts">
import {NotifierA} from "@/shared/ui/notifier-a";
import LoginPersonnelIdInput from "./LoginPersonnelIdInput.vue";
import LoginStartTestButton from "./LoginStartTestingButton.vue";

</script>

<style scoped>

@media (max-width: 1024px) {
  .login-form-container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
  }
}

@media (min-width: 1025px) {
  .login-form-container {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 1025px;
    height: fit-content;

    border: 0px solid red;
  }
}

</style>
