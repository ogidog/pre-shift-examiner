<template>
  <div class="c-login-start-button">
    <ButtonA text="Начать тестирование" @click="clickHandler"></ButtonA>
  </div>
</template>

<script setup lang="ts">

import {login} from "../api";
import {ButtonA} from "@/shared/ui/button-a";
import {uiStore, userStore} from "@/store";
import router from "@/router/router";
import {INotifier} from "pre-shift-examiner-types";
import {NotifierMessages} from "../../../shared/constants";
import {watch} from "vue";
import {userValidator} from "@/widgets/login-form/validators";

watch(() => uiStore.keyDownCode, () => clickHandler())

const clickHandler = async () => {
  try {
    if (await userValidator.value.$validate()) {
      uiStore.notify(true, NotifierMessages.AUTHENTICATION);
      const user = await login();
      userStore.setUser(user);
      await router.push({path: "/main/testing"});
    }
  } catch (error: any) {
    uiStore.notify(true, error?.message, error as INotifier["error"]);
  }
}

</script>
<style scoped>

.c-login-start-button {
  margin-top: 20px;
}
</style>
