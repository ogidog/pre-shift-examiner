<template>
  <ButtonA text="Начать тестирование" @click="onClick"></ButtonA>
</template>

<script setup lang="ts">
import {login} from "../api";
import {ButtonA} from "@/helpers/ui/button-a";
import {uiStore} from "@/store";
import router from "@/router/router";
import {NotifierMessages} from "pre-shift-examiner-types"

const onClick = async () => {
  try {
    uiStore.notifier = {visible: true, message: NotifierMessages.AUTHENTICATION};
    await login();
    await router.push({path: "/testing"});

  } catch (error: any) {
    uiStore.notifier = {visible: true, message: error.message, error: error};
  }
}

</script>
