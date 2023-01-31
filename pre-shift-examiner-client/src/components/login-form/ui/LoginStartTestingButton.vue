<template>
  <ButtonA text="Начать тестирование" @click="onClick"></ButtonA>
</template>

<script setup lang="ts">
import {login} from "../api";
import {ButtonA} from "@/shared/ui/button-a";
import {uiStore, userStore} from "@/store";
import router from "@/router/router";
import {NotifierMessages, INotifier} from "pre-shift-examiner-types"

const onClick = async () => {
  try {
    uiStore.notify(true, NotifierMessages.AUTHENTICATION);
    const user = await login();
    userStore.setUser(user);
    await router.push({path: "/testing"});

  } catch (error: any) {
    uiStore.notify(true, error.message, error as INotifier["error"]);
  }
}

</script>
