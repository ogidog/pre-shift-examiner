<template>
  <ButtonA text="Начать тестирование" @click="onClick"></ButtonA>
</template>

<script setup lang="ts">
import {userStore} from "@/store";
import {ButtonA} from "@/helpers/ui/button-a";

const onClick = () => userStore.login()

</script>
