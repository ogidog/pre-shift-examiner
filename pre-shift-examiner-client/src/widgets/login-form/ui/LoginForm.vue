<template>
    <div class="c-login-form">
      <div class="c-login-form__input-controls">
        <LoginPersonnelIdInput/>
        <LoginShowVirtualKeyboardButton/>
      </div>
      <LoginVirtualKeyboard/>
      <LoginStartTestButton/>
    </div>
</template>

<script setup lang="ts">
import LoginPersonnelIdInput from "./LoginPersonnelIdInput.vue";
import LoginStartTestButton from "./LoginStartTestingButton.vue";
import LoginShowVirtualKeyboardButton from "./LoginShowVirtualKeyboardButton.vue"
import LoginVirtualKeyboard from "./LoginVirtualKeyboard.vue";

</script>

<style scoped>
.c-login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  width: 100%;
}

.c-login-form__input-controls {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
