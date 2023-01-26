<template>
  <ButtonA text="Начать тестирование" @click="onClick"></ButtonA>
</template>

<script setup lang="ts">
import {store} from "@/store/store";
import {ButtonA} from "@/helpers/ui/button-a";

const onClick = () => store.login()

</script>
