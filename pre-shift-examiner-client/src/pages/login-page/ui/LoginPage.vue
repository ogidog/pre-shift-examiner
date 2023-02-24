<template>
  <div class="c-login">
    <LoginForm/>
  </div>
</template>

<script setup lang="ts">
import {LoginForm} from "@/widgets/login-form/ui";
</script>

<style>

@media (min-width: 1025px) {
  .c-login {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: center;

    width: 468px;
    height: 768px;
  }
}

@media (max-width: 1024px) {
  .c-login {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    height: 100%;
    width: 100%;
  }
}

</style>
